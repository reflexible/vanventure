import assert from 'node:assert/strict';
import test from 'node:test';
import { advanceApproval } from './approval-flow.mjs';

const proposal = (status = 'PROPOSED') => ({
  id: 'p-1', authority: 'website.design', owner: {
    module_id: 'design-guide', authority: 'website.design', source: 'docs/design-guide.md',
  }, status, integration: 'NOT_STARTED', approval: null,
});
const actor = { role: 'USER', id: 'project-owner' };
const evidence = { reference: 'chat#decision-9', scope: 'proposal p-1, one page only',
  wording: 'I approve this scoped proposal.', decided_at: '2026-09-26T12:00:00+02:00' };
const clean = { proposal_id: 'p-1', status: 'CLASSIFIED', user_decision_required: false,
  relationships: [], unresolved_candidate_ids: [], unknown_coverage: [] };
const request = (extra = {}) => ({ proposal: proposal(), action: 'APPROVE', actor, evidence,
  conflict: clean, ...extra });

test('IDEA progresses to PROPOSED without binding approval or source mutation', () => {
  const original = proposal('IDEA');
  const before = structuredClone(original);
  const result = advanceApproval({ proposal: original, action: 'PROPOSE' });
  assert.equal(result.status, 'PROPOSED');
  assert.equal(result.sot_update_allowed, false);
  assert.deepEqual(original, before);
  assert.throws(() => advanceApproval({ proposal: original, action: 'PROPOSE', actor }), /cannot contain/);
});

test('approval requires an explicit user, scoped decision evidence and completed review', () => {
  const source = proposal();
  const before = structuredClone(source);
  const result = advanceApproval(request());
  assert.equal(result.status, 'APPROVED');
  assert.equal(result.sot_update_allowed, true);
  assert.equal(result.release_allowed, false);
  assert.equal(result.proposal.approval.kind, 'PROPOSAL_INTEGRATION_ONLY');
  assert.equal(result.proposal.approval.grants_design_rule, false);
  assert.equal(result.proposal.approval.grants_live_rollout, false);
  assert.deepEqual(source, before);
  assert.throws(() => advanceApproval(request({ actor: { role: 'AGENT', id: 'worker' } })), /user decision/);
  assert.throws(() => advanceApproval(request({ evidence: { ...evidence, reference: '' } })), /Decision needs/);
  assert.throws(() => advanceApproval(request({ evidence: { ...evidence, scope: 'other proposal' } })), /scope/);
  assert.throws(() => advanceApproval(request({ conflict: null })), /matching conflict review/);
});

test('unknown coverage, incomplete review and unsupported direct approval fail closed', () => {
  assert.throws(() => advanceApproval(request({ conflict: {
    ...clean, unknown_coverage: [{ module_id: 'design-guide', reason: 'RULE_CATALOGUE_COVERAGE_MISSING' }],
  } })), /Unknown coverage/);
  assert.throws(() => advanceApproval(request({ conflict: {
    ...clean, unresolved_candidate_ids: ['R-1'],
  } })), /unresolved semantic review/);
  assert.throws(() => advanceApproval(request({ proposal: proposal('IDEA') })), /Only a reviewed PROPOSED/);
  assert.throws(() => advanceApproval(request({ proposal: { ...proposal(), integration: 'DONE' } })), /valid intake proposal/);
  assert.throws(() => advanceApproval(request({ proposal: { ...proposal(), approval: { forged: true } } })), /valid intake proposal/);
});

test('demonstrated rule conflict requires exact explicit user resolutions', () => {
  const conflict = { ...clean, status: 'CONFLICT', user_decision_required: true,
    relationships: [{ candidate_id: 'R-1', relation: 'CONTRADICTION', demonstrated: true }],
    decision: { candidate_ids: ['R-1'] } };
  assert.throws(() => advanceApproval(request({ conflict })), /Every demonstrated contradiction/);
  assert.throws(() => advanceApproval(request({ conflict, decision: {
    resolutions: [{ candidate_id: 'R-1', outcome: 'EXISTING_PREVAILS', rationale: 'Keep rule.' }],
  } })), /existing rule prevails/);
  const result = advanceApproval(request({ conflict, decision: {
    resolutions: [{ candidate_id: 'R-1', outcome: 'PROPOSAL_PREVAILS', rationale: 'Owner chose proposed rule.' }],
  } }));
  assert.equal(result.proposal.approval.conflict_decision.resolutions[0].candidate_id, 'R-1');
  assert.throws(() => advanceApproval(request({ conflict: clean, decision: { resolutions: [] } })), /without a demonstrated conflict/);
});

test('rejection and supersession preserve explicit decision trail and cannot authorize release', () => {
  const rejected = advanceApproval({ proposal: proposal('IDEA'), action: 'REJECT', actor, evidence });
  assert.equal(rejected.status, 'REJECTED');
  assert.equal(rejected.sot_update_allowed, false);
  const approved = advanceApproval(request()).proposal;
  const replacement = { ...approved, id: 'p-2' };
  const superseded = advanceApproval({ proposal: approved, action: 'SUPERSEDE', actor, evidence, replacement });
  assert.equal(superseded.status, 'SUPERSEDED');
  assert.equal(superseded.proposal.supersession.replacement_id, 'p-2');
  assert.equal(superseded.release_allowed, false);
  assert.throws(() => advanceApproval({ proposal: approved, action: 'SUPERSEDE', actor, evidence,
    replacement: { ...replacement, status: 'PROPOSED' } }), /approved replacement/);
  assert.throws(() => advanceApproval({ proposal: rejected.proposal, action: 'APPROVE', actor, evidence,
    conflict: clean }), /Only a reviewed PROPOSED/);
});
