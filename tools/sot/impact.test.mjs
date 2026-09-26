import assert from 'node:assert/strict';
import test from 'node:test';
import { assessImpact } from './impact.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';

const graph = {
  schema_version: '1.0.0',
  nodes: [
    { id: 'module:scrum-core', type: 'module' },
    { id: 'module:sot-architecture', type: 'module' },
    { id: 'contract:SCRUM-WORK-ITEM', type: 'contract' },
    { id: 'story:ST-SOT-06', type: 'story' },
    { id: 'work_item:WI-SOT-06-01', type: 'work_item' },
    { id: 'worker:agent-a', type: 'worker' },
  ],
  edges: [
    { from: 'module:scrum-core', to: 'module:sot-architecture', relation: 'depends_on', strength: 'hard' },
    { from: 'module:scrum-core', to: 'contract:SCRUM-WORK-ITEM', relation: 'provides', strength: 'reference' },
    { from: 'contract:SCRUM-WORK-ITEM', to: 'module:sot-architecture', relation: 'consumes', strength: 'reference' },
    { from: 'module:sot-architecture', to: 'story:ST-SOT-06', relation: 'belongs_to', strength: 'reference' },
    { from: 'story:ST-SOT-06', to: 'work_item:WI-SOT-06-01', relation: 'belongs_to', strength: 'reference' },
    { from: 'work_item:WI-SOT-06-01', to: 'worker:agent-a', relation: 'claims', strength: 'reference' },
  ],
};
const delta = (modules = [], contracts = [], extra = {}) => ({ modules, contracts, has_contract_break: false, ...extra });
const changed = (id, classification = 'TEXT_CHANGED_MANIFEST_UNCHANGED', more = {}) => ({ module_id: id, classification, semantic_manifest_match: true, ...more });
const assess = (change, detected = delta(), dependencyGraph = graph) => assessImpact({ change, delta: detected, graph: dependencyGraph });

test('no change or pure formatting yields NO_CHECK with a narrow scope', () => {
  assert.equal(assess({ kind: 'FORMAT_ONLY' }).mode, 'NO_CHECK');
  const result = assess({ kind: 'FORMAT_ONLY' }, delta([changed('sot-architecture', 'FORMAT_ONLY')]));
  assert.equal(result.mode, 'NO_CHECK');
  assert.deepEqual(result.scope.changed_modules, ['sot-architecture']);
  assert.deepEqual(result.scope.work_items, []);
});

test('reviewed additive Scrum reference uses FAST CHECK and reports scoped dependencies', () => {
  const result = assess({
    kind: 'REFERENCE_ADDITION', changed_sections: ['EPIC-SOT'],
    semantic_review: { verified: true, evidence_ref: 'review/core-impact.md' },
  }, delta([changed('scrum-core', 'TEXT_CHANGED_SEMANTICS_UNVERIFIED', { semantic_manifest_match: null })]));
  assert.equal(result.mode, 'FAST_CHECK');
  assert.deepEqual(result.scope.changed_sections, ['EPIC-SOT']);
  assert.ok(result.scope.direct_nodes.includes('module:sot-architecture'));
  assert.ok(result.scope.contracts.includes('SCRUM-WORK-ITEM'));
  assert.deepEqual(result.scope.work_items, []);
});

test('unreviewed or semantic Scrum Core change escalates', () => {
  const unreviewed = assess({ kind: 'REFERENCE_ADDITION' }, delta([changed('scrum-core', 'TEXT_CHANGED_SEMANTICS_UNVERIFIED', { semantic_manifest_match: null })]));
  assert.equal(unreviewed.mode, 'FULL_CHECK');
  assert.ok(unreviewed.reasons.includes('SEMANTIC_IMPACT_UNVERIFIED'));
  const semantic = assess({ kind: 'SEMANTIC' }, delta([changed('scrum-core', 'SEMANTIC_MANIFEST_CHANGED', { semantic_manifest_match: false })]));
  assert.equal(semantic.alert, '⚠ FULL CHECK REQUIRED');
  assert.ok(semantic.reasons.includes('SCRUM_CORE_CHANGE'));
});

