const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;

function assert(condition, code) {
  if (!condition) throw new Error(code);
}

function pathKey(value) {
  assert(text(value) && !value.includes('\\') && !value.startsWith('/') && !value.includes(':')
    && !value.split('/').some(part => !part || part === '.' || part === '..'), 'INVALID_COORDINATION_SCOPE');
  return value.toLowerCase();
}

function scopesMatch(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || !left.length || !right.length) return false;
  const normalize = scope => [...new Set(scope.map(pathKey))].sort();
  const a = normalize(left), b = normalize(right);
  return a.length === b.length && a.every((path, index) => path === b[index]);
}

function overlaps(left, right) {
  return left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`);
}

/**
 * Produce a read-only, bounded assignment proposal for independently executable
 * slices. Claims remain the responsibility of worker-state.mjs, so this helper
 * cannot create a second backlog, alter WSJF, or authorize execution.
 */
export function coordinateParallelSlices({ executionPlan, assignments }) {
  assert(executionPlan?.status === 'EXECUTION_PLAN_DERIVED', 'EXECUTION_PLAN_NOT_DERIVED');
  assert(Array.isArray(assignments) && assignments.length >= 2, 'PARALLEL_ASSIGNMENTS_REQUIRED');
  assert(Array.isArray(executionPlan.parallel_candidates), 'PARALLEL_CANDIDATES_REQUIRED');

  const candidates = new Map(executionPlan.parallel_candidates.map(candidate => [candidate.work_item_id, candidate]));
  const activeWorkers = new Set((executionPlan.active_workers ?? []).map(worker => worker.id));
  const seenItems = new Set(), seenWorkers = new Set(), reservedScopes = [];
  const coordinated = assignments.map(({ work_item_id, worker_id, write_scope }) => {
    assert(text(work_item_id) && text(worker_id), 'INVALID_PARALLEL_ASSIGNMENT');
    assert(!seenItems.has(work_item_id), `DUPLICATE_PARALLEL_WORK_ITEM:${work_item_id}`);
    assert(!seenWorkers.has(worker_id), `DUPLICATE_PARALLEL_WORKER:${worker_id}`);
    assert(!activeWorkers.has(worker_id), `WORKER_ALREADY_ACTIVE:${worker_id}`);
    const candidate = candidates.get(work_item_id);
    assert(candidate?.plan_status === 'READY' && candidate.action === 'ELIGIBLE_FOR_CLAIM'
      && candidate.parallelization_status === 'Parallel Safe', `NOT_PARALLEL_CLAIM_CANDIDATE:${work_item_id}`);
    assert(scopesMatch(write_scope, candidate.write_scope), `COORDINATION_SCOPE_MISMATCH:${work_item_id}`);
    const normalizedScope = [...new Set(write_scope.map(pathKey))].sort();
    assert(!normalizedScope.some(scope => reservedScopes.some(reserved => overlaps(scope, reserved))),
      `PARALLEL_SCOPE_COLLISION:${work_item_id}`);
    seenItems.add(work_item_id); seenWorkers.add(worker_id); reservedScopes.push(...normalizedScope);
    return { work_item_id, worker_id, write_scope: [...candidate.write_scope], scope_evidence: candidate.scope_evidence,
      parallelization_status: candidate.parallelization_status };
  }).sort((left, right) => left.work_item_id.localeCompare(right.work_item_id));

  return {
    status: 'PARALLEL_COORDINATION_DERIVED',
    assignments: coordinated,
    source_bindings: structuredClone(executionPlan.source_bindings ?? {}),
    wsjf: executionPlan.wsjf ?? 'NOT_ACTIVATED',
    coordination_authorized: false,
    claim_authorized: false,
    execution_authorized: false,
  };
}
