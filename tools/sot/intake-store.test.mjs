import assert from 'node:assert/strict';
import test from 'node:test';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { loadRegistry } from './module-registry.mjs';
import { readIntakeStore, recordIntake } from './intake-store.mjs';

const base = {
  kind: 'idea', classification: 'IDEA', title: 'Mobile Navigation',
  content: 'Links klarer gruppieren.', authority: 'website.design',
  provenance: { source_type: 'chat', reference: 'thread-17 / message-4',
    captured_at: '2026-09-26T12:00:00+02:00' },
};

async function fixture(run) {
  const projectRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'vv-intake-'));
  try {
    await fs.mkdir(path.join(projectRoot, 'docs/governance'), { recursive: true });
    await fs.writeFile(path.join(projectRoot, 'docs/governance/source-of-truth-and-incremental-planning.md'),
      '- [ ] WI-SOT-12-01 · Intake\n');
    return await run({ projectRoot, registry: await loadRegistry() });
  } finally {
    await fs.rm(projectRoot, { recursive: true, force: true });
  }
}

test('persists a non-binding proposal with provenance, registered authority, and central WI', () => fixture(async options => {
  const result = await recordIntake(base, { ...options, workItemId: 'WI-SOT-12-01' });
  assert.equal(result.valid, true);
  assert.equal(result.recorded, true);
  assert.equal(result.record.proposal.status, 'IDEA');
  assert.equal(result.record.proposal.approval, null);
  assert.equal(result.record.proposal.owner.source, 'docs/design-guide.md');
  assert.deepEqual(result.record.proposal.provenance, base.provenance);
  assert.equal(result.record.work_item.id, 'WI-SOT-12-01');
  const saved = await readIntakeStore(options);
  assert.deepEqual(saved, [result.record]);
}));

test('same intake is idempotent and existing record is never silently changed', () => fixture(async options => {
  const first = await recordIntake(base, options);
  const second = await recordIntake(base, { ...options, workItemId: 'WI-SOT-12-01' });
  assert.equal(second.duplicate, true);
  assert.equal(second.recorded, false);
  assert.deepEqual(second.record, first.record);
  assert.equal((await readIntakeStore(options)).length, 1);
}));

test('invalid approval, nonexistent WI, and escaped path cannot write', () => fixture(async options => {
  const invalid = await recordIntake({ ...base, approval: 'yes' }, options);
  assert.equal(invalid.valid, false);
  await assert.rejects(recordIntake(base, { ...options, workItemId: 'WI-SOT-99-99' }), /Unknown central work item/);
  await assert.rejects(recordIntake(base, { ...options, storePath: '../outside.jsonl' }), /escapes/);
  await assert.rejects(recordIntake(base, { ...options, storePath: 'docs/governance/another-plan.jsonl' }), /may only use/);
  assert.deepEqual(await readIntakeStore(options), []);
}));

test('concurrent processes serialize writes with complete sequence and hash chain', () => fixture(async options => {
  const script = `import { recordIntake } from ${JSON.stringify(new URL('./intake-store.mjs', import.meta.url).href)};\n` +
    `const result = await recordIntake(JSON.parse(process.env.INTAKE), {projectRoot:process.env.ROOT});\n` +
    `if (!result.recorded) process.exitCode=1;`;
  const launch = index => new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--input-type=module', '-e', script], {
      env: { ...process.env, ROOT: options.projectRoot,
        INTAKE: JSON.stringify({ ...base, title: `Idea ${index}` }) }, stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', data => { stderr += data; });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(stderr || `child exit ${code}`)));
  });
  await Promise.all(Array.from({ length: 6 }, (_, index) => launch(index)));
  const records = await readIntakeStore(options);
  assert.equal(records.length, 6);
  assert.deepEqual(records.map(record => record.sequence), [1, 2, 3, 4, 5, 6]);
  assert.equal(new Set(records.map(record => record.proposal.id)).size, 6);
}));

test('tampered previous record blocks further writes', () => fixture(async options => {
  await recordIntake(base, options);
  const file = path.join(options.projectRoot, 'docs/governance/intake-proposals.jsonl');
  const body = await fs.readFile(file, 'utf8');
  await fs.writeFile(file, body.replace('Mobile Navigation', 'Changed Navigation'));
  await assert.rejects(recordIntake({ ...base, title: 'New' }, options), /integrity check failed/);
}));
