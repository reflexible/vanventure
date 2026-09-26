import assert from 'node:assert/strict';
import test from 'node:test';
import { coordinateParallelSlices } from './parallel-coordination.mjs';

function plan() {
  return {
    status: 'EXECUTION_PLAN_DERIVED',
    active_workers: [{ id: 'busy-worker' }],
    parallel_candidates: [
      { work_item_id: 'WI-SOT-20-04', plan_status: 'READY', action: 'ELIGIBLE_FOR_CLAIM', parallelization_status: 'Parallel Safe', write_scope: ['tools/sot/a.mjs'], scope_evidence: 'review:a' },
      { work_item_id: 'WI-SOT-20-05', plan_status: 'READY', action: 'ELIGIBLE_FOR_CLAIM', parallelization_status: 'Parallel Safe', write_scope: ['tools/sot/b.mjs'], scope_evidence: 'review:b' },
    ],
    source_bindings: { backlog_sha256: 'bound' }, wsjf: 'CALCULATED_NOT_AUTHORIZED',
  };
}

function assignments() {
  return [
    { work_item_id: 'WI-SOT-20-05', worker_id: 'worker-b', write_scope: ['tools/sot/b.mjs'] },
    { work_item_id: 'WI-SOT-20-04', worker_id: 'worker-a', write_scope: ['tools/sot/a.mjs'] },
  ];
}

test('derives a bounded, deterministic coordination proposal without authorizing claims', () => {
  const input = { executionPlan: plan(), assignments: assignments() };
  const before = structuredClone(input);
  const result = coordinateParallelSlices(input);
  assert.equal(result.status, 'PARALLEL_COORDINATION_DERIVED');
  assert.deepEqual(result.assignments.map(item => [item.work_item_id, item.worker_id]), [
    ['WI-SOT-20-04', 'worker-a'], ['WI-SOT-20-05', 'worker-b'],
  ]);
  assert.equal(result.wsjf, 'CALCULATED_NOT_AUTHORIZED');
  assert.equal(result.coordination_authorized, false);
  assert.equal(result.claim_authorized, false);
  assert.equal(result.execution_authorized, false);
  assert.deepEqual(input, before);
});

test('requires at least two distinct Ready Parallel Safe candidates and idle workers', () => {
  for (const mutate of [
    input => { input.assignments.pop(); },
    input => { input.assignments[1].work_item_id = 'WI-SOT-20-05'; },
    input => { input.assignments[1].worker_id = 'worker-b'; },
    input => { input.assignments[1].worker_id = 'busy-worker'; },
    input => { input.executionPlan.parallel_candidates[1].parallelization_status = 'Sequential'; },
  ]) {
    const input = { executionPlan: plan(), assignments: assignments() }; mutate(input);
    assert.throws(() => coordinateParallelSlices(input));
  }
});

test('rejects scope expansion, stale candidates and defensive collisions', () => {
  for (const mutate of [
    input => { input.assignments[0].write_scope = ['tools/sot']; },
    input => { input.executionPlan.status = 'EXECUTION_PLAN_BLOCKED'; },
    input => { input.executionPlan.parallel_candidates[1].write_scope = ['tools/sot/a.mjs']; input.assignments[0].write_scope = ['tools/sot/a.mjs']; },
  ]) {
    const input = { executionPlan: plan(), assignments: assignments() }; mutate(input);
    assert.throws(() => coordinateParallelSlices(input));
  }
});
