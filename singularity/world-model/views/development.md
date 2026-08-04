> **Grounding** · RuleEngineUI @ `b4e86974ed427e76afbbd98c7403339e34b6bee9` · view: `development` · tier: `full`
> **Generated** 4 August 2026 (2026-08-04T15:19:35Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#dev.tldr}
This view is for implementation work in the rule-engine UI. It prioritizes where to start for changes to the Angular console, the validator studio, the kernel engine, and the Express API. The core implementation seams are the frontend shell in `src/app/app.component.ts`, the rule-engine facade in `src/app/services/rule-engine.service.ts`, the evaluator/linter/synthesizer modules under `src/app/kernel`, and the CRUD endpoints in `server/index.js`. The most common mistake is to change a UI or API surface without updating the kernel semantics or the persisted validator state in tandem.

## Facts {#dev.facts}

```yaml
components: [frontend-app, kernel-engine, validator-studio, backend-service]
entrypoints:
  - { id: ui-entry, path: src/main.ts, invocation: "npm start" }
  - { id: backend-entry, path: server/index.js, invocation: "node server/index.js" }
key_symbols:
  - { name: AppComponent, path: src/app/app.component.ts, role: "top-level console shell" }
  - { name: RuleEngineService, path: src/app/services/rule-engine.service.ts, role: "Angular facade over kernel" }
  - { name: Evaluator, path: src/app/kernel/evaluate.ts, role: "three-valued evaluator" }
  - { name: Synthesizer, path: src/app/kernel/synthesize.ts, role: "test-data synthesis" }
  - { name: RuleStoreService, path: src/app/services/rule-store.service.ts, role: "validator persistence and seeded data" }
commands:
  - { command: "npm run build", purpose: "build Angular app" }
  - { command: "npm test", purpose: "run Karma/Jasmine suite" }
  - { command: "node server/index.js", purpose: "run Express API server" }
hotspots:
  - { path: src/app/kernel/evaluate.ts, reason: "core semantics of rule evaluation" }
  - { path: src/app/services/rule-store.service.ts, reason: "state, persistence, and seeded validation workflows" }
  - { path: server/index.js, reason: "persistence endpoints and LLM fallback path" }
```

Evidence IDs: e2, e3, e4, e5, e6, e7.

## Where to start {#dev.start}
For a UI change, begin in `src/app/app.component.ts` and then move to the relevant component under `src/app/components/`. For example, the rule canvas is implemented in `src/app/components/rule-canvas/rule-canvas.component.ts`, while the validator surface is built around the shell and tabs under `src/app/components/validator/`. For evaluation or test-generation behavior, start with `src/app/services/rule-engine.service.ts` and the modules in `src/app/kernel/`. For server-side persistence or API shape changes, start with `server/index.js` and `server/db.js`.

## Source tree map {#dev.tree}
- `src/app/app.component.ts`: top-level console state, active tab, notifications, and initial glossary sync.
- `src/app/components/`: feature UIs for schema, rule sets, rule canvas, rule config, functions, history logs, and validator tabs.
- `src/app/services/`: Angular services for rule engine, rule store, persistence, and mock data.
- `src/app/kernel/`: framework-agnostic engine modules with AST helpers, logical operators, type-aware comparison, evaluation, synthesis, linting, coverage, and diff logic.
- `src/app/validator-data/`: sample rules and sample test cases used by the validator studio.
- `server/`: Express REST API, Postgres schema initialization, and optional Gemini integration.

## Important modules and symbols {#dev.symbols}
- `AppComponent` in `src/app/app.component.ts`: owns the main tab state and triggers a glossary fetch from the backend on init.
- `RuleEngineService` in `src/app/services/rule-engine.service.ts`: the Angular-facing API around `Evaluator`, `Linter`, `Synthesizer`, and helper functions from `src/app/kernel`.
- `Evaluator` in `src/app/kernel/evaluate.ts`: implements a tree-shaped evaluation trace with `PASSED`, `FAILED`, `UNKNOWN`, and short-circuit behavior for `AND`/`OR`.
- `Linter` in `src/app/kernel/lint.ts`: performs static checks for unknown attributes, type mismatches, contradictions, and cyclic references.
- `Synthesizer` in `src/app/kernel/synthesize.ts`: generates snapshots that satisfy a target outcome or a targeted branch condition.
- `RuleStoreService` in `src/app/services/rule-store.service.ts`: seeds sample validator data, persists it in browser storage, tracks coverage, and manages rule/test-case state.
- `LocalStoragePort` in `src/app/services/persistence.ts`: abstracts browser storage with migration logic and versioning.
- `initDb` in `server/db.js`: creates schema, seeds glossary rows, and initializes the PostgreSQL tables.

## Entry points and initialization {#dev.entrypoints}
The frontend bootstraps from `src/main.ts`, which calls `bootstrapApplication(AppComponent, appConfig)`. The app component then initializes its shared state and fetches glossary data from the backend. The backend starts in `server/index.js`, where `initDb()` is called immediately and the HTTP routes are registered. A change in either surface often requires re-checking the other side because the UI’s startup path depends on the backend route `/api/glossary`.

## Common implementation flows {#dev.flows}
1. Rule authoring flow: the UI collects terms and operators, the app shell manages state, and the validator/test surfaces rely on `RuleStoreService` and `RuleEngineService` to compute results.
2. Evaluation flow: `RuleEngineService.evaluateRule()` delegates to `Evaluator`, which walks comparison and logical terms, uses a schema registry for comparison typing, and returns a trace tree. The validator studio consumes these traces for coverage and diff analysis.
3. Test generation flow: `RuleStoreService` seeds fixtures and cases, and `Synthesizer` produces snapshots that drive rules to desired outcomes; the validator UI then records the results back into local state.
4. Backend persistence flow: `server/index.js` handles create/read/update/delete operations on rules and glossary entries, while `server/db.js` ensures the database tables exist and the initial glossary rows are present.

## Composition patterns {#dev.composition}
The Angular app is built as standalone components rather than NgModules. Services are injected via Angular’s dependency injection and expose the kernel without leaking Angular concepts into the engine layer. The kernel modules are pure TypeScript and are imported by services, making them good targets for regression tests and for non-UI reuse. The validator store uses a persistence port abstraction so it can swap local storage for another backend without scattering storage code across components.

## Error handling and configuration {#dev.errors}
The frontend logs failures to the console when glossary sync fails and uses notification state in `AppComponent` to show transient messages. The backend has explicit error handling around database queries and the Gemini API call: if the API key is absent or placeholder, the `/api/generate-name` route uses a deterministic offline summary builder rather than failing outright. The server also reads environment variables through `dotenv` and uses default local values for PostgreSQL connection parameters, which makes the runtime sensitive to local environment setup.

## Logging, observability, and persistence conventions {#dev.obs}
The code uses console logging in the frontend and backend for schema sync and API failures. The validator store persists runs, fixtures, suites, and cases through `LocalStoragePort` with key constants in `src/app/services/persistence.ts`. Coverage reporting is computed from recorded traces rather than from a literal or hard-coded branch table, which keeps behavior consistent with the engine’s semantics.

## Configuration loading and data access patterns {#dev.config}
The backend loads configuration from `.env` via `dotenv` and the Angular client targets a hard-coded local URL for the glossary endpoint. The rule engine obtains typed schema information from `SAMPLE_SCHEMA` and dynamic glossary sync in `RuleEngineService.syncGlossary()`. The validator layer seeds data from `validator-data/sample-rules.ts` and `validator-data/sample-test-cases.ts` when local storage is empty.

## Validation commands and debugging starting points {#dev.validation}
- Run `npm run build` from the repo root to validate the Angular app.
- Run `npm test` for the Karma/Jasmine suite; the main regression suite is `src/app/kernel/kernel.spec.ts`.
- Run `node server/index.js` (or `npm start` inside `server/`) to exercise the API and verify CRUD routes.
- For debugging the engine, place breakpoints in `src/app/kernel/evaluate.ts` and inspect the trace tree returned by `Evaluator.evaluate()`.
- For debugging the UI, start at `src/app/app.component.ts` and follow component state into `RuleStoreService`.

## Change-impact guide {#dev.impact}
Changes to comparison semantics, logical operators, or rule references will likely require updates in `src/app/kernel/evaluate.ts`, `src/app/kernel/logic.ts`, and `src/app/kernel/lint.ts`. Changes to validation UX or coverage behavior will likely affect `src/app/services/rule-store.service.ts` and the validator components under `src/app/components/validator/`. Changes to API or persisted schema will likely require coordinated updates in `server/index.js`, `server/db.js`, and the Angular glossary-fetch path in `src/app/app.component.ts`.

## Known implementation hotspots {#dev.hotspots}
- `src/app/kernel/evaluate.ts`: behaviorally central and likely to affect many features.
- `src/app/services/rule-store.service.ts`: cross-cutting state, persistence, and seeded-data logic.
- `server/index.js`: API routing, persistence, and fallback generation logic.
- `src/app/components/rule-canvas/rule-canvas.component.ts`: large UI surface with its own local state model and data shape.

## Questions this view does not answer {#dev.limits}
This view does not cover business requirements, deployment topology, or a full security review. It also does not attempt to document every validator tab in full; instead, it highlights the code paths that are most likely to matter for implementation and debugging.
