# Implementation Roadmap and Work-Order DAG

The tech lead uses this document as the scheduling source of truth. At most three worker lanes run concurrently. The lead is responsible for integration and architecture review.

## Phase 0 — Foundation (lead-owned, blocking)

### WO-00 Foundation
**Owner:** Tech lead
**Owns:** root tooling, workspace manifests, CI, contract folder skeleton, test harness, architecture metadata.
**Prerequisite:** none.
**Outputs:** installable monorepo; strict TS; lint/test scripts; CI; package boundaries; baseline architecture-check script.
**Gate:** clean install + typecheck + lint + test + boundary check.

After WO-00, Lane A/B/C may proceed concurrently.

---

## Phase 1 — Three-lane implementation

### Lane A: Core/domain

### WO-A1 Core Contracts and Domain Primitives
**Prerequisite:** WO-00.
**Owns:** `packages/contracts`, `packages/kernel`, conformance tests for contracts.
**Build:** versioned schemas/types for actor identity, capability, requirement, reservation, commitment, allocation, assignment, execution result, evidence, verification, contribution, reward, settlement, rights, and exceptions.
**Must prove:** invariants, IDs, status transitions, serialization, deterministic canonicalization where required.
**Must not build:** vendor adapters, UI, concrete persistence, protocol consensus.
**Exit:** all downstream lanes can consume stable contracts without duplicating types.

### WO-A2 Intent and Workflow Orchestration
**Prerequisite:** WO-A1.
**Owns:** `packages/orchestration` and orchestration tests.
**Build:** intent -> requirement translation; capability discovery orchestration; reservation/commitment workflow; application policies; role-aware action authorization at application level.
**Must prove:** consumer flows and provider flows map to the canonical lifecycle.
**Must not own:** protocol state store, infrastructure adapter execution, UI state.

### WO-A3 Economic/Rights Application Policies
**Prerequisite:** WO-A1.
**Owns:** application-level policy integration with economics/asset rights contracts, only where not covered by Lane B implementation.
**Build:** ownership-vs-usage rights composition, contribution/reward policy interfaces, settlement intents, collective membership rules.
**Must prove:** shared-car and collective-housing scenarios.

---

### Lane B: Runtime/platform

### WO-B1 Protocol Runtime
**Prerequisite:** WO-A1.
**Owns:** `packages/protocol`, protocol conformance/integration tests.
**Build:** canonical transaction identity; nonce-safe deterministic ordering; validator registry; consensus interface; at least two independently implemented consensus strategies; finality certificate; finalized batch; executor/handler registry; versioned state store port.
**Must prove:** tamper rejection, deterministic finality, per-actor sequencing, batch failure semantics, replaceability.
**Must not import:** infrastructure/adapters/web.

### WO-B2 Infrastructure Runtime + Persistence Ports
**Prerequisite:** WO-A1.
**Owns:** `packages/infrastructure`, runtime ports in `packages/persistence`, adapter registry interfaces.
**Build:** capability/resource registry; reservations; commitments; assignment execution; telemetry/evidence handoff; adapter registry; provider isolation; persistence ports.
**Must prove:** provider-neutral execution and multiple providers per capability.
**Must not import:** protocol implementation.

### WO-B3 Verification + Asset/Collective + Reconciliation
**Prerequisite:** WO-A1, WO-B1, WO-B2.
**Owns:** `packages/verification`, `packages/asset-runtime`, `packages/economics`, cross-runtime reconciliation tests.
**Build:** evidence verification pipelines; asset lifecycle; collective funding/ownership/usage models; physical-success/protocol-rejection reconciliation; explicit exception states.
**Must prove:** shared assets, decentralized factory coordination, and hybrid failure cases.

---

### Lane C: Experience/integration

### WO-C1 Web Experience Shell
**Prerequisite:** WO-A1.
**Owns:** `apps/web`, `packages/ui`.
**Build:** network workspace shell; role switcher; Explore/Operate modes; intent entry; opportunity/capability views; commitment/evidence/exception projections; progressive disclosure; accessibility/responsive foundations.
**Must not embed:** authoritative domain or protocol logic.
**Exit:** mocked-contract UX demonstrates all required role journeys.

### WO-C2 API + SDK Boundary
**Prerequisite:** WO-A1, WO-A2.
**Owns:** `apps/api`, `packages/sdk`.
**Build:** authenticated/network-scoped APIs; intent/capability/commitment/read-model endpoints; commands; error model; pagination; idempotency; audit context.
**Must not expose:** direct storage internals or vendor APIs.

### WO-C3 Adapters + Deployment
**Prerequisite:** WO-B2 and WO-B3 interface release.
**Owns:** `packages/adapters`, deployment manifests, environment/config docs, E2E harness.
**Build:** reference adapters for compute, connectivity, asset/payment rail, and fake/test adapters; provider isolation; R2 evidence storage; Postgres persistence adapter; Redis coordination adapter; deployment configuration.
**Must prove:** external provider can be swapped without core changes.

---

## Phase 2 — Integration milestones

### WO-I1 Runtime Integration
**Prerequisite:** A2, B1, B2.
**Owner:** Tech lead + one worker as assigned.
**Build:** end-to-end lifecycle from intent to physical execution and protocol state; hybrid bridge; durable audit trail; reconciliation path.

### WO-I2 Experience Integration
**Prerequisite:** I1, C1, C2.
**Build:** live web/API projections; exception center; role workflows using real state; no mocks on the critical path.

### WO-I3 Vertical scenario packs
**Prerequisite:** I2, C3.
**Build:** compute pool, shared vehicle/asset collective, distributed factory, and network provider scenarios with reusable adapters and fixtures.

---

## Phase 3 — Adversarial verification

### WO-V1 Architecture Review
The tech lead compares the implementation against every lock item L1-L20 and dependency graph. Any violation blocks release.

### WO-V2 Failure/Chaos Review
Simulate provider loss, duplicate commands, stale reservations, evidence disagreement, protocol rejection after physical success, persistence conflict, retry after timeout, and partial batch failure.

### WO-V3 UX Operational Truth Review
Replay the required user simulations from `QUALITY-GATES.md`. Confirm UI and API show authoritative state at every step.

### WO-V4 Replaceability Review
Swap consensus, persistence, infrastructure adapter, evidence verifier, and payment/registry adapter behind public interfaces. No core package modifications should be needed beyond configuration/registration.

---

## Phase 4 — Production hardening

Security review, rate limiting, tenant/network isolation, secret handling, observability, migration tooling, backup/restore, cost controls, deployment runbooks, incident response, and performance tests.

## Scheduling rules

- Run A/B/C concurrently whenever prerequisites are satisfied.
- Never schedule two workers that own the same directory.
- Shared-contract changes pause affected lanes until released.
- After each integration milestone, all three lanes consume the new baseline before further divergence.
- The tech lead may split a work order only by creating explicit child ownership boundaries.

## Status notation

`[ ] planned` · `[~] active` · `[x] verified complete` · `[!] blocked` · `[↻] requires rework`

The repository's current state is Phase 0 only: WO-00 is being established by this setup commit; no implementation work should be assumed complete until verified by the work-order evidence rules.
