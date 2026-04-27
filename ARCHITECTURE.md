---
artifact: architecture_context
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: gamification
created: "2026-04-26"
updated: "2026-04-27"
status: reviewed
source_skill: sf-docs
scope: architecture
owner: Diane
confidence: high
risk_level: medium
linked_systems:
  - "README.md"
  - "src/index.ts"
  - "site/src/content.config.ts"
  - "site/src/pages/[...slug].astro"
  - "site/src/lib/navigation.ts"
  - "GUIDELINES.md"
  - "CONTEXT.md"
security_impact: none
docs_impact: yes
evidence:
  - "package.json"
  - "vite.config.ts"
  - "src/index.ts"
  - "src/composables"
  - "src/components"
  - "src/utils/storage.ts"
  - "site/src/content.config.ts"
  - "site/src/pages/index.astro"
  - "site/src/pages/[...slug].astro"
external_dependencies:
  - "Vue"
  - "Vite"
  - "vite-plugin-dts"
  - "Astro"
  - "canvas-confetti"
depends_on:
  - "AGENT.md"
  - "CONTEXT.md"
  - "CONTEXT-FUNCTION-TREE.md"
supersedes: []
invariants:
  - "Storage operations must be SSR-safe (window guard) for composables."
  - "Route schema data in site content collections must match `site/src/content.config.ts`."
  - "Public exports remain stable and backward compatible from `src/index.ts`."
  - "Repository-level docs and package exports remain synchronized."
next_review: "2026-07-26"
next_step: "/sf-docs audit ARCHITECTURE.md"
---

# Architecture Context — gamification

## 1) System shape

```text
+------------------------+        +-----------------------------+
|  Vue Game Components   |        |   Gamification Composables   |
|  (Badge, Progress,     |        |   + Storage Adapter + Events |
|   Streak, Dashboard)   |<------>|  useGamification orchestration|
+------------------------+        +-------------+---------------+
                                               |
                                               v
                                      +--------+--------+
                                      |  StorageAdapter |
                                      | createStorage() |
                                      | (localStorage)  |
                                      +-----------------+

            +-----------------------------------------------------------+
            |                  Gamification Package                      |
            |          src/index.ts (public package API)                  |
            +-----------------------------------------------------------+

                             +---------------------+
                             |  Knowledge Base Site |
                             |  Astro + content docs |
                             +---------------------+
                                     |
                                     v
                             +---------------------+
                             |  Content Pipeline    |
                             |  (md/mdx + frontmatter) |
                             +---------------------+
```

The system is a dual-track repo:

- A publishable Vue 3 toolkit (`src`).
- An editorial docs app (`site`) that documents and demonstrates usage.

## 2) Package architecture (`src`)

### 2.1 Entry and exports

- `src/index.ts` is the canonical public surface.
- Named exports include:
  - composables: `useGamification`, `useReadTracker`, `useStreak`, `useBadges`, `useProgress`, `useReactions`, `useModuleFeedback`, `useLevel`, `useQuests`, `useDailyRewards`.
  - components: `BadgeCard`, `BadgeGrid`, `StreakCounter`, `ProgressBar`, `AchievementToast`, `GamificationDashboard`, `ReactionBar`, `ModuleFeedback`.
  - types/utilities and confetti helpers.

### 2.2 Runtime state layer

- `src/composables/useGamification.ts` composes:
  - `useReadTracker()` (read history)
  - `useStreak()` (engagement streaks)
  - `useBadges()` (unlock logic + near misses)
  - `useProgress()` (category and global completion)
- Domain-specific behavior is handled in dedicated composables (reactions, module feedback, quests, levels, daily rewards).

### 2.3 Persistence layer

- `src/utils/storage.ts` owns persistence adapter behavior.
- Default persistence uses `localStorage` with a prefix and key scoping (`{prefix}_{key}`).
- SSR is treated safely: storage reads/writes are no-ops when `window` is missing.
- All composables depend on a `StorageAdapter` abstraction for testability and future backend adapters.

### 2.4 Build output

- Vite library mode in `vite.config.ts`:
  - entry `src/index.ts`
  - ES module output
  - `vue` externalized
  - types emitted via `vite-plugin-dts` / `vue-tsc`.

## 3) Documentation architecture (`site`)

### 3.1 Content model

- `site/src/content.config.ts`:
  - loads all markdown files under `site/src/content/docs`.
  - validates frontmatter with schema (title, description, section, order, draft flag).

### 3.2 Content routes

- `site/src/pages/[...slug].astro`:
  - discovers all non-draft docs.
  - resolves breadcrumb and prev/next navigation.
  - renders via `DocsLayout`.

### 3.3 Shared layout and widgets

- `site/src/layouts/DocsLayout.astro` composes:
  - header/footer
  - breadcrumb, toc, sidebar, prev/next
  - SEO/JSON-LD for articles and breadcrumb lists
  - client components (`ReadingProgress`, `ArticleReward`, `GamificationBar`).

### 3.4 Navigation and site map

- Navigation is centralized in `site/src/lib/navigation.ts` and per-section sidebars in `site/src/config/navigation/*.js`.
- `knowledge-base/` provides content source for the article corpus and visuals.

## 4) Data and control flow

### 4.1 Gamification events

- Article completion:
  - `markAsRead(slug, category)` updates read entries.
  - Streak timer increments when a read is recorded.
  - Badge check runs against current state (`GamificationState`).
  - Progress metrics recompute from category slugs and read list.

### 4.2 Feedback loops

- Reactions and module feedback produce local count deltas.
- User vote state and counts are kept separate from server sources and merged in composables.
- Optional initial counts can be seeded via composable options.

### 4.3 Quest and reward flows

- `useQuests` manages completion + step tracking + timed resets (daily/weekly cadence).
- `useDailyRewards` manages a 7-day reward cycle with bonus day and claim gating.

## 5) External dependencies

- Core runtime: `Vue`, `Vite`, `Astro`.
- Build/declaration tooling: `vite-plugin-dts`, `vue-tsc`.
- Effects: `canvas-confetti` (lazy-loaded optional dependency at runtime).

## 6) Risks and constraints

- The two-packaging surfaces (`src` and `site`) must remain coherent; drift between docs and API contract is a correctness risk.
- `canvas-confetti` is optional and dynamically imported; missing dependency must not hard-fail.
- localStorage keys and schema persistence are user-context/local state and can be reset by users/devices.

## 7) Hotspots

- `src/utils/storage.ts`: central persistence contract; change here impacts all features.
- `src/composables/useGamification.ts`: orchestrator for streak, badges, and progress.
- `site/src/content.config.ts`: schema and content contract for all docs pages.
- `site/src/lib/navigation.ts`: path generation and navigation consistency.

## 8) Future architectural work

- Consider pluggable storage adapters (API/IndexedDB) without changing composable contracts.
- Add explicit event bus abstraction for composables that currently mutate shared state directly.
