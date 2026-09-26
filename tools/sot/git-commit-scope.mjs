import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { captureGitCommit } from './git-commit-snapshot.mjs';

const validPath = value => typeof value === 'string' && value.trim() === value && value.length > 0
  && !value.includes('\\') && !value.startsWith('/') && !value.startsWith('../') && !value.includes('/../');
const contains = (scope, path) => path === scope || path.startsWith(`${scope}/`);

/**
 * Block a pending commit when a staged path is not covered by its declared
 * Work-Item write scope. This validation is read-only.
 */
export function validateStagedScope({ writeScope, stagedPaths }) {
  const errors = [];
  if (!Array.isArray(writeScope) || !writeScope.length) errors.push('EXPLICIT_WRITE_SCOPE_REQUIRED');
  if ((writeScope ?? []).some(path => !validPath(path))) errors.push('INVALID_WRITE_SCOPE');
  if (!Array.isArray(stagedPaths) || !stagedPaths.length) errors.push('STAGED_PATHS_REQUIRED');
  if ((stagedPaths ?? []).some(path => !validPath(path))) errors.push('INVALID_STAGED_PATH');
  if (!errors.length) {
    for (const path of stagedPaths) {
      if (!writeScope.some(scope => contains(scope, path))) errors.push(`STAGED_PATH_OUTSIDE_SCOPE:${path}`);
    }
  }
  return {
    status: errors.length ? 'BLOCKED' : 'PASS',
    write_scope: [...(writeScope ?? [])],
    staged_paths: [...(stagedPaths ?? [])],
    errors: [...new Set(errors)],
  };
}

function scopeArguments() {
  const scopes = [];
  for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === '--scope' && process.argv[index + 1]) scopes.push(process.argv[index + 1]);
  }
  return scopes;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const snapshot = captureGitCommit();
    const result = validateStagedScope({ writeScope: scopeArguments(), stagedPaths: snapshot.staged_paths });
    process.stdout.write(`Git commit scope: ${result.status}; ${result.staged_paths.length} staged paths.\n`);
    if (result.status !== 'PASS') { process.stderr.write(`${result.errors.join('; ')}\n`); process.exitCode = 1; }
  } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}
