import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { runGovernanceWorkflow, recoverGovernanceWorkflow, integrateGovernanceResult, attestLegacyGovernanceResult } from './governance-workflow.mjs';
import { scopeReviewBinding } from './scope-review.mjs';
import { sectionSha256 } from './rule-catalogue.mjs';
import { buildDependencyGraph } from './dependency-graph.mjs';
import { assessSotImpact } from './sot-impact.mjs';
import { decisionProposalHash } from './user-decision-evidence.mjs';
import { createWorkerStateStore } from './worker-state.mjs';
import { createDecisionStore } from './decision-state.mjs';

const hash = value => createHash('sha256').update(value).digest('hex');
const time = '2026-09-26T12:00:00Z';
async function fixture(t, ownerIsEpic = false) {
  const projectRoot = await mkdtemp(join(tmpdir(), 'sot-workflow-'));
  t.after(() => rm(projectRoot, { recursive: true, force: true }));
  const source = '# Specialist module\n\n## Rule\nPreserve original records.\n';
  const addition = 'Supporting evidence: [Fixture reference](reference.md).';
  const expected = '# Specialist module\n\n## Rule\nPreserve original records.\n\n' + addition + '\n';
  const module = { module_id: 'fixture-owner', name: 'Fixture owner', authority: 'fixture.rule', source: 'docs/owner.md',
    status: 'active_reference', dependencies: [], contracts: [], version: null, last_verified_baseline: null,
    semantic_baseline: null, last_audit_status: null };
  const registry = { schema_version: '1.0.0', modules: [module] };
  const contracts = { schema_version: '1.0.0', status: 'interface_metadata_only', contracts: [] };
  const supplement = { schema_version: '1.0.0', status: 'derived_index_only', sources: { work_items: ownerIsEpic ? 'docs/owner.md' : 'docs/epic.md' }, nodes: [], edges: [] };
  const epicText = ownerIsEpic ? source : '# Isolated synthetic test epic\n';
  const graph = buildDependencyGraph({ registry, contracts, supplement, epicText });
  const proposal = { work_item_id: 'WI-SOT-16-01', id: 'FIXTURE-P1', content: addition, authority: module.authority,
    owner: { module_id: module.module_id, source: module.source, authority: module.authority },
    status: 'PROPOSED', integration: 'NOT_STARTED', approval: null, conflict_check: 'PENDING', impact_check: 'PENDING',
    target_section_id: 'fixture-rule', target_heading: '## Rule', source_baseline_sha256: hash(source) };
  const catalogue = { schema_version: '1.0.0',
    rules: [{ id: 'FIXTURE-R1', module_id: module.module_id, source: module.source, authority: module.authority,
      anchor: '## Rule', text: 'Preserve original records.', section_id: 'fixture-rule' }],
    coverage: [{ module_id: module.module_id, source: module.source, scope: 'partial', mapped_rule_count: 1,
      evidence_ref: 'review.json', remaining: 'Other sections need explicit scope.' }],
    section_coverage: [{ section_id: 'fixture-rule', module_id: module.module_id, source: module.source, heading: '## Rule',
      scope: 'complete_section', section_sha256: sectionSha256('## Rule\nPreserve original records.'), rule_ids: ['FIXTURE-R1'],
      evidence_ref: 'review.json#rule', remaining_outside_section: 'Preamble and title only.' }] };
  const impact = assessSotImpact({ proposal, catalogue, registry, graph });
  const binding = scopeReviewBinding({ proposal, impact, registry, graph, catalogue, sources: { [module.source]: source } });
  const scopeReview = { schema_version: '1.0.0', reviewer: 'fixture-reviewer', reviewed_at: time,
    evidence_ref: 'review.json', binding, unresolved_references: [],
    sections: binding.modules.flatMap(m => m.sections.map(section => ({ ...section, module_id: m.module_id,
      disposition: section.heading === '## Rule' ? 'INCLUDED_RULE_SCOPE' : 'CONTEXT_CONTAINER',
      rule_ids: section.heading === '## Rule' ? ['FIXTURE-R1'] : [], evidence_ref: 'review.json#scope',
      rationale: section.heading === '## Rule' ? 'Only rule preserved; addition is a supporting reference.' : 'Heading/preamble supplies context only.' }))) };
  const conflictReviews = [{ candidate_id: 'FIXTURE-R1', relation: 'EXTENSION', reviewer: 'fixture-reviewer',
    evidence_ref: 'review.json#relationship', evidence_scope: { proposal_id: proposal.id, candidate_id: 'FIXTURE-R1' },
    rationale: 'The proposal adds an evidence link without changing the existing preservation rule.' }];
  const wording = 'SYNTHETIC TEST ONLY: approve exact fixture proposal FIXTURE-P1.';
  const originalPath = join(projectRoot, 'user-original.txt');
  const manifestPath = join(projectRoot, 'user-import.json');
  const userDecision = { actor: { role: 'USER', id: 'synthetic-user' }, decision: null,
    evidence: { reference: 'fixture://original#decision', scope: proposal.id, wording, decided_at: time } };
  const manifest = { schema_version: '1.0.0', captured_at: time, decision_time: { precision: 'timestamp', value: time },
    original: { path: originalPath, sha256: hash(wording), reference: 'fixture://original', author: userDecision.actor },
    quote: { text: wording, byte_offset: 0 }, binding: { proposalId: proposal.id, proposal_sha256: decisionProposalHash(proposal),
      action: 'APPROVE', ...userDecision } };
  const reviewDocument = JSON.stringify({ scopeReview, conflictReviews });
  const files = { 'docs/owner.md': source, 'docs/reference.md': '# Reference\nSynthetic supporting evidence.\n',
    'docs/epic.md': epicText, 'docs/governance/module-registry.json': JSON.stringify(registry),
    'docs/governance/contracts.json': JSON.stringify(contracts), 'docs/governance/dependency-graph.json': JSON.stringify(supplement),
    'review.json': reviewDocument, 'user-original.txt': wording, 'user-import.json': JSON.stringify(manifest),
    'check-source.mjs': `import { readFileSync } from 'node:fs'; import assert from 'node:assert/strict';
assert.equal(readFileSync('docs/owner.md','utf8'), ${JSON.stringify(expected)});
` };
  for (const [path, body] of Object.entries(files)) {
    await mkdir(dirname(join(projectRoot, path)), { recursive: true }); await writeFile(join(projectRoot, path), body);
  }
  await mkdir(join(projectRoot, 'docs/sot-optimization/audits'), { recursive: true });
  const git = args => { const result = spawnSync('git', args, { cwd: projectRoot, encoding: 'utf8' }); assert.equal(result.status, 0, result.stderr); };
  git(['init', '--quiet']); git(['add', 'docs/owner.md']);
  const acceptedScope = JSON.stringify(scopeReview);
  const acceptedConflicts = JSON.stringify(conflictReviews);
  const validators = Object.fromEntries(['sotConsistency', 'traceability'].map(name => [name, async () => {
    const actual = await readFile(join(projectRoot, 'docs/owner.md'), 'utf8');
    let valid = actual === expected;
    if (name === 'traceability') valid &&= (await readFile(originalPath, 'utf8')) === wording
      && actual.includes(addition) && (await readFile(join(projectRoot, 'docs/reference.md'), 'utf8')).includes('Synthetic supporting evidence.');
    if (!valid) return { status: 'BLOCKED', reason: 'Concrete fixture source/trace invariant failed.' };
    const proof = { proposal_id: proposal.id, module_id: module.module_id, source_sha256: hash(actual), check: name,
      status: 'PASS', detail: name === 'sotConsistency' ? 'Exact original rule and reference-only append verified.' : 'Pinned synthetic user input and actual source/reference files verified.' };
    const evidence_ref = `docs/sot-optimization/audits/${name}.json`;
    const bytes = JSON.stringify(proof);
    await writeFile(join(projectRoot, evidence_ref), bytes, { flag: 'wx' });
    return { status: 'PASS', evidence_ref, evidence_sha256: hash(bytes) };
  }]));
  const manifests = { [module.module_id]: { requirements: [{ id: 'FIXTURE-R1', rule: 'Preserve original records.' }] } };
  return { projectRoot, source, expected, module, originalPath,
    input: { projectRoot, workItemId: 'WI-SOT-16-01', proposal, catalogue, scopeReview, conflictReviews,
      verifyReviewer: value => JSON.stringify(value) === acceptedScope,
      verifyConflictReview: async ({ review }) => (await readFile(join(projectRoot, 'review.json'), 'utf8')) === reviewDocument
        && JSON.stringify([review]) === acceptedConflicts,
      trustedUserImports: [{ manifestPath, sha256: hash(JSON.stringify(manifest)) }], userDecision,
      proposedSection: '## Rule\nPreserve original records.\n\n' + addition,
      traceability: [{ proposal_id: proposal.id, source_ref: 'user-original.txt', source_anchor: wording, target_ref: module.source }],
      decisionStatePath: 'decision-events.jsonl', validators,
      audit: { outputPath: 'docs/sot-optimization/audits/workflow.json', change: { kind: 'REFERENCE_ADDITION' },
        beforeManifests: manifests, afterManifests: structuredClone(manifests),
        test_commands: [{ id: 'actual-source-contract', covers: [module.module_id], ref: 'check-source.mjs',
          command: process.execPath, args: ['check-source.mjs'] }] } } };
}

