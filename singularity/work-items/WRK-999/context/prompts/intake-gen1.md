# Active Story phase contract: Intake

- Work ID: `WRK-999`
- Work type: `feature`
- Phase: `intake`
- Generation to author: 1
- Required artifact: `artifacts/intake/intake.md`
- Write scope: `artifact-only`
- Approval authority groups: `product-approvers`
- Minimum distinct approvals: 1

## Configured artifact template

# WRK-999 — Feature Intake

## User and outcome

TODO: Identify the user, problem, and measurable outcome.

## Proposed capability

TODO: Describe the requested capability without prescribing implementation.

## Scope, constraints, and stakeholders

TODO: Record boundaries, dependencies, urgency, and stakeholders.

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

> **Grounding** · RuleEngineUI @ `00ebe873dc0c98a71707575ec3fdc374b5b54dfc` · view: `core` · tier: `full`
> **Generated** 5 August 2026 (2026-08-05T14:45:35Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## TL;DR {#core.tldr}

This repository is a browser-based rule-engine console for creating, validating, and testing decision rules. The Angular frontend hosts schema editing, rule authoring, validator studio, and execution history, while the Express server persists rules and glossary data in PostgreSQL and can optionally generate rule names via Gemini. The main entry points are `src/main.ts` and `server/index.js`. The evaluation logic is concentrated in `src/app/kernel`. The largest risk is that the UI and backend remain partially scaffolded and depend on local services that are not fully wired in this snapshot.

## Repository purpose {#core.purpose}

The repository implements a rule-authoring and validation experience for decision logic. The UI lets a user explore a schema, design rules, validate outcomes, and inspect execution traces. The backend stores glossary metadata and rules and exposes simple APIs for the front end.

## Repository type and languages {#core.type}

This is an application-style repository, not a general-purpose library. The primary languages are TypeScript and JavaScript, with Angular templates and CSS for the frontend and Express for the backend. The project also uses HTML and Tailwind-style utility classes.

## Main applications, packages, or services {#core.components}

- `src/` — the Angular application shell, UI components, rule engine kernel, and sample data.
- `server/` — an Express API that talks to PostgreSQL and exposes `/api/glossary`, `/api/rules`, and `/api/health`.
- `singularity/` — repository workflow and capability metadata used by the surrounding delivery environment.

## High-level component map {#core.map}

- The Angular entry component in `src/main.ts` bootstraps `AppComponent`, which switches between schema, rules, validator, functions, history, and support views.
- `src/app/kernel/` contains the rule engine implementation: evaluation, synthesis, linting, coverage, comparison, and AST helpers.
- `src/app/services/` holds stateful services for rule storage, validation, and persistence across the UI.
- `server/index.js` and `server/db.js` manage persistence and API routes.

## Main entry points {#core.entrypoints}

- `src/main.ts` — Angular bootstrap for the web UI.
- `src/app/app.component.ts` — the top-level shell that wires the sidebar, header, and active workspace views.
- `server/index.js` — Express API entry point.

## Primary technologies {#core.tech}

- Angular 17 with standalone components and TypeScript.
- Tailwind-style utility classes and CSS variables for visual theming.
- Express, PostgreSQL via `pg`, and optional Gemini integration for rule-name generation.
- Jasmine/Karma test scaffolding is present for the kernel.

## Standard build and test commands {#core.commands}

- `npm start` or `npm run build` from the repository root for the Angular app.
- `npm test` from the repository root for the test runner.
- `node server/index.js` from `server/` for the API.

## Important risks {#core.risks}

- The backend expects PostgreSQL and a local `.env` configuration; it is not self-contained in this snapshot.
- The UI includes simulated publish behavior and a left-panel shell that is visually significant but not tied to a production deployment pipeline.
- The working tree is not clean at inspection time; tracked files under `singularity/` are already marked deleted.

## Important unknowns {#core.unknowns}

- No production deployment or environment manifest was found beyond the local dev server and API entry points.
- No end-to-end or browser-level test suite was found in the repository snapshot.
- The repository currently appears to be checked out at a detached `HEAD`, so a branch name is not available from Git metadata.

## Commit, generation date, and freshness warning {#core.freshness}

- Inspected commit: `00ebe873dc0c98a71707575ec3fdc374b5b54dfc`
- Generated: `2026-08-05T14:45:35Z` (`5 August 2026`)
- Freshness warning: this world model reflects the repository as inspected at that commit; if the code changes, treat these documents as hints rather than facts.

## Recommended next view for each common task {#core.routing}

- Product or business change: `views/business.md`
- Design or dependency review: `views/architecture.md` (not generated in this quick pass)
- Implementation or debugging: `views/development.md` (not generated in this quick pass)
- Validation or regression work: `views/testing.md` (not generated in this quick pass)


## Repository grounding: singularity/world-model/views/business.md

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


## Repository grounding: singularity/world-model/domains/ui-theming.md

> **Grounding** · RuleEngineUI @ `00ebe873dc0c98a71707575ec3fdc374b5b54dfc` · view: `ui-theming` · tier: `full`
> **Generated** 5 August 2026 (2026-08-05T14:45:35Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## TL;DR {#domain.ui-theming.tldr}

This domain covers the presentation layer and the visual contract of the left navigation shell. The most relevant implementation surface is `src/app/components/sidebar/sidebar.component.ts`, which defines the sidebar container, menu items, and the visual styling classes used by the main application shell. For a change like “change the color black left panel”, the safest interpretation is a UI-only adjustment to those classes rather than a change to business logic.

## Domain purpose {#domain.ui-theming.purpose}

The repository uses a themed shell to present navigation, actions, and status across the application. The sidebar is the primary persistent navigation surface and therefore has a strong effect on user perception and usability.

## Terminology {#domain.ui-theming.terminology}

- Sidebar: the fixed left navigation surface.
- Surface token: a Tailwind-style visual class such as `bg-surface-container-low` or `bg-primary-container`.
- Active state: the current tab or menu item.

## Owning components {#domain.ui-theming.owners}

- `src/app/components/sidebar/sidebar.component.ts` — defines the sidebar markup and container classes.
- `src/app/app.component.html` — places the sidebar beside the main workspace area and sets the content offset.
- `src/styles.css` — likely carries shared design tokens if the app theme is extended.

## Main workflow {#domain.ui-theming.workflow}

1. A user selects a navigation item in the sidebar.
2. The parent `AppComponent` updates the active tab state.
3. The sidebar component re-renders its active styling and the workspace content changes.
4. The visual state is driven by Angular property bindings and utility classes rather than an explicit state machine.

## Invariants {#domain.ui-theming.invariants}

- The sidebar should remain visible and fixed to the left edge while the main content area occupies the remaining width.
- Changes should preserve contrast for text and icons against the background.
- Theme changes should remain scoped to presentation and not alter rule behavior or data flows.

## Change risks {#domain.ui-theming.risks}

- Replacing the background class without preserving contrast can make navigation unreadable.
- If the color is changed only in one branch of a class expression, the dark-mode variant may still override the desired appearance.
- Editing the template directly can affect other surfaces if the class names are reused elsewhere.

## Unknowns {#domain.ui-theming.unknowns}

- The repository does not expose a theme configuration file for the sidebar.
- The exact design-token mapping for `bg-surface-container-low` is not defined in the checked-in files.

## Evidence {#domain.ui-theming.evidence}

- `src/app/components/sidebar/sidebar.component.ts:13` defines the sidebar container classes.
- `src/app/app.component.html:13-21` places the sidebar and reserves space for the main content area.


## Repository grounding: singularity/world-model/task-guides/change-color-black-left-panel.md

> **Grounding** · RuleEngineUI @ `00ebe873dc0c98a71707575ec3fdc374b5b54dfc` · view: `change-color-black-left-panel` · tier: `full`
> **Generated** 5 August 2026 (2026-08-05T14:45:35Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## TL;DR {#task.change-color-black-left-panel.tldr}

This guide is the smallest grounding package for changing the left navigation panel color. The relevant implementation surface is the sidebar component in `src/app/components/sidebar/sidebar.component.ts`. The change is presentation-only and should not affect rule evaluation, persistence, or validation logic.

## Task interpretation {#task.change-color-black-left-panel.task}

The request “Change the color black left panel” appears to describe the fixed left sidebar in the application shell. In the current code, that panel is implemented by `SidebarComponent` and its container uses visual utility classes in the inline template. The likely intent is to adjust the background color of that container without changing the application workflow.

## Relevant roles {#task.change-color-black-left-panel.roles}

- UI/UX implementer or front-end developer
- QA reviewer validating visual consistency
- Product or design reviewer confirming the intended look

## Relevant components {#task.change-color-black-left-panel.context}

- `src/app/components/sidebar/sidebar.component.ts` — the sidebar template and visual classes
- `src/app/app.component.html` — the placement of the sidebar and main content
- `src/styles.css` — shared styling tokens if a global theme change is needed

## Relevant domain models {#task.change-color-black-left-panel.domain}

- `domains/ui-theming.md`

## Primary paths and symbols {#task.change-color-black-left-panel.paths}

- `SidebarComponent` in `src/app/components/sidebar/sidebar.component.ts`
- `AppComponent` in `src/app/app.component.ts` for mounting and state
- The `aside` container class on the sidebar template, currently using the visual utility classes for the background

## Expected change flow {#task.change-color-black-left-panel.flow}

1. Inspect the sidebar component and identify the background classes on the `<aside>` element.
2. Update the relevant class names or add a specific color class while preserving contrast and other layout behavior.
3. Verify the sidebar still renders correctly and that the main content area remains offset correctly.
4. If the requirement is a global theme change, consider whether the same color should also apply to dark-mode variants.

## Contracts and invariants to preserve {#task.change-color-black-left-panel.invariants}

- Do not change tab-selection logic, routing, or data service behavior.
- Preserve the fixed-width sidebar layout and content offset.
- Preserve readable contrast for text and icons.

## Tests to add or update {#task.change-color-black-left-panel.tests}

No repository-specific UI test file was found for the sidebar. A simple manual verification step is appropriate: launch the app and confirm the left panel background renders as intended in the default view. If a test suite is added later, prefer a component-level rendering test for the sidebar classes.

## Commands to run {#task.change-color-black-left-panel.commands}

- `npm start` from the repository root to view the UI
- `npm run build` if you want to confirm the app still compiles

## Risks and unknowns {#task.change-color-black-left-panel.risks}

- The exact design-token system for the current color classes is not defined in the checked-in files.
- The sidebar may appear differently depending on the active theme or dark-mode variant.
- The repo currently has an unclean working tree and detached `HEAD`; verify you are inspecting the correct revision before making changes.

## Evidence {#task.change-color-black-left-panel.evidence}

- `src/app/components/sidebar/sidebar.component.ts:13` defines the sidebar container background classes.
- `src/app/app.component.html:13-21` shows the sidebar placement relative to the main content area.

