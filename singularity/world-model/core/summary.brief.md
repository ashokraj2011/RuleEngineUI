> **Grounding** · RuleEngineUI @ `00ebe873dc0c98a71707575ec3fdc374b5b54dfc` · view: `core.brief` · tier: `brief`
> **Generated** 5 August 2026 (2026-08-05T14:45:35Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## Repository snapshot {#core.brief}

This repository is a rule-engine authoring experience built around an Angular frontend and an Express backend. The frontend exposes a schema explorer, visual rule designer, validator studio, and execution history; the backend stores rules and glossary data in PostgreSQL and can optionally generate rule names via Gemini. The core engine logic lives in `src/app/kernel/`, with the main UI entry point in `src/main.ts` and the API entry point in `server/index.js`. The standard local workflow is `npm start` for the UI plus `node server/index.js` for the API. The main risk is that the repo depends on local services and configuration that are not fully described in the checked-in files.
