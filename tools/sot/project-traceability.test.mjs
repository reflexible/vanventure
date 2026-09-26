import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { inspectProjectTraceability, parseTraceCsv } from './project-traceability.mjs';

const prefix = 'docs/sot-optimization/';
const hash = value => createHash('sha256').update(value).digest('hex');
const sourcePath = `${prefix}sources/wsjf-multi-agent-input-2026-09-26.md`;
async function fixture(t) {
  const root = await mkdtemp(resolve(tmpdir(), 'trace-profile-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = '# 1. Formula\n\nCost of Delay divided by Job Size.\n';
  const sources = {
    [`${prefix}sources/full-implementation-input-2026-09-26.txt`]: await readFile(new URL('../../docs/sot-optimization/sources/full-implementation-input-2026-09-26.txt', import.meta.url)),
    [sourcePath]: source,
    [`${prefix}sources/sot-process-input-2026-09-26.md`]: '# Source\n',
    [`${prefix}requirements-section-index.csv`]: 'source,section_id,title,source_path,normalized_sha256\nWSJF,WSJF-01,Formula,' + sourcePath + ',' + hash(source) + '\n',
    [`${prefix}sot-preservation-matrix.csv`]: 'source_section,clause_id,source_lines,requirement,target_story\n',
    [`${prefix}wsjf-preservation-matrix.csv`]: 'source_section,clause_id,source_anchor,requirement,target_story\nWSJF-01,WSJF-01.01,' + sourcePath + '#L1-L3,Preserve formula,ST-SOT-19\n',
    'docs/governance/source-of-truth-and-incremental-planning.md': '#### ST-SOT-19 - Scoring\n- [ ] TODO - WI-SOT-19-07 Scale\n#### ST-SOT-07 - FAST\n- [ ] TODO - WI-SOT-07-10 Profile\n',
  };
  for (const [path, value] of Object.entries(sources)) {
    await mkdir(resolve(root, path, '..'), { recursive: true }); await writeFile(resolve(root, path), value);
  }
  return { root, check: workItemIds => inspectProjectTraceability({ projectRoot: root, workItemIds: workItemIds ?? ['WI-SOT-19-07'] }) };
}

test('exact story ancestry produces FAST records without asserting individual clause satisfaction', async t => {
  const { check } = await fixture(t);
  const result = await check();
  assert.equal(result.status, 'PROJECT_TRACEABILITY_PASS', result.errors.join('; '));
  assert.equal(result.traceability_records.find(record => record.clause_id).source_anchor, '# 1. Formula');
  assert.equal(result.traceability_records[0].mapping_granularity, 'STORY');
  assert.equal(result.coverage[0].atomic_work_item_mapping, 'UNKNOWN');
  assert.equal(result.semantic_coverage, 'UNKNOWN');
  assert.equal(Object.keys(result.sourcehashes).length, 7);
});

test('missing actual IDs and unmapped stories block instead of fabricating ancestry', async t => {
  const { check } = await fixture(t);
  assert.match((await check(['WI-SOT-19-99'])).errors.join(';'), /MISSING_OR_WRONG/);
  const phase = await check(['WI-SOT-07-10']);
  assert.equal(phase.status, 'PROJECT_TRACEABILITY_PASS');
  assert.equal(phase.traceability_records[0].ancestry_kind, 'ORIGINAL_IMPLEMENTATION_PHASE');
  assert.equal(phase.traceability_records[0].story_id, 'ST-SOT-07');
  assert.equal((await check(['WI-SOT-19-07', 'WI-SOT-19-07'])).status, 'PROJECT_TRACEABILITY_BLOCKED');
});

test('source corruption and out-of-section anchors block', async t => {
  const { root, check } = await fixture(t);
  const original = await readFile(resolve(root, sourcePath), 'utf8');
  await writeFile(resolve(root, sourcePath), original.replace('divided', 'multiplied'));
  assert.match((await check()).errors.join(';'), /HASH_MISMATCH/);
  await writeFile(resolve(root, sourcePath), original);
  const matrixPath = resolve(root, prefix + 'wsjf-preservation-matrix.csv');
  const matrix = await readFile(matrixPath, 'utf8');
  await writeFile(matrixPath, matrix.replace('#L1-L3', '#L99-L100'));
  assert.match((await check()).errors.join(';'), /INVALID_SOURCE_LINE_ANCHOR/);
});

test('duplicate clause IDs, ambiguous source headings and malformed CSV fail closed', async t => {
  const { root, check } = await fixture(t);
  const path = resolve(root, prefix + 'wsjf-preservation-matrix.csv');
  const matrix = await readFile(path, 'utf8');
  await writeFile(path, matrix + matrix.split('\n')[1] + '\n');
  assert.match((await check()).errors.join(';'), /DUPLICATE_clause_id/);
  await writeFile(path, matrix);
  await writeFile(resolve(root, sourcePath), '# 1. Formula\nDuplicate\n# 1. Formula\nOther\n');
  assert.match((await check()).errors.join(';'), /AMBIGUOUS_HEADING/);
  assert.throws(() => parseTraceCsv('a,b\n"unterminated'), /UNTERMINATED/);
  assert.throws(() => parseTraceCsv('a,b\n1,2,3'), /WIDTH/);
  assert.deepEqual(parseTraceCsv('a,b\n"x,y","line\nnext"\n'), [{ a: 'x,y', b: 'line\nnext' }]);
});

test('a work item in the wrong story and invalid UTF8 cannot pass', async t => {
  const { root, check } = await fixture(t);
  const path = resolve(root, 'docs/governance/source-of-truth-and-incremental-planning.md');
  const backlog = await readFile(path, 'utf8');
  await writeFile(path, backlog.replace('#### ST-SOT-19', '#### ST-SOT-20'));
  assert.match((await check()).errors.join(';'), /WRONG_WORK_ITEM_PARENT/);
  await writeFile(path, backlog);
  await writeFile(resolve(root, sourcePath), Buffer.from([0xff]));
  assert.equal((await check()).status, 'PROJECT_TRACEABILITY_BLOCKED');
});

test('the externally pinned full mandate cannot be silently replaced', async t => {
  const { root, check } = await fixture(t);
  const path = resolve(root, prefix + 'sources/full-implementation-input-2026-09-26.txt');
  await writeFile(path, 'PHASE 19 - Invented requirement\n');
  assert.match((await check()).errors.join(';'), /ORIGINAL_IMPLEMENTATION_MANDATE_CHANGED/);
});

test('explicit unnumbered index headings and endpoints validate intro and goal without invented anchors', async t => {
  const { root, check } = await fixture(t);
  const sotPath = prefix + 'sources/sot-process-input-2026-09-26.md';
  const intro = '# Original\nIntro rule.\n';
  const goal = '## Goal\nGoal rule.\n';
  await writeFile(resolve(root, sotPath), intro + '## 1. Numbered\nOther rule.\n' + goal);
  const wsjfHash = hash(await readFile(resolve(root, sourcePath)));
  await writeFile(resolve(root, prefix + 'requirements-section-index.csv'),
    'source,section_id,title,source_path,normalized_sha256,heading,end_before_heading\n'
    + `WSJF,WSJF-01,Formula,${sourcePath},${wsjfHash},,\n`
    + `SOT,SOT-00,Original,${sotPath},${hash(intro)},# Original,## 1. Numbered\n`
    + `SOT,SOT-GOAL,Goal,${sotPath},${hash(goal)},## Goal,\n`);
  await writeFile(resolve(root, prefix + 'sot-preservation-matrix.csv'),
    'source_section,clause_id,source_lines,requirement,target_story\n'
    + 'SOT-00,SOT-00.a,2,Intro rule,ST-SOT-19\nSOT-GOAL,SOT-GOAL.a,6,Goal rule,ST-SOT-19\n');
  const result = await check();
  assert.equal(result.status, 'PROJECT_TRACEABILITY_PASS', result.errors.join(';'));
  assert.ok(result.traceability_records.some(r => r.source_anchor === '# Original'));
  assert.ok(result.traceability_records.some(r => r.source_anchor === '## Goal'));
});

test('disjoint line ranges preserve only named segments and reject overlap or malformed ranges', async t => {
  const { root, check } = await fixture(t);
  const sotPath = prefix + 'sources/sot-process-input-2026-09-26.md';
  const source = '## 1. Rule\nFirst part.\nExcluded intervening text.\nSecond part.\nThird part.\n';
  await writeFile(resolve(root, sotPath), source);
  const indexPath = resolve(root, prefix + 'requirements-section-index.csv');
  await writeFile(indexPath, await readFile(indexPath, 'utf8') + `SOT,SOT-01,Rule,${sotPath},${hash(source)}\n`);
  const matrixPath = resolve(root, prefix + 'sot-preservation-matrix.csv');
  const row = range => 'source_section,clause_id,source_lines,requirement,target_story\n'
    + `SOT-01,SOT-01.a,"${range}",Disjoint original requirement,ST-SOT-19\n`;
  await writeFile(matrixPath, row('2,4-5'));
  const result = await check();
  assert.equal(result.status, 'PROJECT_TRACEABILITY_PASS', result.errors.join(';'));
  const record = result.traceability_records.find(r => r.clause_id === 'SOT-01.a');
  assert.deepEqual(record.source_line_ranges, [[2, 2], [4, 5]]);
  assert.equal(record.clause_source_text_sha256, hash(JSON.stringify(['First part.', 'Second part.\nThird part.'])));
  for (const invalid of ['2,2-5', '4-5,2', '2,NaN-5', '2,4-99']) {
    await writeFile(matrixPath, row(invalid));
    assert.match((await check()).errors.join(';'), /INVALID_SOURCE_LINE_ANCHOR/);
  }
});
