import { readFile, realpath, open } from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';
import { createHash } from 'node:crypto';
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { assessProjectReviewedScope } from './scope-review.mjs';
import { assessConflict } from './conflict-check.mjs';
import { createDecisionStore } from './decision-state.mjs';
import { createWorkerStateStore } from './worker-state.mjs';
import { createUserDecisionVerifier, decisionProposalHash } from './user-decision-evidence.mjs';
import { loadRegistry } from './module-registry.mjs';
import { loadContracts } from './contracts.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';
import { buildSotUpdatePlan, applySotUpdatePlan, recoverSotUpdate } from './sot-update-plan.mjs';
import { runSotPostValidation } from './post-validation.mjs';
import { evaluateDoneGuard } from './done-guard.mjs';

const hash = value => createHash('sha256').update(value).digest('hex');
const text = value => typeof value === 'string' && value.trim().length > 0;
function localPath(root, ref) {
  if (!text(ref) || isAbsolute(ref) || ref.includes('\\') || ref.includes(':')) throw new Error('INVALID_WORKFLOW_PATH');
  const path = resolve(root, ref);
  const rel = relative(root, path);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error('WORKFLOW_PATH_OUTSIDE_PROJECT');
  return path;
}

/** Local bounded pipeline. Explicit imported user decision and reviewer adapters are mandatory.
 * No project approval, worker claim, rollout or global semantic equivalence is inferred.
 */
