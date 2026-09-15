# Worker Outputs and Acceptance Matrix

This document is the executable handoff contract for implementation workers. A work order is accepted only when its outputs exist, its acceptance criteria are demonstrated, and the handoff evidence is attached to the pull request or work-order report.

## Universal output contract

Every worker work order must produce all of the following unless the work order explicitly marks an item as not applicable:

1. **Implementation** — production code in owned directories only.
2. **Tests** — unit, contract/conformance, integration, and failure-path tests appropriate to the scope.
3. **Public contracts** — exported types/interfaces/schemas required by downstream work, with no duplicate domain vocabulary.
4. **Documentation** — update the nearest authoritative architecture/work-order document when semantics, invariants, or dependency direction changed.
5. **Observability surface** — logs/events/read models or diagnostic output sufficient to explain important state transitions and failures.
6. **Verification evidence** — exact commands run, exact result, changed-file summary, architecture-boundary result, and known limitations.

## Rejection conditions that apply to every worker

A lead must reject the work order when any of these is true:

- acceptance behavior is implemented only by mocks while the work order requires real runtime behavior;
- business/domain types are duplicated instead of consumed from the contract package;
- a locked architecture decision is changed without an approved architecture-change work order;
- a forbidden dependency is introduced;
- tests prove only happy paths for a stateful/retryable operation;
- authoritative state exists only in process memory or UI state where durable/application state is required;
- a worker reports completion without reproducible verification evidence;
- known limitations materially contradict the acceptance criteria and are not explicitly converted into follow-up work.

## WO-00 — Foundation

**Owner:** Tech lead

### Required outputs

- installable pnpm monorepo;
- strict TypeScript baseline;
- package/app directory skeleton matching the dependency graph;
- lint, typecheck, test, architecture-boundary scripts;
- CI workflow invoking the same gates as local verification;
- test harness and fixture conventions;
- baseline contribution/development guidance.

### Acceptance criteria

- clean checkout installs successfully from the documented commands;
- strict typecheck passes with zero errors;
- lint passes with zero errors/warnings that fail CI;
- test runner executes a non-empty baseline suite successfully;
- architecture-boundary checker fails on an intentionally forbidden import and passes when it is removed;
- CI and local verification use equivalent gate commands.

### Handoff evidence

Record install, typecheck, lint, test, boundary-check, and CI results plus the exact package graph created.

---

# Lane A — Core / Domain

## WO-A1 — Core Contracts and Domain Primitives

### Required outputs

- canonical domain contracts for actor, network, capability, capacity, requirement, discovery result, reservation, commitment, allocation, assignment, execution result, evidence, verification, contribution, reward, settlement, rights, and exception;
- versioning and lifecycle/status rules;
- deterministic identifiers/canonicalization rules where required;
- serialization/conformance fixtures;
- invariant tests and invalid-transition tests;
- public package exports consumed by downstream lanes.

### Acceptance criteria

- every north-star lifecycle stage has exactly one authoritative contract location;
- lifecycle transitions reject illegal transitions and preserve terminal-state semantics;
- serialization is deterministic where required and stable across insertion order;
- IDs are collision-safe under the documented identity inputs;
- contracts distinguish economic ownership rights from usage rights;
- exceptions are explicit domain/application states, not ad-hoc error strings;
- downstream consumers can import contracts without importing implementation packages;
- no infrastructure/provider/consensus/vendor-specific type appears in the kernel contract layer.

### Required proof scenarios

1. Compute capability + GPU requirement.
2. Shared vehicle economic right + usage reservation.
3. Distributed manufacturing commitment + exception.

### Handoff evidence

Contract inventory, invariant matrix, serialization/ID test output, forbidden dependency scan, and example fixtures.

## WO-A2 — Intent and Workflow Orchestration

### Required outputs

- intent intake model;
- intent -> capability requirement translation;
- capability discovery orchestration;
- reservation -> commitment -> allocation/assignment workflow;
- application policy hooks and role-aware action authorization;
- idempotency/retry behavior;
- orchestration test suite.

### Acceptance criteria

- user intent does not directly mutate authoritative runtime state without passing the defined workflow boundary;
- the same intent command with the same idempotency key does not create duplicate commitments;
- provider selection can consider capability constraints without embedding provider-specific APIs;
- reservations prevent over-allocation according to declared rules;
- commitment creation records the constraints/terms needed for later verification;
- failed downstream operations yield explicit recoverable/final states;
- orchestration imports contracts/ports, never concrete database/vendor/runtime implementations.

### Required proof scenarios

- consumer requests 10,000 GPU hours;
- provider offers 32 GPUs;
- factory order decomposes into multiple capability requirements.

### Handoff evidence

