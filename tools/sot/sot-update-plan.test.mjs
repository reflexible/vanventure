import { spawnSync } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, writeFile, rm, open, link, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { applySotUpdatePlan, buildSotUpdatePlan, recoverSotUpdate } from './sot-update-plan.mjs';
import { createDecisionStore } from './decision-state.mjs';

const hash = source => createHash('sha256').update(source).digest('hex');
const source = '# Module\r\n\r\n## Rules\r\nExisting binding rule.\r\n\r\n```md\r\n## Example heading\r\n```\r\n\r\n## Other\r\nKeep me.\r\n';
const proposal = { target_heading: '## Rules', source_baseline_sha256: hash(source), id: 'P-1', status: 'APPROVED', integration: 'NOT_STARTED', content: 'New additive requirement.',
  authority: 'governance.sot-architecture', owner: { module_id: 'sot-architecture', authority: 'governance.sot-architecture',
    source: 'docs/governance/source-of-truth-and-incremental-planning.md' } };
const approvedProposal = { ...proposal, approval: { kind: 'PROPOSAL_INTEGRATION_ONLY',
  grants_product_release: false, grants_design_rule: false, grants_live_rollout: false,
  evidence: { reference: 'approval.md#P-1' } } };
const approvalEvent = { type: 'DECISION', proposal_id: proposal.id, action: 'APPROVE', revision: 4,
  event_hash: 'a'.repeat(64), transition: { status: 'APPROVED', proposal: approvedProposal } };
const module = { module_id: proposal.owner.module_id, authority: proposal.authority,
  source: proposal.owner.source, status: 'active_reference' };
const registry = { schema_version: '1.0.0', modules: [{ ...module, name: 'SoT Architecture', version: null,
  dependencies: [], contracts: [], last_verified_baseline: null, semantic_baseline: null, last_audit_status: null }] };
const impact = { proposal_id: 'P-1', owner: { module_id: module.module_id,
  authority: module.authority, source: module.source }, unknowns: [] };
const conflict = { proposal_id: 'P-1', status: 'CLASSIFIED', sot_update_allowed: false,
  user_decision_required: false, unresolved_candidate_ids: [], unknown_coverage: [], relationships: [] };
const coverage = { proposal_id: 'P-1', unknowns: [], cross_module_unknowns: [], semantic_equivalence: 'UNDETERMINED' };
const traceability = [{ proposal_id: 'P-1', source_ref: 'request.md', source_anchor: 'REQ-1', target_ref: module.source }];
const input = overrides => ({ proposal: approvedProposal, approvedProposal, impact, conflict, coverage, module,
  currentSource: source, baselineSha256: hash(source), targetHeading: '## Rules',
  proposedSection: '## Rules\nExisting binding rule.\n\n```md\n## Example heading\n```\n\nNew additive requirement.', traceability,
  decisionState: { events: [approvalEvent] }, verifyUserDecision: () => true, registry, ...overrides });

test('prepares an approved append-only preview without writing and preserves source line endings', () => {
  const result = buildSotUpdatePlan(input());
  assert.equal(result.status, 'PREPARED_NOT_APPLIED');
  assert.equal(result.plan.write_performed, false);
  assert.equal(result.plan.operation, 'APPEND_ONLY_SECTION_EXTENSION');
  assert.ok(result.plan.updated_source.includes('Existing binding rule.\r\n\r\n```md\r\n## Example heading\r\n```\r\n\r\nNew additive requirement.'));
  assert.ok(result.plan.updated_source.endsWith('## Other\r\nKeep me.\r\n'));
  assert.equal(hash(source), result.plan.before_sha256);
});

test('blocks missing approval, unknown impact, unresolved conflict, incomplete coverage and stale source', () => {
  const cases = [
    { approvedProposal: null },
    { impact: { ...impact, unknowns: [{ module_id: 'analytics' }] } },
    { conflict: { ...conflict, status: 'NEEDS_ANALYSIS' } },
    { coverage: { ...coverage, unknowns: [{ reason: 'PARTIAL' }] } },
    { baselineSha256: '0'.repeat(64) },
  ];
  for (const override of cases) assert.equal(buildSotUpdatePlan(input(override)).status, 'UPDATE_BLOCKED');
});

