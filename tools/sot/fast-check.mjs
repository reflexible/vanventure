import { readFile, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { validateRegistry } from './module-registry.mjs';
import { validateContracts } from './contracts.mjs';
import { validateDependencyGraph } from './dependency-graph.mjs';
import { assessImpact } from './impact.mjs';
import { localCheckEnvironment, projectFastCheckCommands } from './project-check-profiles.mjs';

const sorted = values => [...new Set(values)].sort();
const text = value => typeof value === 'string' && value.trim().length > 0;

function repositoryPath(root, path) {
  if (!text(path) || isAbsolute(path) || path.includes('\\') || path.includes(':')) throw new Error(`Invalid repository path: ${path}`);
  const full = resolve(root, path);
  const rel = relative(root, full);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error(`Path escapes repository: ${path}`);
  return full;
}

async function fileExists(root, path) {
  try { return (await stat(repositoryPath(root, path))).isFile(); } catch { return false; }
}

function run(command, args, root, timeoutMs) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8', timeout: timeoutMs, maxBuffer: 2 * 1024 * 1024,
    shell: false, windowsHide: true, env: localCheckEnvironment() });
  return {
    command: [command, ...args],
    exit_code: result.status,
    stdout: (result.stdout ?? '').trim().slice(-4000),
    stderr: (result.stderr ?? '').trim().slice(-4000),
    error: result.error?.message ?? null,
  };
}

function markdownLinks(source) {
  const links = [];
  for (const match of source.matchAll(/\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+"[^"]*")?\)/g)) {
    const target = match[1] ?? match[2];
    if (/^(?:https?:|mailto:)/i.test(target)) continue;
    links.push(target);
  }
  return sorted(links.filter(Boolean));
}

