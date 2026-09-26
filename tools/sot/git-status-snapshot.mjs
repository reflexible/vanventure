import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRepository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

function git(repository, args) {
  try {
    return execFileSync('git', args, { cwd: repository, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (error) {
    const detail = error.stderr?.toString().trim() || error.message;
    throw new Error(`Git status snapshot failed: ${detail}`);
  }
}

/** Parse porcelain v1 NUL records without inspecting or changing repository files. */
export function parsePorcelainStatus(output) {
  const records = output.split('\0');
  const entries = [];
  for (let index = 0; index < records.length - 1; index += 1) {
    const record = records[index];
    if (!record) continue;
    const code = record.slice(0, 2);
    const path = record.slice(3);
    const entry = {
      path,
      index_status: code[0],
      worktree_status: code[1],
      state: code === '??' ? 'untracked' : code === '!!' ? 'ignored' : 'tracked_change',
    };
    if (code[0] === 'R' || code[0] === 'C' || code[1] === 'R' || code[1] === 'C') {
      entry.original_path = records[++index] ?? '';
    }
    entries.push(entry);
  }
  return entries;
}

/** Return a stable, read-only pre-slice snapshot of Git's working tree view. */
export function captureGitStatus(repository = defaultRepository) {
  const root = git(repository, ['rev-parse', '--show-toplevel']).trim();
  const branch = git(repository, ['branch', '--show-current']).trim() || 'DETACHED';
  const head = git(repository, ['rev-parse', 'HEAD']).trim();
  const entries = parsePorcelainStatus(git(repository, ['status', '--porcelain=v1', '-z', '--untracked-files=all']));
  const counts = {
    total: entries.length,
    staged: entries.filter(entry => ![' ', '?', '!'].includes(entry.index_status)).length,
    unstaged: entries.filter(entry => ![' ', '?', '!'].includes(entry.worktree_status)).length,
    untracked: entries.filter(entry => entry.state === 'untracked').length,
  };
  return { schema_version: '1.0.0', mode: 'READ_ONLY_PRE_SLICE_SNAPSHOT', repository: root, branch, head, counts, entries };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const snapshot = captureGitStatus();
    if (process.argv.includes('--json')) process.stdout.write(`${JSON.stringify(snapshot, null, 2)}\n`);
    else process.stdout.write(`Git pre-slice snapshot: ${snapshot.branch} at ${snapshot.head.slice(0, 12)}; ${snapshot.counts.total} entries (${snapshot.counts.staged} staged, ${snapshot.counts.unstaged} unstaged, ${snapshot.counts.untracked} untracked). Use --json for paths.\n`);
  }
  catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}
