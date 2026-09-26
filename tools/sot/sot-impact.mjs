import { loadRegistry, lookupAuthority } from './module-registry.mjs';
import { computeImpact, loadDependencyGraph, validateDependencyGraph } from './dependency-graph.mjs';

const isText = value => typeof value === 'string' && value.trim().length > 0;
const sorted = values => [...new Set(values)].sort();
const normalizedText = value => value.trim().replace(/\s+/g, ' ');
const stopWords = new Set(['and', 'the', 'for', 'with', 'from', 'eine', 'einer', 'eines', 'einem', 'einen', 'sind', 'wird', 'werden', 'oder', 'und', 'der', 'die', 'das', 'den', 'dem', 'des', 'auf', 'mit', 'von', 'für', 'bei', 'ist', 'nicht', 'nur']);
const tokens = value => new Set((value.toLocaleLowerCase('de').match(/[\p{L}\p{N}]{3,}/gu) ?? []).filter(word => !stopWords.has(word)));

/** Rule catalogue is explicit evidence, not an inferred inventory from markdown. */
export function validateRuleCatalogue(catalogue, registry) {
  const errors = [];
  if (catalogue?.schema_version !== '1.0.0' || !Array.isArray(catalogue.rules) || !Array.isArray(catalogue.coverage)) {
    return { valid: false, errors: ['Rule catalogue requires schema_version 1.0.0, rules and coverage arrays.'] };
  }
  const seen = new Set();
  const modules = new Map(registry.modules.map(module => [module.module_id, module]));
  for (const [index, rule] of catalogue.rules.entries()) {
    if (!isText(rule?.id) || seen.has(rule.id)) errors.push(`rules[${index}] needs a unique ID.`);
    seen.add(rule?.id);
    const owner = modules.get(rule?.module_id);
    if (!owner || owner.authority !== rule.authority || owner.source !== rule.source) {
      errors.push(`rules[${index}] does not match its registered authority and source.`);
    }
    if (!isText(rule?.anchor) || !isText(rule?.text)) errors.push(`rules[${index}] needs a source anchor and text.`);
  }
  const covered = new Set();
  for (const [index, item] of catalogue.coverage.entries()) {
    const owner = modules.get(item?.module_id);
    if (!owner || owner.source !== item.source || !['complete', 'partial'].includes(item.scope) || !isText(item.evidence_ref)) {
      errors.push(`coverage[${index}] needs a registered module/source, scope and evidence_ref.`);
    }
    if (covered.has(item?.module_id)) errors.push(`coverage[${index}] duplicates module coverage.`);
    covered.add(item?.module_id);
  }
  if (catalogue.section_coverage !== undefined && !Array.isArray(catalogue.section_coverage)) {
    errors.push('section_coverage must be an array.');
  }
  const sectionIds = new Set();
  for (const [index, item] of (Array.isArray(catalogue.section_coverage) ? catalogue.section_coverage : []).entries()) {
    const owner = modules.get(item?.module_id);
    if (!isText(item?.section_id) || sectionIds.has(item.section_id)) errors.push(`section_coverage[${index}] needs a unique section ID.`);
    sectionIds.add(item?.section_id);
    if (!owner || owner.source !== item.source || item.scope !== 'complete_section'
      || !isText(item.heading) || !isText(item.evidence_ref) || !isText(item.remaining_outside_section)
      || !/^[a-f0-9]{64}$/.test(item.section_sha256 ?? '') || !Array.isArray(item.rule_ids)) {
      errors.push(`section_coverage[${index}] has invalid owner, section scope or evidence.`);
    }
    const actual = catalogue.rules.filter(rule => rule.section_id === item.section_id).map(rule => rule.id).sort();
    if (Array.isArray(item.rule_ids) && (new Set(item.rule_ids).size !== item.rule_ids.length
      || JSON.stringify([...item.rule_ids].sort()) !== JSON.stringify(actual))) {
      errors.push(`section_coverage[${index}] rule IDs do not match the declared section.`);
    }
    if (catalogue.coverage.find(entry => entry.module_id === item.module_id)?.scope !== 'partial') {
      errors.push(`section_coverage[${index}] cannot imply complete module coverage.`);
    }
  }
  for (const rule of catalogue.rules.filter(rule => rule.section_id !== undefined)) {
    if (!sectionIds.has(rule.section_id)) errors.push(`${rule.id}: undeclared section_id.`);
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Read-only candidate search for a validated intake proposal. Text overlap is
 * only a review hint; it never proves equivalence, conflict, or permission to
 * supersede an existing rule. A missing catalogue/coverage remains unknown.
 */
export function assessSotImpact({ proposal, registry, graph, catalogue }) {
  if (!proposal || !isText(proposal.id) || !isText(proposal.content) || !isText(proposal.authority)
    || !proposal.owner || proposal.impact_check !== 'PENDING' || proposal.integration !== 'NOT_STARTED') {
    throw new Error('A valid, non-integrated intake proposal is required.');
  }
  if (!registry || !Array.isArray(registry.modules)) throw new Error('A validated module registry is required.');
  const owner = lookupAuthority(registry, proposal.authority);
  if (!owner || owner.status !== 'active_reference' || owner.module_id !== proposal.owner.module_id
    || owner.source !== proposal.owner.source) throw new Error('Proposal ownership differs from active registry authority.');
  const graphCheck = validateDependencyGraph(graph);
  if (!graphCheck.valid) throw new Error(`Invalid dependency graph: ${graphCheck.errors.join('; ')}`);
  const graphId = `module:${owner.module_id}`;
  if (!graph.nodes.some(node => node.id === graphId)) throw new Error('Owner is missing from dependency graph.');
  const catalogueCheck = validateRuleCatalogue(catalogue, registry);
  if (!catalogueCheck.valid) throw new Error(`Invalid rule catalogue: ${catalogueCheck.errors.join('; ')}`);

  const downstream = computeImpact(graph, graphId).transitive.filter(id => id.startsWith('module:')).map(id => id.slice(7));
  const upstream = graph.edges.filter(edge => edge.to === graphId && edge.relation === 'depends_on'
    && edge.from.startsWith('module:')).map(edge => edge.from.slice(7));
  const relevantIds = new Set([owner.module_id, ...upstream, ...downstream]);
  const proposalTokens = tokens(proposal.content);
  const candidates = [];
  for (const rule of catalogue.rules) {
    const exact = normalizedText(rule.text) === normalizedText(proposal.content);
    // Exact duplicates are searched across the whole registered catalogue;
    // loose wording matches stay inside the impacted dependency neighbourhood.
    if (!exact && !relevantIds.has(rule.module_id)) continue;
    const shared = [...tokens(rule.text)].filter(token => proposalTokens.has(token));
    const similarity = proposalTokens.size && tokens(rule.text).size
      ? shared.length / Math.max(proposalTokens.size, tokens(rule.text).size) : 0;
    if (!exact && (shared.length < 2 || similarity < 0.2)) continue;
    candidates.push({ id: rule.id, module_id: rule.module_id, authority: rule.authority,
      source: rule.source, anchor: rule.anchor, comparison: exact ? 'EXACT_TEXT' : 'POSSIBLY_RELATED_TEXT',
      relation: rule.module_id === owner.module_id ? 'OWNER' : relevantIds.has(rule.module_id) ? 'DEPENDENCY' : 'OTHER_REGISTERED_MODULE',
      shared_terms: exact ? [] : shared.sort(), review_required: true });
  }
  candidates.sort((a, b) => Number(b.comparison === 'EXACT_TEXT') - Number(a.comparison === 'EXACT_TEXT')
    || Number(b.module_id === owner.module_id) - Number(a.module_id === owner.module_id)
    || a.id.localeCompare(b.id));

  const coverage = catalogue.coverage;
  const unknowns = [];
  for (const moduleId of sorted(registry.modules.filter(module => module.status === 'active_reference').map(module => module.module_id))) {
    const item = coverage.find(entry => entry.module_id === moduleId);
    if (!item) unknowns.push({ module_id: moduleId, reason: 'RULE_CATALOGUE_COVERAGE_MISSING' });
    else if (item.scope !== 'complete') unknowns.push({ module_id: moduleId, reason: 'RULE_CATALOGUE_COVERAGE_PARTIAL' });
  }
  const ownerSection = (catalogue.section_coverage ?? []).find(item => item.module_id === owner.module_id
    && item.section_id === proposal.target_section_id);
  const ownerSectionRules = ownerSection ? catalogue.rules.filter(rule => rule.section_id === ownerSection.section_id) : [];
  const ownerSectionCandidates = candidates.filter(candidate => ownerSectionRules.some(rule => rule.id === candidate.id));
  return {
    schema_version: '1.0.0', proposal_id: proposal.id,
    owner: { module_id: owner.module_id, authority: owner.authority, source: owner.source },
    dependencies: { upstream_modules: sorted(upstream), downstream_modules: sorted(downstream) },
    related_text_search_modules: sorted(relevantIds), exact_text_search_modules: sorted(catalogue.coverage.map(item => item.module_id)),
    candidates, unknowns,
    owner_section_search: {
      requested_section_id: proposal.target_section_id ?? null,
      scope_rationale: proposal.scope_rationale ?? null,
      status: ownerSection ? 'DECLARED_SECTION_INVENTORY_SEARCHED_SOURCE_VALIDATION_REQUIRED' : 'UNKNOWN_OR_NOT_REQUESTED',
      section_sha256: ownerSection?.section_sha256 ?? null,
      evidence_ref: ownerSection?.evidence_ref ?? null,
      searched_rule_ids: ownerSectionRules.map(rule => rule.id).sort(),
      candidate_ids: ownerSectionCandidates.map(candidate => candidate.id),
    },
    module_coverage: coverage.find(item => item.module_id === owner.module_id)?.scope ?? 'missing',
    cross_module_unknowns: unknowns.filter(item => item.module_id !== owner.module_id),
    conflict_check: 'PENDING', semantic_equivalence: 'UNDETERMINED', approval: null,
  };
}

/** Project entry point still requires a caller-supplied, evidence-backed catalogue. */
export async function assessProjectSotImpact(proposal, catalogue) {
  const registry = await loadRegistry();
  const graph = await loadDependencyGraph({ registry });
  const { validateRuleCatalogueSources } = await import('./rule-catalogue.mjs');
  const sourceCheck = await validateRuleCatalogueSources(catalogue, registry);
  if (!sourceCheck.valid) throw new Error(`Rule catalogue source verification failed: ${sourceCheck.errors.join('; ')}`);
  const result = assessSotImpact({ proposal, registry, graph, catalogue });
  if (result.owner_section_search.status === 'DECLARED_SECTION_INVENTORY_SEARCHED_SOURCE_VALIDATION_REQUIRED') {
    result.owner_section_search.status = 'VERIFIED_SECTION_INVENTORY_SEARCHED';
  }
  return result;
}