State-machine tests, idempotency/retry tests, dependency graph output, and end-to-end orchestration traces.

## WO-A3 — Economic / Rights Policies

### Required outputs

- policy interfaces for economic ownership and usage rights;
- contribution/reward policy interfaces;
- settlement intents;
- collective membership/funding policy composition;
- policy tests independent of payment/vendor implementations.

### Acceptance criteria

- economic ownership and usage authorization are independently representable;
- collective membership changes do not silently mutate usage rights without an explicit policy decision;
- contribution and reward calculations have deterministic inputs and documented rounding/precision rules;
- settlement intent can target an adapter without coupling the policy layer to that adapter;
- shared-asset and collective-housing scenarios pass with explicit rights outcomes.

### Handoff evidence

Policy matrix, deterministic calculation tests, rights transition tests, and shared-asset scenario trace.

---

# Lane B — Runtime / Platform

## WO-B1 — Protocol Runtime

### Required outputs

- canonical transaction ID and serialization;
- nonce-safe deterministic transaction ordering;
- validator registry and proposer validation;
- public consensus interface;
- two independently implemented consensus strategies;
- finality certificate generation and verification;
- finalized batch model;
- handler/transaction dispatch extension point;
- durable versioned state-store port;
- explicit batch outcome/error model.

### Acceptance criteria

- same logical transaction produces the same ID regardless of object insertion order;
- same inputs produce identical ordering and finality certificate;
- same-sender nonce order is never violated;
- invalid proposer/validator state is rejected before finalization;
- `executeBatch` rejects forged/tampered certificates before state effects;
- the two consensus strategies are algorithmically independent implementations, not aliases of the same ordering helper;
- state commits use version-aware durable semantics through the public port;
- partial batch execution exposes explicit outcomes and does not falsely report atomic success;
- protocol package has no dependency on infrastructure runtime, adapters, UI, or vendor SDKs.

### Required proof scenarios

- same-sender nonce sequence;
- cross-sender deterministic interleaving;
- forged certificate;
- duplicate/gap nonce policy;
- consensus implementation swap;
- first-tx success followed by second-tx execution failure.

### Handoff evidence

Consensus comparison tests, determinism hashes, certificate tamper tests, state-store conformance results, dependency scan, and batch-outcome matrix.

## WO-B2 — Infrastructure Runtime + Persistence Ports

### Required outputs

- provider-neutral capability/resource registry;
- capacity accounting;
- reservation/commitment ports;
- assignment execution pipeline;
- telemetry/evidence handoff ports;
- adapter registry and capability-based resolution;
- persistence ports for authoritative infrastructure data;
- multi-provider fixtures.

### Acceptance criteria

- runtime resolves adapters from capability/asset/adapter contracts rather than hard-coded providers;
- multiple providers can advertise the same capability type;
- reservations and commitments prevent invalid over-allocation according to contract rules;
- execution returns structured physical results plus evidence references;
- provider failure is isolated and does not corrupt unrelated providers;
- infrastructure runtime does not import protocol runtime internals;
- persistence ports permit at least one alternate implementation in tests.

### Required proof scenarios

- two compute providers for the same capability;
- provider unavailable after reservation;
- capacity consumed and released according to lifecycle;
- adapter replacement with a fake/reference adapter.

### Handoff evidence

Provider isolation tests, adapter resolution tests, reservation/capacity tests, persistence conformance results, and forbidden-import scan.

## WO-B3 — Verification + Asset/Collective + Reconciliation

### Required outputs

- evidence/provenance model and verification pipeline;
- independent verifier interface;
- asset lifecycle runtime;
- collective funding/ownership/usage composition;
- reconciliation state machine;
- explicit exception model for hybrid failures;
- cross-runtime integration tests.

### Acceptance criteria

- evidence collection and verification are separate operations;
- provenance is preserved through verification;
- verification disagreement is explicit and does not silently become success;
- asset lifecycle supports create/own/use/maintain/retire semantics;
- ownership/economic rights remain separate from usage rights;
- physical success followed by protocol rejection becomes a durable reconciliation state;
- retry after uncertain physical execution cannot silently duplicate work;
- reconciliation exposes who/what must act next and the authoritative state.

### Required proof scenarios

- physical success + protocol success;
- physical failure + no protocol transition;
- physical success + protocol rejection;
- uncertain execution + retry;
- shared 100-car collective;
- distributed factory verification disagreement.

### Handoff evidence

Reconciliation state diagram, failure matrix, evidence provenance tests, collective-rights tests, and cross-runtime traces.

---

# Lane C — Experience / Integration

## WO-C1 — Web Experience Shell

### Required outputs

