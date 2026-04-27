---
artifact: artifact_context
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: gamification
created: "2026-04-26"
updated: "2026-04-27"
status: reviewed
source_skill: sf-docs
scope: function_tree
owner: Diane
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
evidence:
  - "src/index.ts"
  - "src/composables/useGamification.ts"
  - "src/components/GamificationDashboard.vue"
  - "src/utils/storage.ts"
  - "site/src/pages/index.astro"
  - "site/src/pages/[...slug].astro"
  - "site/src/layouts/DocsLayout.astro"
  - "site/src/lib/navigation.ts"
depends_on: []
supersedes: []
linked_systems:
  - "AGENT.md"
  - "CONTEXT.md"
  - "ARCHITECTURE.md"
  - "site/src/content.config.ts"
next_step: "/sf-docs update CONTEXT-FUNCTION-TREE.md"
---

# CONTEXT-FUNCTION-TREE.md — gamification

## Library package (`src`)

- `src/index.ts`
  - Exports all public composables, components, and types.
  - `useGamification()`, `useReadTracker()`, `useStreak()`, `useBadges()`, `useProgress()`.
  - `createStorage`, feedback utilities, confetti helpers.

- `src/types/index.ts`
  - Core domain types: `Badge`, `StreakData`, `StorageAdapter`, `GamificationOptions`, reaction and feedback types.

- `src/utils/storage.ts`
  - `createStorage(prefix)` -> storage adapter with prefixed localStorage keys.
  - No-op guards for SSR/server environments.

- `src/utils/confetti.ts`
  - `fireConfetti()` and `fireBadgeConfetti()`.
  - Lazy dynamic import of `canvas-confetti`.

- `src/composables/useGamification.ts`
  - Composes read tracker, streak, badge, and progress state.
  - Calls `markAsRead` orchestration (`markAsRead` ➜ read + streak + badge evaluation).

- `src/composables/useReadTracker.ts`
  - `markAsRead`, `isRead`, read list and per-category grouping.

- `src/composables/useStreak.ts`
  - `recordVisit`, `useFreeze`, `addFreeze`.
  - Freeze mechanics, milestones, and near-miss messaging.

- `src/composables/useBadges.ts`
  - `checkAll` unlock pipeline.
  - `earnedByTier`, near-miss, and derived progress.

- `src/composables/useProgress.ts`
  - Global and per-category completion computation.

- `src/composables/useReactions.ts`
  - Reaction selection/toggle + count accumulation with local persistence.

- `src/composables/useModuleFeedback.ts`
  - Module-level two-dimension feedback state and persistence.

- `src/composables/useLevel.ts`
  - XP accumulation and level progression logic.

- `src/composables/useQuests.ts`
  - Quest lifecycle, reset by cadence, step completion.

- `src/composables/useDailyRewards.ts`
  - Daily reward cycle, claim logic, claim cooldown.

- `src/components/*`
  - `BadgeCard`, `BadgeGrid`, `ProgressBar`, `StreakCounter`, `AchievementToast`, `GamificationDashboard`, `ReactionBar`, `ModuleFeedback`.
  - Consumer-facing render targets with scoped slots and emitted events.

## Documentation API (`docs`)

- `docs/README.md`: package description and usage surface.
- `docs/composables.md`: composable contracts and examples.
- `docs/components.md`: component APIs, props, slots, events.
- `docs/types.md`: exported type contracts.

## Knowledge base site (`site`)

- `site/src/content.config.ts`
  - Content collection loader and schema (`title`, `description`, `section`, `order`, draft state).

- `site/src/pages/index.astro`
  - Home route and landing composition.

- `site/src/pages/[...slug].astro`
  - Static path generation from content collection.
  - Route render with breadcrumbing and prev/next resolution.

- `site/src/layouts/DocsLayout.astro`
  - Shared docs shell + structured data + sidebar/toc/nav composition.

- `site/src/lib/navigation.ts`
  - Sidebar tree extraction and previous/next resolution.

- `site/src/config/navigation/*.js`
  - Section trees (accueil, comprendre, concevoir, creer, humain, valider, outils).

- `site/src/components/*`
  - `ReadingProgress.vue`, `ArticleReward.vue`, `GamificationBar.vue`, UI chrome for docs and navigation.

## `tools/` (standalone interactive diagnostics)

- `tools/OctalysisScorer.vue`, `MechanicsChecker.vue`, `AlignmentDiagnostic.vue`, etc.
  - Browser-only compositional diagnostics not part of public package export surface.

## High-change areas

- Any storage contract change impacts multiple composables and all interactive components.
- Navigation/content mapping changes in `site/src/lib/navigation.ts` or `site/src/config/navigation/*` can break links.
- Content generation changes in `site/src/content.config.ts` affect all article routes.