export async function runGovernanceWorkflow(input) {
  let stage = 'PREFLIGHT';
  let applied = null;
  try {
    const { projectRoot, workItemId, proposal, catalogue, scopeReview, conflictReviews, verifyReviewer,
      verifyConflictReview, trustedUserImports, userDecision, proposedSection, traceability,
      decisionStatePath, audit, validators } = input;
    if (!isAbsolute(projectRoot ?? '') || typeof verifyReviewer !== 'function'
        || typeof verifyConflictReview !== 'function' || typeof validators?.sotConsistency !== 'function'
        || typeof validators?.traceability !== 'function') throw new Error('REQUIRED_AUTHENTICATORS_AND_VALIDATORS_MISSING');
    if (!/^WI-SOT-\d{2}-\d{2}$/.test(workItemId ?? '') || proposal?.work_item_id !== workItemId || !text(proposal?.id) || proposal.status !== 'PROPOSED' || proposal.integration !== 'NOT_STARTED'
        || !Array.isArray(conflictReviews)) throw new Error('PENDING_PROPOSAL_AND_EXPLICIT_REVIEWS_REQUIRED');
    const statePath = localPath(projectRoot, decisionStatePath);
    localPath(projectRoot, proposal.owner?.source);
    const outputPath = localPath(projectRoot, audit?.outputPath);
    if (!audit.outputPath.endsWith('.json')) throw new Error('JSON_AUDIT_OUTPUT_REQUIRED');
    const postOutputRef = audit.outputPath.replace(/\.json$/, '.post-validation.json');
    const postOutputPath = localPath(projectRoot, postOutputRef);
    const resultOutputRef = audit.outputPath.replace(/\.json$/, '.workflow-result.json');
    const verifyUserDecision = createUserDecisionVerifier({ trustedImports: trustedUserImports });
    const decision = { proposalId: proposal.id, proposal_sha256: decisionProposalHash(proposal),
      action: 'APPROVE', actor: userDecision?.actor, evidence: userDecision?.evidence, decision: userDecision?.decision ?? null };
    if (!verifyUserDecision(decision)) throw new Error('EXACT_IMPORTED_USER_DECISION_REQUIRED');
    const target = catalogue?.section_coverage?.find(section => section.section_id === proposal.target_section_id);
    if (!target || target.module_id !== proposal.owner.module_id || target.heading !== proposal.target_heading) throw new Error('TARGET_SECTION_BINDING_MISMATCH');
    stage = 'SCOPE_REVIEW';
    const scoped = await assessProjectReviewedScope({ proposal, catalogue, review: scopeReview, verifyReviewer, projectRoot });
    if (scoped.status !== 'SCOPED_REVIEW_COMPLETE') return { status: 'WORKFLOW_BLOCKED', stage, details: scoped };
    stage = 'CONFLICT_REVIEW';
    for (const review of conflictReviews) {
      if (await verifyConflictReview(structuredClone({ proposal, review, impact: scoped.impact })) !== true) throw new Error('AUTHENTICATED_CONFLICT_REVIEW_REQUIRED');
    }
    const conflict = assessConflict({ proposal, impact: scoped.impact, reviews: conflictReviews });
    if (conflict.status !== 'CLASSIFIED' || conflict.user_decision_required
        || conflict.unresolved_candidate_ids.length || conflict.unknown_coverage.length
        || conflict.relationships.some(item => !['EXTENSION', 'UNRELATED'].includes(item.relation))) throw new Error('UNRESOLVED_OR_UNSUPPORTED_CONFLICT');
    const registry = await loadRegistry(resolve(projectRoot, 'docs/governance/module-registry.json'), { projectRoot });
    const contracts = await loadContracts(resolve(projectRoot, 'docs/governance/contracts.json'), { registry, projectRoot });
    const graphPath = resolve(projectRoot, 'docs/governance/dependency-graph.json');
    const supplement = JSON.parse(await readFile(graphPath, 'utf8'));
    const epicText = await readFile(localPath(projectRoot, supplement.sources.work_items), 'utf8');
    const graph = await loadDependencyGraph({ graphPath, registry, contracts, epicText });
    const metadataPaths = ['docs/governance/module-registry.json', 'docs/governance/contracts.json',
      'docs/governance/dependency-graph.json', supplement.sources.work_items];
    const metadata = Object.fromEntries(await Promise.all(metadataPaths.map(async path => [path, await readFile(localPath(projectRoot, path))])));
    const assertMetadataUnchanged = async expectedUpdate => {
      for (const [path, bytes] of Object.entries(metadata)) {
        const actual = await readFile(localPath(projectRoot, path));
        const valid = expectedUpdate && path === proposal.owner.source
          ? hash(actual) === expectedUpdate.after_sha256 : actual.equals(bytes);
        if (!valid) throw new Error(`ANCILLARY_SOURCE_CHANGED:${path}`);
      }
    };
    const before = Object.fromEntries(await Promise.all(registry.modules.filter(m => m.status === 'active_reference')
      .map(async m => [m.module_id, await readFile(localPath(projectRoot, m.source))])));
    for (const binding of scoped.scope_evidence.binding.modules) {
      if (!before[binding.module_id] || hash(before[binding.module_id]) !== binding.source_sha256) throw new Error('SOURCE_CHANGED_SINCE_SCOPE_REVIEW');
    }
    const owner = registry.modules.find(m => m.module_id === proposal.owner.module_id);
    stage = 'PERSIST_DECISION';
    const store = createDecisionStore(statePath, { verifyUserDecision });
    let state = await store.read();
    if (state.proposals.has(proposal.id)) throw new Error('PROPOSAL_ALREADY_REGISTERED_USE_EXPLICIT_RESUME');
    await store.register({ proposal, impact: scoped.impact, expectedRevision: state.revision, idempotencyKey: `${proposal.id}:register` });
    state = await store.read();
    await store.recordReview({ proposalId: proposal.id, reviews: conflictReviews, expectedRevision: state.revision, idempotencyKey: `${proposal.id}:review` });
    state = await store.read();
    await store.decide({ proposalId: proposal.id, action: 'APPROVE', actor: userDecision.actor,
      evidence: userDecision.evidence, decision: userDecision.decision ?? null,
      expectedRevision: state.revision, idempotencyKey: `${proposal.id}:approve` });
    state = await store.read();
    const approved = state.proposals.get(proposal.id).proposal;
    stage = 'PREPARE_UPDATE';
    const preview = buildSotUpdatePlan({ proposal: approved, approvedProposal: approved,
      impact: scoped.impact, conflict, coverage: scoped.coverage, module: owner,
      currentSource: before[owner.module_id].toString('utf8'), baselineSha256: proposal.source_baseline_sha256,
      targetHeading: proposal.target_heading, proposedSection, traceability, decisionState: state, verifyUserDecision, registry });
    if (preview.status !== 'PREPARED_NOT_APPLIED') return { status: 'WORKFLOW_BLOCKED', stage, details: preview };
    // Close the review-to-write gap for normal intervening edits before apply.
    const refreshed = await assessProjectReviewedScope({ proposal, catalogue, review: scopeReview, verifyReviewer, projectRoot });
    if (refreshed.status !== 'SCOPED_REVIEW_COMPLETE') throw new Error('SCOPE_CHANGED_BEFORE_APPLY');
    stage = 'APPLY_AND_POST_VALIDATE';
    let postValidation;
    const validatorArtifacts = {};
    const boundValidator = name => async context => {
      const finding = await validators[name]({ ...context, proposal: structuredClone(proposal), plan: structuredClone(preview.plan) });
      if (finding?.status !== 'PASS' || !text(finding.evidence_ref)) return finding;
      const proofPath = localPath(projectRoot, finding.evidence_ref);
      if (await realpath(proofPath) !== proofPath) throw new Error('VALIDATOR_EVIDENCE_ALIAS');
      const bytes = await readFile(proofPath);
      const proof = JSON.parse(bytes.toString('utf8'));
      if (hash(bytes) !== finding.evidence_sha256 || proof.proposal_id !== proposal.id
          || proof.module_id !== owner.module_id || proof.source_sha256 !== preview.plan.after_sha256
          || proof.check !== name || proof.status !== 'PASS' || !text(proof.detail)) throw new Error('VALIDATOR_EVIDENCE_NOT_BOUND_TO_UPDATE');
      validatorArtifacts[name] = { path: finding.evidence_ref, sha256: finding.evidence_sha256 };
      return finding;
    };
    applied = await applySotUpdatePlan({ plan: preview.plan, projectRoot, decisionStatePath, verifyUserDecision,
      validateAfter: async () => {
        await assertMetadataUnchanged(preview.plan);
        const currentRegistry = await loadRegistry(resolve(projectRoot, 'docs/governance/module-registry.json'), { projectRoot });
        const currentContracts = await loadContracts(resolve(projectRoot, 'docs/governance/contracts.json'), { registry: currentRegistry, projectRoot });
        const currentEpicText = await readFile(localPath(projectRoot, supplement.sources.work_items), 'utf8');
        const currentGraph = await loadDependencyGraph({ graphPath, registry: currentRegistry, contracts: currentContracts, epicText: currentEpicText });
        if (!isDeepStrictEqual(currentRegistry, registry) || !isDeepStrictEqual(currentContracts, contracts)
            || !isDeepStrictEqual(currentGraph, graph)) throw new Error('UNSUPPORTED_REGISTRY_CONTRACT_OR_DEPENDENCY_DELTA');
        const after = Object.fromEntries(await Promise.all(registry.modules.filter(m => m.status === 'active_reference')
          .map(async m => [m.module_id, await readFile(localPath(projectRoot, m.source))])));
        postValidation = await runSotPostValidation({ updatedModuleIds: [owner.module_id],
          auditInput: { ...audit, outputPath, projectRoot, registry: currentRegistry, contracts: currentContracts, graph: currentGraph, before, after,
            beforeContracts: contracts, afterContracts: contracts,
            traceability_records: traceability, changed_paths: [owner.source] },
          validators: { sotConsistency: boundValidator('sotConsistency'), traceability: boundValidator('traceability') } });
        try {
          await assertMetadataUnchanged(preview.plan);
          for (const m of registry.modules.filter(m => m.status === 'active_reference')) {
            if (!(await readFile(localPath(projectRoot, m.source))).equals(after[m.module_id])) throw new Error(`SOURCE_CHANGED_DURING_POST_VALIDATION:${m.module_id}`);
          }
        } catch (error) {
          postValidation = { ...postValidation, status: 'POST_VALIDATION_BLOCKED', checks: [...postValidation.checks,
            { name: 'stable_post_validation_inputs', status: 'BLOCKED', detail: error.message }] };
        }
        postValidation = { ...postValidation, scope: workItemId };
        const evidence = await open(postOutputPath, 'wx');
        try { await evidence.writeFile(JSON.stringify(postValidation, null, 2) + '\n'); await evidence.sync(); }
        finally { await evidence.close(); }
        return postValidation;
      } });
    if (applied.status !== 'APPLIED') return { status: 'WORKFLOW_BLOCKED', stage, details: applied, post_validation: postValidation, post_validation_output: postOutputRef };
    stage = 'DONE_GUARD';
    const completionEvidence = completionFromPost({ workItemId, moduleId: owner.module_id,
      auditRef: audit.outputPath, postRef: postOutputRef, postValidation });
    const done = evaluateDoneGuard(completionEvidence, { expectedScope: workItemId });
    const artifact = async path => ({ path, sha256: hash(await readFile(localPath(projectRoot, path))) });
    const result = { schema_version: '2.0.0', status: done.status === 'DONE_ALLOWED' ? 'LOCAL_WORKFLOW_VERIFIED' : 'WORKFLOW_BLOCKED',
      stage, work_item_id: workItemId, proposal_id: proposal.id, proposal_sha256: decisionProposalHash(approved),
      decision_state_path: decisionStatePath, approval_event: preview.plan.approval_event,
      module_id: owner.module_id, source: proposal.owner.source, scope_evidence: scoped.scope_evidence, post_validation_output: postOutputRef,
      result_output: resultOutputRef, update: applied, post_validation: postValidation, done_guard: done,
      completion_evidence: completionEvidence,
      artifacts: { audit: await artifact(audit.outputPath), post_validation: await artifact(postOutputRef),
        source: { path: owner.source, sha256: preview.plan.after_sha256 }, validators: validatorArtifacts,
        metadata: await Promise.all(metadataPaths.map(artifact)), runtime: await runtimeBinding() },
      product_release: false, work_item_done_written: false, live_rollout: false };
    const resultBytes = JSON.stringify(result, null, 2) + '\n';
    const resultFile = await open(localPath(projectRoot, resultOutputRef), 'wx');
    try { await resultFile.writeFile(resultBytes); await resultFile.sync(); } finally { await resultFile.close(); }
    return { ...result, result_sha256: hash(resultBytes) };
  } catch (error) {
    return { status: 'WORKFLOW_BLOCKED', stage, reason: error.message, update: applied };
  }
}


