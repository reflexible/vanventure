import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createDecisionStore } from './decision-state.mjs';

const proposal = () => ({ id: 'P1', authority: 'website.design', owner: {
  module_id: 'design', authority: 'website.design', source: 'docs/design-guide.md',
}, status: 'PROPOSED', integration: 'NOT_STARTED', conflict_check: 'PENDING', approval: null });
const impact = () => ({ proposal_id: 'P1', owner: proposal().owner,
  candidates: [{ id: 'R1', source: 'docs/design-guide.md', anchor: '§ 1', comparison: 'POSSIBLY_RELATED_TEXT' }],
  unknowns: [], conflict_check: 'PENDING' });
const review = (relation = 'UNRELATED', demonstrated) => ({ candidate_id: 'R1', relation,
  evidence_ref: 'docs/design-guide.md#R1', evidence_scope: { proposal_id: 'P1', candidate_id: 'R1' },
  rationale: 'Compared the anchored rules.', reviewer: 'review-agent',
  ...(demonstrated === undefined ? {} : { demonstrated }) });
const actor = { role: 'USER', id: 'owner' };
const evidence = { reference: 'chat/decision#P1', scope: 'proposal P1', wording: 'Approve P1.',
  decided_at: '2026-09-26T12:00:00+02:00' };

async function fixture(fn, authenticated = true) {
  const dir = await mkdtemp(join(tmpdir(), 'sot-decision-'));
  const path = join(dir, 'events.jsonl');
  try { await fn(createDecisionStore(path, authenticated ? { verifyUserDecision: () => true } : {}), path); }
  finally { await rm(dir, { recursive: true, force: true }); }
}
const register = store => store.register({ proposal: proposal(), impact: impact(), expectedRevision: 0, idempotencyKey: 'P1-register' });

test('persists proposal, review and scoped explicit user decision as a verified chain', () => fixture(async (store, path) => {
  await register(store);
  await store.recordReview({ proposalId: 'P1', reviews: [review()], expectedRevision: 1, idempotencyKey: 'P1-review' });
  const decision = await store.decide({ proposalId: 'P1', action: 'APPROVE', actor, evidence,
    expectedRevision: 2, idempotencyKey: 'P1-approve' });
  assert.equal(decision.transition.status, 'APPROVED');
  assert.equal(decision.transition.release_allowed, false);
  const reopened = createDecisionStore(path).read();
  const state = await reopened;
  assert.equal(state.revision, 3);
  assert.equal(state.proposals.get('P1').proposal.status, 'APPROVED');
  assert.equal(state.events[2].previous_hash, state.events[1].event_hash);
}));

test('concurrent writers serialize; stale revisions fail and retries are idempotent', () => fixture(async store => {
  const first = await register(store);
  assert.deepEqual(await register(store), first);
  const attempts = await Promise.allSettled([
    store.recordReview({ proposalId: 'P1', reviews: [review()], expectedRevision: 1, idempotencyKey: 'a' }),
    store.recordReview({ proposalId: 'P1', reviews: [review('EXTENSION')], expectedRevision: 1, idempotencyKey: 'b' }),
  ]);
  assert.equal(attempts.filter(item => item.status === 'fulfilled').length, 1);
  assert.match(attempts.find(item => item.status === 'rejected').reason.message, /Stale/);
  assert.equal((await store.read()).revision, 2);
  await assert.rejects(store.register({ proposal: { ...proposal(), id: 'P2' }, impact: impact(),
    expectedRevision: 0, idempotencyKey: 'P1-register' }), /Idempotency key reused/);
}));

test('unresolved conflict or unknown coverage never becomes approval', () => fixture(async store => {
  await register(store);
  await store.recordReview({ proposalId: 'P1', reviews: [], expectedRevision: 1, idempotencyKey: 'unresolved' });
  await assert.rejects(store.decide({ proposalId: 'P1', action: 'APPROVE', actor, evidence,
    expectedRevision: 2, idempotencyKey: 'approve' }), /unresolved semantic review/);
  assert.equal((await store.read()).revision, 2);
}));

test('demonstrated conflict requires explicit resolution; unverified user evidence fails closed', () => fixture(async (store, path) => {
  await register(store);
  await store.recordReview({ proposalId: 'P1', reviews: [review('CONTRADICTION', true)],
    expectedRevision: 1, idempotencyKey: 'conflict' });
  const params = { proposalId: 'P1', action: 'APPROVE', actor, evidence,
    expectedRevision: 2, idempotencyKey: 'decision' };
  await assert.rejects(store.decide(params), /explicit resolution/);
  const verified = createDecisionStore(path, { verifyUserDecision: () => false });
  await assert.rejects(verified.decide({ ...params, decision: { resolutions: [
    { candidate_id: 'R1', outcome: 'PROPOSAL_PREVAILS', rationale: 'User chose proposal.' },
  ] } }), /authenticated/);
  assert.equal((await store.read()).revision, 2);
  const result = await store.decide({ ...params, decision: { resolutions: [
    { candidate_id: 'R1', outcome: 'PROPOSAL_PREVAILS', rationale: 'User chose proposal.' },
  ] } });
  assert.equal(result.transition.status, 'APPROVED');
}));

test('detects tampering and rejects vague or mismatched evidence scopes', () => fixture(async (store, path) => {
  await register(store);
  await assert.rejects(store.recordReview({ proposalId: 'P1', reviews: [{ ...review(), evidence_ref: 'vague' }],
    expectedRevision: 1, idempotencyKey: 'bad-review' }), /concrete source anchor/);
  await store.recordReview({ proposalId: 'P1', reviews: [review()], expectedRevision: 1, idempotencyKey: 'review' });
  await assert.rejects(store.decide({ proposalId: 'P1', action: 'APPROVE', actor,
    evidence: { ...evidence, scope: 'P10' }, expectedRevision: 2, idempotencyKey: 'bad-scope' }), /exact proposal scope/);
  const body = await readFile(path, 'utf8');
  await writeFile(path, body.replace('Compared the anchored rules.', 'Altered review.'), 'utf8');
  await assert.rejects(store.read(), /hash chain/);
}));
