import { createHash } from 'node:crypto';
import { open, readFile, rename, unlink } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { extractHeadingSection } from './rule-catalogue.mjs';
import { createDecisionStore } from './decision-state.mjs';

const text = value => typeof value === 'string' && value.trim().length > 0;
const sha256 = value => createHash('sha256').update(value).digest('hex');

function authenticatedApprovalEvent(decisionState, proposalId, verifyUserDecision) {
  if (!Array.isArray(decisionState?.events) || typeof verifyUserDecision !== 'function') return null;
  const proposalEvents = decisionState.events.filter(event => event?.type === 'DECISION' && event.proposal_id === proposalId);
  const event = proposalEvents.at(-1);
  if (!event || event.action !== 'APPROVE' || event.transition?.status !== 'APPROVED'
      || event.transition.proposal?.status !== 'APPROVED' || !Number.isSafeInteger(event.revision)
      || !/^[a-f0-9]{64}$/.test(event.event_hash ?? '')) return null;
  const approval = event.transition.proposal.approval;
  try {
    if (verifyUserDecision({ proposalId, action: 'APPROVE', actor: approval?.actor,
      evidence: approval?.evidence, decision: approval?.conflict_decision }) !== true) return null;
  } catch { return null; }
  return event;
}

function locateSection(source, heading) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const level = heading.match(/^(#{1,6}) /)?.[1].length;
  let start = -1;
  let end = lines.length;
  let fence = null;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = { char: marker[1][0], length: marker[1].length };
      else if (marker[1][0] === fence.char && marker[1].length >= fence.length) fence = null;
      continue;
    }
    if (fence) continue;
    if (start < 0) {
      if (line === heading) start = index;
      continue;
    }
    const next = line.match(/^(#{1,6}) /);
    if (next && next[1].length <= level) { end = index; break; }
  }
  if (start < 0) throw new Error('Target heading not found.');
  return { lines, start, end };
}

/** Build a non-writing, append-only source update preview for a specialist module. */
export function buildSotUpdatePlan({ proposal, approvedProposal, impact, conflict,
  coverage, module, currentSource, baselineSha256, targetHeading, proposedSection,
  traceability, decisionState, verifyUserDecision }) {
  const errors = [];
  if (!proposal || proposal.status !== 'APPROVED' || proposal.integration !== 'NOT_STARTED'
      || !text(proposal.id) || !text(proposal.content)) errors.push('APPROVED_NON_INTEGRATED_PROPOSAL_REQUIRED');
  const approvalEvent = authenticatedApprovalEvent(decisionState, proposal?.id, verifyUserDecision);
  if (!approvalEvent || !approvedProposal || !isDeepStrictEqual(proposal, approvedProposal)
      || approvedProposal.id !== proposal?.id || approvedProposal.status !== 'APPROVED'
      || !isDeepStrictEqual(approvalEvent.transition.proposal, approvedProposal)
      || !approvedProposal.approval || approvedProposal.approval.kind !== 'PROPOSAL_INTEGRATION_ONLY'
      || approvedProposal.approval.grants_product_release !== false
      || approvedProposal.approval.grants_design_rule !== false
      || approvedProposal.approval.grants_live_rollout !== false) errors.push('PERSISTED_SCOPED_APPROVAL_REQUIRED');
  if (!module || module.status !== 'active_reference' || module.module_id !== proposal?.owner?.module_id
      || module.authority !== proposal?.authority || module.source !== proposal?.owner?.source) errors.push('REGISTERED_SOURCE_OWNER_MISMATCH');
  if (module?.module_id === 'scrum-core' || module?.source === 'docs/scrum-plan.md') errors.push('SCRUM_CORE_REQUIRES_SEPARATE_GOLDEN_BASELINE_GATE');
  if (impact?.proposal_id !== proposal?.id || impact?.owner?.module_id !== module?.module_id
      || impact?.owner?.authority !== module?.authority || impact?.owner?.source !== module?.source
      || !Array.isArray(impact?.unknowns) || impact.unknowns.length) errors.push('IMPACT_SCOPE_MISSING_OR_UNKNOWN');
  if (conflict?.proposal_id !== proposal?.id || conflict?.status !== 'CLASSIFIED'
      || conflict?.sot_update_allowed !== false || conflict?.user_decision_required !== false
      || !Array.isArray(conflict?.unresolved_candidate_ids) || conflict.unresolved_candidate_ids.length
      || !Array.isArray(conflict?.unknown_coverage) || conflict.unknown_coverage.length) errors.push('CONFLICT_REVIEW_NOT_CLOSED');
  if (!coverage || coverage.proposal_id !== proposal?.id || !Array.isArray(coverage.unknowns)
      || coverage.unknowns.length || !Array.isArray(coverage.cross_module_unknowns)
      || coverage.cross_module_unknowns.length || coverage.semantic_equivalence === 'UNDETERMINED') errors.push('RULE_COVERAGE_OR_SEMANTIC_REVIEW_INCOMPLETE');
  if (!text(currentSource) || !/^[a-f0-9]{64}$/.test(baselineSha256 ?? '')
      || sha256(currentSource) !== baselineSha256) errors.push('SOURCE_BASELINE_MISMATCH');
  if (!text(targetHeading) || !text(proposedSection)) errors.push('TARGET_SECTION_AND_PROPOSED_TEXT_REQUIRED');
  if (!Array.isArray(traceability) || !traceability.some(record => record?.proposal_id === proposal?.id
      && record?.target_ref === module?.source && text(record?.source_ref) && text(record?.source_anchor))) {
    errors.push('PROPOSAL_TO_SOURCE_TRACEABILITY_REQUIRED');
  }
  if (errors.length) return { status: 'UPDATE_BLOCKED', errors, plan: null };

  let section;
  let range;
  try {
    section = extractHeadingSection(currentSource, targetHeading);
    range = locateSection(currentSource, targetHeading);
  } catch (error) {
    return { status: 'UPDATE_BLOCKED', errors: [`SECTION_RESOLUTION_FAILED:${error.message}`], plan: null };
  }
  const nextSection = proposedSection.replace(/\r\n/g, '\n').trimEnd();
  if (nextSection.split('\n')[0] !== targetHeading) errors.push('PROPOSED_SECTION_HEADING_MISMATCH');
  const priorBody = section.split('\n').slice(1).join('\n').trimEnd();
  const nextBody = nextSection.split('\n').slice(1).join('\n');
  if (priorBody && !nextBody.includes(priorBody)) errors.push('EXISTING_SECTION_RULES_MUST_BE_PRESERVED_VERBATIM');
  if (!nextBody.includes(proposal.content.trim())) errors.push('APPROVED_PROPOSAL_CONTENT_MISSING_FROM_SECTION');
  if (errors.length) return { status: 'UPDATE_BLOCKED', errors, plan: null };

  const eol = currentSource.includes('\r\n') ? '\r\n' : '\n';
  const before = range.lines.slice(0, range.start).join(eol);
  const after = range.lines.slice(range.end).join(eol);
  const serializedSection = nextSection.split('\n').join(eol);
  const updated = `${before}${before ? eol : ''}${serializedSection}${after ? `${eol}${after}` : ''}`;
  return {
    status: 'PREPARED_NOT_APPLIED', errors: [],
    plan: {
      proposal_id: proposal.id,
      module_id: module.module_id,
      authority: module.authority,
      source: module.source,
      target_heading: targetHeading,
      operation: 'APPEND_ONLY_SECTION_EXTENSION',
      before_sha256: sha256(currentSource),
      after_sha256: sha256(updated),
      before_section: section,
      after_section: nextSection,
      updated_source: updated,
      traceability: traceability.filter(record => record.proposal_id === proposal.id),
      decision_ref: approvedProposal.approval.evidence?.reference ?? null,
      approval_event: { revision: approvalEvent.revision, event_hash: approvalEvent.event_hash },
      write_performed: false,
    },
  };
}

async function writeAtomic(path, bytes) {
  const temp = `${path}.${randomUUID()}.tmp`;
  let handle;
  try {
    handle = await open(temp, 'wx');
    await handle.writeFile(bytes);
    await handle.sync();
    await handle.close();
    handle = null;
    await rename(temp, path);
  } finally {
    if (handle) await handle.close().catch(() => {});
    await unlink(temp).catch(error => { if (error.code !== 'ENOENT') throw error; });
  }
}

/** Apply only a fresh prepared specialist-module preview, then rollback on failed validation. */
export async function applySotUpdatePlan({ plan, projectRoot, decisionStatePath,
  verifyUserDecision, validateAfter }) {
  if (!plan || plan.operation !== 'APPEND_ONLY_SECTION_EXTENSION'
      || plan.write_performed !== false || plan.module_id === 'scrum-core'
      || plan.source === 'docs/scrum-plan.md') {
    return { status: 'APPLY_BLOCKED', reason: 'INVALID_OR_PROTECTED_UPDATE_PLAN' };
  }
  if (!projectRoot || !isAbsolute(projectRoot) || !decisionStatePath
      || typeof verifyUserDecision !== 'function' || typeof validateAfter !== 'function') {
    return { status: 'APPLY_BLOCKED', reason: 'ROOT_PERSISTED_DECISION_AUTHENTICATOR_AND_POST_VALIDATOR_REQUIRED' };
  }
  const path = resolve(projectRoot, plan.source);
  const rel = relative(projectRoot, path);
  if (!plan.source || isAbsolute(plan.source) || plan.source.includes('\\')
      || !rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    return { status: 'APPLY_BLOCKED', reason: 'UNSAFE_SOURCE_PATH' };
  }
  const decisionPath = resolve(projectRoot, decisionStatePath);
  const decisionRel = relative(projectRoot, decisionPath);
  if (isAbsolute(decisionStatePath) || decisionStatePath.includes('\\')
      || !decisionRel || decisionRel === '..' || decisionRel.startsWith(`..${sep}`) || isAbsolute(decisionRel)) {
    return { status: 'APPLY_BLOCKED', reason: 'UNSAFE_DECISION_STATE_PATH' };
  }
  const lockPath = `${path}.sot-update.lock`;
  let lock;
  try { lock = await open(lockPath, 'wx'); }
  catch (error) { return { status: 'APPLY_BLOCKED', reason: error.code === 'EEXIST' ? 'UPDATE_LOCK_EXISTS' : error.message }; }
  let before;
  let after;
  let wrote = false;
  try {
    const decisionState = await createDecisionStore(decisionPath, { verifyUserDecision }).read();
    const approvalEvent = authenticatedApprovalEvent(decisionState, plan.proposal_id, verifyUserDecision);
    if (!approvalEvent || approvalEvent.event_hash !== plan.approval_event?.event_hash
        || approvalEvent.revision !== plan.approval_event?.revision
        || approvalEvent.transition.proposal.owner?.source !== plan.source
        || approvalEvent.transition.proposal.owner?.module_id !== plan.module_id
        || approvalEvent.transition.proposal.authority !== plan.authority) {
      return { status: 'APPLY_BLOCKED', reason: 'PERSISTED_APPROVAL_REVALIDATION_FAILED' };
    }
    before = await readFile(path);
    if (sha256(before) !== plan.before_sha256) return { status: 'APPLY_BLOCKED', reason: 'SOURCE_CHANGED_AFTER_PREVIEW' };
    after = Buffer.from(plan.updated_source, 'utf8');
    if (sha256(after) !== plan.after_sha256) return { status: 'APPLY_BLOCKED', reason: 'PREVIEW_HASH_MISMATCH' };
    await writeAtomic(path, after);
    wrote = true;
    const current = await readFile(path);
    if (sha256(current) !== plan.after_sha256) throw new Error('WRITTEN_SOURCE_HASH_MISMATCH');
    let validation;
    try { validation = await validateAfter({ plan, source: current.toString('utf8'), source_path: path }); }
    catch (error) { validation = { status: 'POST_VALIDATION_BLOCKED', reason: error instanceof Error ? error.message : String(error) }; }
    if (validation?.status === 'POST_VALIDATION_PASS'
        && text(validation.audit_output) && Array.isArray(validation.checks)
        && validation.checks.length > 0 && validation.checks.every(check => check?.status === 'PASS')) {
      return { status: 'APPLIED', proposal_id: plan.proposal_id, source: plan.source,
        before_sha256: plan.before_sha256, after_sha256: plan.after_sha256,
        post_validation: validation };
    }
    const live = await readFile(path);
    if (sha256(live) !== plan.after_sha256) {
      return { status: 'ROLLBACK_BLOCKED', reason: 'SOURCE_CHANGED_AFTER_FAILED_VALIDATION',
        expected_sha256: plan.after_sha256, actual_sha256: sha256(live), post_validation: validation };
    }
    await writeAtomic(path, before);
    const restored = await readFile(path);
    if (sha256(restored) !== plan.before_sha256) {
      return { status: 'ROLLBACK_FAILED', reason: 'RESTORED_SOURCE_HASH_MISMATCH', post_validation: validation };
    }
    wrote = false;
    return { status: 'ROLLED_BACK', reason: validation?.reason ?? 'POST_VALIDATION_FAILED',
      source: plan.source, restored_sha256: sha256(restored), post_validation: validation };
  } catch (error) {
    if (wrote && before) {
      try {
        const live = await readFile(path);
        if (sha256(live) === plan.after_sha256) {
          await writeAtomic(path, before);
          const restored = await readFile(path);
          if (sha256(restored) === plan.before_sha256) wrote = false;
          else return { status: 'ROLLBACK_FAILED', reason: 'RESTORED_SOURCE_HASH_MISMATCH', error: error.message };
        } else {
          return { status: 'ROLLBACK_BLOCKED', reason: 'SOURCE_CHANGED_DURING_APPLY', error: error.message };
        }
      } catch (rollbackError) {
        return { status: 'ROLLBACK_FAILED', reason: rollbackError.message, error: error.message };
      }
    }
    return { status: 'APPLY_BLOCKED', reason: error instanceof Error ? error.message : String(error) };
  } finally {
    await lock.close().catch(() => {});
    await unlink(lockPath).catch(() => {});
  }
}