/** Explicit recovery uses the same externally pinned original-user evidence. */
export async function recoverGovernanceWorkflow({ projectRoot, source, decisionStatePath, trustedUserImports }) {
  try {
    return await recoverSotUpdate({ projectRoot, source, decisionStatePath,
      verifyUserDecision: createUserDecisionVerifier({ trustedImports: trustedUserImports }) });
  } catch (error) { return { status: 'RECOVERY_BLOCKED', reason: error.message }; }
}


function completionFromPost({ workItemId, moduleId, auditRef, postRef, postValidation }) {
  const check = name => ({ status: postValidation.checks.find(item => item.name === name)?.status ?? 'BLOCKED', evidence_ref: postRef });
  return { scope: workItemId,
    sotUpdate: { required: true, updated_module_ids: [moduleId], evidence_ref: auditRef }, unresolvedConflicts: [],
    requiredChecks: [{ id: 'incremental-audit', ...check('required_check') }],
    contracts: check('contracts'), dependencies: check('dependencies'), consistency: check('sotConsistency'), postValidation };
}

const runtimeModules = ['governance-workflow', 'scope-review', 'conflict-check', 'decision-state', 'user-decision-evidence',
  'sot-update-plan', 'post-validation', 'incremental-audit', 'fast-check', 'full-check', 'done-guard', 'worker-state',
  'module-registry', 'contracts', 'dependency-graph', 'delta', 'impact', 'rule-catalogue', 'scoped-coverage', 'sot-impact', 'baselines'];
