# WO-C3 — Adapters and Deployment

**Owner:** Lane C  
**Paths:** `packages/adapters/**`, deployment/config files, `tests/e2e/**`  
**Prerequisites:** WO-B2, WO-B3, WO-C2

Implement reference/fake adapters for compute, connectivity, evidence/object storage, payment/settlement rail, and registry/external protocol boundaries. Configure Postgres/Neon-compatible persistence, Redis/Upstash-compatible coordination, R2-compatible evidence storage, and Vercel-compatible web deployment.

Adapter implementations must normalize external failures into domain errors and never leak vendor types past adapter boundaries.

Acceptance: at least two provider implementations for a capability; external provider can be replaced by fake/reference adapter without kernel changes; deployment can run locally and in the preferred low-cost topology; E2E tests exercise one complete lifecycle with real persistence and adapter boundaries.
