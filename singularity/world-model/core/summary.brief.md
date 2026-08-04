> **Grounding** · RuleEngineUI @ `b4e86974ed427e76afbbd98c7403339e34b6bee9` · view: `core` · tier: `brief`
> **Generated** 4 August 2026 (2026-08-04T15:19:35Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

This repository is a mixed Angular + Node.js rule-engine workspace. The main product is a UI for authoring rules, exploring glossary data, designing rule flows, and running validator scenarios; the backend stores rules and glossary entries in PostgreSQL and exposes REST endpoints. The most important implementation surfaces are `src/app/` for the frontend, `src/app/kernel/` for the engine, and `server/` for persistence and API behavior.

Primary entry points:
- `src/main.ts` bootstraps the Angular app.
- `src/app/app.component.ts` hosts the main console shell.
- `server/index.js` starts the Express API server.

Standard validation command:
- `npm run build` from the repository root.

Largest risk:
- The UI expects the backend to be running locally, so changes to API contracts or environment config can break startup behavior even when the Angular build still succeeds.
