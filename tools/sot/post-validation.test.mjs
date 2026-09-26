import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { loadRegistry } from './module-registry.mjs';
import { loadContracts } from './contracts.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';
import { runSotPostValidation } from './post-validation.mjs';

const projectRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const proof = () => ({ status: 'PASS', evidence_ref: 'test-fixture-evidence' });
function trackIsolatedProject(root) {
  for (const args of [['init', '--quiet'], ['add', '--', '.']]) {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  }
}

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

test('maintained path cannot certify missing release coverage with a caller supplied successful test', async t => {
  const f = await maintainedFixture(t, 'release-governance');
  f.input.auditInput.test_commands = [{ id: 'fake-success', covers: ['release-governance'],
    ref: 'deploy/gesamtauftrag-consistency.test.mjs', command: process.execPath, args: ['-e', 'process.exit(0)'] }];
  const result = await runSotPostValidation(f.input);
  assert.equal(result.status, 'POST_VALIDATION_BLOCKED', JSON.stringify(result));
  assert.equal(result.checks.find(check => check.name === 'project_audit').status, 'BLOCKED');
  const proof = JSON.parse(await readFile(join(f.root, result.project_audit_output)));
  assert.equal(proof.status, 'PROJECT_AUDIT_BLOCKED');
  assert.match(JSON.stringify(proof.audit.check), /release authorization/);
});

