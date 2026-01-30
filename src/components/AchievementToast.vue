<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import type { Badge } from '../types'

const props = defineProps<{
  badge: Badge | null
  duration?: number
  class?: string
}>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

watch(
  () => props.badge,
  (newBadge) => {
    if (newBadge) {
      visible.value = true
      clearTimer()
      timer = setTimeout(() => {
        visible.value = false
      }, props.duration ?? 4000)
    }
  }
)

onUnmounted(clearTimer)
</script>

<template>
  <Transition name="toast">
    <div v-if="visible && badge" :class="$props.class" role="alert" aria-live="polite">
      <slot :badge="badge" :dismiss="() => (visible = false)">
        <span>{{ badge.icon }}</span>
        <span>Badge débloqué : {{ badge.name }}</span>
      </slot>
    </div>
  </Transition>
</template>
