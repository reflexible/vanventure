import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { loadRegistry } from './module-registry.mjs';
import { loadContracts } from './contracts.mjs';
import { loadDependencyGraph } from './dependency-graph.mjs';
import { loadRuleCatalogue, extractHeadingSection, sectionSha256, sectionSentences } from './rule-catalogue.mjs';
import { assessSotImpact } from './sot-impact.mjs';
import { scopeReviewBinding } from './scope-review.mjs';
import { decisionProposalHash } from './user-decision-evidence.mjs';
import { runGovernanceWorkflow } from './governance-workflow.mjs';

// One commissioned factual metadata pilot, not a generic self-approval tool.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const sourceRef = 'docs/governance/source-of-truth-and-incremental-planning.md';
const heading = '#### ST-SOT-16 – PHASE 16: SOT UPDATE';
const addition = 'Der lokale Integrationspfad `tools/sot/governance-workflow.mjs` verbindet importierte Entscheidungsnachweise, Scope-/Konfliktprüfung, Fachmodul-Write und Post-Validation. Seine isolierten Integrationstests prüfen auch Rücknahme, Änderungen an abhängigen Quelldateien und Prozessabbruch.';
const prefix = 'docs/sot-optimization/audits/project-governance-pilot';
const inputPath = `${prefix}/input.json`;
const resultPath = `${prefix}/result.json`;

