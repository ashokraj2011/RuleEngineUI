> **Grounding** · logic-engine @ `c9680d4f78d1cc34be385f6629b9be0df4b3c31d` · view: `core.brief` · tier: `brief`
> **Generated** 04 August 2026 (2026-08-04T14:48:37Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

This repository is a rule-authoring and validation console for decision logic. The active app is an Angular 17 UI in `src/app/` with a rule-engine kernel in `src/app/kernel/` and a small Express API in `server/`. The main entry point is `src/main.ts`; the main workflow is driven by `src/app/app.component.ts`, and the kernel’s evaluation, synthesis, linting, and coverage logic lives under `src/app/kernel/`. Standard validation is `npm start`, `npm run build`, and `npm test` from the repo root, while the backend can be started with `cd server && npm start`.
