import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Only registered plan sources are in scope. Other Markdown files are not plans.
export function inspectPlanConsistency({ rootDir = projectRoot, register } = {}) {
  const issues = [];
  const read = relative => fs.readFileSync(path.join(rootDir, relative), 'utf8');
  const planRegister = register ?? JSON.parse(read('docs/plan-register.json'));
  const canonicalPath = planRegister.canonicalPlan;
  const sources = planRegister.sources ?? [];
  const phraseMappings = planRegister.historicalPhraseMappings ?? [];
  let phraseMappingEvidence = '';
  if (planRegister.historicalPhraseMappingEvidence) {
    try { phraseMappingEvidence = read(planRegister.historicalPhraseMappingEvidence); }
    catch { issues.push(`${planRegister.historicalPhraseMappingEvidence}: Nachweis für historische Formulierungszuordnungen fehlt.`); }
  }
  const seen = new Set();
  let canonical = '';

  try { canonical = read(canonicalPath); }
  catch { issues.push(`${canonicalPath}: zentraler Scrum-Plan fehlt.`); }
  if (canonical && !/Verbindlicher zentraler Scrum-Plan/i.test(canonical)) {
    issues.push(`${canonicalPath}: Kennzeichnung als verbindlicher zentraler Scrum-Plan fehlt.`);
  }
  const canonicalEntries = sources.filter(source => source.path === canonicalPath && source.role === 'canonical-plan');
  if (canonicalEntries.length !== 1) {
    issues.push(`${canonicalPath}: genau ein Registereintrag mit Rolle canonical-plan erforderlich.`);
  }
  for (const source of sources) {
    if (seen.has(source.path)) {
      issues.push(`${source.path}: doppelter Registereintrag.`);
      continue;
    }
    seen.add(source.path);
    let content;
    try { content = read(source.path); }
    catch { issues.push(`${source.path}: registrierte Quelldatei fehlt.`); continue; }

    if (source.path !== canonicalPath && ['canonical-plan', 'active-plan', 'legacy-active-plan'].includes(source.role)) {
      issues.push(`${source.path}: zweiter aktiver Plan neben ${canonicalPath} (${source.role}).`);
    }
    if (source.role === 'domain-authority') {
      const relativeLink = path.posix.relative(path.posix.dirname(canonicalPath), source.path);
      if (!canonical.includes(relativeLink)) {
        issues.push(`${source.path}: verbindlicher Verweis aus ${canonicalPath} fehlt.`);
      }
    }
    // Historical sources remain readable evidence. Their wording is not silently rewritten.
    for (const phrase of source.requiredCanonicalPhrases ?? []) {
      const mapping = phraseMappings.find(candidate => candidate.source === source.path && candidate.phrase === phrase);
      if (mapping) {
        const targets = mapping.canonicalTargets ?? [];
        const mappingIsDocumented = phraseMappingEvidence.includes(mapping.id)
          && phraseMappingEvidence.includes(source.path)
          && phraseMappingEvidence.includes(phrase);
        if (!mapping.id || !mappingIsDocumented || !targets.length || targets.some(target => !canonical.includes(target))) {
          issues.push(`${source.path}: historische Formulierung hat keine auflösbare explizite Zuordnung: ${JSON.stringify(phrase)}.`);
        }
      } else if (!canonical.includes(phrase)) {
        issues.push(`${source.path}: bisherige Pflichtformulierung nicht wörtlich im Scrum-Plan gefunden (semantische Zuordnung offen): ${JSON.stringify(phrase)}.`);
      }
    }
  }

  const gate = planRegister.legacyPlanMigration;
  if (!gate || !['PASS', 'PASSED'].includes(gate.status)) {
    issues.push(`Historischer Planwechsel aus docs/ausbauplan.md ist ${gate?.status ?? 'UNDOCUMENTED'}; vollständiger Eintrag-für-Eintrag-Coverage-/Traceability-Nachweis fehlt.`);
  } else if (!gate.evidence || !fs.existsSync(path.join(rootDir, gate.evidence))) {
    issues.push('Historischer Planwechsel ist als PASSED markiert, aber der Nachweis fehlt.');
  } else if (!read(gate.evidence).includes('LEGACY_AUSBAUPLAN_MIGRATION = PASS')) {
    issues.push('Historischer Planwechsel ist als PASSED markiert, aber der Nachweis enthält keinen bestätigten PASS.');
  }

  return {
    status: issues.length ? 'PENDING' : 'PASS',
    canonicalPlan: canonicalPath,
    registeredSources: sources.length,
    issues,
  };
}

export function checkPlanConsistency(options) {
  const result = inspectPlanConsistency(options);
  if (result.status !== 'PASS') {
    throw new Error(`Planabgleich ${result.status}: ${result.issues.length} offene Punkte.\n- ${result.issues.join('\n- ')}`);
  }
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const result = checkPlanConsistency();
    console.log(`Planabgleich erfolgreich: ${result.registeredSources} registrierte Quellen im ${result.canonicalPlan}.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
