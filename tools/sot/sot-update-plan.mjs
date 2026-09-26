import { createHash } from 'node:crypto';
import { open, readFile, rename, unlink, realpath, stat } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { extractHeadingSection } from './rule-catalogue.mjs';
import { createDecisionStore } from './decision-state.mjs';
import { loadRegistry } from './module-registry.mjs';
import { decisionProposalHash } from './user-decision-evidence.mjs';

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
    if (verifyUserDecision({ proposalId, proposal_sha256: decisionProposalHash(event.transition.proposal), action: 'APPROVE', actor: approval?.actor,
      evidence: approval?.evidence, decision: approval?.conflict_decision }) !== true) return null;
  } catch { return null; }
  return event;
}

function locateSection(source, heading) {
  const rawLines = source.match(/[^\n]*\n|[^\n]+$/g) ?? [];
  const lines = rawLines.map(line => line.replace(/\r?\n$/, ''));
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
  return { start: rawLines.slice(0, start).join('').length, end: rawLines.slice(0, end).join('').length };
}

function appendApprovedContent(source, heading, content) {
  const range = locateSection(source, heading);
  const originalSection = source.slice(range.start, range.end);
  const body = originalSection.trimEnd();
  const eol = originalSection.match(/\r?\n/)?.[0] ?? '\n';
  const addition = content.trim().replace(/\r\n/g, '\n').replace(/\n/g, eol);
  const insertion = `${eol}${eol}${addition}`;
  const offset = range.start + body.length;
  return { updated: source.slice(0, offset) + insertion + source.slice(offset),
    section: originalSection.replace(/\r\n/g, '\n').trimEnd(),
    nextSection: (body + insertion).replace(/\r\n/g, '\n') };
}

const ruleOperation = proposal => proposal.rule_update?.kind === 'EXTEND' ? 'EXTEND_EXISTING_RULE'
  : proposal.rule_update?.kind === 'SUPERSEDE' ? 'MARK_SUPERSEDED_RULE' : 'APPEND_ONLY_SECTION_EXTENSION';

function checkedRuleReview(proposal, verifyRuleReview) {
  const update = proposal.rule_update;
  if (update == null) return null;
  const review = update.semantic_review;
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(proposal.id ?? '') || !['EXTEND', 'SUPERSEDE'].includes(update.kind) || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(update.rule_id ?? '')
      || !text(update.old_text) || !text(update.replacement_text) || update.old_text === update.replacement_text
      || update.replacement_text !== proposal.content || update.old_text !== update.old_text.trimEnd()
      || update.replacement_text !== update.replacement_text.trimEnd()) throw new Error('EXACT_RULE_UPDATE_BINDING_REQUIRED');
  if (review?.rule_id !== update.rule_id || review.kind !== update.kind || review.source !== proposal.owner.source
      || review.target_heading !== proposal.target_heading || review.source_baseline_sha256 !== proposal.source_baseline_sha256
      || review.old_sha256 !== sha256(update.old_text) || review.replacement_sha256 !== sha256(update.replacement_text)
      || review.complete_target !== true || review.other_rules_preserved !== true || review.gate_changes !== false
      || review.no_duplicate !== true || !['FAST_CHECK', 'FULL_CHECK'].includes(review.required_check)
      || !text(review.reviewer) || !text(review.evidence_ref) || !text(review.rationale)) throw new Error('BOUND_SEMANTIC_RULE_REVIEW_REQUIRED');
  if (['sot-architecture', 'consolidated-mandate'].includes(proposal.owner.module_id)
      && review.required_check !== 'FULL_CHECK') throw new Error('GOVERNANCE_SEMANTIC_FULL_CHECK_REQUIRED');
  if (typeof verifyRuleReview !== 'function' || verifyRuleReview({ proposal_id: proposal.id,
    proposal_sha256: decisionProposalHash(proposal), review: structuredClone(review) }) !== true) throw new Error('AUTHENTICATED_RULE_REVIEW_REQUIRED');
  return review;
}

