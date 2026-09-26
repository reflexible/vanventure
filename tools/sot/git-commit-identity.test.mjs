import assert from 'node:assert/strict';
import test from 'node:test';
import { validateCommitIdentity } from './git-commit-identity.mjs';

test('accepts a commit title that begins with its exact work item', () => {
  assert.deepEqual(validateCommitIdentity({ workItemId: 'WI-SOT-30-05', message: 'WI-SOT-30-05 bind commit identity\n\nDetails.' }),
    { status: 'PASS', work_item_id: 'WI-SOT-30-05', title: 'WI-SOT-30-05 bind commit identity', errors: [] });
});

test('rejects a missing, mismatched, or buried work item ID', () => {
  const missing = validateCommitIdentity({ workItemId: 'WI-SOT-30-05', message: '' });
  assert.ok(missing.errors.includes('COMMIT_MESSAGE_REQUIRED'));
  const mismatch = validateCommitIdentity({ workItemId: 'WI-SOT-30-05', message: 'WI-SOT-30-04 other slice' });
  assert.ok(mismatch.errors.includes('COMMIT_WORK_ITEM_ID_MISMATCH'));
  const buried = validateCommitIdentity({ workItemId: 'WI-SOT-30-05', message: 'Implement identity for WI-SOT-30-05' });
  assert.ok(buried.errors.includes('COMMIT_WORK_ITEM_ID_MISMATCH'));
});

test('rejects malformed work item IDs', () => {
  const result = validateCommitIdentity({ workItemId: 'WI-30-05', message: 'WI-30-05 invalid' });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.errors.includes('VALID_WORK_ITEM_ID_REQUIRED'));
});
