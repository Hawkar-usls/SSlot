# SSlot / GRIDJACK — Shared Compute Jackpot Partnership Brief

> Public evaluation prototype. Not a production gambling, payment, mining, or settlement service.

## One-line proposal

**Use verified opt-in compute revenue to fund a separately accounted shared Compute Treasury / aggregate jackpot reserve without allowing personal compute contribution to alter personal game odds.**

## Role in JANUS HELIOS

SSlot is the fixed Treasury child of the wider [`JANUS HELIOS`](https://github.com/Hawkar-usls/Janus-HELIOS) ecosystem.

```text
JANUS HELIOS = universal route-switchable parent
DIVINE_REALM = fixed Science/Public-Good child
SSlot        = fixed Shared Mining-Pool/Jackpot child
```

Universal buyer routing belongs to HELIOS. SSlot stays focused on one economic loop:

```text
EXPLICIT CONSENT + DEVICE POLICY
            ↓
approved mining / economic compute provider
            ↓
authoritative accepted share / revenue receipt
            ↓
        COMPUTE TREASURY
            ↓
   aggregate jackpot / reserve
```

## Upstream provider options inside the fixed role

The upstream source of verified economic compute may vary without changing SSlot's identity. Examples include:

- an approved mining/pool adapter;
- a Golem-like paid compute market;
- another auditable economic-compute provider.

The **destination remains the shared Treasury/jackpot model**. If a buyer wants science, data-center, operator, custom, or multi-route dispatch, that belongs in HELIOS instead.

## Player proposition

Before compute starts, the user sees:

- compute is OFF by default;
- requested resource cap;
- immediate stop/revoke;
- visible contribution/receipt state;
- explicit separation between compute accounting and wagering balance;
- explicit statement that compute does not improve personal RNG/RTP or jackpot weight.

## Fairness firewall

```text
personal compute -> personal RNG              FORBIDDEN
personal compute -> personal RTP              FORBIDDEN
personal compute -> personal jackpot weight   FORBIDDEN
spin frequency -> compute scheduling          FORBIDDEN
loss amount -> compute scheduling/reward       FORBIDDEN
unverified compute -> Treasury value           FORBIDDEN
```

Aggregate verified compute revenue may fund an aggregate reserve; that is different from rewarding a specific player's compute with better gambling terms.

## Verification

A production receipt must be bound to the consent session, task/provider identity, accepted upstream work, settlement/accounting evidence where applicable, and anti-replay state.

Mock receipts have zero production value.

## Pilot

A clean first pilot is:

```text
SSlot public demo
+ one approved pool/economic provider
+ authoritative receipt store
+ Compute Treasury reconciliation
```

Success means explicit consent, immediate stop, real accepted work, independently reconcilable Treasury value, acceptable resource behavior, and zero compute authority over game mathematics.

Public demo: [`playgrid.html`](playgrid.html)

Universal parent: [`JANUS HELIOS`](https://github.com/Hawkar-usls/Janus-HELIOS)

Local ecosystem binding: [`.janus/HELIOS_PARENT_BINDING.json`](.janus/HELIOS_PARENT_BINDING.json)

See also: [`LICENSE.md`](LICENSE.md), [`IP_NOTICE.md`](IP_NOTICE.md), [`PROJECT_STATUS.json`](PROJECT_STATUS.json).
