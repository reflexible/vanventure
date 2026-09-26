import test from 'node:test';
import assert from 'node:assert/strict';
import { scopeReviewBinding, assessReviewedScope, assessProjectReviewedScope } from './scope-review.mjs';
import { sectionSha256 } from './rule-catalogue.mjs';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { buildDependencyGraph } from './dependency-graph.mjs';
import { assessSotImpact } from './sot-impact.mjs';

function fixture() {
  const source = '# Owner\n\n## Rule\nExisting rule.\n';
  const registry = { modules: [{ module_id: 'owner', source: 'docs/owner.md', status: 'active_reference' },
    { module_id: 'other', source: 'docs/other.md', status: 'active_reference' }] };
  const proposal = { id: 'p1', content: 'A precisely bounded proposed addition.', owner: { module_id: 'owner' }, target_section_id: 'rule' };
  const catalogue = { rules: [{ id: 'r1', module_id: 'owner', source: 'docs/owner.md', anchor: '## Rule', text: 'Existing rule.' }],
    section_coverage: [{ section_id: 'rule', module_id: 'owner', heading: '## Rule', scope: 'complete_section',
      section_sha256: sectionSha256('## Rule\nExisting rule.'), rule_ids: ['r1'] }] };
  const input = { proposal, registry, catalogue, graph: { nodes: [], edges: [] },
    sources: { 'docs/owner.md': source, 'docs/other.md': '# Other\nUnchanged independent rule.\n' },
    impact: { proposal_id: 'p1', unknowns: registry.modules.map(module => ({ module_id: module.module_id, reason: 'RULE_CATALOGUE_COVERAGE_PARTIAL' })),
      cross_module_unknowns: [{ module_id: 'other', reason: 'RULE_CATALOGUE_COVERAGE_PARTIAL' }], candidates: [], module_coverage: 'partial' } };
  const binding = scopeReviewBinding(input);
  input.review = { schema_version: '1.0.0', reviewer: 'review-agent', evidence_ref: 'review.md', reviewed_at: '2026-09-26T12:00:00Z', binding,
    unresolved_references: [], sections: binding.modules.flatMap(module => module.sections.map(section => ({ ...section,
      module_id: module.module_id, disposition: section.heading === '## Rule' ? 'INCLUDED_RULE_SCOPE' : 'EXCLUDED_FROM_RULE_SCOPE',
      rule_ids: section.heading === '## Rule' ? ['r1'] : [], rationale: 'Fixture explicit scope review.', evidence_ref: 'review.md#scope' }))) };
  const accepted = structuredClone(input.review);
  input.verifyReviewer = value => JSON.stringify(value) === JSON.stringify(accepted);
  return input;
}
function trustFixtureReview(input) { const accepted = structuredClone(input.review); input.verifyReviewer = value => JSON.stringify(value) === JSON.stringify(accepted); }

test('exact reviewed scope retains global gaps and requires every included rule to undergo conflict review', () => {
  const result = assessReviewedScope(fixture());
  assert.equal(result.status, 'SCOPED_REVIEW_COMPLETE');
  assert.deepEqual(result.impact.unknowns, []);
  assert.equal(result.scope_evidence.global_unknowns.length, 2);
  assert.equal(result.impact.module_coverage, 'partial');
  assert.equal(result.impact.candidates[0].id, 'r1');
  assert.equal(result.impact.semantic_equivalence, 'UNDETERMINED');
  assert.equal(result.impact.approval, null);
});
test('stale proposal, source, graph, registry and catalogue invalidate scope review', () => {
  for (const mutate of [x => { x.proposal.content += ' Different requirement.'; },
    x => { x.sources['docs/other.md'] += 'New rule.'; }, x => { x.graph.edges.push({ from: 'x', to: 'y' }); },
    x => { x.registry.modules[0].authority = 'different'; }, x => { x.catalogue.rules[0].text = 'Different.'; }]) {
    const input = fixture(); mutate(input);
    assert.ok(assessReviewedScope(input).errors.includes('STALE_OR_INCOMPLETE_REVIEW_BINDING'));
  }
});
test('missing, duplicate and invented section dispositions fail even with authentic reviewer', () => {
  for (const mutate of [x => x.review.sections.pop(), x => x.review.sections.push(x.review.sections[0]),
    x => { x.review.sections[0].heading = '## Invented'; }]) {
    const input = fixture(); mutate(input); trustFixtureReview(input);
    assert.equal(assessReviewedScope(input).status, 'SCOPE_REVIEW_BLOCKED');
  }
});
test('unauthenticated review, excluded target and unsupported unknowns remain blocking', () => {
  const untrusted = fixture(); untrusted.verifyReviewer = () => false;
  assert.ok(assessReviewedScope(untrusted).errors.includes('AUTHENTICATED_SCOPE_REVIEW_REQUIRED'));
  const excluded = fixture(); excluded.review.sections.find(x => x.heading === '## Rule').disposition = 'EXCLUDED_FROM_RULE_SCOPE'; trustFixtureReview(excluded);
  assert.ok(assessReviewedScope(excluded).errors.includes('TARGET_SCOPE_NOT_INCLUDED'));
  const unknown = fixture(); unknown.impact.unknowns.push({ module_id: 'owner', reason: 'CONTRACT_BROKEN' });
  assert.ok(assessReviewedScope(unknown).errors.includes('NON_CATALOGUE_UNKNOWNS_REMAIN'));
});
test('unresolved references and missing inventory cannot be approved away', () => {
  const input = fixture(); input.review.unresolved_references.push('unreviewed authority'); trustFixtureReview(input);
  assert.ok(assessReviewedScope(input).errors.includes('UNRESOLVED_REFERENCES'));
  const missing = fixture(); missing.review.sections.find(x => x.heading === '## Rule').rule_ids = []; trustFixtureReview(missing);
  assert.ok(assessReviewedScope(missing).errors.some(x => x.startsWith('COMPLETE_INVENTORY_REQUIRED')));
});
test('malformed section array fails closed', () => {
  const input = fixture(); input.review.sections = {}; trustFixtureReview(input);
  assert.equal(assessReviewedScope(input).status, 'SCOPE_REVIEW_BLOCKED');
});
test('impact candidates and dependency changes invalidate existing reviewer proof', () => {
  const input = fixture(); input.impact.dependencies = { upstream_modules: ['unreviewed'] };
  assert.ok(assessReviewedScope(input).errors.includes('STALE_OR_INCOMPLETE_REVIEW_BINDING'));
});
test('cross-module-only unknown errors cannot disappear', () => {
  const input = fixture(); input.impact.cross_module_unknowns.push({ module_id: 'other', reason: 'CONTRACT_BROKEN' });
  input.review.binding = scopeReviewBinding(input); trustFixtureReview(input);
  assert.ok(assessReviewedScope(input).errors.includes('NON_CATALOGUE_UNKNOWNS_REMAIN'));
});