function anchorExists(source, anchor) {
  const lineAnchor = /^L(\d+)(?:-L(\d+))?$/.exec(anchor);
  if (lineAnchor) {
    const count = source.split(/\r?\n/).length;
    return Number(lineAnchor[1]) >= 1 && Number(lineAnchor[1]) <= count
      && (!lineAnchor[2] || Number(lineAnchor[2]) >= Number(lineAnchor[1]) && Number(lineAnchor[2]) <= count);
  }
  const headings = [...source.matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)].map(match => match[1]);
  const seen = new Map();
  const anchors = headings.map(heading => {
    const base = heading.toLowerCase().replace(/<[^>]+>/g, '').replace(/[`*_~]/g, '')
      .replace(/[^\p{L}\p{N} _-]/gu, '').trim().replace(/\s+/g, '-');
    const ordinal = seen.get(base) ?? 0;
    seen.set(base, ordinal + 1);
    return ordinal ? `${base}-${ordinal}` : base;
  });
  return anchors.includes(anchor) || source.includes(`id="${anchor}"`) || source.includes(`id='${anchor}'`);
}

/** Execute the bounded FAST gate. Inputs must be computed delta/impact objects and
 * explicit trace records and test commands. Missing executable evidence blocks.
 * test_commands: [{id, covers: [module IDs], ref: repository test file, command, args: string[]}]
 * traceability_records: [{work_item_id, source_ref, source_anchor, target_ref}]
 */
export async function runFastCheck({
  change, delta, impact, registry, contracts, graph, projectRoot,
  traceability_records: traceRecords = [], test_commands: testCommands = [],
  changed_paths: changedPaths = [], timeout_ms: timeoutMs = 30000,
  test_profiles: testProfiles,
}) {
  const failures = [];
  const checks = [];
  const record = (name, passed, detail) => {
    checks.push({ name, status: passed ? 'PASS' : 'BLOCKED', detail });
    if (!passed) failures.push(`${name}: ${detail}`);
  };
  if (!projectRoot || !isAbsolute(projectRoot)) throw new Error('An absolute projectRoot is required.');
  if (!delta || !Array.isArray(delta.modules) || !Array.isArray(delta.contracts)
      || !impact?.scope || impact.mode !== 'FAST_CHECK') {
    return { result: 'FAST_CHECK_BLOCKED', failures: ['Computed FAST impact and delta are required.'], checks };
  }
  if (!registry?.modules || !contracts?.contracts || !graph?.nodes || !graph?.edges) {
    return { result: 'FAST_CHECK_BLOCKED', failures: ['Registry, contracts and graph are required.'], checks };
  }
  let recomputedImpact;
  try { recomputedImpact = assessImpact({ change, delta, graph }); } catch (error) {
    return { result: 'FAST_CHECK_BLOCKED', failures: [`Impact cannot be reproduced: ${error.message}`], checks };
  }
  if (recomputedImpact.mode !== 'FAST_CHECK' || !isDeepStrictEqual(recomputedImpact, impact)) {
    return { result: 'FAST_CHECK_BLOCKED', failures: ['Impact is not the reproducible FAST result for this change and delta.'], checks };
  }
  const changed = sorted(delta.modules.map(item => item.module_id));
  const affected = sorted(impact.scope.modules ?? []);
  const contractIds = sorted(impact.scope.contracts ?? []);
  const workItems = sorted(impact.scope.work_items ?? []);
  const moduleById = new Map(registry.modules.map(module => [module.module_id, module]));
  const contractById = new Map(contracts.contracts.map(contract => [contract.contract_id, contract]));
  const nodeIds = new Set(graph.nodes.map(node => node.id));
  const graphCheck = validateDependencyGraph(graph);
  const registryCheck = await validateRegistry(registry, { projectRoot });
  const contractsCheck = await validateContracts(contracts, registry, { projectRoot });
  record('delta', changed.length + delta.contracts.length > 0 && !delta.contract_comparison_unknown
    && changed.every(id => affected.includes(id))
    && delta.contracts.every(item => contractIds.includes(item.contract_id)),
  `changed=${changed.join(',')}; contract_changes=${delta.contracts.map(item => item.contract_id).join(',')}; comparison_unknown=${Boolean(delta.contract_comparison_unknown)}`);
  record('affected_modules', registryCheck.valid && affected.every(id => moduleById.has(id))
    && affected.every(id => nodeIds.has(`module:${id}`))
    && await Promise.all(affected.map(id => fileExists(projectRoot, moduleById.get(id)?.source))).then(items => items.every(Boolean)),
  `affected=${affected.join(',')}; registry_errors=${registryCheck.errors.join('; ')}`);
  record('relevant_contracts', contractsCheck.valid && contractIds.every(id => contractById.has(id))
    && contractIds.every(id => nodeIds.has(`contract:${id}`))
    && !delta.has_contract_break,
  `contracts=${contractIds.join(',')}; errors=${contractsCheck.errors.join('; ')}; break=${Boolean(delta.has_contract_break)}`);
  const directDependencies = sorted(graph.edges.filter(edge => edge.relation === 'depends_on'
    && changed.some(id => edge.to === `module:${id}`)).map(edge => edge.from));
  const checkedDependencies = directDependencies.every(id => nodeIds.has(id)
    && id.startsWith('module:') && moduleById.has(id.slice(7)));
  const dependencyFiles = checkedDependencies
    ? await Promise.all(directDependencies.map(id => fileExists(projectRoot, moduleById.get(id.slice(7)).source))) : [];
  record('direct_dependencies', graphCheck.valid && checkedDependencies && dependencyFiles.every(Boolean),
    `upstream=${directDependencies.join(',')}; graph_errors=${graphCheck.errors.join('; ')}`);
  const traceErrors = [];
  for (const item of workItems) {
    const records = traceRecords.filter(record => record.work_item_id === item);
    if (records.length === 0) { traceErrors.push(`${item} has no traceability record`); continue; }
    if (!nodeIds.has(`work_item:${item}`)) traceErrors.push(`${item} is absent from graph`);
    for (const trace of records) {
      if (!text(trace.source_anchor) || trace.source_ref === trace.target_ref) {
        traceErrors.push(`${item} needs a distinct anchored source and target`);
        continue;
      }
      if (!await fileExists(projectRoot, trace.source_ref) || !await fileExists(projectRoot, trace.target_ref)) {
        traceErrors.push(`${item} has a missing source or target file`);
        continue;
      }
      const source = await readFile(repositoryPath(projectRoot, trace.source_ref), 'utf8');
      if (!source.includes(trace.source_anchor)) traceErrors.push(`${item} source anchor is absent`);
      const target = await readFile(repositoryPath(projectRoot, trace.target_ref), 'utf8');
      if (!target.includes(item)) traceErrors.push(`${item} is absent from target`);
    }
  }
  record('traceability', traceErrors.length === 0, workItems.length ? `work_items=${workItems.join(',')}; errors=${traceErrors.join('; ')}` : 'No work items in impact scope.');
  const testResults = [];
  const covered = new Set();
  if (testProfiles !== undefined) {
    if (testProfiles !== 'maintained' || testCommands.length) {
      record('maintained_test_profiles', false, 'Use maintained profiles without caller-supplied test commands.');
      testCommands = [];
    } else {
      const selection = projectFastCheckCommands(affected);
      record('maintained_test_profiles', selection.unresolved.length === 0,
        JSON.stringify({ profiles: selection.profiles.map(profile => ({ id: profile.id, scope: profile.scope,
          remaining: profile.remaining })), unresolved: selection.unresolved, complete_semantic_coverage: false }));
      testCommands = selection.test_commands;
    }
  }
  for (const test of testCommands) {
    if (!text(test?.id) || !text(test?.command) || !Array.isArray(test.args)
      || !Array.isArray(test.covers) || test.args.some(arg => typeof arg !== 'string')
      || !text(test.ref) || !await fileExists(projectRoot, test.ref) || !test.args.includes(test.ref)) {
      testResults.push({ id: test?.id ?? null, error: 'Invalid executable test specification.' });
      continue;
    }
    const outcome = run(test.command, test.args, projectRoot, timeoutMs);
    testResults.push({ id: test.id, covers: test.covers, ...outcome });
    if (outcome.exit_code === 0 && !outcome.error) test.covers.forEach(id => covered.add(id));
  }
  record('relevant_tests', testResults.length > 0 && testResults.every(item => item.exit_code === 0 && !item.error)
    && changed.every(id => covered.has(id)),
  `coverage=${[...covered].sort().join(',')}; required=${changed.join(',')}; results=${JSON.stringify(testResults)}`);
  const referenceSources = sorted([...affected.map(id => moduleById.get(id)?.source),
    ...contractIds.map(id => contractById.get(id)?.authoritative_rule)].filter(Boolean));
  const missingReferences = [];
  for (const sourcePath of referenceSources) {
    if (!await fileExists(projectRoot, sourcePath)) { missingReferences.push(sourcePath); continue; }
    const source = await readFile(repositoryPath(projectRoot, sourcePath), 'utf8');
    for (const link of markdownLinks(source)) {
      const base = sourcePath.slice(0, sourcePath.lastIndexOf('/') + 1);
      let decoded;
      try { decoded = decodeURIComponent(link); } catch { missingReferences.push(`${sourcePath} -> malformed ${link}`); continue; }
      const [path, anchor] = decoded.split('#', 2);
      const candidate = path ? resolve(projectRoot, base, path) : repositoryPath(projectRoot, sourcePath);
      const rel = relative(projectRoot, candidate).replaceAll('\\', '/');
      if (!rel || rel.startsWith('../') || !await fileExists(projectRoot, rel)) {
        missingReferences.push(`${sourcePath} -> ${link}`);
      } else if (anchor && /\.(?:md|markdown)$/i.test(rel)) {
        const target = await readFile(repositoryPath(projectRoot, rel), 'utf8');
        if (!anchorExists(target, anchor)) missingReferences.push(`${sourcePath} -> ${link} (anchor)`);
      }
    }
  }
  record('references', missingReferences.length === 0, `sources=${referenceSources.join(',')}; missing=${missingReferences.join('; ')}`);
  const gitPaths = sorted([...changedPaths, ...changed.map(id => moduleById.get(id)?.source)].filter(Boolean));
  const pathErrors = [];
  for (const path of gitPaths) {
    try { repositoryPath(projectRoot, path); } catch (error) { pathErrors.push(error.message); }
  }
  const gitChecks = pathErrors.length ? [] : [
    run('git', ['ls-files', '--error-unmatch', '--', ...gitPaths], projectRoot, timeoutMs),
    run('git', ['diff', '--check', '--', ...gitPaths], projectRoot, timeoutMs),
    run('git', ['diff', '--cached', '--check', '--', ...gitPaths], projectRoot, timeoutMs),
  ];
  record('git_diff_check', gitPaths.length > 0 && pathErrors.length === 0
    && gitChecks.every(item => item.exit_code === 0 && !item.error),
  `paths=${gitPaths.join(',')}; errors=${pathErrors.join('; ')}; results=${JSON.stringify(gitChecks)}`);
  return { schema_version: '1.0.0', result: failures.length ? 'FAST_CHECK_BLOCKED' : 'FAST_CHECK_PASS',
    scope: { changed_modules: changed, affected_modules: affected, contracts: contractIds, work_items: workItems,
      direct_dependencies: directDependencies, checked_references: referenceSources, git_paths: gitPaths },
    checks, failures };
}
