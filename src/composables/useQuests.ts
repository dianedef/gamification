import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { StorageAdapter } from '../types'

export type QuestType = 'daily' | 'weekly' | 'main' | 'side' | 'secret'
export type QuestStatus = 'locked' | 'available' | 'in_progress' | 'completed'

export interface QuestStep {
  id: string
  description: string
  completed: boolean
}

export interface Quest {
  id: string
  name: string
  description: string
  type: QuestType
  steps: QuestStep[]
  xpReward: number
  badgeReward?: string
  icon?: string
  expiresAt?: string // ISO date — for daily/weekly
  prerequisiteQuestId?: string
}

export interface QuestState {
  completedQuestIds: string[]
  stepProgress: Record<string, string[]> // questId → completed stepIds
  lastDailyReset: string | null
  lastWeeklyReset: string | null
}

export interface UseQuestsReturn {
  quests: Ref<Quest[]>
  completedIds: Ref<string[]>
  activeQuests: ComputedRef<Quest[]>
  completedQuests: ComputedRef<Quest[]>
  availableQuests: ComputedRef<Quest[]>
  dailyQuests: ComputedRef<Quest[]>
  weeklyQuests: ComputedRef<Quest[]>
  questProgress: (questId: string) => { current: number; total: number; percent: number }
  getQuestStatus: (quest: Quest) => QuestStatus
  completeStep: (questId: string, stepId: string) => { questCompleted: boolean; xpEarned: number; badgeEarned?: string }
  resetDailyQuests: () => void
  resetWeeklyQuests: () => void
}

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

function getWeekNumber(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${d.getUTCFullYear()}-W${weekNo}`
}

export function useQuests(options: {
  quests: Quest[]
  storage: StorageAdapter
  storageKey?: string
}): UseQuestsReturn {
  const { quests: questDefinitions, storage, storageKey = 'quests' } = options

  const saved = storage.get<QuestState>(storageKey)
  const quests = ref<Quest[]>(questDefinitions)
  const completedIds = ref<string[]>(saved?.completedQuestIds ?? [])
  const stepProgress = ref<Record<string, string[]>>(saved?.stepProgress ?? {})
  const lastDailyReset = ref(saved?.lastDailyReset ?? null)
  const lastWeeklyReset = ref(saved?.lastWeeklyReset ?? null)

  // Auto-reset daily/weekly on load
  const today = toDateString(new Date())
  const thisWeek = getWeekNumber(new Date())
  if (lastDailyReset.value !== today) {
    resetDailyQuests()
  }
  if (lastWeeklyReset.value !== thisWeek) {
    resetWeeklyQuests()
  }

  function persist() {
    storage.set<QuestState>(storageKey, {
      completedQuestIds: completedIds.value,
      stepProgress: stepProgress.value,
      lastDailyReset: lastDailyReset.value,
      lastWeeklyReset: lastWeeklyReset.value,
    })
  }

  function getQuestStatus(quest: Quest): QuestStatus {
    if (completedIds.value.includes(quest.id)) return 'completed'
    if (quest.prerequisiteQuestId && !completedIds.value.includes(quest.prerequisiteQuestId)) return 'locked'
    const progress = stepProgress.value[quest.id]
    if (progress && progress.length > 0) return 'in_progress'
    return 'available'
  }

  const activeQuests = computed(() =>
    quests.value.filter((q) => getQuestStatus(q) === 'in_progress'),
  )

  const completedQuests = computed(() =>
    quests.value.filter((q) => completedIds.value.includes(q.id)),
  )

  const availableQuests = computed(() =>
    quests.value.filter((q) => getQuestStatus(q) === 'available'),
  )

  const dailyQuests = computed(() =>
    quests.value.filter((q) => q.type === 'daily' && !completedIds.value.includes(q.id)),
  )

  const weeklyQuests = computed(() =>
    quests.value.filter((q) => q.type === 'weekly' && !completedIds.value.includes(q.id)),
  )

  function questProgress(questId: string) {
    const quest = quests.value.find((q) => q.id === questId)
    if (!quest) return { current: 0, total: 0, percent: 0 }
    const completed = stepProgress.value[questId]?.length ?? 0
    const total = quest.steps.length
    return {
      current: completed,
      total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  }

  function completeStep(questId: string, stepId: string) {
    if (!stepProgress.value[questId]) {
      stepProgress.value[questId] = []
    }
    if (stepProgress.value[questId].includes(stepId)) {
      return { questCompleted: false, xpEarned: 0 }
    }

    stepProgress.value[questId].push(stepId)

    const quest = quests.value.find((q) => q.id === questId)
    if (!quest) {
      persist()
      return { questCompleted: false, xpEarned: 0 }
    }

    // Check if all steps are completed
    const allDone = quest.steps.every((s) =>
      stepProgress.value[questId].includes(s.id),
    )

    if (allDone) {
      completedIds.value.push(questId)
      persist()
      return {
        questCompleted: true,
        xpEarned: quest.xpReward,
        badgeEarned: quest.badgeReward,
      }
    }

    persist()
    return { questCompleted: false, xpEarned: 0 }
  }

  function resetDailyQuests() {
    const dailyIds = quests.value.filter((q) => q.type === 'daily').map((q) => q.id)
    completedIds.value = completedIds.value.filter((id) => !dailyIds.includes(id))
    for (const id of dailyIds) {
      delete stepProgress.value[id]
    }
    lastDailyReset.value = toDateString(new Date())
    persist()
  }

  function resetWeeklyQuests() {
    const weeklyIds = quests.value.filter((q) => q.type === 'weekly').map((q) => q.id)
    completedIds.value = completedIds.value.filter((id) => !weeklyIds.includes(id))
    for (const id of weeklyIds) {
      delete stepProgress.value[id]
    }
    lastWeeklyReset.value = getWeekNumber(new Date())
    persist()
  }

  return {
    quests,
    completedIds,
    activeQuests,
    completedQuests,
    availableQuests,
    dailyQuests,
    weeklyQuests,
    questProgress,
    getQuestStatus,
    completeStep,
    resetDailyQuests,
    resetWeeklyQuests,
  }
}
