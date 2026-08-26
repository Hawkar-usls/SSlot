<div align="center">

# SSlot
### Interactive Gaming × PLAYGRID Amorphous Compute Router

![Status](https://img.shields.io/badge/status-active%20prototype-2ea043)
![Class](https://img.shields.io/badge/class-amorphous%20compute%20router-8250df)
![License](https://img.shields.io/badge/license-evaluation%20only-d29922)

</div>

## Try the compute-layer demo

**Public surface:** [`playgrid.html`](playgrid.html)

It wraps the existing Telegram/Web slot with a **route-switchable PLAYGRID layer**: explicit opt-in, CPU cap, immediate revoke, visible simulated receipts and a selector that can redirect the compute model between Golem, science/public-good work, a data center/cloud, an operator workload, or a future buyer-defined provider.

## Core product idea

SSlot is not intended to be hard-wired to Golem, mining, BOINC, one laboratory, one cloud, or one jackpot backend.

```text
PLAYER CONSENT + DEVICE POLICY
            ↓
       PLAYGRID ROUTER
            ↓
   ┌────────┼─────────┬──────────┬─────────┐
   ↓        ↓         ↓          ↓         ↓
SCIENCE   GOLEM    DATACENTER  OPERATOR  CUSTOM
   │        │         │          │         │
   └────────┴─────────┴──────────┴─────────┘
            ↓
      VERIFIED RECEIPT
            ↓
   IMPACT / PLAYER EARNINGS /
       COMPUTE TREASURY
```

The sellable primitive is the routing layer. A licensed buyer replaces `ProviderManifest + server adapter + receipt verifier + sink policy`; the slot and game mathematics do not need to be rewritten.

## Status

The current public build uses **local browser simulation** for balance/pool/game state and compute receipts. It is **not a real-money casino, payment service, certified RNG deployment, mining service, Golem mainnet provider, or production gambling system**.

```text
MATURITY = WORK_IN_PROGRESS
TELEGRAM_WEBAPP = TRUE
PLAYGRID_ROUTING_FABRIC = PUBLIC_DEMO
DEFAULT_ROUTE = GOLEM_MARKETPLACE_MODEL
ALTERNATE_ROUTES = SCIENCE / DATACENTER / OPERATOR / CUSTOM
REAL_MONEY_GAMBLING = FALSE
CURRENT_VALUE_STORAGE = LOCAL_SIMULATION_ONLY
PRODUCTION_READINESS = NOT_ESTABLISHED
```

## Golem is one route, not the architecture

```text
CONSENT
  ↓
PLAYGRID GATEWAY
  ↓
YAGNA / GOLEM
  ↓
REAL REQUESTOR WORKLOAD
  ↓
VERIFIED PAYMENT / RECEIPT
  ↓
PLAYER COMPUTE EARNINGS + COMPUTE TREASURY
```

A different buyer may point the same router to a research Requestor, a cloud/data-center workload, approved operator compute, or a future provider class.

## Welfare / fairness boundary

Compute is scheduled from **consent + device policy + provider capacity**, not from spin frequency. Compute completion, speed, workload output, device power, destination or value must never change RNG outcome, payout, odds, bonus eligibility, RTP, bet size or personal jackpot weighting.

Player compute earnings are separate from gambling balance and must not automatically buy wagers or free spins.

## Security boundary

The browser/Telegram surface is the control and visualization plane. Provider credentials, wallet private material, Yagna app keys, settlement secrets and production anti-fraud logic belong server-side and must not be embedded in the client.

## Documents

- [`PARTNERSHIP_BRIEF.md`](PARTNERSHIP_BRIEF.md)
- [`LICENSE.md`](LICENSE.md)
- [`IP_NOTICE.md`](IP_NOTICE.md)
- [`PROJECT_STATUS.json`](PROJECT_STATUS.json)

The stricter executable compute protocol and provider-routing fabric are maintained on the `welfare-first-v0.1` engineering branch pending production gates.

Commercial deployment requires a separate written agreement and independent legal, regulatory, security, provider, privacy, energy/thermal and responsible-gaming review.
