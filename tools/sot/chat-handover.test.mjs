import test from 'node:test';
import assert from 'node:assert/strict';
import { attachDecisionHandover, attachSotHandover, attachStatusHandover, attachWorkItemContext, buildChatHandover, verifyChatHandoverTruth } from './chat-handover.mjs';
import { loadRegistry } from './module-registry.mjs';
const record = { work_item_id: 'WI-SOT-22-01', execution_state: 'In Progress', assigned_agent: 'agent-a', write_scope: ['tools/sot'], blocked_by: null };
test('builds a local non-authorizing handover from durable work state', () => {
  const result = buildChatHandover({ record, planStatus: 'IN_PROGRESS', decisionRefs: ['DEC-2', 'DEC-1'], sourceRef: 'docs/governance/worker-state.json' });
  assert.equal(result.kind, 'local_chat_handover'); assert.equal(result.remote_execution_authorized, false);
  assert.equal(result.competing_backlog_authorized, false); assert.deepEqual(result.decision_refs, ['DEC-1', 'DEC-2']);
});
test('rejects terminal, ambiguous and non-transferable handover state', () => {
  assert.throws(() => buildChatHandover({ record: {...record, execution_state:'Done'}, planStatus:'IN_PROGRESS', sourceRef:'state' }), /ACTIVE/);
  assert.throws(() => buildChatHandover({ record, planStatus:'TODO', sourceRef:'state' }), /PLAN_STATUS/);
  assert.throws(() => buildChatHandover({ record, planStatus:'IN_PROGRESS', sourceRef:'' }), /REQUIRED/);
});
test('attaches explicit work-item context without creating authority', () => {
  const handover = buildChatHandover({ record, planStatus: 'IN_PROGRESS', sourceRef: 'state' });
  const result = attachWorkItemContext(handover, { title: 'Context', acceptanceCriteria: ['Preserve source'], dependencies: ['WI-SOT-20-10'] });
  assert.deepEqual(result.dependencies, ['WI-SOT-20-10']); assert.equal(result.execution_authorized, false);
  assert.throws(() => attachWorkItemContext(handover, { title: 'Context', acceptanceCriteria: [] }), /CONTEXT/);
});

test('attaches read-only plan and execution status', () => { const h=buildChatHandover({record,planStatus:'IN_PROGRESS',sourceRef:'state'}); const r=attachStatusHandover(h,{planStatus:'IN_PROGRESS',executionState:'Review'}); assert.equal(r.status_authority,'AUTHORITATIVE_PLAN_AND_WORKER_STATE'); assert.equal(r.execution_authorized,false); });


test('attaches anchored decision references without transferring decision authority', () => {
  const handover = buildChatHandover({ record, planStatus: 'IN_PROGRESS', sourceRef: 'state' });
  const result = attachDecisionHandover(handover, { decisionRefs: ['state.jsonl#revision-4', 'state.jsonl#revision-2', 'state.jsonl#revision-2'], decisionStateRef: 'state.jsonl#head' });
  assert.deepEqual(result.decision_handover.decision_refs, ['state.jsonl#revision-2', 'state.jsonl#revision-4']);
  assert.equal(result.decision_handover.writable, false); assert.equal(result.decision_authorized, false);
  assert.equal(result.decision_write_authorized, false); assert.equal(result.execution_authorized, false);
  assert.throws(() => attachDecisionHandover(handover, { decisionRefs: ['unanchored'], decisionStateRef: 'state.jsonl#head' }), /CONTEXT/);
  assert.throws(() => attachDecisionHandover(handover, { decisionRefs: [], decisionStateRef: 'state.jsonl#head' }), /CONTEXT/);
});


test('attaches a registered source locator without creating a writable SoT', async () => {
  const handover = buildChatHandover({ record, planStatus: 'IN_PROGRESS', sourceRef: 'state' });
  const module = (await loadRegistry()).modules.find(item => item.module_id === 'sot-architecture');
  const sourceRef = `${module.source}#st-sot-22--phase-22-cross-chat--handover`;
  const result = attachSotHandover(handover, { module, sourceRef });
  assert.equal(result.sot_handover.module_id, 'sot-architecture'); assert.equal(result.sot_handover.baseline, null);
  assert.equal(result.sot_handover.writable, false); assert.equal(result.sot_update_authorized, false);
  assert.equal(result.competing_backlog_authorized, false); assert.equal(result.execution_authorized, false);
  assert.throws(() => attachSotHandover(handover, { module, sourceRef: 'other.md#handover' }), /CONTEXT/);
  assert.throws(() => attachSotHandover(handover, { module: { ...module, last_verified_baseline: { ref: 'tag', sha256_crlf: 'bad' } }, sourceRef }), /BASELINE/);
});

test('accepts only a packet that agrees with the authoritative plan, worker state and registered SoT', async () => {
  const registry = await loadRegistry();
  const module = registry.modules.find(item => item.module_id === 'sot-architecture');
  const state = { records: { [record.work_item_id]: structuredClone(record) } };
  let handover = buildChatHandover({ record, planStatus: 'IN_PROGRESS', sourceRef: 'state.json' });
  handover = attachStatusHandover(handover, { planStatus: 'IN_PROGRESS', executionState: 'In Progress' });
  handover = attachSotHandover(handover, { module, sourceRef: `${module.source}#st-sot-22--phase-22-cross-chat--handover` });
  const result = verifyChatHandoverTruth(handover, { state, registry,
    planText: '- [ ] IN_PROGRESS – WI-SOT-22-01 · Handover', stateSourceRef: 'state.json' });
  assert.equal(result.truth_status, 'AUTHORITATIVE_SOURCES_ALIGNED');
  assert.equal(result.execution_authorized, false);
  assert.equal(result.competing_backlog_authorized, false);
});

test('rejects shadow fields and every authority disagreement between chats', async () => {
  const registry = await loadRegistry();
  const state = { records: { [record.work_item_id]: structuredClone(record) } };
  const handover = buildChatHandover({ record, planStatus: 'IN_PROGRESS', sourceRef: 'state.json' });
  const options = { state, registry, planText: '- [ ] IN_PROGRESS – WI-SOT-22-01 · Handover', stateSourceRef: 'state.json' };
  assert.throws(() => verifyChatHandoverTruth(Object.freeze({ ...handover, plan_status: 'READY' }), options), /STATUS_TRUTH/);
  assert.throws(() => verifyChatHandoverTruth(Object.freeze({ ...handover, assigned_agent: 'agent-b' }), options), /WORKER_TRUTH/);
  assert.throws(() => verifyChatHandoverTruth(Object.freeze({ ...handover, competing_backlog: ['shadow'] }), options), /SHADOW_TRUTH/);
  assert.throws(() => verifyChatHandoverTruth(Object.freeze({ ...handover, source_ref: 'other-state.json' }), options), /AUTHORITY_ESCALATION/);
});
