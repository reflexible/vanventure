import assert from 'node:assert/strict';
import test from 'node:test';
import { loadRegistry } from './module-registry.mjs';
import { prepareIntake, prepareProjectIntake } from './intake.mjs';

const base = {
  kind: 'idea',
  classification: 'IDEA',
  title: 'Navigation verbessern',
  content: 'Die mobile Navigation könnte klarer sein.',
  authority: 'website.design',
  provenance: {
    source_type: 'chat',
    reference: 'thread-17 / message-4',
    captured_at: '2026-09-26T12:00:00+02:00',
  },
};

test('idea intake is a stable non-binding proposal with registered owner and provenance', async () => {
  const first = await prepareProjectIntake(base);
  const second = await prepareProjectIntake(base);
  assert.equal(first.valid, true);
  assert.deepEqual(first, second);
  assert.equal(first.proposal.status, 'IDEA');
  assert.equal(first.proposal.owner.source, 'docs/design-guide.md');
  assert.deepEqual(first.proposal.provenance, base.provenance);
  assert.equal(first.proposal.approval, null);
  assert.equal(first.proposal.impact_check, 'PENDING');
  assert.equal(first.proposal.integration, 'NOT_STARTED');
});

test('project-wide plan goes only to existing Scrum core and remains proposed', async () => {
  const result = await prepareProjectIntake({
    ...base, kind: 'plan', classification: 'PROJECT_PLAN',
    authority: 'planning.scrum-core', title: 'Neue Produktplanung',
  });
  assert.equal(result.valid, true);
  assert.equal(result.proposal.status, 'PROPOSED');
  assert.equal(result.proposal.owner.source, 'docs/scrum-plan.md');
});

test('specialist plan and decision route to their exact registered authorities', async () => {
  const registry = await loadRegistry();
  const specialist = prepareIntake({
    ...base, kind: 'plan', classification: 'SPECIALIST_PLAN', authority: 'website.analytics',
  }, registry);
  assert.equal(specialist.proposal.owner.source, 'docs/analytics.md');
  const decision = prepareIntake({
    ...base, kind: 'decision', classification: 'PRODUCT_DECISION', authority: 'governance.release-approval',
    provenance: { ...base.provenance, source_type: 'user_decision' },
  }, registry);
  assert.equal(decision.proposal.owner.source, 'docs/scrum-migration/release-decisions.md');
  assert.equal(decision.proposal.status, 'PROPOSED');
});

test('rules preserve their type and do not silently enter the authority source', async () => {
  const result = await prepareProjectIntake({
    ...base, kind: 'rule', classification: 'DESIGN_RULE', content: 'Buttons need a visible focus state.',
  });
  assert.equal(result.valid, true);
  assert.equal(result.proposal.classification, 'DESIGN_RULE');
  assert.equal(result.proposal.conflict_check, 'PENDING');
  assert.equal(result.proposal.owner.source, 'docs/design-guide.md');
});

test('optional target section and rationale are recorded without claiming approval', async () => {
  const result = await prepareProjectIntake({ ...base, kind: 'rule', classification: 'PROCESS_RULE',
    authority: 'governance.release-approval', target_section_id: 'DEC-REL-002',
    scope_rationale: 'Review the exact release gate section.' });
  assert.equal(result.valid, true);
  assert.equal(result.proposal.target_section_id, 'DEC-REL-002');
  assert.equal(result.proposal.scope_rationale, 'Review the exact release gate section.');
  assert.equal(result.proposal.approval, null);
  const missingRationale = await prepareProjectIntake({ ...base, target_section_id: 'DEC-REL-002' });
  assert.match(missingRationale.errors.join(' '), /requires scope_rationale/);
});

test('missing fields are named concretely', async () => {
  const registry = await loadRegistry();
  const result = prepareIntake({ kind: 'idea', provenance: { source_type: 'chat' } }, registry);
  assert.equal(result.valid, false);
  assert.deepEqual(result.missing, [
    'classification', 'title', 'content', 'authority',
    'provenance.reference', 'provenance.captured_at',
  ]);
  assert.equal(result.proposal, null);
});

test('rejects wrong classification, unknown owner, and unregistered parallel plan', async () => {
  const registry = await loadRegistry();
  const wrongClass = prepareIntake({ ...base, kind: 'rule' }, registry);
  assert.match(wrongClass.errors.join(' '), /Classification IDEA is invalid/);
  const missingOwner = prepareIntake({ ...base, authority: 'website.unknown' }, registry);
  assert.match(missingOwner.errors.join(' '), /No unique registered authority/);
  const shadow = prepareIntake({
    ...base, kind: 'plan', classification: 'PROJECT_PLAN', authority: 'website.analytics',
    target_source: 'docs/ausbauplan.md',
  }, registry);
  assert.equal(shadow.valid, false);
  assert.match(shadow.errors.join(' '), /parallel total plan is forbidden/);
  assert.match(shadow.errors.join(' '), /second source is forbidden/);
});

test('rejects supplied approval or status and invalid provenance', async () => {
  const registry = await loadRegistry();
  const result = prepareIntake({
    ...base, status: 'APPROVED', approval: { by: 'user' },
    provenance: { source_type: 'anonymous', reference: 'x', captured_at: 'yesterday' },
  }, registry);
  assert.equal(result.valid, false);
  assert.match(result.errors.join(' '), /Approval cannot be supplied/);
  assert.match(result.errors.join(' '), /status is assigned/);
  assert.match(result.errors.join(' '), /Unknown provenance.source_type/);
  assert.match(result.errors.join(' '), /ISO timestamp/);
});

test('inactive or duplicated authority cannot own a proposal', async () => {
  const registry = await loadRegistry();
  registry.modules.find(module => module.authority === 'website.design').status = 'superseded';
  assert.match(prepareIntake(base, registry).errors.join(' '), /not active/);
  registry.modules.push({ ...registry.modules.find(module => module.authority === 'website.design'), module_id: 'shadow' });
  assert.match(prepareIntake(base, registry).errors.join(' '), /Duplicate authority/);
});