test('disk-backed local pipeline persists exact approval, executes FAST checks and derives local DONE evidence', async t => {
  const f = await fixture(t);
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.status, 'LOCAL_WORKFLOW_VERIFIED', JSON.stringify(result));
  assert.equal(result.post_validation.mode, 'FAST_CHECK');
  assert.equal(result.done_guard.status, 'DONE_ALLOWED');
  assert.equal(result.live_rollout, false);
  assert.equal(result.work_item_done_written, false);
  assert.equal(await readFile(join(f.projectRoot, f.module.source), 'utf8'), f.expected);
  const state = await createDecisionStore(join(f.projectRoot, 'decision-events.jsonl')).read();
  assert.equal(state.events.length, 3);
  assert.equal(state.proposals.get('FIXTURE-P1').proposal.status, 'APPROVED');
  const audit = JSON.parse(await readFile(join(f.projectRoot, f.input.audit.outputPath), 'utf8'));
  assert.equal(audit.status, 'PASS');
  await assert.rejects(readFile(join(f.projectRoot, `${f.module.source}.sot-recovery.json`)), { code: 'ENOENT' });
});

test('missing validators and mutated imported user evidence block before persistence or source writes', async t => {
  for (const mutate of [f => { delete f.input.validators.traceability; },
    async f => { await writeFile(f.originalPath, 'Changed synthetic source'); }]) {
    const f = await fixture(t); await mutate(f);
    const result = await runGovernanceWorkflow(f.input);
    assert.equal(result.status, 'WORKFLOW_BLOCKED');
    assert.equal(result.stage, 'PREFLIGHT');
    assert.equal(await readFile(join(f.projectRoot, f.module.source), 'utf8'), f.source);
    await assert.rejects(readFile(join(f.projectRoot, 'decision-events.jsonl')), { code: 'ENOENT' });
  }
});

