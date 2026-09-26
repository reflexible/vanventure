import { createHash } from 'node:crypto';
import { countWorkItems } from './progress.mjs';
import { validateDependencyGraph } from './dependency-graph.mjs';
import { runtimeWorkers, activeProcesses } from './worker-state.mjs';

const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;
const digest = value => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');
const pathKey = value => {
  if (!text(value) || value.includes('\\') || value.startsWith('/') || value.includes(':')
      || value.split('/').some(part => !part || part === '.' || part === '..')) throw new Error('INVALID_ANALYZED_PATH');
  return value.toLowerCase(); // Windows project paths are case-insensitive.
};
const overlap = (a, b) => a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`);

/** Derived planning only. Analyses are explicit current scope-review inputs, never a second backlog.
 * No claims, Ready transitions, WSJF activation, assignments or file writes are performed.
 */
export function planExecution({ backlog, graph, state, scopeAnalyses = {}, forbiddenScopes = ['docs/scrum-plan.md'] }) {
  const errors = []; const exclusions = []; const current = []; const candidates = [];
  let counts; let workers = { workers: [] };
  const output = () => ({ status: errors.length ? 'EXECUTION_PLAN_BLOCKED' : 'EXECUTION_PLAN_DERIVED', errors,
    counter: counts ? { Done: counts.done, Total: counts.total, Open: counts.open, 'Progress %': counts.progress } : null,
    current_work_items: current, active_workers: workers.workers, next_recommended: null, parallel_candidates: [],
    exclusions, source_bindings: { backlog_sha256: digest(backlog ?? ''), graph_sha256: digest(graph ?? {}),
      worker_state_sha256: digest(state ?? {}), scope_analyses_sha256: digest(scopeAnalyses),
      forbidden_scopes_sha256: digest(forbiddenScopes) }, wsjf: 'NOT_ACTIVATED', execution_authorized: false });
  try {
    counts = countWorkItems(backlog);
    const validGraph = validateDependencyGraph(graph);
    if (!validGraph.valid) throw new Error(`INVALID_GRAPH:${validGraph.errors.join('; ')}`);
    workers = runtimeWorkers(state); // Includes existing WIP/review/integration/Done validation.
    const processes = activeProcesses(state);
    const itemMap = new Map();
    for (const line of backlog.split(/\r?\n/)) {
      const done = /^- \[x\] ~~(WI-SOT-\d{2}-\d{2}) \u00b7 (.+)~~$/.exec(line);
      const open = /^- \[ \] (TODO|READY|IN_PROGRESS|BLOCKED) \u2013 (WI-SOT-\d{2}-\d{2}) \u00b7 (.+)$/.exec(line);
      if (done) itemMap.set(done[1], { id: done[1], status: 'DONE', title: done[2] });
      if (open) itemMap.set(open[2], { id: open[2], status: open[1], title: open[3] });
    }
    const nodes = new Map(graph.nodes.map(node => [node.id, node]));
    const graphItems = graph.nodes.filter(node => node.type === 'work_item').map(node => node.id.slice(10));
    if (graphItems.length !== itemMap.size || graphItems.some(id => !itemMap.has(id))) throw new Error('GRAPH_BACKLOG_WORK_ITEMS_DIFFER');
    const incoming = id => graph.edges.filter(edge => edge.to === id && (edge.relation === 'depends_on' && edge.strength === 'hard'
      || edge.relation === 'belongs_to' && nodes.get(edge.from)?.type === 'story' && nodes.get(id)?.type === 'work_item')).map(edge => edge.from);
    const prerequisiteNodes = id => {
      const visited = new Set(); const queue = [...incoming(`work_item:${id}`)];
      while (queue.length) { const next = queue.pop(); if (visited.has(next)) continue; visited.add(next); queue.push(...incoming(next)); }
      return [...visited];
    };
    const children = story => graph.edges.filter(edge => edge.from === story && edge.relation === 'belongs_to'
      && nodes.get(edge.to)?.type === 'work_item').map(edge => edge.to.slice(10));
    const prerequisites = new Map();
    for (const item of itemMap.values()) {
      const parents = graph.edges.filter(edge => edge.to === `work_item:${item.id}` && edge.relation === 'belongs_to'
        && nodes.get(edge.from)?.type === 'story').map(edge => edge.from);
      if (parents.length !== 1 || parents[0] !== `story:ST-SOT-${item.id.split('-')[2]}`) throw new Error(`INVALID_STORY_PARENT:${item.id}`);
      prerequisites.set(item.id, prerequisiteNodes(item.id).filter(id => id !== parents[0]).flatMap(node => {
        const type = nodes.get(node)?.type;
        return type === 'story' ? (children(node).length ? children(node) : [node]) : type === 'work_item' ? [node.slice(10)] : [node];
      }));
    }
    const activeScopes = [];
    for (const record of Object.values(state.records)) {
      const item = itemMap.get(record.work_item_id);
      if (!item) throw new Error(`STATE_ITEM_NOT_IN_BACKLOG:${record.work_item_id}`);
      if (record.execution_state === 'Done' && item.status !== 'DONE'
          || item.status === 'DONE' && record.execution_state !== 'Done' && record.execution_state !== 'Backlog') {
        throw new Error(`PLAN_STATE_STATUS_CONFLICT:${item.id}`);
      }
      if (processes.some(p => p.work_item_ids.includes(item.id))) {
        if (!record.write_scope.length) throw new Error(`ACTIVE_SCOPE_UNKNOWN:${item.id}`);
        const scopes = record.write_scope.map(pathKey);
        activeScopes.push(...scopes);
        current.push({ work_item_id: item.id, title: item.title, execution_state: record.execution_state,
          assigned_agent: record.assigned_agent, write_scope: [...record.write_scope], blocker: record.blocked_by ?? null });
      }
    }
    for (const item of itemMap.values()) {
      if (item.status === 'IN_PROGRESS' && !current.some(record => record.work_item_id === item.id)) throw new Error(`IN_PROGRESS_WITHOUT_VISIBLE_CLAIM:${item.id}`);
    }
    const forbidden = forbiddenScopes.map(pathKey);
    for (const item of itemMap.values()) {
      if (item.status === 'DONE') continue;
      const reasons = [];
      if (state.records[item.id] && state.records[item.id].execution_state !== 'Backlog') reasons.push('ALREADY_CLAIMED_OR_COMPLETED');
      if (!['TODO', 'READY'].includes(item.status)) reasons.push(`PLAN_STATUS_${item.status}`);
      const analysis = scopeAnalyses[item.id];
      if (analysis?.status !== 'ANALYZED' || !text(analysis.evidence_ref) || analysis.backlog_sha256 !== digest(backlog)
          || analysis.graph_sha256 !== digest(graph) || analysis.dependencies_reviewed !== true
          || !Array.isArray(analysis.unresolved_decisions) || !Array.isArray(analysis.write_scope) || !analysis.write_scope.length) {
        reasons.push('MISSING_OR_STALE_SCOPE_ANALYSIS');
      } else {
        if (analysis.unresolved_decisions.length) reasons.push('USER_DECISION_OR_UNRESOLVED_QUESTION');
        let paths; let itemForbidden;
        try { paths = analysis.write_scope.map(pathKey); } catch { reasons.push('INVALID_ANALYZED_PATH'); }
        try { itemForbidden = [...forbidden, ...(analysis.forbidden_scope ?? []).map(pathKey)]; }
        catch { reasons.push('INVALID_FORBIDDEN_SCOPE'); }
        if (paths?.some(path => itemForbidden?.some(blocked => overlap(path, blocked)))) reasons.push('FORBIDDEN_WRITE_SCOPE');
        if (paths?.some(path => activeScopes.some(active => overlap(path, active)))) reasons.push('ACTIVE_WRITE_SCOPE_COLLISION');
        const unresolved = [...new Set(prerequisites.get(item.id))].filter(id => itemMap.get(id)?.status !== 'DONE'
          && !(analysis.external_dependencies?.[id]?.status === 'SATISFIED' && text(analysis.external_dependencies[id].evidence_ref)
            && !itemMap.has(id))); // Existing backlog prerequisites cannot be overridden by an assertion.
        if (unresolved.length) reasons.push(`HARD_DEPENDENCIES:${unresolved.join(',')}`);
      }
      if (reasons.length) { exclusions.push({ work_item_id: item.id, reasons }); continue; }
      const downstream = [...prerequisites.entries()].filter(([id, required]) => id !== item.id
        && itemMap.get(id).status !== 'DONE' && required.includes(item.id)).map(([id]) => id);
      candidates.push({ work_item_id: item.id, title: item.title, plan_status: item.status,
        action: item.status === 'READY' ? 'ELIGIBLE_FOR_CLAIM' : 'PREPARE_READY',
        unlocks: downstream, write_scope: [...analysis.write_scope], scope_evidence: analysis.evidence_ref,
        parallelization_status: analysis.parallelization_status ?? 'Unknown' });
    }
    const depthMemo = new Map();
    const criticalDepth = (item, seen = new Set()) => {
      if (seen.has(item)) throw new Error(`DERIVED_DEPENDENCY_CYCLE:${item}`);
      if (depthMemo.has(item)) return depthMemo.get(item);
      const nextSeen = new Set([...seen, item]);
      const downstream = [...prerequisites.entries()].filter(([id, deps]) => id !== item
        && itemMap.get(id).status !== 'DONE' && deps.includes(item)).map(([id]) => id);
      const depth = downstream.length ? 1 + Math.max(...downstream.map(id => criticalDepth(id, nextSeen))) : 0;
      depthMemo.set(item, depth);
      return depth;
    };
    for (const candidate of candidates) candidate.critical_path_depth = criticalDepth(candidate.work_item_id);
    candidates.sort((a, b) => b.critical_path_depth - a.critical_path_depth || b.unlocks.length - a.unlocks.length
      || a.work_item_id.localeCompare(b.work_item_id));
    const result = output();
    result.current_phases = [...new Set(current.map(item => `ST-SOT-${item.work_item_id.split('-')[2]}`))].sort();
    result.next_recommended = candidates[0] ?? null;
    // The returned parallel set is mutually disjoint, not merely disjoint from active work.
    const reserved = [...activeScopes];
    for (const candidate of candidates) {
      if (candidate.plan_status !== 'READY' || candidate.parallelization_status !== 'Parallel Safe') continue;
      const scopes = candidate.write_scope.map(pathKey);
      if (scopes.some(path => reserved.some(other => overlap(path, other)))) {
        exclusions.push({ work_item_id: candidate.work_item_id, reasons: ['PARALLEL_SET_COLLISION'] }); continue;
      }
      result.parallel_candidates.push(candidate); reserved.push(...scopes);
    }
    result.recommendations = candidates;
    return result;
  } catch (error) { errors.push(error.message); return output(); }
}
