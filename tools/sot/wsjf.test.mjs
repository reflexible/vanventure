import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateWsjf, rankReadyQueue, reevaluateWsjf, WSJF_SCALE } from './wsjf.mjs';

const component = (score, confidence = 'High') => ({ score, confidence, rationale: 'Evidence grounded in project context.' });
const reviewed = () => ({ outcome: 'RETAIN_VERTICAL_VALUE', reviewed_at: '2026-09-26T11:00:00Z', rationale: 'Further split destroys independent user value.' });
const example = () => ({ evaluated_at: '2026-09-26T11:00:00Z', user_business_value: component(13), value_status: 'Proposed',
  time_criticality: component(5), risk_reduction_opportunity_enablement: component(3), job_size: component(5) });

test('uses the specified scales, calculates Cost of Delay and WSJF without authorizing execution', () => {
  const result = evaluateWsjf(example());
  assert.deepEqual(WSJF_SCALE, [1, 2, 3, 5, 8, 13, 20]);
  assert.equal(result.valid, true, JSON.stringify(result.errors));
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
  const justified = evaluateWsjf({ ...example(), job_size: component(20), decomposition_review: reviewed() });
  assert.equal(justified.valid, true);
});

test('manual priority changes queue order without changing score; unready work is excluded', () => {
  const queue = rankReadyQueue([
    { ...example(), id: 'A', ready: true },
    { ...example(), job_size: component(8), id: 'B', ready: true, manual_priority_override: { enabled: true, reason: 'Fixed deadline.' } },
    { id: 'C', ready: true, wsjf: 99, blocked: true },
    { id: 'D', ready: false, wsjf: 100 },
  ]);
  assert.deepEqual(queue.map(item => item.id), ['B', 'A']);
  assert.equal(queue[0].wsjf, 2.63);
  assert.equal(queue[0].reason, 'Fixed deadline.');
});

test('prioritizes WSJF only within executable work and requires override explanation', () => {
  assert.throws(() => rankReadyQueue([{ ...example(), id: 'A', ready: true,
    manual_priority_override: { enabled: true } }]), /needs a reason/);
  const result = rankReadyQueue([{ id: 'A', ready: true, wsjf: 9, claimed: true },
    { id: 'B', ready: true, wsjf: 4, conflict: true }]);
  assert.deepEqual(result, []);
});

test('does not rank blocked hard dependencies and requires an explicit comparison room', () => {
  const queue = rankReadyQueue([
    { id: 'A', ready: true, wsjf: 20, hard_dependencies: [{ id: 'WI-1', status: 'BLOCKED' }] },
    { ...example(), id: 'B', ready: true, hard_dependencies: [{ id: 'WI-2', status: 'SATISFIED' }] },
    { id: 'C', ready: true, wsjf: 99, hard_dependencies: 'unknown' },
  ]);
  assert.deepEqual(queue.map(item => item.id), ['B']);
  const projects = [
    { ...example(), id: 'P1', ready: true, comparison_group: 'product-A' },
    { ...example(), id: 'P2', ready: true, comparison_group: 'product-B' },
  ];
  assert.throws(() => rankReadyQueue(projects), /comparison_group/);
  assert.deepEqual(rankReadyQueue(projects, { comparisonGroup: 'product-A' }).map(item => item.id), ['P1']);
});

test('re-evaluation logs the fact-driven before/after score', () => {
  const current = evaluateWsjf(example());
  const proposed = { ...example(), time_criticality: component(8), risk_reduction_opportunity_enablement: component(5) };
  const result = reevaluateWsjf({ current, proposed, reason: 'Release date moved closer.',
    changed_facts: ['Release date moved from Q4 to Q3.'], evaluated_at: '2026-09-26T12:00:00Z' });
  assert.equal(result.valid, true, JSON.stringify(result.errors));
  assert.equal(result.result.wsjf, 5.2);
  assert.equal(result.result.history.length, 1);
  assert.equal(result.result.history[0].previous.wsjf, current.wsjf);
  assert.equal(result.result.history[0].next.wsjf, result.result.wsjf);
});

test('re-evaluation preserves confirmed business values and records a new suggestion', () => {
  const current = evaluateWsjf({ ...example(), user_business_value: component(8), value_status: 'Confirmed' });
  const proposed = { ...example(), user_business_value: component(20), value_status: 'Confirmed' };
  const result = reevaluateWsjf({ current, proposed, reason: 'New usage evidence.', changed_facts: ['Usage doubled.'],
    evaluated_at: '2026-09-26T12:00:00Z' });
  assert.equal(result.valid, true);
  assert.equal(result.result.user_business_value.score, 8);
  assert.equal(result.result.suggested_user_business_value.score, 20);
});

