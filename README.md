<div align="center">

# SSlot
### Interactive Gaming × Verifiable Compute Gateway Prototype

![Status](https://img.shields.io/badge/status-active%20prototype-2ea043)
![Class](https://img.shields.io/badge/class-compute--gateway%20demo-8250df)
![License](https://img.shields.io/badge/license-evaluation%20only-d29922)

</div>

## Try the compute-layer demo

**GitHub Pages surface:** [`playgrid.html`](playgrid.html)

It wraps the existing slot prototype with the proposed PLAYGRID / GRIDJACK shared-value compute controls: explicit opt-in, CPU cap, immediate revoke, visible simulated receipts, a Golem provider path, and a separate Compute Treasury model.

## Status

**Active public prototype / partnership demo.** SSlot is a Telegram WebApp-compatible slot-style interaction shell used to explore a separable compute-gateway architecture.

The current public build uses **local browser simulation** for balance/pool/game state. It is **not a real-money casino, payment service, certified RNG deployment, mining service, or production gambling system**.

```text
MATURITY = WORK_IN_PROGRESS
PROJECT_CLASS = INTERACTIVE_GAMING_COMPUTE_GATEWAY_PROTOTYPE
TELEGRAM_WEBAPP = TRUE
REAL_MONEY_GAMBLING = FALSE
CURRENT_VALUE_STORAGE = LOCAL_SIMULATION_ONLY
USEFUL_COMPUTE_GATEWAY = PUBLIC_DEMO / PARTNERSHIP_PILOT_STAGE
GOLEM_PROVIDER_MODEL = ADDED
PRODUCTION_READINESS = NOT_ESTABLISHED
```

## Concept

The proposed architecture keeps conventional game mathematics and useful computation separate:

```text
GAME / TELEGRAM WEBAPP
          |
          +----------------------> REGULATED RNG / PAYOUT
          |
          +----------------------> PLAYGRID COMPUTE GATEWAY
                                     |
                                     +--> Golem / approved compute market
                                     +--> public-interest/scientific workload
                                     +--> proof / receipt / audit
                                     +--> player compute earnings ledger
                                     +--> shared Compute Treasury
```

**Core invariant:** compute completion, compute speed, workload output, or device power must never change RNG outcome, payout, odds, bonus eligibility, or RTP mathematics.

The preferred production model is a server-side/approved-companion gateway. Hidden client mining is explicitly outside the intended design. Optional client computation requires clear opt-in, resource disclosure/caps, immediate stop controls, and separate security/platform/regulatory review.

## Golem lane

The Golem-specific model is intentionally short:

```text
CONSENT
  ↓
PLAYGRID GATEWAY
  ↓
YAGNA / GOLEM PROVIDER
  ↓
REAL REQUESTOR WORKLOAD
  ↓
AGREEMENT / ACTIVITY / INVOICE / PAYMENT
  ↓
VERIFIED COMPUTE RECEIPT
  ↓
PLAYER COMPUTE EARNINGS + COMPUTE TREASURY
```

See [`.janus/PLAYGRID_GOLEM_MODEL.json`](.janus/PLAYGRID_GOLEM_MODEL.json).

Player compute earnings are separate from gambling balance. They must not automatically buy spins, improve odds, alter RTP, or change personal jackpot weighting.

## Why it may matter

Instead of treating a slot as an isolated content title, SSlot explores whether an operator or aggregator can expose a reusable **compute infrastructure layer** across multiple games. That layer can create auditable demand for approved distributed/data-center resources and support separately accounted shared-value mechanics without contaminating certified RNG logic.

See the detailed architecture, economics examples, responsible-gaming boundary, and pilot model in [`PARTNERSHIP_BRIEF.md`](PARTNERSHIP_BRIEF.md).

## Responsible-gaming boundary

This project does **not** propose increasing losses, stakes, or time-on-device to generate more compute. Compute contribution is governed by consent/device policy rather than spin count and must be decoupled from loss amount and stake size. Responsible-gaming controls remain authoritative.

## Evaluation & IP

- [`LICENSE.md`](LICENSE.md) — public-demo evaluation license; no production/commercial license is granted.
- [`IP_NOTICE.md`](IP_NOTICE.md) — copyright / public-private boundary and production-sensitive material guidance.
- [`PROJECT_STATUS.json`](PROJECT_STATUS.json) — machine-readable maturity and deployment boundary.

Publication on GitHub is not a claim that the underlying business/technical method is patented or patent-pending. Commercial deployment requires a separate written agreement and independent legal, regulatory, security, and platform-policy review.
