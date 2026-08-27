# Intellectual Property & Evaluation Notice

This repository is a **public demonstration artifact**, not an open-source release and not a production gambling service.

## What publication does and does not protect

The source code, original documentation, original text, and other copyrightable expression in this repository are protected by copyright. The accompanying `LICENSE.md` grants only limited internal evaluation rights.

Copyright does **not** automatically give exclusive rights over every underlying idea, business model, algorithmic concept, workflow, or technical method. Patent, trademark, trade-secret, contract, database, and other rights are separate legal questions. Nothing in this repository claims that the compute-gateway concept is patented or patent-pending.

Public disclosure can affect trade-secret status and may affect patent strategy in some jurisdictions. Before disclosing additional implementation details or entering a commercial deal, obtain qualified intellectual-property advice for the relevant jurisdictions.

## Public demo / private moat boundary

The public repository should contain only what is necessary to demonstrate the player experience and integration contract. Production-sensitive material should remain outside the public repository, including where applicable:

- workload-selection and scheduling logic;
- provider credentials, API keys, wallet/payment secrets, and partner endpoints;
- anti-fraud and verification internals that would be weakened by disclosure;
- settlement/revenue-share rules negotiated with partners;
- proprietary benchmarking, pricing, and capacity models;
- production infrastructure configuration.

Never commit partner secrets or production credentials to this repository.

## HELIOS ecosystem / acquisition boundary

SSlot is a specialized child in the JANUS HELIOS ecosystem. That architecture is an interoperability/product relationship, not an automatic transfer of ownership between repositories.

Unless a signed definitive agreement expressly says otherwise:

- a HELIOS licence or acquisition does not include SSlot;
- an SSlot licence or acquisition does not include HELIOS, DIVINE_REALM, the JANUS distributed swarm, the meta-registry, other JANUS repositories, future inventions, or seller general know-how;
- links, shared naming, shared schemas, or conceptual lineage do not by themselves create an assignment;
- buyer access to one public repository does not create commercial rights to another.

Any transaction involving SSlot should identify the exact commit/tree snapshot, brand rights, background IP, source assets, documentation, exclusions and transition obligations in writing.

## Partnership evaluation

Prospective operators, aggregators, studios, data centers, and technology partners may evaluate the public demo under `LICENSE.md`. Any production, white-label, hosted, commercial, distribution, or integration right requires a separate written agreement.

## Regulatory boundary

The current public build is a prototype. Real-money gambling, payments, compute monetization, mining, or regulated deployment requires separate legal, security, platform-policy, responsible-gaming, accounting, privacy, and jurisdiction-specific review.

## Buyer diligence rule

A commercial acquirer should not infer production readiness, profitability, title to third-party material, trademark registration, or regulatory approval from public availability. Those matters require exact-snapshot diligence and the definitive transaction documents.
