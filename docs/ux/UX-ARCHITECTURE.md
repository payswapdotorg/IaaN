# UX/UI Architecture

## Experience model

The application is a network workspace, not an admin dashboard disguised as a product. A user can participate in many networks and hold many roles.

Persistent shell:

`IaaN | Network | Role | Explore/Operate | Global Search/Intent | Notifications/Exceptions | User`

## Role contexts

### Provider
Offer capabilities, publish capacity, manage commitments, utilization, evidence, maintenance, reliability, revenue, and exceptions.

### Consumer
Describe an intent, inspect matched capabilities/providers, compare constraints, reserve, commit, schedule, monitor, verify, and settle.

### Validator
Review proposals, finality queues, validator health, network integrity, and protocol diagnostics.

### Verifier
Review evidence, verification queues, disputes, attestations, and provenance.

### Investor / Capital Provider
Discover opportunities, inspect risk and projected economics, commit capital, monitor asset/network performance, and receive economic outcomes.

### Collective Member
See collective commitments, ownership/economic rights, usage rights, schedules, maintenance, governance, and contribution history.

### Asset Manager
Acquire/create assets, configure rights, manage lifecycle, maintenance, capacity, utilization, and retirement.

### Network Administrator
Manage network policy, participants, capabilities, roles, verification policy, settlement configuration, and operational health.

### Operator
Perform live operational actions, triage exceptions, reroute/fail over, coordinate adapters, and reconcile outcomes.

## Explore mode

Explore is discovery-first. Surfaces include:
- opportunities;
- capability map/graph;
- providers;
- collectives and shared assets;
- network health summaries;
- scenario explainers;
- projected economics and constraints.

The UI should make unfamiliar possibilities legible without requiring protocol knowledge.

## Operate mode

Operate is execution-first. Surfaces include:
- commitments;
- reservations;
- schedules;
- assignments;
- execution state;
- evidence;
- verification;
- settlement;
- maintenance;
- exceptions and reconciliation.

## Universal intent entry

The primary entry point asks what the user is trying to accomplish, for example:

- Find compute or AI capacity
- Offer infrastructure
- Build a network
- Fund an asset
- Join a collective
- Coordinate production
- Schedule shared equipment
- Verify work
- Manage a commitment

Intent is converted into a capability requirement. The UI must display the translation and allow users to adjust constraints before commitment.

## Opportunity model

An opportunity packages a real-world coordination possibility into an understandable proposition. Examples: shared vehicle pool, housing collective, AI compute pool, decentralized factory, regional connectivity network.

An opportunity can be explored before the user commits anything. Once committed it becomes an operational workflow backed by the same domain primitives as all other workloads.

## Capability visualization

Provide both list/table and graph views. The graph shows providers, capabilities, requirements, reservations, commitments, dependencies, evidence, and network relationships. Visual projections must consume normalized domain data and never maintain their own authoritative graph.

## Scheduling

Scheduling must show constraints and guarantees in human terms: time windows, availability, allocation duration, redundancy, cancellation rules, utilization conflicts, and fallback options.

## Collective asset UX

Always show ownership/economic rights and usage rights separately. Example: a person may own 2% of a car pool but receive 10 hours of monthly usage rights subject to scheduling policy. Maintenance obligations and contribution rules must be visible.

## Exceptions

The Exception Center is first-class. Example states:
- commitment breach;
- capacity shortage;
- evidence missing;
- verification disagreement;
- physical execution succeeded but protocol settlement is pending;
- payment pending;
- asset maintenance overdue;
- SLA breach;
- reconciliation required.

Every exception should explain what happened, why it matters, current impact, automated action, and available human actions.

## Progressive disclosure

Default presentation uses human terms. Advanced views reveal:
- actor IDs;
- capability/commitment IDs;
- transaction IDs;
- protocol/network version;
- certificate/finality data;
- evidence provenance;
- state transitions;
- adapter diagnostics.

## Accessibility and responsive behavior

Keyboard navigation, semantic controls, readable contrast, screen-reader labels, reduced motion, mobile-safe information hierarchy, and resilient loading/error states are architectural requirements.

## UX acceptance principle

For every major operational flow, simulate at least one user in each participating role and verify that:
1. the user can discover the goal;
2. the goal becomes a capability requirement;
3. allocation/commitment semantics are understandable;
4. live state reflects runtime truth;
5. evidence and verification are inspectable;
6. failures become actionable exceptions;
7. economic and usage rights are unambiguous where relevant.
