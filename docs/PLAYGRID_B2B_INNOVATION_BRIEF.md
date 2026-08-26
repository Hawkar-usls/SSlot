# PLAYGRID — B2B Innovation & Partnership Brief

## Executive proposition

PLAYGRID is a proposed reusable infrastructure layer for regulated gaming in which a conventional game surface remains separated from a voluntary, verifiable compute layer.

The core commercial proposition is not "a slot that secretly mines" and not "charity that excuses gambling losses". It is:

> **A game can remain auditable and regulator-facing while a separately consented compute channel produces a measurable external output that can be routed to science/public-good work or to a transparent pooled economic treasury.**

Reference surfaces:

- **DIVINE_REALM** — science/public-good compute lane;
- **SSlot / successor brand** — economic pooled-compute / treasury lane;
- **Compute Protocol** — consent, task, receipt, verification, routing;
- **Welfare Firewall** — RNG/RTP/limits/eligibility remain outside compute authority.

## What is novel

The novelty is the composition of five normally separate systems into one auditable product boundary:

1. regulated game mechanics;
2. explicit resource-consent and device-policy controls;
3. distributed compute provider routing;
4. proof/receipt verification and public accounting;
5. a hard architectural firewall preventing compute contribution from buying better gambling outcomes.

The important primitive is therefore not a specific miner or BOINC client. It is **provider-agnostic verified compute attached to a game experience without becoming part of the game's randomness**.

## Two lanes

### 1. Scientific / public-good lane

```text
Player opt-in
   ↓
ComputeConsentGate
   ↓
Science provider adapter
   ↓
Upstream scientific work
   ↓
Verified receipt
   ↓
Impact Ledger
```

Potential partner value:

- measurable ESG / public-benefit activity with technical proof rather than marketing-only claims;
- an opt-in contribution mechanism that can exist even in compute-only mode without wagering;
- new partnerships with research institutions, foundations, universities, or approved distributed-compute providers;
- differentiated brand positioning based on verifiable contribution.

### 2. Economic pooled-compute lane

```text
Player opt-in
   ↓
ComputeConsentGate
   ↓
Economic compute provider
   ↓
Verified economic work / revenue
   ↓
Compute Treasury
   ↓
predeclared public accounting rule
```

Potential partner value:

- an additional funding stream for a shared reserve, jackpot infrastructure, platform subsidy, or other operator-approved pool;
- a provider-agnostic architecture: the economic backend can be replaced without changing game mathematics;
- independent accounting separates compute revenue from wager revenue;
- future workloads need not be limited to cryptocurrency mining if another auditable compute market is legally and economically superior.

## Why operators and B2B gaming suppliers may care

### Product differentiation

Most slot differentiation happens in theme, volatility, mechanics, bonuses, or distribution. PLAYGRID introduces a new infrastructure dimension: **the session can create a second independently measurable output**.

### Partnership surface

A supplier can integrate once at the Compute Protocol boundary and then route to different approved providers by jurisdiction, operator, campaign, research partner, or infrastructure policy.

### Responsible-gaming relevance

The architecture deliberately rejects the feedback loop:

```text
more compute → better personal odds → more wagering
```

and instead uses:

```text
consent + device policy → compute
compute → verified contribution
casino surface → read-only status
```

This matters because gambling harm is not a marginal policy concern. WHO's 2 December 2024 gambling fact sheet reports an estimated 1.2% of the global adult population with gambling disorder and cites evidence that people gambling at harmful levels generate around 60% of gambling losses/revenue. Source: https://www.who.int/news-room/fact-sheets/detail/gambling

PLAYGRID does not claim to solve gambling disorder. Its engineering claim is narrower and testable: **compute contribution must not be allowed to create a stronger wagering incentive or modify personal game odds.**

### Auditability

A serious deployment can expose separate ledgers for:

- game mathematics and certified RTP;
- player protection actions;
- compute consent versions;
- accepted compute receipts;
- scientific impact allocations;
- treasury revenue and downstream allocation.

