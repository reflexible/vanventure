import { createWorkerStateStore, runtimeWorkers, activeProcesses } from './worker-state.mjs';
import { loadRegistry } from './module-registry.mjs';

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

/** Read the current durable snapshot without modifying worker state. */
export async function loadWorkerRuntime({ statePath, registryPath, proposedWriteScope = [] } = {}) {
  const registry = await loadRegistry(registryPath);
  const state = await createWorkerStateStore(statePath ? { path: statePath } : {}).snapshot();
  return buildWorkerRuntime({ state, registry, proposedWriteScope });
}
