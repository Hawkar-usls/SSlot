# SSlot — Voluntary Compute Treasury Roadmap

## Mission

SSlot becomes the **economic compute layer** of the paired ecosystem.

With explicit, revocable user consent, spare CPU/GPU capacity may participate in a legitimate proof-of-work mining system. Verified mining revenue may flow into a transparent **Compute Treasury** that can fund a common jackpot reserve and/or a platform-wide spin-cost subsidy.

The key rule is strict separation:

> mining may fund the economy, but mining must never alter RNG, RTP, reel outcomes, jackpot probability, bonus probability, or individual loss-chasing incentives.

Paired repository: `Hawkar-usls/DIVINE_REALM`.

---

## Non-negotiable invariants

1. **Explicit opt-in only.** No mining begins automatically when the page/app opens.
2. **No cryptojacking.** Resource use, algorithm, destination, estimated power draw and treasury allocation are visible.
3. **Instant stop.** User can disable mining at any time without losing game access, balance, status or eligibility.
4. **No RNG coupling.** Hashrate/shares can never change odds, RTP, reel symbols, bonus probability or payout.
5. **No personal “mine more → gamble more” loop.** Personal hashrate must not unlock larger bets, faster spins, bonus buys or higher gambling rewards.
6. **Treasury accounting is separate from player balance accounting.** Mining revenue is not treated as a hidden wager.
7. **Public formula.** Any jackpot funding or spin subsidy derived from compute revenue uses a fixed, auditable formula.
8. **Energy visibility.** Electricity and thermal cost must be shown as real costs, not described as “free money.”
9. **No pool-profit guarantee.** Revenue varies with coin price, difficulty, uptime, fees and hardware efficiency.
10. **Standalone mining mode.** Where legally and technically permitted, compute participation should not require gambling.

---

## Concept

```text
user opt-in
   ↓
ComputeConsentGate
   ↓
MiningSidecar / approved pool adapter
   ↓
verified shares / payout receipts
   ↓
Compute Treasury
   ├─ jackpot reserve
   ├─ platform-wide spin subsidy
   └─ operating / energy policy buckets
        ↓
public treasury ledger
```

For CPU-oriented prototypes, RandomX/Monero is an obvious research candidate because consumer CPUs can participate and official Monero documentation supports solo, pool and P2Pool mining models. This is a **candidate adapter**, not a production endorsement of any specific third-party pool.

---

## Why the treasury must be aggregate

The dangerous design would be:

```text
my hashrate ↑ → my spins cheaper → I spin more
```

That directly couples compute expenditure to gambling intensity.

The preferred design is:

```text
aggregate verified treasury income
             ↓
fixed epoch formula
             ↓
common jackpot reserve and/or common capped subsidy
```

Every eligible user sees the same published rule for that epoch. A user's own hashrate does not increase their odds.

---

## Treasury accounting model v0.1

Keep four ledgers separate:

1. `PLAYER_WAGER_LEDGER`
2. `PLAYER_PAYOUT_LEDGER`
3. `COMPUTE_REVENUE_LEDGER`
4. `JACKPOT_RESERVE_LEDGER`

Never merge them into one opaque balance.

Suggested accounting fields:

```json
{
  "epoch_id": "...",
  "algorithm": "...",
  "accepted_shares": 0,
  "rejected_shares": 0,
  "gross_compute_revenue": 0,
  "pool_or_network_fees": 0,
  "net_compute_revenue": 0,
  "jackpot_allocation": 0,
  "spin_subsidy_allocation": 0,
  "other_allocation": 0,
  "reserve_after": 0,
  "receipt_root": "..."
}
```

All monetary units must be explicitly denominated.

---

## Jackpot funding rule

The jackpot must remain mathematically independent from the outcome generator.

Preferred model:

- mining revenue fills a reserve;
- jackpot rules define when/how much may be paid;
- RNG chooses outcomes under certified rules;
- the reserve never instructs RNG to make the user lose because the pool is underfunded;
- if the reserve cannot support a published liability, wagering must fail closed or the liability must be pre-funded.

Forbidden legacy pattern:

```text
if payout > pool_balance:
    silently change the reel outcome
```

That pattern must be removed from the legacy slot before any real-money deployment.

---

## Spin-cost subsidy rule

If compute revenue is used to make spins cheaper, use a deterministic capped epoch formula rather than personal mining rewards.

Example conceptual formula:

```text
subsidy_budget(epoch) = min(
  configured_cap,
  verified_net_compute_revenue(epoch-1) * subsidy_fraction
)
```

Then publish one common price/subsidy schedule for the epoch.

Requirements:

- no real-time discount based on the current player's hashrate;
- no “keep mining to keep spinning” countdown;
- no discount increase after losses;
- no risk-score bypass;
- welfare limits apply to the **gross wagering activity**, not only the user-paid portion after subsidy.

---

## User allocation modes

Prototype research may evaluate multiple transparent allocation policies, but each must be explicit before compute starts.

Possible modes:

- `100% TREASURY` — all net mining revenue attributed to the ecosystem treasury;
- `SPLIT` — a declared fraction to treasury and a declared fraction to participant/energy reimbursement where lawful;
- `COMPUTE_ONLY` — user participates in mining without opening the gambling surface.

No allocation mode may be silently changed by the operator mid-session.

---

## `MiningSidecar` architecture

