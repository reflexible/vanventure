import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { createProjectAuditRunner } from './project-audit.mjs';
function track(root) {
  for (const args of [['init', '--quiet'], ['add', '--', '.']]) {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  }
}

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'sot-project-audit-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = Buffer.from('# Fixture\nPreserve current rule.\n');
  const module = { module_id: 'fixture', name: 'Fixture', authority: 'fixture.rules', source: 'docs/fixture.md',
    status: 'active_reference', dependencies: [], contracts: [], version: null, last_verified_baseline: null,
    semantic_baseline: null, last_audit_status: null };
  const registry = { schema_version: '1.0.0', modules: [module] };
  const contracts = { schema_version: '1.0.0', status: 'interface_metadata_only', contracts: [] };
  const graph = { schema_version: '1.0.0', status: 'derived_index_only', sources: { work_items: 'docs/epic.md' }, nodes: [], edges: [] };
  for (const [ref, body] of Object.entries({ 'docs/fixture.md': source, 'docs/epic.md': '# Fixture epic\n',
    'docs/governance/module-registry.json': JSON.stringify(registry), 'docs/governance/contracts.json': JSON.stringify(contracts),
    'docs/governance/dependency-graph.json': JSON.stringify(graph) })) {
    await mkdir(dirname(join(root, ref)), { recursive: true }); await writeFile(join(root, ref), body);
  }
  await mkdir(join(root, 'docs/sot-optimization/audits'), { recursive: true });
  const manifest = { fixture: { requirements: ['Preserve current rule.'] } };
  track(root);
  return { root, source, input: { outputPath: 'docs/sot-optimization/audits/check.json', change: { kind: 'FORMAT_ONLY' },
    before: { fixture: source }, beforeContracts: contracts, beforeManifests: manifest, afterManifests: structuredClone(manifest) } };
}

