# @diane-winflowz/gamification

A headless Vue 3 gamification library for building engaging learning experiences. Provides composables and renderless components for tracking progress, achievements, streaks, reactions, and feedback.

## Installation

```bash
npm install @diane-winflowz/gamification
# or
pnpm add @diane-winflowz/gamification
# or
yarn add @diane-winflowz/gamification
```

## Quick Start

```vue
<script setup>
import {
  useGamification,
  BadgeCard,
  StreakCounter,
  ProgressBar,
} from '@diane-winflowz/gamification'

const badges = [
  {
    id: 'first-read',
    name: 'First Steps',
    description: 'Read your first article',
    icon: '📖',
    condition: (state) => state.totalRead >= 1,
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    condition: (state) => state.currentStreak >= 7,
  },
]

const categories = {
  basics: ['intro', 'setup', 'first-steps'],
  advanced: ['performance', 'testing', 'deployment'],
}

const { reader, streak, badges: badgeState, progress, markAsRead } = useGamification({
  badges,
  categories,
  onBadgeEarned: (badge) => {
    console.log(`Unlocked: ${badge.name}`)
  },
})

// Call when user completes an article
function onArticleComplete(slug, category) {
  markAsRead(slug, category)
}
</script>

<template>
  <div>
    <StreakCounter
      :current="streak.currentStreak.value"
      :longest="streak.longestStreak.value"
      :is-active="streak.isActive.value"
    />

    <ProgressBar
      :value="progress.overall.value.read"
      :max="progress.overall.value.total"
      label="Overall Progress"
    />

    <div v-for="badge in badgeState.earned.value" :key="badge.id">
      <BadgeCard :badge="badge" :earned="true" />
    </div>
  </div>
</template>
```

## Features

### Progress Tracking
- **Read Tracker**: Track which articles/modules users have completed
- **Progress Computation**: Calculate completion percentages by category and overall
- **Streak System**: Track daily engagement with configurable grace periods

### Achievements
- **Badge System**: Define badges with custom conditions
- **Secret Badges**: Hidden badges revealed only when earned
- **Achievement Notifications**: Toast component for badge unlock celebrations

### Engagement
- **Reactions**: Upvote, funny, love, surprised, angry, sad reactions
- **Module Feedback**: Two-dimension feedback (Difficulty + Engagement) for course modules

### Components
All components are **headless/renderless** — they provide logic and accessibility, but let you fully customize the rendering via slots.

## Documentation

- [Composables](./composables.md) - API reference for all composables
- [Components](./components.md) - Props, slots, and usage examples for all components
- [Types](./types.md) - TypeScript type reference

## Storage

By default, all data is persisted to `localStorage` with a configurable prefix (default: `gamification`). The library is SSR-safe — storage operations are no-ops when `window` is undefined.

### Custom Storage

```typescript
import { createStorage } from '@diane-winflowz/gamification'

// Create a storage adapter with custom prefix
const storage = createStorage('my-app')

// Use with composables
const reader = useReadTracker({ storage })
```

## License

MIT
