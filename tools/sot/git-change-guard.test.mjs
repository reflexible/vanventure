import assert from 'node:assert/strict';
import test from 'node:test';
import { guardForeignChanges } from './git-change-guard.mjs';

const snapshot = entries => ({ schema_version: '1.0.0', mode: 'READ_ONLY_PRE_SLICE_SNAPSHOT', entries });
const entry = (path, state = 'untracked') => ({ path, original_path: undefined, index_status: state === 'untracked' ? '?' : ' ', worktree_status: state === 'untracked' ? '?' : 'M', state });

test('allows a disjoint write scope while preserving pre-existing work', () => {
  const baseline = snapshot([entry('review/external.json'), entry('docs/foreign.md', 'tracked_change')]);
  const result = guardForeignChanges({ baseline, current: structuredClone(baseline), writeScope: ['tools/sot/new-check.mjs'] });
  assert.deepEqual(result, { status: 'PASS', protected_entries: 2, errors: [] });
});

test('blocks a write scope that overlaps a protected file or directory', () => {
  const baseline = snapshot([entry('review/external.json'), entry('docs/foreign.md', 'tracked_change')]);
  const result = guardForeignChanges({ baseline, current: structuredClone(baseline), writeScope: ['review'] });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.errors.includes('PROTECTED_PATH_OVERLAP:review/external.json'));
});

test('blocks disappearance or status drift of a protected entry', () => {
  const baseline = snapshot([entry('docs/foreign.md', 'tracked_change')]);
  const result = guardForeignChanges({ baseline, current: snapshot([]), writeScope: ['tools/sot/check.mjs'] });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.errors.includes('PROTECTED_CHANGE_DRIFT:docs/foreign.md'));
});

test('requires an explicit safe write scope and valid snapshots', () => {
  const result = guardForeignChanges({ baseline: {}, current: {}, writeScope: ['../outside'] });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.errors.includes('VALID_BASELINE_REQUIRED'));
  assert.ok(result.errors.includes('VALID_CURRENT_SNAPSHOT_REQUIRED'));
  assert.ok(result.errors.includes('INVALID_WRITE_SCOPE'));
});
