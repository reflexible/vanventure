import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateWsjf, rankReadyQueue, WSJF_SCALE } from './wsjf.mjs';

const component = (score, confidence = 'High') => ({ score, confidence, rationale: 'Evidence grounded in project context.' });
const example = () => ({ user_business_value: component(13), value_status: 'Proposed',
  time_criticality: component(5), risk_reduction_opportunity_enablement: component(3), job_size: component(5) });

test('uses the specified scales, calculates Cost of Delay and WSJF without authorizing execution', () => {
  const result = evaluateWsjf(example());
  assert.deepEqual(WSJF_SCALE, [1, 2, 3, 5, 8, 13, 20]);
  assert.equal(result.valid, true);
  assert.equal(result.cost_of_delay, 21);
  assert.equal(result.wsjf, 4.2);
  assert.equal(result.execution_decision, 'NOT_AUTHORIZED');
});

test('rejects intermediate scores, missing rationales and low confidence without uncertainty', () => {
  const invalid = { ...example(), time_criticality: component(4), job_size: { score: 8, confidence: 'Low', rationale: 'Unclear.' } };
  const result = evaluateWsjf(invalid);
  assert.equal(result.valid, false);
  assert.match(result.errors.join(' '), /relative scale/);
  assert.match(result.errors.join(' '), /uncertainty/);
});

test('preserves confirmed business value and does not allow manual WSJF', () => {
  const locked = { ...example(), value_status: 'Confirmed', prior_value_status: 'Confirmed',
    prior_user_business_value: 8, manual_wsjf: 12 };
  const result = evaluateWsjf(locked);
  assert.equal(result.valid, false);
  assert.match(result.errors.join(' '), /cannot be changed automatically/);
  assert.match(result.errors.join(' '), /cannot be manually supplied/);
});

test('large stories require explicit decomposition rationale', () => {
  const result = evaluateWsjf({ ...example(), job_size: component(13) });
  assert.equal(result.valid, false);
  assert.equal(result.decomposition_review.required, true);
  const justified = evaluateWsjf({ ...example(), job_size: component(20), large_story_rationale: 'Further split destroys independent user value.' });
  assert.equal(justified.valid, true);
});

test('manual priority changes queue order without changing score; unready work is excluded', () => {
  const queue = rankReadyQueue([
    { id: 'A', ready: true, wsjf: 7 },
    { id: 'B', ready: true, wsjf: 2, manual_priority_override: { enabled: true, reason: 'Fixed deadline.' } },
    { id: 'C', ready: true, wsjf: 99, blocked: true },
    { id: 'D', ready: false, wsjf: 100 },
  ]);
  assert.deepEqual(queue.map(item => item.id), ['B', 'A']);
  assert.equal(queue[0].wsjf, 2);
  assert.equal(queue[0].reason, 'Fixed deadline.');
});

test('prioritizes WSJF only within executable work and requires override explanation', () => {
  assert.throws(() => rankReadyQueue([{ id: 'A', ready: true, wsjf: 2,
    manual_priority_override: { enabled: true } }]), /needs a reason/);
  const result = rankReadyQueue([{ id: 'A', ready: true, wsjf: 9, claimed: true },
    { id: 'B', ready: true, wsjf: 4, conflict: true }]);
  assert.deepEqual(result, []);
});

test('does not rank blocked hard dependencies and requires an explicit comparison room', () => {
  const queue = rankReadyQueue([
    { id: 'A', ready: true, wsjf: 20, hard_dependencies: [{ id: 'WI-1', status: 'BLOCKED' }] },
    { id: 'B', ready: true, wsjf: 4, hard_dependencies: [{ id: 'WI-2', status: 'SATISFIED' }] },
    { id: 'C', ready: true, wsjf: 99, hard_dependencies: 'unknown' },
  ]);
  assert.deepEqual(queue.map(item => item.id), ['B']);
  const projects = [
    { id: 'P1', ready: true, wsjf: 9, comparison_group: 'product-A' },
    { id: 'P2', ready: true, wsjf: 30, comparison_group: 'product-B' },
  ];
  assert.throws(() => rankReadyQueue(projects), /comparison_group/);
  assert.deepEqual(rankReadyQueue(projects, { comparisonGroup: 'product-A' }).map(item => item.id), ['P1']);
});
