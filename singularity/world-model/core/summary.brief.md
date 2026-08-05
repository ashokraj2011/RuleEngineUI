> **Grounding** · RuleEngineUI @ `ceed449863d693f203efab6d44259d8dc4655d68` · view: `{view_id}` · tier: `{tier}`
> **Generated** 05 August 2026 (2026-08-05T13:52:52Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## Orientation {#core.brief}
This repository is a rule-engine workspace with an Angular frontend and an Express backend. The main product surface is a browser console for authoring and validating decision rules; the backend stores rule and glossary data in PostgreSQL. The primary entry point is `src/main.ts`, while the backend starts in `server/index.js`. Standard validation is `npm run build` and `npm run test -- --watch=false --browsers=ChromeHeadless`. The largest current risk is the dependency on local PostgreSQL and optional Gemini credentials, and the worktree is not clean.
