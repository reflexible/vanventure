import { spawnSync } from 'node:child_process';
import { isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assessAnalyticsActivation } from './analytics-activation-gate.mjs';

// Maintained executable test scopes, not a declaration of complete module coverage.
const profiles = {
  'analytics-inactive-contract': { modules: ['analytics'], refs: ['tools/sot/analytics-activation-gate.test.mjs'],
    scope: 'Pinned inactive analytics contract, authority and actual defer/activate denial checks.',
    remaining: 'Analytics development is deferred. No runtime implementation, tracking verification or activation approval.' },
  'governance-local': { modules: ['scrum-core', 'sot-architecture'],
    refs: ['tools/sot/baselines.test.mjs', 'tools/sot/contracts.test.mjs', 'tools/sot/dependency-graph.test.mjs',
      'tools/sot/governance-workflow.test.mjs', 'tools/sot/worker-state.test.mjs'],
    scope: 'Golden recovery, contract metadata, dependency graph, bounded governance workflow and local worker transitions.',
    remaining: 'Proposal-specific semantic scope, source traceability, actual worker evidence and cross-chat orchestration still require their own proof.' },
  'cms-persistence-local': { modules: ['cms-content'], refs: ['editor/postgres.test.mjs', 'editor/editor.test.mjs'],
    scope: 'Existing CMS persistence, revision and editorial unit regressions using isolated PGlite.',
    remaining: 'Not a production PostgreSQL, authenticated publishing, browser, deployment or full CMS contract certification.' },
  'public-structure-local': { modules: ['responsive-templates', 'design-guide'], refs: ['deploy/public-content.test.mjs'],
    scope: 'Existing static public component, gallery and content structure assertions.',
    remaining: 'No visual approval, responsive browser review, new image audit or complete design coverage.' },
  'mandate-consistency-local': { modules: ['consolidated-mandate'], refs: ['deploy/gesamtauftrag-consistency.test.mjs'],
    scope: 'Existing documented mandate and required-reference consistency assertions.',
    remaining: 'No new approval and no general semantic equivalence proof.' },
};
const unresolved = {
  'release-governance': 'Explicit release authorization and live verification are not inferred from local tests; release/deployment commands are excluded.',
};
const environmentKeys = new Set(['PATH', 'SYSTEMROOT', 'WINDIR', 'COMSPEC', 'PATHEXT', 'TEMP', 'TMP', 'HOME', 'USERPROFILE', 'APPDATA', 'LOCALAPPDATA']);

/** No database credentials, TEST_DATABASE_URL, Node preload or network proxy settings survive. */
export function localCheckEnvironment(environment = process.env) {
  const safe = {};
  for (const [key, value] of Object.entries(environment)) {
    if (environmentKeys.has(key.toUpperCase()) && typeof value === 'string') safe[key.toUpperCase()] = value;
  }
  safe.NODE_ENV = 'test';
  return safe;
}

export function selectProjectCheckProfiles(moduleIds) {
  if (!Array.isArray(moduleIds) || !moduleIds.length || moduleIds.some(id => typeof id !== 'string' || !id.trim())) {
    throw new Error('Explicit nonempty module IDs are required.');
  }
  const ids = [...new Set(moduleIds)].sort();
  const selected = Object.entries(profiles).filter(([, profile]) => profile.modules.some(id => ids.includes(id)))
    .map(([id, profile]) => ({ id, ...structuredClone(profile), requested_modules: profile.modules.filter(module => ids.includes(module)) }));
  const missing = ids.filter(id => !selected.some(profile => profile.modules.includes(id)))
    .map(module_id => ({ module_id, reason: unresolved[module_id] ?? 'No maintained local test profile for this module.' }));
  return { profiles: selected, unresolved: missing, complete_semantic_coverage: false };
}

export function projectCheckInvocation(profileId, projectRoot, environment = process.env) {
  if (!Object.hasOwn(profiles, profileId)) throw new Error('Unknown maintained check profile.');
  if (!isAbsolute(projectRoot ?? '')) throw new Error('Absolute project root required.');
  return { command: process.execPath, args: ['--test', ...profiles[profileId].refs],
    options: { cwd: projectRoot, shell: false, windowsHide: true, encoding: 'utf8',
      timeout: 180000, maxBuffer: 4 * 1024 * 1024, env: localCheckEnvironment(environment) } };
}

