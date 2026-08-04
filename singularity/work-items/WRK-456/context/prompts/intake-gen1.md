# Active Story phase contract: Intake

- Work ID: `WRK-456`
- Work type: `chore`
- Phase: `intake`
- Generation to author: 1
- Required artifact: `artifacts/intake/intake.md`
- Write scope: `artifact-only`
- Approval authority groups: `product-approvers`
- Minimum distinct approvals: 1

## Configured artifact template

# WRK-456 — Chore Intake

## Objective

TODO: Describe the maintenance outcome.

## Scope and validation

TODO: Define affected areas, constraints, and evidence of completion.

# Product owner agent

Use pinned business sources, the repository business view, and approved upstream artifacts as evidence. State the user, problem, outcome, scope, exclusions, dependencies, assumptions, and measurable success criteria. Convert evidence into stable `REQ-nnn` requirements and testable `AC-nnn` acceptance criteria with exact citations. Separate confirmed needs, proposals, and unresolved questions. Do not invent business intent or grant approval.

## Remote skills

| ID | URL | Phases | Optional | Max bytes |
|---|---|---|---|---|

## Remote artifact templates

| ID | URL | Phases | Optional | Max bytes |
|---|---|---|---|---|

## Remote generated artifacts

| ID | URL template | Phase | Target | Optional | Max bytes |
|---|---|---|---|---|---|

<!-- required repository world-model grounding -->

## Repository grounding: singularity/world-model/core/summary.md

