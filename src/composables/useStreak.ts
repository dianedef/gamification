import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { StorageAdapter, StreakData } from '../types'

export interface UseStreakReturn {
  currentStreak: Ref<number>
  longestStreak: Ref<number>
  lastVisitDate: Ref<string | null>
  isActive: ComputedRef<boolean>
  recordVisit: () => void
}

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

function daysBetween(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1 + 'T00:00:00')
  const d2 = new Date(dateStr2 + 'T00:00:00')
  return Math.round(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
}

export function useStreak(options: {
  storage: StorageAdapter
  storageKey?: string
  gracePeriodHours?: number
}): UseStreakReturn {
  const { storage, storageKey = 'streak', gracePeriodHours = 36 } = options

  const saved = storage.get<StreakData>(storageKey)
  const currentStreak = ref(saved?.current ?? 0)
  const longestStreak = ref(saved?.longest ?? 0)
  const lastVisitDate = ref<string | null>(saved?.lastVisitDate ?? null)

  const isActive = computed(() => {
    if (!lastVisitDate.value) return false
    const now = new Date()
    const last = new Date(lastVisitDate.value + 'T00:00:00')
    const hoursDiff = (now.getTime() - last.getTime()) / (1000 * 60 * 60)
    return hoursDiff < gracePeriodHours
  })

  function persist() {
    storage.set<StreakData>(storageKey, {
      current: currentStreak.value,
      longest: longestStreak.value,
      lastVisitDate: lastVisitDate.value,
    })
  }

  function recordVisit(): void {
    const today = toDateString(new Date())

    if (lastVisitDate.value === today) {
      return
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
        } else {
          currentStreak.value = 1
        }
      }
    }

    if (currentStreak.value > longestStreak.value) {
      longestStreak.value = currentStreak.value
    }

    lastVisitDate.value = today
    persist()
  }

  return {
    currentStreak,
    longestStreak,
    lastVisitDate,
    isActive,
    recordVisit,
  }
}
