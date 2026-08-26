# JANUS Welfare-First Compute Protocol v0.3 + PLAYGRID Routing Fabric v0.1

PLAYGRID separates voluntary computation from gambling outcomes and makes the compute destination replaceable.

## Stable architecture

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
SCIENCE / PUBLIC_GOOD / MARKETPLACE / TREASURY / DATACENTER / OPERATOR / CUSTOM
  ↓
Authoritative Receipt
  ↓
Impact / General Compute / Player Compute Earnings / Compute Treasury / audited contract sink
```

## Task types

- `SCIENCE_WORK_UNIT` — specialized verified science work;
- `GENERAL_COMPUTE_JOB` — neutral arbitrary approved workload: batch, rendering, analysis, data-center/operator work or a future class not known today;
- `ECONOMIC_COMPUTE_JOB` — work with explicit verified economic settlement, including the Golem reference route;
- `POW_SHARE` — specialized legacy/optional proof-of-work route.

The existence of `GENERAL_COMPUTE_JOB` is deliberate: a buyer must not have to pretend that an arbitrary workload is scientific, mining or marketplace work just to fit the protocol.

## Routing fabric

`router.js` provides:

- `ProviderRegistry`;
- validated `ProviderManifest` objects;
- single or weighted `RoutingPlan` objects;
- deterministic scheduler-side provider selection;
- fail-closed route decisions;
- hard-coded `game_event_weighting = FORBIDDEN`;
- secret-field rejection for public manifests/policies.

A new destination needs:

```text
ProviderManifest
+ server adapter
+ authoritative receipt verifier
+ sink/accounting policy
```

—not changes to RNG, RTP, wager, bonus or risk-control code.

Reference manifests are under `providers/` for science, public good, Golem, treasury, data center, operator and future custom routes.

## Golem is a reference route

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

The browser never stores a Yagna app key or wallet private material.

## Sinks

Verified work can be routed to an allowed ledger/sink:

- `IMPACT_LEDGER`
- `GENERAL_COMPUTE_LEDGER`
- `PLAYER_COMPUTE_EARNINGS_LEDGER`
- `COMPUTE_TREASURY`
- `CONTRACT_DEFINED_AUDITED_SINK`

`GAMBLING_BALANCE` is deliberately not an allowed sink. Player compute earnings cannot automatically become wagers, free spins, better odds, improved RTP or personal jackpot weight.

## Non-negotiable invariants

1. Explicit opt-in before compute.
2. Immediate revoke.
3. Battery/thermal/user-pause fail closed.
4. CPU cap policy; current reference target <=30%.
5. No game-coupling fields in tasks, receipts, manifests or routing plans.
6. No provider secrets in browser/public manifests.
7. Unverified receipts have zero ledger value.
8. Mock receipts are simulation-only.
9. Compute destination/value cannot alter RNG/RTP/odds/bet/bonus/jackpot weighting.
10. Compute scheduling/routing are independent of spin frequency and outcome.
11. Compute-only participation remains possible.
12. Economic and gambling accounting remain separate.

## Tests

`npm test` runs the core protocol and routing-fabric suites.

The earlier v0.2 core suite was actually executed locally and passed before the generalized v0.3/router changes. The **current v0.3 core suite and routing suite are present but still require an actual runner/CI execution before their result may be called PASS**.

## Production gates

- execute and record v0.3 + router tests;
- signed provider manifests with expiry/revocation;
- server-side signatures + anti-replay;
- real Golem/Yagna route;
- real scientific Requestor route;
- real generic data-center/operator adapter;
- energy/thermal telemetry;
- receipt/settlement reconciliation;
- neutral protocol repository;
- non-money pilot;
- independent legal, gambling, payment/crypto, privacy and security review before regulated deployment.
