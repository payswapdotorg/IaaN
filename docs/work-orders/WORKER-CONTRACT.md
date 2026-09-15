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
- acceptance criteria;
- verification commands;
- handoff evidence.

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
3. create/request a contract work order for the lead;
4. rebase/reconcile after the contract is released.

Do not solve cross-lane incompatibility by duplicating types locally.

## Definition of complete

A work order is complete only when implementation, tests, docs where semantics changed, and verification evidence all exist. "Code compiles" alone is not completion.

## Handoff template

```text
WORK ORDER: <id>
STATUS: complete | blocked | partial

Implemented:
- ...

Contracts consumed/changed:
- ...

Tests:
- command -> result

Architecture checks:
- boundaries checked
- deterministic behavior checked
- no locked decisions changed

Known limitations:
- ...

Next recommended work order:
- ...
```

## Review behavior

The tech lead should review each worker result as an adversarial maintainer:
- verify the implementation against the lock, not only the worker's description;
- inspect dependency direction;
- look for duplicated business rules;
- test failure and reconciliation paths;
- check deterministic semantics;
- check whether the UI is showing operational truth;
- rerun conformance tests after merging.