test('NO_CHECK uses actual same-root source bytes and preserves cloned Buffer semantics', async t => {
  const f = await fixture(t);
  const result = await createProjectAuditRunner({ projectRoot: f.root })(f.input);
  assert.equal(result.status, 'PROJECT_AUDIT_PASS');
  assert.equal(result.audit.mode, 'NO_CHECK');
  assert.deepEqual(result.audit.delta.excluded_unchanged_modules, ['fixture']);
  assert.ok(Buffer.isBuffer(f.input.before.fixture));
  assert.equal(result.live_verified, false);
  assert.deepEqual(JSON.parse(await readFile(join(f.root, 'docs/sot-optimization/audits/check.project-evidence.json'))), result);
  await assert.rejects(createProjectAuditRunner({ projectRoot: f.root })(f.input), /ALREADY_EXISTS/);
});
test('caller cannot inject current sources, arbitrary executable tests or validators', async t => {
  const f = await fixture(t); const run = createProjectAuditRunner({ projectRoot: f.root });
  for (const key of ['after', 'registry', 'contracts', 'graph', 'afterContracts', 'validators', 'test_commands', 'traceability_records']) {
    await assert.rejects(run({ ...f.input, [key]: {} }), /PROJECT_INPUT_IS_HOST_OWNED/);
  }
});
test('actual changed source cannot receive NO_CHECK and absent FULL validators remain blocking', async t => {
  const f = await fixture(t);
  await writeFile(join(f.root, 'docs/fixture.md'), '# Fixture\nChanged requirement.\n');
  f.input.change = { kind: 'SEMANTIC', impact_types: ['SOT_GOVERNANCE'] };
  const result = await createProjectAuditRunner({ projectRoot: f.root })(f.input);
  assert.equal(result.status, 'PROJECT_AUDIT_BLOCKED');
  assert.equal(result.audit.mode, 'FULL_CHECK');
  assert.ok(result.audit.check.checks.some(check => check.reason === 'MISSING_PROJECT_module_VALIDATOR'));
  assert.ok(result.audit.check.checks.some(check => check.reason === 'MISSING_PROJECT_dependencyGraph_VALIDATOR'));
});
test('source mutation inside trusted checker invalidates aggregate evidence and preserves detached impact', async t => {
  const f = await fixture(t);
  await writeFile(join(f.root, 'docs/fixture.md'), '# Fixture\nReviewed change.\n');
  f.input.change = { kind: 'SEMANTIC', impact_types: ['SOT_GOVERNANCE'] };
  const run = createProjectAuditRunner({ projectRoot: f.root, fullValidators: {
    dependencyGraph: async context => {
      context.impact.scope.modules.length = 0;
      await writeFile(join(f.root, 'docs/fixture.md'), 'Unexpected concurrent content');
      return { status: 'PASS', evidence_ref: 'synthetic-graph-proof', graph_source_sha256: context.graph_source_sha256 };
    },
  } });
  const result = await run(f.input);
  assert.equal(result.status, 'PROJECT_AUDIT_BLOCKED');
  assert.deepEqual(result.source_drift, ['docs/fixture.md']);
  assert.ok(result.audit.scope.modules.includes('fixture'));
});
test('semantic PASS without exact source binding cannot certify a module', async t => {
  const f = await fixture(t); f.input.change = { kind: 'SEMANTIC', impact_types: ['SOT_GOVERNANCE'] };
  await writeFile(join(f.root, 'docs/fixture.md'), 'Changed rule');
  const result = await createProjectAuditRunner({ projectRoot: f.root, fullValidators: {
    dependencyGraph: async c => ({ status: 'PASS', evidence_ref: 'graph', graph_source_sha256: c.graph_source_sha256 }),
    module: async () => ({ status: 'PASS', evidence_ref: 'module', source_sha256: 'wrong' }),
  } })(f.input);
  assert.equal(result.status, 'PROJECT_AUDIT_BLOCKED');
  assert.ok(result.audit.check.checks.some(c => c.reason === 'PROJECT_VALIDATOR_BINDING_MISSING'));
});
test('FULL executes an existing maintained profile plus exact scoped semantic validator in an isolated project copy', async t => {
  const f = await fixture(t);
  const sourceRef = 'docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md';
  const original = await readFile(new URL(`../../${sourceRef}`, import.meta.url));
  const current = Buffer.concat([original, Buffer.from('\n')]);
  for (const ref of ['AGENTS.md', 'docs/design-guide.md', 'docs/responsive-templates.md', 'docs/ausbauplan.md', 'deploy/gesamtauftrag-consistency.test.mjs']) {
    await mkdir(dirname(join(f.root, ref)), { recursive: true });
    await writeFile(join(f.root, ref), await readFile(new URL(`../../${ref}`, import.meta.url)));
  }
  await writeFile(join(f.root, sourceRef), current);
  const registryPath = join(f.root, 'docs/governance/module-registry.json');
  const registry = JSON.parse(await readFile(registryPath));
  registry.modules[0].module_id = 'consolidated-mandate'; registry.modules[0].source = sourceRef;
  await writeFile(registryPath, JSON.stringify(registry));
  f.input.before = { 'consolidated-mandate': original };
  f.input.beforeManifests = { 'consolidated-mandate': { rules: 'preserved' } };
  f.input.afterManifests = structuredClone(f.input.beforeManifests);
  f.input.change = { kind: 'FORMAT_ONLY', impact_types: ['SOT_GOVERNANCE'], semantic_review: { verified: true, evidence_ref: 'isolated-exact-bytes' } };
  track(f.root);
  const result = await createProjectAuditRunner({ projectRoot: f.root, fullValidators: {
    dependencyGraph: async c => ({ status: 'PASS', evidence_ref: 'isolated-graph', graph_source_sha256: c.graph_source_sha256 }),
    module: async c => {
      assert.deepEqual(await readFile(join(f.root, sourceRef)), current);
      assert.equal(c.source_sha256, createHash('sha256').update(current).digest('hex'));
      return { status: 'PASS', evidence_ref: 'isolated-exact-byte-preservation', source_sha256: c.source_sha256 };
    },
  } })(f.input);
  assert.equal(result.status, 'PROJECT_AUDIT_PASS', JSON.stringify(result.audit.reasons));
  assert.equal(result.audit.mode, 'FULL_CHECK');
  assert.equal(result.profile_results[0].profile_id, 'mandate-consistency-local');
  assert.equal(result.profile_results[0].status, 'LOCAL_PROFILE_PASS');
  assert.ok(result.profile_source_paths['mandate-consistency-local'].includes('deploy/gesamtauftrag-consistency.test.mjs'));
  assert.ok(result.runtime_source_sha256['project-audit']);
  // The active-process checker runs after module/profile checks: changes to
  // already-tested executable bytes must invalidate the aggregate result.
  f.input.outputPath = 'docs/sot-optimization/audits/changed-code.json';
  f.input.change.active_processes = [{ id: 'fixture-process', module_ids: ['consolidated-mandate'], conflict: false }];
  const watched = 'deploy/gesamtauftrag-consistency.test.mjs';
  const drifted = await createProjectAuditRunner({ projectRoot: f.root, fullValidators: {
    dependencyGraph: async c => ({ status: 'PASS', evidence_ref: 'graph', graph_source_sha256: c.graph_source_sha256 }),
    module: async c => ({ status: 'PASS', evidence_ref: 'exact-module', source_sha256: c.source_sha256 }),
    activeProcess: async c => {
      await writeFile(join(f.root, watched), Buffer.concat([await readFile(join(f.root, watched)), Buffer.from('\n// concurrent change after module tests\n')]));
      return { status: 'PASS', evidence_ref: 'process', graph_source_sha256: c.graph_source_sha256 };
    },
  } })(f.input);
  assert.equal(drifted.audit.status, 'PASS');
  assert.equal(drifted.profile_results[0].status, 'LOCAL_PROFILE_PASS');
  assert.equal(drifted.status, 'PROJECT_AUDIT_BLOCKED');
  assert.ok(drifted.source_drift.includes(watched));
});
test('output traversal, existing proof and output-directory junction cannot escape immutable evidence area', async t => {
  const f = await fixture(t); const run = createProjectAuditRunner({ projectRoot: f.root });
  await assert.rejects(run({ ...f.input, outputPath: '../outside.json' }), /ESCAPE/);
  const proof = join(f.root, 'docs/sot-optimization/audits/check.project-evidence.json');
  await writeFile(proof, 'Existing proof');
  await assert.rejects(run(f.input), /ALREADY_EXISTS/);
  assert.equal(await readFile(proof, 'utf8'), 'Existing proof');
  const outside = await mkdtemp(join(tmpdir(), 'sot-outside-'));
  t.after(() => rm(outside, { recursive: true, force: true }));
  await symlink(outside, join(f.root, 'docs/sot-optimization/audits/alias'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(run({ ...f.input, outputPath: 'docs/sot-optimization/audits/alias/escape.json' }), /PARENT_ALIAS/);
});
