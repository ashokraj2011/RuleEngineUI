> **Grounding** · RuleEngineUI @ `ceed449863d693f203efab6d44259d8dc4655d68` · view: `{view_id}` · tier: `{tier}`
> **Generated** 05 August 2026 (2026-08-05T13:52:52Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#task.wrk-999-intake.tldr}
This guide supports the intake step for WRK-999 without changing application code. The repository already contains enough grounding to describe the feature area at a high level: a rule-authoring console with schema, rules, validator, and history experiences plus a backend API for rules and glossary persistence. The intake task should focus on clarifying the business domain, ownership, and data inputs rather than coding a feature. The most useful starting points are the Angular app shell, the sample rules data, and the backend glossary schema. The repo does not contain a dedicated WRK-999 implementation artifact, so intake should treat the feature as an unknown business scope until clarified.

## Facts {#task.wrk-999-intake.facts}

```yaml
current_task: "Advance the WRK-999 feature through intake"
relevant_views: [business]
relevant_domains: [rule-engine]
primary_paths: ["src/app/app.component.ts", "src/app/data.ts", "server/db.js"]
commands:
  - { command: "npm run build", result: "passed" }
  - { command: "npm run test -- --watch=false --browsers=ChromeHeadless", result: "passed (22 tests)" }
```

## Task interpretation {#task.wrk-999-intake.interpretation}
This task is an intake/grounding task, not an implementation task. The expected output is a concise, evidence-based understanding of the repository’s rule-engine capabilities and the questions that must be answered to move WRK-999 forward.

## Relevant repository areas {#task.wrk-999-intake.areas}
- `src/app/app.component.ts` shows the main user experience surfaces: schema, rules, validator, history, and support.
- `src/app/data.ts` contains initial rules and schema fields that provide the clearest business vocabulary.
- `server/db.js` and `server/index.js` define the glossary and persistence model used by the UI.

## Relevant domain models {#task.wrk-999-intake.domain}
- `domains/rule-engine.md` covers the core rule-authoring and validation capability.
- `views/business.md` covers the business-facing interpretation and questions for domain owners.

## Change flow for intake {#task.wrk-999-intake.flow}
1. Confirm the intended WRK-999 business domain and required actors.
2. Map the feature to the existing rule-authoring and validation surfaces.
3. Identify which glossary fields and rule inputs the feature would need.
4. Capture any unknowns and block the intake if the domain or owner is unclear.

## Contracts and invariants to preserve {#task.wrk-999-intake.contracts}
- Intake should not assume a new backend table or new UI route exists unless the repository shows it.
- Any proposed feature should preserve the existing glossary-driven rule model rather than hard-coding business logic in the UI.
- Intake should not treat the current sample rules as the final product rules; they are examples, not the full specification.

## Tests and commands to run {#task.wrk-999-intake.commands}
- `npm run build`
- `npm run test -- --watch=false --browsers=ChromeHeadless`
These commands already passed in this environment.

## Risks and unknowns {#task.wrk-999-intake.risks}
- The repository does not define WRK-999-specific requirements, owner, or acceptance criteria.
- The backend relies on PostgreSQL and optional Gemini credentials, so intake should not assume local development is fully configured.
