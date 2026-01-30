<script setup lang="ts">
import type { Badge, ProgressEntry } from '../types'

defineProps<{
  currentStreak: number
  longestStreak: number
  isStreakActive: boolean
  earnedBadges: Badge[]
  unearnedBadges: Badge[]
  earnedIds: string[]
  allBadges: Badge[]
  badgeProgress: number
  progressByCategory: Record<string, ProgressEntry>
  overallProgress: ProgressEntry
  class?: string
}>()
</script>

<template>
  <div :class="$props.class">
    <slot name="header">
      <h2>Progression</h2>
    </slot>

    <slot
      name="streak"
      :current="currentStreak"
      :longest="longestStreak"
      :isActive="isStreakActive"
    >
      <div>🔥 {{ currentStreak }} jour{{ currentStreak > 1 ? 's' : '' }} de suite</div>
    </slot>

    <slot
      name="badges"
      :earned="earnedBadges"
      :unearned="unearnedBadges"
      :earnedIds="earnedIds"
      :allBadges="allBadges"
      :progress="badgeProgress"
    >
      <div>{{ earnedBadges.length }} / {{ allBadges.length }} badges</div>
    </slot>

    <slot
      name="progress"
      :byCategory="progressByCategory"
      :overall="overallProgress"
    >
      <div>{{ overallProgress.percent }}% complété</div>
    </slot>

    <slot name="footer" />
  </div>
</template>
