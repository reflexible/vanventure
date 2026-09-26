import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { proposeTimeCriticality } from './wsjf-time-criticality.mjs';

const now = '2026-09-26T17:00:00Z';
const story = { id: 'STORY-002', title: 'Publish booking page', user_story: 'As a visitor I need the booking page before release.' };
async function fixture() { const root = await mkdtemp(join(tmpdir(), 'vv-wsjf-time-')); await writeFile(join(root, 'evidence.md'), [
  'Release is scheduled for 2026-10-01.', 'The work blocks the documented checkout dependency.', 'Delayed publication loses campaign value.'
].join('\n'), 'utf8'); return root; }
const evidence = [
  { factor: 'release', relevance: 'High', time_reference: '2026-10-01T00:00:00Z', source_ref: 'evidence.md', excerpt: 'Release is scheduled for 2026-10-01.' },
  { factor: 'blocking_work', relevance: 'High', source_ref: 'evidence.md', excerpt: 'The work blocks the documented checkout dependency.' },
  { factor: 'delay_value_loss', relevance: 'Medium', source_ref: 'evidence.md', excerpt: 'Delayed publication loses campaign value.' },
];

test('proposes Time Criticality from verified evidence without authorizing action', async () => {
  const result = await proposeTimeCriticality({ project_root: await fixture(), evaluated_at: now, story, evidence });
  assert.equal(result.valid, true, JSON.stringify(result.errors));
  assert.equal(result.result.time_criticality.score, 8);
  assert.equal(result.result.proposal.confidence, 'High');
  assert.equal(result.result.execution_decision, 'NOT_AUTHORIZED');
  assert.equal(result.result.persistence_decision, 'NOT_AUTHORIZED');
  assert.match(result.result.evidence[0].source_sha256, /^[a-f0-9]{64}$/);
});

test('requires a time reference for deadlines, releases and seasonal evidence', async () => {
  const root = await fixture();
  for (const factor of ['fixed_deadline', 'release', 'planned_publication', 'seasonal_relevance']) {
    const result = await proposeTimeCriticality({ project_root: root, evaluated_at: now, story,
      evidence: [{ ...evidence[0], factor, time_reference: undefined }] });
    assert.equal(result.valid, false);
    assert.match(result.errors.join(' '), /time_reference/);
  }
});

test('fails closed for supplied scores, path escape, unknown factors and invented excerpts', async () => {
  const root = await fixture();
  for (const input of [{ score: 20 }, { evidence: [{ ...evidence[0], score: 20 }] }, { evidence: [{ ...evidence[0], source_ref: '../outside.md' }] },
    { evidence: [{ ...evidence[0], factor: 'urgent' }] }, { evidence: [{ ...evidence[0], excerpt: 'invented' }] }]) {
    assert.equal((await proposeTimeCriticality({ project_root: root, evaluated_at: now, story, evidence, ...input })).valid, false);
  }
});

test('shows Low confidence and all uncertainty details for one verified factor', async () => {
  const result = await proposeTimeCriticality({ project_root: await fixture(), evaluated_at: now, story, evidence: [evidence[1]] });
  assert.equal(result.valid, true, JSON.stringify(result.errors));
  assert.equal(result.result.proposal.confidence, 'Low');
  assert.deepEqual(Object.keys(result.result.proposal.uncertainty).sort(), ['missing_information', 'unanalyzed_area', 'uncertain_assumption']);
});