test('blocks core writes through the specialist update path', () => {
  const result = buildSotUpdatePlan(input({ module: { ...module, module_id: 'scrum-core',
    authority: 'planning.scrum-core', source: 'docs/scrum-plan.md' } }));
  assert.ok(result.errors.includes('SCRUM_CORE_REQUIRES_SEPARATE_GOLDEN_BASELINE_GATE'));
});

test('requires exact preservation of current section rules and approved proposal text', () => {
  for (const proposedSection of ['## Rules\nReplacement only.', '## Rules\nExisting binding rule.']) {
    const result = buildSotUpdatePlan(input({ proposedSection }));
    assert.equal(result.status, 'UPDATE_BLOCKED');
  }
});

test('blocks duplicates and unsupported superseding relationships', () => {
  for (const relation of ['DUPLICATE', 'SUPERSEDES']) {
    const result = buildSotUpdatePlan(input({ conflict: { ...conflict,
      relationships: [{ candidate_id: 'RULE-1', relation }] } }));
    assert.equal(result.status, 'UPDATE_BLOCKED');
    assert.ok(result.errors.includes('CONFLICT_REVIEW_NOT_CLOSED_OR_UNSUPPORTED_RELATION'));
  }
});

test('requires traceability to the same proposal and authoritative file', () => {
  const result = buildSotUpdatePlan(input({ traceability: [{ ...traceability[0], proposal_id: 'P-2' }] }));
  assert.equal(result.status, 'UPDATE_BLOCKED');
  assert.ok(result.errors.includes('PROPOSAL_TO_SOURCE_TRACEABILITY_REQUIRED'));
});

async function applyFixture(t) {
  const projectRoot = await mkdtemp(join(tmpdir(), 'sot-update-'));
  t.after(() => rm(projectRoot, { recursive: true, force: true }));
  const sourcePath = join(projectRoot, 'module.md');
  await writeFile(sourcePath, source);
  await mkdir(join(projectRoot, 'docs/governance'), { recursive: true });
  const localModule = { ...module, source: 'module.md' };
  const localRegistry = { schema_version: '1.0.0', modules: [{ ...registry.modules[0], source: 'module.md' }] };
  await writeFile(join(projectRoot, 'docs/governance/module-registry.json'), JSON.stringify(localRegistry));
  const localProposal = { ...proposal, status: 'PROPOSED', integration: 'NOT_STARTED', approval: null,
    conflict_check: 'PENDING', owner: { ...proposal.owner, source: 'module.md' } };
  const localImpact = { ...impact, owner: { ...impact.owner, source: 'module.md' } };
  const decisionStatePath = join(projectRoot, 'decision-events.jsonl');
  const verifyUserDecision = () => true;
  const store = createDecisionStore(decisionStatePath, { verifyUserDecision });
  const localCandidateImpact = { proposal_id: localProposal.id, owner: localImpact.owner,
    candidates: [], unknowns: [], conflict_check: 'PENDING' };
  await store.register({ proposal: localProposal, impact: localCandidateImpact, expectedRevision: 0, idempotencyKey: 'register' });
  await store.recordReview({ proposalId: localProposal.id, reviews: [], expectedRevision: 1, idempotencyKey: 'review' });
  const evidence = { reference: 'approval.md#P-1', scope: 'P-1', wording: 'Approve proposal P-1 for specialist source integration.', decided_at: '2026-09-26T12:00:00Z' };
  await store.decide({ proposalId: localProposal.id, action: 'APPROVE', actor: { role: 'USER', id: 'user-1' }, evidence,
    expectedRevision: 2, idempotencyKey: 'approve' });
  const decisionState = await store.read();
  const persistedProposal = decisionState.proposals.get(localProposal.id).proposal;
  const result = buildSotUpdatePlan(input({ module: localModule, proposal: persistedProposal,
    approvedProposal: persistedProposal, impact: localImpact, decisionState, verifyUserDecision,
    registry: localRegistry, traceability: [{ ...traceability[0], target_ref: 'module.md' }] }));
  assert.equal(result.status, 'PREPARED_NOT_APPLIED');
  return { projectRoot, sourcePath, decisionStatePath: 'decision-events.jsonl', verifyUserDecision, plan: result.plan };
}

test('applies only after a passing post-validation callback', async t => {
  const { projectRoot, sourcePath, plan, decisionStatePath, verifyUserDecision } = await applyFixture(t);
  const result = await applySotUpdatePlan({ plan, projectRoot, decisionStatePath, verifyUserDecision,
    validateAfter: async ({ source: updated }) => {
      assert.equal(hash(updated), plan.after_sha256);
      return { status: 'POST_VALIDATION_PASS', audit_output: 'audit.json', checks: [{ status: 'PASS' }] };
    } });
  assert.equal(result.status, 'APPLIED');
  assert.equal(hash(await readFile(sourcePath)), plan.after_sha256);
});

