<script setup lang="ts">
import type { Badge } from '../types'

defineProps<{
  badge: Badge
  earned: boolean
  class?: string
}>()

defineEmits<{
  click: [badge: Badge]
}>()
</script>

<template>
  <div
    :class="[$props.class, earned ? 'badge-earned' : 'badge-locked']"
    role="listitem"
    :aria-label="earned ? badge.name : `${badge.name} (verrouillé)`"
    @click="$emit('click', badge)"
  >
    <slot :badge="badge" :earned="earned">
      <slot name="icon" :badge="badge" :earned="earned">
        <span class="badge-icon" :style="{ opacity: earned ? 1 : 0.3 }">
          {{ badge.icon }}
        </span>
      </slot>
      <span class="badge-name">{{ badge.name }}</span>
      <span v-if="earned" class="badge-description">{{ badge.description }}</span>
      <slot v-else name="locked" :badge="badge">
        <span class="badge-locked-text">???</span>
      </slot>
    </slot>
  </div>
</template>
