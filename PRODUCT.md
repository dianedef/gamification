---
artifact: product_context
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "gamification"
created: "2026-04-26"
updated: "2026-04-27"
status: active
source_skill: sf-docs
scope: product
owner: diane-winflowz
confidence: medium
risk_level: medium
target_user: "Vue developers, product builders, and teams adding engagement loops to learning, productivity, and habit-oriented apps"
user_problem: "Teams repeatedly reimplement gamification mechanics (badges, streaks, progress, rewards, reactions) from scratch, causing inconsistent behavior, duplicated bugs, and fragmented UX across apps."
desired_outcomes: |
  - Provide a reusable Vue 3 gamification toolkit with composables and headless components.
  - Offer progress, achievement, streak, and reaction primitives that can be themed/embedded in any UI.
  - Keep persistence simple by default while allowing custom storage adapters.
  - Enable consistent gameful engagement patterns (XP/levels, rewards, and quests) with minimal app-specific code.
non_goals: |
  - Build a full backend service, user accounts, or multi-tenant dashboard.
  - Replace game design strategy, analytics, or notification infrastructure.
  - Provide server-side anti-cheat, fraud prevention, or real-time competitive leaderboards.
security_impact: none
docs_impact: yes
evidence:
  - "README.md and docs/README.md define public API and installation usage"
  - "package.json declares dependency and distribution contract for npm package `@diane-winflowz/gamification`"
  - "src/index.ts exports composables, components, and utility functions"
  - "src/composables/useGamification.ts, useQuests.ts, useLevel.ts, useDailyRewards.ts"
  - "docs/composables.md, docs/components.md, docs/types.md and docs/README.md"
  - "src/utils/storage.ts for storage abstraction"
linked_artifacts: []
depends_on:
  - artifact: "BUSINESS.md"
    artifact_version: "1.0.0"
    required_status: "active"
  - artifact: "BRANDING.md"
    artifact_version: "1.0.0"
    required_status: "active"
supersedes: []
next_review: "2026-07-26"
next_step: "/sf-docs audit PRODUCT.md"
---

# Product Context

## Target User

- Vue 3 app teams building learning, productivity, habit-forming, or engagement-heavy interfaces.
- Internal Flowz ecosystem teams that need one consistent gamification module across multiple apps.
- Independent developers shipping reusable component libraries for OSS users.

## Problem

Gamification patterns are often implemented ad hoc across projects, which creates:

- Different tracking semantics for read/progress/streak state.
- Repeatedly duplicated localStorage handling and persistence edge cases.
- Inconsistent accessibility and interaction behavior between apps.
- Unclear boundaries between UI rendering and game-state logic.

## Desired Outcomes

- Add progress, badge, streak, reward, reaction, and feedback behavior from a single package.
- Keep the library UI-agnostic by exposing headless/renderless components and composables.
- Provide deterministic, framework-friendly SSR behavior with no hard dependency on browser-only features.
- Offer easy migration/extension points for app-specific persistence through `StorageAdapter`.

## Core Workflows

- Setup via `createStorage` + exported composables:
  - `useGamification` for end-to-end orchestration
  - `useReadTracker`, `useStreak`, `useBadges`, `useProgress`
  - `useReactions` and `useModuleFeedback` for engagement capture
- Optional deeper game systems:
  - `useLevel` for XP progression
  - `useQuests` for daily/weekly/main/side quest logic
  - `useDailyRewards` for streak-like bonus rewards
- UI rendering through headless components (`BadgeCard`, `StreakCounter`, `ProgressBar`, `GamificationDashboard`, etc.) with full slot-based customization.
- Package consumption through `npm install` and library exports in `src/index.ts`.

## Scope In

- Reusable gamification logic and presentational hooks for Vue 3.
- Local state management with configurable storage prefix and optional custom adapters.
- API-level behaviors: progression math, badge checks, streak logic, reactions, quest completion tracking.
- Documentation that maps all primary entry points and types.

## Scope Out

- No authoritative player economy, billing, or backend anti-cheat.
- No built-in auth, social graph, or leaderboard matchmaking.
- No automatic migration tooling beyond manual storage key changes.

## Proof Signals

- New Vue app can add read tracking + streak logic in one composable composition call.
- Badges, progress bars, and toasts update from a single state event chain.
- Consumers can theme/replace all visuals without editing composable logic.
- Reactions and feedback data are recorded with deterministic local state flows.

## Success Metrics

- Reduced onboarding time for gamification in a new app.
- Lower duplicate-code footprint across `Flowz` repos.
- Stable API usage across docs and runtime exports (`tsc`/`vite build` surface agreement).

## Risks

- Storage-key mismatch across apps can fragment user state.
- Overloaded reward systems can create manipulation or fatigue if game mechanics are misused.
- Headless UI requires strong integration discipline in consumer components for visual consistency.
