> **Grounding** · RuleEngineUI @ `b4e86974ed427e76afbbd98c7403339e34b6bee9` · view: `core` · tier: `full`
> **Generated** 4 August 2026 (2026-08-04T15:19:35Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#core.tldr}
This repository is a mixed Angular and Node.js rule-engine workspace for authoring, validating, and testing business rules. The main surface is a frontend console for schema exploration, rule design, canvas-based flow modeling, and validator studio; the backend exposes REST endpoints for rules and glossary data backed by PostgreSQL. Most implementation work should start in the Angular app for UI and state, in the rule kernel for evaluation logic, and in the Express server for persistence and AI-assisted naming. The working tree is not clean at inspection time, so grounding should be treated as describing the current commit plus local deletions rather than a pristine checkout.

## Facts {#core.facts}

```yaml
repository_name: RuleEngineUI
repository_kind: mixed
languages: [TypeScript, JavaScript, HTML, CSS]
package_roots: [., server]
components: [frontend-app, kernel-engine, validator-studio, backend-service]
entrypoints:
  - { id: ui-entry, path: src/main.ts, invocation: "npm start" }
  - { id: backend-entry, path: server/index.js, invocation: "node server/index.js" }
standard_commands:
  - { command: "npm run build", purpose: "build Angular application" }
  - { command: "npm test", purpose: "run Angular unit tests" }
  - { command: "node server/index.js", purpose: "launch Express API server" }
working_tree_clean: false
```

Evidence IDs: e1, e2, e4.

## Repository purpose {#core.purpose}
The repository is a rule-authoring and rule-validation console for business logic workflows. The visible app concepts are decision rules, data glossary fields, validator test cases, and flow-canvas nodes used to model selection and routing logic. From the code, the repository appears to target fraud, compliance, or transaction-routing scenarios rather than a generic CRUD application. The sample data and initial UI labels point to transaction and customer attributes, but the code does not define a production domain boundary beyond those examples.

## Repository type and languages {#core.type}
The repo is a mixed-codebase application with an Angular frontend and an Express server. The frontend is TypeScript-based and uses Angular 17 with standalone components, Tailwind-style utility classes, and Karma/Jasmine for tests. The backend is JavaScript/Node.js with Express, PostgreSQL via `pg`, and optional Gemini API integration for rule-name generation. The root package manifests are `package.json` and `server/package.json`.

## Main applications and services {#core.components}
The primary user-facing application is the Angular UI under `src/app`, which mixes several sub-surfaces: a schema explorer, rule designer, flow canvas, configuration panel, functions library, history logs, and validator studio. The `src/app/kernel` subtree is a framework-agnostic engine for rule evaluation, linting, synthesis, and branch-coverage analysis; it is intentionally decoupled from Angular. The Express service in `server/` stores rules and glossary rows in PostgreSQL, serves them over REST, and provides a health endpoint. The repo therefore behaves like a local product prototype rather than a production backend with a fully split microservice topology.

## High-level component map {#core.map}
- `src/main.ts` bootstraps the Angular app.
- `src/app/app.component.ts` hosts the top-level console and wires the UI to the rule store and engine services.
- `src/app/services/rule-store.service.ts` holds validator state, persistence, and seeded demo test cases.
- `src/app/services/rule-engine.service.ts` is the Angular facade over the kernel.
- `src/app/kernel/*` implements evaluation, logical operators, type-aware comparisons, synthesis, linting, and coverage.
- `server/index.js` and `server/db.js` implement REST endpoints and PostgreSQL schema initialization.

## Main entry points {#core.entrypoints}
The primary browser entry point is `src/main.ts`, which bootstraps `AppComponent`. For runtime behavior, the app fetches glossary data from the backend at `http://localhost:65421/api/glossary` during startup, so the UI expects the server to be running. The backend server entry point is `server/index.js`; it listens on `process.env.PORT || 3000` and exposes `/api/health`, `/api/rules`, `/api/glossary`, and `/api/generate-name`. The kernel entry point is `src/app/kernel/index.ts`, which re-exports the engine modules that the Angular services depend on.

## Primary technologies {#core.tech}
Angular 17, TypeScript, RxJS, Zone.js, and standalone Angular components form the frontend. The rule engine uses plain TypeScript with explicit AST-like terms, three-valued logic, and a schema registry. The backend uses Express, `pg`, `dotenv`, and optional Gemini generation. Local persistence for the validator experience is browser `localStorage`, not a remote database.

## Standard build and test commands {#core.commands}
Use the root package scripts for the UI: `npm run build` and `npm test` from the repo root. The server package exposes `npm start` in `server/`. The Angular test suite is configured through Karma in `angular.json`, and the kernel has a dedicated Jasmine spec at `src/app/kernel/kernel.spec.ts`. The repository does not appear to define a single end-to-end test pipeline beyond the Angular/Karma setup.

## Important risks {#core.risks}
- The frontend and backend are loosely wired: the app assumes the backend is running locally and hard-codes a development URL for glossary fetches.
- The server uses a PostgreSQL connection with a default local database and a placeholder Gemini API key fallback; local runtime behavior depends on environment configuration.
- The rule engine is central to behavior but is not a full formal rules engine; its semantics are embedded in TypeScript modules and validated mainly by unit tests.

## Important unknowns {#core.unknowns}
- The repository does not include production deployment manifests or a complete release pipeline beyond the Angular build/test setup.
- No explicit domain model or API contract document was found for the business rules beyond the demo data and initial glossary seeds.
- The backend is not clearly wired to a production auth or secrets management setup in the checked-in files.

## Commit, generation date, and freshness warning {#core.freshness}
Inspected commit: `b4e86974ed427e76afbbd98c7403339e34b6bee9` on branch `HEAD`. Generated on 4 August 2026 at 2026-08-04T15:19:35Z. The working tree is not clean because the isolated analysis copy removed generated `singularity/world-model` and `singularity/work-items` artifacts from the checkout; treat this grounding as a snapshot of the inspected commit plus that local deletion state.

## Recommended next view for each common task {#core.routing}
- Implementing or debugging rules: `views/development.md`.
- Designing a new UI surface: `views/development.md` with attention to `src/app/app.component.ts` and the relevant component under `src/app/components/`.
- Changing persistence or API contract behavior: `views/development.md` plus `server/index.js` and `server/db.js`.
