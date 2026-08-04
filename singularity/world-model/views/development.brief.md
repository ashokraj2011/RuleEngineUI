> **Grounding** · RuleEngineUI @ `b4e86974ed427e76afbbd98c7403339e34b6bee9` · view: `development` · tier: `brief`
> **Generated** 4 August 2026 (2026-08-04T15:19:35Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

This is the implementation-oriented grounding file for the rule-engine workspace. It is most useful when changing the Angular UI, the validator studio, the kernel engine, or the Express API.

Start here for common changes:
- UI shell and tab state: `src/app/app.component.ts`
- Rule engine facade: `src/app/services/rule-engine.service.ts`
- Evaluation, linting, synthesis, and coverage: `src/app/kernel/`
- Persistence and API routes: `server/index.js` and `server/db.js`

The biggest mistake in this repo is changing a surface (UI or API) without updating the shared kernel semantics and the persisted validator state together. If a change touches rules, tests, or coverage, expect to revisit both the service layer and the kernel modules.