This separation makes regulator, auditor, partner, and operator questions easier to answer.

## Why data-centre / infrastructure partners may care

PLAYGRID creates a controllable edge-compute acquisition channel rather than assuming all computation must occur in a central data centre.

A data-centre, cloud, scientific-compute, or infrastructure partner could participate as:

- gateway operator;
- authoritative receipt verifier;
- workload scheduler;
- scientific project bridge;
- treasury/accounting backend;
- overflow compute provider when edge devices are unavailable;
- telemetry and energy-efficiency partner.

The architecture also supports hybrid scheduling:

```text
EDGE VOLUNTEER CAPACITY
        +
DATA-CENTRE CAPACITY
        ↓
PROVIDER ROUTER
        ↓
VERIFIED WORKLOAD
```

This can be attractive where workloads are divisible, delay-tolerant, independently verifiable, and safe to distribute. It is not a claim that every data-centre workload is suitable for volunteer devices.

## Telegram / web delivery model

The Telegram Mini App or GitHub Pages demo should be treated as the **control and visualization plane**, not as a hidden native compute engine.

```text
Telegram Mini App / Web demo
        ↓
consent + limits + status
        ↓
Compute Gateway API
        ↓
approved companion agent / provider infrastructure
```

The player must always be able to see whether compute is active, its resource policy, the selected provider class, and a clear stop/revoke action.

## Operator handoff / sale model

The commercial handoff should be configuration-driven.

A licensed partner may replace, under agreement:

- compute gateway endpoint;
- provider allowlist;
- public verification keys;
- beneficiary/research destination;
- treasury destination;
- ledger endpoint;
- branding and presentation;
- regional policy configuration.

The partner must not gain a configuration switch that allows compute contribution to alter:

- RNG;
- RTP;
- win probability;
- bet size;
- loss chasing;
- personal jackpot weight;
- free-spin entitlement;
- risk or self-exclusion controls.

## Evidence and dependency-scale lane

The wider JANUS research program contains an internal dependency/addiction evidence track. The exact canonical scale artifact should be linked here only after its file, methodology, version, and provenance are independently located and frozen.

Until that happens:

```text
INTERNAL_DEPENDENCY_SCALE = PENDING_CANONICAL_RELINK
USE_IN_EXTERNAL_NUMERIC_CLAIMS = FORBIDDEN
```

External baseline figures for pitch material should remain tied to reproducible sources such as WHO, national regulators, peer-reviewed public-health work, and operator reports.

## What a partner gets from a pilot

A non-money sandbox pilot can answer concrete questions:

1. Do users understand and trust the compute consent flow?
2. What proportion voluntarily opts in when gambling rewards are not tied to compute?
3. How much verified compute is produced per opted-in device-hour?
4. What is the actual energy/thermal cost?
5. Can upstream receipts be independently verified?
6. Can the public ledger be reconciled end-to-end?
7. Does compute materially degrade game UX?
8. Can the operator replace the backend provider without touching RNG/game math?
9. Does the welfare firewall remain invariant under adversarial testing?

## Commercial forms worth discussing

- paid proof-of-concept;
- non-money sandbox pilot;
- OEM / SDK integration;
- per-operator licence;
- platform-wide licence;
- hosted Compute Gateway;
- research partnership;
- exclusive field/territory licence where commercially justified.

No production right is granted by the public repository. See `LICENSE` and `docs/COMMERCIAL_LICENSING.md`.

## Current maturity

The repositories contain an executable protocol foundation and mock lanes. Real upstream science/mining adapters, production receipt verification, legal/regulatory clearance, and non-money pilot evidence remain open gates.

The appropriate first B2B claim is therefore:

> **We have a concrete architecture and prototype path for a new compute-aware gaming primitive, and we are looking for a platform/operator partner to evaluate a controlled sandbox pilot.**

—not a claim that a regulated commercial product is already finished.