/** FAST runner-compatible records route through this adapter to enforce safe env. */
export function projectFastCheckCommands(moduleIds) {
  const selection = selectProjectCheckProfiles(moduleIds);
  return { ...selection, test_commands: selection.profiles.map(profile => ({
    id: profile.id, covers: profile.requested_modules, ref: 'tools/sot/project-check-profiles.mjs',
    command: process.execPath, args: ['tools/sot/project-check-profiles.mjs', '--run-profile', profile.id],
  })) };
}

export function runProjectCheckProfile(profileId, projectRoot) {
  const invocation = projectCheckInvocation(profileId, projectRoot);
  const result = spawnSync(invocation.command, invocation.args, invocation.options);
  const output = { profile_id: profileId, status: result.status === 0 && !result.error ? 'LOCAL_PROFILE_PASS' : 'LOCAL_PROFILE_BLOCKED',
    scope: profiles[profileId].scope, remaining: profiles[profileId].remaining,
    command: [invocation.command, ...invocation.args], exit_code: result.status,
    stdout: (result.stdout ?? '').slice(-20000), stderr: (result.stderr ?? '').slice(-4000), error: result.error?.message ?? null,
    complete_semantic_coverage: false, product_release: false, live_verified: false };
  if (profileId === 'analytics-inactive-contract') {
    const args = [fileURLToPath(import.meta.url), '--assess-analytics-inactive', projectRoot];
    const gate = spawnSync(process.execPath, args, invocation.options);
    let proof = null;
    try { proof = JSON.parse(gate.stdout); } catch { /* Missing or malformed evidence blocks. */ }
    const passed = gate.status === 0 && !gate.error && proof?.status === 'DEFERRED_INACTIVE'
      && proof.runtime_verified === false && proof.activation_allowed === false;
    Object.assign(output, { analytics_status: passed ? 'DEFERRED_INACTIVE' : 'ACTIVATION_BLOCKED',
      runtime_verified: false, activation_allowed: false, gate_evidence: proof,
      gate_command: [process.execPath, ...args], gate_exit_code: gate.status,
      gate_error: gate.error?.message ?? (gate.stderr || null) });
    if (!passed) output.status = 'LOCAL_PROFILE_BLOCKED';
  }
  return output;
}

// The synchronous host API delegates async disk checks to this fixed, sanitized child.
async function assessInactiveProfile(projectRoot) {
  const deferred = await assessAnalyticsActivation({ projectRoot, action: 'defer' });
  const activation = await assessAnalyticsActivation({ projectRoot, action: 'activate' });
  const passed = deferred.status === 'DEFERRED_INACTIVE' && deferred.errors.length === 0
    && activation.status === 'ACTIVATION_BLOCKED'
    && JSON.stringify(activation.errors) === JSON.stringify(['ACTUAL_ANALYTICS_RUNTIME_BOUNDARY_AND_PINNED_TEST_EVIDENCE_MISSING'])
    && [deferred, activation].every(value => value.runtime_verified === false && value.activation_allowed === false)
    && JSON.stringify(deferred.evidence) === JSON.stringify(activation.evidence);
  return { status: passed ? 'DEFERRED_INACTIVE' : 'ACTIVATION_BLOCKED', runtime_verified: false,
    activation_allowed: false, deferred, activation };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === '--assess-analytics-inactive' && process.argv.length === 4) {
    const result = await assessInactiveProfile(process.argv[3]);
    console.log(JSON.stringify(result));
    if (result.status !== 'DEFERRED_INACTIVE') process.exitCode = 1;
  } else {
    if (process.argv[2] !== '--run-profile' || process.argv.length !== 4) throw new Error('Use --run-profile <maintained-profile-id>.');
    const result = runProjectCheckProfile(process.argv[3], process.cwd());
    console.log(JSON.stringify(result, null, 2));
    if (result.status !== 'LOCAL_PROFILE_PASS') process.exitCode = 1;
  }
}
