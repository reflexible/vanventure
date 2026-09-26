import { computeImpact, validateDependencyGraph } from './dependency-graph.mjs';

const FULL_TYPES = new Set([
  'SCRUM_CORE', 'DEFINITION_OF_DONE', 'WORK_ITEM_LIFECYCLE', 'STATUS_MODEL',
  'BOARD_FAST_TRACK', 'APPROVAL_REVIEW_GATE', 'WORKER_AGENT_RULE',
  'SOT_GOVERNANCE', 'SECURITY_AUTH', 'FUNDAMENTAL_DATA_MODEL',
  'CROSS_DOMAIN', 'MULTIPLE_CORE_MODULES', 'CONTRACT_BREAK', 'UNKNOWN_IMPACT',
  'INCONSISTENCY', 'MAJOR_FEATURE', 'GLOBAL_RULE', 'ACTIVE_WORK_CONFLICT',
  'SOT_RESTRUCTURE', 'HIGH_IMPACT',
]);
const CHANGE_KINDS = new Set(['FORMAT_ONLY', 'REFERENCE_ADDITION', 'ADDITIVE_INTEGRATION', 'SEMANTIC', 'UNKNOWN']);
const CORE_MODULES = new Set(['scrum-core', 'sot-architecture', 'consolidated-mandate']);
const SECTION_TRIGGERS = [
  [/definition[ -]of[ -]done|definition[ -]of[ -]ready/i, 'DEFINITION_OF_DONE'],
  [/work[ -]item[ -]lifecycle|lifecycle/i, 'WORK_ITEM_LIFECYCLE'],
  [/statusmodell|status[ -]model/i, 'STATUS_MODEL'],
  [/board|fast[ -]track/i, 'BOARD_FAST_TRACK'],
  [/approval|review[ -]gate|freigabe/i, 'APPROVAL_REVIEW_GATE'],
  [/worker|agent[ -]grundregel/i, 'WORKER_AGENT_RULE'],
  [/security|authentifizierung|authorization|sicherheit/i, 'SECURITY_AUTH'],
  [/data[ -]model|datenmodell/i, 'FUNDAMENTAL_DATA_MODEL'],
];
const sort = values => [...new Set(values)].sort();

/**
 * Determine an impact-scoped check from an explicit change description and an
 * already computed delta. Unknown meaning or ownership escalates; this function
 * never infers semantic equality from equal bytes or prose alone.
 *
 * change: {kind, impact_types?, changed_sections?, semantic_review?:
 *   {verified: boolean, evidence_ref: string}, module_ids?, active_processes?:
 *   [{id, module_ids?, work_item_ids?, conflict?: boolean}]}
 */