test('restores exact original bytes when post-validation fails', async t => {
  const { projectRoot, sourcePath, plan, decisionStatePath, verifyUserDecision } = await applyFixture(t);
  const result = await applySotUpdatePlan({ plan, projectRoot, decisionStatePath, verifyUserDecision,
    validateAfter: async () => ({ status: 'POST_VALIDATION_BLOCKED', reason: 'Contract failure', checks: [{ status: 'BLOCKED' }] }) });
  assert.equal(result.status, 'ROLLED_BACK');
  assert.equal(result.restored_sha256, plan.before_sha256);
  assert.equal(hash(await readFile(sourcePath)), plan.before_sha256);
});

test('stale source and active update lock block before any write', async t => {
  const { projectRoot, sourcePath, plan, decisionStatePath, verifyUserDecision } = await applyFixture(t);
  await writeFile(sourcePath, 'concurrent change');
  const stale = await applySotUpdatePlan({ plan, projectRoot, decisionStatePath, verifyUserDecision, validateAfter: async () => ({ status: 'POST_VALIDATION_PASS', audit_output: 'audit.json', checks: [{ status: 'PASS' }] }) });
  assert.equal(stale.reason, 'SOURCE_CHANGED_AFTER_PREVIEW');
  await writeFile(sourcePath, source);
  const lock = await open(`${sourcePath}.sot-update.lock`, 'wx');
  try {
    const locked = await applySotUpdatePlan({ plan, projectRoot, decisionStatePath, verifyUserDecision, validateAfter: async () => ({ status: 'POST_VALIDATION_PASS', audit_output: 'audit.json', checks: [{ status: 'PASS' }] }) });
    assert.equal(locked.reason, 'UPDATE_LOCK_EXISTS');
  } finally { await lock.close(); await rm(`${sourcePath}.sot-update.lock`, { force: true }); }
  assert.equal(hash(await readFile(sourcePath)), plan.before_sha256);
});

test('revalidates the persisted approval and blocks when user authentication no longer passes', async t => {
  const { projectRoot, plan, decisionStatePath } = await applyFixture(t);
  const result = await applySotUpdatePlan({ plan, projectRoot, decisionStatePath,
    verifyUserDecision: () => false,
    validateAfter: async () => ({ status: 'POST_VALIDATION_PASS', audit_output: 'audit.json', checks: [{ status: 'PASS' }] }) });
  assert.equal(result.status, 'APPLY_BLOCKED');
  assert.equal(result.reason, 'PERSISTED_APPROVAL_REVALIDATION_FAILED');
});

test('rechecks current registered ownership at apply time', async t => {
  const { projectRoot, plan, decisionStatePath, verifyUserDecision } = await applyFixture(t);
  const registryPath = join(projectRoot, 'docs/governance/module-registry.json');
  const changedRegistry = JSON.parse(await readFile(registryPath, 'utf8'));
  changedRegistry.modules[0].status = 'superseded';
  await writeFile(registryPath, JSON.stringify(changedRegistry));
  const result = await applySotUpdatePlan({ plan, projectRoot, decisionStatePath, verifyUserDecision,
    validateAfter: async () => ({ status: 'POST_VALIDATION_PASS', audit_output: 'audit.json', checks: [{ status: 'PASS' }] }) });
  assert.equal(result.status, 'APPLY_BLOCKED');
  assert.equal(result.reason, 'REGISTERED_SOURCE_OWNER_CHANGED');
});


test('rejects arbitrary extra text and undefined conflict relationships', () => {
  const base = input();
  for (const proposedSection of [base.proposedSection + '\nUnapproved rule.',
    base.proposedSection.replace('Existing binding rule.', 'Unapproved rule.\nExisting binding rule.')]) {
    assert.equal(buildSotUpdatePlan(input({ proposedSection })).status, 'UPDATE_BLOCKED');
  }
  for (const relation of ['TYPO', undefined, 'CONTRADICTION', 'UNDETERMINED']) {
    assert.equal(buildSotUpdatePlan(input({ conflict: { ...conflict, relationships: [{ relation }] } })).status, 'UPDATE_BLOCKED');
  }
});

