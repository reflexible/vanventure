import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import { discoverSourceSections } from './scoped-coverage.mjs';
import { readFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { loadRegistry } from './module-registry.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';
import { loadContracts } from './contracts.mjs';
import { assessSotImpact } from './sot-impact.mjs';
import { validateRuleCatalogueSources } from './rule-catalogue.mjs';

const hash = value => createHash('sha256').update(value).digest('hex');
const text = value => typeof value === 'string' && value.trim().length > 0;
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]));
  return value;
}
export const evidenceHash = value => hash(JSON.stringify(canonical(value)));

/** Bind a technical scope review to exact inputs. This is not an approval. */
export function scopeReviewBinding({ proposal, impact, registry, graph, catalogue, sources }) {
  const active = registry.modules.filter(module => module.status === 'active_reference');
  if (new Set(active.map(module => module.module_id)).size !== active.length) throw new Error('Duplicate module IDs.');
  const modules = active.map(module => {
    const source = sources[module.source];
    if (typeof source !== 'string') throw new Error(`Missing source: ${module.source}`);
    const sections = discoverSourceSections(source);
    if (sections.some(section => !section.unique_heading)) throw new Error(`Ambiguous headings: ${module.source}`);
    // Preamble is a separate review unit, including a heading-free document.
    const firstLine = sections[0]?.line ?? source.split(/\r?\n/).length + 1;
    return { module_id: module.module_id, source: module.source, source_sha256: hash(source),
      sections: [{ heading: '@preamble', section_sha256: hash(source.split(/\r?\n/).slice(0, firstLine - 1).join('\n')) },
        ...sections.map(({ heading, section_sha256 }) => ({ heading, section_sha256 }))] };
  }).sort((a, b) => a.module_id.localeCompare(b.module_id));
  return { proposal_sha256: evidenceHash(proposal), impact_sha256: evidenceHash(impact), registry_sha256: evidenceHash(registry),
    graph_sha256: evidenceHash(graph), catalogue_sha256: evidenceHash(catalogue), modules };
}

/**
 * Each source section must receive an explicit reviewer disposition. Exclusions
 * are never inferred from text search or a missing dependency edge. Historical
 * catalogue gaps remain visible separately from this exact proposal's scope.
 */
export function assessReviewedScope({ proposal, impact, registry, graph, catalogue,
  sources, review, verifyReviewer }) {
  const errors = [];
  let binding;
  try { binding = scopeReviewBinding({ proposal, impact, registry, graph, catalogue, sources }); }
  catch (error) { return { status: 'SCOPE_REVIEW_BLOCKED', errors: [error.message] }; }
  if (impact?.proposal_id !== proposal?.id || !Array.isArray(impact?.unknowns)
      || !Array.isArray(impact?.cross_module_unknowns) || !Array.isArray(impact?.candidates)) return { status: 'SCOPE_REVIEW_BLOCKED', errors: ['MATCHING_IMPACT_REQUIRED'] };
  if ([...(impact?.unknowns ?? []), ...(impact?.cross_module_unknowns ?? [])].some(item => !['RULE_CATALOGUE_COVERAGE_MISSING', 'RULE_CATALOGUE_COVERAGE_PARTIAL'].includes(item.reason)
      || !binding.modules.some(module => module.module_id === item.module_id))) errors.push('NON_CATALOGUE_UNKNOWNS_REMAIN');
  if (!isDeepStrictEqual(binding, review?.binding)) errors.push('STALE_OR_INCOMPLETE_REVIEW_BINDING');
  if (review?.schema_version !== '1.0.0' || !text(review?.reviewer) || !text(review?.evidence_ref)
      || !text(review?.reviewed_at) || !Number.isFinite(Date.parse(review.reviewed_at))) errors.push('REVIEW_PROVENANCE_REQUIRED');
  try {
    if (typeof verifyReviewer !== 'function' || verifyReviewer(structuredClone(review)) !== true) errors.push('AUTHENTICATED_SCOPE_REVIEW_REQUIRED');
  } catch { errors.push('AUTHENTICATED_SCOPE_REVIEW_REQUIRED'); }
  if (!Array.isArray(review?.sections)) errors.push('SECTION_DISPOSITIONS_REQUIRED');
  if (!Array.isArray(review?.unresolved_references) || review.unresolved_references.length) errors.push('UNRESOLVED_REFERENCES');
  const included = new Set();
  const exclusions = [];
  const expected = new Map(binding.modules.flatMap(module => module.sections.map(section =>
    [`${module.module_id}:${section.heading}`, { ...section, module_id: module.module_id, source: module.source }])));
  const seen = new Set();
  for (const entry of Array.isArray(review?.sections) ? review.sections : []) {
    if (!entry || typeof entry !== 'object') { errors.push('INVALID_SECTION_RECORD'); continue; }
    const key = `${entry.module_id}:${entry.heading}`;
    const section = expected.get(key);
    if (!section || seen.has(key) || entry.section_sha256 !== section.section_sha256) { errors.push(`INVALID_SECTION:${key}`); continue; }
    seen.add(key);
    if (!text(entry.rationale) || !text(entry.evidence_ref)) errors.push(`MISSING_SECTION_REASON:${key}`);
    if (entry.disposition === 'INCLUDED_RULE_SCOPE') {
      const inventory = (catalogue.section_coverage ?? []).find(item => item.module_id === entry.module_id
        && item.heading === entry.heading && item.section_sha256 === entry.section_sha256 && item.scope === 'complete_section');
      if (!inventory || !isDeepStrictEqual([...(entry.rule_ids ?? [])].sort(), [...inventory.rule_ids].sort())) errors.push(`COMPLETE_INVENTORY_REQUIRED:${key}`);
      else for (const id of inventory.rule_ids) included.add(id);
    } else if (entry.disposition === 'EXCLUDED_FROM_RULE_SCOPE' || entry.disposition === 'CONTEXT_CONTAINER') {
      exclusions.push({ ...entry });
    } else errors.push(`UNRESOLVED_SECTION:${key}`);
  }
  for (const key of expected.keys()) if (!seen.has(key)) errors.push(`MISSING_SECTION:${key}`);
  const target = (catalogue.section_coverage ?? []).find(item => item.module_id === proposal?.owner?.module_id
    && item.section_id === proposal?.target_section_id);
  if (!target || !Array.isArray(review?.sections) || !review.sections.some(entry => entry?.module_id === target.module_id
    && entry.heading === target.heading && entry.disposition === 'INCLUDED_RULE_SCOPE')) errors.push('TARGET_SCOPE_NOT_INCLUDED');
  // Text search is not exhaustive: every included rule must be classified later.
  const candidates = new Map((impact?.candidates ?? []).map(candidate => [candidate.id, candidate]));
  for (const id of included) {
    const rule = catalogue.rules.find(item => item.id === id);
    if (!rule) { errors.push(`MISSING_RULE:${id}`); continue; }
    if (!candidates.has(id)) candidates.set(id, { id, module_id: rule.module_id, authority: rule.authority,
      source: rule.source, anchor: rule.anchor, comparison: 'REVIEWED_SCOPE_RULE', review_required: true });
  }
  if (errors.length) return { status: 'SCOPE_REVIEW_BLOCKED', errors };
  const scopeEvidence = { review_sha256: evidenceHash(review), binding, reviewer: review.reviewer,
    evidence_ref: review.evidence_ref, exclusions, global_unknowns: structuredClone(impact.unknowns),
    global_cross_module_unknowns: structuredClone(impact.cross_module_unknowns),
    write_authorization: false, unchanged_bytes_verified: false };
  return { status: 'SCOPED_REVIEW_COMPLETE', errors: [], scope_evidence: scopeEvidence,
    coverage: { schema_version: '1.0.0', proposal_id: proposal.id,
      status: 'STRUCTURALLY_COVERED_REVIEW_REQUIRED', unknowns: [], cross_module_unknowns: [],
      scope_evidence: scopeEvidence, semantic_equivalence: 'UNDETERMINED', conflict_check: 'PENDING', approval: null },
    impact: { ...structuredClone(impact), candidates: [...candidates.values()].sort((a, b) => a.id.localeCompare(b.id)),
      unknowns: [], cross_module_unknowns: [], scope_evidence: scopeEvidence,
      module_coverage: impact.module_coverage, semantic_equivalence: 'UNDETERMINED', conflict_check: 'PENDING', approval: null } };
}

