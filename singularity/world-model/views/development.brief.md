> **Grounding** · RuleEngineUI @ `b34c514287ef4436c14ab00b964f233759334871` · view: `development` · tier: `brief`
> **Generated** 04 August 2026 (2026-08-04T15:06:58Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


This view covers the implementation surface for rule authoring and validation. Start in `src/app/app.component.ts` for the top-level shell, `src/app/services/rule-store.service.ts` for shared state and persistence, `src/app/services/rule-engine.service.ts` for engine access, and `src/app/kernel/` for semantic evaluation. The validator studio is wired through `src/app/components/validator/shell/shell.component.ts`, while the backend API lives in `server/index.js`. The most common mistake is to change the UI without tracing the shared state service, because the validator and rule authoring flow both depend on it. The current build baseline is `npm run build`; the repo also carries `npm test` and a backend start entry point.