- network workspace shell;
- persistent role switcher supporting multiple roles;
- Explore/Operate modes;
- intent entry experience;
- opportunity/capability discovery views;
- commitment/execution/evidence/verification projections;
- exception center;
- progressive disclosure for advanced protocol/runtime detail;
- accessibility/responsive foundations;
- mocked-contract journey tests only where the real API is not yet available.

### Acceptance criteria

- UI terminology follows the UX architecture rather than database-table vocabulary;
- role switching changes context/actions without changing identity;
- Explore and Operate are distinct but show the same authoritative operational model;
- UI never invents availability, ownership, usage, settlement, verification, or exception state;
- pending/rejected/reconciled states are visible and distinguishable;
- users can progressively reveal technical evidence, IDs, certificates, versions, and diagnostics;
- all role journeys remain usable at supported responsive breakpoints;
- accessibility baseline is enforced by automated checks plus representative manual review.

### Required proof scenarios

- consumer GPU request;
- provider capacity offering;
- collective member scheduling;
- factory operator exception handling;
- validator/verifier inspection.

### Handoff evidence

Screenshots/video or test artifacts of each journey, accessibility output, route/state inventory, and list of authoritative API fields consumed.

## WO-C2 — API + SDK Boundary

### Required outputs

- authenticated/network-scoped API boundary;
- intent, capability, reservation, commitment, execution, evidence, verification, economics, and exception read/command endpoints as applicable;
- SDK contracts generated or synchronized from API contracts;
- idempotency/error/pagination/audit context model;
- API integration tests.

### Acceptance criteria

- every mutating command has an explicit idempotency strategy where retries are possible;
- authorization is evaluated against network and role context;
- API does not expose direct database internals or vendor SDK models;
- errors distinguish validation, conflict, authorization, dependency, timeout, and reconciliation cases;
- read models expose enough authoritative state for the UI to avoid local invention;
- SDK and API schemas remain contract-conformant.

### Handoff evidence

OpenAPI/API contract or equivalent, contract tests, idempotency tests, authorization tests, example requests/responses, and SDK conformance results.

## WO-C3 — Adapters + Deployment

### Required outputs

- reference compute adapter;
- reference connectivity adapter;
- reference asset/payment rail adapter;
- fake/test adapters;
- durable object/evidence storage adapter;
- Postgres persistence adapter;
- Redis coordination adapter where justified;
- deployment/configuration manifests;
- E2E harness and environment documentation.

### Acceptance criteria

- core packages contain no vendor SDK imports;
- each adapter implements only a published port/contract;
- swapping a reference/fake adapter does not require kernel changes;
- secrets/configuration are externalized and not committed;
- deployment can start the API/runtime stack from documented commands;
- E2E harness can execute at least one real vertical scenario without UI-only mocks on the critical path.

### Handoff evidence

Adapter conformance results, swap test, deployment smoke test, configuration inventory, and E2E run artifact.

---

# Integration work orders

## WO-I1 — Runtime Integration

### Required outputs

A real end-to-end path:

`Intent -> Requirement -> Discovery -> Reservation -> Commitment -> Assignment -> Physical Execution -> Evidence -> Verification -> Protocol Transaction -> Finality -> State -> Settlement/Reconciliation`

### Acceptance criteria

- all transitions use the published contracts;
- the hybrid bridge is directional and explicit;
- physical and protocol state can be compared after every boundary;
- durable audit information identifies the initiating command, commitment, evidence, transaction, finality, and resulting state;
- failure injection proves the reconciliation path.

## WO-I2 — Experience Integration

### Required outputs

Live web/API projections using authoritative runtime/application state, including the exception center.

### Acceptance criteria

- no critical-path mocks remain;
- every visible status maps to an authoritative state source;
- role journeys use real authorization and network context;
- retries, timeouts, rejections, and reconciliation states are visible without page refresh assumptions.

## WO-I3 — Vertical Scenario Packs

### Required outputs

Reusable scenario fixtures/adapters for:

- compute pool;
- shared vehicle/collective asset;
- distributed factory;
- network provider.

### Acceptance criteria

Each scenario demonstrates the complete north-star lifecycle and at least one failure/recovery path, while reusing generic kernel/runtime contracts.

---

# Final acceptance review

The tech lead may mark the project release-ready only when all of the following are proven:

1. All applicable work-order outputs exist.
2. All acceptance criteria pass with reproducible evidence.
3. All global quality gates pass.
4. Architecture lock L1-L20 has no undocumented violation.
5. Two independent consensus implementations pass the same conformance suite.
6. At least one persistence implementation can be swapped through its port.
7. At least one infrastructure adapter can be swapped without core-package changes.
8. Physical-success/protocol-rejection reconciliation is durable and observable.
9. The five required UX simulations pass against authoritative state.
10. The tech lead records an adversarial review and explicitly lists residual debt rather than silently carrying it.
