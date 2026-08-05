> **Grounding** · RuleEngineUI @ `ceed449863d693f203efab6d44259d8dc4655d68` · view: `{view_id}` · tier: `{tier}`
> **Generated** 05 August 2026 (2026-08-05T13:52:52Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#core.tldr}
This repository is a mixed Angular + Express rule-engine workspace. The main product surface is a browser console for authoring decision rules, testing them, and reviewing execution history; the backend exposes CRUD APIs for rules and glossary data backed by PostgreSQL. The most important entry points are the Angular bootstrap file, the root package scripts, and the Express API server. The repo is grounded in concrete files such as `src/app/app.component.ts`, `src/app/services/rule-engine.service.ts`, `server/index.js`, and `server/db.js`. The largest current risk is that runtime behavior depends on local PostgreSQL and optional Gemini credentials, while the exact business scope of WRK-999 remains unspecified in the repository.

## Facts {#core.facts}

```yaml
repository_kind: mixed
languages: [TypeScript, JavaScript, HTML, CSS]
package_roots: [".", "server"]
entrypoints:
  - { id: frontend-entry, path: "src/main.ts:1-6", invocation: "npm start" }
  - { id: backend-entry, path: "server/index.js:1-204", invocation: "node server/index.js" }
components:
  - { id: frontend-console, path: "src/app/app.component.ts:27-151", purpose: "Angular UI for rule authoring, schema management, validation, and history" }
  - { id: rule-engine-kernel, path: "src/app/services/rule-engine.service.ts:35-156", purpose: "Framework-agnostic rule evaluation, linting, and synthetic test-data logic" }
  - { id: rule-api, path: "server/index.js:73-204", purpose: "Express API for rules/glossary persistence and health checks" }
commands:
  - { command: "npm run build", purpose: "Build the Angular application", source: "package.json:3-9" }
  - { command: "npm run test -- --watch=false --browsers=ChromeHeadless", purpose: "Run the existing Karma test suite", source: "package.json:3-9" }
```

## Repository purpose {#core.purpose}
The repo appears to be a rule-authoring and validation console for decision logic, with sample content around transaction/risk scenarios. The frontend is a polished Angular UI for editing rules, examining data schemas, and running validator workflows; the backend persists rule and glossary data in PostgreSQL and exposes a health endpoint.

## Repository type and languages {#core.type}
This is a mixed web application repository. The primary app is written in TypeScript with Angular and HTML/CSS templates; the backend is JavaScript/Node.js using Express. The rule engine kernel and tests are also TypeScript.

## Main applications and services {#core.components}
- Frontend console: `src/app/` provides the Angular UI. The app shell combines a rules editor, a decision-table view, a DAG-style canvas, a validator studio, and an execution history panel.
- Rule engine kernel: `src/app/kernel/` implements typed comparison and three-valued logic, linting, coverage, and synthesizer helpers.
- Backend API: `server/` hosts an Express service and PostgreSQL initialization logic for rules and glossary records.

## High-level component map {#core.map}
The Angular UI loads the main application shell via `src/main.ts`, then renders domain-specific components from `src/app/components/`. The `RuleStoreService` and `RuleEngineService` in `src/app/services/` coordinate local state, persistence, and rule evaluation. The backend API in `server/index.js` is a separate process that the UI expects to reach at `http://localhost:65421/api/glossary` for glossary data and via PostgreSQL-backed CRUD endpoints.

## Main entry points {#core.entrypoints}
- `src/main.ts:1-6` bootstraps the Angular app.
- `package.json:3-9` defines `npm start`, `npm run build`, and `npm run test` for the frontend.
- `server/index.js:1-204` starts the Express API and registers routes under `/api/`.

## Primary technologies {#core.tech}
Angular 17, TypeScript, Angular CLI, RxJS, Tailwind-like utility styling, Express, PostgreSQL via `pg`, and optional Gemini integration for naming rules. The build and tests run under Karma and Chrome Headless in this environment.

## Standard build and test commands {#core.commands}
- `npm run build` from the repository root builds the Angular application. It completed successfully after dependencies were installed.
- `npm run test -- --watch=false --browsers=ChromeHeadless` executed successfully and reported 22 passing tests.
- `node server/index.js` starts the backend service, but it was not launched during this quick inspection.

## Important risks {#core.risks}
- The frontend and backend are coupled through a hard-coded glossary endpoint and local PostgreSQL expectations; local development needs both services and the right environment variables.
- The repository’s install path required a legacy peer-deps workaround because Angular 17’s build toolchain and the Tailwind version present in the repo conflict at install time.
- The current worktree is not clean: tracked files under `singularity/work-items/WRK-999/` are deleted in the working tree, so the repo state is not a clean baseline.

## Important unknowns {#core.unknowns}
- The exact business scope of WRK-999 and the intended production workflow are not defined in the checked-in source.
- The repository does not include deployment manifests or a production topology description for the backend service.

## Commit, generation date, and freshness warning {#core.freshness}
Inspected commit: `ceed449863d693f203efab6d44259d8dc4655d68` on `HEAD` at generation time `2026-08-05T13:52:52Z`. This grounding was generated from repository contents as they existed at that commit, and the worktree is not clean; treat locations as hints if the repository changes.

## Recommended next view {#core.routing}
- For business-facing questions, start with `views/business.md`.
- For implementation or refactoring questions, use `views/business.md` plus this core summary because the code is split between UI, kernel, and backend concerns.