test('preserves every original byte across mixed line endings and trailing blank lines', () => {
  for (const currentSource of ['# Intro\r\n\n## Rules\r\nExisting.\n\r\n\n## Other\nUntouched.\r\n\r\n',
    '# Intro\n\n## Rules\r\nExisting.\n\r\n\n']) {
    const boundProposal = { ...approvedProposal, source_baseline_sha256: hash(currentSource) };
    const result = buildSotUpdatePlan(input({ currentSource, baselineSha256: hash(currentSource),
      proposal: boundProposal, approvedProposal: boundProposal, decisionState: { events: [{ ...approvalEvent, transition: { status: 'APPROVED', proposal: boundProposal } }] },
      proposedSection: '## Rules\nExisting.\n\nNew additive requirement.' }));
    assert.equal(result.status, 'PREPARED_NOT_APPLIED');
    const insertion = '\r\n\r\nNew additive requirement.';
    assert.equal(result.plan.updated_source.replace(insertion, ''), currentSource);
    assert.equal(result.plan.updated_source, currentSource.replace('Existing.', 'Existing.' + insertion));
  }
});

test('apply rejects edited preview even when attacker recalculates its hash', async t => {
  const fixture = await applyFixture(t);
  fixture.plan.updated_source += '\nUnapproved binding rule.\n';
  fixture.plan.after_sha256 = hash(fixture.plan.updated_source);
  const result = await applySotUpdatePlan({ ...fixture, validateAfter: async () => { throw new Error('must not validate'); } });
  assert.equal(result.status, 'APPLY_BLOCKED');
  assert.equal(result.reason, 'PREVIEW_NOT_EXACT_APPROVED_APPEND');
  assert.equal(await readFile(fixture.sourcePath, 'utf8'), source);
});

test('successful validator cannot conceal concurrent source modification', async t => {
  const fixture = await applyFixture(t);
  const result = await applySotUpdatePlan({ ...fixture, validateAfter: async ({ plan }) => {
    await writeFile(fixture.sourcePath, 'Concurrent independent edit');
    plan.after_sha256 = hash('Concurrent independent edit');
    fixture.plan.after_sha256 = hash('Concurrent independent edit');
    return { status: 'POST_VALIDATION_PASS', audit_output: 'audit.json', checks: [{ status: 'PASS' }] };
  } });
  assert.equal(result.status, 'ROLLBACK_BLOCKED');
  assert.equal(result.reason, 'SOURCE_CHANGED_DURING_SUCCESSFUL_VALIDATION');
  assert.equal(await readFile(fixture.sourcePath, 'utf8'), 'Concurrent independent edit');
});

test('blocks a hardlink alias of the protected core before writing', async t => {
  const fixture = await applyFixture(t);
  const corePath = join(fixture.projectRoot, 'docs/scrum-plan.md');
  await link(fixture.sourcePath, corePath);
  const result = await applySotUpdatePlan({ ...fixture, validateAfter: async () => { throw new Error('must not validate'); } });
  assert.equal(result.status, 'APPLY_BLOCKED');
  assert.equal(result.reason, 'PROTECTED_CORE_FILE_ALIAS');
  assert.equal(await readFile(corePath, 'utf8'), source);
});

test('blocks directory junction or symlink escaping the physical project root', async t => {
  const fixture = await applyFixture(t);
  const outside = await mkdtemp(join(tmpdir(), 'sot-outside-'));
  t.after(() => rm(outside, { recursive: true, force: true }));
  await writeFile(join(outside, 'module.md'), source);
  const alias = join(fixture.projectRoot, 'alias');
  await symlink(outside, alias, process.platform === 'win32' ? 'junction' : 'dir');
  const result = await applySotUpdatePlan({ ...fixture, plan: { ...fixture.plan, source: 'alias/module.md' },
    validateAfter: async () => { throw new Error('must not validate'); } });
  assert.equal(result.status, 'APPLY_BLOCKED');
  assert.equal(result.reason, 'PHYSICAL_PATH_OUTSIDE_PROJECT');
  assert.equal(await readFile(join(outside, 'module.md'), 'utf8'), source);
});


