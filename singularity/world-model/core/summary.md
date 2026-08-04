> **Grounding** · RuleEngineUI @ `b34c514287ef4436c14ab00b964f233759334871` · view: `core` · tier: `full`
> **Generated** 04 August 2026 (2026-08-04T15:06:58Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## TL;DR {#core.tldr}

Evidence: `ev-01`, `ev-02`, `ev-03`, `ev-06`.

This repository is a browser-based rule-authoring and validation studio for decision logic, not a traditional CRUD web app. The frontend is an Angular 17 application with a rule designer, decision-table editor, schema explorer, and a validator studio that evaluates sample rules against synthetic data. A small Node/Express backend exists for glossary and rule persistence, but the app also works with local browser state when the backend is unavailable. The main implementation surface is in `src/app`, while the reusable rule engine lives in `src/app/kernel`. The repo builds successfully, but the backend depends on PostgreSQL and optional Gemini credentials, and the app’s live glossary call targets a localhost endpoint that may be absent in a fresh environment.

## Repository purpose {#core.purpose}

The repo appears to be a productized rule-engine UI for authoring, testing, and validating business rules. The visible domain examples are around customer-risk and fraud-style logic, but the implementation is generic enough to support other decision systems. The strongest evidence is the rule grammar, validator studio, and sample rules under `src/app/validator-data` and `src/app/kernel`.

## Repository type and languages {#core.type}

This is a mixed frontend/backend application. The client is Angular 17 with TypeScript, HTML, CSS, and Tailwind-style utility classes. The server is Node.js with Express and PostgreSQL access through `pg`. The repository also contains a package-lock and typical Angular build config.

## Main applications, packages, or services {#core.components}

- `src/app` — Angular shell and UI for schema, rules, functions, history, and validator workflows.
- `src/app/kernel` — framework-agnostic rule engine for parsing, evaluating, synthesizing, linting, and coverage analysis.
- `server` — Express API for glossary/rule CRUD and database initialization.
- `src/app/validator-data` — seed rules and generated sample test cases that make the validator experience runnable out of the box.

## High-level component map {#core.map}

The app bootstraps through `src/main.ts`, which loads `AppComponent` and `appConfig`. `AppComponent` owns the main navigation and switches between schema, rules, functions, validator, history, settings, and support views. The actual rule-authoring experience is implemented in components under `src/app/components`, while state and evaluation behavior are orchestrated by `RuleStoreService` and `RuleEngineService`. The backend API is separate and does not directly participate in the Angular render path unless the browser calls it.

## Main entry points {#core.entrypoints}

- `src/main.ts:1-6` — Angular bootstrap entry.
- `src/app/app.component.ts:27-150` — top-level shell and view routing.
- `server/index.js:1-204` — Express API server and endpoints.
- `server/db.js:12-91` — PostgreSQL schema setup and glossary seeding.

## Primary technologies {#core.tech}

Observed technologies include Angular 17, TypeScript 5.4, RxJS, Tailwind/PostCSS, Angular CLI, Node.js/Express, PostgreSQL via `pg`, and optional Google Gemini for rule-name generation. The repository does not expose a container or deployment manifest in the top level.

## Standard build and test commands {#core.commands}

- `npm start` or `npm run start` — serves the Angular frontend in development. Observed from `package.json:1-42`.
- `npm run build` — builds the Angular app to `dist/logic-engine`. Observed from `package.json:1-42` and `angular.json:38-98`.
- `npm test` — launches the Angular test runner. Observed from `package.json:1-42` and `angular.json:106-123`.
- `node server/index.js` — starts the backend API server. Observed from `server/package.json:1-16`.

## Important risks {#core.risks}

- The frontend fetches glossary data from `http://localhost:65421/api/glossary`, but the server defaults to `PORT=3000` and may not be running on that port. That mismatch is a likely runtime integration issue.
- The backend requires PostgreSQL and an environment file at the repo root; if the database is unavailable, the API and glossary features may fail.
- The build completes but generated warnings show the app is close to Angular’s size budgets and uses a Tailwind/PostCSS stack that produced selector warnings.
- The repository is currently checked out at a detached HEAD and the worktree is not clean because this session removed singularity-generated files.

## Important unknowns {#core.unknowns}

- There is no evidence of a production deployment pipeline or environment map in the checked-in files.
- The repository does not show a formal CI workflow beyond the Angular CLI scripts.
- The runtime data model for the backend is inferred from the server and frontend contracts rather than from a dedicated API schema document.

## Commit, generation date, and freshness warning {#core.freshness}

Inspected commit: `b34c514287ef4436c14ab00b964f233759334871`. Generated: `04 August 2026` at `2026-08-04T15:03:46Z`. The repository state is not fresh relative to the worktree because this run observed removed files under `singularity/` and a detached HEAD. Treat the grounding below as a snapshot of the inspected commit, not a live view of the repository after this run.

## Recommended next view for each common task {#core.routing}

- For implementation, debugging, refactoring, or review work: use `views/development.md`.
- For a broader product or business-impact question: start with `views/development.md` because this run did not generate a dedicated business view.
- For runtime or backend issues: use the development view and the server/API evidence in `evidence/evidence.jsonl`.
