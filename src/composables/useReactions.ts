import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { ReactionType, ReactionCounts } from '../types'
import { createStorage } from '../utils/storage'

export interface UseReactionsReturn {
  counts: Ref<ReactionCounts>
  userReaction: Ref<ReactionType | null>
  hasVoted: ComputedRef<boolean>
  totalResponses: ComputedRef<number>
  react: (type: ReactionType) => void
  clearReaction: () => void
}

export interface UseReactionsOptions {
  itemId: string
  storagePrefix?: string
  initialCounts?: Partial<ReactionCounts>
}

const DEFAULT_COUNTS: ReactionCounts = {
  upvote: 0,
  funny: 0,
  love: 0,
  surprised: 0,
  angry: 0,
  sad: 0,
}

export function useReactions(options: UseReactionsOptions): UseReactionsReturn {
  const { itemId, storagePrefix = 'gamification', initialCounts = {} } = options

  const storage = createStorage(storagePrefix)
  const userKey = `reactions:${itemId}:user`
  const countsKey = `reactions:${itemId}:counts`

  // Load initial state
  const storedUserReaction = storage.get<ReactionType | null>(userKey)
  const storedCountAdjustments = storage.get<Partial<ReactionCounts>>(countsKey) ?? {}

  // Merge initial counts with stored adjustments
  const mergedCounts: ReactionCounts = { ...DEFAULT_COUNTS, ...initialCounts }
  for (const key of Object.keys(storedCountAdjustments) as ReactionType[]) {
    mergedCounts[key] = (mergedCounts[key] ?? 0) + (storedCountAdjustments[key] ?? 0)
  }

  const counts = ref<ReactionCounts>(mergedCounts)
  const userReaction = ref<ReactionType | null>(storedUserReaction)

  const hasVoted = computed(() => userReaction.value !== null)

  const totalResponses = computed(() =>
    Object.values(counts.value).reduce((sum, count) => sum + count, 0)
  )

  function persistUser() {
    if (userReaction.value === null) {
      storage.remove(userKey)
    } else {
      storage.set(userKey, userReaction.value)
    }
  }

  function persistCountAdjustments(adjustments: Partial<ReactionCounts>) {
    const existing = storage.get<Partial<ReactionCounts>>(countsKey) ?? {}
    const merged = { ...existing }
    for (const key of Object.keys(adjustments) as ReactionType[]) {
      merged[key] = (merged[key] ?? 0) + (adjustments[key] ?? 0)
    }
    storage.set(countsKey, merged)
  }

  function react(type: ReactionType): void {
    const previousReaction = userReaction.value

    if (previousReaction === type) {
      // Toggle off - same reaction clicked again
      counts.value[type]--
      userReaction.value = null
      persistCountAdjustments({ [type]: -1 } as Partial<ReactionCounts>)
    } else {
      // New reaction or switching
      if (previousReaction !== null) {
        // Remove previous reaction
        counts.value[previousReaction]--
        persistCountAdjustments({ [previousReaction]: -1 } as Partial<ReactionCounts>)
      }
      // Add new reaction
      counts.value[type]++
      userReaction.value = type
      persistCountAdjustments({ [type]: 1 } as Partial<ReactionCounts>)
    }

    persistUser()
  }

  function clearReaction(): void {
    if (userReaction.value !== null) {
      const previousReaction = userReaction.value
      counts.value[previousReaction]--
      persistCountAdjustments({ [previousReaction]: -1 } as Partial<ReactionCounts>)
      userReaction.value = null
      persistUser()
    }
  }

  return {
    counts,
    userReaction,
    hasVoted,
    totalResponses,
    react,
    clearReaction,
  }
}
