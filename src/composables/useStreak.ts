import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { StorageAdapter, StreakData } from '../types'

export type StreakStatus = 'active' | 'danger' | 'frozen' | 'broken' | 'new'

export interface StreakMilestone {
  days: number
  reached: boolean
  label: string
}

export interface UseStreakReturn {
  currentStreak: Ref<number>
  longestStreak: Ref<number>
  lastVisitDate: Ref<string | null>
  freezesAvailable: Ref<number>
  isActive: ComputedRef<boolean>
  status: ComputedRef<StreakStatus>
  isMilestone: ComputedRef<boolean>
  nextMilestone: ComputedRef<StreakMilestone | null>
  milestones: ComputedRef<StreakMilestone[]>
  daysUntilNextMilestone: ComputedRef<number>
  streakMessage: ComputedRef<string>
  recordVisit: () => { streakBroken: boolean; milestoneReached: boolean; freezeUsed: boolean }
  useFreeze: () => boolean
  addFreeze: (count?: number) => void
}

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

function daysBetween(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1 + 'T00:00:00')
  const d2 = new Date(dateStr2 + 'T00:00:00')
  return Math.round(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
}

const DEFAULT_MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365]

const MILESTONE_LABELS: Record<number, string> = {
  3: 'Trois jours — le début d\'une habitude',
  7: 'Une semaine complète !',
  14: 'Deux semaines — l\'habitude prend forme',
  30: 'Un mois entier — impressionnant',
  50: 'Cinquante jours — tu es dans le top 5%',
  100: 'CENT JOURS — légendaire',
  200: 'Deux cents jours — extraordinaire',
  365: 'UN AN — rien ne peut t\'arrêter',
}

