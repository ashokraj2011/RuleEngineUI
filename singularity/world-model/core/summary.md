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
