import assert from 'node:assert/strict';
import test from 'node:test';
import { assessImpact } from './impact.mjs';
import { runFullCheck } from './full-check.mjs';

const graph = {
  schema_version: '1.0.0',
  nodes: [
    { id: 'module:scrum-core', type: 'module' },
    { id: 'module:sot-architecture', type: 'module' },
    { id: 'contract:SCRUM-WORK-ITEM', type: 'contract' },
    { id: 'story:ST-SOT-08', type: 'story' },
    { id: 'work_item:WI-SOT-08-01', type: 'work_item' },
  ],
  edges: [
    { from: 'module:scrum-core', to: 'contract:SCRUM-WORK-ITEM', relation: 'provides', strength: 'reference' },
    { from: 'contract:SCRUM-WORK-ITEM', to: 'module:sot-architecture', relation: 'consumes', strength: 'reference' },
    { from: 'module:sot-architecture', to: 'story:ST-SOT-08', relation: 'belongs_to', strength: 'reference' },
    { from: 'story:ST-SOT-08', to: 'work_item:WI-SOT-08-01', relation: 'belongs_to', strength: 'reference' },
  ],
};
const delta = (modules = [], contracts = [], extra = {}) => ({ modules, contracts, has_contract_break: false, ...extra });
const moduleChange = id => ({ module_id: id, classification: 'SEMANTIC_MANIFEST_CHANGED', semantic_manifest_match: false });
const pass = ({ id }) => ({ status: 'PASS', evidence_ref: `evidence/${id}.json` });
const validators = { dependencyGraph: pass, module: pass, contract: pass, workItem: pass, activeProcess: pass };

test('semantic Scrum Core FULL CHECK validates only its graph-selected targets with evidence', async () => {
  const impact = assessImpact({
    change: { kind: 'SEMANTIC', changed_sections: ['Definition of Done'] },
    delta: delta([moduleChange('scrum-core')]), graph,
  });
  const result = await runFullCheck({ impact, validators });
  assert.equal(result.alert, '⚠ FULL CHECK REQUIRED');
  assert.equal(result.status, 'FULL_CHECK_PASS');
  assert.ok(result.reasons.includes('SCRUM_CORE_CHANGE'));
  assert.ok(result.reasons.includes('FULL_TRIGGER:DEFINITION_OF_DONE'));
  assert.deepEqual(result.scope.work_items, []);
  assert.deepEqual(result.scope.modules, ['scrum-core', 'sot-architecture']);
  assert.deepEqual(result.scope.contracts, ['SCRUM-WORK-ITEM']);
  assert.ok(result.checks.every(check => check.evidence_ref?.startsWith('evidence/')));
  assert.equal(result.checks.some(check => check.type === 'historical_migration'), false);
});

test('a contract break cannot pass without its scoped contract validation', async () => {
  const impact = assessImpact({
    change: { kind: 'SEMANTIC' },
    delta: delta([moduleChange('sot-architecture')], [{ contract_id: 'SCRUM-WORK-ITEM', kind: 'BREAKING' }], { has_contract_break: true }),
    graph,
  });
  const result = await runFullCheck({ impact, validators: { ...validators, contract: undefined } });
  assert.equal(result.status, 'FULL_CHECK_BLOCKED');
  assert.ok(result.reasons.includes('CONTRACT_BREAK'));
  assert.deepEqual(result.checks.filter(check => check.reason === 'MISSING_CHECKER').map(check => check.id), ['SCRUM-WORK-ITEM']);
});

test('unknown impact stays blocked despite successful callbacks', async () => {
  const impact = assessImpact({
    change: { kind: 'UNKNOWN' },
    delta: delta([moduleChange('sot-architecture')]), graph,
  });
  const result = await runFullCheck({ impact, validators });
  assert.equal(result.status, 'FULL_CHECK_BLOCKED');
  assert.ok(result.checks.some(check => check.reason === 'UNRESOLVED_IMPACT'));
  const declaredUnknown = assessImpact({
    change: { kind: 'SEMANTIC', impact_types: ['UNKNOWN_IMPACT'] },
    delta: delta([moduleChange('scrum-core')]), graph,
  });
  const declaredResult = await runFullCheck({ impact: declaredUnknown, validators });
  assert.equal(declaredResult.status, 'FULL_CHECK_BLOCKED');
});

test('active conflicting worker stays visible and blocks completion', async () => {
  const impact = assessImpact({
    change: { kind: 'ADDITIVE_INTEGRATION', active_processes: [
      { id: 'worker-1', module_ids: ['sot-architecture'], conflict: true },
      { id: 'unrelated', module_ids: ['unrelated'] },
    ] },
    delta: delta([moduleChange('sot-architecture')]), graph,
  });
  const result = await runFullCheck({ impact, validators });
  assert.equal(result.status, 'FULL_CHECK_BLOCKED');
  assert.deepEqual(result.scope.active_processes, ['worker-1']);
  assert.ok(result.checks.some(check => check.reason === 'ACTIVE_WORK_CONFLICT'));
});

test('a failed check, missing evidence, and validator error fail closed', async () => {
  const impact = assessImpact({
    change: { kind: 'SEMANTIC', impact_types: ['GLOBAL_RULE'], changed_sections: ['WI-SOT-08-01'] },
    delta: delta([moduleChange('sot-architecture')]), graph,
  });
  const result = await runFullCheck({ impact, validators: {
    ...validators,
    module: () => ({ status: 'PASS' }),
    workItem: () => { throw new Error('not checked'); },
  } });
  assert.equal(result.status, 'FULL_CHECK_BLOCKED');
  assert.ok(result.checks.some(check => check.reason === 'CHECK_FAILED_OR_EVIDENCE_MISSING'));
  assert.ok(result.checks.some(check => check.reason === 'CHECK_ERROR: not checked'));
  assert.deepEqual(result.scope.work_items, ['WI-SOT-08-01']);
});

test('FULL CHECK rejects an unassessed FAST result and empty affected scope', async () => {
  const fast = assessImpact({ change: { kind: 'ADDITIVE_INTEGRATION' }, delta: delta([{
    module_id: 'sot-architecture', classification: 'TEXT_CHANGED_MANIFEST_UNCHANGED', semantic_manifest_match: true,
  }]), graph });
  await assert.rejects(runFullCheck({ impact: fast, validators }), /assessed FULL_CHECK/);
  const unknown = assessImpact({ change: { kind: 'UNKNOWN' }, delta: delta(), graph });
  const result = await runFullCheck({ impact: unknown, validators });
  assert.equal(result.status, 'FULL_CHECK_BLOCKED');
  assert.ok(result.checks.some(check => check.reason === 'UNRESOLVED_IMPACT_SCOPE'));
});