test('untrusted conflict reviewer cannot be replaced with the imported user decision', async t => {
  const f = await fixture(t); f.input.verifyConflictReview = () => false;
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.reason, 'AUTHENTICATED_CONFLICT_REVIEW_REQUIRED');
  assert.equal(await readFile(join(f.projectRoot, f.module.source), 'utf8'), f.source);
});

test('failed concrete post-check restores the original and preserves the failed audit', async t => {
  const f = await fixture(t);
  f.input.validators.traceability = async () => ({ status: 'BLOCKED', reason: 'Missing concrete fixture trace.' });
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.status, 'WORKFLOW_BLOCKED');
  assert.equal(result.details.status, 'ROLLED_BACK');
  assert.equal(await readFile(join(f.projectRoot, f.module.source), 'utf8'), f.source);
  assert.ok(await readFile(join(f.projectRoot, f.input.audit.outputPath)));
  assert.equal(result.post_validation.status, 'POST_VALIDATION_BLOCKED');
  const persisted = JSON.parse(await readFile(join(f.projectRoot, result.post_validation_output), 'utf8'));
  assert.equal(persisted.status, 'POST_VALIDATION_BLOCKED');
});

test('a nominal PASS with evidence for another source version is rejected and rolled back', async t => {
  const f = await fixture(t);
  f.input.validators.traceability = async () => {
    const evidence_ref = 'docs/sot-optimization/audits/forged.json';
    const bytes = JSON.stringify({ proposal_id: 'FIXTURE-P1', module_id: f.module.module_id,
      source_sha256: hash(f.source), check: 'traceability', status: 'PASS', detail: 'Wrong source version.' });
    await writeFile(join(f.projectRoot, evidence_ref), bytes);
    return { status: 'PASS', evidence_ref, evidence_sha256: hash(bytes) };
  };
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.details.status, 'ROLLED_BACK');
  assert.match(JSON.stringify(result.post_validation), /VALIDATOR_EVIDENCE_NOT_BOUND_TO_UPDATE/);
});


