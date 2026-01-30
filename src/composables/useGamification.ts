import { watch } from 'vue'
import type { Badge, GamificationOptions, GamificationState } from '../types'
import { createStorage } from '../utils/storage'
import { useReadTracker, type UseReadTrackerReturn } from './useReadTracker'
import { useStreak, type UseStreakReturn } from './useStreak'
import { useBadges, type UseBadgesReturn } from './useBadges'
import { useProgress, type UseProgressReturn } from './useProgress'

export interface UseGamificationReturn {
  reader: UseReadTrackerReturn
  streak: UseStreakReturn
  badges: UseBadgesReturn
  progress: UseProgressReturn
  markAsRead: (slug: string, category?: string) => void
}

export function useGamification(options: GamificationOptions): UseGamificationReturn {
  const {
    badges: badgeDefs,
    categories,
    storagePrefix = 'gamification',
    gracePeriodHours = 36,
    onBadgeEarned,
  } = options

  const storage = createStorage(storagePrefix)

  const reader = useReadTracker({ storage, storageKey: 'reads' })
  const streak = useStreak({ storage, storageKey: 'streak', gracePeriodHours })
  const badges = useBadges({ badges: badgeDefs, storage, storageKey: 'badges_earned' })
  const progress = useProgress({
    categories,
    getArticlesRead: () => reader.articlesRead.value,
  })

  function buildState(): GamificationState {
    return {
      articlesRead: reader.articlesRead.value,
      readByCategory: reader.readByCategory.value,
      currentStreak: streak.currentStreak.value,
      longestStreak: streak.longestStreak.value,
      totalRead: reader.totalRead.value,
    }
  }

  function markAsRead(slug: string, category?: string): void {
    reader.markAsRead(slug, category)
    streak.recordVisit()
    badges.checkAll(buildState())
  }

  // Watch for newly earned badges and fire callback
  if (onBadgeEarned) {
    watch(
      () => badges.newlyEarned.value,
      (newBadges) => {
        for (const badge of newBadges) {
          onBadgeEarned(badge)
        }
      }
    )
  }

  // Initial badge check on mount
  badges.checkAll(buildState())

  return {
    reader,
    streak,
    badges,
    progress,
    markAsRead,
  }
}
