import test from 'node:test';
import assert from 'node:assert/strict';
import { buildChatHandover } from './chat-handover.mjs';
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
