import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRepository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

function git(repository, args, { allowFailure = false } = {}) {
  try { return { ok: true, output: execFileSync('git', args, { cwd: repository, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) }; }
  catch (error) {
    if (allowFailure) return { ok: false, output: error.stdout?.toString() ?? '', error: error.stderr?.toString().trim() || error.message };
    throw new Error(`Git commit snapshot failed: ${error.stderr?.toString().trim() || error.message}`);
  }
}

/** Read staged paths and diff shape without creating, staging, or changing a commit. */
export function captureGitCommit(repository = defaultRepository) {
  const repositoryRoot = git(repository, ['rev-parse', '--show-toplevel']).output.trim();
  const head = git(repository, ['rev-parse', 'HEAD']).output.trim();
  const paths = git(repository, ['diff', '--cached', '--name-only', '-z']).output.split('\0').filter(Boolean);
  const shortstat = git(repository, ['diff', '--cached', '--shortstat']).output.trim() || '0 files changed';
  const whitespace = git(repository, ['diff', '--cached', '--check'], { allowFailure: true });
  return {
    schema_version: '1.0.0',
    mode: 'READ_ONLY_PRE_COMMIT_SNAPSHOT',
    repository: repositoryRoot,
    head,
    status: !paths.length ? 'EMPTY' : whitespace.ok ? 'READY' : 'BLOCKED',
    staged_paths: paths,
    shortstat,
    whitespace_errors: whitespace.ok ? [] : whitespace.error.split(/\r?\n/).filter(Boolean),
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const snapshot = captureGitCommit();
    if (process.argv.includes('--json')) process.stdout.write(`${JSON.stringify(snapshot, null, 2)}\n`);
    else process.stdout.write(`Git pre-commit snapshot: ${snapshot.status}; ${snapshot.staged_paths.length} staged paths; ${snapshot.shortstat}. Use --json for paths.\n`);
    if (snapshot.status === 'BLOCKED') process.exitCode = 1;
  } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}
