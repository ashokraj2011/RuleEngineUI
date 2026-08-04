> **Grounding** · RuleEngineUI @ `b34c514287ef4436c14ab00b964f233759334871` · view: `core` · tier: `full`
> **Generated** 4 August 2026 (2026-08-04T15:13:27.439Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#core.tldr}
RuleEngineUI is a browser-based rule-authoring and validation console for decision logic, backed by a small Express/Postgres API for glossary and rule persistence. The Angular app centers on data-schema management, a rule designer, decision-table editing, and a validator studio that evaluates rules through a framework-agnostic kernel. The main entry points are `src/main.ts`, `src/app/app.component.ts`, and `server/index.js`. The repo builds with Angular CLI and runs locally, but runtime behavior depends on a reachable Postgres instance and optional Gemini credentials.

## Facts {#core.facts}
```yaml
repository:
  name: RuleEngineUI
  root: .
  branch: detached-HEAD
  commit: b34c514287ef4436c14ab00b964f233759334871
  working_tree_clean: false
  repository_kind: multi-service
  languages: [TypeScript, JavaScript, HTML, CSS]
  package_roots: [., server]
components:
  - { id: frontend-app, name: Angular rule-console, kind: frontend, paths: [src/, src/app/] }
  - { id: rule-kernel, name: Pure rule evaluation kernel, kind: library, paths: [src/app/kernel/] }
  - { id: backend-api, name: Express glossary and rule API, kind: service, paths: [server/] }
entrypoints:
  - { id: angular-bootstrap, path: src/main.ts:1-6, invocation: "npm start" }
  - { id: app-shell, path: src/app/app.component.ts:27-150, invocation: "Angular app root" }
  - { id: api-server, path: server/index.js:7-204, invocation: "node server/index.js" }
standard_commands:
  - { command: "npm start", purpose: "start the Angular dev server", source: package.json:4-9 }
  - { command: "npm run build", purpose: "build the Angular application", source: package.json:4-9 }
  - { command: "npm test -- --watch=false --browsers=ChromeHeadless", purpose: "run the Karma suite", source: package.json:4-9 }
```

## Repository purpose {#core.purpose}
This repository is a rule-engine console for authoring decision policies, testing them, and inspecting their execution history. The product experience is a single-page Angular application that mixes schema design, rule composition, and validator workflows, while a small backend exposes persistence and AI-assisted rule naming.

## Repository type and languages {#core.type}
The repo is a hybrid web application: a TypeScript-based Angular frontend with a separate Node.js/Express service. The codebase uses TypeScript for the UI and kernel, JavaScript for the server, and HTML/CSS for templates and styling.

## Main applications, packages, or services {#core.components}
- `frontend-app`: the main Angular UI, implemented under `src/app/` and bootstrapped by `src/main.ts`.
- `rule-kernel`: a framework-agnostic rule engine and validation suite under `src/app/kernel/`, consumed by Angular services.
- `backend-api`: an Express API under `server/` that serves rules/glossary data from PostgreSQL and optionally generates names with Gemini.

## High-level component map {#core.map}
The Angular app renders a sidebar-driven console with tabs for schema, rules, validator studio, functions, and history. The rule-engine service bridges Angular components to the kernel; the store service persists test cases, fixtures, suites, and run history locally; the backend provides glossary data from Postgres and can be reached from the browser at `http://localhost:65421/api/glossary` by the current app bootstrap logic.

## Main entry points {#core.entrypoints}
- `src/main.ts`: bootstraps the Angular app.
- `src/app/app.component.ts`: composes the top-level UI and loads glossary data on initialization.
- `src/app/services/rule-engine.service.ts`: exposes the rule engine facade used by the UI.
- `server/index.js`: starts the Express API and defines REST endpoints for rules, glossary, and health checks.

## Primary technologies {#core.tech}
- Angular 17, standalone components, and Angular router.
- TypeScript, RxJS, and Zone.js for the client runtime.
- Express, CORS, dotenv, pg, and the Google Generative AI SDK for the backend.
- Tailwind-style utility classes and Lucide icons in the UI.

## Standard build and test commands {#core.commands}
- `npm start` starts the Angular dev server.
- `npm run build` produces the production bundle under `dist/logic-engine`.
- `npm test -- --watch=false --browsers=ChromeHeadless` runs the Karma suite.
- `node server/index.js` starts the backend service, assuming the database and environment variables are available.

## Important risks {#core.risks}
- The frontend currently expects a backend at `http://localhost:65421` and a PostgreSQL database; without those, glossary loading and persistence-backed features degrade.
- The backend uses environment-driven PostgreSQL and Gemini configuration, so local development depends on `.env` values being present.
- The Angular build emits a large initial bundle and already shows Tailwind-related build warnings in this environment.

## Important unknowns {#core.unknowns}
- There is no deployment manifest or CI/CD workflow in the inspected tree, so release automation is not grounded from source.
- The repository does not show a production database schema or migration strategy beyond the server-side `CREATE TABLE IF NOT EXISTS` statements.
- The app appears to be a demo/console experience rather than a deployed rule-service; runtime integrations beyond the local UI and backend are not evidenced here.

## Commit, generation date, and freshness warning {#core.freshness}
Inspected commit: `b34c514287ef4436c14ab00b964f233759334871`.
Generated at `2026-08-04T15:13:27.439Z` on 4 August 2026.
This output is grounded to that commit and the current worktree state; the repository was not clean at inspection time because tracked files under `singularity/` were already missing from the worktree.

## Recommended next view for each common task {#core.routing}
- Implementing or debugging rule logic: `views/development.md`.
- Adding or changing validator workflows: `views/development.md`.
- Reviewing business-facing behavior or domain vocabulary: start with `views/development.md` and then ask for a business view if needed.
