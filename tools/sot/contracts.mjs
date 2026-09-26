import { readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry, validateRegistry } from './module-registry.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const defaultContractsPath = resolve(root, 'docs/governance/contracts.json');
const contractId = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*$/;
const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const fieldId = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/;
const types = new Set(['string', 'number', 'boolean', 'array', 'object']);

function text(value) { return typeof value === 'string' && value.trim() === value && value.length > 0; }
function plain(value) { return value && typeof value === 'object' && !Array.isArray(value); }
function repositoryFile(projectRoot, source) {
  if (!text(source) || isAbsolute(source) || source.includes('\\')) return null;
  const absolute = resolve(projectRoot, source);
  const within = relative(projectRoot, absolute);
  if (!within || within === '..' || within.startsWith(`..${sep}`) || isAbsolute(within)) return null;
  return absolute;
}
async function exists(path) { try { return (await stat(path)).isFile(); } catch { return false; } }

/** Validate catalogue shape, repository provenance and exact bilateral registry links. */
export async function validateContracts(catalogue, registry, { projectRoot = root } = {}) {
  const errors = [];
  if (!plain(catalogue)) return { valid: false, errors: ['Contract catalogue must be an object.'] };
  if (catalogue.schema_version !== '1.0.0') errors.push('Unsupported contract catalogue schema_version.');
  if (catalogue.status !== 'interface_metadata_only') errors.push('Contract catalogue status must be interface_metadata_only.');
  if (!Array.isArray(catalogue.contracts)) return { valid: false, errors: [...errors, 'contracts must be an array.'] };
  const registryCheck = await validateRegistry(registry, { projectRoot });
  if (!registryCheck.valid) errors.push(...registryCheck.errors.map(error => `registry: ${error}`));
  const modules = new Map((registry?.modules ?? []).map(module => [module.module_id, module]));
  const seen = new Set();
  for (const [index, contract] of catalogue.contracts.entries()) {
    const label = `contracts[${index}]`;
    if (!plain(contract)) { errors.push(`${label} must be an object.`); continue; }
    if (!contractId.test(contract.contract_id ?? '')) errors.push(`${label}.contract_id is invalid.`);
    if (seen.has(contract.contract_id)) errors.push(`${label}.contract_id duplicates ${contract.contract_id}.`);
    seen.add(contract.contract_id);
    if (!semver.test(contract.version ?? '')) errors.push(`${label}.version must be semantic major.minor.patch.`);
    for (const key of ['purpose', 'provider_module', 'consumer_module']) {
      if (!text(contract[key])) errors.push(`${label}.${key} must be nonempty.`);
    }
    for (const key of ['provider_module', 'consumer_module']) {
      if (!modules.has(contract[key])) errors.push(`${label}.${key} refers to unknown module ${contract[key]}.`);
    }
    const source = repositoryFile(projectRoot, contract.authoritative_rule);
    if (!source || !(await exists(source))) errors.push(`${label}.authoritative_rule is not an existing repository file.`);
    if (!plain(contract.fields) || Object.keys(contract.fields).length === 0) {
      errors.push(`${label}.fields must be a nonempty object.`);
    } else {
      for (const [field, definition] of Object.entries(contract.fields)) {
        if (!fieldId.test(field)) errors.push(`${label}.fields has invalid field ${field}.`);
        if (!plain(definition) || !types.has(definition.type) || typeof definition.required !== 'boolean') {
          errors.push(`${label}.fields.${field} needs a supported type and boolean required.`);
        }
      }
    }
    if (!Array.isArray(contract.invariants) || contract.invariants.length === 0
      || contract.invariants.some(invariant => !text(invariant))) {
      errors.push(`${label}.invariants must contain nonempty statements.`);
    }
  }
  for (const module of registry?.modules ?? []) {
    if (!Array.isArray(module.contracts)) continue;
    const expected = new Set(catalogue.contracts.filter(contract => contract?.provider_module === module.module_id
      || contract?.consumer_module === module.module_id).map(contract => contract.contract_id));
    const actual = new Set(module.contracts);
    for (const id of expected) if (!actual.has(id)) errors.push(`registry module ${module.module_id} misses contract ${id}.`);
    for (const id of actual) if (!expected.has(id)) errors.push(`registry module ${module.module_id} has unknown or nonparticipating contract ${id}.`);
  }
  return { valid: errors.length === 0, errors };
}

