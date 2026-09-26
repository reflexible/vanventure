const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;
const terminal = new Set(['Done', 'Backlog']);

/** Build a local, immutable handover packet from durable shared state only. */
export function buildChatHandover({ record, planStatus, decisionRefs = [], sourceRef }) {
  if (!record || !text(record.work_item_id) || !text(record.assigned_agent) || !Array.isArray(record.write_scope) || !text(planStatus) || !text(sourceRef)) {
    throw new Error('HANDOVER_RECORD_PLAN_AND_SOURCE_REQUIRED');
  }
  if (terminal.has(record.execution_state)) throw new Error('HANDOVER_REQUIRES_ACTIVE_OR_REVIEWABLE_WORK');
  if (!['READY', 'IN_PROGRESS', 'BLOCKED'].includes(planStatus)) throw new Error('HANDOVER_PLAN_STATUS_NOT_TRANSFERABLE');
  if (!Array.isArray(decisionRefs) || decisionRefs.some(ref => !text(ref))) throw new Error('HANDOVER_DECISION_REFERENCES_INVALID');
  return Object.freeze({ schema_version: '1.0.0', kind: 'local_chat_handover', work_item_id: record.work_item_id,
    plan_status: planStatus, execution_state: record.execution_state, assigned_agent: record.assigned_agent,
    write_scope: Object.freeze([...record.write_scope]), blocked_by: record.blocked_by ?? null,
    decision_refs: Object.freeze([...new Set(decisionRefs)].sort()), source_ref: sourceRef,
    remote_execution_authorized: false, competing_backlog_authorized: false });
}

/** Carry only explicit context for the already identified work item. */
export function attachWorkItemContext(handover, { title, acceptanceCriteria, dependencies = [] }) {
  if (!handover || handover.kind !== 'local_chat_handover' || !text(title) || !Array.isArray(acceptanceCriteria)
      || !acceptanceCriteria.length || acceptanceCriteria.some(item => !text(item))
      || !Array.isArray(dependencies) || dependencies.some(item => !text(item))) throw new Error('HANDOVER_WORK_ITEM_CONTEXT_INVALID');
  return Object.freeze({ ...handover, title, acceptance_criteria: Object.freeze([...acceptanceCriteria]),
    dependencies: Object.freeze([...new Set(dependencies)].sort()), execution_authorized: false });
}

/** Preserve the authoritative plan and operational status without making either writable. */
export function attachStatusHandover(handover, { planStatus, executionState }) {
  if (!handover || handover.kind !== 'local_chat_handover' || !text(planStatus) || !text(executionState)) throw new Error('HANDOVER_STATUS_INVALID');
  return Object.freeze({ ...handover, status_handover: Object.freeze({ plan_status: planStatus, execution_state: executionState }), status_authority: 'AUTHORITATIVE_PLAN_AND_WORKER_STATE', execution_authorized: false });
}

/** Attach only anchored references to decisions; the decision store remains the sole decision authority. */
export function attachDecisionHandover(handover, { decisionRefs, decisionStateRef }) {
  if (!handover || handover.kind !== 'local_chat_handover' || !Array.isArray(decisionRefs) || !decisionRefs.length
      || decisionRefs.some(ref => !text(ref) || !/^[^\s#]+#[^\s#]+$/.test(ref))
      || !text(decisionStateRef) || !/^[^\s#]+#[^\s#]+$/.test(decisionStateRef)) {
    throw new Error('HANDOVER_DECISION_CONTEXT_INVALID');
  }
  return Object.freeze({ ...handover, decision_handover: Object.freeze({
    decision_refs: Object.freeze([...new Set(decisionRefs)].sort()), decision_state_ref: decisionStateRef,
    authority: 'AUTHORITATIVE_DECISION_STORE', writable: false,
  }), decision_authorized: false, decision_write_authorized: false, execution_authorized: false });
}
