import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from './module-registry.mjs';
import { assessProjectSotImpact } from './sot-impact.mjs';
import { extractHeadingSection, sectionSha256, validateRuleCatalogueSources } from './rule-catalogue.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const unique = values => [...new Set(values)].sort();
const sha256 = value => createHash('sha256').update(value).digest('hex');

/** Read-only heading index for planning an explicit, source-bound rule inventory. */
export function discoverSourceSections(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const headings = [];
  let fence = null;
  for (const [index, line] of lines.entries()) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1][0];
      else if (marker[1][0] === fence) fence = null;
      continue;
    }
    if (fence) continue;
    if (/^#{1,6} \S/.test(line)) headings.push({ heading: line, line: index + 1 });
  }
  const counts = new Map();
  for (const item of headings) counts.set(item.heading, (counts.get(item.heading) ?? 0) + 1);
  return headings.map(item => {
    let sectionHash = null;
    if (counts.get(item.heading) === 1) {
      try { sectionHash = sectionSha256(extractHeadingSection(source, item.heading)); }
      catch { /* A Markdown parser ambiguity must stay unverified. */ }
    }
    return { ...item, unique_heading: sectionHash !== null, section_sha256: sectionHash };
  });
}

export async function discoverRegisteredSections(registry, root = projectRoot) {
  registry ??= await loadRegistry();
  const modules = [];
  for (const module of registry.modules.filter(item => item.status === 'active_reference')) {
    const source = await readFile(resolve(root, module.source), 'utf8');
    modules.push({ module_id: module.module_id, source: module.source,
      source_sha256: sha256(source), sections: discoverSourceSections(source) });
  }
  return { schema_version: '1.0.0', modules };
}

/**
 * A scoped proof names complete sections; it does not infer that an omitted
 * section, module, or dependency is irrelevant. Existing impact unknowns are
 * preserved and always block automatic passage.
 */
export function assessScopedCoverage({ proposal, impact, catalogue, registry, requested_sections }) {
  if (impact?.proposal_id !== proposal?.id || !Array.isArray(impact?.unknowns)
    || !Array.isArray(impact?.cross_module_unknowns) || !Array.isArray(requested_sections)) {
    throw new Error('Matching proposal, verified impact and requested_sections are required.');
  }
  const activeModules = new Map(registry.modules.filter(item => item.status === 'active_reference')
    .map(item => [item.module_id, item]));
  const seen = new Set();
  const verified = [];
  const gaps = [];
  for (const [index, request] of requested_sections.entries()) {
    const key = `${request?.module_id ?? ''}:${request?.section_id ?? ''}`;
    if (!activeModules.has(request?.module_id) || !request?.section_id || seen.has(key)) {
      throw new Error(`requested_sections[${index}] has an unknown module, missing section or duplicate.`);
    }
    seen.add(key);
    const section = (catalogue.section_coverage ?? []).find(item => item.module_id === request.module_id
      && item.section_id === request.section_id && item.scope === 'complete_section');
    if (!section) {
      gaps.push({ module_id: request.module_id, section_id: request.section_id,
        reason: 'COMPLETE_SECTION_INVENTORY_MISSING' });
      continue;
    }
    verified.push({ module_id: section.module_id, section_id: section.section_id,
      source: section.source, heading: section.heading, section_sha256: section.section_sha256,
      rule_ids: [...section.rule_ids].sort(), evidence_ref: section.evidence_ref });
  }
  if (proposal.target_section_id && !verified.some(item => item.module_id === impact.owner.module_id
    && item.section_id === proposal.target_section_id)) {
    gaps.push({ module_id: impact.owner.module_id, section_id: proposal.target_section_id,
      reason: 'TARGET_SECTION_NOT_VERIFIED_IN_REQUEST' });
  }
  if (!requested_sections.length) gaps.push({ reason: 'NO_SCOPED_SECTION_REQUESTED' });
  const relevant = unique([impact.owner.module_id, ...impact.dependencies.upstream_modules,
    ...impact.dependencies.downstream_modules]);
  const searchedModules = unique(verified.map(item => item.module_id));
  for (const moduleId of relevant.filter(item => !searchedModules.includes(item))) {
    gaps.push({ module_id: moduleId, reason: 'RELEVANT_MODULE_HAS_NO_VERIFIED_SECTION' });
  }
  const unknowns = [...impact.unknowns, ...gaps];
  return { schema_version: '1.0.0', proposal_id: proposal.id,
    status: unknowns.length ? 'BLOCKED_UNKNOWN_COVERAGE' : 'STRUCTURALLY_COVERED_REVIEW_REQUIRED',
    verified_sections: verified.sort((a, b) => a.module_id.localeCompare(b.module_id)
      || a.section_id.localeCompare(b.section_id)), relevant_modules: relevant,
    unknowns, cross_module_unknowns: impact.cross_module_unknowns,
    semantic_equivalence: 'UNDETERMINED', conflict_check: 'PENDING', approval: null };
}

/** Always verify catalogue excerpts and section hashes against the current source first. */
export async function assessProjectScopedCoverage(proposal, requested_sections, catalogue) {
  const registry = await loadRegistry();
  const sourceCheck = await validateRuleCatalogueSources(catalogue, registry);
  if (!sourceCheck.valid) throw new Error(`Rule catalogue source verification failed: ${sourceCheck.errors.join('; ')}`);
  const impact = await assessProjectSotImpact(proposal, catalogue);
  return assessScopedCoverage({ proposal, impact, catalogue, registry, requested_sections });
}
