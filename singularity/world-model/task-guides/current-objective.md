> **Grounding** · logic-engine @ `c9680d4f78d1cc34be385f6629b9be0df4b3c31d` · view: `task.current-objective` · tier: `full`
> **Generated** 04 August 2026 (2026-08-04T14:48:37Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

## TL;DR {#task.current-objective.tldr}
This task is to build a modular repository-world model for the current repository and emit a grounded, token-efficient package into the output directory. The relevant repository surfaces are the Angular UI shell, the rule-engine kernel, and the Express API. The smallest useful change set is the shared core, the requested business view, the evidence ledger, the path index, and the manifest. Avoid changing application source files; work only under the output directory.

## Task interpretation {#task.current-objective.task}
The exact current task text is: `current objective`. The objective is to inspect the repository and create grounding documents that help a downstream agent understand the repository without over-consuming tokens. The deliverable is a world-model package, not a product change.

## Relevant roles {#task.current-objective.roles}
- Repository-grounding builder: this package should stay concise and modular.
- Business-facing reviewer: the business view should explain what the system does and where the domain vocabulary lives.
- Implementation reviewer: the core and path index should point to the main entry points and relevant kernels.

## Relevant components {#task.current-objective.components}
- `src/app/app.component.ts` and `src/app/app.component.html` for the UI shell and visible workflows.
- `src/app/services/rule-engine.service.ts` and `src/app/services/rule-store.service.ts` for service boundaries and validation workflows.
- `src/app/kernel/` for the framework-agnostic engine.
- `server/index.js` and `server/db.js` for API and persistence.

## Primary paths and symbols {#task.current-objective.paths}
- `src/main.ts` bootstrap path.
- `AppComponent` in `src/app/app.component.ts`.
- `RuleEngineService` in `src/app/services/rule-engine.service.ts`.
- `RuleStoreService` in `src/app/services/rule-store.service.ts`.
- `Evaluator`, `Linter`, `Synthesizer`, and `computeCoverage` under `src/app/kernel/`.

## Expected change flow {#task.current-objective.flow}
1. Inspect the root manifests and UI entry points.
2. Capture the business-facing purpose from sample rules and glossary terms.
3. Create the shared core, business view, task guide, evidence ledger, path index, and manifest under the output directory.
4. Validate that the JSON files parse and that every generated file path appears in the manifest.

## Contracts and invariants to preserve {#task.current-objective.contracts}
- Do not edit application source files.
- Keep generated artifacts under the output directory only.
- Record the commit, branch, generation time, and builder metadata in every generated Markdown document and in the canonical JSON files.
- Use observed facts and mark unknowns rather than inferring beyond the evidence.

## Tests or checks to run {#task.current-objective.tests}
- Validate JSON parsing for `manifest.json`, `core/model.json`, and `index/path-map.json`.
- Verify that every generated file exists and is a regular file.
- Confirm that every Markdown document begins with the required consumer header and that headings are anchored.

## Commands to run {#task.current-objective.commands}
- `python3 -m json.tool manifest.json > /dev/null`
- `python3 -m json.tool core/model.json > /dev/null`
- `python3 -m json.tool index/path-map.json > /dev/null`
- `find output -type f | sort`

## Risks and unknowns {#task.current-objective.risks}
The main risk is over-claiming product intent from sample data. The current branch was not available as a named branch from Git at inspection time, so that field is recorded as `unknown`.
