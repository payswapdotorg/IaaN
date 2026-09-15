# WO-C1 — Web Experience

## Owner
Lane C

## Objective
Turn the operating architecture into a role-aware network workspace without embedding business logic in the UI.

## Owned paths
- `apps/web/**`
- `packages/ui/**`
- `tests/e2e/web/**`

## Prerequisites
WO-00, WO-A1.

## Build
- authenticated network workspace shell;
- persistent network selector and role switcher;
- Explore/Operate modes;
- universal intent entry;
- opportunity discovery;
- capability/provider views;
- commitment/execution/evidence/verification projections;
- Exception Center;
- collective asset rights/scheduling views;
- progressive disclosure of protocol details;
- accessible responsive components.

## Forbidden
No direct database calls. No protocol state mutation logic. No duplicated authoritative domain state.

## Acceptance
Each role can complete at least one meaningful journey using mocked contracts initially, then real API state during integration. The UI always labels unavailable/unknown/pending states instead of implying success.

## UX simulations
GPU consumer, GPU provider, collective member, asset manager, validator, verifier, factory operator.
