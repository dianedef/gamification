---
artifact: documentation
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: gamification
created: "2026-04-26"
updated: "2026-04-27"
status: reviewed
source_skill: sf-docs
scope: context
owner: Diane
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
evidence:
  - "README.md"
  - "GUIDELINES.md"
  - "docs"
  - "knowledge-base"
  - "site"
depends_on:
  - "README.md"
  - "GUIDELINES.md"
  - "AGENT.md"
supersedes: []
linked_systems:
  - "AGENT.md"
  - "CONTEXT-FUNCTION-TREE.md"
  - "ARCHITECTURE.md"
  - "GUIDELINES.md"
  - "docs/README.md"
  - "site/src/content.config.ts"
next_step: "/sf-docs update CONTEXT.md"
---

# CONTEXT — gamification

## What this repo is

`gamification` is a Vue 3 gamification toolkit packaged as `@diane-winflowz/gamification` plus a separate content site that documents systems design and ethics.

- `src/` exports reusable composables, components, and typed helpers for local gamification state.
- `site/` is an Astro frontend that serves knowledge articles and interactive tools.
- `knowledge-base/` is the editorial corpus and supporting visual assets.
- `docs/` is the API reference for package consumers.

## Entry points

- `src/index.ts`: public package entry, canonical export surface.
- `site/src/pages/index.astro`: public knowledge-site landing page.
- `site/src/pages/[...slug].astro`: content route entry for MD docs/articles.
- `docs/README.md` + each markdown doc file in `docs/`: API documentation entry for developers.

## Repo map

- `src/`: publishable library code (Vue components + composables + storage layer).
- `docs/`: package API reference (components, composables, types).
- `site/`: Astro docs application (`astro.config.mjs`, content collections, views, and shared UI).
- `knowledge-base/`: markdown research corpus (`README`, source articles, visuals).
- `tools/`: standalone interactive Vue pages used in the knowledge site.
- `CHANGELOG.md`: release notes for package evolution.
- `GUIDELINES.md`: established architecture and type/design constraints.

## Core flows

### 1) Library state/composition flow

```text
consumer app
  -> import package entry from @diane-winflowz/gamification
  -> use composable(s): useReadTracker / useStreak / useBadges / useProgress / useGamification
  -> composables coordinate shared StorageAdapter
  -> components render progress/badges/streak/rewards/feedback
  -> localStorage persistence (SSR-safe no-op)
```

### 2) Site content rendering flow

```text
content files in site/src/content/docs + knowledge-base docs
  -> Astro content collection (site/src/content.config.ts)
  -> navigation + sidebar helpers (site/src/lib/navigation.ts)
  -> dynamic routes in site/src/pages/[...slug].astro
  -> Docs layout and client widgets in site/src/layouts/DocsLayout.astro
  -> Vue widgets with client directives (ReadingProgress, ArticleReward, GamificationBar)
```

### 3) Library release flow

```text
vite.config.ts
  -> build lib from src/index.ts (format es)
  -> emit .d.ts via vue-tsc/vite-plugin-dts
  -> package dist consumed via package.json exports
```

## Technical decisions

- Vue 3.4+ is the only runtime API dependency (published as peer).
- Local persistence is adapter-based (`StorageAdapter`) to keep SSR-safe behavior and allow future backend storage.
- Library code stays UI-agnostic and headless where possible (styling and orchestration in consumers).
- Astro remains the site’s compile-time content runtime with strict content schemas and dynamic route generation.

## Invariants

- `StorageAdapter` methods must no-op when `window` is undefined.
- No direct `window/localStorage` usage is allowed outside `src/utils/storage.ts`.
- Composables should remain deterministic and side-effect-light beyond storage/reaction updates.
- Route-facing content metadata must conform to the schema in `site/src/content.config.ts`.

## Hotspots

- `src/composables/useGamification.ts`: central orchestration of read/streak/badge/progress state.
- `src/utils/storage.ts`: SSR boundary and persistence contract.
- `src/components/GamificationDashboard.vue`: high coupling to multiple composable outputs.
- `site/src/lib/navigation.ts`: navigation tree is a single source of truth for docs navigation.
- `site/src/pages/[...slug].astro`: dynamic docs route entry; changes affect all docs pages.

## Where to edit first

- Add new public API: `src/index.ts` → `docs/README.md` → relevant docs page.
- Adjust composable behavior: `src/composables/*` then unit tests/docs.
- Change storage strategy: `src/utils/storage.ts` first, then `src/composables` and docs.
- Change docs schema: `site/src/content.config.ts` before `site/src/pages/*.astro` and content front matter.
- Update copy/knowledge pages: `knowledge-base/` first, then `site/src/config/*` if navigation labels must match.
