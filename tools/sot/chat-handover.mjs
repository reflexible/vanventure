const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;
const terminal = new Set(['Done', 'Backlog']);
const packetKeys = new Set(['schema_version', 'kind', 'work_item_id', 'plan_status', 'execution_state',
  'assigned_agent', 'write_scope', 'blocked_by', 'decision_refs', 'source_ref',
  'remote_execution_authorized', 'competing_backlog_authorized', 'title', 'acceptance_criteria',
  'dependencies', 'execution_authorized', 'status_handover', 'status_authority', 'decision_handover',
  'decision_authorized', 'decision_write_authorized', 'sot_handover', 'sot_authority',
  'sot_update_authorized']);

function planStatusFor(planText, workItemId) {
  if (typeof planText !== 'string') throw new Error('HANDOVER_AUTHORITATIVE_PLAN_REQUIRED');
  const matches = planText.split(/\r?\n/).flatMap(line => {
    const done = new RegExp(`^- \\[x\\] ~~(${workItemId}) · .+~~$`).exec(line);
    const open = new RegExp(`^- \\[ \\] (TODO|READY|IN_PROGRESS|BLOCKED) – (${workItemId}) · .+$`).exec(line);
    return done ? ['DONE'] : open ? [open[1]] : [];
  });
  if (matches.length !== 1) throw new Error('HANDOVER_AUTHORITATIVE_PLAN_ITEM_INVALID');
  return matches[0];
}

/**
 * Fail closed unless a received chat packet exactly agrees with the durable plan,
 * worker record and (where present) registered SoT locator. The result is still
 * read-only context: it does not claim, update, approve or execute anything.
 */
export function verifyChatHandoverTruth(handover, { state, registry, planText, stateSourceRef }) {
  if (!handover || handover.kind !== 'local_chat_handover' || !Object.isFrozen(handover)
      || !text(stateSourceRef) || !state?.records || !Array.isArray(registry?.modules)) {
    throw new Error('HANDOVER_AUTHORITATIVE_INPUT_REQUIRED');
  }
  if (Object.keys(handover).some(key => !packetKeys.has(key))) throw new Error('HANDOVER_SHADOW_TRUTH_REJECTED');
  if (handover.source_ref !== stateSourceRef || handover.remote_execution_authorized !== false
      || handover.competing_backlog_authorized !== false || handover.execution_authorized === true
      || handover.decision_authorized === true || handover.decision_write_authorized === true
      || handover.sot_update_authorized === true) throw new Error('HANDOVER_AUTHORITY_ESCALATION_REJECTED');
  const record = state.records[handover.work_item_id];
  if (!record || record.work_item_id !== handover.work_item_id || record.execution_state !== handover.execution_state
      || record.assigned_agent !== handover.assigned_agent
      || JSON.stringify(record.write_scope) !== JSON.stringify(handover.write_scope)
      || (record.blocked_by ?? null) !== (handover.blocked_by ?? null)) {
    throw new Error('HANDOVER_WORKER_TRUTH_MISMATCH');
  }
  const planStatus = planStatusFor(planText, handover.work_item_id);
  if (handover.plan_status !== planStatus
      || (handover.status_handover && (handover.status_handover.plan_status !== planStatus
        || handover.status_handover.execution_state !== record.execution_state))) {
    throw new Error('HANDOVER_STATUS_TRUTH_MISMATCH');
  }
  if (handover.sot_handover) {
    const module = registry.modules.find(item => item.module_id === handover.sot_handover.module_id);
    if (!module || module.status !== 'active_reference' || handover.sot_handover.writable !== false
        || module.authority !== handover.sot_handover.authority || module.source !== handover.sot_handover.source
        || !handover.sot_handover.source_ref.startsWith(`${module.source}#`)) {
      throw new Error('HANDOVER_SOT_TRUTH_MISMATCH');
    }
  }
  return Object.freeze({ ...handover, truth_status: 'AUTHORITATIVE_SOURCES_ALIGNED',
    execution_authorized: false, competing_backlog_authorized: false });
}

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


/** Carry the registered SoT locator only; it is not a writable authority or a second plan. */
export function attachSotHandover(handover, { module, sourceRef }) {
  if (!handover || handover.kind !== 'local_chat_handover' || !module || !text(module.module_id)
      || !text(module.authority) || !text(module.source) || module.status !== 'active_reference'
      || !text(sourceRef) || !sourceRef.startsWith(`${module.source}#`)) {
    throw new Error('HANDOVER_SOT_CONTEXT_INVALID');
  }
  const baseline = module.last_verified_baseline ?? null;
  if (baseline !== null && (!text(baseline.ref) || !/^[a-f0-9]{64}$/.test(baseline.sha256_crlf ?? ''))) {
    throw new Error('HANDOVER_SOT_BASELINE_INVALID');
  }
  return Object.freeze({ ...handover, sot_handover: Object.freeze({
    module_id: module.module_id, authority: module.authority, source: module.source,
    source_ref: sourceRef, baseline: baseline === null ? null : Object.freeze({ ref: baseline.ref, sha256_crlf: baseline.sha256_crlf }),
    writable: false,
  }), sot_authority: 'REGISTERED_MODULE_ONLY', sot_update_authorized: false,
    competing_backlog_authorized: false, execution_authorized: false });
}
