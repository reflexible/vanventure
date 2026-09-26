import assert from 'node:assert/strict';
import test from 'node:test';
import { assessConflict } from './conflict-check.mjs';

const proposal = {
  id: 'proposal-1', authority: 'website.design', owner: {
    module_id: 'design-guide', authority: 'website.design', source: 'docs/design-guide.md',
  }, integration: 'NOT_STARTED', conflict_check: 'PENDING',
};
const candidate = (id, comparison = 'POSSIBLY_RELATED_TEXT') => ({
  id, source: 'docs/design-guide.md', anchor: `§ ${id}`, comparison,
});
const impact = (candidates, unknowns = []) => ({
  proposal_id: proposal.id, owner: proposal.owner, candidates, unknowns,
  conflict_check: 'PENDING',
});
const review = (candidate_id, relation, demonstrated) => ({
  candidate_id, relation, evidence_ref: `review#${candidate_id}`,
  rationale: `Anchored semantic comparison for ${candidate_id}.`, reviewer: 'review-agent',
  ...(demonstrated === undefined ? {} : { demonstrated }),
});

test('text similarity and exact text remain unclassified without reviewer evidence', () => {
  const result = assessConflict({ proposal, impact: impact([candidate('R1', 'EXACT_TEXT'), candidate('R2')]) });
  assert.equal(result.status, 'NEEDS_ANALYSIS');
  assert.deepEqual(result.unresolved_candidate_ids, ['R1', 'R2']);
  assert.equal(result.user_decision_required, false);
  assert.equal(result.sot_update_allowed, false);
});

test('anchored reviews distinguish duplicate, extension, superseding, and unrelated rules', () => {
  const source = impact(['R1', 'R2', 'R3', 'R4'].map(id => candidate(id)));
  const before = structuredClone(source);
  const result = assessConflict({ proposal, impact: source, reviews: [
    review('R1', 'DUPLICATE'), review('R2', 'EXTENSION'),
    review('R3', 'SUPERSEDES'), review('R4', 'UNRELATED'),
  ] });
  assert.equal(result.status, 'CLASSIFIED');
  assert.deepEqual(result.relationships.map(item => item.relation),
    ['DUPLICATE', 'EXTENSION', 'SUPERSEDES', 'UNRELATED']);
  assert.equal(result.user_decision_required, false);
  assert.equal(result.sot_update_allowed, false);
  assert.deepEqual(source, before);
});

test('only a demonstrated contradiction produces a user decision request', () => {
  const source = impact([candidate('R1'), candidate('R2')]);
  const alleged = assessConflict({ proposal, impact: source, reviews: [
    review('R1', 'CONTRADICTION', false), review('R2', 'DUPLICATE'),
  ] });
  assert.equal(alleged.status, 'NEEDS_ANALYSIS');
  assert.equal(alleged.user_decision_required, false);
  const proven = assessConflict({ proposal, impact: source, reviews: [
    review('R1', 'CONTRADICTION', true), review('R2', 'DUPLICATE'),
  ] });
  assert.equal(proven.status, 'CONFLICT');
  assert.equal(proven.user_decision_required, true);
  assert.deepEqual(proven.decision.candidate_ids, ['R1']);
  assert.equal(proven.approval, null);
});

test('unknown catalogue coverage blocks a clean result even with all candidate reviews', () => {
  const source = impact([candidate('R1')], [{ module_id: 'analytics', reason: 'RULE_CATALOGUE_COVERAGE_MISSING' }]);
  const result = assessConflict({ proposal, impact: source, reviews: [review('R1', 'UNRELATED')] });
  assert.equal(result.status, 'NEEDS_ANALYSIS');
  assert.equal(result.user_decision_required, false);
  assert.equal(result.sot_update_allowed, false);
  assert.deepEqual(result.unknown_coverage, source.unknowns);
});

test('rejects mismatched impact, forged evidence, and unreviewed candidate IDs', () => {
  const source = impact([candidate('R1')]);
  assert.throws(() => assessConflict({ proposal, impact: { ...source, proposal_id: 'different' } }), /matching/);
  assert.throws(() => assessConflict({ proposal, impact: source,
    reviews: [{ ...review('R1', 'DUPLICATE'), evidence_ref: '' }] }), /reviewer evidence/);
  assert.throws(() => assessConflict({ proposal, impact: source,
    reviews: [review('R2', 'DUPLICATE')] }), /Unknown candidate/);
  assert.throws(() => assessConflict({ proposal, impact: source,
    reviews: [review('R1', 'CONTRADICTION')] }), /demonstrated/);
});