test('changed source invalidates scoped review before any approval event is persisted', async t => {
  const f = await fixture(t);
  await writeFile(join(f.projectRoot, f.module.source), f.source + '\nIndependent change.\n');
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.status, 'WORKFLOW_BLOCKED');
  assert.equal(result.stage, 'SCOPE_REVIEW');
  await assert.rejects(readFile(join(f.projectRoot, 'decision-events.jsonl')), { code: 'ENOENT' });
});

test('FULL escalation without required full validators blocks and rolls back', async t => {
  const f = await fixture(t);
  f.input.audit.change.changed_sections = ['Definition of Done'];
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.status, 'WORKFLOW_BLOCKED');
  assert.equal(result.details.status, 'ROLLED_BACK');
  assert.equal(result.post_validation.mode, 'FULL_CHECK');
  assert.match(result.post_validation.alert, /FULL CHECK REQUIRED/);
  assert.equal(await readFile(join(f.projectRoot, f.module.source), 'utf8'), f.source);
});

test('concurrent contract metadata edits cannot pass using old in-memory catalogues', async t => {
  const f = await fixture(t);
  const check = f.input.validators.traceability;
  f.input.validators.traceability = async context => {
    const result = await check(context);
    await writeFile(join(f.projectRoot, 'docs/governance/contracts.json'), '{"changed":"independent"}');
    return result;
  };
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.details.status, 'ROLLED_BACK');
  assert.match(JSON.stringify(result.post_validation), /ANCILLARY_SOURCE_CHANGED/);
  assert.equal(await readFile(join(f.projectRoot, 'docs/governance/contracts.json'), 'utf8'), '{"changed":"independent"}');
});

test('whole-pipeline process interruption leaves durable recovery bound to original user evidence', async t => {
  const f = await fixture(t);
  const moduleUrl = new URL('./governance-workflow.mjs', import.meta.url).href;
  const child = spawnSync(process.execPath, ['--input-type=module', '-e', `
    import { runGovernanceWorkflow } from ${JSON.stringify(moduleUrl)};
    const input = JSON.parse(process.argv[1]);
    const accepted = JSON.stringify(input.scopeReview);
    const reviews = JSON.stringify(input.conflictReviews);
    input.verifyReviewer = review => JSON.stringify(review) === accepted;
    input.verifyConflictReview = ({review}) => JSON.stringify([review]) === reviews;
    input.validators = { sotConsistency: async () => process.exit(77), traceability: async () => process.exit(78) };
    const result = await runGovernanceWorkflow(input);
    process.stderr.write(JSON.stringify(result)); process.exit(79);
  `, JSON.stringify(f.input)], { encoding: 'utf8' });
  assert.equal(child.status, 77, child.stderr);
  assert.equal(await readFile(join(f.projectRoot, f.module.source), 'utf8'), f.expected);
  const recovered = await recoverGovernanceWorkflow({ projectRoot: f.projectRoot, source: f.module.source,
    decisionStatePath: f.input.decisionStatePath, trustedUserImports: f.input.trustedUserImports });
  assert.equal(recovered.status, 'RECOVERED', JSON.stringify(recovered));
  assert.equal(await readFile(join(f.projectRoot, f.module.source), 'utf8'), f.source);
});


