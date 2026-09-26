import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';
import { checkSotConsistency } from './sot-consistency.mjs';

const root = new URL('../../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');

async function fixture(t) {
  const projectRoot = await mkdtemp(join(tmpdir(), 'sot-consistency-'));
  t.after(() => rm(projectRoot, { recursive: true, force: true }));
  for (const path of ['docs/plan-register.json', 'docs/governance/module-registry.json', 'docs/scrum-plan.md',
    'docs/governance/source-of-truth-and-incremental-planning.md']) {
    const target = join(projectRoot, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, await read(path));
  }
  const registerPath = join(projectRoot, 'docs/plan-register.json');
  const register = JSON.parse(await readFile(registerPath, 'utf8'));
  register.sources = register.sources.filter(source => ['docs/scrum-plan.md', 'docs/governance/source-of-truth-and-incremental-planning.md'].includes(source.path));
  await writeFile(registerPath, JSON.stringify(register));
  const registryPath = join(projectRoot, 'docs/governance/module-registry.json');
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  registry.modules = registry.modules.filter(module => ['scrum-core', 'sot-architecture'].includes(module.module_id));
  registry.modules.forEach(module => { module.semantic_baseline = null; });
  await writeFile(registryPath, JSON.stringify(registry));
  return projectRoot;
}

test('checked-in project has one canonical plan and a consistent SoT binding', async () => {
  assert.deepEqual(await checkSotConsistency(), { status: 'PASS', errors: [] });
});

test('rejects duplicate canonical-plan roles', async t => {
  const projectRoot = await fixture(t);
  const path = join(projectRoot, 'docs/plan-register.json');
  const register = JSON.parse(await readFile(path, 'utf8'));
  register.sources.push({ path: 'docs/governance/source-of-truth-and-incremental-planning.md', role: 'canonical-plan', requiredCanonicalPhrases: [] });
  await writeFile(path, JSON.stringify(register));
  const result = await checkSotConsistency({ projectRoot, checkOverview: false });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.errors.includes('CANONICAL_PLAN_ROLE_NOT_UNIQUE'));
});

test('rejects a registry that detaches the SoT architecture from its source', async t => {
  const projectRoot = await fixture(t);
  const path = join(projectRoot, 'docs/governance/module-registry.json');
  const registry = JSON.parse(await readFile(path, 'utf8'));
  registry.modules.find(module => module.module_id === 'sot-architecture').source = 'docs/scrum-plan.md';
  await writeFile(path, JSON.stringify(registry));
  const result = await checkSotConsistency({ projectRoot, checkOverview: false });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.errors.includes('SOT_ARCHITECTURE_BINDING_INVALID'), JSON.stringify(result));
});
