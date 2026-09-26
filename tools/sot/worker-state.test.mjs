import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createWorkerStateStore, runtimeWorkers, activeProcesses } from './worker-state.mjs';

const exec = promisify(execFile);
const moduleUrl = new URL('./worker-state.mjs', import.meta.url).href;
async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'sot-workers-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const planPath = join(dir, 'plan.md');
  await writeFile(planPath, '- [ ] READY – WI-SOT-20-01 · Claim\n- [ ] READY – WI-SOT-20-02 · Owner\n- [ ] TODO – WI-SOT-20-03 · Lock\n');
  const path = join(dir, 'state.json');
  return { store: createWorkerStateStore({ path, planPath }), path, planPath };
}
const claim = (item, worker, scope, coordination_ref) => ({ work_item_id: item, worker_id: worker, write_scope: [scope], coordination_ref });

test('same work item has only one cross-process claim and a durable event', async t => {
  const { path, planPath, store } = await fixture(t);
  const code = `import { createWorkerStateStore } from ${JSON.stringify(moduleUrl)};\n`
    + `const s=createWorkerStateStore({path:process.argv[1],planPath:process.argv[2]});\n`
    + `try { await s.claim({work_item_id:'WI-SOT-20-01',worker_id:process.argv[3],write_scope:['src/a']}); process.stdout.write('CLAIMED'); }\n`
    + `catch (e) { process.stdout.write('REJECTED'); }`;
  const results = await Promise.all(['A', 'B'].map(worker => exec(process.execPath, ['--input-type=module', '-e', code, path, planPath, worker])));
  assert.deepEqual(results.map(r => r.stdout).sort(), ['CLAIMED', 'REJECTED']);
  const state = await store.snapshot();
  assert.equal(state.revision, 1);
  assert.equal(state.history.length, 1);
  assert.equal(state.records['WI-SOT-20-01'].execution_state, 'Claimed');
  assert.deepEqual(JSON.parse(await readFile(path, 'utf8')), state);
});

test('two processes cannot assign two active implementations to one worker', async t => {
  const { path, planPath, store } = await fixture(t);
  const code = `import { createWorkerStateStore } from ${JSON.stringify(moduleUrl)};\n`
    + `const s=createWorkerStateStore({path:process.argv[1],planPath:process.argv[2]});\n`
    + `try { await s.claim({work_item_id:process.argv[3],worker_id:'A',write_scope:[process.argv[3]]}); process.stdout.write('CLAIMED'); }\n`
    + `catch (e) { process.stdout.write('REJECTED'); }`;
  const results = await Promise.all(['WI-SOT-20-01', 'WI-SOT-20-02'].map(item =>
    exec(process.execPath, ['--input-type=module', '-e', code, path, planPath, item])));
  assert.deepEqual(results.map(r => r.stdout).sort(), ['CLAIMED', 'REJECTED']);
  assert.equal(Object.keys((await store.snapshot()).records).length, 1);
});

test('known IDs, one active implementation per worker and safe scope coordination', async t => {
  const { store } = await fixture(t);
  await assert.rejects(store.claim(claim('WI-SOT-99-99', 'A', 'src/a')), /Unknown Work Item/);
  await assert.rejects(store.claim(claim('WI-SOT-20-03', 'A', 'src/a')), /only READY work/);
  await store.claim(claim('WI-SOT-20-01', 'A', 'src/a'));
  await assert.rejects(store.claim(claim('WI-SOT-20-02', 'A', 'src/b')), /active implementation/);
  await assert.rejects(store.claim(claim('WI-SOT-20-02', 'B', 'src/a/child')), /Write scope conflicts/);
  await store.claim(claim('WI-SOT-20-02', 'B', 'src/b'));
  assert.deepEqual(runtimeWorkers(await store.snapshot()), { workers: [
    { id: 'A', claims: ['WI-SOT-20-01'] }, { id: 'B', claims: ['WI-SOT-20-02'] },
  ] });
  assert.equal(activeProcesses(await store.snapshot()).length, 2);
});

test('explicit coordination permits overlapping critical scopes', async t => {
  const { store } = await fixture(t);
  await store.claim(claim('WI-SOT-20-01', 'A', 'authentication', 'ADR-12'));
  await assert.rejects(store.claim(claim('WI-SOT-20-02', 'B', 'authentication', 'ADR-13')), /coordination_ref/);
  await store.claim(claim('WI-SOT-20-02', 'B', 'authentication', 'ADR-12'));
});

test('handover, review and integration are required before Done', async t => {
  const { store } = await fixture(t);
  await store.claim(claim('WI-SOT-20-01', 'A', 'src/a'));
  await assert.rejects(store.integrate({ work_item_id: 'WI-SOT-20-01', integrator_id: 'A', evidence_ref: 'test', tests_passed: true }), /accepted review/);
  await store.start({ work_item_id: 'WI-SOT-20-01', worker_id: 'A' });
  await store.handover({ work_item_id: 'WI-SOT-20-01', worker_id: 'A', summary: 'Implemented', files: ['src/a'], tests: ['node --test'], limitations: [], follow_up: [], decision_refs: [] });
  await assert.rejects(store.review({ work_item_id: 'WI-SOT-20-01', reviewer_id: 'A', accepted: true, evidence_ref: 'review' }), /Self-review/);
  await store.review({ work_item_id: 'WI-SOT-20-01', reviewer_id: 'B', accepted: true, evidence_ref: 'review' });
  await assert.rejects(store.integrate({ work_item_id: 'WI-SOT-20-01', integrator_id: 'C', evidence_ref: 'merge', tests_passed: false }), /passing checks/);
  await store.integrate({ work_item_id: 'WI-SOT-20-01', integrator_id: 'C', evidence_ref: 'merge', tests_passed: true });
  assert.equal((await store.snapshot()).records['WI-SOT-20-01'].execution_state, 'Done');
  await assert.rejects(store.claim(claim('WI-SOT-20-01', 'D', 'src/a')), /completed/);
});

test('reassignment is explicit, owner release is checked and Blocked is visible', async t => {
  const { store } = await fixture(t);
  await store.claim(claim('WI-SOT-20-01', 'A', 'src/a'));
  await assert.rejects(store.release({ work_item_id: 'WI-SOT-20-01', actor_id: 'B', reason: 'stop' }), /Only the owner/);
  await store.reassign({ work_item_id: 'WI-SOT-20-01', controller_id: 'Controller', to_worker_id: 'B', reason: 'A unavailable' });
  await store.start({ work_item_id: 'WI-SOT-20-01', worker_id: 'B' });
  await store.block({ work_item_id: 'WI-SOT-20-01', worker_id: 'B', blocked_by: 'User Decision', question: 'Which scope?' });
  assert.equal((await store.snapshot()).records['WI-SOT-20-01'].execution_state, 'Blocked');
  await store.unblock({ work_item_id: 'WI-SOT-20-01', actor_id: 'Controller', resolution_ref: 'DEC-1' });
  assert.equal((await store.snapshot()).records['WI-SOT-20-01'].execution_state, 'In Progress');
  await store.release({ work_item_id: 'WI-SOT-20-01', actor_id: 'B', reason: 'cancelled' });
  assert.equal((await store.snapshot()).records['WI-SOT-20-01'].execution_state, 'Backlog');
  assert.deepEqual((await store.snapshot()).history.map(event => event.event), ['CLAIM', 'REASSIGN', 'START', 'BLOCK', 'UNBLOCK', 'RELEASE']);
});
