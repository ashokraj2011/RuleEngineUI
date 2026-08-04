> **Grounding** · RuleEngineUI @ `b34c514287ef4436c14ab00b964f233759334871` · view: `development` · tier: `brief`
> **Generated** 4 August 2026 (2026-08-04T15:13:27.439Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## Development orientation {#dev.brief}
For implementation work, the main starting points are `src/app/app.component.ts` for the UI shell, `src/app/services/rule-engine.service.ts` for rule execution, and `src/app/services/rule-store.service.ts` for validator state, test-case persistence, and coverage. The shared rule semantics live in `src/app/kernel/`, while the backend API and schema initialization live in `server/`. The most common mistake is treating the UI layer as the source of truth for rule behavior; the kernel and the service facade are the stable implementation boundary.