> **Grounding** · logic-engine @ `c9680d4f78d1cc34be385f6629b9be0df4b3c31d` · view: `core` · tier: `full`
> **Generated** 04 August 2026 (2026-08-04T14:48:37Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#core.tldr}
This repository is a browser-based rule-authoring and validation studio for decision logic. The active surface is an Angular frontend, a framework-agnostic rule kernel under `src/app/kernel/`, and a small Express API in `server/` for rule and glossary persistence. The app exposes schema design, rule editing, validator workflows, and execution history. Start with `src/main.ts`, `src/app/app.component.ts`, `src/app/services/rule-engine.service.ts`, and `server/index.js`.

## Facts {#core.facts}
```yaml
repository_kind: mixed
languages: [TypeScript, JavaScript, HTML, CSS]
package_roots: [., server]
components:
  - { id: ui-console, path: src/app, role: Angular app shell and UI }
  - { id: rule-kernel, path: src/app/kernel, role: evaluation, synthesis, linting, coverage }
  - { id: rule-api, path: server, role: Express persistence API }
entrypoints:
  - { id: app-bootstrap, path: src/main.ts:1-6, invocation: "npm start" }
  - { id: server-api, path: server/index.js:1-204, invocation: "cd server && npm start" }
standard_commands:
  - { command: "npm start", purpose: "launch Angular dev server", source: "package.json:1-42" }
  - { command: "npm run build", purpose: "compile the Angular app", source: "package.json:1-42" }
  - { command: "npm test", purpose: "run Angular tests", source: "package.json:1-42" }
```

## Repository purpose {#core.purpose}
The repository appears to be a decision-rule studio for fraud or risk-style scenarios. The visible domain vocabulary includes user context, transactions, balances, risk scores, and KYC/geo signals, as shown in `src/app/data.ts` and `server/db.js`.

## Repository type and languages {#core.type}
This is a mixed frontend/backend application. The UI is Angular 17 with TypeScript, HTML, CSS, and Tailwind-style styling. The backend is a small Express service using JavaScript and PostgreSQL. The kernel under `src/app/kernel/` is pure TypeScript and explicitly framework-agnostic `src/app/kernel/index.ts:1-17`.

## Main applications, packages, or services {#core.components}
- `src/app/` is the main Angular application shell for schema editing, rule design, validator workflows, and history views `src/app/app.component.ts:27-150`.
- `src/app/kernel/` is the rule-engine core with evaluation, synthesis, linting, coverage, and diff logic `src/app/services/rule-engine.service.ts:119-156`.
- `server/` is the backend API for rules and glossary persistence `server/index.js:72-195` and `server/db.js:1-96`.

## High-level component map {#core.map}
The Angular app boots from `src/main.ts` and drives the main workflow through `AppComponent`. Services in `src/app/services/` expose the rule-engine interface, while the kernel implements the actual logic. The backend is a separate persistence layer that the frontend can query over HTTP.

## Main entry points {#core.entrypoints}
- `src/main.ts:1-6` bootstraps the Angular app.
- `src/app/app.component.ts:27-150` defines the main UI state and tab workflow.
- `server/index.js:1-204` starts the Express server and registers API endpoints.

## Primary technologies {#core.tech}
Angular 17, TypeScript, RxJS, Tailwind/PostCSS, Express, PostgreSQL, and the Google Generative AI SDK are present in `package.json` and `server/package.json`. The test stack uses Jasmine and Karma.

## Standard build and test commands {#core.commands}
- `npm start` launches the Angular dev server.
- `npm run build` compiles the Angular app.
- `npm test` runs the Angular test harness.
- `cd server && npm start` runs the Express API.

## Important risks {#core.risks}
The main risk is drift between the UI, kernel, and backend layers because the repository spans three separate implementation surfaces. The backend also depends on PostgreSQL and optional Gemini credentials, and no production deployment manifest was observed.

## Important unknowns {#core.unknowns}
- No explicit product owner or target industry was found in the repository.
- The current branch was not available as a named branch from Git at inspection time, so the branch field is recorded as `unknown`.

## Commit, generation date, and freshness warning {#core.freshness}
Inspected commit: `c9680d4f78d1cc34be385f6629b9be0df4b3c31d`. Generated at `2026-08-04T14:48:37Z`. Treat this as grounding for that commit, not as a live view of the repository if it changes later.

## Recommended next view for each common task {#core.routing}
- Product or business impact: `views/business.md`.
- Implementation or debugging: inspect `src/app/services/rule-engine.service.ts` and `src/app/kernel/`.
- Test creation or validation: start with `src/app/kernel/kernel.spec.ts` and `src/app/services/rule-store.service.ts`.


## Repository grounding: singularity/world-model/views/business.md

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


## Repository grounding: singularity/world-model/task-guides/current-objective.md

> **Grounding** · logic-engine @ `c9680d4f78d1cc34be385f6629b9be0df4b3c31d` · view: `task.current-objective` · tier: `full`
> **Generated** 04 August 2026 (2026-08-04T14:48:37Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#task.current-objective.tldr}
This task is to build a modular repository-world model for the current repository and emit a grounded, token-efficient package into the output directory. The relevant repository surfaces are the Angular UI shell, the rule-engine kernel, and the Express API. The smallest useful change set is the shared core, the requested business view, the evidence ledger, the path index, and the manifest. Avoid changing application source files; work only under the output directory.

## Task interpretation {#task.current-objective.task}
The exact current task text is: `current objective`. The objective is to inspect the repository and create grounding documents that help a downstream agent understand the repository without over-consuming tokens. The deliverable is a world-model package, not a product change.

## Relevant roles {#task.current-objective.roles}
- Repository-grounding builder: this package should stay concise and modular.
- Business-facing reviewer: the business view should explain what the system does and where the domain vocabulary lives.
- Implementation reviewer: the core and path index should point to the main entry points and relevant kernels.

## Relevant components {#task.current-objective.components}
- `src/app/app.component.ts` and `src/app/app.component.html` for the UI shell and visible workflows.
- `src/app/services/rule-engine.service.ts` and `src/app/services/rule-store.service.ts` for service boundaries and validation workflows.
- `src/app/kernel/` for the framework-agnostic engine.
- `server/index.js` and `server/db.js` for API and persistence.

## Primary paths and symbols {#task.current-objective.paths}
- `src/main.ts` bootstrap path.
- `AppComponent` in `src/app/app.component.ts`.
- `RuleEngineService` in `src/app/services/rule-engine.service.ts`.
- `RuleStoreService` in `src/app/services/rule-store.service.ts`.
- `Evaluator`, `Linter`, `Synthesizer`, and `computeCoverage` under `src/app/kernel/`.

## Expected change flow {#task.current-objective.flow}
1. Inspect the root manifests and UI entry points.
2. Capture the business-facing purpose from sample rules and glossary terms.
3. Create the shared core, business view, task guide, evidence ledger, path index, and manifest under the output directory.
4. Validate that the JSON files parse and that every generated file path appears in the manifest.

## Contracts and invariants to preserve {#task.current-objective.contracts}
- Do not edit application source files.
- Keep generated artifacts under the output directory only.
- Record the commit, branch, generation time, and builder metadata in every generated Markdown document and in the canonical JSON files.
- Use observed facts and mark unknowns rather than inferring beyond the evidence.

## Tests or checks to run {#task.current-objective.tests}
- Validate JSON parsing for `manifest.json`, `core/model.json`, and `index/path-map.json`.
- Verify that every generated file exists and is a regular file.
- Confirm that every Markdown document begins with the required consumer header and that headings are anchored.

## Commands to run {#task.current-objective.commands}
- `python3 -m json.tool manifest.json > /dev/null`
- `python3 -m json.tool core/model.json > /dev/null`
- `python3 -m json.tool index/path-map.json > /dev/null`
- `find output -type f | sort`

## Risks and unknowns {#task.current-objective.risks}
The main risk is over-claiming product intent from sample data. The current branch was not available as a named branch from Git at inspection time, so that field is recorded as `unknown`.

