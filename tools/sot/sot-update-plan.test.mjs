import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { buildSotUpdatePlan } from './sot-update-plan.mjs';

const hash = source => createHash('sha256').update(source).digest('hex');
const source = '# Module\r\n\r\n## Rules\r\nExisting binding rule.\r\n\r\n```md\r\n## Example heading\r\n```\r\n\r\n## Other\r\nKeep me.\r\n';
const proposal = { id: 'P-1', status: 'APPROVED', integration: 'NOT_STARTED', content: 'New additive requirement.',
  authority: 'governance.sot-architecture', owner: { module_id: 'sot-architecture', source: 'docs/governance/source-of-truth-and-incremental-planning.md' } };
const approvedProposal = { ...proposal, approval: { kind: 'PROPOSAL_INTEGRATION_ONLY',
  grants_product_release: false, grants_design_rule: false, grants_live_rollout: false,
  evidence: { reference: 'approval.md#P-1' } } };
const module = { module_id: proposal.owner.module_id, authority: proposal.authority,
  source: proposal.owner.source, status: 'active_reference' };
const impact = { proposal_id: 'P-1', owner: { module_id: module.module_id,
  authority: module.authority, source: module.source }, unknowns: [] };
const conflict = { proposal_id: 'P-1', status: 'CLASSIFIED', sot_update_allowed: false,
  user_decision_required: false, unresolved_candidate_ids: [], unknown_coverage: [] };
const coverage = { proposal_id: 'P-1', unknowns: [], cross_module_unknowns: [], semantic_equivalence: 'REVIEWED' };
const traceability = [{ proposal_id: 'P-1', source_ref: 'request.md', source_anchor: 'REQ-1', target_ref: module.source }];
const input = overrides => ({ proposal, approvedProposal, impact, conflict, coverage, module,
  currentSource: source, baselineSha256: hash(source), targetHeading: '## Rules',
  proposedSection: '## Rules\nExisting binding rule.\n\n```md\n## Example heading\n```\n\nNew additive requirement.', traceability, ...overrides });

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

test('requires traceability to the same proposal and authoritative file', () => {
  const result = buildSotUpdatePlan(input({ traceability: [{ ...traceability[0], proposal_id: 'P-2' }] }));
  assert.equal(result.status, 'UPDATE_BLOCKED');
  assert.ok(result.errors.includes('PROPOSAL_TO_SOURCE_TRACEABILITY_REQUIRED'));
});
