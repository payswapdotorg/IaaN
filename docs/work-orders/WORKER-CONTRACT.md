# Worker Contract

## Operating model

The tech lead/orchestrator may dispatch exactly up to three implementation workers concurrently. Each worker receives one active work order at a time unless the lead explicitly partitions a work order into non-overlapping subtrees.

## Required work-order format

Every work order defines:
- objective;
- owned directories;
- prerequisites;
- allowed dependencies;
- forbidden edits;
- required outputs;
- acceptance criteria;
- verification commands/evidence;
- handoff evidence;
- known non-goals.

The canonical output and acceptance matrix is `docs/work-orders/ACCEPTANCE-MATRIX.md`. When this file and a work-order description disagree, the tech lead must resolve the discrepancy before implementation continues.

## Branch model

Recommended branches:
- `agent/lane-a/<work-order>`
- `agent/lane-b/<work-order>`
- `agent/lane-c/<work-order>`

Workers must not push directly to `main` unless explicitly instructed by the lead. Prefer pull requests with one coherent purpose.

## Contract-first rule

When a worker discovers it needs a change to a cross-lane contract:
1. stop before changing the shared contract;
2. document the requested contract delta in the handoff;
3. identify every downstream/upstream consumer affected;
4. create/request a contract work order for the lead;
5. rebase/reconcile after the contract is released;
6. rerun all affected conformance tests.

Do not solve cross-lane incompatibility by duplicating types locally.

## Definition of complete

A work order is complete only when all required outputs exist, all acceptance criteria pass, implementation and tests are present, documentation reflects semantic changes, and reproducible verification evidence exists. "Code compiles" alone is not completion.

## Required handoff evidence

Every handoff must include:

```text
WORK ORDER: <id>
STATUS: complete | blocked | partial

Scope:
- owned directories
- files/modules changed

Implemented:
- ...

Required outputs:
- output -> location/evidence

Contracts consumed/changed:
- ...

Acceptance criteria:
- criterion -> test/evidence

Tests:
- exact command -> result

Architecture checks:
- dependency/boundary check -> result
- determinism check -> result, if applicable
- architecture-lock impact -> none | approved change

Failure/reconciliation checks:
- ...

Known limitations / non-goals:
- ...

Next recommended work order:
- ...
```

A handoff is not accepted if it omits evidence for a failed, skipped, or untestable acceptance criterion.

## Review behavior

The tech lead should review each worker result as an adversarial maintainer:
- verify the implementation against the lock, not only the worker's description;
- inspect dependency direction;
- look for duplicated business rules and types;
- verify every required output exists;
- map every acceptance criterion to reproducible evidence;
- test failure and reconciliation paths;
- check deterministic semantics;
- check whether the UI is showing operational truth;
- rerun conformance tests after merging.

## Rejection standard

Reject the work order when implementation relies on undocumented assumptions, hidden UI state, duplicated contracts, forbidden dependencies, happy-path-only tests for stateful operations, or unverifiable claims of completion. A worker must surface architectural conflicts rather than silently resolving them in code.
