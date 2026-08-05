> **Grounding** · RuleEngineUI @ `ceed449863d693f203efab6d44259d8dc4655d68` · view: `{view_id}` · tier: `{tier}`
> **Generated** 05 August 2026 (2026-08-05T13:52:52Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#biz.tldr}
This view explains the repository’s business-facing capabilities without diving into implementation details. The checked-in product surface is a rule-authoring console for decision logic and validation, with sample content around transaction review, fraud/risk decisions, and rule governance. The main user roles appear to be rule authors/operators, reviewers, and administrators. The strongest business signals are in the UI labels, sample rules, and glossary terms such as customer, account, fraud, and loyalty. The biggest uncertainty is the exact domain of WRK-999; the code suggests a general rule-engine platform rather than a single product-specific workflow.

## Facts {#biz.facts}

```yaml
capabilities:
  - { id: rule-authoring, evidence: "src/app/app.component.ts:46-151" }
  - { id: rule-validation, evidence: "src/app/components/sidebar/sidebar.component.ts:57-196" }
  - { id: rule-persistence, evidence: "server/index.js:72-204" }
actors:
  - { role: rule author, evidence: "src/app/components/sidebar/sidebar.component.ts:26-35" }
  - { role: reviewer or operator, evidence: "src/app/components/sidebar/sidebar.component.ts:57-196" }
  - { role: admin or support user, evidence: "src/app/components/sidebar/sidebar.component.ts:112-125" }
workflow_terms: [rule, glossary, schema, validator, history, publish]
```

## Capability map {#biz.capabilities}
The repository’s visible capabilities are centered on decision-rule lifecycle management:
- Authoring: the main console provides rule, schema, functions, and history surfaces. The UI is designed for creating and managing decision rules rather than just viewing static contents.
- Validation: the validator studio includes dashboard, test-data, generated cases, evaluate, coverage, validate, and library tabs, suggesting a workflow for testing and reviewing rules before release.
- Publication and governance: the UI includes a publish action and a “Drafts / Staging / Production” model, which implies a staged rule lifecycle even though the current code is mostly UI-driven.
- Persistence and glossary management: the backend exposes CRUD endpoints for rules and glossary entries, so the platform is not purely a static demo.

## Actors and workflow map {#biz.workflows}
The code makes the following actors visible:
- Rule authors or business analysts: they can create or edit rules, schema fields, and decision structures.
- Validation reviewers: they can generate test cases, run evaluations, inspect coverage, and review history logs.
- Administrators or support users: the sidebar and support console imply an operational role for configuration, support escalation, and workflow management.
The business workflow that is most visible is: define a schema, author a rule, validate it against scenarios, publish it to a lifecycle stage, and review execution history. The shipped sample data also suggests a review/approval and fraud-risk decision context.

## Business entities and vocabulary {#biz.entities}
The repository vocabulary is mostly rule-engine language, but it is grounded in business-oriented terms. Observed domain words include transaction, risk score, device velocity, geo match, account, customer, fraud, loyalty, review, approve, block, and rule metadata. The glossary seeding in `server/db.js` explicitly includes `customer`, `account`, `session`, `fraud_check`, and `kyc_service` concepts, which indicates that the platform is intended to support policies that connect customer/account context with business decisions.

## Business rules and policy locations {#biz.rules}
The code shows policy-like logic in three places:
- Sample rules and initial decision rules in `src/app/data.ts` model approval or review actions, such as blocks, reviews, and approvals based on user type, spend thresholds, and region.
- The server glossary in `server/db.js` defines business-oriented attributes like `tier`, `balance`, `verification_status`, and `risk_score` that act as policy inputs.
- The validator and kernel layers in `src/app/kernel/` implement the semantics of rule evaluation, including contradiction detection, coverage analysis, and typed comparison.

## User-visible failure behavior {#biz.failures}
The UI uses notifications for important system actions and includes a support console for runtime incident reporting. The backend exposes health and error responses for rule/glossary operations. In the current code, the main visible failure modes are missing glossary data, failed API calls, or rule evaluation results that fail tests. The app also has a support workflow for reporting exceptions or schema conflicts, which is relevant for business operations.

## Compliance or data sensitivity indicators {#biz.sensitivity}
The repository includes customer/account/session attributes and a glossary around KYC and fraud assessment, which indicates a potentially sensitive domain. The code does not expose personal data values in the sample rules, but it does use business-sensitive concepts such as balance, risk score, and verification status. The backend uses a Gemini API key placeholder and PostgreSQL connection settings, so secret handling and environment configuration matter for production use.

## Business impact and uncertainty {#biz.impact}
The greatest business impact is likely in the quality and safety of decision automation: incorrect rules could misroute approvals, block legitimate transactions, or fail to detect risk. The product’s current implementation suggests a general-purpose rules platform, but the precise business processes for WRK-999 are not defined in the checked-in code. The repository leaves several important business questions open, including which policy domain WRK-999 serves, which parties own the rules, and which external systems must integrate with the glossary.

## Suggested questions for domain owners {#biz.questions}
- Which specific business domain does WRK-999 represent: fraud, underwriting, loyalty, compliance, or something else?
- Which roles should be allowed to author, validate, publish, and approve rules?
- Which external systems supply the glossary data and which fields are authoritative?
- What are the expected service-level and audit requirements for rule publishing?

## Where to start {#biz.start}
For intake or business review, start with `src/app/app.component.ts`, `src/app/data.ts`, and `server/db.js`. These files provide the clearest business-facing signals without requiring a full read of the kernel internals.

## Questions this view does not answer {#biz.limits}
This view does not define the full production architecture, deployment topology, security posture, or the exact intended workflow for a WRK-999 feature. It also does not claim the rules are production-ready; it only documents the repository’s visible business behavior and vocabulary.
