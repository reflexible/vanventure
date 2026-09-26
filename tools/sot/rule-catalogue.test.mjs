import assert from 'node:assert/strict';
import test from 'node:test';
import { loadRegistry } from './module-registry.mjs';
import { loadRuleCatalogue, validateRuleCatalogueSources } from './rule-catalogue.mjs';

async function fixture() {
  return { registry: await loadRegistry(), catalogue: await loadRuleCatalogue() };
}

test('catalogues cited rules across every registered module with honest partial coverage', async () => {
  const { registry, catalogue } = await fixture();
  const result = await validateRuleCatalogueSources(catalogue, registry);
  assert.equal(result.valid, true, result.errors.join('; '));
  assert.equal(result.mapped_rules, 21);
  assert.deepEqual(result.verified_sections, ['DEC-REL-002']);
  assert.deepEqual(result.partial_modules,
    registry.modules.filter(module => module.status === 'active_reference').map(module => module.module_id).sort());
  assert.ok(catalogue.coverage.every(entry => entry.scope === 'partial' && entry.remaining));
});

test('complete section inventory fails on stale hash, omitted sentence, wrong heading or wrong scope', async () => {
  const { registry, catalogue } = await fixture();
  const staleHash = structuredClone(catalogue);
  staleHash.section_coverage[0].section_sha256 = '0'.repeat(64);
  assert.match((await validateRuleCatalogueSources(staleHash, registry)).errors.join('; '), /section SHA-256 is stale/);
  const missingRule = structuredClone(catalogue);
  missingRule.rules = missingRule.rules.filter(rule => rule.id !== 'RELEASE-004');
  missingRule.section_coverage[0].rule_ids = ['RELEASE-002'];
  missingRule.coverage.find(item => item.module_id === 'release-governance').mapped_rule_count = 3;
  assert.match((await validateRuleCatalogueSources(missingRule, registry)).errors.join('; '), /section rule inventory is incomplete/);
  const wrongHeading = structuredClone(catalogue);
  wrongHeading.section_coverage[0].heading = '## DEC-REL-001 â€“ ausdrÃ¼ckliche Freigabe je Release-Umfang';
  assert.equal((await validateRuleCatalogueSources(wrongHeading, registry)).valid, false);
  const wrongScope = structuredClone(catalogue);
  wrongScope.section_coverage[0].scope = 'complete_module';
  assert.equal((await validateRuleCatalogueSources(wrongScope, registry)).valid, false);
});

test('stale heading and source wording fail closed', async () => {
  const { registry, catalogue } = await fixture();
  const staleAnchor = structuredClone(catalogue);
  staleAnchor.rules[0].anchor += ' stale';
  assert.match((await validateRuleCatalogueSources(staleAnchor, registry)).errors.join('; '), /anchor is missing/);
  const staleText = structuredClone(catalogue);
  staleText.rules[0].text += ' stale';
  assert.match((await validateRuleCatalogueSources(staleText, registry)).errors.join('; '), /text is stale/);
  const wrongSection = structuredClone(catalogue);
  wrongSection.rules[0].anchor = '## Planning Coverage und Implementation Verification';
  assert.match((await validateRuleCatalogueSources(wrongSection, registry)).errors.join('; '), /text is stale/);
});

test('authority mismatch, stale counts, missing unknowns and unproven complete coverage fail closed', async () => {
  const { registry, catalogue } = await fixture();
  const wrongAuthority = structuredClone(catalogue);
  wrongAuthority.rules[0].authority = 'website.analytics';
  assert.equal((await validateRuleCatalogueSources(wrongAuthority, registry)).valid, false);
  const staleCount = structuredClone(catalogue);
  staleCount.coverage[0].mapped_rule_count = 0;
  assert.match((await validateRuleCatalogueSources(staleCount, registry)).errors.join('; '), /count is stale/);
  const missingUnknowns = structuredClone(catalogue);
  delete missingUnknowns.coverage[0].remaining;
  assert.match((await validateRuleCatalogueSources(missingUnknowns, registry)).errors.join('; '), /remaining unknowns/);
  const falseComplete = structuredClone(catalogue);
  falseComplete.coverage[0].scope = 'complete';
  assert.match((await validateRuleCatalogueSources(falseComplete, registry)).errors.join('; '), /exhaustive inventory/);
});