test('the owner may also be the work-item source when exact approved bytes preserve its dependency graph', async t => {
  const f = await fixture(t, true);
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.status, 'LOCAL_WORKFLOW_VERIFIED', JSON.stringify(result));
  assert.equal(await readFile(join(f.projectRoot, f.module.source), 'utf8'), f.expected);
});


async function workerFixture(f, integrationReady = true) {
  const planPath = join(f.projectRoot, 'worker-plan.md');
  await writeFile(planPath, '- [ ] READY - WI-SOT-16-01 - Fixture governance work\n');
  const store = createWorkerStateStore({ path: join(f.projectRoot, 'workers.json'), planPath });
  await store.claim({ work_item_id: 'WI-SOT-16-01', worker_id: 'implementer', write_scope: [f.module.source] });
  await store.start({ work_item_id: 'WI-SOT-16-01', worker_id: 'implementer' });
  await store.handover({ work_item_id: 'WI-SOT-16-01', worker_id: 'implementer', summary: 'Exact tested append.',
    files: [f.module.source], tests: ['source contract and workflow'], limitations: [], follow_up: [], decision_refs: ['review.json'] });
  if (integrationReady) await store.review({ work_item_id: 'WI-SOT-16-01', reviewer_id: 'independent-reviewer', accepted: true, evidence_ref: 'review.json' });
  return store;
}
const integrationInput = (f, result, workerStore) => ({ projectRoot: f.projectRoot, resultPath: result.result_output,
  expectedResultSha256: result.result_sha256, workItemId: 'WI-SOT-16-01', workerStore,
  integratorId: 'integrator', evidenceRef: result.result_output });

test('workflow scope must match the persisted proposal work-item binding', async t => {
  const f = await fixture(t);
  f.input.workItemId = 'WI-SOT-16-02';
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.status, 'WORKFLOW_BLOCKED');
  assert.equal(result.stage, 'PREFLIGHT');
  assert.equal(await readFile(join(f.projectRoot, f.module.source), 'utf8'), f.source);
});

test('pinned on-disk evidence drives the actual reviewed worker state to Done', async t => {
  const f = await fixture(t);
  const result = await runGovernanceWorkflow(f.input);
  assert.equal(result.status, 'LOCAL_WORKFLOW_VERIFIED');
  const store = await workerFixture(f);
  const integrated = await integrateGovernanceResult(integrationInput(f, result, store));
  assert.equal(integrated.status, 'WORK_ITEM_INTEGRATED', JSON.stringify(integrated));
  const record = (await store.snapshot()).records['WI-SOT-16-01'];
  assert.equal(record.execution_state, 'Done');
  assert.equal(record.completion_evidence.scope, 'WI-SOT-16-01');
  assert.equal(record.completion_evidence.postValidation.scope, 'WI-SOT-16-01');
});

test('a different requested work item and non-Integration worker stage are rejected', async t => {
  const f = await fixture(t);
  const result = await runGovernanceWorkflow(f.input);
  const store = await workerFixture(f, false);
  const wrongItem = await integrateGovernanceResult({ ...integrationInput(f, result, store), workItemId: 'WI-SOT-16-02' });
  assert.equal(wrongItem.status, 'INTEGRATION_BLOCKED');
  assert.equal(wrongItem.reason, 'WORKFLOW_RESULT_SCOPE_OR_STATUS_INVALID');
  const stage = await integrateGovernanceResult(integrationInput(f, result, store));
  assert.equal(stage.reason, 'WORKER_NOT_READY_FOR_INTEGRATION');
  assert.equal((await store.snapshot()).records['WI-SOT-16-01'].execution_state, 'Review');
});

