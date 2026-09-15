# WO-V4 — Replaceability Review

**Owner:** Tech lead
**Prerequisites:** WO-I3

Exercise substitution behind public contracts for consensus, persistence, infrastructure adapter, evidence verifier, and payment/registry adapter.

## Acceptance
- two independent consensus implementations pass the same contract suite;
- persistence implementation can be swapped without orchestration/domain changes;
- infrastructure adapter can be replaced without kernel changes;
- evidence verifier can be replaced behind its port;
- external payment/registry integration is replaceable behind adapter contracts;
- configuration/registration, not core code modification, selects implementations.
