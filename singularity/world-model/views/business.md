> **Grounding** · RuleEngineUI @ `00ebe873dc0c98a71707575ec3fdc374b5b54dfc` · view: `business` · tier: `full`
> **Generated** 5 August 2026 (2026-08-05T14:45:35Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## TL;DR {#biz.tldr}

This view captures the business-facing capabilities of the repository, the actors and workflows it implies, and the places where policy or customer-impacting decisions are encoded. The app is best understood as a rule-authoring console for decisioning, testing, and validation rather than a generic CRUD app. Its highest-value business concerns are fraud-risk and policy decisions, schema governance, and safe rollout of rule changes.

## Facts {#biz.facts}

```yaml
capabilities:
  - { id: rule-authoring, description: "Create and edit decision rules and schema fields" }
  - { id: rule-validation, description: "Validate rules, synthesize test cases, and inspect coverage" }
  - { id: glossary-management, description: "Manage glossary fields that define business entities and data sources" }
actors:
  - { id: rule-author, role: "Creates and tunes rule logic" }
  - { id: validator, role: "Runs tests and reviews rule outcomes" }
  - { id: support-analyst, role: "Reviews execution history and investigations" }
external_systems:
  - { id: postgres, role: "Stores rules and glossary data", status: observed }
  - { id: gemini, role: "Optionally generates rule names", status: observed }
locations:
  - { path: "src/app/app.component.ts", purpose: "Switches between schema, rules, validator, functions, and history" }
  - { path: "src/app/components/sidebar/sidebar.component.ts", purpose: "Hosts the left navigation shell for business workflows" }
```

## Where to start {#biz.start}

Use this view when you need to understand the product capabilities, the user archetypes implied by the code, or the likely business impact of a rule change. Start with the rule-authoring, validation, and glossary workflows before reviewing the implementation files.

## Capability map {#biz.capabilities}

- Rule authoring: the UI exposes a ruleset workspace, a decision-table view, and a rule configuration panel. The initial sample rules emphasize fraud and transaction-risk heuristics.
- Rule validation: the app includes a validator studio with overview, test data, generated cases, test runs, coverage, validation, and library tabs. This is a strong signal that the product is meant to support quality assurance for rules, not just authoring.
- Glossary and schema governance: the app fetches glossary data from `/api/glossary` and maps it into a schema model, which is the primary mechanism for controlling vocabulary and data-source interpretation.

## Actors and user archetypes {#biz.actors}

- Rule authors or policy analysts: they create or adjust rules and the underlying schema vocabulary.
- Validation testers: they exercise candidate rules, generate cases, and inspect whether a rule passes or fails.
- Support or operations analysts: they inspect execution logs and failure traces to understand why a rule behaved unexpectedly.
- Admin or platform owners: the UI includes a support/settings shell and an admin-like user card, suggesting a role that can manage or review the environment.

## Business workflows {#biz.workflows}

1. Define or import schema fields and glossary terms.
2. Create or edit a decision rule, often with conditional logic and thresholds.
3. Validate the rule with synthetic or recorded test data and inspect results.
4. Review execution traces, coverage, and failure details before promoting or publishing.
5. Persist the change through the backend so rules and glossary entries can be reused by other sessions.

## Business entities and vocabulary {#biz.entities}

- `DecisionRule`: a runnable logic rule with action, risk, and return behavior.
- `SchemaField`: a business attribute or domain field such as `amount_usd` or `geo_match`.
- `TestCase` and `Fixture`: reusable inputs used to validate a rule.
- `ExecutionTraceLog`: a record of what happened when a rule ran, including status and error context.

## Business rules and policy locations {#biz.rules}

The most concrete business rules visible in the repository live in `src/app/data.ts`. The initial decision rules encode simple policy patterns for fraud handling: user type, transaction spend thresholds, regions, risk score, and allow/deny outcomes. The engine in `src/app/kernel/` and `src/app/services/rule-engine.service.ts` then evaluates those rules against test data and exposes linting and coverage.

## User-visible failure behavior {#biz.failure}

The repository has explicit failure representations. Execution logs include outcomes such as timeout, manual review, decline, and approved states. The UI also surfaces a global toast alert for system operations, showing that the user experience is expected to communicate policy or runtime failures clearly.

## Compliance and data sensitivity {#biz.compliance}

The code clearly operates on sensitive concepts such as user identifiers, transaction amounts, KYC status, device velocity, and geolocation-related fields. The repository does not define a retention, encryption, or access-control policy, so this should be treated as a gap rather than a claim of compliance.

## Business-impact map {#biz.impact}

- Rule logic changes can alter approval, review, or decline outcomes and therefore affect fraud controls and customer experience.
- Schema or glossary changes can change how rules are interpreted and can cause silent behavior shifts.
- UI changes such as the left-panel color are low-risk for policy decisions but high-impact for usability and adoption.

## Unknown business assumptions {#biz.unknowns}

- The repository does not identify the owning business team or the intended regulated domain beyond the sample fraud-risk vocabulary.
- The exact rollout or publication workflow for real rules is not implemented in the checked-in code.
- The repository does not document the legal or regulatory obligations that the rules are meant to satisfy.

## Suggested questions for domain owners {#biz.questions}

- Which business policy should be treated as authoritative when a rule and its glossary disagree?
- Which workflows require human approval before changes are made live?
- Which data fields are considered sensitive and should be masked in the UI or logs?

## Questions this view does not answer {#biz.limits}

This view does not describe class-by-class implementation, deployment details, or the full test inventory. It also does not attempt to resolve which business team owns the rules in the sample data.
