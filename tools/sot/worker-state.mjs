import { mkdir, open, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import { evaluateDoneGuard } from './done-guard.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const defaultStatePath = resolve(root, 'docs/governance/worker-state.json');
export const defaultPlanPath = resolve(root, 'docs/governance/source-of-truth-and-incremental-planning.md');
const ACTIVE = new Set(['Claimed', 'In Progress', 'Review', 'Integration', 'Blocked']);
const IMPLEMENTING = new Set(['Claimed', 'In Progress']);
const STATES = new Set(['Backlog', ...ACTIVE, 'Done']);
const idPattern = /^WI-SOT-\d{2}-\d{2}$/;
const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const fresh = () => ({ schema_version: '1.0.0', kind: 'operational_worker_state', revision: 0, records: {}, history: [] });

function assert(condition, message) { if (!condition) throw new Error(message); }
function normalizeScope(scope) {
  assert(Array.isArray(scope) && scope.length > 0 && scope.every(text), 'write_scope needs nonempty paths or component names.');
  return [...new Set(scope)].sort();
}
function overlaps(a, b) {
  return a.some(left => b.some(right => left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`)));
}
function append(state, event, item, actor, details = {}) {
  state.history.push({ event_id: randomUUID(), at: new Date().toISOString(), event, work_item_id: item, actor, ...details });
}
function validateState(state) {
  assert(state?.schema_version === '1.0.0' && state?.kind === 'operational_worker_state', 'Invalid worker state schema.');
  assert(Number.isSafeInteger(state.revision) && state.revision >= 0 && state.records && !Array.isArray(state.records)
    && typeof state.records === 'object' && Array.isArray(state.history), 'Invalid worker state structure.');
  const busy = new Set();
  for (const [id, record] of Object.entries(state.records)) {
    assert(idPattern.test(id) && STATES.has(record?.execution_state), `Invalid record ${id}.`);
    assert(record.work_item_id === id && Array.isArray(record.write_scope), `Malformed ownership record ${id}.`);
    if (ACTIVE.has(record.execution_state)) assert(text(record.assigned_agent), `Active ${id} needs an owner.`);
    if (record.execution_state === 'Blocked') assert(STATES.has(record.resume_state) && record.resume_state !== 'Blocked'
      && text(record.blocked_by?.cause), `Blocked ${id} needs a valid resume state and cause.`);
    if (['Integration', 'Done'].includes(record.execution_state)) assert(record.review?.accepted === true, `${id} lacks accepted review.`);
    if (record.execution_state === 'Done') {
      assert(record.integration?.tests_passed === true, `${id} lacks verified integration.`);
      const guard = evaluateDoneGuard(record.completion_evidence ?? {}, { expectedScope: id });
      assert(guard.status === 'DONE_ALLOWED' && record.done_guard?.status === 'DONE_ALLOWED' && record.done_guard.scope === id,
        `${id} lacks an accepted Definition-of-Done guard.`);
    }
    if (IMPLEMENTING.has(record.execution_state)) {
      assert(!busy.has(record.assigned_agent), `Agent ${record.assigned_agent} has duplicate implementation work.`);
      busy.add(record.assigned_agent);
    }
  }
  return state;
}
async function knownItems(planPath) {
  const plan = await readFile(planPath, 'utf8');
  const ids = new Map();
  for (const line of plan.split(/\r?\n/)) {
    const match = /^- \[( |x)\] (?:~~)?(?:(TODO|READY|IN_PROGRESS|BLOCKED|DONE)\s*[–-]?\s*)?(WI-SOT-\d{2}-\d{2})\b/.exec(line);
    if (match) ids.set(match[3], match[1] === 'x' ? 'DONE' : match[2] ?? 'TODO');
  }
  return ids;
}

/** A local filesystem transaction lock; never silently steals another process's lock. */
async function withLock(path, operation, { timeoutMs = 5000 } = {}) {
  await mkdir(dirname(path), { recursive: true });
  const lockPath = `${path}.lock`;
  const started = Date.now();
  let lock;
  while (!lock) {
    try { lock = await open(lockPath, 'wx'); }
    catch (error) {
      if (error.code !== 'EEXIST') throw error;
      if (Date.now() - started >= timeoutMs) throw new Error(`Worker state lock timeout: ${lockPath}`);
      await wait(10 + Math.floor(Math.random() * 20));
    }
  }
  try {
    await lock.writeFile(`${process.pid}\n${new Date().toISOString()}\n`);
    return await operation();
  } finally {
    await lock.close();
    await unlink(lockPath);
  }
}
async function readState(path) {
  try { return validateState(JSON.parse(await readFile(path, 'utf8'))); }
  catch (error) { if (error.code === 'ENOENT') return fresh(); throw error; }
}
async function saveState(path, state) {
  const temp = `${path}.${process.pid}.${randomUUID()}.tmp`;
  try {
    await writeFile(temp, `${JSON.stringify(state, null, 2)}\n`, { flag: 'wx' });
    await rename(temp, path);
  } finally { await unlink(temp).catch(error => { if (error.code !== 'ENOENT') throw error; }); }
}

/** Operational status only. The plan remains the sole source for backlog rules and item definitions.
 * verifyCompletionEvidence is a trusted host dependency, never a payload/record field.
 * New Done transitions require it; historical Done records remain structurally readable.
 */
export function createWorkerStateStore({ path = defaultStatePath, planPath = defaultPlanPath, lockTimeoutMs = 5000,
  verifyCompletionEvidence } = {}) {
  async function transact(item, actor, mutate) {
    assert(idPattern.test(item), 'Invalid Work Item ID.');
    assert(text(actor), 'An actor ID is required.');
    return withLock(path, async () => {
      const planItems = await knownItems(planPath);
      assert(planItems.has(item), `Unknown Work Item ${item}; add it to the authoritative plan first.`);
      const state = await readState(path);
      const originalState = structuredClone(state);
      const result = await mutate(state, planItems.get(item));
      assert(isDeepStrictEqual(await readState(path), originalState), 'Worker state changed outside the transaction lock.');
      assert((await knownItems(planPath)).get(item) === planItems.get(item), 'Work item plan status changed during transaction.');
      state.revision++;
      validateState(state);
      await saveState(path, state);
      return result;
    }, { timeoutMs: lockTimeoutMs });
  }
  return {
    path,
    async snapshot() { return readState(path); },
    async claim({ work_item_id: item, worker_id: worker, write_scope: scope, coordination_ref: coordinationRef }) {
      assert(text(worker), 'worker_id is required.');
      const writeScope = normalizeScope(scope);
      return transact(item, worker, (state, planStatus) => {
        assert(planStatus === 'READY', `${item} is ${planStatus} in the authoritative plan; only READY work can be claimed.`);
        const old = state.records[item];
        assert(!old || old.execution_state === 'Backlog', `${item} is already claimed or completed; use explicit reassignment or release.`);
        assert(!Object.values(state.records).some(record => record.assigned_agent === worker && IMPLEMENTING.has(record.execution_state)),
          `${worker} already has active implementation work.`);
        for (const [otherId, record] of Object.entries(state.records)) {
          if (otherId !== item && ACTIVE.has(record.execution_state) && overlaps(writeScope, record.write_scope ?? [])) {
            assert(text(coordinationRef) && text(record.coordination_ref) && coordinationRef === record.coordination_ref,
              `Write scope conflicts with ${otherId}; shared explicit coordination_ref is required.`);
          }
        }
        const claimedAt = new Date().toISOString();
        state.records[item] = { work_item_id: item, execution_state: 'Claimed', assigned_agent: worker,
          claimed_at: claimedAt, write_scope: writeScope, coordination_ref: coordinationRef ?? null,
          handoff: null, review: null, integration: null, blocked_by: null };
        append(state, 'CLAIM', item, worker, { write_scope: writeScope, coordination_ref: coordinationRef ?? null });
        return state.records[item];
      });
    },
    async extendScope({ work_item_id: item, worker_id: worker, write_scope: scope, reason, coordination_ref: coordinationRef }) {
      assert(text(reason), 'Scope extension requires an explicit reason.');
      const additionalScope = normalizeScope(scope);
      return transact(item, worker, state => {
        const record = state.records[item];
        assert(record && ACTIVE.has(record.execution_state) && record.assigned_agent === worker,
          'Scope extension requires own active work item.');
        const expandedScope = normalizeScope([...record.write_scope, ...additionalScope]);
        const effectiveCoordination = coordinationRef ?? record.coordination_ref;
        assert(coordinationRef === undefined || text(coordinationRef), 'coordination_ref must be nonempty when supplied.');
        for (const [otherId, other] of Object.entries(state.records)) {
          if (otherId !== item && ACTIVE.has(other.execution_state) && overlaps(expandedScope, other.write_scope ?? [])) {
            assert(text(effectiveCoordination) && text(other.coordination_ref) && effectiveCoordination === other.coordination_ref,
              `Write scope conflicts with ${otherId}; shared explicit coordination_ref is required.`);
          }
        }
        const previousScope = [...record.write_scope];
        record.write_scope = expandedScope;
        record.coordination_ref = effectiveCoordination ?? null;
        append(state, 'EXTEND_SCOPE', item, worker, { reason, previous_scope: previousScope,
          write_scope: [...expandedScope], coordination_ref: record.coordination_ref });
        return structuredClone(record);
      });
    },
    async start({ work_item_id: item, worker_id: worker }) {
      return transact(item, worker, state => {
        const record = state.records[item];
        assert(record?.execution_state === 'Claimed' && record.assigned_agent === worker, 'Start requires own Claimed item.');
        record.execution_state = 'In Progress';
        append(state, 'START', item, worker);
        return record;
      });
    },
    async handover({ work_item_id: item, worker_id: worker, summary, files, tests, limitations, follow_up, decision_refs = [] }) {
      assert(text(summary) && Array.isArray(files) && Array.isArray(tests) && Array.isArray(limitations)
        && Array.isArray(follow_up) && Array.isArray(decision_refs), 'Handover needs summary, files, tests, limitations, follow_up and decision_refs.');
      return transact(item, worker, state => {
        const record = state.records[item];
        assert(record?.execution_state === 'In Progress' && record.assigned_agent === worker, 'Handover requires own In Progress item.');
        record.handoff = { summary, files, tests, limitations, follow_up, decision_refs, at: new Date().toISOString() };
        record.execution_state = 'Review';
        append(state, 'SUBMIT_REVIEW', item, worker, { summary });
        return record;
      });
    },
    async review({ work_item_id: item, reviewer_id: reviewer, accepted, evidence_ref: evidence, self_review_reason: selfReason }) {
      assert(typeof accepted === 'boolean' && text(evidence), 'Review needs a result and evidence_ref.');
      return transact(item, reviewer, state => {
        const record = state.records[item];
        assert(record?.execution_state === 'Review' && record.handoff, 'Review requires submitted handover.');
        assert(reviewer !== record.assigned_agent || text(selfReason), 'Self-review needs an explicit exception reason.');
        record.review = { reviewer_id: reviewer, accepted, evidence_ref: evidence, self_review_reason: selfReason ?? null, at: new Date().toISOString() };
        record.execution_state = accepted ? 'Integration' : 'In Progress';
        append(state, accepted ? 'REVIEW_ACCEPT' : 'REVIEW_REWORK', item, reviewer, { evidence_ref: evidence });
        return record;
      });
    },
    async integrate({ work_item_id: item, integrator_id: integrator, evidence_ref: evidence,
      tests_passed: testsPassed, completion_evidence: completionEvidence }) {
      assert(text(evidence) && testsPassed === true, 'Integration needs passing checks and evidence_ref.');
      const capturedEvidence = structuredClone(completionEvidence ?? {});
      return transact(item, integrator, async state => {
        const record = state.records[item];
        assert(record?.execution_state === 'Integration' && record.review?.accepted, 'Integration requires accepted review.');
        const doneGuard = evaluateDoneGuard(capturedEvidence, { expectedScope: item });
        assert(doneGuard.status === 'DONE_ALLOWED',
          `Definition-of-Done guard blocked completion: ${doneGuard.findings.filter(item => item.status !== 'PASS').map(item => `${item.id}:${item.detail}`).join('; ')}`);
        assert(typeof verifyCompletionEvidence === 'function', 'Trusted completion evidence verifier is required.');
        const context = structuredClone({ work_item_id: item, completion_evidence: capturedEvidence,
          review: record.review, integration: { integrator_id: integrator, evidence_ref: evidence, tests_passed: true }, record });
        const originalContext = structuredClone(context);
        let verification;
        try { verification = structuredClone(await verifyCompletionEvidence(context)); }
        catch (error) { throw new Error(`Completion evidence verification failed: ${error.message}`); }
        assert(isDeepStrictEqual(context, originalContext), 'Completion verifier mutated its bound context.');
        assert(verification?.status === 'PASS' && text(verification.evidence_ref), 'Trusted completion evidence verification did not pass.');
        record.integration = { integrator_id: integrator, evidence_ref: evidence, tests_passed: true, at: new Date().toISOString() };
        record.completion_verification = { status: 'PASS', evidence_ref: verification.evidence_ref,
          scope: item, verified_at: record.integration.at };
        record.completion_evidence = structuredClone(capturedEvidence);
        record.done_guard = doneGuard;
        record.execution_state = 'Done';
        append(state, 'INTEGRATE_DONE', item, integrator, { evidence_ref: evidence, done_guard: doneGuard.status });
        return record;
      });
    },
    async block({ work_item_id: item, worker_id: worker, blocked_by: blocker, question }) {
      assert(text(blocker) && text(question), 'Blocked state needs cause and concrete question or resolution.');
      return transact(item, worker, state => {
        const record = state.records[item];
        assert(record && ACTIVE.has(record.execution_state) && record.execution_state !== 'Blocked'
          && record.assigned_agent === worker, 'Only current owner can block an active, unblocked item.');
        record.resume_state = record.execution_state;
        record.execution_state = 'Blocked';
        record.blocked_by = { cause: blocker, question, at: new Date().toISOString() };
        append(state, 'BLOCK', item, worker, { cause: blocker, question });
        return record;
      });
    },
    async unblock({ work_item_id: item, actor_id: actor, resolution_ref: resolution }) {
      assert(text(resolution), 'Unblocking needs resolution_ref.');
      return transact(item, actor, state => {
        const record = state.records[item];
        assert(record?.execution_state === 'Blocked', 'Item is not Blocked.');
        record.execution_state = record.resume_state;
        record.resume_state = null;
        record.blocked_by = null;
        append(state, 'UNBLOCK', item, actor, { resolution_ref: resolution });
        return record;
      });
    },
    async release({ work_item_id: item, actor_id: actor, reason }) {
      assert(text(reason), 'Release needs a reason.');
      return transact(item, actor, state => {
        const record = state.records[item];
        assert(record && ACTIVE.has(record.execution_state), 'Only active work can be released.');
        assert(actor === record.assigned_agent, 'Only the owner can release; use reassign for controller action.');
        record.execution_state = 'Backlog';
        record.assigned_agent = null;
        record.claimed_at = null;
        record.write_scope = [];
        record.coordination_ref = null;
        append(state, 'RELEASE', item, actor, { reason });
        return record;
      });
    },
    async reassign({ work_item_id: item, controller_id: controller, to_worker_id: worker, reason }) {
      assert(text(worker) && text(reason), 'Reassignment needs new worker and reason.');
      return transact(item, controller, state => {
        const record = state.records[item];
        assert(record && ACTIVE.has(record.execution_state) && worker !== record.assigned_agent, 'Reassignment needs an active item and different owner.');
        assert(!Object.values(state.records).some(other => other !== record && other.assigned_agent === worker && IMPLEMENTING.has(other.execution_state)),
          `${worker} already has active implementation work.`);
        const from = record.assigned_agent;
        record.assigned_agent = worker;
        record.claimed_at = new Date().toISOString();
        append(state, 'REASSIGN', item, controller, { from, to: worker, reason });
        return record;
      });
    },
  };
}


/** Project an explicit worker scope; no claim or file authorization is mutated. */
export function describeWorkerScope(record, { protected_scopes = ['docs/scrum-plan.md'] } = {}) {
  if (!record || !text(record.work_item_id) || !text(record.assigned_agent) || !Array.isArray(record.write_scope) || !record.write_scope.length) throw new Error('A claimed worker record with write_scope is required.');
  const allowed = normalizeScope(record.write_scope);
  const protectedPaths = normalizeScope(protected_scopes);
  if (allowed.some(path => protectedPaths.some(blocked => path === blocked || path.startsWith(`${blocked}/`) || blocked.startsWith(`${path}/`)))) throw new Error('Worker scope includes a protected path.');
  return { work_item_id: record.work_item_id, assigned_agent: record.assigned_agent, allowed_write_scope: allowed, protected_scopes: protectedPaths, execution_authorized: false };
}

/** Check a proposed file path against a projected scope without changing state. */
export function isWorkerPathAllowed(scope, path) {
  if (!scope || !Array.isArray(scope.allowed_write_scope) || !Array.isArray(scope.protected_scopes) || !text(path)) throw new Error('Valid worker scope and path are required.');
  const allowed = normalizeScope(scope.allowed_write_scope), protectedPaths = normalizeScope(scope.protected_scopes);
  const inside = base => path === base || path.startsWith(`${base}/`);
  const matched_protected_scopes = protectedPaths.filter(inside);
  return { allowed: allowed.some(inside) && matched_protected_scopes.length === 0, path, matched_protected_scopes, execution_authorized: false };
}

/** Analyze file-scope collisions without changing claims or assignments. */
export function analyzeWriteScopeConflicts(records) {
  if (!records || typeof records !== 'object' || Array.isArray(records)) throw new Error('records must be an object.');
  const active = Object.values(records).filter(record => ACTIVE.has(record?.execution_state));
  const conflicts = [];
  for (let index = 0; index < active.length; index++) for (let other = index + 1; other < active.length; other++) {
    const left = active[index], right = active[other];
    const paths = (left.write_scope ?? []).flatMap(a => (right.write_scope ?? []).filter(b => a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`)).map(path => path));
    if (paths.length) conflicts.push({ work_item_ids: [left.work_item_id, right.work_item_id].sort(), paths: [...new Set(paths)].sort(),
      coordination_required: left.coordination_ref !== right.coordination_ref || !text(left.coordination_ref) });
  }
  return { status: conflicts.length ? 'COORDINATION_REQUIRED' : 'NO_FILE_CONFLICTS', conflicts };
}

/** Derived views for the existing graph and impact engines; no second backlog. */
export function runtimeWorkers(state) {
  validateState(state);
  const workers = new Map();
  for (const record of Object.values(state.records)) {
    if (!ACTIVE.has(record.execution_state)) continue;
    const worker = workers.get(record.assigned_agent) ?? { id: record.assigned_agent, claims: [] };
    worker.claims.push(record.work_item_id);
    workers.set(worker.id, worker);
  }
  return { workers: [...workers.values()].map(worker => ({ ...worker, claims: worker.claims.sort() })).sort((a, b) => a.id.localeCompare(b.id)) };
}
export function activeProcesses(state) {
  validateState(state);
  return Object.values(state.records).filter(record => ACTIVE.has(record.execution_state)).map(record => ({
    id: record.assigned_agent, work_item_ids: [record.work_item_id], module_ids: [],
    conflict: false,
  })).sort((a, b) => a.id.localeCompare(b.id) || a.work_item_ids[0].localeCompare(b.work_item_ids[0]));
}
