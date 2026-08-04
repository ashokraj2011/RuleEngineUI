> **Grounding** · RuleEngineUI @ `b34c514287ef4436c14ab00b964f233759334871` · view: `development` · tier: `full`
> **Generated** 4 August 2026 (2026-08-04T15:13:27.439Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#dev.tldr}
For implementation work, start in the Angular shell and the rule kernel. The app shell (`src/app/app.component.ts`) composes the UI and loads glossary data; the validator experience is driven by `src/app/services/rule-store.service.ts`, which persists cases, fixtures, suites, and run history in browser storage; the kernel package under `src/app/kernel/` contains the pure evaluation, lint, synthesis, and coverage logic. The backend at `server/index.js` exposes rule and glossary APIs and seeds a Postgres schema when available.

## Facts {#dev.facts}
```yaml
components:
  - { id: frontend-app, path: src/app/, responsibility: "UI shell, rule composition, validator studio" }
  - { id: rule-kernel, path: src/app/kernel/, responsibility: "rule evaluation, linting, synthesis, coverage" }
  - { id: backend-api, path: server/, responsibility: "rules/glossary CRUD and schema initialization" }
entrypoints:
  - { id: angular-bootstrap, path: src/main.ts:1-6, invocation: "npm start" }
  - { id: app-shell, path: src/app/app.component.ts:27-150, invocation: "top-level Angular app" }
  - { id: validator-store, path: src/app/services/rule-store.service.ts:37-363, invocation: "persists validator state" }
key_symbols:
  - { name: RuleEngineService, path: src/app/services/rule-engine.service.ts:35-156, role: "Angular facade over the kernel" }
  - { name: RuleStoreService, path: src/app/services/rule-store.service.ts:37-363, role: "stateful validator and test-case store" }
commands:
  - { command: "npm run build", purpose: "build the app", source: package.json:4-9 }
  - { command: "npm test -- --watch=false --browsers=ChromeHeadless", purpose: "run Karma tests", source: package.json:4-9 }
hotspots:
  - { path: src/app/services/rule-store.service.ts, reason: "central state and persistence for validator workflows" }
  - { path: src/app/kernel/, reason: "shared logic used by the UI and test cases" }
```

## Developer setup {#dev.setup}
Install dependencies with `npm install --legacy-peer-deps` in the repository root. The Angular app is the primary development target; the backend is optional for the UI to load glossary data, but the browser presently calls `http://localhost:65421/api/glossary` from `src/app/app.component.ts`. If you need the full local stack, run the backend with `node server/index.js` after supplying PostgreSQL and Gemini environment variables through the root `.env` file.

## Source tree map {#dev.tree}
- `src/main.ts`: Angular bootstrap.
- `src/app/app.component.ts`: top-level shell and tab orchestration.
- `src/app/components/`: standalone UI pieces such as `sidebar`, `data-schema`, `rule-sets`, `decision-table`, and the validator tabs.
- `src/app/services/`: `rule-engine.service.ts` and `rule-store.service.ts`, the two Angular-facing service layers.
- `src/app/kernel/`: pure rule engine implementation with `ast`, `logic`, `schema`, `evaluate`, `synthesize`, `lint`, `coverage`, and `diff` modules.
- `src/app/validator-data/`: sample rules and synthetic test data.
- `server/`: Express API and PostgreSQL initialization logic.

## Important modules and symbols {#dev.symbols}
- `RuleEngineService` in `src/app/services/rule-engine.service.ts` is the main facade for the UI. It maps glossary fields into a `SchemaRegistry`, evaluates rules through kernel classes, and exposes linting/synthesis helpers.
- `RuleStoreService` in `src/app/services/rule-store.service.ts` is the validator state container. It seeds sample cases, persists them with `LocalStoragePort`, and computes coverage from recorded evaluation results.
- `SchemaRegistry` and `SAMPLE_SCHEMA` in `src/app/kernel/schema.ts` define the typed namespaces for the rule engine. The current demo schema covers namespaces such as `customer`, `account`, `product`, `campaign`, `order`, and `session`.
- `SAMPLE_RULES` in `src/app/validator-data/sample-rules.ts` supplies the default demo rules, including chained rule references and session-backed conditions.

## Entrypoints and initialization {#dev.entrypoints}
Start from `src/main.ts` for the browser boot. The root app component (`src/app/app.component.ts`) imports the shell components, holds the tab state, and on startup calls the backend glossary endpoint. The validator experience is initialized through `ShellComponent` (`src/app/components/validator/shell/shell.component.ts`), which wires the overview, test-data, generated-cases, evaluate, coverage, validate, and library tabs to the shared store.

## Common implementation flows {#dev.flows}
1. A user changes the schema in the data-schema UI and the app propagates field updates through `handleFieldsChange()` in `src/app/app.component.ts` into `RuleEngineService.syncGlossary()`.
2. Rule logic is composed in the rules UI; the validator workflow then uses `RuleStoreService.executeTestCase()` and `executeTestCases()` to run rules against snapshots and record run results.
3. Coverage and regression reporting are computed from `evalResult` traces stored in `runHistory`, not from ad-hoc counters.
4. The backend offers CRUD for rules and glossary via `server/index.js`, and it creates tables on startup through `server/db.js` if they do not already exist.

## Configuration loading and persistence {#dev.config}
The frontend uses `LocalStoragePort` from `src/app/services/persistence.ts` as the default persistence adapter. It writes keys such as `ruleValidator_testCases`, `ruleValidator_runHistory`, `ruleValidator_fixtures`, and `ruleValidator_suites`, and uses a schema-version migration path. The backend uses `dotenv` with a root `.env` file and a `pg` connection pool with default host/database values that are easy to override in local development.

## Error handling and validation {#dev.errors}
The kernel and services are designed around explicit evaluation statuses (`PASSED`, `FAILED`, `SKIPPED`) rather than throwing for normal rule outcomes. The UI surfaces validation via `RuleStoreService` and the validator tabs; the backend returns JSON errors for invalid requests and falls back to an offline name generator when Gemini credentials are absent. For local debugging, start with the validator store and the rule-engine service before instrumenting the kernel modules.

## Change-impact guide {#dev.impact}
If you change the rule grammar or the typed schema contract, review `src/app/kernel/schema.ts` and the kernel modules together with `src/app/services/rule-engine.service.ts`. Any change in the persisted validator data format should preserve backward compatibility with `persistence.ts` and the `STORE_SCHEMA_VERSION` constant. If you change API shape or glossary semantics, update both `server/index.js` and the frontend logic that consumes `/api/glossary` and `/api/rules`.

## Debugging starting points {#dev.debugging}
- If the UI does not load glossary entries, inspect `src/app/app.component.ts` and `server/index.js` together.
- If a validator tab behaves unexpectedly, inspect `src/app/services/rule-store.service.ts` and `src/app/components/validator/shell/shell.component.ts`.
- If a rule evaluation is wrong, start with `src/app/kernel/evaluate.ts`, `src/app/kernel/lint.ts`, and `src/app/kernel/synthesize.ts`.
- If a test case or fixture is missing, inspect the seed logic in `RuleStoreService` and the storage keys in `src/app/services/persistence.ts`.

## Known implementation hotspots {#dev.hotspots}
- `src/app/services/rule-store.service.ts` is the central coordinator for validator state, sample-data seeding, execution, coverage, and persistence.
- `src/app/kernel/` is shared logic and should be treated as the contract boundary for rule semantics.
- `server/index.js` is a mixed concerns module: it exposes HTTP routes, initializes tables, and coordinates optional AI generation.

## Where to start {#dev.start}
- For a small UI change: `src/app/app.component.ts`, the relevant component under `src/app/components/`, and the associated service.
- For a rule semantics change: `src/app/kernel/` plus `src/app/services/rule-engine.service.ts`.
- For validator or persistence work: `src/app/services/rule-store.service.ts` and `src/app/services/persistence.ts`.

## Questions this view does not answer {#dev.limits}
- It does not document every component in the UI, only the core development paths and the validator subsystem.
- It does not provide deployment or production-operations guidance beyond the local stack assumptions visible in source.
- It does not assert the behavior of the external PostgreSQL or Gemini services beyond what the code clearly expects.
