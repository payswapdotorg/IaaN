# IaaN

Infrastructure-as-a-Network (IaaN) — a protocol and operating layer for coordinating verified real-world capabilities, infrastructure, assets, commitments, execution, verification, contribution, and settlement.

## Repository status

This repository is a clean-room implementation. The architecture and implementation contracts in `docs/` are the source of truth for the project. Implementation agents must not infer product or protocol semantics from external repositories or prior prototypes.

## Start here

1. `AGENTS.md` — mandatory rules for every implementation agent.
2. `docs/architecture/ARCHITECTURE.md` — system architecture and boundaries.
3. `docs/architecture/ARCHITECTURE-LOCK.md` — frozen decisions that require an explicit architecture change process.
4. `docs/ux/UX-ARCHITECTURE.md` — UX/UI contracts and role-specific experiences.
5. `docs/engineering/DEPENDENCY-GRAPH.md` — dependency direction and parallel-work boundaries.
6. `docs/work-orders/ROADMAP.md` — implementation DAG and work-order index for the tech lead/orchestrator.
7. `docs/work-orders/WORKER-CONTRACT.md` — worker execution and handoff protocol.
8. `docs/testing/QUALITY-GATES.md` — verification gates and definition of done.

## North-star model

`Intent -> Capability Requirement -> Discovery -> Reservation -> Commitment -> Allocation/Assignment -> Execution -> Evidence -> Verification -> Contribution -> Reward/Settlement`

The kernel remains generic. Vertical providers (energy, compute, connectivity, storage, manufacturing, logistics, asset networks, payment rails, registries, etc.) integrate through adapters and extension contracts rather than kernel-specific code.

## Initial implementation strategy

The system is built as a modular monorepo so up to three workers can implement largely independent vertical slices without shared-file contention. See the work-order DAG for the exact ownership model and merge gates.
