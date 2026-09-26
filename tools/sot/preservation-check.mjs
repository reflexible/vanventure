import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseTraceCsv } from './project-traceability.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const matrixPath = 'docs/sot-optimization/sot-preservation-matrix.csv';
const sha256 = value => createHash('sha256').update(value).digest('hex');

// Each entry names an executable behavioural boundary.  It deliberately does
// not claim semantic or live acceptance; the original requirement remains the
// authority and semantic review stays a separate gate.
const evidenceByStory = {
  'ST-SOT-12': { implementation: ['tools/sot/intake.mjs'], tests: ['tools/sot/intake.test.mjs', 'tools/sot/intake-store.test.mjs'] },
  'ST-SOT-13': { implementation: ['tools/sot/sot-impact.mjs', 'tools/sot/impact.mjs'], tests: ['tools/sot/sot-impact.test.mjs', 'tools/sot/impact.test.mjs', 'tools/sot/scoped-coverage.test.mjs'] },
  'ST-SOT-14': { implementation: ['tools/sot/conflict-check.mjs'], tests: ['tools/sot/conflict-check.test.mjs'] },
  'ST-SOT-15': { implementation: ['tools/sot/approval-flow.mjs'], tests: ['tools/sot/approval-flow.test.mjs', 'tools/sot/governance-workflow.test.mjs'] },
  'ST-SOT-16': { implementation: ['tools/sot/sot-update-plan.mjs'], tests: ['tools/sot/sot-update-plan.test.mjs', 'tools/sot/decision-state.test.mjs'] },
  'ST-SOT-17': { implementation: ['tools/sot/post-validation.mjs', 'tools/sot/incremental-audit.mjs'], tests: ['tools/sot/post-validation.test.mjs', 'tools/sot/incremental-audit.test.mjs', 'tools/sot/full-check.test.mjs'] },
  'ST-SOT-18': { implementation: ['tools/sot/done-guard.mjs'], tests: ['tools/sot/done-guard.test.mjs', 'tools/sot/governance-workflow.test.mjs'] },
  'ST-SOT-31': { implementation: ['tools/sot/project-audit.mjs', 'tools/sot/full-check.mjs'], tests: ['tools/sot/project-audit.test.mjs', 'tools/sot/full-check.test.mjs'] },
};

function stories(target) {
  const range = /^ST-SOT-(\d\d)\.\.(?:ST-SOT-)?(\d\d)$/.exec(target);
  if (range) return Array.from({ length: +range[2] - +range[1] + 1 }, (_, index) => `ST-SOT-${String(+range[1] + index).padStart(2, '0')}`);
  return /^ST-SOT-\d\d$/.test(target) ? [target] : [];
}

export function mapPreservationRows(rows) {
  const errors = [];
  if (!Array.isArray(rows) || rows.length !== 45) errors.push(`EXPECTED_45_SOT_CLAUSES_GOT_${rows?.length ?? 'INVALID'}`);
  const ids = new Set();
  const records = rows.map(row => {
    if (row.source_section?.startsWith('SOT-') !== true || !/^SOT-(?:\d\d|GOAL)\.[a-z]$/.test(row.clause_id ?? '')) {
      errors.push(`INVALID_SOT_CLAUSE:${row.clause_id ?? 'MISSING'}`);
    }
    if (ids.has(row.clause_id)) errors.push(`DUPLICATE_SOT_CLAUSE:${row.clause_id}`);
    ids.add(row.clause_id);
    const targets = stories(row.target_story);
    if (!targets.length || targets.some(target => !evidenceByStory[target])) errors.push(`UNMAPPED_IMPLEMENTATION_TARGET:${row.clause_id}`);
    const evidence = targets.flatMap(target => [evidenceByStory[target]]).filter(Boolean);
    return { clause_id: row.clause_id, source_section: row.source_section, source_lines: row.source_lines,
      requirement: row.requirement, target_story: row.target_story,
      implementation: [...new Set(evidence.flatMap(item => item.implementation))].sort(),
      tests: [...new Set(evidence.flatMap(item => item.tests))].sort(),
      implementation_status: errors.some(error => error.endsWith(`:${row.clause_id}`)) ? 'BLOCKED' : 'TECHNICALLY_PRESERVED',
      semantic_verification: 'PENDING_SEPARATE_REVIEW' };
  });
  return { valid: errors.length === 0, errors, records };
}

export async function verifySotPreservation({ projectRoot = root, execute = false } = {}) {
  const matrix = await readFile(resolve(projectRoot, matrixPath));
  const mapped = mapPreservationRows(parseTraceCsv(matrix.toString('utf8')));
  const paths = [...new Set(mapped.records.flatMap(record => [...record.implementation, ...record.tests]))].sort();
  const missing = [];
  const hashes = { [matrixPath]: sha256(matrix) };
  for (const path of paths) {
    try { hashes[path] = sha256(await readFile(resolve(projectRoot, path))); }
    catch { missing.push(path); }
  }
  let test = { status: 'NOT_EXECUTED', command: null, exit_code: null };
  if (execute && mapped.valid && !missing.length) {
    const testPaths = [...new Set(mapped.records.flatMap(record => record.tests))].sort();
    const result = spawnSync(process.execPath, ['--test', ...testPaths], {
      cwd: projectRoot, encoding: 'utf8', shell: false, windowsHide: true, timeout: 120000,
    });
    test = { status: result.status === 0 && !result.error ? 'PASS' : 'BLOCKED',
      command: `node --test ${testPaths.join(' ')}`, exit_code: result.status,
      ...(result.error ? { error: result.error.message } : {}),
      ...(result.status === 0 ? {} : { output: `${result.stdout ?? ''}${result.stderr ?? ''}`.slice(-4000) }) };
  }
  const status = mapped.valid && !missing.length && (!execute || test.status === 'PASS')
    ? 'SOT_PRESERVATION_PASS' : 'SOT_PRESERVATION_BLOCKED';
  return { schema_version: '1.0.0', status, clause_count: mapped.records.length,
    matrix: matrixPath, source_sha256: hashes, missing_paths: missing, test, clauses: mapped.records,
    semantic_coverage: 'PENDING_SEPARATE_REVIEW', product_release: false, live_verified: false, errors: mapped.errors };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = process.argv[2] ?? 'docs/sot-optimization/audits/sot-preservation-2026-09-26.json';
  const result = await verifySotPreservation({ execute: true });
  await writeFile(resolve(root, output), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ status: result.status, clause_count: result.clause_count, test: result.test.status, output }, null, 2));
  if (result.status !== 'SOT_PRESERVATION_PASS') process.exitCode = 1;
}
