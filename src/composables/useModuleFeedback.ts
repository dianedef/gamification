import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type {
  DifficultyOption,
  EngagementOption,
  ModuleFeedbackCounts,
  ModuleFeedbackSelections,
} from '../types'
import { createStorage } from '../utils/storage'

export interface UseModuleFeedbackReturn {
  counts: Ref<ModuleFeedbackCounts>
  userSelections: Ref<ModuleFeedbackSelections>
  hasVoted: ComputedRef<boolean>
  totalResponses: ComputedRef<number>
  selectDifficulty: (option: DifficultyOption) => void
  selectEngagement: (option: EngagementOption) => void
  clearDifficulty: () => void
  clearEngagement: () => void
  clearAll: () => void
}

export interface UseModuleFeedbackOptions {
  moduleId: string
  storagePrefix?: string
  initialCounts?: Partial<ModuleFeedbackCounts>
}

const DEFAULT_COUNTS: ModuleFeedbackCounts = {
  difficulty: { easy: 0, justRight: 0, hard: 0 },
  engagement: { boring: 0, interesting: 0, fascinating: 0 },
}

const DEFAULT_SELECTIONS: ModuleFeedbackSelections = {
  difficulty: null,
  engagement: null,
}

export function useModuleFeedback(options: UseModuleFeedbackOptions): UseModuleFeedbackReturn {
  const { moduleId, storagePrefix = 'gamification', initialCounts = {} } = options

  const storage = createStorage(storagePrefix)
  const userKey = `feedback:${moduleId}:user`
  const countsKey = `feedback:${moduleId}:counts`

  // Load initial state
  const storedSelections = storage.get<ModuleFeedbackSelections>(userKey)
  const storedCountAdjustments = storage.get<Partial<ModuleFeedbackCounts>>(countsKey) ?? {}

  // Merge initial counts with stored adjustments
  const mergedCounts: ModuleFeedbackCounts = {
    difficulty: {
      ...DEFAULT_COUNTS.difficulty,
      ...initialCounts.difficulty,
    },
    engagement: {
      ...DEFAULT_COUNTS.engagement,
      ...initialCounts.engagement,
    },
  }

  // Apply stored adjustments
  if (storedCountAdjustments.difficulty) {
    for (const key of Object.keys(storedCountAdjustments.difficulty) as DifficultyOption[]) {
      mergedCounts.difficulty[key] =
        (mergedCounts.difficulty[key] ?? 0) + (storedCountAdjustments.difficulty[key] ?? 0)
    }
  }
  if (storedCountAdjustments.engagement) {
    for (const key of Object.keys(storedCountAdjustments.engagement) as EngagementOption[]) {
      mergedCounts.engagement[key] =
        (mergedCounts.engagement[key] ?? 0) + (storedCountAdjustments.engagement[key] ?? 0)
    }
  }

  const counts = ref<ModuleFeedbackCounts>(mergedCounts)
  const userSelections = ref<ModuleFeedbackSelections>(
    storedSelections ?? { ...DEFAULT_SELECTIONS }
  )

  const hasVoted = computed(
    () => userSelections.value.difficulty !== null || userSelections.value.engagement !== null
  )

  const totalResponses = computed(() => {
    const difficultyTotal = Object.values(counts.value.difficulty).reduce(
      (sum, count) => sum + count,
      0
    )
    const engagementTotal = Object.values(counts.value.engagement).reduce(
      (sum, count) => sum + count,
      0
    )
    return Math.max(difficultyTotal, engagementTotal)
  })

  function persistUser(): void {
    if (
      userSelections.value.difficulty === null &&
      userSelections.value.engagement === null
    ) {
      storage.remove(userKey)
    } else {
      storage.set(userKey, userSelections.value)
    }
  }

  function persistCountAdjustment(
    dimension: 'difficulty' | 'engagement',
    key: DifficultyOption | EngagementOption,
    delta: number
  ): void {
    const existing = storage.get<Partial<ModuleFeedbackCounts>>(countsKey) ?? {}
    const merged: Partial<ModuleFeedbackCounts> = {
      ...existing,
      [dimension]: {
        ...(existing[dimension] ?? {}),
        [key]: ((existing[dimension] as Record<string, number>)?.[key] ?? 0) + delta,
      },
    }
    storage.set(countsKey, merged)
  }

  function selectDifficulty(option: DifficultyOption): void {
    const previous = userSelections.value.difficulty

    if (previous === option) {
      // Toggle off
      counts.value.difficulty[option]--
      userSelections.value.difficulty = null
      persistCountAdjustment('difficulty', option, -1)
    } else {
      // New selection or switch
      if (previous !== null) {
        counts.value.difficulty[previous]--
        persistCountAdjustment('difficulty', previous, -1)
      }
      counts.value.difficulty[option]++
      userSelections.value.difficulty = option
      persistCountAdjustment('difficulty', option, 1)
    }

    persistUser()
  }

  function selectEngagement(option: EngagementOption): void {
    const previous = userSelections.value.engagement

    if (previous === option) {
      // Toggle off
      counts.value.engagement[option]--
      userSelections.value.engagement = null
      persistCountAdjustment('engagement', option, -1)
    } else {
      // New selection or switch
      if (previous !== null) {
        counts.value.engagement[previous]--
        persistCountAdjustment('engagement', previous, -1)
      }
      counts.value.engagement[option]++
      userSelections.value.engagement = option
      persistCountAdjustment('engagement', option, 1)
    }

    persistUser()
  }

  function clearDifficulty(): void {
    const previous = userSelections.value.difficulty
    if (previous !== null) {
      counts.value.difficulty[previous]--
      persistCountAdjustment('difficulty', previous, -1)
      userSelections.value.difficulty = null
      persistUser()
    }
  }

  function clearEngagement(): void {
    const previous = userSelections.value.engagement
    if (previous !== null) {
      counts.value.engagement[previous]--
      persistCountAdjustment('engagement', previous, -1)
      userSelections.value.engagement = null
      persistUser()
    }
  }

  function clearAll(): void {
    clearDifficulty()
    clearEngagement()
  }

  return {
    counts,
    userSelections,
    hasVoted,
    totalResponses,
    selectDifficulty,
    selectEngagement,
    clearDifficulty,
    clearEngagement,
    clearAll,
  }
}
