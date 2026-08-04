> **Grounding** · RuleEngineUI @ `b34c514287ef4436c14ab00b964f233759334871` · view: `core` · tier: `brief`
> **Generated** 4 August 2026 (2026-08-04T15:13:27.439Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## Orientation {#core.brief}
RuleEngineUI is a hybrid Angular + Express rule console. The UI in `src/app/` offers schema editing, rule design, decision tables, validator studio, and execution history; the pure TypeScript kernel in `src/app/kernel/` handles evaluation, linting, synthesis, and coverage. The backend in `server/` exposes rule and glossary APIs backed by PostgreSQL and optional Gemini-based naming. The primary entry points are `src/main.ts`, `src/app/app.component.ts`, and `server/index.js`; the standard validation commands are `npm run build` and `npm test -- --watch=false --browsers=ChromeHeadless`.