test('each declared FULL trigger escalates and leaves scope bounded', () => {
  for (const type of ['DEFINITION_OF_DONE', 'BOARD_FAST_TRACK', 'APPROVAL_REVIEW_GATE', 'WORKER_AGENT_RULE',
    'SECURITY_AUTH', 'FUNDAMENTAL_DATA_MODEL', 'CROSS_DOMAIN', 'HIGH_IMPACT', 'UNKNOWN_IMPACT']) {
    const result = assess({ kind: 'SEMANTIC', impact_types: [type] }, delta([changed('sot-architecture')]));
    assert.equal(result.mode, 'FULL_CHECK', type);
    assert.ok(result.reasons.includes(`FULL_TRIGGER:${type}`));
    assert.deepEqual(result.scope.changed_modules, ['sot-architecture']);
  }
});

test('protected section labels trigger FULL without a supplied impact category', () => {
  for (const section of ['Definition of Done', 'Work-Item-Lifecycle', 'Statusmodell',
    'Board-/Fast-Track-Regeln', 'Approval-/Review-Gates', 'Security/Auth']) {
    const result = assess({ kind: 'SEMANTIC', changed_sections: [section] }, delta([changed('sot-architecture')]));
    assert.equal(result.mode, 'FULL_CHECK', section);
    assert.ok(result.reasons.some(reason => reason.startsWith('FULL_TRIGGER:')));
  }
});

test('breaking contract escalates and includes both boundary modules', () => {
  const result = assess({ kind: 'SEMANTIC' }, delta([changed('sot-architecture')], [
    { contract_id: 'SCRUM-WORK-ITEM', kind: 'BREAKING', version_valid: false },
  ], { has_contract_break: true }));
  assert.equal(result.mode, 'FULL_CHECK');
  assert.ok(result.reasons.includes('CONTRACT_BREAK'));
  assert.ok(result.scope.modules.includes('sot-architecture'));
  assert.ok(result.scope.contracts.includes('SCRUM-WORK-ITEM'));
});

test('missing contract comparison cannot authorize a changed module', () => {
  const result = assess({ kind: 'ADDITIVE_INTEGRATION' }, delta(
    [changed('analytics')], [], { contract_comparison_unknown: true },
  ));
  assert.equal(result.mode, 'FULL_CHECK');
  assert.ok(result.reasons.includes('CONTRACT_COMPARISON_UNAVAILABLE'));
});

test('active process overlap and conflict are visible; conflict escalates', () => {
  const change = { kind: 'ADDITIVE_INTEGRATION', changed_sections: ['ST-SOT-06'], active_processes: [
    { id: 'process-a', module_ids: ['sot-architecture'] },
    { id: 'process-b', work_item_ids: ['WI-SOT-06-01'], conflict: true },
    { id: 'unrelated', module_ids: ['unrelated'] },
  ] };
  const result = assess(change, delta([changed('sot-architecture')]));
  assert.equal(result.mode, 'FULL_CHECK');
  assert.deepEqual(result.scope.active_processes.map(process => process.id), ['agent-a', 'process-a', 'process-b']);
  assert.ok(result.reasons.includes('ACTIVE_WORK_CONFLICT'));
});

test('unknown module, unknown meaning, and invalid graph cannot silently pass', () => {
  const unknownModule = assess({ kind: 'SEMANTIC' }, delta([changed('missing')]));
  assert.equal(unknownModule.mode, 'FULL_CHECK');
  assert.deepEqual(unknownModule.scope.unresolved_modules, ['missing']);
  const unknownMeaning = assess({ kind: 'UNKNOWN' }, delta([changed('sot-architecture')]));
  assert.equal(unknownMeaning.mode, 'FULL_CHECK');
  assert.throws(() => assess({ kind: 'SEMANTIC' }, delta(), { ...graph, edges: [{ from: 'module:missing', to: 'module:scrum-core', relation: 'affects', strength: 'hard' }] }), /Invalid dependency graph/);
});

test('real graph yields a deterministic bounded result', async () => {
  const realGraph = await loadDependencyGraph();
  const input = { change: { kind: 'ADDITIVE_INTEGRATION' }, delta: delta([changed('analytics')]), graph: realGraph };
  const first = assessImpact(input);
  assert.equal(first.mode, 'FAST_CHECK');
  assert.deepEqual(first, assessImpact(input));
  assert.equal(first.scope.changed_modules.length, 1);
  assert.ok(first.scope.contracts.includes('ANALYTICS-CONTENT-ID'));
  assert.deepEqual(first.scope.work_items, []);
  const section = assessImpact({
    change: { kind: 'ADDITIVE_INTEGRATION', changed_sections: ['ST-SOT-06'] },
    delta: delta([changed('sot-architecture')]), graph: realGraph,
  });
  assert.ok(section.scope.work_items.includes('WI-SOT-06-01'));
  assert.ok(section.scope.work_items.length < 30);
});
