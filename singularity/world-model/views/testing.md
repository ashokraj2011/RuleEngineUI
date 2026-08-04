> **Grounding** · logic-engine @ `c9680d4f78d1cc34be385f6629b9be0df4b3c31d` · view: `testing` · tier: `full`
> **Generated** 04 August 2026 (2026-08-04T15:15:20Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If this repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#test.tldr}
The repository includes an Angular/Karma test harness plus sample validator rules and sample test cases. Start with `src/app/kernel/kernel.spec.ts`, `src/app/services/rule-store.service.ts`, and `src/app/validator-data/sample-test-cases.ts` when creating or reviewing tests.

## Facts {#test.facts}
```yaml
frontend_tests:
  - { tool: jasmine, harness: karma, entry: "npm test" }
validation_assets:
  - { path: src/app/validator-data/sample-rules.ts, role: sample rule fixtures }
  - { path: src/app/validator-data/sample-test-cases.ts, role: sample case fixtures }
```

## Test surfaces {#test.surfaces}
- Angular unit tests can target UI components and services.
- The validator workflow has sample rules, generated cases, and history data to exercise with regression tests.
- The kernel under `src/app/kernel/` should be tested for evaluation, synthesis, linting, and coverage behavior.

## Suggested validation approach {#test.approach}
- Prefer focused tests around the kernel and validator store service.
- Keep tests aligned with the existing Jasmine/Karma structure.
- Validate changes with `npm test` and, where relevant, `npm run build`.
