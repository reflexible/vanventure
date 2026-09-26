import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { buildDependencyGraph } from './dependency-graph.mjs';
import { planExecution } from './execution-planner.mjs';

const hash = value => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');
function fixture() {
  const backlog = [
    '| ST-SOT-01 | Base | | P1 |', '| ST-SOT-02 | Enabler | ST-SOT-01 | P1 |',
    '| ST-SOT-03 | Consumer | ST-SOT-02 | P1 |', '| ST-SOT-04 | Independent | | P1 |', '| ST-SOT-05 | Active | | P1 |',
    '#### ST-SOT-01 - Base', '- [x] ~~WI-SOT-01-01 · Existing completed base~~',
    '#### ST-SOT-02 - Enabler', '- [ ] READY – WI-SOT-02-01 · Unblocks consumer',
    '#### ST-SOT-03 - Consumer', '- [ ] READY – WI-SOT-03-01 · Wait for enabler',
    '#### ST-SOT-04 - Independent', '- [ ] READY – WI-SOT-04-01 · Independent work',
    '#### ST-SOT-05 - Active', '- [ ] IN_PROGRESS – WI-SOT-05-01 · Active work',
  ].join('\n');
  const graph = buildDependencyGraph({ registry: { modules: [{ module_id: 'sot-architecture', source: 'plan.md', dependencies: [] }] },
    contracts: { contracts: [] }, epicText: backlog });
  const state = { schema_version: '1.0.0', kind: 'operational_worker_state', revision: 1, history: [], records: {
    'WI-SOT-05-01': { work_item_id: 'WI-SOT-05-01', execution_state: 'In Progress', assigned_agent: 'worker-A',
      claimed_at: '2026-09-26T10:00:00Z', write_scope: ['src/current'], handoff: null, review: null, integration: null },
  } };
  const scopeAnalyses = Object.fromEntries(['02', '03', '04', '05'].map(n => [`WI-SOT-${n}-01`, {
    status: 'ANALYZED', evidence_ref: `review:${n}`, backlog_sha256: hash(backlog), graph_sha256: hash(graph),
    dependencies_reviewed: true, unresolved_decisions: [], write_scope: [`src/${n}`], parallelization_status: 'Parallel Safe',
  }]));
  return { backlog, graph, state, scopeAnalyses };
}

test('derives counters, current work, enabler-first recommendation and independent parallel candidates', () => {
  const input = fixture(); const before = structuredClone(input);
  const result = planExecution(input);
  assert.equal(result.status, 'EXECUTION_PLAN_DERIVED', result.errors.join(';'));
  assert.deepEqual(result.counter, { Done: 1, Total: 5, Open: 4, 'Progress %': 20 });
  assert.equal(result.current_work_items[0].assigned_agent, 'worker-A');
  assert.equal(result.next_recommended.work_item_id, 'WI-SOT-02-01');
  assert.deepEqual(result.next_recommended.unlocks, ['WI-SOT-03-01']);
  assert.deepEqual(result.parallel_candidates.map(c => c.work_item_id), ['WI-SOT-02-01', 'WI-SOT-04-01']);
  assert.match(result.exclusions.find(c => c.work_item_id === 'WI-SOT-03-01').reasons.join(';'), /HARD_DEPENDENCIES/);
  assert.equal(result.wsjf, 'NOT_ACTIVATED');
  assert.equal(result.execution_authorized, false);
  assert.deepEqual(input, before);
});

test('claims, case-insensitive active paths, decisions and forbidden Core scope exclude work', () => {
  for (const mutate of [
    x => { x.scopeAnalyses['WI-SOT-02-01'].write_scope = ['SRC/current/child']; },
    x => { x.scopeAnalyses['WI-SOT-02-01'].unresolved_decisions = ['Need user choice']; },
    x => { x.scopeAnalyses['WI-SOT-02-01'].write_scope = ['docs/scrum-plan.md']; },
  ]) {
    const input = fixture(); mutate(input);
    const result = planExecution(input);
    assert.ok(!result.recommendations.some(c => c.work_item_id === 'WI-SOT-02-01'));
    assert.ok(!result.parallel_candidates.some(c => c.work_item_id === 'WI-SOT-05-01'));
  }
});

