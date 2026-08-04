> **Grounding** · logic-engine @ `c9680d4f78d1cc34be385f6629b9be0df4b3c31d` · view: `architecture` · tier: `full`
> **Generated** 04 August 2026 (2026-08-04T15:35:00Z) · depth: `quick` · builder `2.0`

## TL;DR
The repository is an Angular frontend plus a lightweight Express server. The UI is organized around feature modules under src/app, while the server entry points and data-access helpers live under server/.

## Component map
- Frontend: Angular application with routing, services, and UI components under src/app.
- Backend: Express server entry point in server/index.js and database helper in server/db.js.
- Build/test tooling: Angular CLI and Karma via package.json.

## Notes
- The architecture is simple and modular, with clear separation between client-side presentation and server-side data access.
- Future changes should preserve that separation when introducing new features or behavior.
