# WO-C2 — API and SDK Boundary

## Owner
Lane C

## Objective
Expose application-safe commands and read models for web clients and external integrations.

## Owned paths
- `apps/api/**`
- `packages/sdk/**`
- `tests/integration/api/**`

## Prerequisites
WO-00, WO-A1, WO-A2.

## Build
- authentication and authorization boundary;
- explicit network/tenant scoping;
- intent/capability/requirement/reservation/commitment read models;
- command endpoints with idempotency;
- pagination/filtering/sorting;
- standardized domain error mapping;
- audit context and actor attribution;
- SDK methods generated or typed directly from the public API contract.

## Forbidden
No direct database access from handlers. No vendor SDK leakage. No UI-specific business rules.

## Acceptance
A client can complete the consumer/provider/collective workflows through the API without knowing internal package structure. Repeated commands with the same idempotency key do not create duplicate authoritative effects.
