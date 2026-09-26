import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { loadRegistry } from './module-registry.mjs';
import { loadContracts } from './contracts.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';
import { runIncrementalAudit } from './incremental-audit.mjs';

const projectRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));

async function fixture(moduleId = 'analytics') {
  const [registry, contracts, graph] = await Promise.all([
    loadRegistry(), loadContracts(), loadDependencyGraph(),
  ]);
  const snapshots = Object.fromEntries(await Promise.all(registry.modules.map(async item =>
    [item.module_id, await readFile(resolve(projectRoot, item.source))])));
  const auditDir = join(projectRoot, 'docs/sot-optimization/audits');
  await mkdir(auditDir, { recursive: true });
  const outputDir = await mkdtemp(join(auditDir, '.incremental-audit-test-'));
  const manifests = Object.fromEntries(registry.modules.map(item => [item.module_id,
    { requirements: [{ id: `${item.module_id}.example`, rule: 'Preserve current behavior.' }] }]));
  return {
    input: {
      projectRoot, outputPath: join(outputDir, 'audit.json'),
      registry, graph,
      change: { kind: 'FORMAT_ONLY' },
      before: snapshots, after: { ...snapshots },
      beforeManifests: manifests, afterManifests: structuredClone(manifests),
      beforeContracts: contracts, afterContracts: contracts, contracts,
    },
    outputDir,
  };
}

test('no delta records a scoped reproducible NO_CHECK without historical migration claim', async () => {
  const { input, outputDir } = await fixture();
  try {
    const result = await runIncrementalAudit(input);
    assert.equal(result.status, 'PASS');
    assert.equal(result.mode, 'NO_CHECK');
    assert.deepEqual(result.delta.excluded_unchanged_modules,
      input.registry.modules.map(item => item.module_id).sort());
    assert.equal(result.historical_migration_audited, false);
    assert.deepEqual(result, JSON.parse(await readFile(input.outputPath, 'utf8')));
    await assert.rejects(() => runIncrementalAudit(input), /already exists/);
  } finally { await rm(outputDir, { recursive: true, force: true }); }
});

test('FAST CHECK executes scoped proof and persists its module, contract and dependency findings', async () => {
  const { input, outputDir } = await fixture();
  try {
    input.change = { kind: 'ADDITIVE_INTEGRATION' };
    input.after.analytics = Buffer.concat([input.before.analytics, Buffer.from('\n')]);
    input.test_commands = [{ id: 'analytics-contract-check', covers: ['analytics'], ref: 'tools/sot/contracts.test.mjs',
      command: process.execPath, args: ['--test', 'tools/sot/contracts.test.mjs'] }];
    const result = await runIncrementalAudit(input);
    assert.equal(result.mode, 'FAST_CHECK');
    assert.equal(result.status, 'PASS', JSON.stringify(result.reasons));
    assert.equal(result.check.result, 'FAST_CHECK_PASS');
    assert.ok(result.check.scope.contracts.includes('ANALYTICS-CONTENT-ID'));
    for (const name of ['affected_modules', 'relevant_contracts', 'direct_dependencies']) {
      assert.equal(result.check.checks.find(item => item.name === name).status, 'PASS');
    }
  } finally { await rm(outputDir, { recursive: true, force: true }); }
});

test('missing semantic manifest escalates and missing FAST test blocks', async () => {
  const { input, outputDir } = await fixture();
  try {
    input.change = { kind: 'ADDITIVE_INTEGRATION' };
    input.after.analytics = Buffer.concat([input.before.analytics, Buffer.from('\n')]);
    delete input.afterManifests.analytics;
    const result = await runIncrementalAudit(input);
    assert.equal(result.mode, 'FULL_CHECK');
    assert.equal(result.status, 'BLOCKED');
    assert.ok(result.reasons.some(item => item.startsWith('MISSING_SEMANTIC_MANIFEST:analytics')));
    assert.ok(result.check.checks.some(item => item.reason === 'MISSING_CHECKER'));
    input.afterManifests.analytics = input.beforeManifests.analytics;
    input.outputPath = join(outputDir, 'audit-second.json');
    const noTests = await runIncrementalAudit(input);
    assert.equal(noTests.mode, 'FAST_CHECK');
    assert.ok(noTests.reasons.some(item => item.startsWith('FAST_CHECK:relevant_tests:')));
  } finally { await rm(outputDir, { recursive: true, force: true }); }
});

test('FULL CHECK escalates a semantic core rule and keeps only graph selected targets', async () => {
  const { input, outputDir } = await fixture('scrum-core');
  try {
    input.change = { kind: 'SEMANTIC', changed_sections: ['Definition of Done'] };
    input.after['scrum-core'] = Buffer.concat([input.before['scrum-core'], Buffer.from('\nChanged core rule\n')]);
    input.afterManifests['scrum-core'] = { requirements: [{ id: 'core.dod', rule: 'Changed.' }] };
    const pass = ({ id }) => ({ status: 'PASS', evidence_ref: `docs/sot-optimization/reviews/${id}.json` });
    input.validators = { dependencyGraph: pass, module: pass, contract: pass, workItem: pass, activeProcess: pass };
    const result = await runIncrementalAudit(input);
    assert.equal(result.mode, 'FULL_CHECK');
    assert.equal(result.alert, '⚠ FULL CHECK REQUIRED');
    assert.equal(result.status, 'PASS', JSON.stringify(result.reasons));
    assert.deepEqual(result.check.scope.work_items, []);
    assert.equal(result.check.checks.some(item => item.type === 'historical_migration'), false);
    assert.ok(result.check.checks.some(item => item.type === 'dependency_graph'));
    assert.ok(result.check.checks.some(item => item.type === 'contract'));
  } finally { await rm(outputDir, { recursive: true, force: true }); }
});

test('FULL CHECK requires checkers, catalogues agree and result path stays in repository', async () => {
  const { input, outputDir } = await fixture('scrum-core');
  try {
    input.change = { kind: 'SEMANTIC', changed_sections: ['Definition of Done'] };
    input.after['scrum-core'] = Buffer.concat([input.before['scrum-core'], Buffer.from('\nChanged\n')]);
    input.afterManifests['scrum-core'] = { requirements: [{ id: 'core.dod', rule: 'Changed.' }] };
    const missing = await runIncrementalAudit(input);
    assert.equal(missing.status, 'BLOCKED');
    assert.ok(missing.check.checks.some(item => item.reason === 'MISSING_CHECKER'));
    const disagrees = await runIncrementalAudit({ ...input, outputPath: join(outputDir, 'audit-second.json'), contracts: { contracts: [] } });
    assert.equal(disagrees.status, 'BLOCKED');
    assert.ok(disagrees.reasons.includes('CURRENT_CONTRACT_CATALOGUE_DISAGREES_WITH_DELTA'));
    await assert.rejects(() => runIncrementalAudit({ ...input, outputPath: resolve(projectRoot, '..', 'outside.json') }),
      /inside the repository/);
    await assert.rejects(() => runIncrementalAudit({ ...input, outputPath: join(projectRoot, 'docs/governance/contracts.json') }),
      /docs\/sot-optimization\/audits/);
  } finally { await rm(outputDir, { recursive: true, force: true }); }
});
