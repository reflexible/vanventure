import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeDependencyConflicts, buildDependencyGraph, computeImpact, loadDependencyGraph, validateDependencyGraph } from './dependency-graph.mjs';

test('checked-in sources produce module, contract, story and work-item links', async () => {
  const graph = await loadDependencyGraph();
  assert.equal(validateDependencyGraph(graph).valid, true);
  const edges = graph.edges.map(edge => `${edge.from}>${edge.to}:${edge.relation}`);
  assert.ok(edges.includes('module:scrum-core>module:sot-architecture:depends_on'));
  assert.ok(edges.includes('module:scrum-core>contract:SCRUM-WORK-ITEM:provides'));
  assert.ok(edges.includes('contract:SCRUM-WORK-ITEM>module:sot-architecture:consumes'));
  assert.ok(edges.includes('story:ST-SOT-03>story:ST-SOT-05:depends_on'));
  assert.ok(edges.includes('story:ST-SOT-05>work_item:WI-SOT-05-01:belongs_to'));
  assert.ok(graph.nodes.some(node => node.id === 'work_item:WI-SOT-05-08'));
  assert.equal(graph.nodes.some(node => node.type === 'worker'), false);
});

test('impact expands through direct and transitive module and contract links', async () => {
  const graph = await loadDependencyGraph();
  const impact = computeImpact(graph, 'module:scrum-core');
  assert.ok(impact.direct.includes('module:sot-architecture'));
  assert.ok(impact.direct.includes('contract:SCRUM-WORK-ITEM'));
  assert.ok(impact.transitive.includes('work_item:WI-SOT-05-01'));
  assert.ok(impact.byType.contract.includes('contract:SCRUM-WORK-ITEM'));
});

test('derives a registered dependency update as a hard edge without a mutable graph supplement', () => {
  const registry = { modules: [
    { module_id: 'source', source: 'docs/source.md', dependencies: [] },
    { module_id: 'consumer', source: 'docs/consumer.md', dependencies: ['source'] },
  ] };
  const graph = buildDependencyGraph({ registry, contracts: { contracts: [] }, epicText: '',
    supplement: { nodes: [], edges: [] } });
  assert.equal(validateDependencyGraph(graph).valid, true);
  assert.deepEqual(graph.edges.filter(edge => edge.relation === 'depends_on'), [{
    from: 'module:source', to: 'module:consumer', relation: 'depends_on', strength: 'hard',
  }]);
  assert.equal(computeImpact(graph, 'module:source').direct.includes('module:consumer'), true);
});

test('unknown nodes and dependency cycles invalidate the graph', () => {
  const graph = { schema_version: '1.0.0', nodes: [
    { id: 'module:a', type: 'module' }, { id: 'module:b', type: 'module' },
  ], edges: [
    { from: 'module:a', to: 'module:b', relation: 'depends_on', strength: 'hard' },
    { from: 'module:b', to: 'module:a', relation: 'depends_on', strength: 'soft' },
    { from: 'module:a', to: 'module:missing', relation: 'affects', strength: 'reference' },
  ] };
  const result = validateDependencyGraph(graph);
  assert.equal(result.valid, false);
  assert.equal(result.cycles.length, 1);
  assert.ok(result.errors.some(error => error.includes('unknown node')));
  assert.throws(() => computeImpact(graph, 'module:missing'), /Unknown source node/);
});

test('runtime workers are only added from explicit input', () => {
  const registry = { modules: [{ module_id: 'sot-architecture', source: 'docs/governance/source-of-truth-and-incremental-planning.md', dependencies: [] }] };
  const contracts = { contracts: [] };
  const epicText = '| ST-SOT-05 | Graph |  | P1 |\n#### ST-SOT-05 – Graph\n- [ ] TODO – WI-SOT-05-01 · Work';
  const graph = buildDependencyGraph({ registry, contracts, epicText, runtime: { workers: [{ id: 'agent-a', claims: ['WI-SOT-05-01'] }] } });
  assert.equal(validateDependencyGraph(graph).valid, true);
  assert.ok(graph.edges.some(edge => edge.from === 'work_item:WI-SOT-05-01' && edge.to === 'worker:agent-a'));
});


test('reports hard story dependency conflicts among parallel work items', () => {
  const graph = buildDependencyGraph({ registry: { modules: [{ module_id: 'sot-architecture', source: 'p', dependencies: [] }] }, contracts: { contracts: [] }, epicText: '| ST-SOT-01 | A | | P1 |\n| ST-SOT-02 | B | ST-SOT-01 | P1 |\n#### ST-SOT-01\n- [ ] TODO – WI-SOT-01-01 · A\n#### ST-SOT-02\n- [ ] TODO – WI-SOT-02-01 · B' });
  assert.deepEqual(analyzeDependencyConflicts(graph, ['WI-SOT-01-01', 'WI-SOT-02-01']).conflicts, [{ predecessor: 'WI-SOT-01-01', dependent: 'WI-SOT-02-01', reason: 'HARD_DEPENDENCY' }]);
});
