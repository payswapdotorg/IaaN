# Architecture Lock

These decisions are frozen for implementation. Changing one requires a dedicated architecture-change work order, written rationale, affected dependency analysis, and tech-lead approval before dependent work proceeds.

## L1 — Product thesis

IaaN is an infrastructure/reality coordination OS and protocol. It is not a single infrastructure provider, cloud replacement, marketplace-only app, energy-only system, or blockchain.

## L2 — Generic kernel

The kernel models generic capability, capacity, requirement, reservation, commitment, allocation, execution, evidence, verification, contribution, reward, and settlement primitives. Vertical knowledge belongs outside the kernel.

## L3 — Runtime isolation

Infrastructure Runtime and Protocol Runtime are separate worlds. Neither may import the other's internals. Hybrid Runtime is the controlled bridge. Asset/Collective coordination composes these runtimes rather than replacing them.

## L4 — Provider neutrality

A provider is an adapter-backed participant, not a kernel special case. The system must be capable of hosting multiple competing providers for the same capability type.

## L5 — Intent first UX

The human-facing abstraction is intent and capability requirement, not database entities. The user should be able to ask for a goal and progressively see the capability, commitment, execution, evidence, and economic consequences behind it.

## L6 — Roles are context, not identity

One account may hold multiple roles simultaneously. Role selection changes the workspace and available actions; it does not create a second identity.

## L7 — Explore/Operate split

Explore supports discovery and understanding. Operate is the control surface for live commitments and execution. Both are projections of the same operational model.

## L8 — Operational truth

The UI may not invent state. Availability, commitment, verification, ownership, usage, settlement, and exception states must be backed by domain/application truth.

## L9 — Evidence-first trust

Evidence is first-class and carries provenance. Verification is separate from evidence collection. Evidence quality and verification status are explicit.

## L10 — Economic rights vs usage rights

Collective assets must represent ownership/economic rights separately from usage rights. Payment rails and registries are adapters.

## L11 — Determinism

Consensus, canonical IDs, ordering, validation, and settlement-relevant transitions must be deterministic for the same inputs and versioned rules.

## L12 — Durable protocol state

Protocol state transitions use version-aware durable storage. Mutable process-local staging is forbidden for authoritative state.

## L13 — Finality

Consensus produces an authoritative finalized batch plus a certificate. Runtime execution re-validates the certificate before applying protocol effects.

## L14 — Batch semantics

A finalized batch is an ordered execution schedule, not automatically an atomic database transaction. Execution failure stops execution and must expose explicit outcome semantics.

## L15 — Consensus replaceability

At least two independently implemented consensus strategies must be exercised against the same public contract before claiming replaceability. Sharing an ordering helper is not sufficient proof of algorithmic independence.

## L16 — Reconciliation

Physical success and protocol success are distinct. The system must explicitly represent pending/reconciled/rejected outcomes rather than silently losing successful physical work when protocol finalization fails.

## L17 — Adapter-only external integration

External payment processors, blockchains, registries, cloud providers, telecom systems, IoT systems, and vendor APIs enter through adapters. Core packages must not import their SDKs.

## L18 — 3-worker concurrency

Work orders are scoped by package ownership. Shared contracts are changed only in explicit contract work orders. Workers should normally operate in three lanes: core/domain, runtime/platform, and experience/integration.

## L19 — Progressive disclosure

The UX presents understandable domain terms by default while allowing advanced users to reveal IDs, certificates, versions, evidence, state transitions, and diagnostic detail.

## L20 — Architecture change protocol

A proposed change must update, in one controlled change set:
- architecture lock;
- architecture narrative if affected;
- dependency graph;
- work-order DAG/ownership;
- affected domain contracts;
- tests/acceptance gates;
- migration/backward-compatibility notes.

No implementation worker may unilaterally redefine a locked decision.