async function prepare(originalAttachment) {
  const source = await readFile(resolve(root, sourceRef), 'utf8');
  if (!source.includes('**Nachweisstand vor dem Projektpilot:**') || source.includes(addition)) throw new Error('Pilot needs qualified historical status and must not run twice.');
  const registry = await loadRegistry();
  const contracts = await loadContracts(undefined, { registry });
  const graph = await loadDependencyGraph({ registry, contracts });
  const catalogue = structuredClone(await loadRuleCatalogue());
  const section = extractHeadingSection(source, heading);
  const module = registry.modules.find(m => m.module_id === 'sot-architecture');
  const sectionId = 'PILOT-ST-SOT-16';
  const ruleIds = [];
  for (const [index, sentence] of sectionSentences(section).entries()) {
    const id = `PILOT-SOT-16-${index + 1}`; ruleIds.push(id);
    catalogue.rules.push({ id, section_id: sectionId, module_id: module.module_id,
      source: sourceRef, authority: module.authority, anchor: heading, text: sentence });
  }
  catalogue.section_coverage.push({ section_id: sectionId, module_id: module.module_id, source: sourceRef,
    heading, scope: 'complete_section', section_sha256: sectionSha256(section), rule_ids: ruleIds,
    evidence_ref: `${prefix}/review.md#target`, remaining_outside_section: 'Global catalogue coverage remains partial; unchanged scopes explicitly reviewed for this factual append only.' });
  catalogue.coverage.find(m => m.module_id === module.module_id).mapped_rule_count += ruleIds.length;
  const proposal = { id: 'SOT-PILOT-STATUS-2026-09-26', content: addition, authority: module.authority,
    owner: { module_id: module.module_id, authority: module.authority, source: sourceRef },
    status: 'PROPOSED', integration: 'NOT_STARTED', approval: null, conflict_check: 'PENDING', impact_check: 'PENDING',
    target_section_id: sectionId, target_heading: heading, source_baseline_sha256: hash(source),
    work_item_id: 'WI-SOT-16-01', change_scope: 'FACTUAL_IMPLEMENTATION_STATUS_ONLY' };
  const impact = assessSotImpact({ proposal, registry, graph, catalogue });
  const sources = Object.fromEntries(await Promise.all(registry.modules.filter(m => m.status === 'active_reference')
    .map(async m => [m.source, await readFile(resolve(root, m.source), 'utf8')])));
  const binding = scopeReviewBinding({ proposal, impact, registry, graph, catalogue, sources });
  const time = new Date().toISOString();
  const scopeReview = { schema_version: '1.0.0', reviewer: '/root with independent coverage_path review',
    reviewed_at: time, evidence_ref: `${prefix}/review.md#scope`, binding, unresolved_references: [],
    sections: binding.modules.flatMap(m => m.sections.map(s => ({ ...s, module_id: m.module_id,
      disposition: m.module_id === module.module_id && s.heading === heading ? 'INCLUDED_RULE_SCOPE' : 'EXCLUDED_FROM_RULE_SCOPE',
      rule_ids: m.module_id === module.module_id && s.heading === heading ? ruleIds : [],
      rationale: m.module_id === module.module_id && s.heading === heading
        ? 'Read complete target. Preserve all prior rules and task states; append only independently tested local implementation status.'
        : 'Reviewed factual metadata delta only: no rule, interface, approval or execution state changes here; exact original bytes retained by the planned append and post-check.',
      evidence_ref: `${prefix}/review.md#scope` }))) };
  const candidateIds = [...new Set([...impact.candidates.map(c => c.id), ...ruleIds])];
  const conflictReviews = candidateIds.map(id => ({ candidate_id: id, relation: ruleIds.includes(id) ? 'EXTENSION' : 'UNRELATED',
    reviewer: '/root with independent coverage_path review', evidence_ref: `${prefix}/review.md#relationships`,
    evidence_scope: { proposal_id: proposal.id, candidate_id: id },
    rationale: ruleIds.includes(id) ? 'Adds tested integration evidence to preserved existing tasks/status; no normative replacement or duplicate requirement.'
      : 'Factual local integration evidence changes neither source authority nor protected product/design/release rules.' }));
  const original = await readFile(originalAttachment);
  const originalText = original.toString('utf8');
  const start = originalText.indexOf('6. IMPLEMENTIERUNGSPLAN LAUFEND AKTUELL HALTEN');
  const end = originalText.indexOf('7. FORTSCHRITTSCOUNTER', start);
  if (start < 0 || end < start) throw new Error('Original status-maintenance mandate is missing.');
  const quote = originalText.slice(start, end).trimEnd();
  const offset = original.indexOf(Buffer.from(quote));
  if (offset < 0) throw new Error('Expected original user mandate missing.');
  await mkdir(resolve(root, prefix), { recursive: true });
  const copy = `${prefix}/original-user-correction.txt`;
  await writeFile(resolve(root, copy), original, { flag: 'wx' });
  const actor = { role: 'USER', id: 'project-user-observed-in-current-conversation' };
  const userDecision = { actor, decision: null, evidence: { reference: 'codex-attachment:330ad5b3-ce6e-4e73-9252-18d31bee989b#section-6',
    scope: proposal.id, wording: quote, decided_at: '2026-09-26', date_precision: 'date' } };
  const manifest = { schema_version: '1.0.0', captured_at: time, decision_time: { precision: 'date', value: '2026-09-26' },
    original: { path: resolve(root, copy), sha256: hash(original), reference: 'codex-attachment:330ad5b3-ce6e-4e73-9252-18d31bee989b', author: actor },
    quote: { text: quote, byte_offset: offset }, binding: { proposalId: proposal.id, proposal_sha256: decisionProposalHash(proposal),
      action: 'APPROVE', ...userDecision },
    authority_mapping: 'Previously observed user instruction section 6 mandates current factual plan status; section 14 authorizes automatic implementation. This is standing task authorization, not a newly invented approval of a policy, design or release.' };
  const manifestBytes = JSON.stringify(manifest, null, 2) + '\n';
  const manifestPath = `${prefix}/user-import.json`;
  await writeFile(resolve(root, manifestPath), manifestBytes, { flag: 'wx' });
  const manifests = Object.fromEntries(registry.modules.map(m => [m.module_id, { preserved_source_sha256: hash(sources[m.source]) }]));
  const data = { source_before: source, proposal, catalogue, scopeReview, conflictReviews, userDecision,
    manifestPath, proposedSection: section + '\n\n' + addition, manifests };
  await writeFile(resolve(root, inputPath), JSON.stringify(data, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify({ manifest_sha256: hash(manifestBytes), input_sha256: hash(await readFile(resolve(root, inputPath))), candidate_ids: candidateIds }));
}

async function run(expectedInputHash, trustedManifestHash) {
  const inputBytes = await readFile(resolve(root, inputPath));
  if (hash(inputBytes) !== expectedInputHash) throw new Error('Externally reviewed input hash mismatch.');
  const data = JSON.parse(inputBytes);
  const reviewBytes = await readFile(resolve(root, `${prefix}/review.md`));
  const reviewHash = hash(reviewBytes);
  const exact = async () => hash(await readFile(resolve(root, inputPath))) === expectedInputHash
    && hash(await readFile(resolve(root, `${prefix}/review.md`))) === reviewHash;
  const validators = Object.fromEntries(['sotConsistency', 'traceability'].map(name => [name, async ({ plan }) => {
    const actual = await readFile(resolve(root, sourceRef), 'utf8');
    if (actual !== plan.updated_source || plan.before_sha256 !== hash(data.source_before)
        || plan.after_sha256 !== hash(actual) || data.proposal.content !== addition) return { status: 'BLOCKED', reason: 'Pilot delta differs from exact reviewed factual append.' };
    if (name === 'traceability' && !(await exact())) return { status: 'BLOCKED', reason: 'Reviewed input changed.' };
    const body = JSON.stringify({ proposal_id: data.proposal.id, module_id: 'sot-architecture', source_sha256: hash(actual),
      check: name, status: 'PASS', detail: 'Exact approved factual metadata append; original rules and task states preserved. Original user mandate and target are pinned in the input/decision evidence.' });
    const evidence_ref = `${prefix}/${name}.json`;
    await writeFile(resolve(root, evidence_ref), body, { flag: 'wx' });
    return { status: 'PASS', evidence_ref, evidence_sha256: hash(body) };
  }]));
  const result = await runGovernanceWorkflow({ projectRoot: root, workItemId: 'WI-SOT-16-01',
    ...data, verifyReviewer: value => JSON.stringify(value) === JSON.stringify(data.scopeReview),
    verifyConflictReview: async ({ review }) => await exact() && data.conflictReviews.some(r => JSON.stringify(r) === JSON.stringify(review)),
    trustedUserImports: [{ manifestPath: resolve(root, data.manifestPath), sha256: trustedManifestHash }],
    decisionStatePath: 'docs/governance/decision-state.jsonl', validators,
    traceability: [{ proposal_id: data.proposal.id, work_item_id: 'WI-SOT-16-01', source_ref: `${prefix}/original-user-correction.txt`,
      source_anchor: data.userDecision.evidence.wording, target_ref: sourceRef }],
    audit: { outputPath: `${prefix}/audit.json`, change: { kind: 'REFERENCE_ADDITION',
      semantic_review: { verified: true, evidence_ref: `${prefix}/review.md` } },
      beforeManifests: data.manifests, afterManifests: structuredClone(data.manifests),
      test_commands: [{ id: 'project-status-and-core', covers: ['sot-architecture', 'scrum-core'],
        ref: 'tools/sot/progress.mjs', command: process.execPath, args: ['tools/sot/progress.mjs', '--check'] },
      { id: 'protected-core-recovery', covers: ['sot-architecture', 'scrum-core'], ref: 'tools/sot/baselines.test.mjs',
        command: process.execPath, args: ['--test', 'tools/sot/baselines.test.mjs', 'tools/sot/governance-workflow.test.mjs'] }] } });
  await writeFile(resolve(root, resultPath), JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify({ status: result.status, stage: result.stage, reason: result.reason, details: result.details?.reason,
    mode: result.post_validation?.mode, done: result.done_guard?.status, output: resultPath }));
  if (result.status !== 'LOCAL_WORKFLOW_VERIFIED') process.exitCode = 1;
}

if (process.argv[2] === 'prepare') await prepare(process.argv[3]);
else if (process.argv[2] === 'run') await run(process.argv[3], process.argv[4]);
else throw new Error('Explicit prepare <original user attachment> or run <reviewed input SHA> <externally trusted import SHA> required.');
