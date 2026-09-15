# WO-A1 — Core Contracts and Domain Primitives

## Owner
Lane A

## Objective
Create the stable, versioned vocabulary that every other package consumes. This is the most important anti-drift boundary in the repository.

## Owned paths
- `packages/contracts/**`
- `packages/kernel/**`
- `tests/conformance/contracts/**`

## Prerequisites
WO-00 Foundation.

## Build
Define strict typed contracts for:
- actor/identity references;
- network/tenant context;
- capability and capacity;
- requirement and constraints;
- reservation;
- commitment and obligation;
- allocation/assignment;
- execution and outcome;
- evidence/provenance;
- verification/attestation;
- contribution/reward;
- settlement intent/result;
- ownership rights and usage rights;
- operational exception/reconciliation state.

Implement deterministic IDs/canonicalization where contractually required. Define explicit state machines rather than scattered string literals.

## Forbidden
No database implementation. No vendor SDK. No UI. No concrete consensus. No physical adapter.

## Acceptance
- schemas/types are versioned and serializable;
- invariants are executable tests;
- invalid transitions are rejected;
- no duplicate local copies of domain types are needed by downstream lanes;
- boundary-check passes.

## Required simulations
Shared car ownership/usage, GPU capacity offer, factory production requirement.
