import { createHash, randomUUID } from 'node:crypto';
import { open, readFile, rename, unlink, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { assessConflict } from './conflict-check.mjs';
import { advanceApproval } from './approval-flow.mjs';
import { decisionProposalHash } from './user-decision-evidence.mjs';

const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const text = value => typeof value === 'string' && value.trim().length > 0;

function replay(body) {
  const events = body.trim() ? body.trim().split('\n').map(line => JSON.parse(line)) : [];
  const proposals = new Map();
  let previousHash = null;
  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    const { event_hash, ...unsigned } = event;
    if (event.revision !== index + 1 || event.previous_hash !== previousHash || event_hash !== hash(unsigned)) {
      throw new Error(`Decision-state hash chain or revision is invalid at event ${index + 1}.`);
    }
    if (event.type === 'PROPOSAL') {
      if (proposals.has(event.proposal_id) || event.proposal?.id !== event.proposal_id
        || event.impact?.proposal_id !== event.proposal_id) throw new Error('Invalid proposal event.');
      proposals.set(event.proposal_id, { proposal: event.proposal, impact: event.impact, reviews: [], conflict: null });
    } else if (event.type === 'REVIEW') {
      const state = proposals.get(event.proposal_id);
      if (!state || event.conflict?.proposal_id !== event.proposal_id) throw new Error('Orphan review event.');
      state.reviews = event.reviews;
      state.conflict = event.conflict;
    } else if (event.type === 'DECISION') {
      const state = proposals.get(event.proposal_id);
      if (!state || event.transition?.proposal_id !== event.proposal_id
        || event.transition.prior_status !== state.proposal.status) throw new Error('Orphan or stale decision event.');
      state.proposal = event.transition.proposal;
    } else throw new Error('Unknown decision-state event.');
    previousHash = event_hash;
  }
  return { revision: events.length, previous_hash: previousHash, events, proposals };
}

function requireConcreteReview(proposalId, review) {
  if (!text(review?.candidate_id) || !text(review?.evidence_ref)
    || !/^[^\s#]+#[^\s#]+$/.test(review.evidence_ref)
    || review.evidence_scope?.proposal_id !== proposalId
    || review.evidence_scope?.candidate_id !== review.candidate_id) {
    throw new Error('Review evidence needs a concrete source anchor and exact proposal/candidate scope.');
  }
}

/** Durable, local single-host event store. The caller must authenticate user decisions. */
export function createDecisionStore(path, { verifyUserDecision } = {}) {
  if (!text(path)) throw new Error('A state file path is required.');
  async function read() {
    let body;
    try { body = await readFile(path, 'utf8'); }
    catch (error) { if (error.code === 'ENOENT') body = ''; else throw error; }
    return replay(body);
  }
  async function transact({ expectedRevision, idempotencyKey, request }, build) {
    if (!Number.isInteger(expectedRevision) || expectedRevision < 0 || !text(idempotencyKey)) {
      throw new Error('Expected revision and idempotency key are required.');
    }
    await mkdir(dirname(path), { recursive: true });
    const lockPath = `${path}.lock`;
    let lock;
    for (let attempt = 0; attempt < 100; attempt++) {
      try { lock = await open(lockPath, 'wx'); break; }
      catch (error) { if (error.code !== 'EEXIST') throw error; await pause(20); }
    }
    if (!lock) throw new Error('Decision-state writer lock timed out; inspect the lock before retrying.');
    let tempPath;
    try {
      const state = await read();
      const requestHash = hash(request);
      const existing = state.events.find(event => event.idempotency_key === idempotencyKey);
      if (existing) {
        if (existing.request_hash !== requestHash) throw new Error('Idempotency key reused for a different request.');
        return structuredClone(existing);
      }
      if (state.revision !== expectedRevision) throw new Error(`Stale decision-state revision: expected ${expectedRevision}, actual ${state.revision}.`);
      const payload = build(state);
      const unsigned = { schema_version: '1.0.0', revision: state.revision + 1,
        previous_hash: state.previous_hash, idempotency_key: idempotencyKey,
        request_hash: requestHash, ...payload };
      const event = { ...unsigned, event_hash: hash(unsigned) };
      const serialized = [...state.events, event].map(item => JSON.stringify(item)).join('\n') + '\n';
      tempPath = `${path}.${randomUUID()}.tmp`;
      const temp = await open(tempPath, 'wx');
      try { await temp.writeFile(serialized, 'utf8'); await temp.sync(); } finally { await temp.close(); }
      await rename(tempPath, path);
      tempPath = null;
      return structuredClone(event);
    } finally {
      if (tempPath) await unlink(tempPath).catch(() => {});
      await lock.close();
      await unlink(lockPath);
    }
  }
  return {
    read,
    register({ proposal, impact, expectedRevision, idempotencyKey }) {
      const request = { type: 'PROPOSAL', proposal, impact };
      return transact({ expectedRevision, idempotencyKey, request }, state => {
        if (!text(proposal?.id) || proposal.status !== 'PROPOSED'
          || proposal.integration !== 'NOT_STARTED' || proposal.conflict_check !== 'PENDING'
          || impact?.proposal_id !== proposal.id || state.proposals.has(proposal.id)) {
          throw new Error('A new pending proposal with matching impact is required.');
        }
        assessConflict({ proposal, impact });
        return { type: 'PROPOSAL', proposal_id: proposal.id, proposal: structuredClone(proposal), impact: structuredClone(impact) };
      });
    },
    recordReview({ proposalId, reviews, expectedRevision, idempotencyKey }) {
      const request = { type: 'REVIEW', proposalId, reviews };
      return transact({ expectedRevision, idempotencyKey, request }, state => {
        const current = state.proposals.get(proposalId);
        if (!current || current.proposal.status !== 'PROPOSED') throw new Error('Pending proposal not found.');
        if (!Array.isArray(reviews)) throw new Error('Reviews must be an array.');
        reviews.forEach(review => requireConcreteReview(proposalId, review));
        const conflict = assessConflict({ proposal: current.proposal, impact: current.impact, reviews });
        return { type: 'REVIEW', proposal_id: proposalId, reviews: structuredClone(reviews), conflict };
      });
    },
    async decide({ proposalId, action, actor, evidence, decision = null, replacement = null,
      expectedRevision, idempotencyKey }) {
      const request = { type: 'DECISION', proposalId, action, actor, evidence, decision, replacement };
      return transact({ expectedRevision, idempotencyKey, request }, state => {
        const current = state.proposals.get(proposalId);
        if (!current) throw new Error('Proposal not found.');
        if (typeof verifyUserDecision !== 'function'
          || verifyUserDecision({ proposalId, proposal_sha256: decisionProposalHash(current.proposal), action, actor, evidence, decision }) !== true) {
          throw new Error('User decision must be authenticated by the caller; an evidence string alone is insufficient.');
        }
        if (evidence?.scope?.split(/[,;\s]+/).includes(proposalId) !== true
          || !/^[^\s#]+#[^\s#]+$/.test(evidence?.reference ?? '')) {
          throw new Error('Decision evidence needs an exact proposal scope and concrete source anchor.');
        }
        const transition = advanceApproval({ proposal: current.proposal, action, actor, evidence,
          conflict: current.conflict, decision, replacement });
        return { type: 'DECISION', proposal_id: proposalId, action, transition };
      });
    },
  };
}
