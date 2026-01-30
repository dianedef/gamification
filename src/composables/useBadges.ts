import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { Badge, GamificationState, StorageAdapter } from '../types'

export interface UseBadgesReturn {
  earned: Ref<Badge[]>
  unearned: Ref<Badge[]>
  newlyEarned: Ref<Badge[]>
  progress: ComputedRef<number>
  checkAll: (state: GamificationState) => void
}

export function useBadges(options: {
  badges: Badge[]
  storage: StorageAdapter
  storageKey?: string
}): UseBadgesReturn {
  const { badges, storage, storageKey = 'badges_earned' } = options

  const earnedIds = ref<string[]>(storage.get<string[]>(storageKey) ?? [])
  const newlyEarned = ref<Badge[]>([])

  const earned = computed(() =>
    badges.filter((b) => earnedIds.value.includes(b.id))
  )

  const unearned = computed(() =>
    badges.filter((b) => !earnedIds.value.includes(b.id) && !b.secret)
  )

  const progress = computed(() => {
    const total = badges.filter((b) => !b.secret).length
    if (total === 0) return 0
    const earnedNonSecret = earned.value.filter((b) => !b.secret).length
    return Math.round((earnedNonSecret / total) * 100)
  })

  function persist() {
    storage.set(storageKey, earnedIds.value)
  }

  function checkAll(state: GamificationState): void {
    const newBadges: Badge[] = []

    for (const badge of badges) {
      if (earnedIds.value.includes(badge.id)) continue
      try {
        if (badge.condition(state)) {
          earnedIds.value.push(badge.id)
          newBadges.push(badge)
        }
      } catch {
        // Condition evaluation failed — skip
      }
    }

    if (newBadges.length > 0) {
      newlyEarned.value = newBadges
      persist()
    }
  }

  return {
    earned,
    unearned,
    newlyEarned,
    progress,
    checkAll,
  }
}
