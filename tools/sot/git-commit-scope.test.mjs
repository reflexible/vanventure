import assert from 'node:assert/strict';
import test from 'node:test';
import { validateStagedScope } from './git-commit-scope.mjs';

test('accepts every staged path covered by an exact file or directory scope', () => {
  const result = validateStagedScope({ writeScope: ['tools/sot', 'docs/plan-register.json'],
    stagedPaths: ['tools/sot/git-commit-scope.mjs', 'docs/plan-register.json'] });
  assert.deepEqual(result, { status: 'PASS', write_scope: ['tools/sot', 'docs/plan-register.json'],
    staged_paths: ['tools/sot/git-commit-scope.mjs', 'docs/plan-register.json'], errors: [] });
});

test('blocks a staged path outside the declared scope', () => {
  const result = validateStagedScope({ writeScope: ['tools/sot'],
    stagedPaths: ['tools/sot/git-commit-scope.mjs', 'docs/plan-register.json'] });
  assert.equal(result.status, 'BLOCKED');
  assert.deepEqual(result.errors, ['STAGED_PATH_OUTSIDE_SCOPE:docs/plan-register.json']);
});

test('blocks missing or malformed scopes and staging paths', () => {
  const result = validateStagedScope({ writeScope: ['../escape'], stagedPaths: [] });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.errors.includes('INVALID_WRITE_SCOPE'));
  assert.ok(result.errors.includes('STAGED_PATHS_REQUIRED'));
});
