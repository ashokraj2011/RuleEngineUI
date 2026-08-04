> **Grounding** · logic-engine @ `c9680d4f78d1cc34be385f6629b9be0df4b3c31d` · view: `business.brief` · tier: `brief`
> **Generated** 04 August 2026 (2026-08-04T14:48:37Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.

This view covers the business-facing purpose of the repository: a rule-authoring and validation studio for decision logic. It informs which decisions are modeled, who the visible user roles are, and where core business vocabulary or policy signals live. Start with `src/app/data.ts` for sample rules and outcomes, `server/db.js` for glossary vocabulary, and `src/app/services/rule-store.service.ts` for validation and test management. The most common mistake is to assume the repository is a generic CRUD app; it is primarily a domain-rule testing platform with fraud/risk-style examples.
