<script setup lang="ts">
import type { Badge } from '../types'

defineProps<{
  badges: Badge[]
  earnedIds: string[]
  columns?: number
  class?: string
}>()
</script>

<template>
  <div
    :class="$props.class"
    role="list"
    :aria-label="`Badges : ${earnedIds.length} sur ${badges.length} débloqués`"
  >
    <slot v-if="badges.length === 0" name="empty">
      <p>Aucun badge disponible.</p>
    </slot>
    <template v-for="badge in badges" :key="badge.id">
      <slot name="badge" :badge="badge" :earned="earnedIds.includes(badge.id)">
        <div>{{ badge.icon }} {{ badge.name }}</div>
      </slot>
    </template>
  </div>
</template>
