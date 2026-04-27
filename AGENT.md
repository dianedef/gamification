---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: gamification
created: "2026-04-26"
updated: "2026-04-27"
status: reviewed
source_skill: sf-docs
scope: guidelines
owner: Diane
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - "README.md"
  - "GUIDELINES.md"
  - "docs/README.md"
  - "site/src/content.config.ts"
  - "package.json"
evidence:
  - "src/index.ts"
  - "src/composables/useGamification.ts"
  - "src/utils/storage.ts"
  - "src/components"
  - "docs/*.md"
  - "site/src/pages"
  - "site/src/content/docs"
depends_on:
  - "README.md"
  - "GUIDELINES.md"
supersedes: []
next_review: "2026-07-26"
next_step: "/sf-docs audit AGENT.md"
---

# AGENT — gamification

## Why this file exists

Use this as the entry checkpoint before any change in this repository.  
Read first:

1. `README.md` for public package scope.
2. `GUIDELINES.md` for reusable component/composable conventions.
3. `AGENT.md`, `CONTEXT.md`, then `CONTEXT-FUNCTION-TREE.md`.
4. `ARCHITECTURE.md` when touching runtime boundaries.

## Project split

- `src/` is the publishable Vue 3 library (`@diane-winflowz/gamification`).
- `site/` is an Astro knowledge base app that consumes and documents gamification concepts.
- `docs/` is a markdown API reference for the library.
- `knowledge-base/` is the content research source used to power the `site` documentation.

## Read path by task

- Package API changes (`src/index.ts`, `src/composables`, `src/components`, `src/types`)  
  Read `GUIDELINES.md`, `README.md`, `docs/README.md`, then target file.
- Documentation and schema changes (`site/`, `docs/`, `knowledge-base/`)  
  Read `site/src/content.config.ts`, `site/astro.config.mjs`, target page/component.
- Runtime or build changes (`vite.config.ts`, `site/package.json`, `package.json`)  
  Read `package.json`, then the specific tool config and the file chain.

- If you change storage behavior, review `src/utils/storage.ts` and every composable that depends on it (`useBadges`, `useReadTracker`, `useStreak`, etc.).
- For new exported APIs, update `src/index.ts` and `docs/composables.md`/`docs/components.md`/`docs/types.md`.

## Operational norms

- Keep library logic SSR-safe where `localStorage` is optional (storage adapter must short-circuit on server).
- Do not introduce persistent coupling to `window` outside the storage adapter.
- Preserve backward-compatible storage keys (`{prefix}_reads`, `{prefix}_streak`, `{prefix}_badges_earned`, etc.).
- Prefer composing behavior through existing primitives (composables + storage adapter) over direct state duplication in components.

## Editing guardrails

- When API surface changes, ensure exports in `src/index.ts` remain explicit and typed.
- Keep composables pure and testable; move side effects to storage and event triggers.
- Any docs refactor should keep docs/README and in-repo references internally consistent.
- If architecture or context assumptions move, update `ARCHITECTURE.md` and `CONTEXT.md` together.

## Invariants

- Vite library build remains default format `es` with externalized `vue`.
- The library remains framework-agnostic in behavior and only depends on Vue 3.4+ primitives.
- The site app remains source-consistent: content route generation from `site/src/content.config.ts` and `site/src/lib/navigation.ts` must remain coherent.
- `metadata_schema_version` stays `"1.0"` on all ShipFlow artifacts.
