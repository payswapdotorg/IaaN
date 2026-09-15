# WO-I1 — Runtime Integration

**Owner:** Tech lead + one assigned worker
**Paths:** cross-runtime integration surfaces and `tests/integration/runtime/**`
**Prerequisites:** WO-A2, WO-B1, WO-B2

Wire the authoritative lifecycle end to end:
`Intent -> Requirement -> Discovery -> Reservation -> Commitment -> Allocation/Assignment -> Physical Execution -> Evidence -> Verification -> Protocol Transaction -> Finality -> State -> Settlement/Reconciliation`.

## Acceptance
- every transition uses published contracts;
- hybrid bridging is explicit and directional;
- physical and protocol outcomes remain distinguishable;
- audit/transition records correlate command, commitment, evidence, transaction, finality, and resulting state;
- all four hybrid outcomes are proven: success/success, physical failure, physical success + protocol rejection, uncertain execution + retry.
