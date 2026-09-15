# Architecture

## 1. Mission

IaaN is an Infrastructure-as-a-Network operating and protocol layer that lets independent providers, users, collectives, assets, and networks expose and consume verified capabilities through provider-neutral contracts.

The system coordinates reality; it does not attempt to own every physical resource. Providers remain replaceable. IaaN turns heterogeneous infrastructure and real-world assets into discoverable, committable, verifiable capabilities.

## 2. Canonical lifecycle

`Intent -> Capability Requirement -> Capability Discovery -> Reservation -> Commitment -> Allocation/Assignment -> Execution -> Evidence -> Verification -> Contribution -> Reward/Settlement`

A workflow may start in the middle for internal operations, but user-facing and protocol-facing semantics must be expressible in this lifecycle.

## 3. Architectural layers

`Protocol Specification -> Kernel Contracts -> Domain/Application Services -> Runtime Boundaries -> Adapters -> Physical/External Systems`

### Kernel

Owns generic primitives and contracts:

- Identity and actor references
- Capability
- Requirement
- Reservation
- Commitment
- Allocation / Assignment
- Execution result
- Evidence
- Verification
- Contribution
- Reward
- Settlement intent
- Resource and capacity
- Deterministic ordering primitives
- Attestation/certificate interfaces
- Versioned protocol state

The kernel must not know GPUs, batteries, telecom providers, cars, houses, factories, banks, Stripe, blockchains, or vendor SDKs.

### Domain/application layer

Composes kernel primitives into use cases such as workload fulfillment, shared mobility, collective acquisition, decentralized manufacturing, and infrastructure marketplace flows.

### Runtimes

Three runtime families are intentionally isolated:

1. **Infrastructure Runtime** — physical capability execution.
2. **Protocol Runtime** — deterministic protocol state transitions, consensus/finality, and settlement records.
3. **Asset/Collective Runtime** — optional higher-level coordination of creation, ownership, usage rights, maintenance, financing, and lifecycle of collective assets.

A fourth coordination layer may orchestrate these runtimes, but it does not collapse them into one implementation.

## 4. Infrastructure runtime

`Requirement -> Discovery -> Reservation -> Commitment -> Assignment -> InfrastructureRuntime -> AdapterRegistry -> InfrastructureAdapter -> external/physical execution -> Evidence/Telemetry -> Verification`

Adapters expose normalized capability and evidence contracts. The runtime never assumes a single adapter implementation.

Examples of adapters:
- compute/GPU provider
- energy/DER
- network/connectivity
- storage
- manufacturing
- logistics
- payment rail
- registry
- blockchain/external protocol
- device/IoT

## 5. Protocol runtime

Canonical path:

`Transaction -> Proposal -> Validation -> Finality -> FinalizedBatch -> Executor -> WriteSet -> Versioned StateStore`

Requirements:
- canonical transaction identity;
- deterministic ordering;
- nonce-safe sequencing;
- validator registry and proposer validation;
- tamper-evident finality certificate;
- optimistic concurrency/version isolation;
- atomic state transition with journal/audit record;
- explicit execution outcomes;
- independently replaceable consensus implementations.

A finalized batch is an ordered execution schedule, not an implicit all-or-nothing database transaction.

## 6. Hybrid runtime

The hybrid path is strictly directional at the runtime boundary:

`physical execution -> normalized result -> bridge -> protocol transaction -> protocol submission/finality/execution -> protocol state`

The bridge is the only converter. Protocol runtime must never import infrastructure adapters. Infrastructure runtime must not import protocol internals.

Physical success does not imply protocol success. The architecture therefore requires an explicit reconciliation model for the case where physical execution succeeds but protocol finality or state application is rejected.

## 7. Capability and commitment model

### Capability

A provider declares what it can offer, with constraints, geography, time, capacity, quality, availability, evidence requirements, and provider identity.

### Requirement

A consumer intent is normalized into required capability dimensions. Requirements may include capacity, duration, latency, geography, redundancy, provider concentration, reliability, compliance, evidence quality, price, and scheduling constraints.

### Reservation

A temporary hold or allocation candidate that prevents double-booking while a commitment is negotiated/finalized.

### Commitment

A durable promise with parties, obligations, constraints, deadlines, acceptance criteria, failure semantics, and evidence requirements.

### Assignment

The concrete execution allocation derived from a commitment.

## 8. Evidence and verification

Evidence is first-class. Every important physical claim should have provenance and a verification status. Distinguish at minimum:

- observed;
- authenticated;
- reported;
- derived;
- inferred.

Verification may be automatic, delegated, quorum-based, oracle-assisted, or human-reviewed. Verification results are distinct from raw evidence.

## 9. Economic model

Rewards, contributions, payment, ownership, and usage must not be conflated.

A collective asset may expose:
- economic ownership rights;
- usage rights;
- maintenance obligations;
- governance rights;
- contribution/reward rights.

Banks, card processors, stablecoins, blockchains, registries, and other rails are adapters. They are not required to become kernel concepts.

## 10. Asset/collective model

IaaN can coordinate networks such as shared vehicles, homes, compute pools, and distributed factories.

Canonical asset lifecycle:

`Opportunity -> Funding/Commitment -> Acquisition/Creation -> Verification -> Allocation of Rights -> Usage -> Maintenance -> Revaluation/Settlement -> Retirement/Disposition`

The Asset Runtime consumes capability and commitment primitives; it must not duplicate them.

## 11. UX boundary

`UX -> User Intent -> Application Workflow -> Capability/Commitment Protocol -> Runtime(s) -> Adapter(s) -> Reality`

The UI must not contain protocol state-transition logic. UI state is a projection of operational truth.

## 12. Frontend experience

The primary UX context is a network workspace. Users may have multiple roles simultaneously and switch role context without changing identity.

Required role families:
Provider, Consumer, Validator, Verifier, Investor/Capital Provider, Collective Member, Asset Manager, Network Administrator, Operator.

Required modes:
- Explore — discover capabilities, opportunities, networks, collectives, scenarios.
- Operate — make, monitor, verify, reconcile, and settle commitments.

The universal entry point is intent-oriented: "What are you trying to accomplish?" The UI then turns intent into capability requirements and workflow actions.

## 13. Operational truth

The frontend, APIs, jobs, and audit surfaces must derive from shared domain/application contracts. No UI-only state may claim that a commitment is executed, verified, settled, owned, or available when the underlying operational state disagrees.

## 14. Deployment shape

Prefer a modular TypeScript monorepo with:
- web application suitable for Vercel;
- API/application services;
- Postgres-compatible durable state suitable for Neon;
- Redis-compatible ephemeral coordination suitable for Upstash;
- object/evidence storage suitable for Cloudflare R2;
- optional automation/external web adapters suitable for Apify or equivalent;
- environment-independent adapter interfaces so infrastructure providers can be swapped.

The initial implementation must remain deployable with free/low-cost tiers, while avoiding architecture that depends on those vendors.

## 15. Security and trust

Every externally caused state transition must be attributable to an actor and validated against authority. Capability claims require provider identity. Evidence requires provenance. Protocol transitions require deterministic validation. The API must default to least privilege and explicit tenancy/network boundaries.

## 16. Replaceability principle

At every major boundary, there must be at least one stable contract and at least two plausible implementations or a deliberate test double. Consensus, state storage, evidence verification, adapters, payment rails, and infrastructure providers must not be structurally irreplaceable.
