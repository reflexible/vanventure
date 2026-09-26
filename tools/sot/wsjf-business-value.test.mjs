import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { proposeBusinessValue } from './wsjf-business-value.mjs';

const now = '2026-09-26T17:00:00Z';
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'vv-wsjf-value-'));
  await writeFile(join(root, 'evidence.md'), [
    'Visitors use the booking workflow regularly.',
    'The change removes a documented customer problem.',
    'The workflow supports a central project goal.',
  ].join('\n'), 'utf8');
  return root;
}
const story = { id: 'STORY-001', title: 'Improve booking flow',
  user_story: 'As a visitor I want a reliable booking flow.',
  value_description: 'Removes a recurring booking obstacle.' };
const evidence = [
  { factor: 'usage_frequency', relevance: 'High', source_ref: 'evidence.md', excerpt: 'Visitors use the booking workflow regularly.' },
  { factor: 'problem_removal', relevance: 'High', source_ref: 'evidence.md', excerpt: 'The change removes a documented customer problem.' },
  { factor: 'project_goal', relevance: 'Medium', source_ref: 'evidence.md', excerpt: 'The workflow supports a central project goal.' },
];

test('proposes a Proposed value from verified project evidence without authorization', async () => {
  const root = await fixture();
  const outcome = await proposeBusinessValue({ project_root: root, evaluated_at: now, story, evidence });
  assert.equal(outcome.valid, true, JSON.stringify(outcome.errors));
  assert.equal(outcome.result.value_status, 'Proposed');
  assert.equal(outcome.result.user_business_value.score, 5);
  assert.equal(outcome.result.proposal.confidence, 'High');
  assert.equal(outcome.result.evidence.length, 3);
  assert.match(outcome.result.evidence[0].source_sha256, /^[a-f0-9]{64}$/);
  assert.equal(outcome.result.execution_decision, 'NOT_AUTHORIZED');
  assert.equal(outcome.result.persistence_decision, 'NOT_AUTHORIZED');
});

test('preserves a protected user value and returns the new proposal separately', async () => {
  const root = await fixture();
  const existing = { score: 2, confidence: 'High', rationale: 'Confirmed by user.' };
  const outcome = await proposeBusinessValue({ project_root: root, evaluated_at: now, story, evidence,
    existing_business_value: existing, existing_value_status: 'Confirmed' });
  assert.equal(outcome.valid, true, JSON.stringify(outcome.errors));
  assert.equal(outcome.result.value_status, 'Confirmed');
  assert.equal(outcome.result.user_business_value.score, 2);
  assert.equal(outcome.result.suggested_user_business_value.score, 5);
  existing.score = 20;
  assert.equal(outcome.result.user_business_value.score, 2);
});

test('fails closed for forged scores, missing sources, traversal and unverified excerpts', async () => {
  const root = await fixture();
  for (const input of [
    { score: 20 },
    { evidence: [{ ...evidence[0], score: 20 }] },
    { evidence: [{ ...evidence[0], source_ref: '../outside.md' }] },
    { evidence: [{ ...evidence[0], excerpt: 'invented evidence' }] },
  ]) {
    const outcome = await proposeBusinessValue({ project_root: root, evaluated_at: now, story, evidence, ...input });
    assert.equal(outcome.valid, false);
  }
});

test('keeps insufficient evidence visible through Low confidence and required uncertainty', async () => {
  const root = await fixture();
  const outcome = await proposeBusinessValue({ project_root: root, evaluated_at: now, story, evidence: [evidence[0]] });
  assert.equal(outcome.valid, true, JSON.stringify(outcome.errors));
  assert.equal(outcome.result.proposal.confidence, 'Low');
  assert.deepEqual(Object.keys(outcome.result.proposal.uncertainty).sort(),
    ['missing_information', 'unanalyzed_area', 'uncertain_assumption']);
});

test('requires a complete story and validates the protected value contract', async () => {
  const root = await fixture();
  const incomplete = await proposeBusinessValue({ project_root: root, evaluated_at: now, story: { ...story, value_description: '' }, evidence });
  assert.equal(incomplete.valid, false);
  const malformed = await proposeBusinessValue({ project_root: root, evaluated_at: now, story, evidence,
    existing_business_value: { score: 4 }, existing_value_status: 'Overridden' });
  assert.equal(malformed.valid, false);
});