async function runtimeBinding() {
  return Promise.all(runtimeModules.map(async name => ({ module: name, sha256: hash(await readFile(new URL(`./${name}.mjs`, import.meta.url))) })));
}

/** Read-only proof verifier; safe to call while the worker-store writer lock is held. */
export async function verifyGovernanceResult({ resultPath, expectedResultSha256, workItemId, projectRoot }) {
  try {
    if (!isAbsolute(projectRoot ?? '') || !/^[a-f0-9]{64}$/.test(expectedResultSha256 ?? '')
        || !/^WI-SOT-\d{2}-\d{2}$/.test(workItemId ?? '')) throw new Error('INTEGRATION_INPUTS_REQUIRED');
    const checked = async artifact => {
      const path = localPath(projectRoot, artifact?.path);
      if (await realpath(path) !== path) throw new Error('INTEGRATION_ARTIFACT_ALIAS');
      const bytes = await readFile(path);
      if (hash(bytes) !== artifact.sha256) throw new Error(`INTEGRATION_ARTIFACT_CHANGED:${artifact.path}`);
      return bytes;
    };
    const result = JSON.parse((await checked({ path: resultPath, sha256: expectedResultSha256 })).toString('utf8'));
    if (result.schema_version !== '2.0.0' || result.status !== 'LOCAL_WORKFLOW_VERIFIED'
        || result.stage !== 'DONE_GUARD' || result.work_item_id !== workItemId || result.result_output !== resultPath
        || result.update?.status !== 'APPLIED' || result.source !== result.artifacts?.source?.path
        || result.update.after_sha256 !== result.artifacts.source.sha256) throw new Error('WORKFLOW_RESULT_SCOPE_OR_STATUS_INVALID');
    if (!isDeepStrictEqual(result.artifacts.runtime, await runtimeBinding())) throw new Error('WORKFLOW_RUNTIME_CHANGED');
    const state = await createDecisionStore(localPath(projectRoot, result.decision_state_path)).read();
    const approved = state.proposals.get(result.proposal_id)?.proposal;
    const latest = state.events.filter(event => event.type === 'DECISION' && event.proposal_id === result.proposal_id).at(-1);
    if (approved?.status !== 'APPROVED' || approved.work_item_id !== workItemId
        || approved.owner.module_id !== result.module_id || approved.owner.source !== result.source
        || decisionProposalHash(approved) !== result.proposal_sha256
        || latest?.event_hash !== result.approval_event?.event_hash || latest?.revision !== result.approval_event?.revision) throw new Error('INTEGRATION_DECISION_BINDING_INVALID');
    const audit = JSON.parse((await checked(result.artifacts.audit)).toString('utf8'));
    const post = JSON.parse((await checked(result.artifacts.post_validation)).toString('utf8'));
    await checked(result.artifacts.source);
    for (const artifact of result.artifacts.metadata) await checked(artifact);
    const auditPassed = audit.status === 'PASS' && (audit.mode === 'FAST_CHECK' ? audit.check?.result === 'FAST_CHECK_PASS'
      : audit.mode === 'FULL_CHECK' && audit.check?.status === 'FULL_CHECK_PASS');
    const changedOwner = audit.delta?.modules?.find(item => item.module_id === result.module_id);
    if (!auditPassed || changedOwner?.source !== result.source || changedOwner.current_sha256 !== result.update.after_sha256
        || changedOwner.previous_sha256 !== result.update.before_sha256
        || (post.scope !== workItemId && !(result.binding_kind === 'LEGACY_RESULT_ATTESTATION' && post.scope === undefined))
        || post.status !== 'POST_VALIDATION_PASS' || post.mode !== audit.mode
        || resolve(projectRoot, post.audit_output) !== localPath(projectRoot, result.artifacts.audit.path)
        || !isDeepStrictEqual(post, result.post_validation) || !post.updated_modules.includes(result.module_id)) throw new Error('INTEGRATION_AUDIT_OR_POSTCHECK_INVALID');
    for (const name of ['sotConsistency', 'traceability']) {
      const proof = JSON.parse((await checked(result.artifacts.validators[name])).toString('utf8'));
      if (proof.proposal_id !== result.proposal_id || proof.module_id !== result.module_id
          || proof.source_sha256 !== result.update.after_sha256 || proof.check !== name || proof.status !== 'PASS') throw new Error('INTEGRATION_VALIDATOR_PROOF_INVALID');
    }
    if (result.binding_kind === 'LEGACY_RESULT_ATTESTATION') {
      const legacy = JSON.parse((await checked(result.artifacts.legacy_result)).toString('utf8'));
      if (legacy.status !== 'LOCAL_WORKFLOW_VERIFIED' || legacy.done_guard?.scope !== workItemId
          || legacy.done_guard?.status !== 'DONE_ALLOWED' || legacy.proposal_id !== result.proposal_id
          || legacy.source !== result.source || !isDeepStrictEqual(legacy.update, result.update)
          || !isDeepStrictEqual(legacy.post_validation, post)) throw new Error('LEGACY_RESULT_ATTESTATION_INVALID');
    }
    const completion = completionFromPost({ workItemId, moduleId: result.module_id,
      auditRef: result.artifacts.audit.path, postRef: result.artifacts.post_validation.path, postValidation: { ...post, scope: workItemId } });
    if (!isDeepStrictEqual(completion, result.completion_evidence)
        || evaluateDoneGuard(completion, { expectedScope: workItemId }).status !== 'DONE_ALLOWED') throw new Error('INTEGRATION_COMPLETION_EVIDENCE_INVALID');
    await checked(result.artifacts.source);
    return { status: 'GOVERNANCE_EVIDENCE_VERIFIED', completion_evidence: completion, result_sha256: expectedResultSha256 };
  } catch (error) { return { status: 'INTEGRATION_BLOCKED', reason: error.message }; }
}

