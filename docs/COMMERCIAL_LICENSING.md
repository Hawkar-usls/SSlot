# Commercial Evaluation & Licensing

This repository is intentionally public enough to support technical evaluation, demo review, due diligence, interoperability discussion, and partnership conversations. Public visibility is **not** a grant of commercial rights.

## What a prospective partner may do

Under the repository `LICENSE`, a prospective operator, supplier, platform, studio, investor, laboratory, university, infrastructure provider, or other partner may inspect and internally evaluate the prototype and its documentation to decide whether to pursue a pilot or commercial agreement.

## What requires a separate written agreement

A separate commercial agreement is required before any party may:

- integrate the compute protocol into a production casino, sportsbook, game aggregator, PAM, wallet, jackpot system, or other commercial platform;
- deploy the slot or compute gateway to real users for commercial purposes;
- operate a pooled-compute treasury, mining pool, revenue-sharing system, or commercial compute backend based on this implementation;
- white-label, sublicense, resell, host, or distribute the implementation as part of another product;
- use substantial portions of the implementation or documentation to build a competing commercial system.

## Intended commercial model

The preferred model is not the sale of an unmaintainable one-off slot. The project is designed for licensing or partnership around a reusable **compute-aware gaming layer**:

```text
Telegram / Web game surface
        ↓
ComputeConsentGate
        ↓
Compute Provider Router
    ├─ SCIENCE / PUBLIC-GOOD COMPUTE
    └─ ECONOMIC COMPUTE / TREASURY
        ↓
Verifiable Receipt Layer
        ↓
Impact Ledger / Compute Treasury

Welfare Firewall remains independent:
RNG / RTP / limits / eligibility are not controlled by compute contribution.
```

An operator may replace approved backend providers, endpoints, beneficiary destinations, treasury infrastructure, and branding under a commercial agreement without receiving authority to bypass the welfare/fairness invariants.

## Evaluation package

A serious evaluation can include:

1. GitHub Pages / Telegram Mini App demo;
2. architecture and threat-model review;
3. ComputeConsentGate and ComputeReceipt protocol review;
4. mock end-to-end science and economic-compute lanes;
5. provider handoff specification;
6. non-money sandbox pilot;
7. independent legal, security, privacy, responsible-gambling, and game-math review before any regulated deployment.

## Intellectual-property boundary

Copyright protects the repository's code, documentation, schemas, text, and other copyrightable expression. It does **not** by itself create a monopoly over every abstract idea described here. No patent license is granted by the repository license. Parties interested in production use should discuss IP scope, confidentiality, field-of-use, exclusivity, territory, support, audit rights, and commercial terms in a separate agreement.

## Contact

For commercial evaluation, pilot, licensing, OEM, operator, platform, research, or infrastructure partnership discussions, contact the repository owner through the public GitHub profile or another verified contact channel supplied by the owner.

This document is a project licensing notice, not jurisdiction-specific legal advice.