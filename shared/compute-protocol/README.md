# JANUS Welfare-First Compute Protocol v0.2 + PLAYGRID Routing Fabric v0.1

Shared executable contract for the paired `SSlot` and `DIVINE_REALM` compute architecture.

## Purpose

The protocol separates voluntary computation from gambling outcomes. The routing fabric makes the **destination replaceable**.

PLAYGRID is therefore not hard-wired to Golem, BOINC, mining, a laboratory, a data center, or one economic model.

```text
USER
  ↓
ComputeConsentGate
  ↓
Compute Scheduler
(consent + device policy + provider capacity)
  ↓
ProviderRegistry + RoutingPlan
  ↓
┌─────────┬────────────┬────────────┬──────────┬─────────┐
│ SCIENCE │ MARKETPLACE│ DATACENTER │ OPERATOR │ CUSTOM  │
└─────────┴────────────┴────────────┴──────────┴─────────┘
  ↓
Authoritative Receipt
  ↓
Impact / Player Compute Earnings / Compute Treasury / audited contract sink
```

## Stable compute task types

- `SCIENCE_WORK_UNIT`
- `ECONOMIC_COMPUTE_JOB`
- `POW_SHARE` (legacy/specialized PoW adapter class)

The game surface never needs provider-specific logic in order to choose a route.

## Routing fabric

`router.js` adds:

- `ProviderRegistry`
- `ProviderManifest`
- `RoutingPlan`
- weighted multi-provider allocations
- deterministic scheduler-side provider selection
- route decisions with `game_effect: NONE`

Provider classes:

- `SCIENCE`
- `PUBLIC_GOOD`
- `MARKETPLACE`
- `TREASURY`
- `DATACENTER`
- `OPERATOR`
- `CUSTOM`

Reference manifests live in `providers/`.

A new provider requires:

```text
ProviderManifest
+ server-side adapter
+ authoritative receipt verifier
+ sink/accounting policy
```

—not changes to RNG, RTP, wager or bonus code.

See `OPERATOR_HANDOFF_SPEC.json` and `../../docs/PLAYGRID_AMORPHOUS_ROUTING_FABRIC.md`.

## HELIOS-style systems analogy

The architecture behaves like a routing station: the available resource source is separate from its destination. A licensed operator can redirect approved compute to a different admitted provider or use a weighted routing plan.

The routing decision belongs to the compute scheduler. It may **not** use spin result, stake, win/loss, balance, RTP, bonus state, near-miss state or player-risk signals as routing weights.

## Golem adapter

Golem remains a useful reference route, not the architecture itself:

```text
Telegram/Web control surface
        ↓
PLAYGRID Gateway
        ↓
Yagna / Golem
        ↓
Requestor workload
        ↓
Agreement / Activity / Invoice / Payment evidence
        ↓
GOLEM_PAYMENT_RECEIPT
```

The browser never stores a Yagna app-key or wallet private material.

## Player / public value

Verified receipts can route value independently:

```text
SCIENCE_UPSTREAM_RECEIPT
  → IMPACT_LEDGER

ECONOMIC / GOLEM RECEIPT
  → PLAYER_COMPUTE_EARNINGS_LEDGER
  + COMPUTE_TREASURY

BUYER-DEFINED VERIFIED RECEIPT
  → CONTRACT_DEFINED_AUDITED_SINK
```

Player compute earnings cannot automatically become gambling balance, free spins, better odds, improved RTP or personal jackpot weight.

## Non-negotiable invariants

1. Explicit opt-in before compute.
2. Immediate revoke.
3. Battery/thermal/user-pause fail closed.
4. CPU cap policy (current reference target <=30%).
5. No game-coupling fields in tasks, receipts, manifests or routing plans.
6. No secrets in public provider manifests/browser config.
7. Unverified receipts have zero ledger value.
8. Mock receipts are simulation-only.
9. Compute and route destination cannot alter RNG/RTP/odds/bet/bonus/jackpot weighting.
10. Compute scheduling and routing are independent of spin frequency.
11. Compute-only mode remains possible.
12. Economic compute accounting remains separate from gambling accounting.

## Tests

Package test command:

```bash
npm test
```

It runs:

- `tests/compute-protocol.test.mjs`
- `tests/router.test.mjs`

The core v0.2 compute-protocol suite was executed locally after the Golem/economic-allocation changes and passed. The new routing-fabric suite has been added; CI/local execution of that new suite remains an explicit open verification gate until recorded by an actual runner.

## Production gates

- signed provider manifests and expiry/revocation;
- server-side signature + anti-replay model;
- real Golem/Yagna route;
- real scientific Requestor route;
- real data-center/operator adapter examples;
- energy/thermal telemetry;
- receipt/settlement reconciliation;
- neutral protocol repository;
- non-money pilot;
- independent legal, gambling, crypto/payment, privacy and security review before regulated deployment.
