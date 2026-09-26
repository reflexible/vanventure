import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { assessAnalyticsActivation, ANALYTICS_CONTRACT_PIN } from './analytics-activation-gate.mjs';

async function fixture(t) {
  const root = await mkdtemp(resolve(tmpdir(), 'analytics-inactive-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const registry = JSON.parse(await readFile(new URL('../../docs/governance/module-registry.json', import.meta.url), 'utf8'));
  const catalogue = JSON.parse(await readFile(new URL('../../docs/governance/contracts.json', import.meta.url), 'utf8'));
  const sources = new Set(registry.modules.flatMap(module => [module.source, module.semantic_baseline]).filter(Boolean));
  for (const path of sources) { await mkdir(resolve(root, path, '..'), { recursive: true }); await writeFile(resolve(root, path), 'Fixture source only; no runtime exists.'); }
  await writeFile(resolve(root, 'docs/governance/module-registry.json'), JSON.stringify(registry));
  const path = resolve(root, 'docs/governance/contracts.json');
  await writeFile(path, JSON.stringify(catalogue));
  return { root, catalogue, path, check: (action = 'defer', rest = {}) => assessAnalyticsActivation({ projectRoot: root, action, ...rest }) };
}

test('valid current contract can remain deferred but is never runtime or activation PASS', async t => {
  const { check } = await fixture(t);
  const result = await check();
  assert.equal(result.status, 'DEFERRED_INACTIVE', result.errors.join('; '));
  assert.equal(result.activation_allowed, false);
  assert.equal(result.runtime_verified, false);
  assert.equal(result.evidence.contract_sha256, ANALYTICS_CONTRACT_PIN.sha256);
  assert.equal((await check('activate')).status, 'ACTIVATION_BLOCKED');
});

test('missing, wrong-version and semantically modified contracts block even deferred acceptance', async t => {
  for (const mutate of [
    catalogue => { catalogue.contracts = catalogue.contracts.filter(c => c.contract_id !== 'ANALYTICS-CONTENT-ID'); },
    catalogue => { catalogue.contracts.find(c => c.contract_id === 'ANALYTICS-CONTENT-ID').version = '0.9.0'; },
    catalogue => { catalogue.contracts.find(c => c.contract_id === 'ANALYTICS-CONTENT-ID').invariants = ['Caller approval is sufficient.']; },
    catalogue => { catalogue.contracts.find(c => c.contract_id === 'ANALYTICS-CONTENT-ID').fields.content_id.required = false; },
  ]) {
    const { check, path, catalogue } = await fixture(t); mutate(catalogue); await writeFile(path, JSON.stringify(catalogue));
    assert.equal((await check()).status, 'ACTIVATION_BLOCKED');
  }
});

test('forged statuses, PASS evidence and caller-installed adapters cannot enable activation', async t => {
  const { check } = await fixture(t);
  for (const fake of [
    { status: 'ACTIVE' }, { runtime_verified: true }, { evidence: { status: 'PASS', sha256: 'a'.repeat(64) } },
    { verifyRuntime: async () => ({ status: 'PASS' }) }, { expectedContractSha256: '0'.repeat(64) },
  ]) assert.equal((await check('activate', fake)).status, 'ACTIVATION_BLOCKED');
});

test('corrupted catalogue and changed authority cannot masquerade as an inactive valid contract', async t => {
  const { check, path, root } = await fixture(t);
  const original = await readFile(path);
  await writeFile(path, '{'); assert.equal((await check()).status, 'ACTIVATION_BLOCKED');
  await writeFile(path, original);
  const registryPath = resolve(root, 'docs/governance/module-registry.json');
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  registry.modules.find(m => m.module_id === 'analytics').authority = 'website.other';
  await writeFile(registryPath, JSON.stringify(registry));
  assert.match((await check()).errors.join(';'), /AUTHORITY_CHANGED/);
});
