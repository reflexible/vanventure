import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const workItemPattern = /^WI-SOT-\d{2}-\d{2}$/;
const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Validate the single Work-Item identity carried by a pending commit title. */
export function validateCommitIdentity({ workItemId, message }) {
  const errors = [];
  if (!workItemPattern.test(workItemId ?? '')) errors.push('VALID_WORK_ITEM_ID_REQUIRED');
  if (!text(message)) errors.push('COMMIT_MESSAGE_REQUIRED');
  const title = text(message) ? message.split(/\r?\n/, 1)[0] : '';
  if (workItemPattern.test(workItemId ?? '') && title && !(new RegExp(`^${escape(workItemId)}(?:\\s|:|$)`).test(title))) {
    errors.push('COMMIT_WORK_ITEM_ID_MISMATCH');
  }
  return { status: errors.length ? 'BLOCKED' : 'PASS', work_item_id: workItemId ?? null, title, errors };
}

function argument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] ?? null;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = validateCommitIdentity({ workItemId: argument('--work-item'), message: argument('--message') });
  process.stdout.write(`Git commit identity: ${result.status}${result.title ? `; ${result.title}` : ''}.\n`);
  if (result.status !== 'PASS') { process.stderr.write(`${result.errors.join('; ')}\n`); process.exitCode = 1; }
}
