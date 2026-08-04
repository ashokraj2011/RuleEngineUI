> **Grounding** · RuleEngineUI @ `b34c514287ef4436c14ab00b964f233759334871` · view: `domain.rule-testing` · tier: `full`
> **Generated** 04 August 2026 (2026-08-04T15:06:58Z) · depth: `standard` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## TL;DR {#domain.rule-testing.tldr}

Evidence: `ev-03`, `ev-04`, `ev-05`, `ev-06`.

The rule-testing domain is the repository’s core capability: define rules, evaluate them against typed data, generate or import cases, and inspect coverage and regressions. The domain is implemented as a mix of Angular UI, a shared kernel, and sample rule/test data. The main invariant is that the engine should evaluate the same rule consistently across UI, sample data, and future CLI or CI workflows. The domain is best understood through `src/app/validator-data`, `src/app/services/rule-store.service.ts`, and `src/app/kernel`.

## Domain purpose {#domain.rule-testing.purpose}

This domain turns rule logic into something testable. A user can create or edit rules, all the while seeing how the engine evaluates them under sample or generated data. The domain also helps reviewers inspect branch coverage and regression diffs.

## Terminology {#domain.rule-testing.terminology}

- Rule — a logical expression assembled from comparisons and nested operators.
- Test case — a data snapshot plus expected outcome and metadata.
- Eval result — the engine’s pass/fail decision and explanation trace.
- Fixture — a reusable snapshot used in the library tab.
- Coverage report — branch coverage derived from recorded eval traces.

## Owning components {#domain.rule-testing.components}

- `src/app/components/validator/*` — validator experience tabs.
- `src/app/services/rule-store.service.ts` — stateful orchestration of test cases, fixtures, suites, and run history.
- `src/app/services/rule-engine.service.ts` — facade around kernel operations.
- `src/app/kernel/*` — pure logic for evaluation, synthesis, and linting.

## Main workflows {#domain.rule-testing.workflows}

1. Load or seed rules from `SAMPLE_RULES`.
2. Generate or edit test data.
3. Execute the rule and capture an evaluation trace.
4. Compare the result against an expected outcome and inspect coverage/regression insights.

## Data and state {#domain.rule-testing.data}

The domain uses typed snapshots and structured rule models from `src/app/models/types.ts` and `src/app/kernel`. The store persists cases, runs, fixtures, and suites through `localStorage` and exposes computed coverage. The sample data and rules under `src/app/validator-data` are the main concrete examples for this domain.

## External integrations and dependencies {#domain.rule-testing.integrations}

- The frontend optionally calls the backend glossary endpoint at `/api/glossary` in `src/app/app.component.ts`.
- The backend can seed glossary values from PostgreSQL and can optionally use Gemini for generating rule names in `server/index.js`.

## Invariants {#domain.rule-testing.invariants}

- Rule references are cycle-safe in the engine facade, as shown in `src/app/services/rule-engine.service.ts:95-117`.
- The validator’s coverage logic is derived from recorded evaluation traces rather than from literal assumptions in `src/app/services/rule-store.service.ts:140-159`.
- The store writes persisted data using a stable snapshot comparison function to avoid false diffs from object ordering.

## Tests and evidence {#domain.rule-testing.tests}

- The kernel has a unit-test file at `src/app/kernel/kernel.spec.ts`.
- The validator data module includes seeded cases and synthetic runs in `src/app/validator-data/sample-test-cases.ts`.
- This run did not execute the Angular unit tests, so the domain should be treated as implementation-observed rather than test-verified.

## Change risks {#domain.rule-testing.risks}

- The most fragile changes are those that alter the rule model shape or evaluation semantics, because they affect both UI feedback and persisted historical runs.
- Any change to coverage or regression behavior should be validated against both the sample data and the store’s computed coverage path.

## Unknowns {#domain.rule-testing.unknowns}

- There is no separate domain-owned contract document for validation outcomes or exported test suites.
- The production persistence layer beyond `localStorage` remains a backend integration concern rather than a checked-in spec.
