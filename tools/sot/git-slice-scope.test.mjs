import assert from 'node:assert/strict';
import test from 'node:test';
import { prepareGitSlice } from './git-slice-scope.mjs';

const snapshot = entries => ({ schema_version: '1.0.0', mode: 'READ_ONLY_PRE_SLICE_SNAPSHOT', entries });
const entry = path => ({ path, index_status: '?', worktree_status: '?', state: 'untracked' });

test('prepares one explicitly scoped, disjoint work item', () => {
  const baseline = snapshot([entry('review/external.json')]);
  const result = prepareGitSlice({ workItemId: 'WI-SOT-30-03', baseline, current: structuredClone(baseline),
    writeScope: ['tools/sot/git-slice-scope.mjs', 'tools/sot/git-slice-scope.test.mjs'] });
  assert.deepEqual(result, { status: 'READY', work_item_id: 'WI-SOT-30-03',
    write_scope: ['tools/sot/git-slice-scope.mjs', 'tools/sot/git-slice-scope.test.mjs'], protected_entries: 1, errors: [] });
});

test('rejects ambiguous work item IDs and duplicated scope paths', () => {
  const clean = snapshot([]);
  const result = prepareGitSlice({ workItemId: 'not-a-work-item', baseline: clean, current: clean, writeScope: ['tools/sot/a.mjs', 'tools/sot/a.mjs'] });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.errors.includes('VALID_WORK_ITEM_ID_REQUIRED'));
  assert.ok(result.errors.includes('DUPLICATE_WRITE_SCOPE'));
});

test('carries foreign-change conflicts into the work-item boundary', () => {
  const baseline = snapshot([entry('tools/sot/external.mjs')]);
  const result = prepareGitSlice({ workItemId: 'WI-SOT-30-03', baseline, current: structuredClone(baseline), writeScope: ['tools/sot'] });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.errors.includes('PROTECTED_PATH_OVERLAP:tools/sot/external.mjs'));
});
