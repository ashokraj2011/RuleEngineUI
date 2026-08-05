> **Grounding** · RuleEngineUI @ `00ebe873dc0c98a71707575ec3fdc374b5b54dfc` · view: `business.brief` · tier: `brief`
> **Generated** 5 August 2026 (2026-08-05T14:45:35Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## Business snapshot {#biz.brief}

This repository is a business-facing rule authoring and validation console. Its core capabilities are defining schema fields, drafting decision rules, evaluating them with test data, and reviewing execution traces or coverage reports. The visible business domain in the code is fraud-risk and transaction policy, with sample rules that consider user type, spend, region, device velocity, and KYC-related concepts. The likely users are rule authors, validators, and support analysts. The most important caution is that schema and glossary changes can silently reshape rule outcomes, even when the visible rule text stays the same.
