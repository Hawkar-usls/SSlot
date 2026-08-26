<div align="center">

# SSlot
### Interactive Gaming × Verifiable Compute Gateway Prototype

![Status](https://img.shields.io/badge/status-active%20prototype-2ea043)
![Class](https://img.shields.io/badge/class-compute--gateway%20demo-8250df)
![License](https://img.shields.io/badge/license-evaluation%20only-d29922)

</div>

## Status

**Active public prototype / partnership demo.** SSlot is a Telegram WebApp-compatible slot-style interaction shell used to explore a separable compute-gateway architecture.

The current public build uses **local browser simulation** for balance/pool/game state. It is **not a real-money casino, payment service, certified RNG deployment, mining service, or production gambling system**.

```text
MATURITY = WORK_IN_PROGRESS
PROJECT_CLASS = INTERACTIVE_GAMING_COMPUTE_GATEWAY_PROTOTYPE
TELEGRAM_WEBAPP = TRUE
REAL_MONEY_GAMBLING = FALSE
CURRENT_VALUE_STORAGE = LOCAL_SIMULATION_ONLY
USEFUL_COMPUTE_GATEWAY = DESIGN / PARTNERSHIP_PILOT_STAGE
PRODUCTION_READINESS = NOT_ESTABLISHED
```

## Concept

The proposed architecture keeps conventional game mathematics and useful computation separate:

```text
GAME / TELEGRAM WEBAPP
          |
          +----------------------> REGULATED RNG / PAYOUT
          |
          +----------------------> COMPUTE GATEWAY
                                     |
                                     +--> approved data-center/cloud workload
                                     +--> public-interest/scientific workload
                                     +--> signed proof / receipt / audit
```

**Core invariant:** compute completion, compute speed, workload output, or device power must never change RNG outcome, payout, odds, bonus eligibility, or RTP mathematics.

The preferred production model is server-side routing or sponsored compute credits. Hidden client mining is explicitly outside the intended design. Any optional client computation would require clear opt-in, resource disclosure/caps, immediate stop controls, and separate security/platform/regulatory review.

## Why it may matter

Instead of treating a slot as an isolated content title, SSlot explores whether an operator or aggregator can expose a reusable **compute infrastructure layer** across multiple games. That layer can create auditable demand for approved data-center resources, sponsor useful computation, or support separately regulated shared-value mechanics without contaminating certified RNG logic.

See the detailed architecture, economics examples, responsible-gaming boundary, and pilot model in [`PARTNERSHIP_BRIEF.md`](PARTNERSHIP_BRIEF.md).

## Responsible-gaming boundary

This project does **not** propose increasing losses, stakes, or time-on-device to generate more compute. Compute contribution should be capped and decoupled from loss amount and stake size. Responsible-gaming controls remain authoritative.

## Evaluation & IP

- [`LICENSE.md`](LICENSE.md) — public-demo evaluation license; no production/commercial license is granted.
- [`IP_NOTICE.md`](IP_NOTICE.md) — copyright / public-private boundary and production-sensitive material guidance.
- [`PROJECT_STATUS.json`](PROJECT_STATUS.json) — machine-readable maturity and deployment boundary.

Publication on GitHub is not a claim that the underlying business/technical method is patented or patent-pending. Commercial deployment requires a separate written agreement and independent legal, regulatory, security, and platform-policy review.
