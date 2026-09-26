import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from './module-registry.mjs';
import { loadContracts } from './contracts.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const defaultGraphPath = resolve(root, 'docs/governance/dependency-graph.json');
const nodeTypes = new Set(['module', 'contract', 'story', 'work_item', 'requirement', 'adr', 'test', 'worker', 'process', 'sot_source']);
const edgeRelations = new Set(['depends_on', 'provides', 'consumes', 'belongs_to', 'affects', 'claims', 'traces_to']);
const strengths = new Set(['hard', 'soft', 'reference']);
const id = (type, value) => `${type}:${value}`;
const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;

/** Expand documented ST-SOT-05–10 and WI-SOT-03-01–06/08–10 shorthand. */
function workReferences(cell) {
  const refs = new Set();
  const pattern = /\b(ST-SOT-\d{2}|WI-SOT-\d{2}-\d{2})(?:[–-](\d{2}))?(?:\/(\d{2})(?:[–-](\d{2}))?)?/g;
  for (const match of cell.matchAll(pattern)) {
    const base = match[1];
    refs.add(base);
    const prefix = base.slice(0, -2);
    const start = Number(base.slice(-2));
    const ranges = [];
    if (match[2]) ranges.push([start, Number(match[2])]);
    if (match[3]) ranges.push([Number(match[3]), Number(match[4] ?? match[3])]);
    for (const [first, last] of ranges) {
      if (last < first || last - first > 99) throw new Error(`Invalid reference range: ${match[0]}`);
      for (let n = first; n <= last; n++) refs.add(`${prefix}${String(n).padStart(2, '0')}`);
    }
  }
  return [...refs];
}

function parseWorkItems(markdown) {
  const stories = new Map();
  const workItems = new Map();
  for (const line of markdown.split(/\r?\n/)) {
    const cells = line.split('|').map(part => part.trim());
    if (cells.length >= 5 && /^ST-SOT-\d{2}$/.test(cells[1])) {
      stories.set(cells[1], { dependencies: workReferences(cells[3]) });
    }
  }
  let story = null;
  for (const line of markdown.split(/\r?\n/)) {
    const heading = /^#### (ST-SOT-\d{2})\b/.exec(line);
    if (heading) { story = heading[1]; continue; }
    const match = /^\s*- \[[ x]\] (?:~~)?(?:TODO|READY|IN_PROGRESS|BLOCKED|DONE)?\s*[–-]?\s*(WI-SOT-\d{2}-\d{2})\b/.exec(line);
    if (match) {
      if (!story || workItems.has(match[1])) throw new Error(`Work item ${match[1]} lacks a unique owning story.`);
      workItems.set(match[1], story);
    }
  }
  return { stories, workItems };
}

/** Build only a derived index. Rules and status remain in their source documents. */
export function buildDependencyGraph({ registry, contracts, epicText, supplement = {}, runtime = {} }) {
  const nodes = [];
  const edges = [];
  const addNode = (nodeId, type, source) => nodes.push({ id: nodeId, type, source });
  const addEdge = (from, to, relation, strength = 'reference') => edges.push({ from, to, relation, strength });
  for (const module of registry.modules) addNode(id('module', module.module_id), 'module', module.source);
  for (const module of registry.modules) {
    for (const dependency of module.dependencies) addEdge(id('module', dependency), id('module', module.module_id), 'depends_on', 'hard');
  }
  for (const contract of contracts.contracts) {
    const contractId = id('contract', contract.contract_id);
    addNode(contractId, 'contract', contract.authoritative_rule);
    addEdge(id('module', contract.provider_module), contractId, 'provides');
    addEdge(contractId, id('module', contract.consumer_module), 'consumes');
  }
  const { stories, workItems } = parseWorkItems(epicText);
  const epicSource = 'docs/governance/source-of-truth-and-incremental-planning.md';
  for (const [story, info] of stories) {
    addNode(id('story', story), 'story', epicSource);
    addEdge(id('module', 'sot-architecture'), id('story', story), 'belongs_to');
    for (const dependency of info.dependencies) {
      addEdge(id(dependency.startsWith('WI-') ? 'work_item' : 'story', dependency), id('story', story), 'depends_on', 'hard');
    }
  }
  for (const [item, story] of workItems) {
    addNode(id('work_item', item), 'work_item', epicSource);
    addEdge(id('story', story), id('work_item', item), 'belongs_to');
  }
  for (const node of supplement.nodes ?? []) {
    if (!new Set(['requirement', 'adr', 'test', 'process', 'sot_source']).has(node.type)) {
      throw new Error(`Supplement cannot redefine derived or runtime node ${node.id}.`);
    }
    nodes.push(node);
  }
  for (const edge of supplement.edges ?? []) edges.push(edge);
  for (const worker of runtime.workers ?? []) {
    addNode(id('worker', worker.id), 'worker', 'runtime');
    for (const item of worker.claims ?? []) addEdge(id('work_item', item), id('worker', worker.id), 'claims');
  }
  return { schema_version: '1.0.0', nodes, edges };
}

