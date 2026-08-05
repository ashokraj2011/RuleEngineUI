> **Grounding** · RuleEngineUI @ `ceed449863d693f203efab6d44259d8dc4655d68` · view: `{view_id}` · tier: `{tier}`
> **Generated** 05 August 2026 (2026-08-05T13:52:52Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#domain.rule-engine.tldr}
This domain model covers the repository’s decision-rule capability: authoring rules, evaluating them against typed data, synthesizing test cases, and maintaining a glossary of business attributes. The main owned surfaces are the Angular UI, the rule-engine service, the kernel logic, and the PostgreSQL-backed glossary API. The most important invariants are that rules are evaluated using typed namespaces and three-valued logic, and that validation workflows depend on the glossary structure. This domain is a strong fit for business and implementation review because it ties policy language to implementation behavior.

## Facts {#domain.rule-engine.facts}

```yaml
domain: rule-engine
owned_components: [frontend-console, rule-engine-kernel, rule-api]
terminology: [rule, glossary, schema, test case, fixture, suite, coverage]
entrypoints:
  - { path: "src/app/app.component.ts:46-151", role: "launches the rule-authoring workspace" }
  - { path: "src/app/services/rule-engine.service.ts:35-156", role: "evaluates, lints, and synthesizes rules" }
  - { path: "server/index.js:72-204", role: "persists rules and glossary entries" }
```

## Domain purpose {#domain.rule-engine.purpose}
The rule-engine domain is the repository’s primary capability. It is responsible for turning policy logic into structured rules that can be authored, validated, and persisted. The UI and backend both treat rules as first-class objects.

## Terminology {#domain.rule-engine.terms}
- Rule: a structured logical decision object.
- Glossary: the schema-like catalog of typed attributes and entities.
- Test case: a concrete input snapshot used to evaluate a rule.
- Fixture: reusable test data for the validator studio.
- Coverage: branch coverage derived from rule-evaluation traces.

## Owning components {#domain.rule-engine.components}
- `src/app/app.component.ts` hosts the main workspace and wires the rule services together.
- `src/app/services/rule-engine.service.ts` exposes the kernel-level APIs to Angular components.
- `src/app/services/rule-store.service.ts` manages local test data, fixtures, suites, and persistence.
- `server/index.js` and `server/db.js` expose and define the backend persistence model.

## Main workflows {#domain.rule-engine.workflows}
1. Load schema/glossary data.
2. Author or edit rule logic.
3. Validate or synthesize test cases.
4. Evaluate against snapshots or generated fixtures.
5. Persist results and publish to a lifecycle stage.

## Data and state {#domain.rule-engine.data}
The domain uses a typed glossary plus rule snapshots. The frontend stores validator data in browser persistence; the backend stores rules and glossary rows in PostgreSQL. The sample data and seeded glossary use customer/account/session and fraud/KYC concepts, but the code does not show a full production data model.

## Invariants {#domain.rule-engine.invariants}
- Rule evaluation depends on glossary-backed namespaces and attribute types.
- Missing data is treated as `UNKNOWN` rather than silently falsifying a rule.
- The validator layer uses synthesized cases and coverage traces rather than hand-written literals.

## Risks and unknowns {#domain.rule-engine.risks}
- The domain is only partially wired to the backend; the UI still uses a hard-coded glossary endpoint and local storage for some validator state.
- The business-specific field set and governance workflow for WRK-999 remain unspecified.
