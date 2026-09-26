import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from './module-registry.mjs';
import { loadContracts } from './contracts.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';
import { assessImpact } from './impact.mjs';
import { runFastCheck } from './fast-check.mjs';

const projectRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const changed = module_id => ({ module_id, classification: 'TEXT_CHANGED_MANIFEST_UNCHANGED', semantic_manifest_match: true });

async function fixture(moduleId = 'analytics', sections = []) {
  const [registry, contracts, graph] = await Promise.all([loadRegistry(), loadContracts(), loadDependencyGraph()]);
  const change = { kind: 'ADDITIVE_INTEGRATION', changed_sections: sections };
  const delta = { schema_version: '1.0.0', modules: [changed(moduleId)], contracts: [],
    contract_comparison_unknown: false, has_contract_break: false };
  const impact = assessImpact({ change, delta, graph });
  return { change, delta, impact, registry, contracts, graph, projectRoot };
}

test('scoped local check executes files, contracts, dependencies, tests and Git checks', async () => {
  const input = await fixture();
  const result = await runFastCheck({ ...input, test_commands: [
    { id: 'analytics-contract-check', covers: ['analytics'], ref: 'tools/sot/contracts.test.mjs', command: process.execPath, args: ['--test', 'tools/sot/contracts.test.mjs'] },
  ] });
  assert.equal(result.result, 'FAST_CHECK_PASS', JSON.stringify(result.failures));
  assert.ok(result.scope.contracts.includes('ANALYTICS-CONTENT-ID'));
  assert.deepEqual(result.scope.work_items, []);
  assert.deepEqual(result.checks.map(check => check.name), [
    'delta', 'affected_modules', 'relevant_contracts', 'direct_dependencies',
    'traceability', 'relevant_tests', 'references', 'git_diff_check',
  ]);
  assert.ok(result.checks.every(check => check.status === 'PASS'));
});

test('missing or failing executable tests block despite valid metadata', async () => {
  const input = await fixture();
  const missing = await runFastCheck(input);
  assert.equal(missing.result, 'FAST_CHECK_BLOCKED');
  assert.ok(missing.failures.some(error => error.startsWith('relevant_tests:')));
  const failing = await runFastCheck({ ...input, test_commands: [
    { id: 'fails', covers: ['analytics'], ref: 'tools/sot/contracts.test.mjs', command: process.execPath,
      args: ['-e', 'process.exit(7)', 'tools/sot/contracts.test.mjs'] },
  ] });
  assert.equal(failing.result, 'FAST_CHECK_BLOCKED');
});

test('work-item traceability needs a distinct real source with an anchor', async () => {
  const input = await fixture('sot-architecture', ['ST-SOT-07']);
  const test_commands = [
    { id: 'architecture-impact-check', covers: ['sot-architecture'], ref: 'tools/sot/impact.test.mjs',
      command: process.execPath, args: ['--test', 'tools/sot/impact.test.mjs'] },
  ];
  const noTrace = await runFastCheck({ ...input, test_commands });
  assert.equal(noTrace.result, 'FAST_CHECK_BLOCKED');
  assert.ok(noTrace.failures.some(error => error.startsWith('traceability:')));
  const traceability_records = input.impact.scope.work_items.map(work_item_id => ({
    work_item_id,
    source_ref: 'docs/sot-optimization/sources/sot-process-input-2026-09-26.md',
    source_anchor: 'SoT Impact Check',
    target_ref: 'docs/governance/source-of-truth-and-incremental-planning.md',
  }));
  const valid = await runFastCheck({ ...input, test_commands, traceability_records });
  assert.equal(valid.result, 'FAST_CHECK_PASS', JSON.stringify(valid.failures));
  const falseTrace = await runFastCheck({ ...input, test_commands, traceability_records: traceability_records.map(record => ({
    ...record, source_ref: record.target_ref,
  })) });
  assert.equal(falseTrace.result, 'FAST_CHECK_BLOCKED');
});

test('forged FAST scope and unavailable contract comparison cannot pass', async () => {
  const input = await fixture();
  const forged = await runFastCheck({ ...input, impact: { ...input.impact, scope: { ...input.impact.scope, contracts: [] } } });
  assert.equal(forged.result, 'FAST_CHECK_BLOCKED');
  const delta = { ...input.delta, contract_comparison_unknown: true };
  const unknown = await runFastCheck({ ...input, delta });
  assert.equal(unknown.result, 'FAST_CHECK_BLOCKED');
});

test('untracked or missing path cannot be certified by git diff --check', async () => {
  const input = await fixture();
  const result = await runFastCheck({ ...input, changed_paths: ['tools/sot/__untracked_fast_check_probe__.mjs'], test_commands: [
    { id: 'analytics-contract-check', covers: ['analytics'], ref: 'tools/sot/contracts.test.mjs',
      command: process.execPath, args: ['--test', 'tools/sot/contracts.test.mjs'] },
  ] });
  assert.equal(result.result, 'FAST_CHECK_BLOCKED');
  assert.ok(result.failures.some(error => error.startsWith('git_diff_check:')));
});
