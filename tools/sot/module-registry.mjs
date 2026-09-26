import { readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const defaultRegistryPath = resolve(repositoryRoot, 'docs/governance/module-registry.json');

const requiredFields = [
  'module_id', 'name', 'authority', 'source', 'status', 'version',
  'dependencies', 'contracts', 'last_verified_baseline',
  'semantic_baseline', 'last_audit_status',
];
const idPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const authorityPattern = /^[a-z][a-z0-9]*(?:[.-][a-z0-9]+)*$/;
const contractPattern = /^[A-Z][A-Z0-9]*(?:[-.][A-Z0-9]+)*$/;
const statuses = new Set(['active_reference', 'proposed', 'superseded']);

function nonempty(value) {
  return typeof value === 'string' && value.trim() === value && value.length > 0;
}

function sourcePath(projectRoot, source) {
  if (!nonempty(source) || isAbsolute(source) || source.includes('\\')) return null;
  const absolute = resolve(projectRoot, source);
  const within = relative(projectRoot, absolute);
  if (!within || within === '..' || within.startsWith(`..${sep}`) || isAbsolute(within)) return null;
  return absolute;
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

/** Validate a registry against the checkout containing its source documents. */
export async function validateRegistry(registry, { projectRoot = repositoryRoot } = {}) {
  const errors = [];
  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
    return { valid: false, errors: ['Registry must be an object.'] };
  }
  if (registry.schema_version !== '1.0.0') errors.push('Unsupported registry schema_version.');
  if (!Array.isArray(registry.modules)) {
    return { valid: false, errors: [...errors, 'modules must be an array.'] };
  }

  const ids = new Set();
  const authorities = new Set();
  for (const [index, module] of registry.modules.entries()) {
    const label = `modules[${index}]`;
    if (!module || typeof module !== 'object' || Array.isArray(module)) {
      errors.push(`${label} must be an object.`);
      continue;
    }
    for (const field of requiredFields) {
      if (!Object.hasOwn(module, field)) errors.push(`${label}.${field} is required.`);
    }
    if (!idPattern.test(module.module_id ?? '')) errors.push(`${label}.module_id is invalid.`);
    if (ids.has(module.module_id)) errors.push(`${label}.module_id duplicates ${module.module_id}.`);
    ids.add(module.module_id);
    if (!nonempty(module.name)) errors.push(`${label}.name must be nonempty.`);
    if (!authorityPattern.test(module.authority ?? '')) errors.push(`${label}.authority is invalid.`);
    if (authorities.has(module.authority)) errors.push(`${label}.authority duplicates ${module.authority}.`);
    authorities.add(module.authority);
    if (!statuses.has(module.status)) errors.push(`${label}.status is invalid.`);
    if (module.version !== null && !nonempty(module.version)) errors.push(`${label}.version must be null or nonempty.`);
    const path = sourcePath(projectRoot, module.source);
    if (!path || !(await isFile(path))) errors.push(`${label}.source is not an existing repository file: ${module.source}.`);
    if (!Array.isArray(module.dependencies)) {
      errors.push(`${label}.dependencies must be an array.`);
    } else {
      for (const dependency of module.dependencies) {
        if (!idPattern.test(dependency ?? '')) errors.push(`${label}.dependencies contains an invalid module ID.`);
      }
      if (new Set(module.dependencies).size !== module.dependencies.length) errors.push(`${label}.dependencies contains duplicates.`);
    }
    if (!Array.isArray(module.contracts)) {
      errors.push(`${label}.contracts must be an array.`);
    } else {
      for (const contract of module.contracts) {
        if (!contractPattern.test(contract ?? '')) errors.push(`${label}.contracts contains an invalid contract ID.`);
      }
      if (new Set(module.contracts).size !== module.contracts.length) errors.push(`${label}.contracts contains duplicates.`);
    }
    const baseline = module.last_verified_baseline;
    if (baseline !== null && (!baseline || typeof baseline !== 'object' || Array.isArray(baseline)
      || !nonempty(baseline.ref) || !/^[0-9a-f]{64}$/.test(baseline.sha256_crlf ?? ''))) {
      errors.push(`${label}.last_verified_baseline must be null or a ref and SHA-256.`);
    }
    const semantic = module.semantic_baseline;
    if (semantic !== null) {
      const semanticPath = sourcePath(projectRoot, semantic);
      if (!semanticPath || !(await isFile(semanticPath))) errors.push(`${label}.semantic_baseline is not an existing repository file.`);
    }
    if (module.last_audit_status !== null && !nonempty(module.last_audit_status)) {
      errors.push(`${label}.last_audit_status must be null or nonempty.`);
    }
  }
  for (const [index, module] of registry.modules.entries()) {
    if (!Array.isArray(module?.dependencies)) continue;
    for (const dependency of module.dependencies) {
      if (!ids.has(dependency)) errors.push(`modules[${index}] refers to unknown dependency ${dependency}.`);
      if (dependency === module.module_id) errors.push(`modules[${index}] depends on itself.`);
    }
  }
  return { valid: errors.length === 0, errors };
}

/** Read and validate the checked-in registry before using any authority claim. */
export async function loadRegistry(path = defaultRegistryPath, options = {}) {
  const registry = JSON.parse(await readFile(path, 'utf8'));
  const result = await validateRegistry(registry, options);
  if (!result.valid) throw new Error(`Invalid module registry:\n${result.errors.join('\n')}`);
  return registry;
}

/** Return the sole module for an exact authority key. Unknown keys return null. */
export function lookupAuthority(registry, authority) {
  const matches = registry.modules.filter(module => module.authority === authority);
  if (matches.length > 1) throw new Error(`Duplicate authority: ${authority}`);
  return matches[0] ?? null;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const registry = await loadRegistry();
    process.stdout.write(`Module registry valid: ${registry.modules.length} modules.\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
