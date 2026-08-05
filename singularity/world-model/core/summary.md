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