/** Host pins are explicit constructor inputs; a work item cannot choose its own proof. */
export function createGovernanceWorkerStore({ projectRoot, trustedResults, statePath = 'docs/governance/worker-state.json',
  planPath = 'docs/governance/source-of-truth-and-incremental-planning.md' }) {
  if (!isAbsolute(projectRoot ?? '') || !Array.isArray(trustedResults) || !trustedResults.length) throw new Error('HOST_PINNED_WORKER_RESULTS_REQUIRED');
  const pins = new Map();
  for (const pin of structuredClone(trustedResults)) {
    if (!/^WI-SOT-\d{2}-\d{2}$/.test(pin?.workItemId ?? '') || !/^[a-f0-9]{64}$/.test(pin?.expectedResultSha256 ?? '')
      || pins.has(pin.workItemId)) throw new Error('UNIQUE_HOST_RESULT_PIN_REQUIRED');
    localPath(projectRoot, pin.resultPath);
    pins.set(pin.workItemId, pin);
  }
  return createWorkerStateStore({ path: localPath(projectRoot, statePath), planPath: localPath(projectRoot, planPath),
    verifyCompletionEvidence: async ({ work_item_id, completion_evidence }) => {
      const pin = pins.get(work_item_id);
      if (!pin) return { status: 'BLOCKED', reason: 'HOST_RESULT_PIN_MISSING' };
      const proof = await verifyGovernanceResult({ ...pin, projectRoot });
      return proof.status === 'GOVERNANCE_EVIDENCE_VERIFIED' && isDeepStrictEqual(completion_evidence, proof.completion_evidence)
        ? { status: 'PASS', evidence_ref: pin.resultPath }
        : { status: 'BLOCKED', reason: proof.reason ?? 'COMPLETION_EVIDENCE_DIFFERS_FROM_HOST_PIN' };
    } });
}

