# Bound specialist rule updates - 2026-09-26

Status: LOCAL_VERIFIED_PARTIAL. Scoped implementation for WI-SOT-16-02 and
WI-SOT-16-03. No project rule was extended or superseded in this slice. The
protected Scrum Core, plan, registry and shared worker state were not changed.

## Implemented behavior

The source-update primitive supports two additional explicitly reviewed operations:

- `EXTEND_EXISTING_RULE`: replace one unique existing full-line rule at its actual
  location with the approved extension. The entire original text must remain an
  unchanged prefix. It is not appended as a second copy elsewhere in the document.
- `MARK_SUPERSEDED_RULE`: keep the exact old text under a visible
  `SUPERSEDED by <proposal>: <rule> (historical, inactive)` marker, followed by the
  exact approved active replacement. Other source bytes remain unchanged.

The new paths never silently discard the previous rule. They reject missing or
ambiguous targets, partial-line targets, Markdown restructuring, already present
replacement text and attempts to update a directly marked inactive historical
rule. Existing simple approved reference/section appends retain their behavior.

## Required persisted contract

Before user approval, the proposal must contain `rule_update` with:

- `kind`: EXTEND or SUPERSEDE;
- stable `rule_id`;
- exact `old_text` and `replacement_text` (the replacement equals proposal content);
- `semantic_review` binding rule ID, kind, source, target heading, source baseline,
  old-text SHA-256 and replacement SHA-256;
- explicit review results `complete_target: true`, `other_rules_preserved: true`,
  `gate_changes: false`, `no_duplicate: true`;
- reviewer, evidence reference, rationale and impact-derived `required_check`.

The existing proposal digest binds these fields into the imported/persisted user
decision. A separate synchronous `verifyRuleReview` adapter is mandatory at
preview, apply and recovery for these rule operations. It receives the exact
proposal ID/digest and complete bound semantic-review record. User approval does
not replace technical semantic review.

The persisted decision event history must contain a preceding classified review
of that exact rule: EXTENSION for extension, SUPERSEDES for superseding. Missing,
unknown, duplicate, conflicting or mismatched target reviews remain blocking.
This uses existing approval/review gates; it does not reinterpret the separate
proposal-lifecycle SUPERSEDE action or remove any user decision boundary.

## Check mode and preservation

FAST remains valid for a bounded local domain extension when its reviewed impact
requires FAST. Existing governance-semantic escalation for sot-architecture and
the consolidated mandate requires FULL and reports FULL CHECK REQUIRED. Apply
requires the named passed check and the required mode; a FAST result cannot pass
a required FULL gate. The ordinary impact/post-validation engine remains
responsible for all other defined escalation criteria. No new project escalation
rule was added.

All changed bytes are reconstructed from the persisted approved proposal at
apply time. Mutable plan edits cannot substitute another old rule, replacement,
operation or check mode. The existing physical-path/core protection, exclusive
journal, exact rollback and authenticated crash recovery cover both new paths.

## Reproducible evidence

`node --test tools/sot/sot-update-plan.test.mjs`: **31 passed, 0 failed**.

`node --test tools/sot/sot-update-plan.test.mjs tools/sot/governance-workflow.test.mjs`:
**48 passed, 0 failed** at the tested source state (workflow tests include concurrent
controller additions).

New cases verify:

- in-place extension with one original rule occurrence and exact unrelated bytes;
- visible inactive historical rule and exact active replacement;
- plan mutation and missing authenticated semantic review blocked before writing;
- governance FULL requirement cannot be bypassed with a FAST PASS;
- failed semantic check restores exact pre-superseding bytes;
- actual process exit followed by authenticated superseding recovery;
- gate changes, removed extension prefix and partial targets rejected;
- persisted target conflict review required even when user approval exists;
- non-escalated domain extension can pass FAST.

## Precise acceptance and remaining work

The two guarded local source transformations and their rollback paths are
implemented and tested. This is a technical component result, not acceptance of
any new or superseded real project rule. The higher-level governance workflow
still needs explicit wiring of `verifyRuleReview` and the new operation types
before using them for an actual proposal; this slice did not change that file.
Registry/dependency/traceability lifecycle updates and historical inventory
classification remain separate work.

The semantic reviewer remains responsible for actual rule identity, absence of
semantic duplicates across sources, preserved approval gates and the substantive
correctness of a replacement. The code validates exact binding and structural
preservation; it does not establish prose equivalence. Gate-changing proposals,
ambiguous rules and unresolved contradictions require their existing dedicated
decision/review path and are blocked here. No automatic normative project choice
was made. Existing crash-recovery trust and filesystem-race limitations continue
to apply.
