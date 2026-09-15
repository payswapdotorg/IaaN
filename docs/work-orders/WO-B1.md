# WO-B1 — Protocol Runtime

## Owner
Lane B

## Objective
Implement the deterministic protocol runtime without importing infrastructure implementation details.

## Owned paths
- `packages/protocol/**`
- `tests/conformance/protocol/**`

## Prerequisites
WO-00, WO-A1.

## Build
- transaction contract and canonical transaction ID;
- nonce-aware deterministic ordering;
- validator registry and proposer validation;
- public consensus interface;
- two independently implemented consensus algorithms;
- finality certificate and finalized batch;
- proposal validation and execution pipeline;
- explicit execution outcomes (`EXECUTED`, `REJECTED_BY_CONSENSUS`, `INVALID_CERTIFICATE`, `EXECUTION_FAILED` or equivalent); 
- transaction-handler registry;
- versioned state-store port;
- write-set based execution;
- audit/transition journal port.

## Forbidden
No import from `packages/infrastructure`, `packages/adapters`, `apps`, or vendor SDKs.

## Acceptance
- same logical inputs yield identical IDs/order/certificates;
- same-sender nonce order is enforced;
- forged/tampered batches are rejected;
- stale version commits are rejected safely;
- partial batch failure semantics are explicit;
- consensus implementations are independently understandable and testable;
- runtime has no mutable global staging state.

## Required negative tests
Duplicate nonce, nonce gap, proposer deactivation, forged certificate, reordered transaction payload, state version conflict, handler failure.