export function assessImpact({ change, delta, graph }) {
  if (!change || !CHANGE_KINDS.has(change.kind)) throw new Error('An explicit supported change.kind is required.');
  if (!delta || !Array.isArray(delta.modules) || !Array.isArray(delta.contracts)) throw new Error('A computed delta is required.');
  const graphCheck = validateDependencyGraph(graph);
  if (!graphCheck.valid) throw new Error(`Invalid dependency graph: ${graphCheck.errors.join('; ')}`);
  const impactTypes = sort(change.impact_types ?? []);
  for (const type of impactTypes) if (!FULL_TYPES.has(type)) throw new Error(`Unknown impact type ${type}.`);
  const graphIds = new Set(graph.nodes.map(node => node.id));
  const changedModules = sort([...delta.modules.map(module => module.module_id), ...(change.module_ids ?? [])]);
  const unresolvedModules = changedModules.filter(module => !graphIds.has(`module:${module}`));
  const direct = new Set();
  const transitive = new Set();
  const affected = new Set(changedModules.map(module => `module:${module}`));
  const structural = node => node.startsWith('module:') || node.startsWith('contract:');
  for (const module of changedModules) {
    if (!graphIds.has(`module:${module}`)) continue;
    const result = computeImpact(graph, `module:${module}`);
    result.direct.filter(structural).forEach(node => direct.add(node));
    result.transitive.filter(structural).forEach(node => transitive.add(node));
  }
  // A change at either end of an interface needs its contract in scope. The
  // graph's forward traversal alone misses contracts incoming to a consumer.
  const boundaryContracts = graph.edges.flatMap(edge => {
    const fromChanged = changedModules.some(module => edge.from === `module:${module}`);
    const toChanged = changedModules.some(module => edge.to === `module:${module}`);
    if (fromChanged && edge.to.startsWith('contract:')) return [edge.to];
    if (toChanged && edge.from.startsWith('contract:')) return [edge.from];
    return [];
  });
  boundaryContracts.forEach(contract => {
    affected.add(contract);
    for (const edge of graph.edges) {
      if (edge.from === contract && edge.to.startsWith('module:')) direct.add(edge.to);
      if (edge.to === contract && edge.from.startsWith('module:')) direct.add(edge.from);
    }
  });
  const changedContracts = sort(delta.contracts.map(contract => contract.contract_id));
  changedContracts.forEach(contract => {
    const node = `contract:${contract}`;
    if (graphIds.has(node)) {
      affected.add(node);
      const result = computeImpact(graph, node);
      result.direct.filter(structural).forEach(item => direct.add(item));
      result.transitive.filter(structural).forEach(item => transitive.add(item));
    }
  });
  // Registry membership means a story is housed in this module; it does not
  // make every story an affected verification target. Only explicit section or
  // work-item seeds may enter the work-item dependency subgraph.
  const sectionRefs = (change.changed_sections ?? []).flatMap(section =>
    [...String(section).matchAll(/\b(?:ST-SOT-\d{2}|WI-SOT-\d{2}-\d{2})\b/g)].map(match => match[0]));
  const workSeeds = sort([...sectionRefs, ...(change.work_item_ids ?? [])]);
  for (const ref of workSeeds) {
    const node = `${ref.startsWith('ST-') ? 'story' : 'work_item'}:${ref}`;
    if (!graphIds.has(node)) continue;
    affected.add(node);
    for (const edge of graph.edges) {
      if (edge.from !== node) continue;
      if (edge.relation === 'belongs_to' && edge.to.startsWith('work_item:')) direct.add(edge.to);
      if (edge.relation === 'depends_on' && edge.to.startsWith('story:')) transitive.add(edge.to);
      if (edge.relation === 'claims' && edge.to.startsWith('worker:')) direct.add(edge.to);
    }
  }
  for (const edge of graph.edges) {
    if (edge.relation === 'claims' && (affected.has(edge.from) || direct.has(edge.from))) direct.add(edge.to);
  }
  const all = new Set([...affected, ...direct, ...transitive]);
  const byType = type => sort([...all].filter(node => node.startsWith(`${type}:`)).map(node => node.slice(type.length + 1)));
  const changedContractIds = new Set(changedContracts);
  const contracts = sort([...byType('contract'), ...changedContracts]);
  const workItems = byType('work_item');
  const processes = [];
  for (const process of change.active_processes ?? []) {
    if (!process?.id) throw new Error('An active process needs an id.');
    const overlapModules = (process.module_ids ?? []).some(id => changedModules.includes(id) || byType('module').includes(id));
    const overlapItems = (process.work_item_ids ?? []).some(id => workItems.includes(id));
    if (overlapModules || overlapItems || process.conflict) processes.push({
      id: process.id, conflict: Boolean(process.conflict),
      module_ids: sort(process.module_ids ?? []), work_item_ids: sort(process.work_item_ids ?? []),
    });
  }
  const workerIds = byType('worker');
  for (const id of workerIds) if (!processes.some(process => process.id === id)) processes.push({ id, conflict: false, module_ids: [], work_item_ids: [] });
  processes.sort((a, b) => a.id.localeCompare(b.id));

  const reasons = [];
  const full = reason => { if (!reasons.includes(reason)) reasons.push(reason); };
  for (const type of impactTypes) full(`FULL_TRIGGER:${type}`);
  for (const section of change.changed_sections ?? []) {
    for (const [pattern, type] of SECTION_TRIGGERS) if (pattern.test(section)) full(`FULL_TRIGGER:${type}`);
  }
  if (unresolvedModules.length) full(`UNKNOWN_MODULE:${unresolvedModules.join(',')}`);
  if (delta.contract_comparison_unknown === true && changedModules.length) full('CONTRACT_COMPARISON_UNAVAILABLE');
  if (delta.has_contract_break || delta.contracts.some(contract => contract.kind === 'REMOVED'
    || contract.kind === 'BREAKING' || contract.breaking?.length || !contract.version_valid)) full('CONTRACT_BREAK');
  for (const contract of changedContracts) if (!graphIds.has(`contract:${contract}`)) full(`UNKNOWN_CONTRACT:${contract}`);
  if (processes.some(process => process.conflict)) full('ACTIVE_WORK_CONFLICT');
  if (change.kind === 'UNKNOWN') full('UNKNOWN_CHANGE_KIND');
  const semanticUnknown = delta.modules.some(module => module.classification === 'TEXT_CHANGED_SEMANTICS_UNVERIFIED');
  if (semanticUnknown && !(change.semantic_review?.verified && change.semantic_review.evidence_ref)) full('SEMANTIC_IMPACT_UNVERIFIED');
  if (delta.modules.some(module => module.semantic_manifest_match === false) && change.kind !== 'SEMANTIC') full('SEMANTIC_MANIFEST_CHANGED');
  const hasCore = changedModules.includes('scrum-core');
  const safeCoreAddition = ['REFERENCE_ADDITION', 'ADDITIVE_INTEGRATION'].includes(change.kind)
    && change.semantic_review?.verified === true && Boolean(change.semantic_review.evidence_ref)
    && !delta.modules.some(module => module.module_id === 'scrum-core' && module.semantic_manifest_match === false);
  if (hasCore && !safeCoreAddition && change.kind !== 'FORMAT_ONLY') full('SCRUM_CORE_CHANGE');
  if (changedModules.filter(module => CORE_MODULES.has(module)).length > 1) full('MULTIPLE_CORE_MODULES');
  if (change.kind === 'SEMANTIC' && changedModules.some(module => ['sot-architecture', 'consolidated-mandate'].includes(module))) full('SOT_GOVERNANCE');
  if (changedModules.length > 1 && changedModules.some(module => module === 'analytics') && changedModules.some(module => module === 'cms-content')) full('CROSS_DOMAIN');
  if (change.kind === 'FORMAT_ONLY' && delta.modules.some(module => module.classification !== 'FORMAT_ONLY')) full('DECLARED_FORMAT_ONLY_DISAGREES_WITH_DELTA');
  const hasDelta = delta.modules.length > 0 || delta.contracts.length > 0;
  const mode = reasons.length ? 'FULL_CHECK' : !hasDelta || (change.kind === 'FORMAT_ONLY' && delta.contracts.length === 0) ? 'NO_CHECK' : 'FAST_CHECK';
  return {
    schema_version: '1.0.0',
    change_kind: change.kind,
    mode,
    alert: mode === 'FULL_CHECK' ? '⚠ FULL CHECK REQUIRED' : null,
    reasons: sort(reasons.length ? reasons : [mode === 'NO_CHECK' ? 'NO_SEMANTIC_OR_CONTRACT_DELTA' : 'SCOPED_CHANGE']),
    scope: {
      changed_sections: sort(change.changed_sections ?? []),
      changed_modules: changedModules,
      unresolved_modules: unresolvedModules,
      direct_nodes: sort(direct),
      transitive_nodes: sort(transitive),
      modules: byType('module'),
      contracts,
      work_items: workItems,
      stories: byType('story'),
      active_processes: processes,
    },
  };
}