test('automatic re-evaluation cannot change value status or manual priority decisions', () => {
  const current = evaluateWsjf({ ...example(), value_status: 'Overridden',
    manual_priority_override: { enabled: true, reason: 'Hard deadline.' } });
  const statusChange = reevaluateWsjf({ current, proposed: { ...example(), value_status: 'Proposed',
    manual_priority_override: current.manual_priority_override }, reason: 'Fact', changed_facts: ['Fact changed.'],
    evaluated_at: '2026-09-26T12:00:00Z' });
  assert.match(statusChange.errors.join(' '), /cannot change the User \/ Business Value status/);
  const overrideChange = reevaluateWsjf({ current, proposed: { ...example(), value_status: 'Overridden',
    manual_priority_override: { enabled: false } }, reason: 'Fact', changed_facts: ['Fact changed.'],
    evaluated_at: '2026-09-26T12:00:00Z' });
  assert.match(overrideChange.errors.join(' '), /manual priority override/);
});

test('queue rejects caller scores without components and mismatched cached totals', () => {
  assert.throws(() => rankReadyQueue([{ id: 'X', ready: true, wsjf: 999 }]), /valid calculated WSJF/);
  assert.throws(() => rankReadyQueue([{ ...example(), id: 'X', ready: true, wsjf: 999 }]), /differs from its components/);
  assert.throws(() => rankReadyQueue([{ ...example(), id: 'X', ready: true, cost_of_delay: 999 }]), /differs from its components/);
});

test('queue uses exact fractions when display scores tie and refuses duplicate IDs', () => {
  const common = { ready: true, decomposition_review: reviewed(),
    risk_reduction_opportunity_enablement: component(1) };
  const lower = { ...example(), ...common, id: 'A', user_business_value: component(5), time_criticality: component(5), job_size: component(13) };
  const higher = { ...example(), ...common, id: 'Z', user_business_value: component(13), time_criticality: component(3), job_size: component(20) };
  const ranked = rankReadyQueue([lower, higher]);
  assert.deepEqual(ranked.map(item => item.wsjf), [0.85, 0.85]);
  assert.deepEqual(ranked.map(item => item.id), ['Z', 'A']);
  assert.throws(() => rankReadyQueue([lower, lower]), /Duplicate/);
});

const reevaluation = (current, proposed) => reevaluateWsjf({ current, proposed, reason: 'Changed evidence.',
  changed_facts: ['Usage evidence changed.'], evaluated_at: '2026-09-26T12:00:00Z' });

test('re-evaluation rejects corrupt current calculations and invalid protected suggestions', () => {
  const current = evaluateWsjf({ ...example(), value_status: 'Confirmed' });
  assert.equal(reevaluation({ ...current, wsjf: 99 }, { ...example(), value_status: 'Confirmed' }).valid, false);
  assert.equal(reevaluation({ ...current, time_criticality: component(4) }, example()).valid, false);
  const invalidSuggestion = reevaluation(current, { ...example(), value_status: 'Confirmed', user_business_value: component(4) });
  assert.equal(invalidSuggestion.valid, false);
  assert.match(invalidSuggestion.errors.join(' '), /relative scale/);
  assert.equal(reevaluation(current, undefined).valid, false);
});

test('status changes cannot bypass a protected previous business value', () => {
  for (const value_status of ['Proposed', 'Overridden']) {
    const result = evaluateWsjf({ ...example(), value_status, prior_value_status: 'Confirmed', prior_user_business_value: 8 });
    assert.equal(result.valid, false);
  }
  assert.equal(evaluateWsjf({ ...example(), manual_priority_override: { enabled: 'false' } }).valid, false);
});

test('history snapshots are detached from inputs, suggestions and returned live assessment', () => {
  const current = evaluateWsjf({ ...example(), value_status: 'Confirmed' });
  const proposed = { ...example(), value_status: 'Confirmed', user_business_value: component(20) };
  const result = reevaluation(current, proposed).result;
  current.user_business_value.score = 1;
  proposed.user_business_value.score = 2;
  result.time_criticality.score = 3;
  result.suggested_user_business_value.score = 5;
  assert.equal(result.history[0].previous.user_business_value.score, 13);
  assert.equal(result.history[0].next.time_criticality.score, 5);
  assert.equal(result.history[0].next.suggested_user_business_value.score, 20);
});

