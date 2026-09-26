import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { analyzeWriteScopeConflicts, describeWorkerScope, isWorkerPathAllowed, createWorkerStateStore, runtimeWorkers, activeProcesses } from './worker-state.mjs';

const exec = promisify(execFile);
const moduleUrl = new URL('./worker-state.mjs', import.meta.url).href;
const passingProof = id => ({ status: 'PASS', evidence_ref: `test-evidence:${id}` });
const completionEvidence = () => ({
  scope: 'WI-SOT-20-01',
  sotUpdate: { required: false, scope: 'WI-SOT-20-01',
    reason: 'This worker-state lifecycle test changes no authoritative SoT.', evidence_ref: 'test-scope:WI-SOT-20-01' },
  unresolvedConflicts: [],
  requiredChecks: [{ id: 'unit-tests', ...passingProof('unit-tests') }],
  contracts: passingProof('contracts'), dependencies: passingProof('dependencies'), consistency: passingProof('consistency'),
  postValidation: { status: 'POST_VALIDATION_PASS', audit_output: 'audits/test.json', scope: 'WI-SOT-20-01', checks: [
    'required_check', 'contracts', 'dependencies', 'sotConsistency', 'traceability',
  ].map(name => ({ name, status: 'PASS' })) },
});
// Explicit fixture-only host verifier; it is not a project artifact validator.
const fixtureVerifier = async () => ({ status: 'PASS', evidence_ref: 'fixture:trusted-checker' });
async function fixture(t, verifyCompletionEvidence = fixtureVerifier) {
  const dir = await mkdtemp(join(tmpdir(), 'sot-workers-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const planPath = join(dir, 'plan.md');
  await writeFile(planPath, '- [ ] READY – WI-SOT-20-01 · Claim\n- [ ] READY – WI-SOT-20-02 · Owner\n- [ ] TODO – WI-SOT-20-03 · Lock\n');
  const path = join(dir, 'state.json');
  return { store: createWorkerStateStore({ path, planPath, verifyCompletionEvidence }), path, planPath };
}
const claim = (item, worker, scope, coordination_ref) => ({ work_item_id: item, worker_id: worker, write_scope: [scope], coordination_ref });

test('same work item has only one cross-process claim and a durable event', async t => {
  const { path, planPath, store } = await fixture(t);
  const code = `import { analyzeWriteScopeConflicts, describeWorkerScope, isWorkerPathAllowed, createWorkerStateStore } from ${JSON.stringify(moduleUrl)};\n`
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
  const code = `import { analyzeWriteScopeConflicts, describeWorkerScope, isWorkerPathAllowed, createWorkerStateStore } from ${JSON.stringify(moduleUrl)};\n`
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
  await assert.rejects(store.integrate({ work_item_id: 'WI-SOT-20-01', integrator_id: 'C', evidence_ref: 'merge', tests_passed: true }), /Definition-of-Done guard blocked/);
  await store.integrate({ work_item_id: 'WI-SOT-20-01', integrator_id: 'C', evidence_ref: 'merge', tests_passed: true,
    completion_evidence: completionEvidence() });
  const done = (await store.snapshot()).records['WI-SOT-20-01'];
  assert.equal(done.execution_state, 'Done');
  assert.equal(done.done_guard.status, 'DONE_ALLOWED');
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

async function readyForIntegration(store) {
  await store.claim(claim('WI-SOT-20-01', 'A', 'src/a'));
  await store.start({ work_item_id: 'WI-SOT-20-01', worker_id: 'A' });
  await store.handover({ work_item_id: 'WI-SOT-20-01', worker_id: 'A', summary: 'Implemented', files: ['src/a'], tests: ['node --test'], limitations: [], follow_up: [] });
  await store.review({ work_item_id: 'WI-SOT-20-01', reviewer_id: 'B', accepted: true, evidence_ref: 'review' });
}
const integrateInput = completion_evidence => ({ work_item_id: 'WI-SOT-20-01', integrator_id: 'C', evidence_ref: 'merge', tests_passed: true, completion_evidence });

test('scope extension unions new paths and preserves ownership, status and previous history', async t => {
  const { store } = await fixture(t);
  await store.claim(claim('WI-SOT-20-01', 'A', 'src/a'));
  await store.start({ work_item_id: 'WI-SOT-20-01', worker_id: 'A' });
  const before = await store.snapshot();
  const extended = await store.extendScope({ work_item_id: 'WI-SOT-20-01', worker_id: 'A', write_scope: ['src/b'], reason: 'Add scoped integration runner.' });
  assert.deepEqual(extended.write_scope, ['src/a', 'src/b']);
  assert.equal(extended.claimed_at, before.records['WI-SOT-20-01'].claimed_at);
  assert.equal(extended.assigned_agent, 'A');
  assert.equal(extended.execution_state, 'In Progress');
  const after = await store.snapshot();
  assert.deepEqual(after.history.slice(0, -1), before.history);
  assert.equal(after.history.at(-1).event, 'EXTEND_SCOPE');
  assert.deepEqual(after.history.at(-1).previous_scope, ['src/a']);
  await store.extendScope({ work_item_id: 'WI-SOT-20-01', worker_id: 'A', write_scope: ['src/b'], reason: 'Subset cannot remove prior claim.' });
  assert.deepEqual((await store.snapshot()).records['WI-SOT-20-01'].write_scope, ['src/a', 'src/b']);
});

test('scope extension rejects wrong owner, missing reason and uncoordinated collision without writes', async t => {
  const { store, path } = await fixture(t);
  await store.claim(claim('WI-SOT-20-01', 'A', 'src/a'));
  await store.claim(claim('WI-SOT-20-02', 'B', 'src/b'));
  const before = await readFile(path, 'utf8');
  const request = { work_item_id: 'WI-SOT-20-01', worker_id: 'A', write_scope: ['src/c'], reason: 'Extend scope.' };
  await assert.rejects(store.extendScope({ ...request, worker_id: 'B' }), /own active/);
  await assert.rejects(store.extendScope({ ...request, reason: '' }), /explicit reason/);
  await assert.rejects(store.extendScope({ ...request, write_scope: ['src/b/child'] }), /Write scope conflicts/);
  await assert.rejects(store.extendScope({ ...request, write_scope: [] }), /write_scope/);
  assert.equal(await readFile(path, 'utf8'), before);
});

test('scope extension permits explicit shared coordination and refuses released work', async t => {
  const { store } = await fixture(t);
  await store.claim(claim('WI-SOT-20-01', 'A', 'src/a'));
  await store.claim(claim('WI-SOT-20-02', 'B', 'src/b', 'COORD-1'));
  await store.extendScope({ work_item_id: 'WI-SOT-20-01', worker_id: 'A', write_scope: ['src/b/child'], reason: 'Reviewed shared scope.', coordination_ref: 'COORD-1' });
  assert.equal((await store.snapshot()).records['WI-SOT-20-01'].coordination_ref, 'COORD-1');
  await store.release({ work_item_id: 'WI-SOT-20-01', actor_id: 'A', reason: 'Finished preparation.' });
  await assert.rejects(store.extendScope({ work_item_id: 'WI-SOT-20-01', worker_id: 'A', write_scope: ['src/c'], reason: 'Cannot revive a claim.' }), /own active/);
});

test('integration rejects evidence belonging to another work item without changing durable state', async t => {
  const { store, path } = await fixture(t);
  await readyForIntegration(store);
  const before = await readFile(path, 'utf8');
  const wrong = completionEvidence();
  wrong.scope = wrong.sotUpdate.scope = wrong.postValidation.scope = 'WI-SOT-20-02';
  await assert.rejects(store.integrate(integrateInput(wrong)), /WRONG_WORK_ITEM_SCOPE/);
  assert.equal(await readFile(path, 'utf8'), before);
});

test('integration captures detached evidence before waiting and snapshots reject substituted Done scope', async t => {
  const { store, path } = await fixture(t);
  await readyForIntegration(store);
  const proof = completionEvidence();
  const pending = store.integrate(integrateInput(proof));
  proof.scope = 'WI-SOT-20-02';
  proof.requiredChecks[0].status = 'FAIL';
  const returned = await pending;
  returned.completion_evidence.contracts.status = 'FAIL';
  const state = await store.snapshot();
  assert.equal(state.records['WI-SOT-20-01'].completion_evidence.contracts.status, 'PASS');
  assert.equal(state.records['WI-SOT-20-01'].completion_evidence.scope, 'WI-SOT-20-01');
  const tampered = state.records['WI-SOT-20-01'];
  tampered.completion_evidence.scope = tampered.completion_evidence.sotUpdate.scope
    = tampered.completion_evidence.postValidation.scope = tampered.done_guard.scope = 'WI-SOT-20-02';
  await writeFile(path, JSON.stringify(state));
  await assert.rejects(store.snapshot(), /Definition-of-Done guard/);
});

test('integration and persisted Done validation reject duplicate post-validation checks', async t => {
  const { store, path } = await fixture(t);
  await readyForIntegration(store);
  const proof = completionEvidence();
  proof.postValidation.checks.unshift({ name: 'contracts', status: 'FAIL' });
  await assert.rejects(store.integrate(integrateInput(proof)), /Definition-of-Done guard blocked/);
  await store.integrate(integrateInput(completionEvidence()));
  const state = await store.snapshot();
  state.records['WI-SOT-20-01'].completion_evidence.postValidation.checks.push({ name: 'contracts', status: 'PASS' });
  await writeFile(path, JSON.stringify(state));
  await assert.rejects(store.snapshot(), /Definition-of-Done guard/);
});

test('direct integration cannot replace a missing host verifier with payload PASS claims', async t => {
  const { store, path, planPath } = await fixture(t, null);
  await readyForIntegration(store);
  const before = await readFile(path, 'utf8');
  const input = integrateInput(completionEvidence());
  input.verifyCompletionEvidence = fixtureVerifier;
  input.completion_evidence.verification = { status: 'PASS', evidence_ref: 'invented' };
  await assert.rejects(store.integrate(input), /Trusted completion evidence verifier is required/);
  assert.equal(await readFile(path, 'utf8'), before);
  const trusted = createWorkerStateStore({ path, planPath, verifyCompletionEvidence: fixtureVerifier });
  await trusted.integrate(integrateInput(completionEvidence()));
  // A historical accepted record can still be inspected without invoking a new verifier.
  assert.equal((await store.snapshot()).records['WI-SOT-20-01'].execution_state, 'Done');
});

test('host rejection, exception, absent evidence and async context mutation cannot write Done', async t => {
  for (const verifier of [
    async () => ({ status: 'BLOCKED', reason: 'Artifact missing.' }),
    async () => { throw new Error('Artifact read failed.'); },
    async () => ({ status: 'PASS' }),
    async context => { await Promise.resolve(); context.completion_evidence.scope = 'WI-SOT-20-02'; return fixtureVerifier(); },
  ]) {
    const { store, path } = await fixture(t, verifier);
    await readyForIntegration(store);
    const before = await readFile(path, 'utf8');
    await assert.rejects(store.integrate(integrateInput(completionEvidence())), /verification|verifier mutated/);
    assert.equal(await readFile(path, 'utf8'), before);
  }
});

test('host verifier receives detached bound context and its evidence is persisted', async t => {
  let observed;
  const { store } = await fixture(t, async context => {
    observed = context;
    await Promise.resolve();
    assert.equal(context.work_item_id, 'WI-SOT-20-01');
    assert.equal(context.review.accepted, true);
    assert.equal(context.record.execution_state, 'Integration');
    assert.equal(context.integration.integrator_id, 'C');
    return { status: 'PASS', evidence_ref: 'fixture:checked-artifacts' };
  });
  await readyForIntegration(store);
  await store.integrate(integrateInput(completionEvidence()));
  observed.review.accepted = false;
  observed.completion_evidence.contracts.status = 'FAIL';
  const result = (await store.snapshot()).records['WI-SOT-20-01'];
  assert.equal(result.review.accepted, true);
  assert.equal(result.completion_evidence.contracts.status, 'PASS');
  assert.equal(result.completion_verification.evidence_ref, 'fixture:checked-artifacts');
});

test('out-of-lock state changes during an async verifier are not overwritten', async t => {
  let path;
  const fixtureResult = await fixture(t, async () => {
    const state = JSON.parse(await readFile(path, 'utf8'));
    state.revision++;
    await writeFile(path, JSON.stringify(state));
    return fixtureVerifier();
  });
  path = fixtureResult.path;
  await readyForIntegration(fixtureResult.store);
  await assert.rejects(fixtureResult.store.integrate(integrateInput(completionEvidence())), /outside the transaction lock/);
  assert.equal((await fixtureResult.store.snapshot()).records['WI-SOT-20-01'].execution_state, 'Integration');
});

test('changed authoritative item status during verification blocks the transition', async t => {
  let planPath;
  const fixtureResult = await fixture(t, async () => {
    const plan = await readFile(planPath, 'utf8');
    await writeFile(planPath, plan.replace('READY', 'TODO'));
    return fixtureVerifier();
  });
  planPath = fixtureResult.planPath;
  await readyForIntegration(fixtureResult.store);
  const before = await readFile(fixtureResult.path, 'utf8');
  await assert.rejects(fixtureResult.store.integrate(integrateInput(completionEvidence())), /plan status changed/);
  assert.equal(await readFile(fixtureResult.path, 'utf8'), before);
});


test('reports file collisions without changing worker state', () => {
  const records = { A: { work_item_id: 'A', execution_state: 'In Progress', write_scope: ['src/a'], coordination_ref: null }, B: { work_item_id: 'B', execution_state: 'Review', write_scope: ['src/a/child'], coordination_ref: null } };
  const before = structuredClone(records); const result = analyzeWriteScopeConflicts(records);
  assert.equal(result.status, 'COORDINATION_REQUIRED'); assert.deepEqual(result.conflicts[0].work_item_ids, ['A', 'B']); assert.deepEqual(records, before);
});


test('projects an explicit worker scope and excludes protected Core paths', () => {
  const scope = describeWorkerScope({ work_item_id: 'WI-SOT-21-04', assigned_agent: 'A', write_scope: ['tools/sot'] });
  assert.deepEqual(scope.allowed_write_scope, ['tools/sot']); assert.equal(scope.execution_authorized, false);
  assert.throws(() => describeWorkerScope({ work_item_id: 'WI-SOT-21-04', assigned_agent: 'A', write_scope: ['docs/scrum-plan.md'] }), /protected/);
});


test('allows only files within explicit worker scope', () => {
  const scope = describeWorkerScope({ work_item_id: 'WI-SOT-21-05', assigned_agent: 'A', write_scope: ['tools/sot'] });
  assert.equal(isWorkerPathAllowed(scope, 'tools/sot/worker-state.mjs').allowed, true);
  const protectedPath = isWorkerPathAllowed(scope, 'docs/scrum-plan.md'); assert.equal(protectedPath.allowed, false); assert.deepEqual(protectedPath.matched_protected_scopes, ['docs/scrum-plan.md']);
  assert.equal(isWorkerPathAllowed(scope, 'tools/other.mjs').allowed, false);
});