/** Disk entry point validates exact source inventories and recomputes impact. */
export async function assessProjectReviewedScope({ proposal, catalogue, review, verifyReviewer, projectRoot }) {
  if (!isAbsolute(projectRoot ?? '')) throw new Error('Absolute projectRoot required.');
  const snapshots = {};
  async function snapshot(path) {
    const rel = relative(projectRoot, resolve(projectRoot, path));
    if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error('Source escapes projectRoot.');
    const bytes = await readFile(resolve(projectRoot, path));
    const source = bytes.toString('utf8');
    if (!Buffer.from(source, 'utf8').equals(bytes)) throw new Error(`SOURCE_NOT_VALID_UTF8:${path}`);
    if (Object.hasOwn(snapshots, path) && snapshots[path] !== source) throw new Error('SOURCE_CHANGED_DURING_REVIEW');
    snapshots[path] = source;
    return source;
  }
  await snapshot('docs/governance/module-registry.json');
  const registry = await loadRegistry(resolve(projectRoot, 'docs/governance/module-registry.json'), { projectRoot });
  const graphPath = 'docs/governance/dependency-graph.json';
  const supplement = JSON.parse(await snapshot(graphPath));
  await snapshot('docs/governance/contracts.json');
  const contracts = await loadContracts(resolve(projectRoot, 'docs/governance/contracts.json'), { registry, projectRoot });
  const epicText = await snapshot(supplement.sources.work_items);
  const graph = await loadDependencyGraph({ graphPath: resolve(projectRoot, graphPath), registry, contracts, epicText });
  const sources = {};
  for (const module of registry.modules.filter(item => item.status === 'active_reference')) {
    sources[module.source] = await snapshot(module.source);
  }
  const sourceCheck = await validateRuleCatalogueSources(catalogue, registry, projectRoot);
  if (!sourceCheck.valid) return { status: 'SCOPE_REVIEW_BLOCKED', errors: sourceCheck.errors };
  const result = assessReviewedScope({ proposal, catalogue, review, verifyReviewer, registry, graph, sources,
    impact: assessSotImpact({ proposal, catalogue, registry, graph }) });
  // Source verification and review must refer to the same bytes.
  for (const [path, source] of Object.entries(snapshots)) {
    if (!(await readFile(resolve(projectRoot, path))).equals(Buffer.from(source, 'utf8'))) return { status: 'SCOPE_REVIEW_BLOCKED', errors: ['SOURCE_CHANGED_DURING_REVIEW'] };
  }
  return result;
}