const dimensions = ['user_business_value', 'time_criticality', 'risk_reduction_opportunity_enablement', 'job_size'];

test('every dimension accepts exactly the seven relative scores', () => {
  for (const dimension of dimensions) {
    for (const score of WSJF_SCALE) {
      const result = evaluateWsjf({ ...example(), [dimension]: component(score), decomposition_review: reviewed() });
      assert.equal(result.valid, true, `${dimension}=${score}: ${result.errors}`);
    }
    for (const score of [-1, 0, 4, 6, 7, 9, 12, 14, 19, 21, 1.5, '5', NaN, Infinity]) {
      assert.equal(evaluateWsjf({ ...example(), [dimension]: component(score), decomposition_review: reviewed() }).valid, false,
        `${dimension}=${score}`);
    }
  }
});

test('each dimension requires its own rationale and confidence', () => {
  for (const dimension of dimensions) {
    assert.equal(evaluateWsjf({ ...example(), [dimension]: { score: 5, confidence: 'High' } }).valid, false);
    assert.equal(evaluateWsjf({ ...example(), [dimension]: { score: 5, rationale: 'Evidence' } }).valid, false);
    assert.equal(evaluateWsjf({ ...example(), [dimension]: component(5, 'Medium') }).valid, true);
  }
});

test('Low confidence calculates normally while retaining all three uncertainty details', () => {
  const uncertainty = { missing_information: 'Current visitor frequency missing.',
    uncertain_assumption: 'Assumed recurring weekly use.', unanalyzed_area: 'Visitor analytics adapter.' };
  for (const dimension of dimensions) {
    const assessment = { ...component(5, 'Low'), uncertainty };
    const result = evaluateWsjf({ ...example(), [dimension]: assessment });
    assert.equal(result.valid, true);
    assert.deepEqual(result[dimension].uncertainty, uncertainty);
    for (const field of Object.keys(uncertainty)) {
      assert.equal(evaluateWsjf({ ...example(), [dimension]: { ...assessment, uncertainty: { ...uncertainty, [field]: '' } } }).valid, false);
    }
  }
});

test('initial assessment carries an explicit timestamp and unconfirmed Proposed values remain usable', () => {
  const input = example();
  delete input.value_status;
  const result = evaluateWsjf(input);
  assert.equal(result.valid, true);
  assert.equal(result.value_status, 'Proposed');
  assert.equal(result.evaluated_at, input.evaluated_at);
  assert.deepEqual(rankReadyQueue([{ ...input, id: 'PROPOSED', ready: true }]).map(item => item.id), ['PROPOSED']);
  for (const evaluated_at of [undefined, '', '2026-09-26', '2026-09-26T12:00:00']) {
    assert.equal(evaluateWsjf({ ...example(), evaluated_at }).valid, false);
  }
});

test('sizes 13 and 20 cannot retain a story with an unresolved split or merely a free-text excuse', () => {
  for (const size of [13, 20]) {
    const input = { ...example(), job_size: component(size) };
    assert.equal(evaluateWsjf({ ...input, large_story_rationale: 'A review happened.' }).valid, false);
    assert.equal(evaluateWsjf({ ...input, decomposition_review: { ...reviewed(), outcome: 'SPLIT_REQUIRED' } }).valid, false);
    assert.equal(evaluateWsjf({ ...input, decomposition_review: { ...reviewed(), reviewed_at: null } }).valid, false);
    const result = evaluateWsjf({ ...input, decomposition_review: reviewed() });
    assert.equal(result.valid, true);
    assert.equal(result.decomposition_review.outcome, 'RETAIN_VERTICAL_VALUE');
  }
});

test('reevaluation stamps the new assessment and preserves the prior assessment timestamp', () => {
  const current = evaluateWsjf(example());
  const result = reevaluation(current, example()).result;
  assert.equal(result.evaluated_at, '2026-09-26T12:00:00Z');
  assert.equal(result.history[0].previous.evaluated_at, current.evaluated_at);
  assert.equal(result.history[0].next.evaluated_at, result.evaluated_at);
});

test('parallel agent availability has no effect on scores or job size', () => {
  const baseline = evaluateWsjf(example());
  const parallel = evaluateWsjf({ ...example(), available_workers: 20, parallelization_potential: 'High' });
  assert.deepEqual(parallel, baseline);
});
