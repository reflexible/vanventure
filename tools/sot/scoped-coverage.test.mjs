import test from 'node:test';
import assert from 'node:assert/strict';
import { discoverSourceSections, assessScopedCoverage } from './scoped-coverage.mjs';

const registry = { modules: [
  { module_id: 'owner', source: 'docs/owner.md', status: 'active_reference' },
  { module_id: 'dependency', source: 'docs/dependency.md', status: 'active_reference' },
] };
const catalogue = { section_coverage: [
  { module_id: 'owner', section_id: 'owner-rules', scope: 'complete_section', source: 'docs/owner.md',
    heading: '## Rules', section_sha256: 'a'.repeat(64), rule_ids: ['RULE-1'], evidence_ref: 'review.md#owner' },
  { module_id: 'dependency', section_id: 'dep-rules', scope: 'complete_section', source: 'docs/dependency.md',
    heading: '## Rules', section_sha256: 'b'.repeat(64), rule_ids: ['RULE-2'], evidence_ref: 'review.md#dependency' },
] };
const proposal = { id: 'proposal-1', target_section_id: 'owner-rules' };
const impact = { proposal_id: proposal.id, owner: { module_id: 'owner' },
  dependencies: { upstream_modules: ['dependency'], downstream_modules: [] },
  unknowns: [], cross_module_unknowns: [] };

test('section discovery ignores fenced headings and records stable hashes', async () => {
  const source = '## Rules\nA rule.\n```md\n## Fake\n```\n### Child\nB rule.';
  const result = discoverSourceSections(source);
  assert.deepEqual(result.map(item => item.heading), ['## Rules', '### Child']);
  assert.ok(result.every(item => item.unique_heading && /^[a-f0-9]{64}$/.test(item.section_sha256)));
  assert.equal(result[0].section_sha256, (await import('./rule-catalogue.mjs')).sectionSha256(
    (await import('./rule-catalogue.mjs')).extractHeadingSection(source, '## Rules')));
});

test('coverage passes structural completeness only for every affected module', () => {
  const result = assessScopedCoverage({ proposal, impact, catalogue, registry,
    requested_sections: [{ module_id: 'owner', section_id: 'owner-rules' },
      { module_id: 'dependency', section_id: 'dep-rules' }] });
  assert.equal(result.status, 'STRUCTURALLY_COVERED_REVIEW_REQUIRED');
  assert.equal(result.semantic_equivalence, 'UNDETERMINED');
  assert.equal(result.approval, null);
});

test('missing section or omitted dependency remains a blocking unknown', () => {
  const result = assessScopedCoverage({ proposal, impact, catalogue, registry,
    requested_sections: [{ module_id: 'owner', section_id: 'owner-rules' }] });
  assert.equal(result.status, 'BLOCKED_UNKNOWN_COVERAGE');
  assert.ok(result.unknowns.some(item => item.module_id === 'dependency'));
});

test('existing impact unknowns cannot be cleared by scoped inventories', () => {
  const result = assessScopedCoverage({ proposal,
    impact: { ...impact, unknowns: [{ module_id: 'other', reason: 'PARTIAL_COVERAGE' }] }, catalogue, registry,
    requested_sections: [{ module_id: 'owner', section_id: 'owner-rules' },
      { module_id: 'dependency', section_id: 'dep-rules' }] });
  assert.equal(result.status, 'BLOCKED_UNKNOWN_COVERAGE');
  assert.equal(result.cross_module_unknowns.length, 0);
});

test('invalid and duplicate section requests fail closed', () => {
  const missing = assessScopedCoverage({ proposal, impact, catalogue, registry,
    requested_sections: [{ module_id: 'owner', section_id: 'missing' }] });
  assert.equal(missing.status, 'BLOCKED_UNKNOWN_COVERAGE');
  assert.ok(missing.unknowns.some(item => item.reason === 'COMPLETE_SECTION_INVENTORY_MISSING'));
  assert.throws(() => assessScopedCoverage({ proposal, impact, catalogue, registry,
    requested_sections: [{ module_id: 'owner', section_id: 'owner-rules' },
      { module_id: 'owner', section_id: 'owner-rules' }] }), /duplicate/);
});
