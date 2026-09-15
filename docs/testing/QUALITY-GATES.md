# Quality Gates

## Global gates

Every milestone must pass:

1. Typecheck with strict settings.
2. Lint.
3. Unit tests.
4. Contract/conformance tests.
5. Integration tests for all touched runtime boundaries.
6. Security/static checks appropriate to the stack.
7. Determinism tests where ordering, IDs, consensus, allocation, or settlement are involved.
8. Failure-path tests for retries, timeouts, provider loss, duplicate requests, and partial completion.
9. Architecture boundary checks (imports/dependency graph).
10. E2E tests for at least one representative user flow per supported role introduced by the milestone.

## Domain correctness

A capability is not available merely because a provider claims it; availability must respect published constraints, reservations, commitments, and current operational state.

A commitment is not complete merely because an adapter returned success; required evidence and verification rules must be satisfied.

A settlement result is not asserted by UI text; it must be reflected by authoritative application/protocol state.

## Determinism gates

Test that the same logical inputs produce the same:
- canonical transaction ID;
- ordering;
- finality certificate;
- allocation decision where deterministic policy is required;
- state transition/write set under the same version/rules.

Use conflicting insertion orders and repeated executions to catch accidental dependence on object/map iteration.

## Replaceability gates

Before marking protocol runtime and adapters complete:
- exercise two independent implementations against the same public contract where the lock requires independence;
- swap persistence implementation using the same port;
- replace at least one infrastructure adapter with a fake/reference adapter;
- ensure orchestration code does not depend on concrete implementations.

## Reconciliation gates

Explicitly test:
- physical success + protocol success;
- physical failure + protocol untouched;
- physical success + protocol rejection;
- retry after uncertain physical result;
- duplicate evidence;
- duplicate settlement attempt.

The last four must produce explicit state, never silent loss or contradictory success.

## UX operational-truth simulation

At each end-to-end milestone simulate:

### Compute consumer
Intent: "I need 10,000 GPU hours next week." Verify requirement translation, provider comparison, reservation, commitment, execution, evidence, verification, economics, exception handling.

### Infrastructure provider
Intent: "Offer 32 GPUs." Verify capability publication, capacity accounting, commitments, utilization, verification, earnings, maintenance.

### Shared vehicle collective
Intent: "Join a shared 100-car pool." Verify capital/economic rights, usage rights, scheduling, maintenance, contributions, exceptions.

### Distributed factory operator
Intent: "Deliver 10,000 units." Verify decomposition into capabilities, multi-provider allocation, execution, verification, failover, logistics, maintenance, settlement.

### Validator / verifier
Verify they can inspect pending work, validate evidence/proposals, see provenance, and understand disagreements without access to hidden UI-only state.

## Definition of done

A milestone is done only when:
- the implementation satisfies the architecture lock;
- its tests prove positive and negative paths;
- operational state is observable through the intended UX/API surfaces;
- cross-lane dependencies are documented;
- no known architecture debt is silently introduced;
- the tech lead records a verification summary.
