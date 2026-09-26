import assert from 'node:assert/strict';
import test from 'node:test';
import { loadRegistry } from './module-registry.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';
import { prepareIntake } from './intake.mjs';
import { assessSotImpact, validateRuleCatalogue } from './sot-impact.mjs';

const input = {
  kind: 'rule', classification: 'DESIGN_RULE', title: 'Fokus sichtbar',
  content: 'Buttons brauchen einen sichtbaren Fokuszustand.', authority: 'website.design',
  provenance: { source_type: 'chat', reference: 'thread-1/message-2', captured_at: '2026-09-26T12:00:00+02:00' },
};
const rule = (module, id, text, anchor) => ({ id, module_id: module.module_id,
  authority: module.authority, source: module.source, anchor, text });
const coverage = (module, scope = 'complete') => ({ module_id: module.module_id,
  source: module.source, scope, evidence_ref: `${module.source}#audit` });

async function fixture() {
  const registry = await loadRegistry();
  const graph = await loadDependencyGraph({ registry });
  const proposal = prepareIntake(input, registry).proposal;
  const design = registry.modules.find(module => module.module_id === 'design-guide');
  const templates = registry.modules.find(module => module.module_id === 'responsive-templates');
  const mandate = registry.modules.find(module => module.module_id === 'consolidated-mandate');
  return { registry, graph, proposal, design, templates, mandate };
}

test('finds exact text and related wording with source anchors, without semantic verdict', async () => {
  const f = await fixture();
  const catalogue = { schema_version: '1.0.0', coverage: f.registry.modules.map(module => coverage(module)), rules: [
    rule(f.design, 'D-1', 'Buttons brauchen einen sichtbaren Fokuszustand.', '§ 4.2'),
    rule(f.templates, 'T-1', 'Buttons brauchen einen Fokuszustand bei Tastaturbedienung.', '§ 7'),
    rule(f.design, 'D-2', 'Fotos bleiben unverändert.', '§ 9'),
  ] };
  const before = structuredClone(catalogue);
  const result = assessSotImpact({ proposal: f.proposal, registry: f.registry, graph: f.graph, catalogue });
  assert.equal(result.owner.source, f.design.source);
  assert.ok(result.dependencies.downstream_modules.includes('responsive-templates'));
  assert.deepEqual(result.candidates.map(candidate => candidate.id), ['D-1', 'T-1']);
  assert.equal(result.candidates[0].comparison, 'EXACT_TEXT');
  assert.equal(result.candidates[1].comparison, 'POSSIBLY_RELATED_TEXT');
  assert.equal(result.semantic_equivalence, 'UNDETERMINED');
  assert.equal(result.conflict_check, 'PENDING');
  assert.equal(result.approval, null);
  assert.deepEqual(result.unknowns, []);
  assert.deepEqual(catalogue, before);
});

test('incomplete inventory reports unknowns even when no candidates are found', async () => {
  const f = await fixture();
  const result = assessSotImpact({ proposal: f.proposal, registry: f.registry, graph: f.graph,
    catalogue: { schema_version: '1.0.0', rules: [], coverage: [coverage(f.design, 'partial')] } });
  assert.deepEqual(result.candidates, []);
  assert.ok(result.unknowns.some(item => item.module_id === 'design-guide' && item.reason === 'RULE_CATALOGUE_COVERAGE_PARTIAL'));
  assert.ok(result.unknowns.some(item => item.module_id === 'responsive-templates' && item.reason === 'RULE_CATALOGUE_COVERAGE_MISSING'));
});

test('surfaces exact duplicate in another module but does not infer equivalence from one shared term', async () => {
  const f = await fixture();
  const analytics = f.registry.modules.find(module => module.module_id === 'analytics');
  const catalogue = { schema_version: '1.0.0', coverage: [coverage(f.design), coverage(f.templates), coverage(f.mandate)], rules: [
    rule(analytics, 'A-1', input.content, '§ A'),
    rule(f.design, 'D-1', 'Buttons sind orange.', '§ B'),
  ] };
  const result = assessSotImpact({ proposal: f.proposal, registry: f.registry, graph: f.graph, catalogue });
  assert.deepEqual(result.candidates.map(candidate => candidate.id), ['A-1']);
  assert.equal(result.candidates[0].relation, 'OTHER_REGISTERED_MODULE');
  assert.equal(result.semantic_equivalence, 'UNDETERMINED');
});

test('rejects forged owner and catalogue entries with mismatched authority or missing anchors', async () => {
  const f = await fixture();
  const catalogue = { schema_version: '1.0.0', coverage: [coverage(f.design)], rules: [
    { ...rule(f.design, 'D-1', input.content, '§ 1'), source: 'docs/ausbauplan.md', anchor: '' },
  ] };
  assert.equal(validateRuleCatalogue(catalogue, f.registry).valid, false);
  assert.throws(() => assessSotImpact({ proposal: f.proposal, registry: f.registry, graph: f.graph, catalogue }), /Invalid rule catalogue/);
  assert.throws(() => assessSotImpact({ proposal: { ...f.proposal, owner: { ...f.proposal.owner, source: 'docs/ausbauplan.md' } },
    registry: f.registry, graph: f.graph, catalogue: { schema_version: '1.0.0', coverage: [], rules: [] } }), /ownership differs/);
});
