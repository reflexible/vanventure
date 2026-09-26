const RELATIONS = new Set(['DUPLICATE', 'CONTRADICTION', 'SUPERSEDES', 'EXTENSION', 'UNRELATED']);
const isText = value => typeof value === 'string' && value.trim().length > 0;

/**
 * Classify an intake proposal against the read-only SoT impact search.
 * Candidate text matches are search hints only. A relationship requires
 * anchored reviewer evidence, and no result changes an authoritative source.
 *
 * reviews: [{ candidate_id, relation, evidence_ref, rationale, reviewer,
 *   demonstrated?: boolean }]. `demonstrated` is required for a contradiction;
 * an unsubstantiated allegation remains unresolved instead of requesting a
 * user decision. SUPERSEDES is intentionally not inferred from similar text.
 */
export function assessConflict({ proposal, impact, reviews = [] }) {
  if (!proposal || !isText(proposal.id) || proposal.integration !== 'NOT_STARTED'
    || !isText(proposal.authority) || !proposal.owner || proposal.conflict_check !== 'PENDING') {
    throw new Error('A non-integrated intake proposal awaiting conflict check is required.');
  }
  if (!impact || impact.proposal_id !== proposal.id || !Array.isArray(impact.candidates)
    || !Array.isArray(impact.unknowns) || impact.conflict_check !== 'PENDING'
    || impact.owner?.module_id !== proposal.owner.module_id
    || impact.owner?.authority !== proposal.authority || impact.owner?.source !== proposal.owner.source) {
    throw new Error('A matching, pending SoT impact result is required.');
  }
  if (!Array.isArray(reviews)) throw new Error('reviews must be an array.');
  const candidates = new Map();
  for (const candidate of impact.candidates) {
    if (!isText(candidate?.id) || candidates.has(candidate.id) || !isText(candidate.anchor)
      || !isText(candidate.source)) throw new Error('Impact candidates need unique IDs and source anchors.');
    candidates.set(candidate.id, candidate);
  }
  const byId = new Map();
  for (const review of reviews) {
    if (!candidates.has(review?.candidate_id)) throw new Error(`Unknown candidate: ${review?.candidate_id}.`);
    if (byId.has(review.candidate_id)) throw new Error(`Duplicate review: ${review.candidate_id}.`);
    if (!RELATIONS.has(review.relation) || !isText(review.evidence_ref)
      || !isText(review.rationale) || !isText(review.reviewer)) {
      throw new Error(`Review ${review.candidate_id} needs a relationship and reviewer evidence.`);
    }
    if (review.relation === 'CONTRADICTION' && typeof review.demonstrated !== 'boolean') {
      throw new Error(`Review ${review.candidate_id} must state whether the contradiction is demonstrated.`);
    }
    byId.set(review.candidate_id, review);
  }
  const relationships = [...candidates.values()].map(candidate => {
    const review = byId.get(candidate.id);
    return {
      candidate_id: candidate.id, source: candidate.source, anchor: candidate.anchor,
      search_comparison: candidate.comparison,
      relation: review?.relation ?? 'UNDETERMINED',
      demonstrated: review?.relation === 'CONTRADICTION' ? review.demonstrated : null,
      evidence_ref: review?.evidence_ref ?? null,
      rationale: review?.rationale ?? null,
      reviewer: review?.reviewer ?? null,
    };
  });
  const demonstratedConflicts = relationships.filter(item => item.relation === 'CONTRADICTION' && item.demonstrated);
  const unresolved = relationships.filter(item => item.relation === 'UNDETERMINED'
    || (item.relation === 'CONTRADICTION' && !item.demonstrated));
  const unknownCoverage = impact.unknowns.map(item => ({ ...item }));
  const status = demonstratedConflicts.length ? 'CONFLICT'
    : unresolved.length || unknownCoverage.length ? 'NEEDS_ANALYSIS' : 'CLASSIFIED';
  return {
    schema_version: '1.0.0', proposal_id: proposal.id, status,
    relationships, unknown_coverage: unknownCoverage,
    unresolved_candidate_ids: unresolved.map(item => item.candidate_id),
    user_decision_required: demonstratedConflicts.length > 0,
    decision: demonstratedConflicts.length ? {
      kind: 'GENUINE_RULE_CONFLICT',
      candidate_ids: demonstratedConflicts.map(item => item.candidate_id),
      question: 'Welche der belegten widersprüchlichen Regeln soll gelten?',
    } : null,
    sot_update_allowed: false,
    approval: null,
  };
}
