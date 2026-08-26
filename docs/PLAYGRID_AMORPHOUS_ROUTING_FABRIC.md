# PLAYGRID Amorphous Compute Routing Fabric

PLAYGRID must not be a slot hard-wired to Golem, BOINC, mining, one laboratory, one data center, one token, or one jackpot model.

The stable product is the **routing fabric**.

```text
PLAYER / TELEGRAM / WEB
        |
        v
ComputeConsentGate
        |
        v
Compute Scheduler
(consent + device policy + capacity)
        |
        v
Provider Registry + Routing Plan
        |
        +--> SCIENCE / PUBLIC GOOD
        +--> MARKETPLACE (e.g. Golem)
        +--> DATACENTER / CLOUD
        +--> OPERATOR WORKLOAD
        +--> TREASURY ECONOMIC WORK
        +--> CUSTOM FUTURE PROVIDER
        |
        v
Authoritative Receipt
        |
        +--> Impact Ledger
        +--> Player Compute Earnings Ledger
        +--> Compute Treasury
        +--> Buyer-defined audited sink
```

## HELIOS-style analogy

The useful analogy is a power-routing station: generation is one thing; **destination is another**. The game surface is not the destination and does not decide the destination from a spin outcome. The licensed operator selects an approved route or routing plan.

In Fallout: New Vegas, HELIOS One can be configured to redirect generated power to different destinations. PLAYGRID uses the same systems idea for computation: one consented resource source, multiple replaceable destinations.

The analogy ends there: PLAYGRID routes compute tasks and verified value, not electrical grid power, and it contains explicit consent, security, accounting and welfare gates.

## Stable interfaces

A new provider should require only:

1. a `ProviderManifest`;
2. a server-side adapter for that provider;
3. an authoritative receipt verifier;
4. an accounting/impact sink policy;
5. legal/security/provider admission review.

It must **not** require changes to RNG, RTP, wager logic, bonus logic, self-exclusion or player-risk controls.

## Provider classes

- `SCIENCE` — approved research Requestor/workload;
- `PUBLIC_GOOD` — independently verifiable non-commercial impact workload;
- `MARKETPLACE` — a compute marketplace such as Golem;
- `TREASURY` — monetizable compute whose verified proceeds enter a declared treasury policy;
- `DATACENTER` — buyer-selected cloud/data-center workload;
- `OPERATOR` — approved operator-owned non-sensitive workload;
- `CUSTOM` — future provider class, disabled until admitted by signed configuration.

## Routing plans

PLAYGRID supports both a single direction and a weighted plan.

Examples:

```json
{
  "plan_id": "all-science",
  "allocations": [{"provider_id":"science-requestor","weight":1.0}]
}
```

```json
{
  "plan_id": "mixed-market-impact",
  "allocations": [
    {"provider_id":"golem-marketplace","weight":0.7},
    {"provider_id":"science-requestor","weight":0.3}
  ]
}
```

The scheduling cursor belongs to the compute scheduler. It may be derived from neutral scheduling state, capacity, time slices or queue position. It may **never** be derived from a spin result, stake, loss, win, RTP, bonus, near-miss, balance, VIP state or risk score.

## Player value

Verified compute can produce different kinds of value without forcing them into gambling:

```text
verified science receipt
    -> IMPACT_LEDGER

verified economic receipt
    -> PLAYER_COMPUTE_EARNINGS_LEDGER
    +  COMPUTE_TREASURY

verified buyer-defined workload
    -> contract-defined audited sink
```

`PLAYER_COMPUTE_EARNINGS_LEDGER` remains separate from gambling balance. Automatic conversion into wagers/free spins is forbidden by the reference architecture.

## Public vs private configuration

Public client:
- route display names;
- selected route class;
- consent/resource policy;
- read-only provider status;
- verified receipt summaries;
- ledger totals.

Server/private:
- provider credentials;
- Yagna/app keys;
- wallet secrets;
- settlement credentials;
- anti-fraud internals;
- signed production manifests;
- pricing/contract details.

## Fail closed

If the selected provider is unavailable, its receipt cannot be verified, its manifest is unsigned/expired, or the player revokes consent, compute stops or falls back only to a pre-approved provider declared in the routing plan.

The system never falls back by increasing wagering or changing game outcomes.

## Commercial handoff

A buyer should be able to replace the destination by changing signed server configuration:

```text
ProviderManifest
+ Gateway Adapter
+ Receipt Verifier
+ Sink Policy
```

This is the sellable primitive: **a game-independent compute-routing layer with two reference slot surfaces**, not a hard-coded integration with any one third party.