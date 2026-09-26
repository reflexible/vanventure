import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { loadRegistry } from './module-registry.mjs';
import { loadContracts } from './contracts.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';
import { runSotPostValidation } from './post-validation.mjs';

const projectRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const proof = () => ({ status: 'PASS', evidence_ref: 'test-fixture-evidence' });

async function fixture() {
  const [registry, contracts, graph] = await Promise.all([
    loadRegistry(), loadContracts(), loadDependencyGraph(),
  ]);
  const current = Object.fromEntries(await Promise.all(registry.modules.map(async item =>
    [item.module_id, await readFile(resolve(projectRoot, item.source))])));
  const auditDir = join(projectRoot, 'docs/sot-optimization/audits');
  await mkdir(auditDir, { recursive: true });
  const outputDir = await mkdtemp(join(auditDir, '.post-validation-test-'));
  const manifests = Object.fromEntries(registry.modules.map(item => [item.module_id,
    { requirements: [{ id: `${item.module_id}.fixture`, rule: 'Preserve.' }] }]));
  const before = { ...current, analytics: Buffer.concat([current.analytics, Buffer.from('\n')]) };
  return {
    input: {
      auditInput: {
        projectRoot, outputPath: join(outputDir, 'audit.json'), registry, graph,
        change: { kind: 'ADDITIVE_INTEGRATION' }, before, after: current,
        beforeManifests: manifests, afterManifests: structuredClone(manifests),
        beforeContracts: contracts, afterContracts: contracts, contracts,
        test_commands: [{ id: 'analytics-contract-test', covers: ['analytics'], ref: 'tools/sot/contracts.test.mjs',
          command: process.execPath, args: ['--test', 'tools/sot/contracts.test.mjs'] }],
      },
      updatedModuleIds: ['analytics'],
      validators: { sotConsistency: proof, traceability: proof },
    }, outputDir,
  };
}

test('post-validation runs the bounded FAST audit against current source bytes', async () => {
  const { input, outputDir } = await fixture();
  try {
    const result = await runSotPostValidation(input);
    assert.equal(result.status, 'POST_VALIDATION_PASS', JSON.stringify(result.checks));
    assert.equal(result.mode, 'FAST_CHECK');
    assert.equal(result.checks.find(item => item.name === 'required_check').status, 'PASS');
    const audit = JSON.parse(await readFile(input.auditInput.outputPath, 'utf8'));
    assert.equal(audit.status, 'PASS');
    assert.ok(audit.delta.modules.some(item => item.module_id === 'analytics'));
  } finally { await rm(outputDir, { recursive: true, force: true }); }
});

test('stale source snapshot and missing semantic checker block before completion', async () => {
  const { input, outputDir } = await fixture();
  try {
    input.auditInput.after.analytics = Buffer.from('not the current file');
    delete input.validators.sotConsistency;
    const result = await runSotPostValidation(input);
    assert.equal(result.status, 'POST_VALIDATION_BLOCKED');
    assert.equal(result.checks.find(item => item.name === 'current_sources').status, 'BLOCKED');
    assert.equal(result.checks.find(item => item.name === 'sotConsistency').detail, 'MISSING_CHECKER');
    assert.equal(result.audit_output, null);
  } finally { await rm(outputDir, { recursive: true, force: true }); }
});

test('no changed module cannot masquerade as a completed update', async () => {
  const { input, outputDir } = await fixture();
  try {
    input.auditInput.before.analytics = input.auditInput.after.analytics;
    const result = await runSotPostValidation(input);
    assert.equal(result.status, 'POST_VALIDATION_BLOCKED');
    assert.equal(result.mode, 'NO_CHECK');
    assert.equal(result.checks.find(item => item.name === 'delta').status, 'BLOCKED');
    assert.equal(result.checks.find(item => item.name === 'required_check').status, 'BLOCKED');
  } finally { await rm(outputDir, { recursive: true, force: true }); }
});

test('FULL escalation is preserved and scoped checker failures block post-validation', async () => {
  const { input, outputDir } = await fixture();
  try {
    input.auditInput.change = { kind: 'SEMANTIC', changed_sections: ['Definition of Done'] };
    input.auditInput.validators = { dependencyGraph: proof, module: proof, contract: proof,
      workItem: proof, activeProcess: proof };
    input.validators.traceability = () => ({ status: 'BLOCKED', reason: 'missing source mapping' });
    const result = await runSotPostValidation(input);
    assert.equal(result.mode, 'FULL_CHECK');
    assert.equal(result.alert, '⚠ FULL CHECK REQUIRED');
    assert.equal(result.status, 'POST_VALIDATION_BLOCKED');
    assert.equal(result.checks.find(item => item.name === 'traceability').detail, 'missing source mapping');
  } finally { await rm(outputDir, { recursive: true, force: true }); }
});