test('disk entry uses its own repository and detects source replacement during reviewer verification', async t => {
  const root = await mkdtemp(join(tmpdir(), 'sot-scope-review-'));
  t.after(async () => { assert.ok(resolve(root).startsWith(resolve(tmpdir()) + '/'.replace('/', process.platform === 'win32' ? '\\' : '/'))); await rm(root, { recursive: true, force: true }); });
  const input = fixture();
  input.registry.schema_version = '1.0.0';
  for (const module of input.registry.modules) Object.assign(module, { name: module.module_id, authority: `test.${module.module_id}`,
    dependencies: [], contracts: [], version: null, last_verified_baseline: null, semantic_baseline: null, last_audit_status: null });
  Object.assign(input.proposal, { authority: 'test.owner', owner: { module_id: 'owner', source: 'docs/owner.md', authority: 'test.owner' },
    integration: 'NOT_STARTED', impact_check: 'PENDING' });
  input.catalogue.schema_version = '1.0.0';
  Object.assign(input.catalogue.rules[0], { authority: 'test.owner', section_id: 'rule' });
  input.catalogue.coverage = input.registry.modules.map(module => ({ module_id: module.module_id, source: module.source,
    scope: 'partial', mapped_rule_count: module.module_id === 'owner' ? 1 : 0, evidence_ref: 'review.md', remaining: 'Explicit reviewed scope only.' }));
  Object.assign(input.catalogue.section_coverage[0], { source: 'docs/owner.md', evidence_ref: 'review.md#rule', remaining_outside_section: 'Other sections remain partial.' });
  const contracts = { schema_version: '1.0.0', status: 'interface_metadata_only', contracts: [] };
  const supplement = { schema_version: '1.0.0', status: 'derived_index_only', sources: { work_items: 'docs/epic.md' }, nodes: [], edges: [] };
  for (const [path, body] of Object.entries({ ...input.sources, 'docs/epic.md': '# Isolated test epic\n',
    'docs/governance/module-registry.json': JSON.stringify(input.registry),
    'docs/governance/contracts.json': JSON.stringify(contracts), 'docs/governance/dependency-graph.json': JSON.stringify(supplement) })) {
    await mkdir(dirname(resolve(root, path)), { recursive: true }); await writeFile(resolve(root, path), body);
  }
  input.graph = buildDependencyGraph({ registry: input.registry, contracts, epicText: '# Isolated test epic\n', supplement });
  input.impact = assessSotImpact(input);
  input.review.binding = scopeReviewBinding(input); trustFixtureReview(input);
  const request = { ...input, projectRoot: root };
  assert.equal((await assessProjectReviewedScope(request)).status, 'SCOPED_REVIEW_COMPLETE');
  const result = await assessProjectReviewedScope({ ...request, verifyReviewer: review => {
    writeFileSync(resolve(root, 'docs/other.md'), '# Other\nChanged after snapshot.');
    return input.verifyReviewer(review);
  } });
  assert.deepEqual(result.errors, ['SOURCE_CHANGED_DURING_REVIEW']);
});
