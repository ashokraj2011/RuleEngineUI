> **Grounding** · RuleEngineUI @ `b34c514287ef4436c14ab00b964f233759334871` · view: `core` · tier: `brief`
> **Generated** 04 August 2026 (2026-08-04T15:06:58Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


This repository is a rule-engine UI and validation studio for decision logic. The main frontend is an Angular 17 application under `src/app`, with a schema explorer, rule designer, decision-table editor, canvas-style rule flow, and a validator studio for test generation and coverage. The reusable evaluation engine lives in `src/app/kernel`, and a small Node/Express backend in `server` exposes glossary and rule APIs backed by PostgreSQL. The primary entry point is `src/main.ts`, and the standard validation command is `npm run build`. The largest practical risk is that the frontend expects a glossary API at `http://localhost:65421`, while the server defaults to a different port and depends on local database configuration.
