# Analytics inactive profile integration — 2026-09-26

## Scope and result

Local preparation for the explicit analytics development deferral. The maintained
`analytics-inactive-contract` profile now runs the fixed analytics gate test suite
and the actual repository gate for both `defer` and `activate`. The profile reports
`DEFERRED_INACTIVE`, `runtime_verified: false`, `activation_allowed: false`.
`LOCAL_PROFILE_PASS` refers only to these bounded checks. Analytics runtime and
tracking operation remain unverified; activation is blocked. No analytics runtime,
event, product source or protected Scrum Core was changed in this slice.

The synchronous host API is preserved. Both subprocesses use the environment
allowlist, `shell: false`, hidden windows, fixed commands and bounded output/time.
The actual gate loads the pinned contract and authoritative project sources. Both
actions must return identical evidence hashes, the deferral must have no errors,
and activation must fail solely with the specified missing runtime boundary error.
Missing/corrupt input or a failed suite blocks the profile.

## Evidence matrix

| Check | Result | Boundary |
| --- | --- | --- |
| Maintained analytics selection and fixed test command | PASS | No runtime or release certification |
| Real repository defer/activate checks | PASS | Deferred inactive; activation denied |
| Passing synthetic suite with absent actual contract | PASS | Actual gate still blocks |
| FAST maintained analytics integration | PASS | Returns inactive contract evidence |
| Release/unknown profile and caller command override | PASS | Missing coverage still blocks |
| Sanitized environment and no shell | PASS | Existing profile safeguards retained |

Reproduce: `node --test tools/sot/project-check-profiles.test.mjs tools/sot/fast-check.test.mjs`.
Result: **13/13 tests pass**; the analytics profile also executes its **4/4 gate
regressions**. Targeted `git diff --check` passes.

## Remaining work and status ownership

No activation path or runtime verifier has been added. Analytics development is
explicitly deferred by the user. Profile execution trusts maintained repository
code; it is not a hostile-filesystem sandbox. The separate project audit adapter
owns implementation hash binding. Parent owns shared execution-plan updates,
review and commit; this report does not create a parallel plan or declare an
additional work item Done. No live rollout is claimed or required for this check
adapter preparation.

## Follow-up: maintained pipeline through worker integration

The workflow regression now runs a complete isolated disk-backed update with
persisted synthetic user approval, scope/conflict evidence, original bytes and
recovery. The registry binds a synthetic owner rule to `consolidated-mandate`;
unchanged copies of the real mandate documents and the real maintained
`deploy/gesamtauftrag-consistency.test.mjs` execute separately. Explicit typed
source and dependency validators bind the actual synthetic owner change and
reconstructed graph to the FULL check. This setup tests the orchestration without
claiming a semantic review of the real mandate or changing a project rule.

The resulting successful project aggregate is hash-bound into the workflow result
and reopened by the actual host-pinned worker store before Integration -> Done.
Two independent negative runs modify either the persisted aggregate or the real
executed profile test source after validation; both reject integration and leave
the worker at Integration. No test injects a fabricated profile PASS.

The post-validation regression formerly asserting absent analytics coverage now
uses an isolated release-governance module. Its concrete missing release checker
still blocks despite a caller-supplied successful command.

Combined reproduction:
`node --test tools/sot/governance-workflow.test.mjs tools/sot/post-validation.test.mjs tools/sot/project-check-profiles.test.mjs tools/sot/fast-check.test.mjs`

Result: **46/46 PASS**, including all original workflow/recovery regressions and
the maintained pipeline integration. No workflow runtime code or shared status
file was changed by this follow-up; parent owns the separately implemented
aggregate/runtime pins. Tests certify local orchestration only, not production.
