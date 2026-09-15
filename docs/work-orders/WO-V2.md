# WO-V2 — Failure and Chaos Review

**Owner:** Tech lead + assigned worker
**Prerequisites:** WO-I3

Inject provider loss, duplicate commands, stale reservations, evidence disagreement, physical success followed by protocol rejection, persistence conflicts, retry after timeout, and partial batch failure.

## Acceptance
Every injected fault yields deterministic, explicit, observable state. No silent success, silent loss, contradictory terminal states, or duplicate economic/protocol effects are permitted.
