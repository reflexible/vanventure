import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';
import { captureGitStatus, parsePorcelainStatus } from './git-status-snapshot.mjs';

const run = (root, args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
async function repository(t) {
  const root = await mkdtemp(join(tmpdir(), 'git-status-snapshot-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  run(root, ['init', '--quiet']); run(root, ['config', 'user.email', 'test@example.invalid']); run(root, ['config', 'user.name', 'Test']);
  await writeFile(join(root, 'tracked.txt'), 'initial\n');
  run(root, ['add', 'tracked.txt']); run(root, ['commit', '--quiet', '-m', 'initial']);
  return root;
}

test('captures a clean repository without changing it', async t => {
  const root = await repository(t);
  const before = run(root, ['status', '--porcelain=v1']);
  const snapshot = captureGitStatus(root);
  assert.equal(snapshot.mode, 'READ_ONLY_PRE_SLICE_SNAPSHOT');
  assert.equal(snapshot.counts.total, 0);
  assert.deepEqual(snapshot.entries, []);
  assert.equal(run(root, ['status', '--porcelain=v1']), before);
});

test('separates staged, unstaged and untracked work', async t => {
  const root = await repository(t);
  await writeFile(join(root, 'tracked.txt'), 'changed\n');
  await writeFile(join(root, 'staged.txt'), 'staged\n');
  await writeFile(join(root, 'untracked.txt'), 'untracked\n');
  run(root, ['add', 'staged.txt']);
  const snapshot = captureGitStatus(root);
  assert.equal(snapshot.counts.staged, 1);
  assert.equal(snapshot.counts.unstaged, 1);
  assert.equal(snapshot.counts.untracked, 1);
  assert.deepEqual(snapshot.entries.map(entry => entry.path).sort(), ['staged.txt', 'tracked.txt', 'untracked.txt']);
  assert.equal(snapshot.entries.find(entry => entry.path === 'untracked.txt').state, 'untracked');
});

test('parses renamed porcelain records with their original path', () => {
  const entries = parsePorcelainStatus('R  replacement.txt\0original.txt\0');
  assert.deepEqual(entries, [{ path: 'replacement.txt', original_path: 'original.txt', index_status: 'R', worktree_status: ' ', state: 'tracked_change' }]);
});