export function useStreak(options: {
  storage: StorageAdapter
  storageKey?: string
  gracePeriodHours?: number
  milestones?: number[]
  maxFreezes?: number
}): UseStreakReturn {
  const {
    storage,
    storageKey = 'streak',
    gracePeriodHours = 36,
    milestones: customMilestones = DEFAULT_MILESTONES,
    maxFreezes = 3,
  } = options

  const saved = storage.get<StreakData>(storageKey)
  const currentStreak = ref(saved?.current ?? 0)
  const longestStreak = ref(saved?.longest ?? 0)
  const lastVisitDate = ref<string | null>(saved?.lastVisitDate ?? null)
  const freezesAvailable = ref(saved?.freezesAvailable ?? 1)

  const isActive = computed(() => {
    if (!lastVisitDate.value) return false
    const now = new Date()
    const last = new Date(lastVisitDate.value + 'T00:00:00')
    const hoursDiff = (now.getTime() - last.getTime()) / (1000 * 60 * 60)
    return hoursDiff < gracePeriodHours
  })

  const status = computed<StreakStatus>(() => {
    if (currentStreak.value === 0) return 'new'
    if (!lastVisitDate.value) return 'new'

    const now = new Date()
    const last = new Date(lastVisitDate.value + 'T00:00:00')
    const hoursDiff = (now.getTime() - last.getTime()) / (1000 * 60 * 60)

    if (toDateString(now) === lastVisitDate.value) return 'active'
    if (hoursDiff < 24) return 'active'
    if (hoursDiff < gracePeriodHours) return 'danger'
    if (freezesAvailable.value > 0) return 'frozen'
    return 'broken'
  })

  const milestones = computed<StreakMilestone[]>(() =>
    customMilestones.map((days) => ({
      days,
      reached: currentStreak.value >= days,
      label: MILESTONE_LABELS[days] ?? `${days} jours`,
    })),
  )

  const isMilestone = computed(() =>
    customMilestones.includes(currentStreak.value),
  )

  const nextMilestone = computed<StreakMilestone | null>(() => {
    const next = customMilestones.find((m) => m > currentStreak.value)
    if (!next) return null
    return {
      days: next,
      reached: false,
      label: MILESTONE_LABELS[next] ?? `${next} jours`,
    }
  })

  const daysUntilNextMilestone = computed(() => {
    if (!nextMilestone.value) return 0
    return nextMilestone.value.days - currentStreak.value
  })

  // Near-miss messaging + fresh start + identity-based copy
  const streakMessage = computed(() => {
    const s = currentStreak.value
    const st = status.value

    if (st === 'new') return 'Ton premier jour de streak commence maintenant. Un jour à la fois.'
    if (st === 'broken') {
      if (longestStreak.value > 0) {
        return `Nouveau départ ! Ton record de ${longestStreak.value} jours est gravé dans le marbre. Prêt à le battre ?`
      }
      return 'C\'est reparti ! Chaque expert a commencé au jour 1.'
    }
    if (st === 'danger') {
      return `Ton streak de ${s} jours t'attend. Tu as encore quelques heures.`
    }
    if (st === 'frozen') {
      return `Ton streak freeze peut te sauver ! ${freezesAvailable.value} freeze${freezesAvailable.value > 1 ? 's' : ''} disponible${freezesAvailable.value > 1 ? 's' : ''}.`
    }

    // Active — milestone messages
    if (isMilestone.value) {
      const ml = MILESTONE_LABELS[s]
      return ml ? `🔥 ${s} JOURS ! ${ml}` : `🔥 ${s} jours de streak !`
    }

    // Near-miss to milestone (goal gradient)
    if (nextMilestone.value && daysUntilNextMilestone.value <= 3) {
      return `${s} jours — plus que ${daysUntilNextMilestone.value} pour le milestone de ${nextMilestone.value.days} !`
    }

    // Identity-based messages by tier
    if (s >= 100) return `${s} jours. Tu es une légende de la régularité.`
    if (s >= 30) return `${s} jours — tu es quelqu'un de profondément régulier.`
    if (s >= 7) return `${s} jours ! L'habitude est bien installée.`
    return `${s} jours de streak. Continue comme ça !`
  })

  function persist() {
    storage.set<StreakData>(storageKey, {
      current: currentStreak.value,
      longest: longestStreak.value,
      lastVisitDate: lastVisitDate.value,
      freezesAvailable: freezesAvailable.value,
    })
  }

  function recordVisit(): { streakBroken: boolean; milestoneReached: boolean; freezeUsed: boolean } {
    const today = toDateString(new Date())
    let streakBroken = false
    let freezeUsed = false

    if (lastVisitDate.value === today) {
      return { streakBroken: false, milestoneReached: false, freezeUsed: false }
    }

    if (!lastVisitDate.value) {
      currentStreak.value = 1
    } else {
      const gap = daysBetween(lastVisitDate.value, today)
      if (gap === 1) {
        currentStreak.value++
      } else {
        const last = new Date(lastVisitDate.value + 'T00:00:00')
        const now = new Date()
        const hoursDiff = (now.getTime() - last.getTime()) / (1000 * 60 * 60)

        if (hoursDiff <= gracePeriodHours && gap <= 2) {
          currentStreak.value++
        } else if (gap === 2 && freezesAvailable.value > 0) {
          // Auto-use freeze for 1 missed day
          freezesAvailable.value--
          currentStreak.value++
          freezeUsed = true
        } else {
          // Streak broken
          streakBroken = currentStreak.value > 0
          currentStreak.value = 1
        }
      }
    }

    if (currentStreak.value > longestStreak.value) {
      longestStreak.value = currentStreak.value
    }

    const milestoneReached = isMilestone.value

    lastVisitDate.value = today
    persist()

    return { streakBroken, milestoneReached, freezeUsed }
  }

  function useFreeze(): boolean {
    if (freezesAvailable.value <= 0) return false
    freezesAvailable.value--
    persist()
    return true
  }

  function addFreeze(count: number = 1) {
    freezesAvailable.value = Math.min(freezesAvailable.value + count, maxFreezes)
    persist()
  }

  return {
    currentStreak,
    longestStreak,
    lastVisitDate,
    freezesAvailable,
    isActive,
    status,
    isMilestone,
    nextMilestone,
    milestones,
    daysUntilNextMilestone,
    streakMessage,
    recordVisit,
    useFreeze,
    addFreeze,
  }
}
