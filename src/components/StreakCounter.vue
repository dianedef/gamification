<script setup lang="ts">
defineProps<{
  current: number
  longest: number
  isActive: boolean
  class?: string
}>()
</script>

<template>
  <div :class="$props.class" role="status" :aria-label="`Série : ${current} jour${current > 1 ? 's' : ''}`">
    <slot :current="current" :longest="longest" :isActive="isActive">
      <slot name="icon" :isActive="isActive">
        <span :style="{ opacity: isActive ? 1 : 0.4 }">🔥</span>
      </slot>
      <slot name="label" :current="current" :longest="longest">
        <span>{{ current }} jour{{ current > 1 ? 's' : '' }}</span>
      </slot>
    </slot>
  </div>
</template>
