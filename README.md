<div align="center">

# SSlot
### Welfare-first slot reference architecture

![Status](https://img.shields.io/badge/status-reactivation%20research-d4a72c)
![Class](https://img.shields.io/badge/class-welfare--first%20game%20R%26D-6e7681)
![Real Money](https://img.shields.io/badge/real--money-blocked%20pending%20review-b62324)

</div>

## Mission

SSlot is being reactivated as a **reference implementation for a slot that is not allowed to improve business performance by making loss of control more profitable**.

The goal is not to make gambling harm look acceptable through charity. The goal is to redesign the product so that fairness, deliberate pacing, truthful session accounting, limits, exclusion, risk intervention, and independently auditable public benefit are architectural invariants.

## Prime invariant

> If a product change increases operator value primarily because a player loses more control, the change fails review.

## Role in the organism

```text
FAIRNESS / RNG / GAME MATH
          ↓
WELFARE & ELIGIBILITY GATE
          ↓
        SSlot
  reference game client
          ↓
     DIVINE_REALM
 narrative + impact surface
          ↓
 PUBLIC IMPACT LEDGER
          ↓
    INDEPENDENT AUDIT
```

SSlot owns the reference game surface and published mathematics. `DIVINE_REALM` may change narrative, art, sound, and non-coercive presentation, but it may not override RNG, RTP, limits, risk actions, accounting, or eligibility.

## Non-negotiable design rules

- no adaptive/personalized RTP;
- no engineered near misses or outcome-sensitive reel timing;
- no autoplay, turbo, quick-spin, or hidden rapid repeat;
- no losses disguised as wins;
- no loss-based VIP, cashback, reload, loyalty, or reactivation mechanics;
- risk detection can only tighten controls, never increase gambling capability;
- lower limits apply immediately; increases require cooling-off;
- self-exclusion cannot be bypassed during its selected period;
- demo/non-money play is the default development mode;
- real-money deployment remains blocked pending independent legal, security, AML, fairness/RNG, privacy, accessibility, and responsible-gambling review.

## Social-impact rule

Public-benefit funding is an **operator/platform allocation**, not a moral reinterpretation of player losses. The accounting rule must be declared in advance, publicly reconcilable, append-only when corrected, and must not count brand marketing as public benefit.

A player must never be told or nudged to believe that losing money, continuing to play, or increasing a wager is charitable, virtuous, necessary, or socially required.

## Current legacy migration

The historical single-file prototype contains mechanics that are explicitly incompatible with the welfare-first target, including outcome-sensitive teaser/near-miss presentation, feature-buy flow, automatic bonus spins, simulated big-win social proof, and pool-dependent outcome shaping. These are migration targets, not product requirements.

## Contracts

- [`WELFARE_FIRST_CONSTITUTION.md`](WELFARE_FIRST_CONSTITUTION.md)
- [`GAMBLING_SAFETY_CONTRACT.json`](GAMBLING_SAFETY_CONTRACT.json)
- [`SOCIAL_IMPACT_LEDGER_SCHEMA.json`](SOCIAL_IMPACT_LEDGER_SCHEMA.json)
- [`PROJECT_STATUS.json`](PROJECT_STATUS.json)

## Current status

```text
MATURITY = REACTIVATION_RESEARCH
REAL_MONEY = BLOCKED_PENDING_INDEPENDENT_REVIEW
WELFARE_FIRST_CONTRACT = ADDED
PUBLIC_IMPACT_LEDGER_SCHEMA = ADDED
LEGACY_GAMEPLAY_MIGRATION = OPEN
PRODUCTION_READINESS = NOT_ESTABLISHED
```

The project remains research/prototype software until all deployment gates are independently satisfied.
