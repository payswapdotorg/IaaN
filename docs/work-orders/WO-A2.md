# WO-A2 — Intent and Workflow Orchestration

**Owner:** Lane A  
**Paths:** `packages/orchestration/**`, `tests/conformance/orchestration/**`  
**Prerequisites:** WO-A1

Translate user/business intent into capability requirements and coordinate discovery, reservation, commitment, allocation, execution, evidence, verification, and settlement workflows through ports.

The orchestrator owns application policy and workflow sequencing, not protocol consensus, physical adapter behavior, persistence implementation, or UI state.

Acceptance: consumer, provider, shared-asset, and factory workflows produce the same normalized lifecycle; retries are idempotent; authorization is checked before commands; failures become explicit exceptions/reconciliation states.