test('persisted target and baseline are mandatory and target tampering blocks apply', async t => {
  const unbound = { ...approvedProposal };
  delete unbound.target_heading;
  assert.equal(buildSotUpdatePlan(input({ proposal: unbound, approvedProposal: unbound })).status, 'UPDATE_BLOCKED');
  const fixture = await applyFixture(t);
  fixture.plan.target_heading = '## Other';
  const result = await applySotUpdatePlan({ ...fixture, validateAfter: async () => { throw new Error('must not validate'); } });
  assert.equal(result.reason, 'PERSISTED_APPROVAL_REVALIDATION_FAILED');
  assert.equal(await readFile(fixture.sourcePath, 'utf8'), source);
});

function crashDuringValidation(fixture) {
  const moduleUrl = new URL('./sot-update-plan.mjs', import.meta.url).href;
  const child = spawnSync(process.execPath, ['--input-type=module', '-e', `
    import { applySotUpdatePlan } from ${JSON.stringify(moduleUrl)};
    const fixture = JSON.parse(process.argv[1]);
    await applySotUpdatePlan({ ...fixture, verifyUserDecision: () => true,
      validateAfter: async () => process.exit(77) });
    process.exit(78);
  `, JSON.stringify(fixture)], { encoding: 'utf8' });
  assert.equal(child.status, 77, child.stderr);
}

const recoveryArgs = fixture => ({ projectRoot: fixture.projectRoot, source: 'module.md',
  decisionStatePath: fixture.decisionStatePath, verifyUserDecision: fixture.verifyUserDecision });

test('durable journal recovers exact bytes after an actual writer process exits before validation', async t => {
  const fixture = await applyFixture(t);
  crashDuringValidation(fixture);
  assert.equal(hash(await readFile(fixture.sourcePath)), fixture.plan.after_sha256);
  const result = await recoverSotUpdate(recoveryArgs(fixture));
  assert.equal(result.status, 'RECOVERED');
  assert.equal(await readFile(fixture.sourcePath, 'utf8'), source);
  await assert.rejects(readFile(`${fixture.sourcePath}.sot-recovery.json`), { code: 'ENOENT' });
  await assert.rejects(readFile(`${fixture.sourcePath}.sot-update.lock`), { code: 'ENOENT' });
});

test('recovery preserves journal and concurrent edits instead of overwriting them', async t => {
  const fixture = await applyFixture(t);
  crashDuringValidation(fixture);
  await writeFile(fixture.sourcePath, 'Independent later edit');
  const result = await recoverSotUpdate(recoveryArgs(fixture));
  assert.equal(result.reason, 'RECOVERY_CONCURRENT_SOURCE_CHANGE');
  assert.equal(await readFile(fixture.sourcePath, 'utf8'), 'Independent later edit');
  assert.ok(await readFile(`${fixture.sourcePath}.sot-recovery.json`));
});

test('tampered recovery baseline is rejected even with recalculated journal checksum', async t => {
  const fixture = await applyFixture(t);
  crashDuringValidation(fixture);
  const journalPath = `${fixture.sourcePath}.sot-recovery.json`;
  const { journal_sha256, ...journal } = JSON.parse(await readFile(journalPath, 'utf8'));
  journal.before_base64 = Buffer.from('Injected prior rule').toString('base64');
  journal.before_sha256 = hash('Injected prior rule');
  await writeFile(journalPath, JSON.stringify({ ...journal, journal_sha256: hash(JSON.stringify(journal)) }));
  const result = await recoverSotUpdate(recoveryArgs(fixture));
  assert.equal(result.reason, 'RECOVERY_APPROVAL_MISMATCH');
  assert.equal(hash(await readFile(fixture.sourcePath)), fixture.plan.after_sha256);
  assert.ok(await readFile(journalPath));
});

test('recovery refuses an active writer and unauthenticated approval', async t => {
  const fixture = await applyFixture(t);
  const result = await applySotUpdatePlan({ ...fixture, validateAfter: async () => {
    const active = await recoverSotUpdate(recoveryArgs(fixture));
    assert.equal(active.reason, 'RECOVERY_WRITER_STILL_ACTIVE');
    const unauthenticated = await recoverSotUpdate({ ...recoveryArgs(fixture), verifyUserDecision: () => false });
    assert.equal(unauthenticated.reason, 'RECOVERY_APPROVAL_MISMATCH');
    return { status: 'POST_VALIDATION_BLOCKED' };
  } });
  assert.equal(result.status, 'ROLLED_BACK');
  await assert.rejects(readFile(`${fixture.sourcePath}.sot-recovery.json`), { code: 'ENOENT' });
});
