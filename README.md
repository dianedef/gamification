# @diane-winflowz/gamification

A Vue 3 gamification library with badges, streaks, progress tracking, and confetti celebrations.

## Installation

```bash
npm install github:dianedef/gamification
```

## Usage

```vue
<script setup>
import {
  useGamification,
  useBadges,
  useStreak,
  useProgress,
  BadgeCard,
  BadgeGrid,
  StreakCounter,
  ProgressBar,
  AchievementToast,
  GamificationDashboard
} from '@diane-winflowz/gamification'

const { badges, unlockBadge } = useBadges()
const { streak, incrementStreak } = useStreak()
const { progress, addProgress } = useProgress()
</script>

<template>
  <GamificationDashboard />
  <BadgeGrid :badges="badges" />
  <StreakCounter :streak="streak" />
  <ProgressBar :progress="progress" />
</template>
```

## Components

- `BadgeCard` - Display a single badge
- `BadgeGrid` - Display a grid of badges
- `StreakCounter` - Show current streak
- `ProgressBar` - Visual progress indicator
- `AchievementToast` - Toast notification for achievements
- `GamificationDashboard` - Full dashboard with all features

## Composables

- `useGamification()` - Main composable with all features
- `useBadges()` - Badge management
- `useStreak()` - Streak tracking
- `useProgress()` - Progress tracking
- `useReadTracker()` - Reading progress tracking

## Requirements

- Vue 3.4+
