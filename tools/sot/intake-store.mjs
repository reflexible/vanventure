import { createHash, randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from './module-registry.mjs';
import { prepareIntake } from './intake.mjs';

const defaultRoot = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
const defaultRelativeStore = 'docs/governance/intake-proposals.jsonl';

function digest(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function within(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative !== '' && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

async function storeLocation(options) {
  const root = await fs.realpath(options.projectRoot ?? defaultRoot);
  const relativeStore = options.storePath ?? defaultRelativeStore;
  if (typeof relativeStore !== 'string' || path.isAbsolute(relativeStore)) {
    throw new Error('Intake store path must be project-relative.');
  }
  const location = path.resolve(root, relativeStore);
  if (!within(root, location)) throw new Error('Intake store path escapes the project root.');
  if (relativeStore.replaceAll('\\', '/') !== defaultRelativeStore) {
    throw new Error(`Intake proposals may only use ${defaultRelativeStore}.`);
  }
  const directory = path.dirname(location);
  await fs.mkdir(directory, { recursive: true });
  if (!within(root, await fs.realpath(directory))) {
    throw new Error('Intake store directory resolves outside the project root.');
  }
  try {
    if ((await fs.lstat(location)).isSymbolicLink()) {
      throw new Error('Intake store may not be a symlink.');
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return { root, location };
}

async function readRecords(location) {
  let content;
  try {
    content = await fs.readFile(location, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  if (content && !content.endsWith('\n')) throw new Error('Intake store has an incomplete final record.');
  const records = content.split('\n').filter(Boolean).map(line => JSON.parse(line));
  const seen = new Set();
  let prior = null;
  for (let index = 0; index < records.length; index++) {
    const record = records[index];
    if (record.sequence !== index + 1 || record.previous_hash !== prior ||
        record.record_hash !== digest({ sequence: record.sequence, previous_hash: record.previous_hash,
          proposal: record.proposal, work_item: record.work_item })) {
      throw new Error(`Intake store integrity check failed at record ${index + 1}.`);
    }
    if (seen.has(record.proposal?.id)) throw new Error('Intake store contains duplicate proposal IDs.');
    seen.add(record.proposal.id);
    prior = record.record_hash;
  }
  return records;
}

async function withLock(location, action, options) {
  const lock = `${location}.lock`;
  const timeoutMs = options.lockTimeoutMs ?? 5000;
  const started = Date.now();
  while (true) {
    try {
      await fs.mkdir(lock);
      break;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      if (Date.now() - started >= timeoutMs) throw new Error('Intake store is locked; no write performed.');
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  }
  try {
    return await action();
  } finally {
    await fs.rmdir(lock);
  }
}

async function verifiedWorkItem(root, id) {
  if (id === undefined) return null;
  if (typeof id !== 'string' || !/^WI-[A-Z0-9]+-\d\d-\d\d$/.test(id)) {
    throw new Error('workItemId must be an existing central work item ID.');
  }
  const centralSource = 'docs/governance/source-of-truth-and-incremental-planning.md';
  const content = await fs.readFile(path.join(root, centralSource), 'utf8');
  const itemLines = content.split(/\r?\n/).filter(line => /^\s*- \[[ x]\]/.test(line));
  if (!itemLines.some(line => new RegExp(`\\b${id}\\b`).test(line))) {
    throw new Error(`Unknown central work item: ${id}.`);
  }
  return { id, source: centralSource };
}

/**
 * Save a non-binding proposal in the one project-local intake log. The log is
 * operational evidence, never a second plan or an authoritative rule source.
 */
export async function recordIntake(input, options = {}) {
  const registry = options.registry ?? await loadRegistry();
  const prepared = prepareIntake(input, registry);
  if (!prepared.valid) return { ...prepared, recorded: false };
  const { root, location } = await storeLocation(options);
  const workItem = await verifiedWorkItem(root, options.workItemId);
  return withLock(location, async () => {
    const records = await readRecords(location);
    const duplicate = records.find(record => record.proposal.id === prepared.proposal.id);
    if (duplicate) return { ...prepared, recorded: false, duplicate: true, record: duplicate };
    const sequence = records.length + 1;
    const previous_hash = records.at(-1)?.record_hash ?? null;
    const record = {
      sequence, previous_hash, proposal: prepared.proposal, work_item: workItem,
    };
    record.record_hash = digest(record);
    const replacement = `${location}.${randomUUID()}.tmp`;
    const body = [...records, record].map(item => JSON.stringify(item)).join('\n') + '\n';
    try {
      const handle = await fs.open(replacement, 'wx');
      try {
        await handle.writeFile(body, 'utf8');
        await handle.sync();
      } finally {
        await handle.close();
      }
      await fs.rename(replacement, location);
    } finally {
      await fs.rm(replacement, { force: true });
    }
    return { ...prepared, recorded: true, duplicate: false, record };
  }, options);
}

export async function readIntakeStore(options = {}) {
  const { location } = await storeLocation(options);
  return readRecords(location);
}
