import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { detectDelta, readModuleSnapshots } from './delta.mjs';
import { normalizedTextSha256, semanticManifestSha256, sha256 } from './baselines.mjs';

const registry = {
  modules: [
    { module_id: 'alpha', source: 'docs/alpha.md' },
    { module_id: 'beta', source: 'docs/beta.md' },
  ],
};
const old = { alpha: Buffer.from('A\nB\n'), beta: Buffer.from('unchanged\n') };
const manifest = { requirements: [{ id: 'R1', rule: 'A and B.' }] };

function args(after, more = {}) { return { registry, before: old, after: { ...old, ...after }, ...more }; }

test('line endings are format only; unchanged modules are excluded', () => {
  const result = detectDelta(args({ alpha: Buffer.from('A\r\nB\r\n') }));
  assert.deepEqual(result.excluded_unchanged_modules, ['beta']);
  assert.equal(result.modules[0].classification, 'FORMAT_ONLY');
  assert.equal(result.modules[0].byte_match, false);
  assert.equal(result.modules[0].normalized_text_match, true);
  assert.equal(result.requires_semantic_review, false);
});

test('text change without explicit paired manifests remains semantically unknown', () => {
  const result = detectDelta(args({ alpha: Buffer.from('A\nchanged\n') }));
  assert.equal(result.modules[0].classification, 'TEXT_CHANGED_SEMANTICS_UNVERIFIED');
  assert.equal(result.modules[0].semantic_manifest_match, null);
  assert.equal(result.requires_semantic_review, true);
  const onlyAfter = detectDelta(args({ alpha: Buffer.from('A\nchanged\n') }, { afterManifests: { alpha: manifest } }));
  assert.equal(onlyAfter.modules[0].semantic_manifest_match, null);
});

test('explicit semantic manifest change is detected independently of text formatting', () => {
  const changed = { requirements: [{ id: 'R1', rule: 'A and C.' }] };
  const result = detectDelta(args({ alpha: Buffer.from('A\nchanged\n') }, {
    beforeManifests: { alpha: manifest }, afterManifests: { alpha: changed },
  }));
  assert.equal(result.modules[0].classification, 'SEMANTIC_MANIFEST_CHANGED');
  assert.equal(result.modules[0].semantic_manifest_match, false);
});

test('semantic manifest disagreement remains affected even when source bytes match', () => {
  const changed = { requirements: [{ id: 'R1', rule: 'Different requirement.' }] };
  const result = detectDelta(args({}, {
    beforeManifests: { alpha: manifest }, afterManifests: { alpha: changed },
  }));
  assert.deepEqual(result.excluded_unchanged_modules, ['beta']);
  assert.deepEqual(result.modules.map(item => item.module_id), ['alpha']);
  assert.equal(result.modules[0].byte_match, true);
  assert.equal(result.modules[0].classification, 'SEMANTIC_MANIFEST_CHANGED');
  assert.equal(result.modules[0].semantic_manifest_match, false);
  assert.equal(result.requires_semantic_review, true);
});

test('contract breaking change includes both boundary modules and version failure', () => {
  const base = {
    contract_id: 'BOUNDARY', version: '1.0.0', provider_module: 'alpha', consumer_module: 'beta',
    authoritative_rule: 'docs/alpha.md', fields: { value: { type: 'string', required: true } }, invariants: ['Value.'],
  };
  const changed = structuredClone(base);
  changed.fields.value.type = 'number';
  const result = detectDelta(args({}, {
    beforeContracts: { contracts: [base] }, afterContracts: { contracts: [changed] },
  }));
  assert.deepEqual(result.modules.map(item => item.module_id), ['alpha', 'beta']);
  assert.deepEqual(result.modules[0].changed_contracts, ['BOUNDARY']);
  assert.equal(result.contracts[0].kind, 'BREAKING');
  assert.equal(result.contracts[0].version_valid, false);
  assert.equal(result.has_contract_break, true);
  assert.deepEqual(result.excluded_unchanged_modules, []);
});

test('pinned baseline supplies previous hash and explicit manifest', () => {
  const baseline = {
    source: 'docs/alpha.md', byte_sha256: sha256(old.alpha),
    normalized_text_sha256: normalizedTextSha256(old.alpha),
    semantic_manifest_sha256: semanticManifestSha256(manifest),
  };
  const result = detectDelta({
    registry: { modules: [registry.modules[0]] }, after: { alpha: Buffer.from('new\n') },
    baselines: [baseline], afterManifests: { alpha: manifest },
  });
  assert.equal(result.modules[0].classification, 'TEXT_CHANGED_MANIFEST_UNCHANGED');
  assert.equal(result.modules[0].previous_sha256, baseline.byte_sha256);
});

test('snapshot reader accesses checkout by default and rejects implicit or unsafe refs', async () => {
  const root = await mkdtemp(join(tmpdir(), 'sot-delta-'));
  try {
    await mkdir(join(root, 'docs'));
    await writeFile(join(root, 'docs/alpha.md'), 'A\n');
    const result = await readModuleSnapshots({ modules: [registry.modules[0]] }, { projectRoot: root });
    assert.equal(result.alpha.toString(), 'A\n');
    await assert.rejects(() => readModuleSnapshots({ modules: [registry.modules[0]] }, { projectRoot: root, ref: 'HEAD' }), /explicit full OID/);
    await assert.rejects(() => readModuleSnapshots({ modules: [{ module_id: 'bad', source: '../outside' }] }, { projectRoot: root }), /escapes repository/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('same inputs produce the same ordered and reproducible result', () => {
  const input = args({ alpha: Buffer.from('A\r\nB\r\n') });
  assert.deepEqual(detectDelta(input), detectDelta(input));
  assert.deepEqual(detectDelta(input).modules.map(item => item.module_id), ['alpha']);
});
