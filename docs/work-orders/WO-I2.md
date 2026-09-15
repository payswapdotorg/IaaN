# WO-I2 — Experience Integration

**Owner:** Tech lead + Lane C
**Paths:** integration glue and `tests/e2e/**`
**Prerequisites:** WO-I1, WO-C1, WO-C2

Replace critical-path mocks with live API/runtime/application state and wire the Exception Center and role workflows to authoritative projections.

## Acceptance
- no critical-path mock remains;
- every visible status maps to authoritative state;
- role actions use real authorization and network context;
- retries, timeouts, rejection, and reconciliation are visible without relying on a page-refresh race;
- required role journeys pass end to end.