function persistedRuleConflict(decisionState, approvalEvent, proposal) {
  if (proposal.rule_update == null) return null;
  const event = decisionState.events.filter(item => item.type === 'REVIEW' && item.proposal_id === proposal.id
    && item.revision < approvalEvent.revision).at(-1);
  const conflict = event?.conflict;
  const target = conflict?.relationships?.filter(item => item.candidate_id === proposal.rule_update.rule_id) ?? [];
  const expected = proposal.rule_update.kind === 'SUPERSEDE' ? 'SUPERSEDES' : 'EXTENSION';
  if (conflict?.status !== 'CLASSIFIED' || conflict.user_decision_required !== false
      || conflict.unresolved_candidate_ids?.length !== 0 || conflict.unknown_coverage?.length !== 0
      || target.length !== 1 || target[0].relation !== expected
      || conflict.relationships.some(item => item.candidate_id !== proposal.rule_update.rule_id
        && !['EXTENSION', 'UNRELATED'].includes(item.relation))) throw new Error('PERSISTED_TARGET_CONFLICT_REVIEW_REQUIRED');
  return conflict;
}

function rebuildApprovedUpdate(source, proposal) {
  if (proposal.rule_update == null) return { ...appendApprovedContent(source, proposal.target_heading, proposal.content),
    operation: 'APPEND_ONLY_SECTION_EXTENSION', required_check: null };
  const { old_text: oldText, replacement_text: replacement, rule_id: ruleId, kind, semantic_review: review } = proposal.rule_update;
  const range = locateSection(source, proposal.target_heading);
  const section = source.slice(range.start, range.end);
  const localIndex = section.indexOf(oldText);
  if (localIndex < 0 || source.indexOf(oldText) !== source.lastIndexOf(oldText)) throw new Error('RULE_TARGET_MISSING_OR_AMBIGUOUS');
  const absoluteIndex = range.start + localIndex;
  if (/\*\*SUPERSEDED by [^\r\n]+ \(historical, inactive\)\*\*\r?\n\r?\n$/.test(source.slice(0, absoluteIndex))) throw new Error('CANNOT_UPDATE_INACTIVE_HISTORICAL_RULE');
  const preceding = source[absoluteIndex - 1];
  const following = source[absoluteIndex + oldText.length];
  if ((preceding && preceding !== '\n') || (following && following !== '\n' && following !== '\r')) throw new Error('COMPLETE_RULE_LINES_REQUIRED');
  if (/^(?:#{1,6}\s|`{3,}|~{3,}|<!--|<\/?details)/m.test(oldText)
      || /^(?:#{1,6}\s|`{3,}|~{3,}|<!--|<\/?details)/m.test(replacement)) throw new Error('RULE_UPDATE_CANNOT_RESTRUCTURE_MARKDOWN');
  if (source.includes(replacement)) throw new Error('REPLACEMENT_ALREADY_PRESENT');
  if (kind === 'EXTEND' && !replacement.startsWith(oldText)) throw new Error('EXTENSION_MUST_PRESERVE_EXISTING_RULE_PREFIX');
  if (!['EXTEND', 'SUPERSEDE'].includes(kind)) throw new Error('UNSUPPORTED_RULE_UPDATE');
  const eol = section.match(/\r?\n/)?.[0] ?? '\n';
  const replacementBlock = kind === 'EXTEND' ? replacement
    : `**SUPERSEDED by ${proposal.id}: ${ruleId} (historical, inactive)**${eol}${eol}${oldText}${eol}${eol}**Active replacement for ${ruleId}: ${proposal.id}**${eol}${eol}${replacement}`;
  const updated = source.slice(0, absoluteIndex) + replacementBlock + source.slice(absoluteIndex + oldText.length);
  const nextSection = section.slice(0, localIndex) + replacementBlock + section.slice(localIndex + oldText.length);
  return { updated, section: section.replace(/\r\n/g, '\n').trimEnd(), nextSection: nextSection.replace(/\r\n/g, '\n').trimEnd(),
    operation: ruleOperation(proposal), required_check: review.required_check };
}

const contained = (root, path) => {
  const rel = relative(root, path);
  return !!rel && rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
};

async function physicalPaths(projectRoot, path, decisionPath) {
  const root = await realpath(projectRoot);
  const source = await realpath(path);
  const decision = await realpath(decisionPath);
  if (!contained(root, source) || !contained(root, decision)) throw new Error('PHYSICAL_PATH_OUTSIDE_PROJECT');
  // Reject aliases instead of writing through a junction/symlink whose target could change.
  const samePath = (a, b) => process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b;
  if (!samePath(source, resolve(root, relative(projectRoot, path)))
      || !samePath(decision, resolve(root, relative(projectRoot, decisionPath)))) throw new Error('SOURCE_OR_DECISION_PATH_ALIAS');
  const core = resolve(root, 'docs/scrum-plan.md');
  if (samePath(source, core)) throw new Error('PROTECTED_CORE_PATH');
  const sourceStat = await stat(source);
  try {
    const coreStat = await stat(core);
    if (sourceStat.dev === coreStat.dev && sourceStat.ino === coreStat.ino) throw new Error('PROTECTED_CORE_FILE_ALIAS');
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (!sourceStat.isFile() || sourceStat.nlink !== 1) throw new Error('SOURCE_MUST_BE_UNALIASED_REGULAR_FILE');
  return { root, source, decision };
}

/** Build a non-writing exact approved append or reviewed rule-update preview. */
export function buildSotUpdatePlan({ proposal, approvedProposal, impact, conflict,
  coverage, module, currentSource, baselineSha256, targetHeading, proposedSection,
  traceability, decisionState, verifyUserDecision, verifyRuleReview, registry }) {
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
  const registryMatches = Array.isArray(registry?.modules)
    ? registry.modules.filter(item => item.module_id === module?.module_id) : [];
  if (registryMatches.length !== 1 || registryMatches[0]?.status !== 'active_reference'
      || registryMatches[0]?.authority !== module?.authority || registryMatches[0]?.source !== module?.source) {
    errors.push('VALIDATED_MODULE_REGISTRY_REQUIRED');
  }
  if (module?.module_id === 'scrum-core' || module?.source === 'docs/scrum-plan.md') errors.push('SCRUM_CORE_REQUIRES_SEPARATE_GOLDEN_BASELINE_GATE');
  if (impact?.proposal_id !== proposal?.id || impact?.owner?.module_id !== module?.module_id
      || impact?.owner?.authority !== module?.authority || impact?.owner?.source !== module?.source
      || !Array.isArray(impact?.unknowns) || impact.unknowns.length) errors.push('IMPACT_SCOPE_MISSING_OR_UNKNOWN');
  if (conflict?.proposal_id !== proposal?.id || conflict?.status !== 'CLASSIFIED'
      || conflict?.sot_update_allowed !== false || conflict?.user_decision_required !== false
      || !Array.isArray(conflict?.unresolved_candidate_ids) || conflict.unresolved_candidate_ids.length
      || !Array.isArray(conflict?.unknown_coverage) || conflict.unknown_coverage.length
      || !Array.isArray(conflict?.relationships)
      || conflict.relationships.some(item => !['EXTENSION', 'UNRELATED'].includes(item?.relation)
        && !(proposal?.rule_update?.kind === 'SUPERSEDE' && item?.candidate_id === proposal.rule_update.rule_id && item.relation === 'SUPERSEDES'))) {
    errors.push('CONFLICT_REVIEW_NOT_CLOSED_OR_UNSUPPORTED_RELATION');
  }
  if (proposal?.rule_update != null) {
    try {
      checkedRuleReview(proposal, verifyRuleReview);
      if (!isDeepStrictEqual(conflict, persistedRuleConflict(decisionState, approvalEvent, proposal))) throw new Error('PERSISTED_RULE_CONFLICT_MISMATCH');
    } catch (error) { errors.push(error.message); }
    const targetReviews = conflict?.relationships?.filter(item => item.candidate_id === proposal.rule_update.rule_id) ?? [];
    const expectedRelation = proposal.rule_update.kind === 'SUPERSEDE' ? 'SUPERSEDES' : 'EXTENSION';
    if (targetReviews.length !== 1 || targetReviews[0].relation !== expectedRelation) errors.push('EXACT_TARGET_CONFLICT_REVIEW_REQUIRED');
  }
  if (!coverage || coverage.proposal_id !== proposal?.id || !Array.isArray(coverage.unknowns)
      || coverage.unknowns.length || !Array.isArray(coverage.cross_module_unknowns)
      || coverage.cross_module_unknowns.length) errors.push('RULE_COVERAGE_OR_SEMANTIC_REVIEW_INCOMPLETE');
  if (!text(currentSource) || !/^[a-f0-9]{64}$/.test(baselineSha256 ?? '')
      || sha256(currentSource) !== baselineSha256) errors.push('SOURCE_BASELINE_MISMATCH');
  if (proposal?.target_heading !== targetHeading || proposal?.source_baseline_sha256 !== baselineSha256) errors.push('PERSISTED_TARGET_AND_BASELINE_REQUIRED');
  if (!text(targetHeading) || !text(proposedSection)) errors.push('TARGET_SECTION_AND_PROPOSED_TEXT_REQUIRED');
  if (!Array.isArray(traceability) || !traceability.some(record => record?.proposal_id === proposal?.id
      && record?.target_ref === module?.source && text(record?.source_ref) && text(record?.source_anchor))) {
    errors.push('PROPOSAL_TO_SOURCE_TRACEABILITY_REQUIRED');
  }
  if (errors.length) return { status: 'UPDATE_BLOCKED', errors, plan: null };

  let section, nextSection, updated, operation, required_check;
  try {
    // The section resolver also rejects ambiguous headings.
    extractHeadingSection(currentSource, targetHeading);
    ({ section, nextSection, updated, operation, required_check } = rebuildApprovedUpdate(currentSource, proposal));
  } catch (error) {
    return { status: 'UPDATE_BLOCKED', errors: [`SECTION_RESOLUTION_FAILED:${error.message}`], plan: null };
  }
  if (proposedSection.replace(/\r\n/g, '\n').trimEnd() !== nextSection) {
    return { status: 'UPDATE_BLOCKED', errors: ['EXACT_APPROVED_APPEND_REQUIRED'], plan: null };
  }
  return {
    status: 'PREPARED_NOT_APPLIED', errors: [],
    plan: {
      proposal_id: proposal.id,
      module_id: module.module_id,
      authority: module.authority,
      source: module.source,
      target_heading: targetHeading,
      operation, required_check, alert: required_check === 'FULL_CHECK' ? '\u26a0 FULL CHECK REQUIRED' : null, rule_update: structuredClone(proposal.rule_update ?? null),
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

/** Apply a fresh approved specialist preview with required review/check gates and exact rollback. */
export async function applySotUpdatePlan({ plan, projectRoot, decisionStatePath,
  verifyUserDecision, verifyRuleReview, validateAfter }) {
  try { plan = structuredClone(plan); }
  catch { return { status: 'APPLY_BLOCKED', reason: 'INVALID_UPDATE_PLAN' }; }
  if (!plan || !['APPEND_ONLY_SECTION_EXTENSION', 'EXTEND_EXISTING_RULE', 'MARK_SUPERSEDED_RULE'].includes(plan.operation)
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
  try { await physicalPaths(projectRoot, path, decisionPath); }
  catch (error) { return { status: 'APPLY_BLOCKED', reason: error.message }; }
  const lockPath = `${path}.sot-update.lock`;
  let lock;
  try { lock = await open(lockPath, 'wx'); }
  catch (error) { return { status: 'APPLY_BLOCKED', reason: error.code === 'EEXIST' ? 'UPDATE_LOCK_EXISTS' : error.message }; }
  const recoveryPath = `${path}.sot-recovery.json`;
  let recoveryCreated = false;
  let verifiedTerminal = false;
  let before;
  let after;
  let wrote = false;
  try {
    let registry;
    try { registry = await loadRegistry(resolve(projectRoot, 'docs/governance/module-registry.json'), { projectRoot }); }
    catch (error) { return { status: 'APPLY_BLOCKED', reason: `MODULE_REGISTRY_INVALID:${error.message}` }; }
    const registered = registry.modules.filter(module => module.module_id === plan.module_id);
    if (registered.length !== 1 || registered[0].status !== 'active_reference'
        || registered[0].authority !== plan.authority || registered[0].source !== plan.source) {
      return { status: 'APPLY_BLOCKED', reason: 'REGISTERED_SOURCE_OWNER_CHANGED' };
    }
    const decisionState = await createDecisionStore(decisionPath, { verifyUserDecision }).read();
    const approvalEvent = authenticatedApprovalEvent(decisionState, plan.proposal_id, verifyUserDecision);
    if (!approvalEvent || approvalEvent.event_hash !== plan.approval_event?.event_hash
        || approvalEvent.revision !== plan.approval_event?.revision
        || approvalEvent.transition.proposal.owner?.source !== plan.source
        || approvalEvent.transition.proposal.owner?.module_id !== plan.module_id
        || approvalEvent.transition.proposal.authority !== plan.authority
        || approvalEvent.transition.proposal.target_heading !== plan.target_heading
        || approvalEvent.transition.proposal.source_baseline_sha256 !== plan.before_sha256) {
      return { status: 'APPLY_BLOCKED', reason: 'PERSISTED_APPROVAL_REVALIDATION_FAILED' };
    }
    before = await readFile(path);
    if (sha256(before) !== plan.before_sha256) return { status: 'APPLY_BLOCKED', reason: 'SOURCE_CHANGED_AFTER_PREVIEW' };
    if (!Buffer.from(before.toString('utf8'), 'utf8').equals(before)) throw new Error('SOURCE_NOT_VALID_UTF8');
    extractHeadingSection(before.toString('utf8'), plan.target_heading);
    const approved = approvalEvent.transition.proposal;
    checkedRuleReview(approved, verifyRuleReview);
    persistedRuleConflict(decisionState, approvalEvent, approved);
    const rebuilt = rebuildApprovedUpdate(before.toString('utf8'), approved);
    if (rebuilt.operation !== plan.operation || rebuilt.required_check !== (plan.required_check ?? null)
        || !isDeepStrictEqual(approved.rule_update ?? null, plan.rule_update ?? null)) throw new Error('RULE_UPDATE_PLAN_CHANGED');
    if (rebuilt.updated !== plan.updated_source || rebuilt.section !== plan.before_section
        || rebuilt.nextSection !== plan.after_section) throw new Error('PREVIEW_NOT_EXACT_APPROVED_APPEND');
    await physicalPaths(projectRoot, path, decisionPath);
    after = Buffer.from(rebuilt.updated, 'utf8');
    if (sha256(after) !== plan.after_sha256) return { status: 'APPLY_BLOCKED', reason: 'PREVIEW_HASH_MISMATCH' };
    const payload = { schema_version: 1, transaction_id: randomUUID(), source: plan.source,
      proposal_id: plan.proposal_id, module_id: plan.module_id, authority: plan.authority,
      target_heading: plan.target_heading, before_sha256: plan.before_sha256,
      after_sha256: plan.after_sha256, before_base64: before.toString('base64'),
      approval_event: plan.approval_event };
    const journal = { ...payload, journal_sha256: sha256(JSON.stringify(payload)) };
    await lock.writeFile(JSON.stringify({ pid: process.pid, transaction_id: payload.transaction_id }));
    await lock.sync();
    const recovery = await open(recoveryPath, 'wx');
    recoveryCreated = true;
    try { await recovery.writeFile(JSON.stringify(journal)); await recovery.sync(); }
    finally { await recovery.close(); }
    await writeAtomic(path, after);
    wrote = true;
    const current = await readFile(path);
    if (sha256(current) !== plan.after_sha256) throw new Error('WRITTEN_SOURCE_HASH_MISMATCH');
    let validation;
    try { validation = await validateAfter({ plan: structuredClone(plan), source: current.toString('utf8'), source_path: path }); }
    catch (error) { validation = { status: 'POST_VALIDATION_BLOCKED', reason: error instanceof Error ? error.message : String(error) }; }
    const requiredModePassed = !rebuilt.required_check
      || (validation?.mode === 'FULL_CHECK')
      || (rebuilt.required_check === 'FAST_CHECK' && validation?.mode === 'FAST_CHECK');
    const boundRuleCheckPassed = !rebuilt.required_check || validation?.checks?.some(check => check.name === 'required_check' && check.status === 'PASS');
    if (requiredModePassed && boundRuleCheckPassed && validation?.status === 'POST_VALIDATION_PASS'
        && text(validation.audit_output) && Array.isArray(validation.checks)
        && validation.checks.length > 0 && validation.checks.every(check => check?.status === 'PASS')) {
      const validatedBytes = await readFile(path);
      if (sha256(validatedBytes) !== plan.after_sha256) {
        return { status: 'ROLLBACK_BLOCKED', reason: 'SOURCE_CHANGED_DURING_SUCCESSFUL_VALIDATION',
          expected_sha256: plan.after_sha256, actual_sha256: sha256(validatedBytes), post_validation: validation };
      }
      verifiedTerminal = true;
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
    verifiedTerminal = true;
    return { status: 'ROLLED_BACK', reason: validation?.reason ?? 'POST_VALIDATION_FAILED',
      source: plan.source, restored_sha256: sha256(restored), post_validation: validation };
  } catch (error) {
    if (wrote && before) {
      try {
        const live = await readFile(path);
        if (sha256(live) === plan.after_sha256) {
          await writeAtomic(path, before);
          const restored = await readFile(path);
          if (sha256(restored) === plan.before_sha256) { wrote = false; verifiedTerminal = true; }
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
    try { if (recoveryCreated && verifiedTerminal) await unlink(recoveryPath); }
    finally {
      await lock.close().catch(() => {});
      await unlink(lockPath).catch(() => {});
    }
  }
}


/** Recover an interrupted local write. A concurrent/unknown state is never overwritten. */
export async function recoverSotUpdate({ projectRoot, source, decisionStatePath, verifyUserDecision, verifyRuleReview }) {
  let lock;
  let lockPath;
  try {
    if (!isAbsolute(projectRoot ?? '') || typeof verifyUserDecision !== 'function') throw new Error('RECOVERY_ROOT_AND_AUTHENTICATOR_REQUIRED');
    for (const candidate of [source, decisionStatePath]) {
      if (!text(candidate) || isAbsolute(candidate) || candidate.includes('\\')
          || !contained(projectRoot, resolve(projectRoot, candidate))) throw new Error('UNSAFE_RECOVERY_PATH');
    }
    const path = resolve(projectRoot, source);
    const decisionPath = resolve(projectRoot, decisionStatePath);
    await physicalPaths(projectRoot, path, decisionPath);
    const journalPath = `${path}.sot-recovery.json`;
    if (await realpath(journalPath) !== journalPath || (await stat(journalPath)).nlink !== 1) throw new Error('RECOVERY_JOURNAL_ALIAS');
    const { journal_sha256, ...journal } = JSON.parse(await readFile(journalPath, 'utf8'));
    if (sha256(JSON.stringify(journal)) !== journal_sha256 || journal.schema_version !== 1
        || journal.source !== source || !text(journal.transaction_id)) throw new Error('RECOVERY_JOURNAL_INVALID');
    const state = await createDecisionStore(decisionPath, { verifyUserDecision }).read();
    const event = authenticatedApprovalEvent(state, journal.proposal_id, verifyUserDecision);
    const proposal = event?.transition.proposal;
    if (!event || event.event_hash !== journal.approval_event?.event_hash
        || event.revision !== journal.approval_event?.revision
        || proposal.owner.source !== source || proposal.owner.module_id !== journal.module_id
        || proposal.authority !== journal.authority || proposal.target_heading !== journal.target_heading
        || proposal.source_baseline_sha256 !== journal.before_sha256) throw new Error('RECOVERY_APPROVAL_MISMATCH');
    const before = Buffer.from(journal.before_base64, 'base64');
    if (sha256(before) !== proposal.source_baseline_sha256
        || !Buffer.from(before.toString('utf8'), 'utf8').equals(before)) throw new Error('RECOVERY_BASELINE_INVALID');
    extractHeadingSection(before.toString('utf8'), proposal.target_heading);
    checkedRuleReview(proposal, verifyRuleReview);
    const after = rebuildApprovedUpdate(before.toString('utf8'), proposal).updated;
    if (sha256(after) !== journal.after_sha256) throw new Error('RECOVERY_AFTER_HASH_INVALID');
    lockPath = `${path}.sot-update.lock`;
    try { lock = await open(lockPath, 'wx'); }
    catch (error) {
      if (error.code !== 'EEXIST') throw error;
      const owner = JSON.parse(await readFile(lockPath, 'utf8'));
      if (!Number.isSafeInteger(owner.pid) || owner.pid < 1 || owner.transaction_id !== journal.transaction_id) throw new Error('RECOVERY_LOCK_OWNER_UNKNOWN');
      try { process.kill(owner.pid, 0); throw new Error('RECOVERY_WRITER_STILL_ACTIVE'); }
      catch (probe) { if (probe.code !== 'ESRCH') throw probe; }
      await unlink(lockPath);
      lock = await open(lockPath, 'wx');
    }
    await physicalPaths(projectRoot, path, decisionPath);
    const current = await readFile(path);
    if (sha256(current) !== journal.before_sha256 && sha256(current) !== journal.after_sha256) throw new Error('RECOVERY_CONCURRENT_SOURCE_CHANGE');
    if (sha256(current) === journal.after_sha256) await writeAtomic(path, before);
    if (sha256(await readFile(path)) !== journal.before_sha256) throw new Error('RECOVERY_RESTORE_VERIFICATION_FAILED');
    await unlink(journalPath);
    return { status: 'RECOVERED', source, restored_sha256: journal.before_sha256 };
  } catch (error) { return { status: 'RECOVERY_BLOCKED', reason: error.message }; }
  finally {
    if (lock) { await lock.close(); await unlink(lockPath).catch(() => {}); }
  }
}