test('unknown and stale analyses block parallelization and parallel set is mutually disjoint', () => {
  const input = fixture(); input.scopeAnalyses['WI-SOT-02-01'].parallelization_status = 'Unknown';
  assert.deepEqual(planExecution(input).parallel_candidates.map(c => c.work_item_id), ['WI-SOT-04-01']);
  input.scopeAnalyses['WI-SOT-04-01'].graph_sha256 = 'stale';
  assert.deepEqual(planExecution(input).parallel_candidates, []);
  const overlapping = fixture(); overlapping.scopeAnalyses['WI-SOT-04-01'].write_scope = ['src/02'];
  assert.deepEqual(planExecution(overlapping).parallel_candidates.map(c => c.work_item_id), ['WI-SOT-02-01']);
});

test('dependency assertions cannot override an unfinished backlog prerequisite', () => {
  const input = fixture(); input.scopeAnalyses['WI-SOT-03-01'].external_dependencies = { 'WI-SOT-02-01': { status: 'SATISFIED', evidence_ref: 'invented' } };
  assert.ok(!planExecution(input).recommendations.some(c => c.work_item_id === 'WI-SOT-03-01'));
});

test('unknown claims, absent graph IDs, malformed completed status and duplicate WIP fail closed', () => {
  for (const mutate of [
    x => { x.graph.nodes = x.graph.nodes.filter(n => n.id !== 'work_item:WI-SOT-04-01'); },
    x => { x.backlog = x.backlog.replace('~~WI-SOT-01-01 · Existing completed base~~', 'WI-SOT-01-01 · Existing completed base'); },
    x => { x.state.records['WI-SOT-02-01'] = { ...x.state.records['WI-SOT-05-01'], work_item_id: 'WI-SOT-02-01' }; },
    x => { x.state.records['WI-SOT-05-01'].write_scope = []; },
  ]) {
    const input = fixture(); mutate(input); assert.equal(planExecution(input).status, 'EXECUTION_PLAN_BLOCKED');
  }
});

test('TODO recommendation is preparation only and never a parallel claim candidate', () => {
  const input = fixture(); input.backlog = input.backlog.replace('READY – WI-SOT-02-01', 'TODO – WI-SOT-02-01');
  for (const analysis of Object.values(input.scopeAnalyses)) analysis.backlog_sha256 = hash(input.backlog);
  const result = planExecution(input);
  assert.equal(result.next_recommended.action, 'PREPARE_READY');
  assert.ok(!result.parallel_candidates.some(c => c.work_item_id === 'WI-SOT-02-01'));
});

test('blocked claims retain their file reservation and a concrete blocker in team status', () => {
  const input = fixture();
  input.backlog = input.backlog.replace('IN_PROGRESS – WI-SOT-05-01', 'BLOCKED – WI-SOT-05-01');
  const record = input.state.records['WI-SOT-05-01'];
  record.execution_state = 'Blocked'; record.resume_state = 'In Progress';
  record.blocked_by = { cause: 'User Decision', question: 'Confirm the affected route.' };
  for (const analysis of Object.values(input.scopeAnalyses)) analysis.backlog_sha256 = hash(input.backlog);
  input.scopeAnalyses['WI-SOT-04-01'].write_scope = ['src/current/file.mjs'];
  const result = planExecution(input);
  assert.equal(result.status, 'EXECUTION_PLAN_DERIVED');
  assert.equal(result.current_work_items[0].blocker.cause, 'User Decision');
  assert.ok(!result.parallel_candidates.some(c => c.work_item_id === 'WI-SOT-04-01'));
  assert.match(result.exclusions.find(c => c.work_item_id === 'WI-SOT-04-01').reasons.join(';'), /COLLISION/);
});
