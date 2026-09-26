import test from 'node:test';
import assert from 'node:assert/strict';
import { attachDecisionHandover, attachStatusHandover, attachWorkItemContext, buildChatHandover } from './chat-handover.mjs';
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
