import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { createUserDecisionVerifier, decisionProposalHash } from './user-decision-evidence.mjs';
import { createDecisionStore } from './decision-state.mjs';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
function fixture(t, precision = 'timestamp') {
  const directory = mkdtempSync(join(tmpdir(), 'sot-user-evidence-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const originalPath = join(directory, 'original.txt');
  const manifestPath = join(directory, 'import.json');
  const prefix = 'Synthetic test only: ü\n';
  const wording = 'Approve the exact synthetic proposal p1.';
  const original = Buffer.from(`${prefix}${wording}\n`);
  writeFileSync(originalPath, original);
  const decisionTime = precision === 'date' ? '2026-09-26' : '2026-09-26T12:00:00Z';
  const proposal = { id: 'p1', content: 'Exact synthetic proposed rule.', authority: 'fixture.rule',
    owner: { module_id: 'fixture', authority: 'fixture.rule', source: 'docs/fixture.md' },
    status: 'PROPOSED', integration: 'NOT_STARTED', conflict_check: 'PENDING', approval: null };
  const request = { proposalId: 'p1', proposal_sha256: decisionProposalHash(proposal), action: 'APPROVE', actor: { role: 'USER', id: 'fixture-user' },
    evidence: { reference: 'fixture://message-1#decision', scope: 'p1', wording, decided_at: decisionTime }, decision: null };
  if (precision === 'date') request.evidence.date_precision = 'date';
  const manifest = { schema_version: '1.0.0', captured_at: '2026-09-26T12:01:00Z',
    decision_time: { precision, value: decisionTime },
    original: { path: originalPath, sha256: hash(original), reference: 'fixture://message-1', author: request.actor },
    quote: { text: wording, byte_offset: Buffer.byteLength(prefix) }, binding: request };
  const pin = () => { writeFileSync(manifestPath, JSON.stringify(manifest)); return [{ manifestPath, sha256: hash(readFileSync(manifestPath)) }]; };
  const trustedImports = pin();
  return { request, proposal, directory, manifest, manifestPath, originalPath, pin, trustedImports,
    verify: createUserDecisionVerifier({ trustedImports }) };
}

test('trusted exact import supports synchronous repeated verification without fabricating a signature', t => {
  const f = fixture(t);
  assert.equal(f.verify(f.request), true);
  assert.equal(f.verify(structuredClone(f.request)), true);
});
test('trust roots are mandatory and cannot be learned from author claims', t => {
  assert.throws(() => createUserDecisionVerifier(), /Externally trusted/);
  assert.throws(() => createUserDecisionVerifier({ trustedImports: [] }), /Externally trusted/);
  const f = fixture(t);
  const untrusted = createUserDecisionVerifier({ trustedImports: [{ manifestPath: f.manifestPath, sha256: '0'.repeat(64) }] });
  assert.equal(untrusted(f.request), false);
});
test('each invocation rejects changed manifest and changed original independently', t => {
  const f = fixture(t);
  f.manifest.captured_at = '2026-09-26T12:02:00Z'; f.pin();
  assert.equal(f.verify(f.request), false);
  const current = createUserDecisionVerifier({ trustedImports: f.pin() });
  writeFileSync(f.originalPath, 'Replaced original');
  assert.equal(current(f.request), false);
});
test('exact proposal, action, actor, wording, scope and conflict resolution are bound', t => {
  const f = fixture(t);
  for (const mutate of [x => { x.proposalId = 'p2'; }, x => { x.action = 'REJECT'; },
    x => { x.actor.id = 'another-user'; }, x => { x.evidence.scope = 'p1 p2'; },
    x => { x.evidence.wording += ' Expanded'; }, x => { x.decision = { resolutions: [] }; },
    x => { x.evidence.decided_at = '2026-09-27T12:00:00Z'; }]) {
    const request = structuredClone(f.request); mutate(request);
    assert.equal(f.verify(request), false);
  }
});
test('even pinned imports need an actual source quote and consistent USER attribution', t => {
  const f = fixture(t);
  for (const mutate of [x => { x.original.author = { role: 'AGENT', id: 'fixture-user' }; },
    x => { x.original.author = { role: 'USER', id: 'unrelated-user' }; },
    x => { x.quote.byte_offset = 0; }, x => { x.quote.text = 'Not in source'; },
    x => { x.binding.evidence.reference = 'fixture://other#decision'; }]) {
    const saved = structuredClone(f.manifest); mutate(f.manifest);
    const verify = createUserDecisionVerifier({ trustedImports: f.pin() });
    assert.equal(verify(f.request), false);
    Object.assign(f.manifest, saved);
  }
});
test('actual date precision is preserved, separately from import timestamp', t => {
  const f = fixture(t, 'date');
  assert.equal(f.verify(f.request), true);
  const manufactured = structuredClone(f.request); manufactured.evidence.decided_at += 'T00:00:00Z';
  assert.equal(f.verify(manufactured), false);
  f.manifest.decision_time.value = '2026-02-30'; f.manifest.binding.evidence.decided_at = '2026-02-30';
  assert.equal(createUserDecisionVerifier({ trustedImports: f.pin() })(f.request), false);
});
test('caller mutation cannot replace retained external trust anchors', t => {
  const f = fixture(t);
  f.manifest.binding.actor.id = 'forged'; f.manifest.original.author.id = 'forged';
  f.trustedImports[0].sha256 = f.pin()[0].sha256;
  assert.equal(f.verify(f.request), false);
});
test('proposal digest is stable through approval but binds content, owner, target and baseline', t => {
  const f = fixture(t);
  const approved = { ...f.proposal, status: 'APPROVED', approval: { actor: f.request.actor } };
  assert.equal(decisionProposalHash(approved), decisionProposalHash(f.proposal));
  assert.equal(decisionProposalHash(Object.fromEntries(Object.entries(f.proposal).reverse())), decisionProposalHash(f.proposal));
  for (const change of [{ content: 'Different rule' }, { owner: { ...f.proposal.owner, source: 'other.md' } },
    { target_section_id: 'another-section' }, { baseline_sha256: '0'.repeat(64) }]) {
    const changed = decisionProposalHash({ ...f.proposal, ...change });
    assert.notEqual(changed, decisionProposalHash(f.proposal));
    assert.equal(f.verify({ ...f.request, proposal_sha256: changed }), false);
  }
  const missing = structuredClone(f.request); delete missing.proposal_sha256;
  assert.equal(f.verify(missing), false);
});
test('real decision store recomputes proposal content hash instead of accepting reused same-ID authorization', async t => {
  const f = fixture(t, 'date');
  for (const forged of [false, true]) {
    const proposal = { ...f.proposal, ...(forged ? { content: 'Unapproved replacement using same ID' } : {}) };
    const store = createDecisionStore(join(f.directory, `${forged}.jsonl`), { verifyUserDecision: f.verify });
    await store.register({ proposal, impact: { proposal_id: 'p1', owner: proposal.owner, candidates: [], unknowns: [], conflict_check: 'PENDING' },
      expectedRevision: 0, idempotencyKey: 'register' });
    await store.recordReview({ proposalId: 'p1', reviews: [], expectedRevision: 1, idempotencyKey: 'review' });
    const { proposal_sha256, ...request } = f.request;
    const decision = store.decide({ ...request, expectedRevision: 2, idempotencyKey: 'decision' });
    if (forged) await assert.rejects(decision, /authenticated/);
    else {
      const event = await decision;
      assert.equal(event.transition.status, 'APPROVED');
      const persisted = (await createDecisionStore(join(f.directory, `${forged}.jsonl`)).read()).proposals.get('p1').proposal;
      assert.equal(f.verify({ proposalId: persisted.id, proposal_sha256: decisionProposalHash(persisted), action: 'APPROVE',
        actor: persisted.approval.actor, evidence: persisted.approval.evidence, decision: persisted.approval.conflict_decision }), true);
    }
  }
});
