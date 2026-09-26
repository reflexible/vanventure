import { validateContractPayload } from './contracts.mjs';

const ACTIVE = new Set(['CLAIMED', 'IN_PROGRESS']);
const DONE = 'DONE';

function status(value) { return String(value ?? '').trim().toUpperCase().replaceAll(' ', '_'); }
function hasRef(value) { return typeof value === 'string' && value.trim().length > 0; }
function values(value) { return value instanceof Set ? value : new Set(value ?? []); }
function lookup(value, key) { return value instanceof Map ? value.get(key) : value?.[key]; }

/**
 * Validate the substantive boundary rules against supplied, authoritative state.
 * This function is pure: callers must obtain current records, preserve their
 * provenance, and apply the validated transition atomically themselves.
 */
export function validateContractInvariant(contract, payload, context = {}) {
  const errors = [...validateContractPayload(contract, payload).errors];
  if (errors.length) return { valid: false, errors };

  switch (contract.contract_id) {
    case 'SCRUM-WORK-ITEM': {
      const expectedStory = lookup(context.workItemStories, payload.work_item_id);
      const expectedRef = lookup(context.storySourceRefs, payload.story_id);
      if (!expectedStory) errors.push('Work-item story mapping is unavailable.');
      else if (expectedStory !== payload.story_id) errors.push('Work item does not resolve to its recorded Scrum story.');
      if (!expectedRef) errors.push('Authoritative story source reference is unavailable.');
      else if (expectedRef !== payload.source_ref) errors.push('source_ref does not match the authoritative story location.');
      break;
    }
    case 'SOT-DECISION-CHANGE': {
      const expectedRef = lookup(context.moduleSourceRefs, payload.target_module_id);
      if (!expectedRef) errors.push('Target module authority is unavailable.');
      if (!values(context.sourceRefs).has(payload.source_ref)) errors.push('Source reference is not evidenced.');
      if (context.action === 'apply') {
        if (status(payload.decision_status) !== 'APPROVED') errors.push('Apply requires an approved decision.');
        if (!hasRef(payload.decision_ref) || !values(context.approvalEvidence).has(payload.decision_ref)) {
          errors.push('Apply requires an evidenced approval reference.');
        }
        if (context.checks?.conflict !== 'PASS') errors.push('Apply requires a passed conflict check.');
        if (context.checks?.impact !== 'PASS') errors.push('Apply requires a passed impact check.');
      }
      break;
    }
    case 'WORKER-WORK-ASSIGNMENT': {
      const current = context.activeClaims;
      if (!Array.isArray(current)) {
        errors.push('Current active claims are unavailable.');
        break;
      }
      if (payload.write_scope.length === 0 || payload.write_scope.some(scope => !hasRef(scope))) {
        errors.push('write_scope must contain nonempty scope names.');
      }
      if (!hasRef(payload.claimed_at) || Number.isNaN(Date.parse(payload.claimed_at))) {
        errors.push('claimed_at must be a timestamp.');
      }
      const active = ACTIVE.has(status(payload.claim_status));
      const prior = context.previousClaim;
      if (active) {
        const sameItem = current.filter(claim => claim.work_item_id === payload.work_item_id && ACTIVE.has(status(claim.claim_status)));
        const idempotent = sameItem.length === 1 && sameItem[0].worker_id === payload.worker_id
          && sameItem[0].claimed_at === payload.claimed_at;
        if (sameItem.length && !idempotent) errors.push('An active work item already has a claim.');
        if (prior && prior.worker_id !== payload.worker_id) {
          const handoff = context.reassignment;
          if (handoff?.from_worker_id !== prior.worker_id || handoff?.to_worker_id !== payload.worker_id
            || !hasRef(handoff.ref) || !hasRef(handoff.reason)) {
            errors.push('Ownership change requires an explicit, evidenced reassignment.');
          }
          if (ACTIVE.has(status(prior.claim_status))) errors.push('Previous active claim must be released first.');
        }
        const critical = values(context.criticalScopes);
        for (const claim of current) {
          if (!ACTIVE.has(status(claim.claim_status)) || claim.work_item_id === payload.work_item_id) continue;
          for (const scope of payload.write_scope) {
            if (!critical.has(scope) || !claim.write_scope?.includes(scope)) continue;
            const coordinated = context.coordination?.some(item => item.with_worker_id === claim.worker_id
              && item.scope === scope && hasRef(item.ref));
            if (!coordinated) errors.push(`Critical scope ${scope} overlaps without evidenced coordination_ref.`);
          }
        }
      }
      if (status(payload.claim_status) === DONE) {
        if (context.review?.status !== 'PASS' || !hasRef(context.review.ref)
          || !hasRef(context.review.reviewer_id)
          || context.review.reviewer_id === payload.worker_id) {
          errors.push('Done requires evidenced review by another agent.');
        }
        if (context.integration?.status !== 'PASS' || !hasRef(context.integration.ref)) {
          errors.push('Done requires evidenced integration.');
        }
      }
      break;
    }
    case 'CMS-PUBLISHING':
    case 'ANALYTICS-CONTENT-ID':
      errors.push(`${contract.contract_id} needs its actual runtime boundary and cannot be certified by fixture state.`);
      break;
    default:
      errors.push(`No substantive invariant validator for ${contract.contract_id}.`);
  }
  return { valid: errors.length === 0, errors };
}