The slot UI must not contain an obfuscated miner.

Use a separate, inspectable sidecar/service with:

- explicit start/stop;
- resource caps;
- thermal guard;
- pool/endpoint allowlist;
- signed configuration;
- observable hashrate;
- accepted/rejected share counters;
- payout/receipt monitor;
- no access to unrelated local files;
- no access to gambling RNG state;
- no access to wallet seed phrases/private keys unless a dedicated, audited wallet component explicitly requires it.

Prefer official or widely audited clients and documented APIs over custom mining kernels for early phases.

---

## Resource policy v0.1

Prototype defaults:

- mining OFF by default;
- CPU low/medium cap by default after opt-in;
- GPU OFF until separately enabled;
- suspend on battery by default;
- suspend at thermal threshold;
- auto-throttle on foreground activity;
- show estimated power/energy cost;
- expose pool/algorithm/endpoint before start.

---

## Welfare firewall

Mining and gambling risk systems must interact only in the restrictive direction.

Examples:

- self-excluded user: gambling stays blocked; compute-only mode may remain separately available if the user wants it and policy permits;
- deposit/spend limit reached: mining cannot unlock more wagering;
- high-risk session: mining cannot be marketed as a reason to continue;
- cooling-off: no “your machine is earning jackpot money, return now” notification.

---

## Security / integrity threats to test

- forged shares;
- replayed payout receipts;
- treasury double counting;
- endpoint substitution;
- malicious pool configuration;
- wallet address replacement;
- hidden CPU/GPU escalation;
- browser cryptojacking;
- compromised client binary;
- fake jackpot reserve balance;
- miner-to-RNG state leakage;
- denial of service caused by high resource load.

---

## Milestones

### P0 — Economic contract freeze

- [ ] Freeze ledger separation.
- [ ] Freeze compute/RNG independence.
- [ ] Freeze treasury allocation schema.
- [ ] Freeze opt-in/resource policy.
- [ ] Define reserve solvency rule.

**Gate:** `MINING_CANNOT_CHANGE_GAMBLING_OUTCOME = PASS`.

### P1 — Fake share simulator

- [ ] Generate deterministic fake shares.
- [ ] Test accepted/rejected share accounting.
- [ ] Build treasury epochs.
- [ ] Prove replay receipts do not double-credit.

No real mining in this phase.

### P2 — First real mining adapter

- [ ] Integrate one inspectable mining client/adapter.
- [ ] Connect only to an allowlisted test endpoint/pool.
- [ ] Verify shares and payout accounting.
- [ ] Enforce resource caps.

**Gate:** `REAL_COMPUTE_REVENUE_RECEIPT_VERIFIED = PASS`.

### P3 — Treasury ledger

- [ ] Publish epoch receipts/root hashes.
- [ ] Separate gross revenue, fees, net revenue and allocations.
- [ ] Add reserve solvency dashboard.
- [ ] Add reconciliation tests.

### P4 — Jackpot reserve prototype

- [ ] Fund demo/play-money jackpot from simulated/real compute ledger.
- [ ] Keep payout math independent from treasury state.
- [ ] Fail closed if reserve policy cannot support liability.

### P5 — Common spin subsidy prototype

- [ ] Implement capped epoch subsidy.
- [ ] Use same published schedule for eligible users.
- [ ] Ensure subsidy cannot bypass time/spend/loss limits.
- [ ] Measure whether cheaper spins increase risky play; disable if welfare metrics worsen.

### P6 — Sidecar hardening

- [ ] Signed config.
- [ ] Endpoint allowlist.
- [ ] Binary provenance checks.
- [ ] Thermal/power guard.
- [ ] Wallet separation.
- [ ] No arbitrary remote code execution.

### P7 — Non-money pilot

- [ ] Play-money slot only.
- [ ] Real or testnet compute accounting where lawful.
- [ ] Public treasury dashboard.
- [ ] Measure energy economics and user comprehension.
- [ ] Independent security and gambling-harm review.

### P8 — Real-money gate

Blocked until licensing/legal review, tax/accounting review, mining/pool terms review, AML/KYC where applicable, security review, RNG/math certification, responsible-gambling review, privacy review, payments review and reserve solvency review all pass.

---

## Pairing with DIVINE_REALM

```text
DIVINE_REALM
  voluntary compute → validated scientific contribution
  metric: public-benefit compute

SSlot
  voluntary compute → verified economic contribution
  metric: transparent treasury revenue

SHARED CORE
  consent + resource limits + receipts + audit + welfare firewall
```

The two repositories may share consent, receipt and resource-governance schemas, but their payloads stay distinct:

- DIVINE_REALM payload = scientific work;
- SSlot payload = proof-of-work economic work.

---

## Success metrics

```text
HIDDEN_MINING = 0
EXPLICIT_CONSENT = PASS
VERIFIED_SHARES > 0
TREASURY_RECONCILIATION = PASS
RNG_DEPENDENCE_ON_HASHRATE = 0
PERSONAL_ODDS_ADVANTAGE_FROM_HASHRATE = 0
RESERVE_SOLVENCY = PASS
ENERGY_COST_VISIBLE = PASS
WELFARE_LIMIT_BYPASS = 0
```

The economic layer succeeds only if it can reduce operator-funded cost or fund a reserve **without turning compute contribution into a mechanism for escalating gambling intensity**.