/** Check references, edge typing and cycles in actual dependency edges. */
export function validateDependencyGraph(graph) {
  const errors = [];
  if (graph?.schema_version !== '1.0.0' || !Array.isArray(graph?.nodes) || !Array.isArray(graph?.edges)) {
    return { valid: false, errors: ['Graph needs schema_version 1.0.0, nodes and edges arrays.'], cycles: [] };
  }
  const ids = new Set();
  for (const [index, node] of graph.nodes.entries()) {
    if (!text(node?.id) || !nodeTypes.has(node?.type) || !node.id.startsWith(`${node.type}:`)) errors.push(`nodes[${index}] has invalid ID or type.`);
    if (ids.has(node?.id)) errors.push(`Duplicate node ${node?.id}.`);
    ids.add(node?.id);
  }
  const adjacency = new Map([...ids].map(value => [value, []]));
  for (const [index, edge] of graph.edges.entries()) {
    if (!ids.has(edge?.from) || !ids.has(edge?.to)) errors.push(`edges[${index}] refers to an unknown node.`);
    if (!edgeRelations.has(edge?.relation) || !strengths.has(edge?.strength)) errors.push(`edges[${index}] has invalid relation or strength.`);
    if (edge?.from === edge?.to) errors.push(`edges[${index}] is a self-link.`);
    if (edge?.relation === 'depends_on' && ids.has(edge.from) && ids.has(edge.to)) adjacency.get(edge.from).push(edge.to);
  }
  const color = new Map();
  const stack = [];
  const cycles = [];
  function visit(node) {
    color.set(node, 1); stack.push(node);
    for (const next of adjacency.get(node) ?? []) {
      if (!color.has(next)) visit(next);
      else if (color.get(next) === 1) cycles.push([...stack.slice(stack.indexOf(next)), next]);
    }
    stack.pop(); color.set(node, 2);
  }
  for (const node of ids) if (!color.has(node)) visit(node);
  if (cycles.length) errors.push(`${cycles.length} dependency cycle(s) detected.`);
  return { valid: errors.length === 0, errors, cycles };
}

/** Downstream change impact; direct and transitive results exclude the seed. */
export function computeImpact(graph, sourceId, { includeSoft = true } = {}) {
  const ids = new Set(graph.nodes.map(node => node.id));
  if (!ids.has(sourceId)) throw new Error(`Unknown source node ${sourceId}.`);
  const relevant = graph.edges.filter(edge => includeSoft || edge.strength !== 'soft');
  const outgoing = new Map([...ids].map(value => [value, []]));
  for (const edge of relevant) outgoing.get(edge.from)?.push(edge.to);
  const direct = [...new Set(outgoing.get(sourceId))].filter(value => value !== sourceId).sort();
  const visited = new Set([sourceId]);
  const queue = [...direct];
  while (queue.length) {
    const next = queue.shift();
    if (visited.has(next)) continue;
    visited.add(next);
    queue.push(...(outgoing.get(next) ?? []));
  }
  visited.delete(sourceId);
  const transitive = [...visited].sort();
  const byType = {};
  for (const node of graph.nodes) if (visited.has(node.id)) (byType[node.type] ??= []).push(node.id);
  return { source: sourceId, direct, transitive, byType };
}

export async function loadDependencyGraph({ graphPath = defaultGraphPath, registry, contracts, epicText, runtime } = {}) {
  const supplement = JSON.parse(await readFile(graphPath, 'utf8'));
  if (supplement.schema_version !== '1.0.0' || supplement.status !== 'derived_index_only') throw new Error('Invalid graph supplement metadata.');
  const currentRegistry = registry ?? await loadRegistry();
  const currentContracts = contracts ?? await loadContracts(undefined, { registry: currentRegistry });
  const currentEpic = epicText ?? await readFile(resolve(root, supplement.sources.work_items), 'utf8');
  const graph = buildDependencyGraph({ registry: currentRegistry, contracts: currentContracts, epicText: currentEpic, supplement, runtime });
  const result = validateDependencyGraph(graph);
  if (!result.valid) throw new Error(`Invalid dependency graph:\n${result.errors.join('\n')}`);
  return graph;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const graph = await loadDependencyGraph();
    process.stdout.write(`Dependency graph valid: ${graph.nodes.length} nodes, ${graph.edges.length} edges.\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
