import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { defaultRegistryPath, loadRegistry, lookupAuthority, validateRegistry } from './module-registry.mjs';

async function fixture() {
  return JSON.parse(await readFile(defaultRegistryPath, 'utf8'));
}

test('checked-in registry resolves one exact authority deterministically', async () => {
  const registry = await loadRegistry();
  const design = lookupAuthority(registry, 'website.design');
  assert.equal(design.module_id, 'design-guide');
  assert.equal(design.source, 'docs/design-guide.md');
  assert.equal(lookupAuthority(registry, 'website.missing'), null);
});

test('checked-in scoped references remain owned by the Scrum core, not authorities', async () => {
  const registry = await loadRegistry();
  const board = registry.modules.find(module => module.module_id === 'board-architecture');
  const video = registry.modules.find(module => module.module_id === 'video-production');
  for (const module of [board, video]) {
    assert.equal(module.status, 'scoped_reference');
    assert.equal(module.authority, null);
    assert.equal(module.owner_module, 'scrum-core');
  }
  assert.equal(lookupAuthority(registry, 'planning.board-architecture'), null);
});

test('rejects duplicate module IDs and authority keys', async () => {
  const registry = await fixture();
  registry.modules.push({ ...registry.modules[0], source: 'docs/analytics.md' });
  const result = await validateRegistry(registry);
  assert.equal(result.valid, false);
  assert.match(result.errors.join('\n'), /module_id duplicates/);
  assert.match(result.errors.join('\n'), /authority duplicates/);
});

test('rejects nonexistent and escaping source paths', async () => {
  const registry = await fixture();
  registry.modules[0].source = 'docs/does-not-exist.md';
  assert.match((await validateRegistry(registry)).errors.join('\n'), /source is not an existing repository file/);
  registry.modules[0].source = '../outside.md';
  assert.match((await validateRegistry(registry)).errors.join('\n'), /source is not an existing repository file/);
});

test('rejects a scoped reference without core ownership or with an authority claim', async () => {
  const registry = await fixture();
  const board = registry.modules.find(module => module.module_id === 'board-architecture');
  delete board.owner_module;
  board.authority = 'planning.board-architecture';
  const result = await validateRegistry(registry);
  assert.equal(result.valid, false);
  assert.match(result.errors.join('\n'), /authority must be null/);
  assert.match(result.errors.join('\n'), /owner_module is required/);
});

test('rejects unknown and self-referential dependency IDs', async () => {
  const registry = await fixture();
  registry.modules[0].dependencies = ['unknown-module', 'scrum-core'];
  const result = await validateRegistry(registry);
  assert.equal(result.valid, false);
  assert.match(result.errors.join('\n'), /unknown dependency unknown-module/);
  assert.match(result.errors.join('\n'), /depends on itself/);
});

test('rejects incomplete baseline and malformed contract reference', async () => {
  const registry = await fixture();
  registry.modules[1].last_verified_baseline = { ref: 'HEAD' };
  registry.modules[1].contracts = ['not a contract'];
  const result = await validateRegistry(registry);
  assert.equal(result.valid, false);
  assert.match(result.errors.join('\n'), /last_verified_baseline/);
  assert.match(result.errors.join('\n'), /invalid contract ID/);
});
