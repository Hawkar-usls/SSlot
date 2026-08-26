# JANUS Welfare-First Compute Protocol v0.1

Shared executable contract for the paired `SSlot` and `DIVINE_REALM` compute architecture.

## Purpose

The protocol separates voluntary device computation from gambling outcomes.

Two lanes are supported:

- `SCIENCE_WORK_UNIT` -> verified contribution -> `IMPACT_LEDGER`
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
  +--> ScienceAdapter --> upstream science project
  |
  +--> MiningAdapter  --> upstream mining pool
  |
  v
ComputeReceipt (UNVERIFIED)
  |
  v
ReceiptVerifier
  |
  +--> SCIENCE --> Impact Ledger
  |
  +--> POW -----> Compute Treasury
```

## Non-negotiable invariants

1. No computation before explicit opt-in.
2. Consent can be revoked immediately.
3. Battery/thermal/user-pause gates are fail-closed.
4. CPU use is capped by policy; v0.1 default design target is <=30%.
5. Compute tasks and receipts cannot contain wager/outcome coupling fields.
6. A receipt is untrusted until server-side/upstream verification succeeds.
7. Mock receipts are accepted only when `ReceiptVerifier({ simulation: true })` is explicitly enabled.
8. Science contribution cannot alter personal RNG, RTP, win probability, payout multiplier or free-spin entitlement.
9. Mining contribution cannot alter personal RNG, RTP, win probability or personal jackpot weight.
10. Compute participation is optional and a compute-only mode must remain possible.

## Why compute is NOT bound to a spin

A spin may visualize current background work, but it must not start extra compute merely to encourage more wagering. The compute scheduler should be governed by consent, resource limits and device state, not by gambling frequency.

This avoids the feedback loop:

```text
MORE SPINS -> MORE COMPUTE -> MORE REWARD -> MORE SPINS
```

Instead:

```text
CONSENT + DEVICE POLICY -> COMPUTE
COMPUTE -> VERIFIED CONTRIBUTION
GAME -> READ-ONLY PUBLIC STATUS
```

## Production proof kinds

The v0.1 verifier reserves these proof classes:

- science: `SCIENCE_UPSTREAM_RECEIPT`
- mining: `POOL_SHARE_ACCEPTANCE`

The exact cryptographic/upstream validation rules are intentionally not faked in v0.1. Real adapters must provide evidence from the authoritative upstream project/pool and server-side verification must bind that evidence to the task and consent session.

## Prototype

`protocol.js` is dependency-free ESM so it can be exercised from Node and later loaded by browser builds.

Run the invariant suite from a checkout with a current Node runtime:

```bash
node shared/compute-protocol/tests/compute-protocol.test.mjs
```

## Next gates

- extract the shared package into a neutral dedicated repository when repository-creation tooling/workflow is available;
- add JSON Schema documents for consent/task/receipt;
- implement signed consent envelopes without placing secrets in the browser;
- add a BOINC/Folding-compatible upstream adapter after confirming the chosen project's supported integration path;
- add a mining-pool adapter after legal/economic review;
- add energy/thermal accounting;
- add a read-only UI status component to both slot surfaces;
- keep real-money deployment blocked until independent gambling, crypto, security and privacy review is complete.