/** Verify before integration; the securely configured worker store verifies again under its lock. */
export async function integrateGovernanceResult({ resultPath, expectedResultSha256, workItemId, workerStore,
  integratorId, evidenceRef, projectRoot }) {
  try {
    if (!text(integratorId) || !text(evidenceRef) || typeof workerStore?.snapshot !== 'function'
      || typeof workerStore?.integrate !== 'function') throw new Error('INTEGRATION_INPUTS_REQUIRED');
    const verified = await verifyGovernanceResult({ resultPath, expectedResultSha256, workItemId, projectRoot });
    if (verified.status !== 'GOVERNANCE_EVIDENCE_VERIFIED') return verified;
    const record = (await workerStore.snapshot()).records[workItemId];
    if (record?.execution_state !== 'Integration' || record.review?.accepted !== true) throw new Error('WORKER_NOT_READY_FOR_INTEGRATION');
    const integrated = await workerStore.integrate({ work_item_id: workItemId, integrator_id: integratorId,
      evidence_ref: evidenceRef, tests_passed: true, completion_evidence: verified.completion_evidence });
    return { status: 'WORK_ITEM_INTEGRATED', work_item_id: workItemId, result_sha256: expectedResultSha256, record: integrated };
  } catch (error) { return { status: 'INTEGRATION_BLOCKED', reason: error.message }; }
}


