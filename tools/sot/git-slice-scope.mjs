import { guardForeignChanges } from './git-change-guard.mjs';

const workItemPattern = /^WI-SOT-\d{2}-\d{2}$/;
const validPath = value => typeof value === 'string' && value.trim() === value && value.length > 0
  && !value.includes('\\') && !value.startsWith('/') && !value.startsWith('../') && !value.includes('/../');

/**
 * Declare one local Git slice before work starts. This is a read-only
 * declaration and validation; it does not claim a worker or alter Git state.
 */
export function prepareGitSlice({ workItemId, baseline, current, writeScope }) {
  const errors = [];
  if (!workItemPattern.test(workItemId ?? '')) errors.push('VALID_WORK_ITEM_ID_REQUIRED');
  if (!Array.isArray(writeScope) || !writeScope.length) errors.push('EXPLICIT_WRITE_SCOPE_REQUIRED');
  if ((writeScope ?? []).some(path => !validPath(path))) errors.push('INVALID_WRITE_SCOPE');
  if (new Set(writeScope ?? []).size !== (writeScope ?? []).length) errors.push('DUPLICATE_WRITE_SCOPE');
  const guard = guardForeignChanges({ baseline, current, writeScope });
  errors.push(...guard.errors);
  return {
    status: errors.length ? 'BLOCKED' : 'READY',
    work_item_id: workItemId ?? null,
    write_scope: [...(writeScope ?? [])],
    protected_entries: guard.protected_entries,
    errors: [...new Set(errors)],
  };
}
