<script setup lang="ts">
import type { DifficultyOption, EngagementOption, ModuleFeedbackCounts } from '../types'
import { useModuleFeedback } from '../composables/useModuleFeedback'
import { DIFFICULTY_OPTIONS, ENGAGEMENT_OPTIONS } from '../utils/feedback'

const props = defineProps<{
  moduleId: string
  initialCounts?: Partial<ModuleFeedbackCounts>
  storagePrefix?: string
  class?: string
}>()

const {
  counts,
  userSelections,
  hasVoted,
  totalResponses,
  selectDifficulty,
  selectEngagement,
  clearDifficulty,
  clearEngagement,
  clearAll,
} = useModuleFeedback({
  moduleId: props.moduleId,
  storagePrefix: props.storagePrefix,
  initialCounts: props.initialCounts,
})

function isDifficultySelected(key: DifficultyOption): boolean {
  return userSelections.value.difficulty === key
}

function isEngagementSelected(key: EngagementOption): boolean {
  return userSelections.value.engagement === key
}
</script>

<template>
  <div
    :class="$props.class"
    role="group"
    aria-label="Module Feedback"
  >
    <slot
      :counts="counts"
      :user-selections="userSelections"
      :has-voted="hasVoted"
      :total-responses="totalResponses"
      :select-difficulty="selectDifficulty"
      :select-engagement="selectEngagement"
      :clear-difficulty="clearDifficulty"
      :clear-engagement="clearEngagement"
      :clear-all="clearAll"
      :difficulty-options="DIFFICULTY_OPTIONS"
      :engagement-options="ENGAGEMENT_OPTIONS"
      :is-difficulty-selected="isDifficultySelected"
      :is-engagement-selected="isEngagementSelected"
    >
      <div v-if="hasVoted" aria-live="polite" class="feedback-header">
        <slot name="header" :total="totalResponses">
          {{ totalResponses }} Response{{ totalResponses === 1 ? '' : 's' }}
        </slot>
      </div>

      <div class="feedback-dimension">
        <slot name="dimension-label" dimension="difficulty">
          <span class="feedback-dimension-label">Difficulty:</span>
        </slot>
        <div class="feedback-options">
          <template v-for="option in DIFFICULTY_OPTIONS" :key="option.key">
            <slot
              name="difficulty-option"
              :option="option"
              :count="counts.difficulty[option.key]"
              :is-selected="isDifficultySelected(option.key)"
              :on-click="() => selectDifficulty(option.key)"
            >
              <button
                type="button"
                :aria-pressed="isDifficultySelected(option.key)"
                :aria-label="`${option.label} (${counts.difficulty[option.key]})`"
                :class="['feedback-button', { 'feedback-selected': isDifficultySelected(option.key) }]"
                @click="selectDifficulty(option.key)"
              >
                <span class="feedback-emoji">{{ option.emoji }}</span>
                <span class="feedback-label">{{ option.label }}</span>
                <span class="feedback-count">{{ counts.difficulty[option.key] }}</span>
              </button>
            </slot>
          </template>
        </div>
      </div>

      <div class="feedback-dimension">
        <slot name="dimension-label" dimension="engagement">
          <span class="feedback-dimension-label">Engagement:</span>
        </slot>
        <div class="feedback-options">
          <template v-for="option in ENGAGEMENT_OPTIONS" :key="option.key">
            <slot
              name="engagement-option"
              :option="option"
              :count="counts.engagement[option.key]"
              :is-selected="isEngagementSelected(option.key)"
              :on-click="() => selectEngagement(option.key)"
            >
              <button
                type="button"
                :aria-pressed="isEngagementSelected(option.key)"
                :aria-label="`${option.label} (${counts.engagement[option.key]})`"
                :class="['feedback-button', { 'feedback-selected': isEngagementSelected(option.key) }]"
                @click="selectEngagement(option.key)"
              >
                <span class="feedback-emoji">{{ option.emoji }}</span>
                <span class="feedback-label">{{ option.label }}</span>
                <span class="feedback-count">{{ counts.engagement[option.key] }}</span>
              </button>
            </slot>
          </template>
        </div>
      </div>
    </slot>
  </div>
</template>
