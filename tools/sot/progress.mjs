import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const defaultPlan = resolve(root, 'docs/governance/source-of-truth-and-incremental-planning.md');
const idPattern = /WI-SOT-\d{2}-\d{2}/;
const donePattern = /^- \[x\] ~~(WI-SOT-\d{2}-\d{2}) · .+~~$/;
const openPattern = /^- \[ \] (TODO|READY|IN_PROGRESS|BLOCKED) – (WI-SOT-\d{2}-\d{2}) · .+$/;
const counterPattern = /\*\*Counter:\*\* Total (\d+) · Done (\d+) · In Progress (\d+) · Ready (\d+) · Blocked (\d+) ·\s*\n?Open (\d+) .*? · Progress ([\d,.]+) %/;

export function countWorkItems(markdown) {
  const counts = { total: 0, done: 0, inProgress: 0, ready: 0, blocked: 0, open: 0, progress: 0 };
  const ids = new Set();
  for (const line of markdown.split(/\r?\n/)) {
    if (!line.startsWith('- [') || !idPattern.test(line)) continue;
    const done = donePattern.exec(line);
    const active = openPattern.exec(line);
    if (!done && !active) throw new Error(`Malformed Work Item status: ${line}`);
    const id = done?.[1] ?? active[2];
    if (ids.has(id)) throw new Error(`Duplicate Work Item ID: ${id}`);
    ids.add(id);
    counts.total++;
    if (done) counts.done++;
    else if (active[1] === 'IN_PROGRESS') counts.inProgress++;
    else if (active[1] === 'READY') counts.ready++;
    else if (active[1] === 'BLOCKED') counts.blocked++;
  }
  if (counts.total === 0) throw new Error('No Work Items found.');
  counts.open = counts.total - counts.done;
  counts.progress = Math.round((counts.done / counts.total) * 1000) / 10;
  return counts;
}

export function checkDisplayedCounter(markdown, counts = countWorkItems(markdown)) {
  const match = counterPattern.exec(markdown);
  if (!match) throw new Error('Displayed Counter missing or malformed.');
  const displayed = match.slice(1, 7).map(Number);
  const actual = [counts.total, counts.done, counts.inProgress, counts.ready, counts.blocked, counts.open];
  const displayedProgress = Number(match[7].replace(',', '.'));
  if (displayed.some((value, index) => value !== actual[index]) || displayedProgress !== counts.progress) {
    throw new Error(`Displayed Counter stale: ${displayed.join('/')} ${displayedProgress}% versus ${actual.join('/')} ${counts.progress}%.`);
  }
  return true;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const path = process.argv.find(arg => arg.endsWith('.md')) ?? defaultPlan;
    const markdown = await readFile(path, 'utf8');
    const counts = countWorkItems(markdown);
    if (process.argv.includes('--check')) checkDisplayedCounter(markdown, counts);
    process.stdout.write(`${process.argv.includes('--check') ? 'PASS ' : ''}${JSON.stringify(counts)}\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
