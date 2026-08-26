# SSlot Welfare-First Constitution

SSlot is being redesigned as a **welfare-first slot reference implementation**. The project may explore real-money-compatible architecture, but it must never optimize revenue by increasing loss of control, chasing, confusion, or gambling intensity.

## Prime invariant

> If a product change increases operator value primarily because a player loses more control, the change fails review.

Commercial success is subordinate to player welfare, truthful presentation, legal eligibility, and auditable game fairness.

## Non-negotiable gates

1. **No adaptive or personalized RTP.** The same published game mathematics applies to all eligible players in a jurisdiction/version.
2. **No near-miss engineering.** Reel timing, animation, sound, vibration, or symbol placement must not be changed because a losing result was “almost” a win.
3. **No autoplay, turbo, quick-spin, slam-stop, or concealed rapid repeat.** A player must initiate each paid round deliberately.
4. **No losses disguised as wins.** If payout <= stake, the UI must not celebrate it as a win. Session UI must show net position, elapsed time, total staked, and total returned.
5. **No loss-chasing incentives.** No cashback, VIP progression, reload bonus, mission, streak, or reward may scale with losses or wager volume.
6. **No paid feature-buy by default.** Any future jurisdiction-specific feature-buy requires separate legal/risk approval and must not bypass the welfare gates.
7. **Limits are first-class controls.** Lower limits apply immediately. Limit increases require a cooling-off delay and may be refused by risk controls.
8. **Risk detection can only reduce gambling capability.** Risk signals may trigger friction, cooling-off, limits, or exclusion; they may never trigger promotions, higher stakes, bonuses, or re-engagement messaging.
9. **Self-exclusion is irreversible for its chosen duration.** No marketing, bonus, or gameplay workaround may bypass it.
10. **Demo-first.** Non-money play is the default development and evaluation mode. Real-money deployment remains blocked until age/KYC, jurisdiction, payments, security, AML, fairness certification, and responsible-gambling review are independently satisfied.
11. **No moral or spiritual pressure.** Mythic, religious, charitable, or community framing must never imply that wagering, losing money, or continuing play is virtuous, redemptive, generous, or socially required.
12. **Impact is operator-funded, not a moral offset for player losses.** Any public-benefit allocation is taken from operator/platform revenue under a predeclared accounting rule and reported separately from player-facing game outcomes.

## Welfare-first product metrics

Allowed primary metrics include:

- voluntary session completion;
- limit adoption and successful limit adherence;
- self-exclusion and cooling-off effectiveness;
- reduction in loss-chasing signals;
- accuracy and timeliness of risk interventions;
- fairness/audit pass rate;
- player comprehension of RTP, volatility, session net result, and limits;
- percentage and amount of operator-funded public-benefit allocation;
- complaints resolved without increasing gambling intensity.

The following must **not** be primary optimization targets:

- ARPU/LTV derived from increased losses;
- time-on-device;
- spins per minute;
- deposit frequency;
- stake escalation;
- reactivation after a harmful-play signal;
- loss recovery attempts.

## Shared architecture

SSlot is the **reference game client and mathematics surface**. `DIVINE_REALM` is a separate narrative/theme surface. Both must consume the same welfare, fairness, accounting, and audit contracts. A theme may change art, story, sound, and non-coercive presentation; it may not alter RTP, RNG, limits, eligibility, risk decisions, or accounting.

## Evidence and audit

Every production-relevant build should be able to produce an audit package containing:

- immutable game/version identifier;
- published paytable and theoretical RTP calculation;
- RNG implementation/version and certification reference;
- session safety configuration;
- limit and intervention events;
- player-visible session accounting;
- public-benefit accounting rule and ledger commitments;
- automated tests proving prohibited mechanics are absent.

## Current migration targets

The legacy prototype currently contains mechanics that must be removed or neutralized before any serious deployment path: outcome-sensitive teaser/near-miss presentation, bonus auto-spins, feature-buy flow, simulated social-proof ticker, and pool-dependent outcome shaping. The welfare-first branch exists to replace those patterns rather than refine them.
