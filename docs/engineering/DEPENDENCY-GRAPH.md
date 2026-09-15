# Dependency Graph and Ownership Boundaries

## Package topology

Target monorepo:

```text
apps/
  web/                 # UX shell and projections
  api/                 # HTTP/RPC application boundary
packages/
  contracts/           # versioned public contracts and schemas
  kernel/              # generic domain primitives only
  protocol/            # deterministic protocol runtime
  infrastructure/      # physical capability runtime
  asset-runtime/       # asset + collective coordination
  orchestration/       # intent-to-workflow application layer
  adapters/            # adapter interfaces + concrete integrations
  persistence/         # durable storage implementations
  verification/        # evidence + verification engines
  economics/           # contribution/reward/settlement policies
  sdk/                 # external application/client SDK
  ui/                  # shared presentation primitives
  config/               # env/schema/configuration
scripts/
tests/
  conformance/
  integration/
  e2e/
```

## Dependency direction

Allowed:

`apps -> orchestration -> {kernel, protocol, infrastructure, asset-runtime, economics, verification} -> contracts`

`runtime packages -> adapter interfaces`

`adapters -> external SDKs/systems`

`persistence -> contracts + runtime persistence ports`

`web -> ui + orchestration client/API contracts`

Forbidden:

- kernel -> adapters
- kernel -> persistence implementation
- kernel -> web
- protocol -> infrastructure implementation
- infrastructure -> protocol implementation
- runtime -> vendor SDK directly
- UI -> database
- UI -> protocol state mutation internals
- adapter -> domain business rule ownership

## Three-worker lanes

### Lane A — Core/domain
Owns `packages/contracts`, `packages/kernel`, `packages/orchestration`, and their unit/conformance tests.

Primary objective: stabilize vocabulary, invariants, lifecycle transitions, and intent-to-requirement/application services.

### Lane B — Runtime/platform
Owns `packages/protocol`, `packages/infrastructure`, `packages/asset-runtime`, `packages/persistence`, `packages/verification`, `packages/economics`, and runtime integration tests.

Primary objective: make the operational/protocol engines correct, deterministic, durable, replaceable, and observable.

### Lane C — Experience/integration
Owns `apps/web`, `apps/api`, `packages/ui`, `packages/adapters`, `packages/sdk`, E2E tests, and deployment wiring.

Primary objective: expose the system through role-aware UX, APIs, adapters, and real integration surfaces without embedding domain rules.

## Shared-file rule

`packages/contracts` is the principal cross-lane boundary. Changes require a contract work order or tech-lead-approved compatibility patch. Other workers consume released contract versions instead of editing the same files.

## Merge gates

A lane can merge when its tests pass independently. The tech lead then runs cross-lane integration and conformance gates before promoting a milestone. No lane may declare system completeness from its own test suite alone.
