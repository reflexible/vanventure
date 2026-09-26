import { readFile } from 'node:fs/promises';
import { dirname, isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { captureGitStatus } from './git-status-snapshot.mjs';

const defaultRepository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;

function normalizePath(path) {
  if (!text(path) || isAbsolute(path) || path.includes('\\') || path === '..' || path.startsWith('../') || path.includes('/../')) return null;
  return path.replace(/^\.\//, '').replace(/\/$/, '');
}
function overlaps(left, right) {
  return left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`);
}
function sameEntry(left, right) {
  return left?.path === right?.path
    && left?.original_path === right?.original_path
    && left?.index_status === right?.index_status
    && left?.worktree_status === right?.worktree_status
    && left?.state === right?.state;
}

/**
 * Fail closed when a planned write could touch a pre-existing change or when
 * that protected change drifts. This function is read-only and never stages,
 * restores, deletes, or edits a working-tree path.
 */
export function guardForeignChanges({ baseline, current, writeScope }) {
  const errors = [];
  if (baseline?.mode !== 'READ_ONLY_PRE_SLICE_SNAPSHOT' || !Array.isArray(baseline.entries)) errors.push('VALID_BASELINE_REQUIRED');
  if (current?.mode !== 'READ_ONLY_PRE_SLICE_SNAPSHOT' || !Array.isArray(current.entries)) errors.push('VALID_CURRENT_SNAPSHOT_REQUIRED');
  if (!Array.isArray(writeScope) || !writeScope.length) errors.push('EXPLICIT_WRITE_SCOPE_REQUIRED');
  const scopes = (writeScope ?? []).map(normalizePath);
  if (scopes.some(scope => !scope)) errors.push('INVALID_WRITE_SCOPE');
  if (errors.length) return { status: 'BLOCKED', protected_entries: 0, errors };

  const currentByPath = new Map(current.entries.map(entry => [entry.path, entry]));
  for (const entry of baseline.entries) {
    const path = normalizePath(entry.path);
    if (!path) { errors.push(`INVALID_BASELINE_PATH:${entry.path}`); continue; }
    if (scopes.some(scope => overlaps(scope, path))) errors.push(`PROTECTED_PATH_OVERLAP:${path}`);
    if (!sameEntry(entry, currentByPath.get(entry.path))) errors.push(`PROTECTED_CHANGE_DRIFT:${path}`);
  }
  return { status: errors.length ? 'BLOCKED' : 'PASS', protected_entries: baseline.entries.length, errors };
}

function argument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] ?? null;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const baselineFile = argument('--baseline');
    const scope = argument('--scope')?.split(',').filter(Boolean) ?? [];
    if (!baselineFile) throw new Error('--baseline <snapshot.json> is required.');
    const baseline = JSON.parse(await readFile(resolve(defaultRepository, baselineFile), 'utf8'));
    const result = guardForeignChanges({ baseline, current: captureGitStatus(), writeScope: scope });
    process.stdout.write(`Git foreign-change guard: ${result.status}; ${result.protected_entries} protected entries.\n`);
    if (result.status !== 'PASS') {
      process.stderr.write(`${result.errors.join('; ')}\n`);
      process.exitCode = 1;
    }
  } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}
