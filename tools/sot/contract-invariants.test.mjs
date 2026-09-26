import assert from 'node:assert/strict';
import test from 'node:test';
import { loadContracts } from './contracts.mjs';
import { validateContractInvariant } from './contract-invariants.mjs';

const catalogue = await loadContracts();
const contract = id => catalogue.contracts.find(item => item.contract_id === id);
const check = (id, payload, context) => validateContractInvariant(contract(id), payload, context);

test('work item resolves to exactly its recorded story and authoritative source reference', () => {
  const item = { work_item_id: 'WI-SOT-04-10', story_id: 'ST-SOT-04', status: 'TODO', source_ref: 'docs/scrum-plan.md#ST-SOT-04' };
  const context = { workItemStories: { 'WI-SOT-04-10': 'ST-SOT-04' }, storySourceRefs: { 'ST-SOT-04': item.source_ref } };
  assert.equal(check('SCRUM-WORK-ITEM', item, context).valid, true);
  assert.match(check('SCRUM-WORK-ITEM', { ...item, story_id: 'ST-SOT-05' }, context).errors.join(' '), /recorded Scrum story/);
  assert.match(check('SCRUM-WORK-ITEM', { ...item, source_ref: 'docs/ausbauplan.md' }, context).errors.join(' '), /authoritative story location/);
  assert.equal(check('SCRUM-WORK-ITEM', item, {}).valid, false);
});

test('proposal is distinct from apply; apply needs source, owning module, approval and both checks', () => {
  const change = { change_id: 'CH-1', target_module_id: 'analytics', source_ref: 'docs/analytics.md#policy', decision_status: 'PROPOSED' };
  const context = { moduleSourceRefs: { analytics: 'docs/analytics.md' }, sourceRefs: [change.source_ref], approvalEvidence: ['DEC-1'], checks: { conflict: 'PASS', impact: 'PASS' } };
  assert.equal(check('SOT-DECISION-CHANGE', change, { ...context, action: 'propose' }).valid, true);
  assert.match(check('SOT-DECISION-CHANGE', change, { ...context, action: 'apply' }).errors.join(' '), /approved decision/);
  const approved = { ...change, decision_status: 'APPROVED', decision_ref: 'DEC-1' };
  assert.equal(check('SOT-DECISION-CHANGE', approved, { ...context, action: 'apply' }).valid, true);
  assert.equal(check('SOT-DECISION-CHANGE', approved, { ...context, action: 'apply', approvalEvidence: [] }).valid, false);
  assert.equal(check('SOT-DECISION-CHANGE', approved, { ...context, action: 'apply', checks: { conflict: 'PASS' } }).valid, false);
  assert.equal(check('SOT-DECISION-CHANGE', approved, { ...context, action: 'apply', sourceRefs: [] }).valid, false);
});

test('one active claim per work item and reassignment only after release with evidence', () => {
  const assignment = { work_item_id: 'WI-1', worker_id: 'B', claim_status: 'Claimed', claimed_at: '2026-09-26T12:00:00Z', write_scope: ['tools/sot'] };
  const previous = { ...assignment, worker_id: 'A', claimed_at: '2026-09-26T11:00:00Z' };
  assert.equal(check('WORKER-WORK-ASSIGNMENT', assignment, { activeClaims: [previous] }).valid, false);
  assert.equal(check('WORKER-WORK-ASSIGNMENT', assignment, { activeClaims: [], previousClaim: previous,
    reassignment: { from_worker_id: 'A', to_worker_id: 'B', reason: 'handoff', ref: 'handoff-1' } }).valid, false);
  const released = { ...previous, claim_status: 'Review' };
  assert.equal(check('WORKER-WORK-ASSIGNMENT', assignment, { activeClaims: [], previousClaim: released }).valid, false);
  assert.equal(check('WORKER-WORK-ASSIGNMENT', assignment, { activeClaims: [], previousClaim: released,
    reassignment: { from_worker_id: 'A', to_worker_id: 'B', reason: 'handoff', ref: 'handoff-1' } }).valid, true);
  assert.equal(check('WORKER-WORK-ASSIGNMENT', assignment, { activeClaims: [] }).valid, true);
});

test('critical scope overlap requires coordination; independent scopes remain claimable', () => {
  const active = { work_item_id: 'WI-A', worker_id: 'A', claim_status: 'In Progress', claimed_at: '2026-09-26T11:00:00Z', write_scope: ['database/schema'] };
  const claim = { ...active, work_item_id: 'WI-B', worker_id: 'B', claimed_at: '2026-09-26T12:00:00Z' };
  const context = { activeClaims: [active], criticalScopes: ['database/schema'] };
  assert.match(check('WORKER-WORK-ASSIGNMENT', claim, context).errors.join(' '), /overlaps without evidenced coordination/);
  assert.equal(check('WORKER-WORK-ASSIGNMENT', claim, { ...context,
    coordination: [{ with_worker_id: 'A', scope: 'database/schema', ref: 'coord-1' }] }).valid, true);
  assert.equal(check('WORKER-WORK-ASSIGNMENT', { ...claim, write_scope: ['frontend/gallery'] }, context).valid, true);
});

test('worker cannot mark own work Done without independent review and integration', () => {
  const done = { work_item_id: 'WI-1', worker_id: 'A', claim_status: 'Done', claimed_at: '2026-09-26T11:00:00Z', write_scope: ['tools/sot'] };
  assert.equal(check('WORKER-WORK-ASSIGNMENT', done, { activeClaims: [] }).valid, false);
  assert.equal(check('WORKER-WORK-ASSIGNMENT', done, { activeClaims: [], review: { status: 'PASS', ref: 'r1' }, integration: { status: 'PASS', ref: 'i1' } }).valid, false);
  assert.equal(check('WORKER-WORK-ASSIGNMENT', done, { activeClaims: [], review: { status: 'PASS', reviewer_id: 'A', ref: 'r1' }, integration: { status: 'PASS', ref: 'i1' } }).valid, false);
  assert.equal(check('WORKER-WORK-ASSIGNMENT', done, { activeClaims: [], review: { status: 'PASS', reviewer_id: 'B', ref: 'r1' }, integration: { status: 'PASS', ref: 'i1' } }).valid, true);
});

test('CMS and analytics runtime boundaries cannot be certified from synthetic records', () => {
  const cms = { content_id: 'story-1', publication_state: 'published', scope_ref: 'release-1' };
  const analytics = { content_id: 'story-1', content_type: 'article', publication_state: 'published', source_ref: 'editor/slug' };
  assert.match(check('CMS-PUBLISHING', cms, {}).errors.join(' '), /actual runtime boundary/);
  assert.match(check('ANALYTICS-CONTENT-ID', analytics, {}).errors.join(' '), /actual runtime boundary/);
});
