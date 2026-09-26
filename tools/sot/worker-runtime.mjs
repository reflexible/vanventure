import { readFile } from 'node:fs/promises';
import { createWorkerStateStore, defaultPlanPath, runtimeWorkers, activeProcesses } from './worker-state.mjs';
import { loadRegistry } from './module-registry.mjs';
import { countWorkItems } from './progress.mjs';

const validScope = value => typeof value === 'string' && value.trim() === value
  && value.length > 0 && !value.includes('\\') && !value.startsWith('/')
  && !/^[A-Za-z]:/.test(value) && !value.split('/').includes('..');

function normalizeScope(value) {
  if (!validScope(value)) throw new Error(`Invalid write scope: ${String(value)}`);
  return value.startsWith('./') ? value.slice(2) : value;
}

function overlaps(left, right) {
  return left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`);
}

function planStatuses(planText) {
  if (typeof planText !== 'string') throw new Error('Authoritative plan text is required.');
  countWorkItems(planText);
  const statuses = new Map();
  for (const line of planText.split(/\r?\n/)) {
    const done = /^- \[x\] ~~(WI-SOT-\d{2}-\d{2}) · .+~~$/.exec(line);
    const open = /^- \[ \] (TODO|READY|IN_PROGRESS|BLOCKED) – (WI-SOT-\d{2}-\d{2}) · .+$/.exec(line);
    const id = done?.[1] ?? open?.[2];
    if (!id) continue;
    if (statuses.has(id)) throw new Error(`Duplicate plan Work Item ${id}.`);
    statuses.set(id, done ? 'DONE' : open[1]);
  }
  return statuses;
}

/** Resolve paths against exact registry sources or explicitly declared owned scopes. */
export function modulesForWriteScope(writeScope, registry) {
  if (!Array.isArray(writeScope) || !Array.isArray(registry?.modules)) throw new Error('Write scope and module registry are required.');
  const modules = new Set();
  for (const rawScope of writeScope) {
    const scope = normalizeScope(rawScope);
    const matches = registry.modules.filter(module => {
      const source = normalizeScope(module.source);
      if (scope === source) return true;
      if (module.owned_scopes !== undefined && !Array.isArray(module.owned_scopes)) {
        throw new Error(`Invalid owned_scopes for ${module.module_id}.`);
      }
      return (module.owned_scopes ?? []).some(owned => {
        const prefix = normalizeScope(owned);
        return scope === prefix || scope.startsWith(`${prefix}/`);
      });
    });
    if (matches.length !== 1) throw new Error(`${matches.length ? 'Ambiguous' : 'Unknown'} write scope ${scope}; explicit ownership is required.`);
    modules.add(matches[0].module_id);
  }
  return [...modules].sort();
}

/** Operational projection only; the authoritative plan still defines the backlog. */
export function buildWorkerRuntime({ state, registry, proposedWriteScope = [] }) {
  const workers = runtimeWorkers(state);
  const processes = activeProcesses(state);
  if (!Array.isArray(proposedWriteScope)) throw new Error('proposedWriteScope must be an array.');
  const proposed = proposedWriteScope.map(normalizeScope);
  if (proposed.length) modulesForWriteScope(proposed, registry);
  const active = processes.map(process => {
    const record = state.records[process.work_item_ids[0]];
    const scopes = record.write_scope.map(normalizeScope);
    if (!scopes.length) throw new Error(`Active ${record.work_item_id} has no write scope.`);
    return {
      ...process,
      module_ids: modulesForWriteScope(scopes, registry),
      conflict: proposed.some(next => scopes.some(current => overlaps(next, current))),
    };
  });
  return { runtimeWorkers: workers, activeProcesses: active };
}

/**
 * Bind the operational worker snapshot to the one authoritative plan.
 * It is local controller visibility only; it neither connects to a chat
 * provider nor authorizes remote execution, claims or plan mutation.
 */
export function buildControllerRuntime({ state, registry, planText, proposedWriteScope = [] }) {
  const workers = runtimeWorkers(state);
  const processes = activeProcesses(state);
  if (!Array.isArray(proposedWriteScope)) throw new Error('proposedWriteScope must be an array.');
  const proposed = proposedWriteScope.map(normalizeScope);
  const controllerProcesses = processes.map(process => {
    const record = state.records[process.work_item_ids[0]];
    const scopes = record.write_scope.map(normalizeScope);
    try {
      const module_ids = modulesForWriteScope(scopes, registry);
      return { ...process, module_ids, conflict: proposed.some(next => scopes.some(current => overlaps(next, current))),
        scope_status: 'MAPPED' };
    } catch (error) {
      return { ...process, module_ids: [], conflict: true, scope_status: 'UNMAPPED', scope_error: error.message };
    }
  });
  const runtime = { runtimeWorkers: workers, activeProcesses: controllerProcesses };
  const statuses = planStatuses(planText);
  for (const record of Object.values(state.records)) {
    const planStatus = statuses.get(record.work_item_id);
    if (!planStatus) throw new Error(`Worker item missing from authoritative plan: ${record.work_item_id}`);
    if (record.execution_state === 'Done' && planStatus !== 'DONE') {
      throw new Error(`Done worker item disagrees with plan: ${record.work_item_id}`);
    }
    if (record.execution_state !== 'Done' && record.execution_state !== 'Backlog' && !['READY', 'IN_PROGRESS', 'BLOCKED'].includes(planStatus)) {
      throw new Error(`Active worker item disagrees with plan: ${record.work_item_id}`);
    }
  }
  const current_work_items = runtime.activeProcesses.map(process => {
    const record = state.records[process.work_item_ids[0]];
    return { work_item_id: record.work_item_id, plan_status: statuses.get(record.work_item_id),
      execution_state: record.execution_state, assigned_agent: record.assigned_agent,
      write_scope: [...record.write_scope], blocked_by: record.blocked_by ?? null };
  });
  return { ...runtime, current_work_items, plan_counter: countWorkItems(planText),
    chat_runtime: { status: 'LOCAL_ONLY_NOT_REMOTE_AUTHORIZED', active_agent_ids: runtime.runtimeWorkers.workers.map(worker => worker.id) },
    execution_authorized: false };
}

/** Read the current durable snapshot without modifying worker state. */
export async function loadWorkerRuntime({ statePath, registryPath, proposedWriteScope = [] } = {}) {
  const registry = await loadRegistry(registryPath);
  const state = await createWorkerStateStore(statePath ? { path: statePath } : {}).snapshot();
  return buildWorkerRuntime({ state, registry, proposedWriteScope });
}

export async function loadControllerRuntime({ statePath, registryPath, planPath = defaultPlanPath, proposedWriteScope = [] } = {}) {
  const registry = await loadRegistry(registryPath);
  const state = await createWorkerStateStore(statePath ? { path: statePath } : {}).snapshot();
  const planText = await readFile(planPath, 'utf8');
  return buildControllerRuntime({ state, registry, planText, proposedWriteScope });
}
