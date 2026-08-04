> **Grounding** · logic-engine @ `c9680d4f78d1cc34be385f6629b9be0df4b3c31d` · view: `business` · tier: `full`
> **Generated** 04 August 2026 (2026-08-04T14:48:37Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#biz.tldr}
This repository supports a business-facing workflow for authoring, validating, and reviewing decision rules. The observable domain is transaction/risk/fraud logic, with sample rules, sample data, execution logs, and glossary terms that model user context, account state, and KYC or fraud checks. The main business value is not a generic web app but a rule-testing studio where analysts and engineers can define rules, inspect outcomes, and review failure cases before deployment. Start with `src/app/data.ts`, `src/app/services/rule-store.service.ts`, and `server/db.js`.

## Facts {#biz.facts}
```yaml
capabilities:
  - { id: rule-authoring, evidence: "src/app/app.component.ts:27-150" }
  - { id: rule-validation, evidence: "src/app/services/rule-store.service.ts:140-363" }
  - { id: glossary-management, evidence: "server/index.js:151-195" }
actors:
  - { role: rule author, evidence: "src/app/app.component.html:13-184" }
  - { role: validator or reviewer, evidence: "src/app/services/rule-store.service.ts:140-363" }
  - { role: support operator, evidence: "src/app/app.component.html:172-183" }
workflow_examples:
  - { name: create and test a decision rule, evidence: "src/app/data.ts:1-40" }
  - { name: inspect execution history, evidence: "src/app/data.ts:237-371" }
```

## Capability map {#biz.capabilities}
The repository exposes three business capabilities that are visible in the code:
- Rule authoring and configuration: the UI includes schema definition, rule sets, decision-table editing, and rule configuration screens `src/app/app.component.html:113-152` and `src/app/data.ts:1-40`.
- Rule validation and test management: the validator studio can generate system cases, save fixtures, group cases into suites, run cases, track coverage, and inspect regression diffs `src/app/services/rule-store.service.ts:140-363`.
- Rule and glossary persistence: the backend stores rule metadata and glossary terms so the UI can load them from a database `server/index.js:72-195`.

## Actors and user archetypes {#biz.actors}
The code indicates at least three human roles:
- Rule authors or policy designers who create or adjust rules and schema fields. The main UI tabs and actions support this workflow `src/app/app.component.ts:102-150`.
- Validators or reviewers who execute test cases, inspect coverage, and compare results against expectations `src/app/services/rule-store.service.ts:273-320`.
- Support or operations staff who can open incident-style support views or review execution history `src/app/app.component.html:172-183` and `src/app/data.ts:237-371`.

## Business workflows {#biz.workflows}
The most visible workflow is “define rule -> test rule -> review outcome -> publish/record.” In the sample data, the app models rules such as Block, Review, and Approve responses for transaction-risk scenarios `src/app/data.ts:1-40`. The validator workflow seeds sample cases, records run history, and can classify mismatches as matches, bugs, or data drift `src/app/services/rule-store.service.ts:108-126` and `src/app/services/rule-store.service.ts:273-320`. The backend workflow stores rule and glossary entries and serves them back to the UI `server/index.js:72-195`.

## Entities and vocabulary {#biz.entities}
The business vocabulary is centered on rules, schemas, test cases, fixtures, suites, and execution logs. Observed entities include user context, customer account, transaction data, KYC status, device velocity, and fraud risk score names in the glossary and sample data `server/db.js:47-83` and `src/app/data.ts:42-50`. The rule language uses terms such as `rulemetadata`, `session`, `customer`, `account`, and `kyc_service` as namespaces `server/db.js:47-83`.

## Business rules and policy locations {#biz.rules}
Business logic appears in three places:
- Sample decision rules and outcomes live in `src/app/data.ts:1-40`, where rule responses include Block, Review, and Approve actions.
- The glossary and backend seed data encode business-facing concepts such as customer age, country, tier, account balance, verification status, and fraud risk score `server/db.js:47-83`.
- The execution logs show operational policy signals such as “manual review”, “decline”, and “geo-enrichment timeout” for decision outcomes `src/app/data.ts:237-371`.

## User-visible failure behavior {#biz.failures}
The user-visible failure pattern is a structured alert and a persisted run result rather than a silent crash. The app can show notifications for publish or settings actions and the execution logs record errors such as enrichment timeout and declined outcomes `src/app/app.component.ts:67-75` and `src/app/data.ts:237-371`. The backend also returns explicit API errors for malformed or missing payloads `server/index.js:17-69`.

## Compliance or data-sensitivity indicators {#biz.compliance}
The code explicitly surfaces sensitive data categories such as `user_id`, `ip_address`, `balance`, `risk_score`, `account_age_days`, `country`, and KYC/geo checks `server/db.js:47-83` and `src/app/data.ts:42-50`. No explicit compliance framework was found, so this should be treated as a data-sensitive rule-testing domain rather than a proven regulated-product implementation.

## Business-impact map {#biz.impact}
Changing this repository can affect at least three business outcomes: how rules are authored, how validation coverage is measured, and how operational incidents are surfaced. A change to rule vocabulary or schema semantics can alter business decisions; a change to the validator workflow can change confidence in rule deployments; a change to the backend persistence layer can affect how rules and glossary entries survive restarts or deployments.

## Unknown business assumptions {#biz.unknowns}
The repository does not state the target industry, deployment environment, or change-approval process. The sample rules resemble fraud/risk decisioning, but the product owner should confirm whether the intended business domain is fraud prevention, underwriting, pricing, or something else.

## Suggested questions for domain owners {#biz.questions}
- Which business policies should be considered authoritative: the sample rules, the glossary, or an external policy repository?
- What approvals or release gates should accompany a rule change?
- Which data fields are considered sensitive or regulated in the target environment?

## Where to start {#biz.start}
For business review, begin with `src/app/data.ts` to see the example decision rules and outcomes, then read `server/db.js` for the vocabulary and `src/app/services/rule-store.service.ts` for how rules are validated and tracked.

## Questions this view does not answer {#biz.limits}
This view does not describe implementation details of the kernel, low-level test harness mechanics, or deployment topology. It also does not prove that all business rules in a real production environment are represented in the sample data.
