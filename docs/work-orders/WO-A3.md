# WO-A3 — Economic and Rights Policies

**Owner:** Lane A
**Paths:** `packages/economics/**`, `tests/conformance/economics/**`
**Prerequisites:** WO-A1

Implement application-level policy composition for economic ownership, usage rights, contribution, reward, settlement intents, collective membership, and funding.

Keep policy independent of payment processors, blockchains, registries, and UI. Economic ownership and usage authorization must remain separately representable.

## Acceptance
- ownership rights and usage rights can diverge without ambiguity;
- contribution/reward calculations are deterministic with documented precision/rounding;
- collective membership/funding changes are explicit policy transitions;
- settlement intents target ports rather than vendor implementations;
- shared-car and collective-housing scenarios pass with explicit rights outcomes.

## Required negative tests
Unauthorized usage, revoked membership, insufficient funding, duplicate settlement intent, conflicting usage rights.