export async function loadContracts(path = defaultContractsPath, options = {}) {
  const catalogue = JSON.parse(await readFile(path, 'utf8'));
  const registry = options.registry ?? await loadRegistry();
  const result = await validateContracts(catalogue, registry, options);
  if (!result.valid) throw new Error(`Invalid contract catalogue:\n${result.errors.join('\n')}`);
  return catalogue;
}

/** Check a boundary record's required fields and primitive types; domain rules remain in authoritative files. */
export function validateContractPayload(contract, payload) {
  const errors = [];
  if (!plain(payload)) return { valid: false, errors: ['Payload must be an object.'] };
  for (const [field, definition] of Object.entries(contract.fields)) {
    const value = payload[field];
    if (value === undefined || value === null) {
      if (definition.required) errors.push(`${field} is required.`);
      continue;
    }
    const matches = definition.type === 'array' ? Array.isArray(value)
      : definition.type === 'object' ? plain(value) : typeof value === definition.type;
    if (!matches || (definition.type === 'string' && !text(value))) errors.push(`${field} must be ${definition.type}.`);
  }
  for (const field of Object.keys(payload)) if (!Object.hasOwn(contract.fields, field)) errors.push(`${field} is not declared.`);
  return { valid: errors.length === 0, errors };
}

/** Compare two versions of the same interface and enforce semantic-version bump size. */
export function compareContractVersions(before, after) {
  const breaking = [];
  const additive = [];
  const errors = [];
  if (before?.contract_id !== after?.contract_id) errors.push('Contract IDs differ.');
  const oldVersion = semver.exec(before?.version ?? '');
  const newVersion = semver.exec(after?.version ?? '');
  if (!oldVersion || !newVersion) errors.push('Both versions must be semantic major.minor.patch.');
  for (const [field, oldDefinition] of Object.entries(before?.fields ?? {})) {
    const next = after?.fields?.[field];
    if (!next) breaking.push(`removed field ${field}`);
    else {
      if (next.type !== oldDefinition.type) breaking.push(`changed type of ${field}`);
      if (!oldDefinition.required && next.required) breaking.push(`made ${field} required`);
      if (oldDefinition.required && !next.required) additive.push(`made ${field} optional`);
    }
  }
  for (const [field, definition] of Object.entries(after?.fields ?? {})) {
    if (!Object.hasOwn(before?.fields ?? {}, field)) {
      (definition.required ? breaking : additive).push(`${definition.required ? 'added required' : 'added optional'} field ${field}`);
    }
  }
  for (const key of ['provider_module', 'consumer_module', 'authoritative_rule']) {
    if (before?.[key] !== after?.[key]) breaking.push(`changed ${key}`);
  }
  if (oldVersion && newVersion) {
    const [oldMajor, oldMinor, oldPatch] = oldVersion.slice(1).map(Number);
    const [newMajor, newMinor, newPatch] = newVersion.slice(1).map(Number);
    if (breaking.length && newMajor <= oldMajor) errors.push('Breaking change requires a major version bump.');
    else if (additive.length && newMajor === oldMajor && newMinor <= oldMinor) errors.push('Additive change requires at least a minor version bump.');
    else if (!breaking.length && !additive.length && newMajor === oldMajor && newMinor === oldMinor && newPatch <= oldPatch
      && JSON.stringify(before) !== JSON.stringify(after)) errors.push('Metadata change requires at least a patch version bump.');
    else if (newMajor < oldMajor || (newMajor === oldMajor && newMinor < oldMinor)
      || (newMajor === oldMajor && newMinor === oldMinor && newPatch < oldPatch)) errors.push('Version must not decrease.');
  }
  return { compatible: breaking.length === 0, breaking, additive, validVersion: errors.length === 0, errors };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const catalogue = await loadContracts();
    process.stdout.write(`Contract catalogue valid: ${catalogue.contracts.length} interfaces.\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
