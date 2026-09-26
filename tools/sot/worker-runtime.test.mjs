import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { assessImpact } from './impact.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';
import { loadRegistry } from './module-registry.mjs';
import { buildControllerRuntime, buildWorkerRuntime, loadWorkerRuntime, modulesForWriteScope } from './worker-runtime.mjs';

const target = 'docs/governance/source-of-truth-and-incremental-planning.md';
function state(scope = [target]) {
  return {
    schema_version: '1.0.0', kind: 'operational_worker_state', revision: 1, history: [],
    records: {
      'WI-SOT-06-01': {
        work_item_id: 'WI-SOT-06-01', execution_state: 'Claimed', assigned_agent: 'agent-a',
        claimed_at: '2026-09-26T10:00:00.000Z', write_scope: scope,
      },
    },
  };
}

test('current claimed item is visible in graph and conflicting impact escalates FULL', async t => {
  const dir = await mkdtemp(join(tmpdir(), 'sot-runtime-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const path = join(dir, 'worker-state.json');
  await writeFile(path, JSON.stringify(state()));
  const bridge = await loadWorkerRuntime({ statePath: path, proposedWriteScope: [target] });
  const graph = await loadDependencyGraph({ runtime: bridge.runtimeWorkers });
  assert.ok(graph.edges.some(edge => edge.from === 'work_item:WI-SOT-06-01'
    && edge.to === 'worker:agent-a' && edge.relation === 'claims'));
  assert.deepEqual(bridge.activeProcesses[0].module_ids, ['sot-architecture']);
  assert.equal(bridge.activeProcesses[0].conflict, true);
  const result = assessImpact({
    graph,
    delta: { modules: [{ module_id: 'sot-architecture', classification: 'TEXT_CHANGED_MANIFEST_UNCHANGED', semantic_manifest_match: true }], contracts: [], has_contract_break: false },
    change: { kind: 'ADDITIVE_INTEGRATION', work_item_ids: ['WI-SOT-06-01'], active_processes: bridge.activeProcesses },
  });
  assert.equal(result.alert, '⚠ FULL CHECK REQUIRED');
  assert.ok(result.reasons.includes('ACTIVE_WORK_CONFLICT'));
  assert.deepEqual(result.scope.active_processes.map(process => process.id), ['agent-a']);
});

test('separate active path in same module remains visible without a false conflict', async () => {
  const registry = await loadRegistry();
  const withOwned = structuredClone(registry);
  withOwned.modules.find(module => module.module_id === 'sot-architecture').owned_scopes = ['docs/governance/sot-scope'];
  const projection = buildWorkerRuntime({
    state: state(['docs/governance/sot-scope/one.md']), registry: withOwned,
    proposedWriteScope: ['docs/governance/sot-scope/two.md'],
  });
  assert.deepEqual(projection.activeProcesses[0].module_ids, ['sot-architecture']);
  assert.equal(projection.activeProcesses[0].conflict, false);
});

test('unknown, ambiguous or unowned scopes fail closed', async () => {
  const registry = await loadRegistry();
  assert.throws(() => modulesForWriteScope(['authentication'], registry), /Unknown write scope/);
  assert.throws(() => buildWorkerRuntime({ state: state(['authentication']), registry }), /Unknown write scope/);
  assert.throws(() => buildWorkerRuntime({ state: state(), registry, proposedWriteScope: ['unmapped/path'] }), /Unknown write scope/);
  const ambiguous = structuredClone(registry);
  ambiguous.modules.find(module => module.module_id === 'scrum-core').owned_scopes = ['docs/governance'];
  assert.throws(() => modulesForWriteScope([target], ambiguous), /Ambiguous write scope/);
  assert.throws(() => modulesForWriteScope(['../outside'], registry), /Invalid write scope/);
});

test('inactive records do not become graph workers or active processes', async () => {
  const registry = await loadRegistry();
  const snapshot = state();
  snapshot.records['WI-SOT-06-01'].execution_state = 'Backlog';
  snapshot.records['WI-SOT-06-01'].assigned_agent = null;
  snapshot.records['WI-SOT-06-01'].write_scope = [];
  assert.deepEqual(buildWorkerRuntime({ state: snapshot, registry }), {
    runtimeWorkers: { workers: [] }, activeProcesses: [],
  });
});

test('local controller snapshot binds current workers to the authoritative plan without remote authorization', async () => {
  const registry = await loadRegistry();
  const planText = '- [ ] IN_PROGRESS – WI-SOT-06-01 · Runtime item';
  const result = buildControllerRuntime({ state: state(), registry, planText });
  assert.deepEqual(result.current_work_items.map(item => [item.work_item_id, item.plan_status, item.execution_state]),
    [['WI-SOT-06-01', 'IN_PROGRESS', 'Claimed']]);
  assert.equal(result.chat_runtime.status, 'LOCAL_ONLY_NOT_REMOTE_AUTHORIZED');
  assert.equal(result.execution_authorized, false);
});

test('controller snapshot fails closed when worker and plan status disagree', async () => {
  const registry = await loadRegistry();
  assert.throws(() => buildControllerRuntime({ state: state(), registry,
    planText: '- [ ] TODO – WI-SOT-06-01 · Runtime item' }), /Active worker item disagrees/);
  assert.throws(() => buildControllerRuntime({ state: state(), registry,
    planText: '- [ ] IN_PROGRESS – WI-SOT-06-02 · Other item' }), /missing from authoritative plan/);
});

test('controller snapshot keeps an unowned local write scope visible but unsafe', async () => {
  const registry = await loadRegistry();
  const result = buildControllerRuntime({ state: state(['unmapped/local-file']), registry,
    planText: '- [ ] IN_PROGRESS – WI-SOT-06-01 · Runtime item' });
  assert.equal(result.activeProcesses[0].scope_status, 'UNMAPPED');
  assert.equal(result.activeProcesses[0].conflict, true);
  assert.equal(result.execution_authorized, false);
});
