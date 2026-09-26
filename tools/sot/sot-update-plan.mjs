import { createHash } from 'node:crypto';
import { extractHeadingSection } from './rule-catalogue.mjs';

const text = value => typeof value === 'string' && value.trim().length > 0;
const sha256 = value => createHash('sha256').update(value).digest('hex');

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
  traceability }) {
  const errors = [];
  if (!proposal || proposal.status !== 'APPROVED' || proposal.integration !== 'NOT_STARTED'
      || !text(proposal.id) || !text(proposal.content)) errors.push('APPROVED_NON_INTEGRATED_PROPOSAL_REQUIRED');
  if (!approvedProposal || approvedProposal.id !== proposal?.id || approvedProposal.status !== 'APPROVED'
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
      write_performed: false,
    },
  };
}
