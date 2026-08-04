> **Grounding** · RuleEngineUI @ `b34c514287ef4436c14ab00b964f233759334871` · view: `development` · tier: `full`
> **Generated** 04 August 2026 (2026-08-04T15:06:58Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## TL;DR {#dev.tldr}

Evidence: `ev-01`, `ev-03`, `ev-04`, `ev-05`, `ev-06`.

The development view focuses on the implementation surface a coder or reviewer will touch first: the Angular shell, the rule-authoring components, the validator studio, the reusable kernel, and the backend API. The most important code paths are bootstrapping in `src/main.ts`, state and evaluation in `src/app/services`, the UI in `src/app/components`, and the engine in `src/app/kernel`. The repo is relatively modular: app UI concerns are separate from engine logic, and the validator uses local storage plus a typed kernel. The main risk for change work is coupling around the shared `RuleStoreService` and the backend glossary dependency.

## Facts {#dev.facts}

```yaml
components: [app-shell, rule-authoring-ui, validator-studio, kernel, backend-api]
entrypoints:
  - { id: angular-bootstrap, path: src/main.ts, line: 1, invocation: "bootstrapApplication(AppComponent, appConfig)" }
  - { id: app-shell, path: src/app/app.component.ts, line: 27, invocation: "activeTab-driven view switch" }
  - { id: backend-api, path: server/index.js, line: 1, invocation: "node server/index.js" }
key_symbols:
  - { name: AppComponent, path: src/app/app.component.ts, line: 27, role: "top-level routing and shared state" }
  - { name: RuleStoreService, path: src/app/services/rule-store.service.ts, line: 36, role: "validator state, persistence, sample data" }
  - { name: RuleEngineService, path: src/app/services/rule-engine.service.ts, line: 35, role: "Angular facade over kernel" }
  - { name: SAMPLE_RULES, path: src/app/validator-data/sample-rules.ts, line: 5, role: "seed rules for the validator" }
commands:
  - { command: "npm run build", purpose: "frontend build", source: "package.json:1-42" }
  - { command: "node server/index.js", purpose: "backend API", source: "server/package.json:1-16" }
hotspots:
  - { path: src/app/services/rule-store.service.ts, reason: "shared state, persistence, sample data seeding, and evaluation orchestration" }
  - { path: src/app/services/rule-engine.service.ts, reason: "wrapper over the kernel; changes affect every validator and rule UI feature" }
```

## Where to start {#dev.start}

- For feature work in the visual rule authoring experience, start with `src/app/app.component.ts` and the components under `src/app/components/`: `RuleSetsComponent`, `DecisionTableComponent`, `RuleCanvasComponent`, and `RuleConfigComponent`. These files define the current UX surface and the active tab behavior.
- For validator and coverage work, start with `src/app/services/rule-store.service.ts` and `src/app/components/validator/shell/shell.component.ts`. These coordinate the test-case manager, generated cases, evaluation runs, and coverage reports.
- For engine semantics, start with `src/app/kernel` and the facade `src/app/services/rule-engine.service.ts`. The pure kernel is where evaluation, synthesis, lint rules, and coverage live.
- For backend/API changes, start with `server/index.js` and `server/db.js`; the browser calls `/api/glossary` and `/api/rules` from the frontend.

## Source tree map {#dev.structure}

- `src/app/components/` — feature components for schema, rules, functions, history, and validator tabs.
- `src/app/services/` — cross-cutting services for state (`RuleStoreService`), engine access (`RuleEngineService`), and persistence (`persistence.ts`).
- `src/app/kernel/` — framework-agnostic rule engine modules: AST, logic, schema, compare, evaluate, synthesize, lint, coverage, diff.
- `src/app/validator-data/` — seed rules and synthetic test cases that make the validator experience demo-ready.
- `server/` — Express API and database bootstrap.

## Common implementation flows {#dev.flows}

1. The Angular shell in `src/app/app.component.ts` selects the active tab and presents the right component.
2. The rule-authoring UI feeds shared data into `RuleStoreService` and `RuleEngineService`.
3. The validator studio uses the store plus the kernel to generate cases, execute them, and compute coverage.
4. The backend optional API is called by the frontend for glossary sync and future persistence; the current code already expects `/api/glossary` to return rows.

## Configuration, persistence, and error handling {#dev.config}

- The frontend uses Angular dependency injection and browser `localStorage` through `src/app/services/persistence.ts` for test cases, runs, fixtures, and suites. Evidence of that lifecycle is in `src/app/services/rule-store.service.ts:55-126`.
- The server uses `dotenv` and a root `.env` file when present; `server/db.js` reads `DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, and `DB_PORT`.
- Logging is lightweight: the app uses `console.error` and `console.log` in the server and shell, rather than a structured logger.
- The backend’s Gemini path is guarded by a placeholder API key check and falls back to an offline generator in `server/index.js:43-70`.

## Change-impact guide {#dev.impact}

- Changing the rule grammar or evaluation semantics will likely touch `src/app/kernel/*` and `src/app/services/rule-engine.service.ts`; the validator and UI components depend on the returned evaluation results.
- Adding or renaming schema fields affects both the glossary sync path in `src/app/app.component.ts` and the kernel’s type registry logic in `src/app/services/rule-engine.service.ts`.
- Changing rule persistence or the local storage shape should be checked against `src/app/services/rule-store.service.ts` and `src/app/services/persistence.ts`.
- Any broad UI change should verify the active-tab wiring in `src/app/app.component.ts` and the sidebar validator tab mapping in `src/app/components/sidebar/sidebar.component.ts`.

## Debugging starting points {#dev.debug}

- If the UI does not show the expected rules or validator state, inspect `RuleStoreService` initialization and the sample data seeding path in `src/app/services/rule-store.service.ts:55-126`.
- If the validator appears inconsistent, compare the rule under test in the store with the evaluation results produced by `RuleEngineService.evaluateRule`.
- If glossary fields are missing, check the browser fetch in `src/app/app.component.ts:81-99` and the backend endpoint in `server/index.js:151-160`.
- If the backend fails to start, confirm the `.env` values and PostgreSQL connectivity used by `server/db.js:4-10`.

## Validation commands {#dev.validation}

- `npm run build` — current baseline build; succeeded with Angular budget warnings.
- `npm test` — present in the scripts, but this run did not execute it.
- `node server/index.js` — server startup path; not exercised in this run.

## Known implementation hotspots {#dev.hotspots}

- `src/app/services/rule-store.service.ts` — central state store, persistence, sample data generation, test case execution, and coverage computation.
- `src/app/services/rule-engine.service.ts` — façade over the kernel; broad blast radius for UI changes.
- `src/app/kernel/` — if the rule engine evolves, nearly every validator feature is affected.

## Questions this view does not answer {#dev.limits}

- This view does not cover product strategy, business workflows, or release/deployment automation in depth.
- It does not attempt a full architectural review of every component; it focuses on where implementation work is likely to begin.
