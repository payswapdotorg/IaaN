# WO-B3 — Verification, Asset/Collective Runtime, Reconciliation

## Owner
Lane B

## Objective
Make evidence trustworthy, support collective/asset workflows, and preserve explicit state when physical and protocol outcomes diverge.

## Owned paths
- `packages/verification/**`
- `packages/asset-runtime/**`
- `packages/economics/**`
- `tests/conformance/verification/**`
- `tests/integration/reconciliation/**`

## Prerequisites
WO-A1, WO-B1, WO-B2.

## Build
- evidence provenance and verification interfaces;
- verification policies and dispute states;
- asset lifecycle: opportunity/acquire/create/use/maintain/retire;
- collective membership and funding commitments;
- separate ownership/economic rights from usage rights;
- contribution/reward/settlement policy contracts;
- reconciliation state machine for physical-success/protocol-failure and uncertain outcomes;
- operational exception model.

## Acceptance
Shared vehicle, collective housing, and decentralized factory simulations can be represented without inventing special-case primitives. A successful physical action followed by protocol rejection becomes an explicit reconciliation state visible to applications.

## Forbidden
No UI. Payment/blockchain SDKs only through adapters owned by Lane C.
