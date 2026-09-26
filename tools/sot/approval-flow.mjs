const isText = value => typeof value === 'string' && value.trim().length > 0;
const isTimestamp = value => isText(value) && Number.isFinite(Date.parse(value))
  && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(value);
const isDate = value => typeof value === 'string' && /^\d{4}-\d\d-\d\d$/.test(value)
  && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

function requireRecord(actor, evidence) {
  if (actor?.role !== 'USER' || !isText(actor.id)) {
    throw new Error('An explicit identified user decision is required.');
  }
  if (!isText(evidence?.reference) || !isText(evidence?.scope)
    || !isText(evidence?.wording) || !(evidence?.date_precision === 'date'
      ? isDate(evidence?.decided_at) : isTimestamp(evidence?.decided_at))
    || evidence?.date_precision !== undefined && !['date', 'timestamp'].includes(evidence.date_precision)) {
    throw new Error('Decision needs a reference, scope, wording and timestamp or explicitly date-precise record; silence is not approval.');
  }
  return { actor: { role: actor.role, id: actor.id }, evidence: {
    reference: evidence.reference, scope: evidence.scope,
    wording: evidence.wording, decided_at: evidence.decided_at,
    ...(evidence.date_precision !== undefined ? { date_precision: evidence.date_precision } : {}),
  } };
}

function checkProposal(proposal) {
  if (!proposal || !isText(proposal.id) || !isText(proposal.authority)
    || !isText(proposal.owner?.module_id) || proposal.owner.authority !== proposal.authority
    || !isText(proposal.owner.source) || !['IDEA', 'PROPOSED', 'APPROVED', 'SUPERSEDED', 'REJECTED'].includes(proposal.status)
    || proposal.integration !== 'NOT_STARTED' && proposal.status !== 'APPROVED'
    || ['IDEA', 'PROPOSED'].includes(proposal.status) && proposal.approval != null
    || proposal.status === 'APPROVED' && !proposal.approval) {
    throw new Error('A valid intake proposal with a recognized lifecycle state is required.');
  }
}

function checkConflict(proposal, conflict, decision) {
  if (!conflict || conflict.proposal_id !== proposal.id
    || !Array.isArray(conflict.relationships) || !Array.isArray(conflict.unknown_coverage)
    || !Array.isArray(conflict.unresolved_candidate_ids)) {
    throw new Error('A matching conflict review with coverage evidence is required.');
  }
  if (conflict.unknown_coverage.length || conflict.unresolved_candidate_ids.length
    || conflict.relationships.some(item => item.relation === 'UNDETERMINED'
      || item.relation === 'CONTRADICTION' && item.demonstrated !== true)) {
    throw new Error('Unknown coverage or unresolved semantic review blocks approval.');
  }
  const conflicts = conflict.relationships.filter(item => item.relation === 'CONTRADICTION' && item.demonstrated);
  if (conflicts.length) {
    if (conflict.status !== 'CONFLICT' || conflict.user_decision_required !== true
      || !Array.isArray(conflict.decision?.candidate_ids)) {
      throw new Error('Demonstrated contradictions require a visible conflict decision.');
    }
    const ids = conflicts.map(item => item.candidate_id).sort();
    if (JSON.stringify([...conflict.decision.candidate_ids].sort()) !== JSON.stringify(ids)
      || !Array.isArray(decision?.resolutions) || decision.resolutions.length !== ids.length) {
      throw new Error('Every demonstrated contradiction needs an explicit resolution.');
    }
    const resolved = new Map();
    for (const item of decision.resolutions) {
      if (!ids.includes(item?.candidate_id) || resolved.has(item.candidate_id)
        || !['PROPOSAL_PREVAILS', 'EXISTING_PREVAILS'].includes(item.outcome)
        || !isText(item.rationale)) throw new Error('Invalid or duplicate conflict resolution.');
      resolved.set(item.candidate_id, item);
    }
    if (resolved.size !== ids.length || [...resolved.values()].some(item => item.outcome !== 'PROPOSAL_PREVAILS')) {
      throw new Error('A proposal cannot be approved while an existing rule prevails.');
    }
    return { resolutions: [...resolved.values()].map(item => ({ ...item })) };
  }
  if (conflict.status !== 'CLASSIFIED' || conflict.user_decision_required !== false) {
    throw new Error('Conflict review must be classified before approval.');
  }
  if (decision != null) throw new Error('A conflict resolution without a demonstrated conflict is invalid.');
  return null;
}

/**
 * Pure proposal lifecycle transition. This records a scoped decision but never
 * changes the authoritative source or grants design, release or live approval.
 * Callers must persist the resulting record in the shared governance state.
 */
export function advanceApproval({ proposal, action, actor, evidence, conflict = null,
  decision = null, replacement = null }) {
  checkProposal(proposal);
  const before = structuredClone(proposal);
  let after;
  switch (action) {
    case 'PROPOSE':
      if (proposal.status !== 'IDEA') throw new Error('Only an IDEA can become PROPOSED.');
      if (actor || evidence || decision || replacement) throw new Error('Proposal preparation cannot contain an approval.');
      after = { ...proposal, status: 'PROPOSED' };
      break;
    case 'APPROVE': {
      if (proposal.status !== 'PROPOSED') throw new Error('Only a reviewed PROPOSED item can be approved.');
      if (proposal.integration !== 'NOT_STARTED' || proposal.approval != null) {
        throw new Error('An already integrated or approved proposal cannot be approved again.');
      }
      const record = requireRecord(actor, evidence);
      if (!record.evidence.scope.includes(proposal.id)) {
        throw new Error('Approval scope must explicitly identify this proposal.');
      }
      const resolutions = checkConflict(proposal, conflict, decision);
      after = { ...proposal, status: 'APPROVED', approval: {
        ...record, conflict_decision: resolutions, kind: 'PROPOSAL_INTEGRATION_ONLY',
        grants_product_release: false, grants_design_rule: false, grants_live_rollout: false,
      } };
      break;
    }
    case 'REJECT':
      if (!['IDEA', 'PROPOSED'].includes(proposal.status)) throw new Error('Only an unapproved item can be rejected.');
      after = { ...proposal, status: 'REJECTED', rejection: requireRecord(actor, evidence) };
      break;
    case 'SUPERSEDE':
      if (proposal.status !== 'APPROVED' || !proposal.approval) {
        throw new Error('Only an approved item can be superseded.');
      }
      if (!isText(replacement?.id) || replacement.id === proposal.id || replacement.status !== 'APPROVED'
        || !replacement.approval || replacement.authority !== proposal.authority
        || replacement.owner?.source !== proposal.owner.source) {
        throw new Error('Superseding requires an approved replacement with the same authority.');
      }
      after = { ...proposal, status: 'SUPERSEDED', supersession: {
        ...requireRecord(actor, evidence), replacement_id: replacement.id,
      } };
      break;
    default:
      throw new Error(`Unsupported approval action: ${action}.`);
  }
  return { schema_version: '1.0.0', proposal_id: proposal.id, prior_status: before.status,
    status: after.status, proposal: after,
    sot_update_allowed: action === 'APPROVE', release_allowed: false };
}
