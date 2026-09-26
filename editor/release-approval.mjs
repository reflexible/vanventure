const slug = /^[a-z0-9-]+$/;

function validRef(value) { return typeof value === 'string' && value.trim() === value && value.length > 0 && value.length <= 200; }

/**
 * Release approvals are deployment configuration, never data supplied by the
 * browser.  An empty configuration deliberately leaves publishing fail-closed.
 */
export function loadReleaseApprovals(raw = process.env.EDITOR_RELEASE_APPROVALS) {
  if (!raw) return [];
  let parsed;
  try { parsed = JSON.parse(raw); } catch { throw new Error('EDITOR_RELEASE_APPROVALS_INVALID'); }
  if (!Array.isArray(parsed)) throw new Error('EDITOR_RELEASE_APPROVALS_INVALID');
  const seen = new Set();
  return parsed.map(entry => {
    if (!entry || typeof entry !== 'object' || !validRef(entry.scope_ref) || !validRef(entry.approval_ref)
      || !Array.isArray(entry.content_ids) || entry.content_ids.length === 0
      || !entry.content_ids.every(value => typeof value === 'string' && slug.test(value))
      || !Array.isArray(entry.revisions) || entry.revisions.length === 0
      || !entry.revisions.every(value => Number.isInteger(value) && value >= 0)
      || entry.gates?.content !== true || entry.gates?.privacy !== true || entry.gates?.images !== true) {
      throw new Error('EDITOR_RELEASE_APPROVALS_INVALID');
    }
    const key = `${entry.scope_ref}\u0000${entry.approval_ref}`;
    if (seen.has(key)) throw new Error('EDITOR_RELEASE_APPROVALS_INVALID');
    seen.add(key);
    return { scope_ref: entry.scope_ref, approval_ref: entry.approval_ref,
      content_ids: [...entry.content_ids], revisions: [...entry.revisions], gates: { content: true, privacy: true, images: true } };
  });
}

export function releaseScopesFor(approvals, contentId, revision) {
  return approvals.filter(entry => entry.content_ids.includes(contentId) && entry.revisions.includes(revision))
    .map(({ scope_ref, approval_ref }) => ({ scope_ref, approval_ref }));
}

export function releaseApprovalFor(approvals, contentId, revision, scopeRef) {
  return approvals.find(entry => entry.scope_ref === scopeRef && entry.content_ids.includes(contentId)
    && entry.revisions.includes(revision)) || null;
}
