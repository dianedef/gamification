<script setup lang="ts">
import type { ReactionType, ReactionCounts } from '../types'
import { useReactions } from '../composables/useReactions'
import { REACTIONS } from '../utils/reactions'

const props = defineProps<{
  itemId: string
  initialCounts?: Partial<ReactionCounts>
  storagePrefix?: string
  class?: string
}>()

const { counts, userReaction, hasVoted, totalResponses, react, clearReaction } = useReactions({
  itemId: props.itemId,
  storagePrefix: props.storagePrefix,
  initialCounts: props.initialCounts,
})

function isSelected(type: ReactionType): boolean {
  return userReaction.value === type
}
</script>

<template>
  <div
    :class="$props.class"
    role="group"
    aria-label="Reactions"
  >
    <slot
      :counts="counts"
      :user-reaction="userReaction"
      :has-voted="hasVoted"
      :total-responses="totalResponses"
      :react="react"
      :clear-reaction="clearReaction"
      :reactions="REACTIONS"
      :is-selected="isSelected"
    >
      <div v-if="hasVoted" aria-live="polite" class="reaction-header">
        <slot name="header" :total="totalResponses">
          {{ totalResponses }} Response{{ totalResponses === 1 ? '' : 's' }}
        </slot>
      </div>
      <div class="reaction-buttons">
        <template v-for="reaction in REACTIONS" :key="reaction.type">
          <slot
            name="reaction"
            :type="reaction.type"
            :emoji="reaction.emoji"
            :label="reaction.label"
            :count="counts[reaction.type]"
            :is-selected="isSelected(reaction.type)"
            :on-click="() => react(reaction.type)"
          >
            <button
              type="button"
              :aria-pressed="isSelected(reaction.type)"
              :aria-label="`${reaction.label} (${counts[reaction.type]})`"
              :class="['reaction-button', { 'reaction-selected': isSelected(reaction.type) }]"
              @click="react(reaction.type)"
            >
              <span class="reaction-emoji">{{ reaction.emoji }}</span>
              <span class="reaction-count">{{ counts[reaction.type] }}</span>
            </button>
          </slot>
        </template>
      </div>
    </slot>
  </div>
</template>
