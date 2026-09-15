# WO-B2 — Infrastructure Runtime

## Owner
Lane B

## Objective
Implement provider-neutral capability execution and commitment handling.

## Owned paths
- `packages/infrastructure/**`
- persistence ports used by infrastructure, under `packages/persistence/ports/**`
- `tests/conformance/infrastructure/**`

## Prerequisites
WO-00, WO-A1.

## Build
- capability catalog and capacity model;
- requirement matching interface;
- reservations with conflict protection;
- commitment lifecycle;
- assignment generation;
- adapter registry keyed by normalized capability/provider metadata;
- execution orchestration;
- evidence/telemetry handoff;
- provider health and availability signals.

## Forbidden
No protocol-runtime imports. No direct vendor SDK access. No UI.

## Acceptance
Two distinct providers for the same capability can be registered, discovered, reserved, committed, and executed through the same runtime interfaces. Provider replacement requires configuration/registration, not kernel changes.

## Required negative tests
Oversubscription, reservation expiry, provider disappearance, duplicate execution request, stale commitment, adapter mismatch.