/** Explicit new attestation for an older immutable result; no old evidence is rewritten.
 * Every proof and the decision-store snapshot must arrive with an external expected hash.
 */
export async function attestLegacyGovernanceResult({ projectRoot, resultPath, expectedResultSha256,
  workItemId, decisionStatePath, expectedDecisionStateSha256, pinnedProofHashes, attestationPath }) {
  try {
    if (!isAbsolute(projectRoot ?? '') || !/^WI-SOT-\d{2}-\d{2}$/.test(workItemId ?? '')) throw new Error('ATTESTATION_ROOT_AND_SCOPE_REQUIRED');
    const readPinned = async artifact => {
      if (!/^[a-f0-9]{64}$/.test(artifact?.sha256 ?? '')) throw new Error('EXTERNAL_PROOF_HASH_REQUIRED');
      const path = localPath(projectRoot, artifact.path);
      if (await realpath(path) !== path) throw new Error('ATTESTATION_PATH_ALIAS');
      const bytes = await readFile(path);
      if (hash(bytes) !== artifact.sha256) throw new Error(`ATTESTATION_PROOF_CHANGED:${artifact.path}`);
      return bytes;
    };
    const legacy = JSON.parse((await readPinned({ path: resultPath, sha256: expectedResultSha256 })).toString('utf8'));
    if (legacy.status !== 'LOCAL_WORKFLOW_VERIFIED' || legacy.stage !== 'DONE_GUARD'
        || legacy.done_guard?.status !== 'DONE_ALLOWED' || legacy.done_guard.scope !== workItemId
        || legacy.update?.status !== 'APPLIED') throw new Error('LEGACY_RESULT_NOT_SUCCESSFUL_FOR_WORK_ITEM');
    await readPinned({ path: decisionStatePath, sha256: expectedDecisionStateSha256 });
    const state = await createDecisionStore(localPath(projectRoot, decisionStatePath)).read();
    const proposal = state.proposals.get(legacy.proposal_id)?.proposal;
    const event = state.events.filter(e => e.type === 'DECISION' && e.proposal_id === legacy.proposal_id).at(-1);
    if (proposal?.status !== 'APPROVED' || proposal.work_item_id !== workItemId || proposal.owner.source !== legacy.source
        || event?.action !== 'APPROVE' || proposal.source_baseline_sha256 !== legacy.update.before_sha256) throw new Error('LEGACY_PERSISTED_PROPOSAL_SCOPE_INVALID');
    const sourceBytes = await readPinned({ path: legacy.source, sha256: legacy.update.after_sha256 });
    const audit = JSON.parse((await readPinned(pinnedProofHashes.audit)).toString('utf8'));
    const post = JSON.parse((await readPinned(pinnedProofHashes.post_validation)).toString('utf8'));
    const changed = audit.delta?.modules?.find(m => m.module_id === proposal.owner.module_id);
    if (audit.status !== 'PASS' || !(audit.mode === 'FAST_CHECK' ? audit.check?.result === 'FAST_CHECK_PASS'
        : audit.mode === 'FULL_CHECK' && audit.check?.status === 'FULL_CHECK_PASS')
        || changed?.source !== legacy.source || changed.current_sha256 !== hash(sourceBytes)
        || changed.previous_sha256 !== legacy.update.before_sha256
        || !isDeepStrictEqual(post, legacy.post_validation) || post.status !== 'POST_VALIDATION_PASS'
        || post.mode !== audit.mode || resolve(projectRoot, post.audit_output) !== localPath(projectRoot, pinnedProofHashes.audit.path)) throw new Error('LEGACY_AUDIT_OR_POSTCHECK_INVALID');
    for (const name of ['sotConsistency', 'traceability']) {
      const proof = JSON.parse((await readPinned(pinnedProofHashes.validators[name])).toString('utf8'));
      if (proof.status !== 'PASS' || proof.check !== name || proof.proposal_id !== proposal.id
          || proof.module_id !== proposal.owner.module_id || proof.source_sha256 !== hash(sourceBytes)) throw new Error('LEGACY_VALIDATOR_PROOF_INVALID');
    }
    const registry = await loadRegistry(resolve(projectRoot, 'docs/governance/module-registry.json'), { projectRoot });
    const owner = registry.modules.find(m => m.module_id === proposal.owner.module_id);
    if (owner?.source !== legacy.source || owner.status !== 'active_reference' || owner.authority !== proposal.authority) throw new Error('LEGACY_OWNER_CHANGED');
    const supplement = JSON.parse(await readFile(resolve(projectRoot, 'docs/governance/dependency-graph.json'), 'utf8'));
    const requiredMetadata = ['docs/governance/module-registry.json', 'docs/governance/contracts.json',
      'docs/governance/dependency-graph.json', supplement.sources.work_items];
    if (!Array.isArray(pinnedProofHashes.metadata) || requiredMetadata.some(path => !pinnedProofHashes.metadata.some(p => p.path === path))) throw new Error('ALL_METADATA_PINS_REQUIRED');
    for (const pin of pinnedProofHashes.metadata) await readPinned(pin);
    const completion = completionFromPost({ workItemId, moduleId: owner.module_id,
      auditRef: pinnedProofHashes.audit.path, postRef: pinnedProofHashes.post_validation.path, postValidation: { ...post, scope: workItemId } });
    const done = evaluateDoneGuard(completion, { expectedScope: workItemId });
    if (done.status !== 'DONE_ALLOWED') throw new Error('LEGACY_COMPLETION_GUARD_BLOCKED');
    const result = { schema_version: '2.0.0', binding_kind: 'LEGACY_RESULT_ATTESTATION',
      status: 'LOCAL_WORKFLOW_VERIFIED', stage: 'DONE_GUARD', work_item_id: workItemId,
      proposal_id: proposal.id, proposal_sha256: decisionProposalHash(proposal), decision_state_path: decisionStatePath,
      approval_event: { revision: event.revision, event_hash: event.event_hash }, module_id: owner.module_id,
      source: legacy.source, result_output: attestationPath, post_validation_output: pinnedProofHashes.post_validation.path,
      update: legacy.update, post_validation: post, done_guard: done, completion_evidence: completion,
      artifacts: { ...structuredClone(pinnedProofHashes), legacy_result: { path: resultPath, sha256: expectedResultSha256 },
        source: { path: legacy.source, sha256: legacy.update.after_sha256 }, runtime: await runtimeBinding() },
      historical_result_rewritten: false, product_release: false, work_item_done_written: false, live_rollout: false };
    const bytes = JSON.stringify(result, null, 2) + '\n';
    const file = await open(localPath(projectRoot, attestationPath), 'wx');
    try { await file.writeFile(bytes); await file.sync(); } finally { await file.close(); }
    return { ...result, result_sha256: hash(bytes) };
  } catch (error) { return { status: 'ATTESTATION_BLOCKED', reason: error.message }; }
}
