# PLAYGRID / GRIDJACK — Partnership Brief

> Public evaluation prototype. Not a production gambling, payment, or Golem mainnet service.

## One-line proposal

**Add an opt-in, independently verifiable compute economy beside conventional game logic without letting compute alter RNG, RTP, payouts, stakes, bonuses, or personal jackpot odds.**

## Architecture

```text
PLAYER / TELEGRAM WEBAPP
          |
          +-----------------------> GAME / RNG / PAYOUT
          |
          +--> EXPLICIT CONSENT + DEVICE POLICY
                         |
                         v
                  PLAYGRID GATEWAY
                         |
                  approved provider
                         |
              verified work / receipt
                         |
             +-----------+-----------+
             |                       |
 PLAYER COMPUTE EARNINGS       COMPUTE TREASURY
```

The compute scheduler is driven by **consent, resource caps, thermal/battery policy and available workload — not by spin count, stake size, losses or session intensity**. The game can display compute status but does not create more compute merely because the player wagers more.

## Golem fit

```text
PLAYGRID Gateway
      ↓
Yagna / Golem Provider
      ↓
real Requestor workload
      ↓
Agreement / Activity / Invoice / Payment
      ↓
GOLEM_PAYMENT_RECEIPT
      ↓
player compute earnings + shared treasury
```

The browser is the control/status plane. Yagna credentials stay server-side or in an approved companion process.

Golem is attractive because economic value can come from **real requested computation**, rather than requiring the shared-value lane to be only cryptocurrency mining.

## Player proposition

The user is told clearly before activation:

- compute is OFF by default;
- what resource limit is requested;
- it can be stopped immediately;
- compute does not improve gambling odds;
- verified compute value is accounted separately from wagers;
- a public predeclared formula may split verified compute value between the player and a shared treasury.

Player compute earnings must not automatically become gambling balance, free spins or a wagering incentive.

## Operator / aggregator proposition

One integration boundary can support multiple approved compute providers while certified game math stays untouched. This can provide:

- a reusable platform capability across many games;
- a new shared-value/economic lane;
- independently auditable compute receipts;
- a player benefit that is earned from compute rather than from losing money;
- optional public-good/scientific campaigns through the paired DIVINE_REALM lane.

## Risk context

JANUS' internal `JANUS_ADDICTIVE_ENGAGEMENT_INDEX` models **Gambling disorder = 82.2/100, EXTREME, model interval 74–90, evidence confidence MODERATE_HIGH**. This is a synthetic evidence-anchored model output — **not prevalence and not a probability that an individual player becomes addicted**.

Canonical artifact:
`Hawkar-usls/janus-meta-registry/data/AI-LOVER-ADDICTIVE-ENGAGEMENT-INDEX-2026-08-24-v1.0.json`

That risk classification is why PLAYGRID forbids:

```text
losses -> more compute reward
stake size -> more compute reward
more spins -> better compute rate
compute -> better RNG/RTP/jackpot odds
```

## Economics model

The clean first model is based on **verified compute**, not gambling events:

```text
verified_compute_value
  = opted_in_compute_hours
  × accepted_resource_units_per_hour
  × verified_market_value_per_unit
```

Then:

```text
verified_compute_value
  -> PLAYER_COMPUTE_EARNINGS_LEDGER
  +  COMPUTE_TREASURY
```

The split is a policy variable and must be public before compute begins. Any percentages shown in the public demo are illustrative, not forecasts or promised commercial rates.

## Minimal receipt

For a Golem-backed lane, the verification envelope can reference:

- `task_id`
- `consent_id`
- `provider_market = golem`
- `agreement_id`
- `activity_id`
- `invoice_id`
- `payment_status / transaction_reference`
- `gross_compute_value`
- `settlement_asset`
- `verification_status`
- `game_effect = NONE`

## Pilot

The smallest useful pilot is:

```text
PUBLIC SLOT DEMO
 + PLAYGRID GATEWAY
 + GOLEM TESTNET / YAGNA
 + VERIFIED TEST RECEIPT STORE
```

Success criteria: explicit consent, real provider/requestor path, authoritative receipt reconciliation, immediate stop, acceptable resource/energy behavior, and zero authority over game mathematics.

Public demo: [`playgrid.html`](playgrid.html)

Golem model: [`.janus/PLAYGRID_GOLEM_MODEL.json`](.janus/PLAYGRID_GOLEM_MODEL.json)

See also: [`LICENSE.md`](LICENSE.md) and [`IP_NOTICE.md`](IP_NOTICE.md).
