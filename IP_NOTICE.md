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

## Partnership evaluation

Prospective operators, aggregators, studios, data centers, and technology partners may evaluate the public demo under `LICENSE.md`. Any production, white-label, hosted, commercial, distribution, or integration right requires a separate written agreement.

## Regulatory boundary

The current public build is a prototype. Real-money gambling, payments, compute monetization, mining, or regulated deployment requires separate legal, security, platform-policy, responsible-gaming, and jurisdiction-specific review.
