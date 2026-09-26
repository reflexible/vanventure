import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateDoneGuard } from './done-guard.mjs';

const proof = id => ({ status: 'PASS', evidence_ref: `evidence:${id}` });
function valid(overrides = {}) {
  return {
    scope: 'module:analytics',
    sotUpdate: { required: true, updated_module_ids: ['analytics'], evidence_ref: 'delta:42' },
    unresolvedConflicts: [],
    requiredChecks: [{ id: 'unit', ...proof('unit') }, { id: 'security', ...proof('security') }],
    contracts: proof('contracts'), dependencies: proof('dependencies'), consistency: proof('consistency'),
    postValidation: {
      status: 'POST_VALIDATION_PASS',
      checks: ['required_check', 'contracts', 'dependencies', 'sotConsistency', 'traceability']
        .map(name => ({ name, status: 'PASS' })),
    },
    ...overrides,
  };
}

test('allows DONE only with explicit SoT update and complete passing evidence', () => {
  const result = evaluateDoneGuard(valid());
  assert.equal(result.status, 'DONE_ALLOWED');
  assert.ok(result.findings.every(item => item.status === 'PASS'));
});

test('allows an explicit scoped declaration that no SoT update is required', () => {
  const input = valid({ sotUpdate: {
    required: false, scope: 'module:analytics', reason: 'No authoritative source change.',
    evidence_ref: 'scope-review:7',
  } });
  assert.equal(evaluateDoneGuard(input).status, 'DONE_ALLOWED');
});

test('blocks absent update proof, even if the caller says no update was required without scope evidence', () => {
  const result = evaluateDoneGuard(valid({ sotUpdate: { required: false } }));
  assert.equal(result.status, 'DONE_BLOCKED');
  assert.equal(result.findings.find(item => item.id === 'sot_update').status, 'BLOCKED');
});

test('blocks unresolved conflicts and failed or missing required checks', () => {
  for (const overrides of [
    { unresolvedConflicts: ['rule-a-vs-rule-b'] },
    { requiredChecks: [{ id: 'unit', status: 'FAIL', evidence_ref: 'evidence:unit' }] },
    { requiredChecks: [] },
  ]) {
    assert.equal(evaluateDoneGuard(valid(overrides)).status, 'DONE_BLOCKED');
  }
});

test('blocks contract, dependency, consistency and post-validation failures independently', () => {
  for (const overrides of [
    { contracts: { status: 'FAIL', evidence_ref: 'contracts' } },
    { dependencies: { status: 'PASS' } },
    { consistency: { status: 'BLOCKED', evidence_ref: 'consistency' } },
    { postValidation: { status: 'POST_VALIDATION_BLOCKED', checks: [] } },
  ]) {
    assert.equal(evaluateDoneGuard(valid(overrides)).status, 'DONE_BLOCKED');
  }
});

test('rejects duplicate check IDs and a not-required declaration for another scope', () => {
  const duplicate = valid({ requiredChecks: [
    { id: 'unit', ...proof('unit-a') }, { id: 'unit', ...proof('unit-b') },
  ] });
  assert.equal(evaluateDoneGuard(duplicate).status, 'DONE_BLOCKED');
  const wrongScope = valid({ sotUpdate: {
    required: false, scope: 'module:cms', reason: 'No source change.', evidence_ref: 'scope-review:8',
  } });
  assert.equal(evaluateDoneGuard(wrongScope).status, 'DONE_BLOCKED');
});
