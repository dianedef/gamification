<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  max: number
  label?: string
  class?: string
  barClass?: string
}>()

const percent = computed(() =>
  props.max > 0 ? Math.round((props.value / props.max) * 100) : 0
)
</script>

<template>
  <div :class="$props.class" role="progressbar" :aria-valuenow="value" :aria-valuemin="0" :aria-valuemax="max">
    <slot :value="value" :max="max" :percent="percent" :label="label">
      <slot name="label" :label="label" :percent="percent">
        <span v-if="label">{{ label }} — {{ percent }}%</span>
      </slot>
      <div :class="barClass" :style="{ width: `${percent}%` }"></div>
    </slot>
  </div>
</template>
