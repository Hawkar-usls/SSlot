# SSlot Compute-Gateway Partnership Brief

> Working title. Public evaluation prototype; not a production gambling service.

## The proposal

SSlot explores a new infrastructure primitive for interactive gaming: a **compute gateway that is separable from the game RNG and payout mathematics**.

A regulated game can remain a conventional regulated game. Separately, an eligible game/session event can create a signed compute request or compute-credit receipt that is routed to an approved workload provider, data center, operator-owned cluster, or public-interest compute project.

```text
PLAYER / TELEGRAM WEBAPP
          |
          v
    GAME EVENT LAYER
          |-----------------------> REGULATED RNG / PAYOUT
          |
          +-----------------------> COMPUTE GATEWAY
                                      |
                                      +--> approved workload
                                      +--> data-center / cloud resource
                                      +--> proof / receipt / audit log
```

**Invariant:** compute completion, compute speed, device power, or workload result must never select or alter RNG outcome, odds, payout, bonus eligibility, or return-to-player mathematics.

## Why this is different

Most gaming infrastructure monetizes only entertainment transactions. The proposed gateway gives an operator a second, independently auditable systems layer capable of transforming already-existing digital activity into useful compute demand or a measurable compute contribution.

The architecture can support several lanes without changing the core game:

1. **Commercial compute lane** — operator/partner purchases or routes approved batch compute through a data-center partner.
2. **Public-good lane** — a capped compute credit is assigned to an approved scientific/public-interest workload.
3. **Shared-value lane** — independently accounted compute economics can support a separately regulated promotional/jackpot mechanism, where lawful.
4. **Operator-owned lane** — non-sensitive internal workloads can be routed to operator-controlled infrastructure.

The public browser prototype demonstrates the interaction shell and Telegram WebApp compatibility. A production integration would replace the local simulation with authenticated server APIs, signed receipts, auditable accounting, approved RNG/payment systems, and jurisdiction-specific controls.

## Server-side first

The preferred production design is **server-side compute routing**, not hidden client mining. Telegram/WebView/mobile clients are poor candidates for uncontrolled sustained compute and should not be treated as free hardware.

If optional client-device computation is ever offered, it must be explicit opt-in, clearly resource-disclosed, capped, pausable, immediately stoppable, and independently reviewed for platform-policy, security, battery/thermal, privacy, and regulatory compliance.

## Data-center value

For a data-center/cloud partner, the gateway can provide:

- aggregated, measurable demand originating from a large interactive platform;
- workload scheduling with explicit capacity and cost ceilings;
- auditable task IDs, output hashes, timestamps, and provider attestations;
- load shaping by geography/time/resource class;
- a new B2B acquisition channel through gaming operators and aggregators;
- optional public-interest/CSR workloads with independently reportable compute contribution.

This is not a claim that all workloads are economical on every infrastructure class. CPU/GPU workload fit, latency, egress, energy, verification, and pricing must be benchmarked per partner.

## Operator / aggregator value

Potential operator value is not limited to another slot skin:

- a reusable infrastructure capability across many titles;
- a differentiated product story that does not require changing certified RNG logic;
- verifiable impact/compute reporting;
- optional B2B revenue-share or sponsorship models around compute capacity;
- compatibility with aggregation architecture rather than one isolated game;
- a natural route to scientific/public-good campaigns without claiming that gambling itself is socially beneficial.

## Responsible-gaming boundary

The JANUS Addictive Engagement Index (J-AEI) currently models **Gambling disorder at 82.2/100 (EXTREME; model interval 74–90)**. This is a synthetic evidence-anchored model output, **not prevalence and not a probability that a player will become addicted**.

Source: `Hawkar-usls/janus-meta-registry/data/AI-LOVER-ADDICTIVE-ENGAGEMENT-INDEX-2026-08-24-v1.0.json`.

That high-risk classification is a reason to make the compute layer safer, not a reason to extract more engagement. The production gate should therefore enforce:

- no compute contribution proportional to player losses;
- no contribution multiplier based on stake size;
- no “play longer to help more” reinforcement mechanic;
- hard per-session/per-time contribution caps;
- no change to RNG or payout based on compute contribution;
- responsible-gaming limits remain authoritative over any compute campaign;
- transparent reporting that distinguishes wagering, promotional value, and compute value.

## Initial scale model

A first-pass compute-economics model should be based on **eligible events**, not on addiction prevalence:

```text
annual_compute_budget
  = eligible_events_per_day
  × compute_credit_per_event
  × 365
```

Illustrative planning scenarios for **1,000,000 eligible events/day**:

| Compute credit per eligible event | Daily compute budget | Annual compute budget |
|---:|---:|---:|
| $0.0001 | $100 | $36,500 |
| $0.001 | $1,000 | $365,000 |
| $0.01 | $10,000 | $3,650,000 |

These are configuration examples, **not forecasts of revenue, profit, player losses, or jackpot size**. Real figures require operator event volumes, workload benchmarks, cloud/data-center pricing, regulation, fraud assumptions, and accounting design.

For optional client compute, an energy planning identity is:

```text
monthly_energy_kWh
  = opted_in_devices
  × average_compute_watts
  × active_hours_per_day
  × days
  × duty_cycle
  / 1000
```

Example: 100,000 opted-in devices × 10 W × 0.25 h/day × 30 days × 50% duty cycle = **3.75 MWh/month**. This is only a capacity illustration; actual Telegram/mobile/browser feasibility must be benchmarked and may make client compute inappropriate.

## Proof-of-compute receipt

A minimal auditable receipt can include:

- `event_receipt_id`
- `workload_id`
- `provider_id`
- `resource_class`
- `requested_units`
- `started_at`
- `completed_at`
- `input_commitment_hash`
- `output_hash`
- `provider_attestation`
- `compute_credit`
- `game_rng_receipt_id` as a **reference only**, never as a source of randomness

## Pilot

A clean pilot needs only four parties/modules:

```text
DEMO GAME
   + OPERATOR / AGGREGATOR SANDBOX
   + COMPUTE PROVIDER
   + AUDIT / RECEIPT STORE
```

Success is measured by separation, auditability, workload economics, latency overhead, abuse resistance, and responsible-gaming compliance — not by increased time-on-device.

See also: [`LICENSE.md`](LICENSE.md) and [`IP_NOTICE.md`](IP_NOTICE.md).
