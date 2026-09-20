# logic-engine — deterministic light world model

> Generated 20 September 2026 (2026-09-20T16:27:34.961Z) · source `3a3590272ef1a1ce748e3effd42946c076fe9c70` · branch `main`

## Repository shape

- Files indexed: 101
- Source-like files: 58
- Test-like files: 2
- Build manifests: 3
- Deployment/operations files: 0
- Languages: TypeScript (55), JavaScript (3)
- Top-level areas: src (56), react-backup (23), (root) (14), server (4), .vscode (3), .antigravity (1)

## Facts {#core.facts}

<!-- singularity-flow:repository-facts:start -->
```yaml
# Derived from the repository, not inferred. Every path and line is checkable.
files: 101
languages_scanned: 58
frameworks: [Angular, Express, React, Tailwind CSS, TypeScript, Vite, esbuild]
entrypoints:
  - { path: server/index.js, declared: main, at: "server/package.json:5" }
commands:
  - { run: "npm run ng", at: "package.json:5" }
  - { run: "npm run client", at: "package.json:6" }
  - { run: "npm run server", at: "package.json:7" }
  - { run: "npm run start", at: "package.json:8" }
  - { run: "npm run build", at: "package.json:9" }
  - { run: "npm run watch", at: "package.json:10" }
  - { run: "npm run test", at: "package.json:11" }
  - { run: "npm run dev", at: "react-backup/package.json:7" }
  - { run: "npm run build", at: "react-backup/package.json:8" }
  - { run: "npm run preview", at: "react-backup/package.json:9" }
  - { run: "npm run clean", at: "react-backup/package.json:10" }
  - { run: "npm run lint", at: "react-backup/package.json:11" }
# What the rest of the repository depends on. A count, not an impression.
most_depended_on:
  - { path: src/app/models/types.ts, imported_by: 14 }
  - { path: src/app/services/rule-engine.service.ts, imported_by: 10 }
  - { path: src/app/services/rule-store.service.ts, imported_by: 10 }
  - { path: src/app/types.ts, imported_by: 8 }
  - { path: react-backup/src/types.ts, imported_by: 7 }
  - { path: src/app/kernel/ast.ts, imported_by: 6 }
  - { path: src/app/kernel/index.ts, imported_by: 6 }
  - { path: src/app/kernel/schema.ts, imported_by: 6 }
# Commits touching each file in the last year, from Git history.
most_changed:
  - { path: src/app/app.component.ts, commits: 5 }
  - { path: src/app/types.ts, commits: 5 }
  - { path: src/app/components/sidebar/sidebar.component.ts, commits: 4 }
  - { path: src/app/data.ts, commits: 4 }
  - { path: package-lock.json, commits: 3 }
  - { path: package.json, commits: 3 }
  - { path: server/db.js, commits: 3 }
  - { path: server/index.js, commits: 3 }
# 81 exported top-level declarations; the most-depended-on files' are listed.
key_symbols:
  - { name: isComparisonTerm, kind: function, at: "src/app/kernel/ast.ts:52" }
  - { name: isLogicalTerm, kind: function, at: "src/app/kernel/ast.ts:56" }
  - { name: isRuleRefTerm, kind: function, at: "src/app/kernel/ast.ts:60" }
  - { name: NULLARY_OPERATORS, kind: binding, at: "src/app/kernel/ast.ts:65" }
  - { name: ORDERING_OPERATORS, kind: binding, at: "src/app/kernel/ast.ts:71" }
  - { name: SET_OPERATORS, kind: binding, at: "src/app/kernel/ast.ts:79" }
  - { name: MEMBERSHIP_OPERATORS, kind: binding, at: "src/app/kernel/ast.ts:82" }
  - { name: OPERATOR_DISPLAY, kind: binding, at: "src/app/kernel/ast.ts:87" }
  - { name: operatorDisplay, kind: function, at: "src/app/kernel/ast.ts:102" }
  - { name: comparisonLabel, kind: function, at: "src/app/kernel/ast.ts:107" }
  - { name: RuleEngineService, kind: class, at: "src/app/services/rule-engine.service.ts:35" }
  - { name: RuleStoreService, kind: class, at: "src/app/services/rule-store.service.ts:37" }
tests: 2
```
<!-- singularity-flow:repository-facts:end -->

## Likely entry points

- `package.json`
- `react-backup/package.json`
- `react-backup/src/App.tsx`
- `react-backup/src/main.tsx`
- `server/index.js`
- `server/package.json`
- `src/app/kernel/index.ts`
- `src/main.ts`

## Observed commands

- `npm run build`
- `npm run clean`
- `npm run client`
- `npm run dev`
- `npm run lint`
- `npm run ng`
- `npm run preview`
- `npm run server`
- `npm run start`
- `npm run test`
- `npm run watch`

## Grounding boundary

This model was generated locally without Copilot or another AI model and consumed **zero model tokens**. It intentionally records only deterministic repository metadata. It does not claim runtime behavior, business meaning, ownership, security, test coverage, or architectural intent. Deeper phases can replace it with a quick, standard, or deep model when semantic analysis is worth the token cost.