test('changed result, failed post-check artifact, runtime binding and owner source cannot integrate', async t => {
  const mutations = [
    async (f, r) => writeFile(join(f.projectRoot, r.result_output), '{}'),
    async (f, r) => writeFile(join(f.projectRoot, r.artifacts.post_validation.path), '{"status":"POST_VALIDATION_BLOCKED"}'),
    async (f, r) => writeFile(join(f.projectRoot, f.module.source), 'Concurrent source edit'),
    async (f, r) => {
      const document = JSON.parse(await readFile(join(f.projectRoot, r.result_output), 'utf8'));
      document.artifacts.runtime[0].sha256 = '0'.repeat(64);
      const bytes = JSON.stringify(document);
      await writeFile(join(f.projectRoot, r.result_output), bytes);
      r.result_sha256 = hash(bytes);
    },
  ];
  for (const mutate of mutations) {
    const f = await fixture(t); const result = await runGovernanceWorkflow(f.input);
    const store = await workerFixture(f); await mutate(f, result);
    const integrated = await integrateGovernanceResult(integrationInput(f, result, store));
    assert.equal(integrated.status, 'INTEGRATION_BLOCKED', JSON.stringify(integrated));
    assert.equal((await store.snapshot()).records['WI-SOT-16-01'].execution_state, 'Integration');
  }
});

test('legacy success gets a new pinned attestation without changing any original artifact', async t => {
  const f = await fixture(t);
  const modern = await runGovernanceWorkflow(f.input);
  // Build a representative old result: no schema/artifact bundle and unscoped post result.
  const legacyPost = structuredClone(modern.post_validation); delete legacyPost.scope;
  const legacyPostRef = 'docs/sot-optimization/audits/legacy-post.json';
  const legacyPostBytes = JSON.stringify(legacyPost);
  await writeFile(join(f.projectRoot, legacyPostRef), legacyPostBytes, { flag: 'wx' });
  const legacy = { status: modern.status, stage: modern.stage, proposal_id: modern.proposal_id, source: modern.source,
    update: modern.update, post_validation: legacyPost, done_guard: modern.done_guard };
  const legacyPath = 'docs/sot-optimization/audits/legacy-result.json';
  const legacyBytes = JSON.stringify(legacy);
  await writeFile(join(f.projectRoot, legacyPath), legacyBytes, { flag: 'wx' });
  const expectedDecisionStateSha256 = hash(await readFile(join(f.projectRoot, f.input.decisionStatePath)));
  const pinnedProofHashes = { audit: modern.artifacts.audit, post_validation: { path: legacyPostRef, sha256: hash(legacyPostBytes) },
    validators: modern.artifacts.validators, metadata: modern.artifacts.metadata };
  const request = { projectRoot: f.projectRoot, resultPath: legacyPath, expectedResultSha256: hash(legacyBytes),
    workItemId: 'WI-SOT-16-01', decisionStatePath: f.input.decisionStatePath, expectedDecisionStateSha256, pinnedProofHashes,
    attestationPath: 'docs/sot-optimization/audits/legacy-attestation.json' };
  const attested = await attestLegacyGovernanceResult(request);
  assert.equal(attested.status, 'LOCAL_WORKFLOW_VERIFIED', JSON.stringify(attested));
  assert.equal(attested.historical_result_rewritten, false);
  const store = await workerFixture(f);
  const integrated = await integrateGovernanceResult(integrationInput(f, attested, store));
  assert.equal(integrated.status, 'WORK_ITEM_INTEGRATED', JSON.stringify(integrated));
  assert.equal(await readFile(join(f.projectRoot, legacyPath), 'utf8'), legacyBytes);
  assert.equal(await readFile(join(f.projectRoot, legacyPostRef), 'utf8'), legacyPostBytes);
  const incorrect = await attestLegacyGovernanceResult({ ...request, workItemId: 'WI-SOT-16-02',
    attestationPath: 'docs/sot-optimization/audits/rejected-attestation.json' });
  assert.equal(incorrect.status, 'ATTESTATION_BLOCKED');
});
