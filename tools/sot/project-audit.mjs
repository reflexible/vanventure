import { readFile, writeFile, realpath, lstat } from 'node:fs/promises';
import { resolve, relative, isAbsolute, sep, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { validateRegistry } from './module-registry.mjs';
import { validateContracts } from './contracts.mjs';
import { buildDependencyGraph } from './dependency-graph.mjs';
import { detectDelta } from './delta.mjs';
import { assessImpact } from './impact.mjs';
import { runIncrementalAudit } from './incremental-audit.mjs';
import { inspectProjectTraceability } from './project-traceability.mjs';
import { selectProjectCheckProfiles, runProjectCheckProfile, localCheckEnvironment } from './project-check-profiles.mjs';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const text = value => typeof value === 'string' && value.trim().length > 0;
const metadata = ['docs/governance/module-registry.json', 'docs/governance/contracts.json',
  'docs/governance/dependency-graph.json'];
const runtimeModules = ['project-audit', 'project-check-profiles', 'project-traceability', 'incremental-audit',
  'fast-check', 'full-check', 'module-registry', 'contracts', 'dependency-graph', 'delta', 'impact', 'baselines', 'rule-catalogue'];
const executableScopes = {
  'governance-local': ['tools/sot', 'package.json', 'package-lock.json'],
  'cms-persistence-local': ['editor', 'package.json', 'package-lock.json'],
  'public-structure-local': ['*.html', '*.js', '*.css', 'Dockerfile', 'editor', 'package.json', 'package-lock.json'],
  'mandate-consistency-local': ['AGENTS.md', 'docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md',
    'docs/responsive-templates.md', 'docs/design-guide.md', 'docs/ausbauplan.md'],
  'analytics-inactive-contract': ['tools/sot/analytics-activation-gate.mjs', 'tools/sot/contracts.mjs',
    'tools/sot/module-registry.mjs', 'docs/governance/module-registry.json', 'docs/governance/contracts.json', 'docs/analytics.md'],
};
function trackedProfileSources(projectRoot, profile) {
  const scopes = executableScopes[profile.id];
  if (!scopes) throw Error(`PROFILE_EXECUTABLE_SCOPE_UNMAINTAINED:${profile.id}`);
  const options = { cwd: projectRoot, encoding: 'utf8', shell: false, windowsHide: true, env: localCheckEnvironment(), timeout: 10000 };
  const result = spawnSync('git', ['ls-files', '-z', '--', ...scopes, ...profile.refs], options);
  if (result.status !== 0 || result.error) throw Error('PROFILE_TRACKED_SOURCE_INVENTORY_FAILED');
  const relevant = path => {
    if (profile.refs.includes(path) || scopes.includes(path)) return true;
    if (/^(review|video-production)\//.test(path)) return false;
    return /^(tools\/sot|editor)\/.*\.(mjs|js|json|sql)$/.test(path)
      || (profile.id === 'public-structure-local' && /^[^/]+\.(html|js|css)$/.test(path));
  };
  const paths = [...new Set(result.stdout.split('\0').filter(Boolean))].filter(relevant).sort();
  const untracked = spawnSync('git', ['ls-files', '--others', '--exclude-standard', '-z', '--', ...scopes, ...profile.refs], options);
  if (untracked.status !== 0 || untracked.error) throw Error('PROFILE_UNTRACKED_INVENTORY_FAILED');
  if (untracked.stdout.split('\0').filter(Boolean).some(relevant)) throw Error(`PROFILE_EXECUTABLE_SOURCE_UNTRACKED:${profile.id}`);
  if (profile.refs.some(ref => !paths.includes(ref))) throw Error(`PROFILE_TEST_SOURCE_UNTRACKED:${profile.id}`);
  return paths;
}
function local(root, path) {
  if (!text(path) || isAbsolute(path) || path.includes('\\') || path.includes(':')) throw Error('INVALID_PROJECT_PATH');
  const absolute = resolve(root, path), rel = relative(root, absolute);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`)) throw Error('PROJECT_PATH_ESCAPE');
  return absolute;
}

/** Trusted host configuration supplies semantic/domain validators, never work-item data.
 * The runner supplies current metadata, maintained tests and original-source ancestry.
 * Local regression success alone cannot certify a module's semantics or a release.
 */
export function createProjectAuditRunner({ projectRoot, fullValidators = {} }) {
  if (!isAbsolute(projectRoot ?? '')) throw Error('ABSOLUTE_PROJECT_ROOT_REQUIRED');
  const configuredValidators = { ...fullValidators };
  return async function runProjectAudit(input) {
    const captured = structuredClone(input);
    for (const key of ['registry', 'contracts', 'graph', 'after', 'afterContracts', 'validators', 'test_commands', 'traceability_records']) {
      if (Object.hasOwn(captured, key)) throw Error(`PROJECT_INPUT_IS_HOST_OWNED:${key}`);
    }
    const output = local(projectRoot, captured.outputPath);
    if (!relative(projectRoot, output).replaceAll('\\', '/').startsWith('docs/sot-optimization/audits/')
        || !output.endsWith('.json')) throw Error('PROJECT_AUDIT_OUTPUT_REQUIRED');
    const proofPath = output.replace(/\.json$/, '.project-evidence.json');
    const checkOutputParent = async () => {
      if (await realpath(projectRoot) !== projectRoot || await realpath(dirname(output)) !== dirname(output)) throw Error('PROJECT_OUTPUT_PARENT_ALIAS');
    };
    await checkOutputParent();
    for (const path of [output, proofPath]) {
      try { await lstat(path); throw Error('PROJECT_AUDIT_OUTPUT_ALREADY_EXISTS'); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
    const snapshots = new Map();
    const capture = async path => {
      const absolute = local(projectRoot, path);
      if (await realpath(absolute) !== absolute) throw Error(`PROJECT_SOURCE_ALIAS:${path}`);
      const bytes = await readFile(absolute);
      if (snapshots.has(path) && !snapshots.get(path).equals(bytes)) throw Error(`PROJECT_SOURCE_CHANGED_DURING_CAPTURE:${path}`);
      snapshots.set(path, bytes); return bytes;
    };
    for (const path of metadata) await capture(path);
    const registry = JSON.parse(snapshots.get(metadata[0]).toString('utf8'));
    const registryCheck = await validateRegistry(registry, { projectRoot });
    if (!registryCheck.valid) throw Error(`PROJECT_REGISTRY_INVALID:${registryCheck.errors.join(';')}`);
    const contracts = JSON.parse(snapshots.get(metadata[1]).toString('utf8'));
    const contractsCheck = await validateContracts(contracts, registry, { projectRoot });
    if (!contractsCheck.valid) throw Error(`PROJECT_CONTRACTS_INVALID:${contractsCheck.errors.join(';')}`);
    const supplement = JSON.parse(snapshots.get(metadata[2]).toString('utf8'));
    const epicText = (await capture(supplement.sources.work_items)).toString('utf8');
    const graph = buildDependencyGraph({ supplement, registry, contracts, epicText });
    const after = {};
    for (const module of registry.modules.filter(module => module.status === 'active_reference')) {
      after[module.module_id] = await capture(module.source);
    }
    const auditInput = { ...captured, projectRoot, registry, contracts, graph, after, afterContracts: contracts,
      test_profiles: 'maintained' };
    const delta = detectDelta(auditInput);
    const impact = assessImpact({ change: captured.change, delta, graph });
    const runtimeSnapshots = new Map(await Promise.all(runtimeModules.map(async name =>
      [name, await readFile(new URL(`./${name}.mjs`, import.meta.url))])));
    const profileInventories = new Map();
    if (impact.mode !== 'NO_CHECK') {
      for (const profile of selectProjectCheckProfiles(impact.scope.modules).profiles) {
        const paths = trackedProfileSources(projectRoot, profile);
        profileInventories.set(profile.id, { profile, paths });
        for (const path of paths) await capture(path);
      }
    }
    const trace = impact.scope.work_items.length
      ? await inspectProjectTraceability({ projectRoot, workItemIds: impact.scope.work_items })
      : { status: 'PROJECT_TRACEABILITY_PASS', traceability_records: [], sourcehashes: {}, errors: [], unknowns: [] };
    for (const [path, expected] of Object.entries(trace.sourcehashes)) {
      if (hash(await capture(path)) !== expected) throw Error(`TRACE_SOURCE_CHANGED:${path}`);
    }
    auditInput.traceability_records = trace.status === 'PROJECT_TRACEABILITY_PASS' ? trace.traceability_records : [];
    const profileResults = new Map();
    const profileFor = async id => {
      const selection = selectProjectCheckProfiles([id]);
      if (selection.unresolved.length) return { status: 'BLOCKED', reason: selection.unresolved[0].reason };
      for (const profile of selection.profiles) {
        if (!profileResults.has(profile.id)) profileResults.set(profile.id, runProjectCheckProfile(profile.id, projectRoot));
        if (profileResults.get(profile.id).status !== 'LOCAL_PROFILE_PASS') return { status: 'BLOCKED', reason: `PROJECT_PROFILE_FAILED:${profile.id}` };
      }
      return { status: 'PASS' };
    };
    const invoke = async (name, context, binding) => {
      if (typeof configuredValidators[name] !== 'function') return { status: 'BLOCKED', reason: `MISSING_PROJECT_${name}_VALIDATOR` };
      const result = await configuredValidators[name](structuredClone({ ...context, ...binding, projectRoot }));
      if (result?.status !== 'PASS' || !text(result.evidence_ref)
          || Object.entries(binding).some(([key, value]) => result[key] !== value)) {
        return { status: 'BLOCKED', reason: result?.reason ?? 'PROJECT_VALIDATOR_BINDING_MISSING' };
      }
      return result;
    };
    auditInput.validators = {
      dependencyGraph: context => invoke('dependencyGraph', context, { graph_source_sha256: hash(snapshots.get(metadata[2])) }),
      module: async context => {
        const module = registry.modules.find(module => module.module_id === context.id);
        if (!module) return { status: 'BLOCKED', reason: 'UNKNOWN_MODULE' };
        const semantic = await invoke('module', context, { source_sha256: hash(snapshots.get(module.source)) });
        if (semantic.status !== 'PASS') return semantic;
        const tests = await profileFor(context.id);
        return tests.status === 'PASS' ? semantic : tests;
      },
      contract: context => invoke('contract', context, { contract_catalogue_sha256: hash(snapshots.get(metadata[1])) }),
      workItem: context => trace.status !== 'PROJECT_TRACEABILITY_PASS'
        ? { status: 'BLOCKED', reason: 'PROJECT_TRACEABILITY_BLOCKED' }
        : invoke('workItem', context, { work_item_source_sha256: hash(snapshots.get(supplement.sources.work_items)) }),
      activeProcess: context => invoke('activeProcess', context, { graph_source_sha256: hash(snapshots.get(metadata[2])) }),
    };
    const audit = await runIncrementalAudit(auditInput);
    const drift = [];
    for (const [path, bytes] of snapshots) {
      try {
        const file = local(projectRoot, path);
        if (await realpath(file) !== file || !(await readFile(file)).equals(bytes)) drift.push(path);
      } catch { drift.push(path); }
    }
    for (const [name, bytes] of runtimeSnapshots) {
      try { if (!(await readFile(new URL(`./${name}.mjs`, import.meta.url))).equals(bytes)) drift.push(`runtime:${name}`); }
      catch { drift.push(`runtime:${name}`); }
    }
    for (const { profile, paths } of profileInventories.values()) {
      try { if (JSON.stringify(trackedProfileSources(projectRoot, profile)) !== JSON.stringify(paths)) drift.push(`profile-inventory:${profile.id}`); }
      catch { drift.push(`profile-inventory:${profile.id}`); }
    }
    const result = { schema_version: '1.0.0', status: audit.status === 'PASS' && !drift.length
        && trace.status === 'PROJECT_TRACEABILITY_PASS' ? 'PROJECT_AUDIT_PASS' : 'PROJECT_AUDIT_BLOCKED',
      audit_output: captured.outputPath, audit, traceability: trace, source_drift: drift,
      source_sha256: Object.fromEntries([...snapshots].map(([path, bytes]) => [path, hash(bytes)])),
      runtime_source_sha256: Object.fromEntries([...runtimeSnapshots].map(([name, bytes]) => [name, hash(bytes)])),
      profile_source_paths: Object.fromEntries([...profileInventories].map(([id, entry]) => [id, entry.paths])),
      profile_results: [...profileResults.values()], product_release: false, live_verified: false };
    await checkOutputParent();
    await writeFile(proofPath, JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
    return result;
  };
}
