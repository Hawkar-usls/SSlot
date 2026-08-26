<div align="center">

# SSlot
### Shared Mining-Pool / Compute-Treasury Jackpot Child of JANUS HELIOS

![Status](https://img.shields.io/badge/status-active%20prototype-2ea043)
![Class](https://img.shields.io/badge/class-specialized%20treasury%20child-8250df)
![License](https://img.shields.io/badge/license-evaluation%20only-d29922)

</div>

## Product role

SSlot is **not** the universal router anymore. Its role is deliberately fixed:

```text
PLAYER CONSENT + DEVICE POLICY
            ↓
          SSlot
            ↓
approved mining / economic compute provider
            ↓
verified share / revenue receipt
            ↓
      COMPUTE TREASURY
            ↓
aggregate jackpot / reserve model
```

The universal route-switchable product lives in [`JANUS HELIOS`](https://github.com/Hawkar-usls/Janus-HELIOS).

## Public compute demo

**Surface:** [`playgrid.html`](playgrid.html)

The overlay now exposes one specialized route only: `TREASURY`. It models verified shared mining/economic compute flowing into a separate Compute Treasury. It does not let the player redirect SSlot to science, data-center, operator or custom workloads; that flexibility belongs to HELIOS.

## Ecosystem

```text
JANUS HELIOS
   universal configurable parent
          │
          ├── DIVINE_REALM
          │     fixed Science/Public-Good child
          │
          └── SSlot
                fixed Shared Mining-Pool/Jackpot child
```

Canonical ecosystem contract: [`Janus-HELIOS/.janus/HELIOS_ECOSYSTEM.json`](https://github.com/Hawkar-usls/Janus-HELIOS/blob/main/.janus/HELIOS_ECOSYSTEM.json).

Local binding: [`.janus/HELIOS_PARENT_BINDING.json`](.janus/HELIOS_PARENT_BINDING.json).

## Hard boundary

Compute revenue may fund an **aggregate** treasury/jackpot reserve, but a player's own compute contribution must not change that player's:

```text
RNG
RTP
win probability
bet size
bonus eligibility
personal jackpot weight
```

Compute scheduling is based on consent + device policy + provider capacity, not on spin frequency or losses. Player compute value and wagering balance remain separately accounted.

## Status

The current public build is local simulation only. It is not a real-money casino, production mining service, certified RNG deployment or real provider settlement system.

```text
MATURITY = WORK_IN_PROGRESS
TELEGRAM_WEBAPP = TRUE
HELIOS_ROLE = FIXED_TREASURY_CHILD
PUBLIC_ROUTE_SWITCHING = FALSE
DEFAULT_ROUTE = TREASURY
TASK_TYPES = POW_SHARE / ECONOMIC_COMPUTE_JOB
REAL_MONEY_GAMBLING = FALSE
REAL_UPSTREAM_PROVIDER = NOT_CONNECTED
PRODUCTION_READINESS = NOT_ESTABLISHED
```

## Documents

- [`PARTNERSHIP_BRIEF.md`](PARTNERSHIP_BRIEF.md)
- [`LICENSE.md`](LICENSE.md)
- [`IP_NOTICE.md`](IP_NOTICE.md)
- [`PROJECT_STATUS.json`](PROJECT_STATUS.json)

The stricter executable compute protocol remains on the `welfare-first-v0.1` engineering branch pending provider, verification, telemetry, security and legal gates.
