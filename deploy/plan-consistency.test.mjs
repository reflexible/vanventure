import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { inspectPlanConsistency, checkPlanConsistency } from './plan-consistency.mjs';

function fixture(t, extraSources = []) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vanventure-plan-'));
  t.after(() => fs.rmSync(rootDir, { recursive: true, force: true }));
  const write = (relative, content) => {
    const target = path.join(rootDir, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  };
  write('docs/scrum-plan.md', '# Zentraler Scrum-Plan\nStatus: Verbindlicher zentraler Scrum-Plan.\n[Fachmodul](governance/sot.md)\n');
  write('docs/governance/sot.md', '# Fachmodul\n');
  write('docs/ausbauplan.md', '# Historischer Ausbauplan\n');
  write('docs/audit.md', 'LEGACY_AUSBAUPLAN_MIGRATION = PASS\n');
  write('docs/unrelated.md', '# Kein registrierter Plan\n- [ ] Beispiel\n');
  const register = {
    canonicalPlan: 'docs/scrum-plan.md',
    sources: [
      { path: 'docs/scrum-plan.md', role: 'canonical-plan', requiredCanonicalPhrases: [] },
      { path: 'docs/governance/sot.md', role: 'domain-authority', requiredCanonicalPhrases: [] },
      ...extraSources,
    ],
    legacyPlanMigration: { status: 'PASSED', evidence: 'docs/audit.md' },
  };
  return { rootDir, register, write };
}

test('current project accepts documented historical mappings without requiring legacy wording verbatim', () => {
  const result = inspectPlanConsistency();
  assert.equal(result.canonicalPlan, 'docs/scrum-plan.md');
  assert.equal(result.status, 'PASS');
  assert.doesNotThrow(() => checkPlanConsistency());
});

test('registered specialist module can pass without scanning unrelated Markdown', t => {
  const { rootDir, register } = fixture(t);
  const result = checkPlanConsistency({ rootDir, register });
  assert.equal(result.status, 'PASS');
  assert.equal(result.registeredSources, 2);
});

test('a second active plan is detected even when its content looks harmless', t => {
  const { rootDir, register } = fixture(t, [
    { path: 'docs/ausbauplan.md', role: 'active-plan', requiredCanonicalPhrases: [] },
  ]);
  const result = inspectPlanConsistency({ rootDir, register });
  assert.equal(result.status, 'PENDING');
  assert.ok(result.issues.some(issue => issue.includes('zweiter aktiver Plan')));
});

test('a missing core reference or unverified migration PASS cannot pass', t => {
  const { rootDir, register, write } = fixture(t);
  write('docs/scrum-plan.md', '# Zentraler Scrum-Plan\nStatus: Verbindlicher zentraler Scrum-Plan.\n');
  write('docs/audit.md', 'Migration still open\n');
  const result = inspectPlanConsistency({ rootDir, register });
  assert.ok(result.issues.some(issue => issue.includes('verbindlicher Verweis')));
  assert.ok(result.issues.some(issue => issue.includes('keinen bestätigten PASS')));
});