async function maintainedFixture(t, moduleId = 'consolidated-mandate') {
  const root = await mkdtemp(join(tmpdir(), 'sot-maintained-post-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const sourceRef = 'docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md';
  for (const ref of ['AGENTS.md', sourceRef, 'docs/design-guide.md', 'docs/responsive-templates.md', 'docs/ausbauplan.md', 'deploy/gesamtauftrag-consistency.test.mjs']) {
    await mkdir(dirname(join(root, ref)), { recursive: true });
    await writeFile(join(root, ref), await readFile(resolve(projectRoot, ref)));
  }
  const original = await readFile(join(root, sourceRef));
  const current = Buffer.concat([original, Buffer.from('\n')]);
  await writeFile(join(root, sourceRef), current);
  const registry = { schema_version: '1.0.0', modules: [{ module_id: moduleId, name: 'Mandate',
    authority: 'governance.delivery', source: sourceRef, status: 'active_reference', dependencies: [], contracts: [],
    version: null, last_verified_baseline: null, semantic_baseline: null, last_audit_status: null }] };
  const contracts = { schema_version: '1.0.0', status: 'interface_metadata_only', contracts: [] };
  const supplement = { schema_version: '1.0.0', status: 'derived_index_only', sources: { work_items: 'docs/epic.md' }, nodes: [], edges: [] };
  for (const [ref, value] of Object.entries({ 'docs/governance/module-registry.json': registry,
    'docs/governance/contracts.json': contracts, 'docs/governance/dependency-graph.json': supplement })) {
    await mkdir(dirname(join(root, ref)), { recursive: true }); await writeFile(join(root, ref), JSON.stringify(value));
  }
  await writeFile(join(root, 'docs/epic.md'), '# No changed work items in this metadata fixture\n');
  await mkdir(join(root, 'docs/sot-optimization/audits'), { recursive: true });
  const graph = await loadDependencyGraph({ graphPath: join(root, 'docs/governance/dependency-graph.json'), registry, contracts,
    epicText: await readFile(join(root, 'docs/epic.md'), 'utf8') });
  const manifests = { [moduleId]: { rules: 'unchanged' } };
  trackIsolatedProject(root);
  return { root, sourceRef, current, input: { updatedModuleIds: [moduleId],
    auditInput: { projectRoot: root, outputPath: join(root, 'docs/sot-optimization/audits/check.json'), registry, contracts, graph,
      before: { [moduleId]: original }, after: { [moduleId]: current }, beforeContracts: contracts, afterContracts: contracts,
      beforeManifests: manifests, afterManifests: structuredClone(manifests), test_profiles: 'maintained',
      change: { kind: 'FORMAT_ONLY', impact_types: ['SOT_GOVERNANCE'], semantic_review: { verified: true, evidence_ref: 'fixture-byte-preservation' } },
      validators: {
        dependencyGraph: async c => ({ status: 'PASS', evidence_ref: 'fixture-graph', graph_source_sha256: c.graph_source_sha256 }),
        module: async c => ({ status: 'PASS', evidence_ref: 'fixture-module', source_sha256: c.source_sha256 }),
      } },
    validators: {
      sotConsistency: async () => { assert.deepEqual(await readFile(join(root, sourceRef)), current); return proof(); },
      traceability: async () => { assert.deepEqual(current.subarray(0, original.length), original); return proof(); },
    } } };
}

test('maintained post-validation runs real profile and references immutable aggregate evidence', async t => {
  const f = await maintainedFixture(t); const result = await runSotPostValidation(f.input);
  assert.equal(result.status, 'POST_VALIDATION_PASS', JSON.stringify(result.checks));
  const bytes = await readFile(join(f.root, result.project_audit_output));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), result.project_audit_sha256);
  const aggregate = JSON.parse(bytes); assert.equal(aggregate.profile_results[0].status, 'LOCAL_PROFILE_PASS');
  assert.equal(aggregate.traceability.status, 'PROJECT_TRACEABILITY_PASS');
});
test('maintained aggregate drift BLOCKED overrides inner snapshot PASS', async t => {
  const f = await maintainedFixture(t);
  f.input.auditInput.validators.module = async c => {
    await writeFile(join(f.root, f.sourceRef), Buffer.concat([f.current, Buffer.from('\n')]));
    return { status: 'PASS', evidence_ref: 'fixture-module', source_sha256: c.source_sha256 };
  };
  const result = await runSotPostValidation(f.input);
  const aggregate = JSON.parse(await readFile(join(f.root, result.project_audit_output)));
  assert.equal(aggregate.audit.status, 'PASS'); assert.equal(aggregate.status, 'PROJECT_AUDIT_BLOCKED');
  assert.equal(result.status, 'POST_VALIDATION_BLOCKED');
  assert.equal(result.checks.find(c => c.name === 'required_check').status, 'BLOCKED');
});
test('late post-check source drift cannot use an earlier passing project proof', async t => {
  const f = await maintainedFixture(t);
  f.input.validators.traceability = async () => { await writeFile(join(f.root, f.sourceRef), 'Unexpected late content'); return proof(); };
  const result = await runSotPostValidation(f.input);
  assert.equal(result.status, 'POST_VALIDATION_BLOCKED');
  assert.equal(result.checks.find(c => c.name === 'project_sources_after_validators').status, 'BLOCKED');
});
test('maintained post-validation follows a real work item to original commissioned requirements', async t => {
  const f = await maintainedFixture(t);
  const backlogRef = 'docs/governance/source-of-truth-and-incremental-planning.md';
  for (const ref of [backlogRef, 'docs/sot-optimization/requirements-section-index.csv',
    'docs/sot-optimization/sot-preservation-matrix.csv', 'docs/sot-optimization/wsjf-preservation-matrix.csv',
    'docs/sot-optimization/sources/sot-process-input-2026-09-26.md',
    'docs/sot-optimization/sources/wsjf-multi-agent-input-2026-09-26.md',
    'docs/sot-optimization/sources/full-implementation-input-2026-09-26.txt']) {
    await mkdir(dirname(join(f.root, ref)), { recursive: true });
    await writeFile(join(f.root, ref), await readFile(resolve(projectRoot, ref)));
  }
  const registry = f.input.auditInput.registry;
  registry.modules.push({ ...registry.modules[0], module_id: 'sot-architecture', name: 'SoT', authority: 'governance.sot', source: backlogRef });
  await writeFile(join(f.root, 'docs/governance/module-registry.json'), JSON.stringify(registry));
  const supplement = { schema_version: '1.0.0', status: 'derived_index_only', sources: { work_items: backlogRef }, nodes: [], edges: [] };
  const graphPath = join(f.root, 'docs/governance/dependency-graph.json');
  await writeFile(graphPath, JSON.stringify(supplement));
  f.input.auditInput.graph = await loadDependencyGraph({ graphPath, registry, contracts: f.input.auditInput.contracts,
    epicText: await readFile(join(f.root, backlogRef), 'utf8') });
  const backlog = await readFile(join(f.root, backlogRef));
  f.input.auditInput.before['sot-architecture'] = backlog; f.input.auditInput.after['sot-architecture'] = backlog;
  f.input.auditInput.beforeManifests['sot-architecture'] = { status: 'preserved' };
  f.input.auditInput.afterManifests['sot-architecture'] = { status: 'preserved' };
  f.input.auditInput.change.work_item_ids = ['WI-SOT-16-01'];
  f.input.auditInput.validators.workItem = async c => ({ status: 'PASS', evidence_ref: 'fixture-original-ancestry',
    work_item_source_sha256: c.work_item_source_sha256 });
  trackIsolatedProject(f.root);
  const result = await runSotPostValidation(f.input);
  assert.equal(result.status, 'POST_VALIDATION_PASS', JSON.stringify(result.checks));
  const aggregate = JSON.parse(await readFile(join(f.root, result.project_audit_output)));
  assert.ok(aggregate.traceability.traceability_records.some(record => record.work_item_id === 'WI-SOT-16-01'));
  assert.equal(aggregate.traceability.implementation_coverage, 'UNKNOWN');
});
