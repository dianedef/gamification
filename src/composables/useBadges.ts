import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { Badge, GamificationState, StorageAdapter } from '../types'

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'legendary'

export interface BadgeProgress {
  badge: Badge
  current: number
  total: number
  percent: number
  isNearMiss: boolean
}

export interface UseBadgesReturn {
  earned: ComputedRef<Badge[]>
  unearned: ComputedRef<Badge[]>
  newlyEarned: Ref<Badge[]>
  progress: ComputedRef<number>
  badgeProgress: ComputedRef<BadgeProgress[]>
  nearMissBadges: ComputedRef<BadgeProgress[]>
  earnedByTier: ComputedRef<Record<string, Badge[]>>
  checkAll: (state: GamificationState) => void
  getBadgeMessage: (badge: Badge) => string
}

const TIER_ORDER: BadgeTier[] = ['bronze', 'silver', 'gold', 'diamond', 'legendary']

const TIER_MESSAGES: Record<BadgeTier, (name: string) => string> = {
  bronze: (name) => `Premier pas ! Badge "${name}" obtenu. Continue comme ça.`,
  silver: (name) => `Impressionnant ! Badge "${name}" débloqué. Tu fais partie des 30% les plus assidus.`,
  gold: (name) => `Exceptionnel. Badge "${name}" — très peu y parviennent. Tu es un véritable expert.`,
  diamond: (name) => `Légendaire. Badge "${name}" — tu fais partie de l'élite.`,
  legendary: (name) => `"${name}" — ce badge est réservé aux plus grands. Respect absolu.`,
}

export function useBadges(options: {
  badges: Badge[]
  storage: StorageAdapter
  storageKey?: string
  nearMissThreshold?: number
}): UseBadgesReturn {
  const {
    badges,
    storage,
    storageKey = 'badges_earned',
    nearMissThreshold = 0.7,
  } = options

  const earnedIds = ref<string[]>(storage.get<string[]>(storageKey) ?? [])
  const newlyEarned = ref<Badge[]>([])

  const earned = computed(() =>
    badges.filter((b) => earnedIds.value.includes(b.id)),
  )

  const unearned = computed(() =>
    badges.filter((b) => !earnedIds.value.includes(b.id) && !b.secret),
  )

  const progress = computed(() => {
    const total = badges.filter((b) => !b.secret).length
    if (total === 0) return 0
    const earnedNonSecret = earned.value.filter((b) => !b.secret).length
    return Math.round((earnedNonSecret / total) * 100)
  })

  // Per-badge progress tracking with near-miss detection
  const badgeProgress = computed<BadgeProgress[]>(() =>
    badges
      .filter((b) => !earnedIds.value.includes(b.id) && b.progress)
      .map((b) => {
        const p = b.progress!()
        const percent = p.total > 0 ? Math.round((p.current / p.total) * 100) : 0
        return {
          badge: b,
          current: p.current,
          total: p.total,
          percent,
          isNearMiss: percent >= nearMissThreshold * 100 && percent < 100,
        }
      })
      .sort((a, b) => b.percent - a.percent),
  )

  // Near-miss badges — goal gradient activation zone
  const nearMissBadges = computed<BadgeProgress[]>(() =>
    badgeProgress.value.filter((bp) => bp.isNearMiss),
  )

  // Group earned badges by tier
  const earnedByTier = computed<Record<string, Badge[]>>(() => {
    const result: Record<string, Badge[]> = {}
    for (const tier of TIER_ORDER) {
      result[tier] = earned.value.filter((b) => b.tier === tier)
    }
    return result
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

  function getBadgeMessage(badge: Badge): string {
    const tier = (badge.tier ?? 'bronze') as BadgeTier
    const messageFn = TIER_MESSAGES[tier] ?? TIER_MESSAGES.bronze
    return messageFn(badge.name)
  }

  return {
    earned,
    unearned,
    newlyEarned,
    progress,
    badgeProgress,
    nearMissBadges,
    earnedByTier,
    checkAll,
    getBadgeMessage,
  }
}
