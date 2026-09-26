import { readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from './module-registry.mjs';
import { verifyModuleOverview } from './module-overview.mjs';

const defaultProjectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const defaultPlanRegisterPath = 'docs/plan-register.json';
const defaultSotSource = 'docs/governance/source-of-truth-and-incremental-planning.md';
const defaultCanonicalPlan = 'docs/scrum-plan.md';
const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;

function sourcePath(projectRoot, source) {
  if (!text(source) || isAbsolute(source) || source.includes('\\')) return null;
  const absolute = resolve(projectRoot, source);
  const contained = relative(projectRoot, absolute);
  if (!contained || contained === '..' || contained.startsWith(`..${sep}`) || isAbsolute(contained)) return null;
  return absolute;
}

async function isFile(path) {
  try { return (await stat(path)).isFile(); } catch { return false; }
}

/** Read-only structural check; it never decides semantic completeness or release status. */
export async function checkSotConsistency({ projectRoot = defaultProjectRoot, checkOverview = true } = {}) {
  const errors = [];
  const registerPath = sourcePath(projectRoot, defaultPlanRegisterPath);
  let planRegister;
  try { planRegister = JSON.parse(await readFile(registerPath, 'utf8')); }
  catch (error) { return { status: 'BLOCKED', errors: [`PLAN_REGISTER_UNREADABLE:${error.message}`] }; }

  if (planRegister.canonicalPlan !== defaultCanonicalPlan) errors.push('CANONICAL_PLAN_PATH_INVALID');
  const sources = Array.isArray(planRegister.sources) ? planRegister.sources : [];
  if (!Array.isArray(planRegister.sources)) errors.push('PLAN_REGISTER_SOURCES_INVALID');
  const canonical = sources.filter(source => source?.role === 'canonical-plan');
  if (canonical.length !== 1 || canonical[0]?.path !== defaultCanonicalPlan) errors.push('CANONICAL_PLAN_ROLE_NOT_UNIQUE');
  const sourcePaths = new Set();
  for (const source of sources) {
    if (!text(source?.path) || sourcePaths.has(source.path)) { errors.push(`PLAN_SOURCE_INVALID:${source?.path ?? 'missing'}`); continue; }
    sourcePaths.add(source.path);
    const path = sourcePath(projectRoot, source.path);
    if (!path || !(await isFile(path))) errors.push(`PLAN_SOURCE_UNREADABLE:${source.path}`);
  }

  let registry;
  try { registry = await loadRegistry(sourcePath(projectRoot, 'docs/governance/module-registry.json'), { projectRoot }); }
  catch (error) { errors.push(`MODULE_REGISTRY_INVALID:${error.message}`); }
  if (registry) {
    const core = registry.modules.filter(module => module.module_id === 'scrum-core');
    const sot = registry.modules.filter(module => module.module_id === 'sot-architecture');
    if (core.length !== 1 || core[0].source !== defaultCanonicalPlan || core[0].status !== 'active_reference') errors.push('SCRUM_CORE_BINDING_INVALID');
    if (sot.length !== 1 || sot[0].source !== defaultSotSource || sot[0].status !== 'active_reference') errors.push('SOT_ARCHITECTURE_BINDING_INVALID');
  }

  try {
    const source = await readFile(sourcePath(projectRoot, defaultSotSource), 'utf8');
    if (!source.includes('docs/scrum-plan.md') || !source.includes('keine zweite aktive Planung')) errors.push('SOT_CANONICAL_PLAN_PRECEDENCE_MISSING');
  } catch { errors.push('SOT_SOURCE_UNREADABLE'); }

  if (checkOverview && projectRoot === defaultProjectRoot) {
    try { await verifyModuleOverview(); } catch (error) { errors.push(`MODULE_OVERVIEW_INVALID:${error.message}`); }
  }
  return { status: errors.length ? 'BLOCKED' : 'PASS', errors };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkSotConsistency();
  if (result.status === 'PASS') process.stdout.write('SoT consistency valid.\n');
  else {
    process.stderr.write(`SoT consistency blocked: ${result.errors.join('; ')}\n`);
    process.exitCode = 1;
  }
}
