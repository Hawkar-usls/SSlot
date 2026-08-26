# JANUS Welfare-First Compute Protocol v0.2

Shared executable contract for the paired `SSlot` and `DIVINE_REALM` compute architecture.

## Purpose

The protocol separates voluntary device computation from gambling outcomes and now supports a provider-agnostic economic-compute lane in addition to science and legacy PoW.

Supported task types:

- `SCIENCE_WORK_UNIT` -> verified contribution -> `IMPACT_LEDGER`
- `ECONOMIC_COMPUTE_JOB` -> verified economic work -> `PLAYER_COMPUTE_EARNINGS_LEDGER` + `COMPUTE_TREASURY`
- `POW_SHARE` -> verified pool contribution -> `COMPUTE_TREASURY`

The protocol intentionally does **not** define RNG, RTP, wagers, payouts, bonus math or jackpot selection.

## Core flow

```text
USER
  |
  v
ComputeConsentGate
  |
  v
ComputeTask
  |
  +--> ScienceAdapter --------> upstream science project
  |
  +--> EconomicAdapter -------> Golem / approved compute market
  |
  +--> MiningAdapter ---------> approved pool
  |
  v
ComputeReceipt (UNVERIFIED)
  |
  v
ReceiptVerifier
  |
  +--> SCIENCE -------------> Impact Ledger
  |
  +--> ECONOMIC -----------> player compute earnings + Compute Treasury
  |
  +--> POW ----------------> Compute Treasury
```

## Golem adapter

`golem-adapter.js` models the production boundary:

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

The browser never stores a Yagna app-key. The public demo uses simulation/test receipts; production receipts must come from the authoritative gateway/upstream path.

## Player value

`economic-allocation.js` defines a separate compute-value split. Verified economic revenue may be allocated between:

- `PLAYER_COMPUTE_EARNINGS_LEDGER`
- `COMPUTE_TREASURY`

The split must be public and predeclared. Player compute earnings cannot automatically become gambling balance, free spins, better odds, improved RTP, or personal jackpot weight.

## Non-negotiable invariants

1. No computation before explicit opt-in.
2. Consent can be revoked immediately.
3. Battery/thermal/user-pause gates are fail-closed.
4. CPU use is capped by policy; current design target is <=30%.
5. Compute tasks and receipts cannot contain wager/outcome coupling fields.
6. A receipt is untrusted until server-side/upstream verification succeeds.
7. Mock receipts are accepted only when `ReceiptVerifier({ simulation: true })` is explicitly enabled.
8. Science contribution cannot alter personal RNG, RTP, win probability, payout multiplier or free-spin entitlement.
9. Economic/mining contribution cannot alter personal RNG, RTP, win probability or personal jackpot weight.
10. Compute participation is optional and a compute-only mode must remain possible.
11. Compute revenue is accounted separately from gambling revenue.
12. Player compute earnings are not an automatic wagering credit.

## Why compute is NOT bound to a spin

A spin may visualize current background work, but it must not start extra compute merely to encourage more wagering. The compute scheduler is governed by consent, resource limits and device state, not by gambling frequency.

```text
CONSENT + DEVICE POLICY -> COMPUTE
COMPUTE -> VERIFIED CONTRIBUTION
GAME -> READ-ONLY STATUS
```

## Production proof kinds

- science: `SCIENCE_UPSTREAM_RECEIPT`
- general economic compute: `ECONOMIC_UPSTREAM_RECEIPT`
- Golem economic compute: `GOLEM_PAYMENT_RECEIPT`
- mining: `POOL_SHARE_ACCEPTANCE`

The exact cryptographic/upstream validation rules are not faked. Production verification must bind authoritative upstream evidence to the task, consent session and anti-replay state.

## Prototype

The package is dependency-free ESM and can be exercised with Node:

```bash
node shared/compute-protocol/tests/compute-protocol.test.mjs
```

The v0.2 invariant suite has been executed locally after the Golem/economic-allocation changes and passed. CI conformance is still an open gate.

## Next gates

- production server-side signature + anti-replay model;
- real Golem gateway using Yagna without browser-exposed credentials;
- real scientific Requestor/upstream adapter and verification;
- energy/thermal telemetry;
- independent reconciliation of economic receipts and settlements;
- dedicated neutral protocol repository;
- non-money pilot;
- real-money deployment remains blocked until independent gambling, crypto, security, privacy and jurisdictional review is complete.
