# IaaN Agent Operating Contract

This file is mandatory for every tech-lead, worker, reviewer, and implementation agent operating in this repository.

## Source of truth hierarchy

1. `docs/architecture/ARCHITECTURE-LOCK.md`
2. `docs/architecture/ARCHITECTURE.md`
3. `docs/ux/UX-ARCHITECTURE.md`
4. `docs/engineering/DEPENDENCY-GRAPH.md`
5. `docs/work-orders/ROADMAP.md` and the individual work-order files
6. Current implementation and tests
7. External references only for implementation mechanics, never for product or protocol semantics

If implementation conflicts with a locked contract, stop and escalate to the tech lead. Do not silently reinterpret the architecture.

## Non-negotiable boundaries

- Kernel code is domain-generic and must not import a vertical adapter or vendor SDK.
- Infrastructure execution, protocol execution, and asset/collective coordination remain separate runtimes.
- Adapters are the only integration boundary to infrastructure, payment rails, registries, external protocols, and vendor systems.
- UX expresses user intent and workflow; it does not bypass domain/application contracts.
- Operational truth must be derived from the same state and evidence used by runtime behavior.
- No mutable singleton state for protocol or scheduling semantics.
- Deterministic behavior is required wherever consensus, allocation, verification, ordering, or settlement depends on reproducibility.
- Economic ownership rights and usage rights are separate concepts.
- A successful physical execution is not automatically a finalized protocol transition; reconciliation is explicit.

## Worker discipline

Before coding, read the architecture lock, dependency graph, assigned work order, and all prerequisite work-order completion records.

Workers own the files and packages listed in their work order. Do not edit another worker's owned surface unless the work order explicitly grants shared ownership.

A worker may create new supporting files inside its owned package, but must preserve dependency direction. Shared contract changes require a tech-lead gate and a dedicated contract work order.

Every completed work order must include:
- implementation summary;
- tests added/changed;
- verification commands and results;
- architecture decisions made, if any;
- known limitations and follow-ups;
- explicit statement that no frozen decision was changed.

## Merge discipline

The tech lead merges only after the work-order acceptance gates pass. Prefer small, branch-isolated PRs. Never merge two workers whose changes overlap without resolving ownership first.

## Stop conditions

Stop and escalate instead of guessing when:
- a locked decision appears insufficient;
- a new cross-package dependency is needed;
- a worker needs another worker's owned file;
- runtime semantics would differ from the documented lifecycle;
- a capability/commitment/evidence model cannot represent the requested scenario;
- a test proves nondeterminism or a boundary violation.

## Required mindset

Implement the system that the repository specifies, not the system that seems easiest to build. Preserve replaceability, auditability, deterministic behavior, extension points, and operational clarity over local convenience.
