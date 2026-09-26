import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';
import { captureGitCommit } from './git-commit-snapshot.mjs';

const run = (root, args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
async function repository(t) {
  const root = await mkdtemp(join(tmpdir(), 'git-commit-snapshot-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  run(root, ['init', '--quiet']); run(root, ['config', 'user.email', 'test@example.invalid']); run(root, ['config', 'user.name', 'Test']);
  await writeFile(join(root, 'tracked.txt'), 'initial\n'); run(root, ['add', 'tracked.txt']); run(root, ['commit', '--quiet', '-m', 'initial']);
  return root;
}

test('reports an empty staging area without changing repository state', async t => {
  const root = await repository(t);
  const before = run(root, ['status', '--porcelain=v1']);
  const snapshot = captureGitCommit(root);
  assert.equal(snapshot.status, 'EMPTY');
  assert.deepEqual(snapshot.staged_paths, []);
  assert.equal(run(root, ['status', '--porcelain=v1']), before);
});

test('reports exact staged paths and diff size for review', async t => {
  const root = await repository(t);
  await writeFile(join(root, 'tracked.txt'), 'changed\n'); await writeFile(join(root, 'added.txt'), 'added\n');
  run(root, ['add', 'tracked.txt', 'added.txt']);
  const snapshot = captureGitCommit(root);
  assert.equal(snapshot.status, 'READY');
  assert.deepEqual(snapshot.staged_paths.sort(), ['added.txt', 'tracked.txt']);
  assert.match(snapshot.shortstat, /2 files changed/);
  assert.deepEqual(snapshot.whitespace_errors, []);
});

test('blocks staged whitespace errors before commit', async t => {
  const root = await repository(t);
  await writeFile(join(root, 'tracked.txt'), 'bad trailing space \n'); run(root, ['add', 'tracked.txt']);
  const snapshot = captureGitCommit(root);
  assert.equal(snapshot.status, 'BLOCKED');
  assert.ok(snapshot.whitespace_errors.length > 0);
});
