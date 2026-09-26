import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { defaultRegistryPath, loadRegistry } from './module-registry.mjs';
import { defaultOverviewPath, renderModuleOverview, verifyModuleOverview } from './module-overview.mjs';

test('checked-in overview is exactly derived from the valid module registry', async () => {
  const registry = await loadRegistry();
  assert.equal(await readFile(defaultOverviewPath, 'utf8'), renderModuleOverview(registry));
  assert.deepEqual(await verifyModuleOverview(), { moduleCount: 11, overviewPath: defaultOverviewPath });
});

test('overview labels Core-scoped references and does not present them as authorities', async () => {
  const registry = await loadRegistry();
  const output = renderModuleOverview(registry);
  assert.match(output, /`board-architecture` \| Core-Referenz \(scrum-core\) \| Referenz: planning\.board-architecture/);
  assert.match(output, /`video-production` \| Core-Referenz \(scrum-core\) \| Referenz: editorial\.video-production/);
  assert.doesNotMatch(output, /board-architecture \| Fachautorität/);
});

test('overview verification rejects a stale generated file', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'module-overview-'));
  const overviewPath = join(directory, 'overview.md');
  await writeFile(overviewPath, 'stale');
  await assert.rejects(() => verifyModuleOverview({ registryPath: defaultRegistryPath, overviewPath }), /stale/);
});
