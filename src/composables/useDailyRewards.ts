import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { StorageAdapter } from '../types'

export interface DailyReward {
  day: number
  xp: number
  label: string
  bonus?: boolean
  icon?: string
}

export interface DailyRewardState {
  currentDay: number
  lastClaimDate: string | null
  totalClaimed: number
}

export interface UseDailyRewardsReturn {
  currentDay: Ref<number>
  lastClaimDate: Ref<string | null>
  totalClaimed: Ref<number>
  rewards: ComputedRef<(DailyReward & { claimed: boolean; available: boolean })[]>
  canClaim: ComputedRef<boolean>
  todayReward: ComputedRef<DailyReward | null>
  rewardMessage: ComputedRef<string>
  claim: () => { xp: number; day: number; cycleComplete: boolean }
}

const DEFAULT_REWARDS: DailyReward[] = [
  { day: 1, xp: 10, label: 'Jour 1', icon: '🌱' },
  { day: 2, xp: 15, label: 'Jour 2', icon: '🌿' },
  { day: 3, xp: 20, label: 'Jour 3', icon: '☘️' },
  { day: 4, xp: 30, label: 'Jour 4', icon: '🌳' },
  { day: 5, xp: 40, label: 'Jour 5', icon: '🌲' },
  { day: 6, xp: 50, label: 'Jour 6', icon: '🏔️' },
  { day: 7, xp: 100, label: 'Jour 7 — BONUS !', bonus: true, icon: '🌟' },
]

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function useDailyRewards(options: {
  storage: StorageAdapter
  storageKey?: string
  rewards?: DailyReward[]
}): UseDailyRewardsReturn {
  const {
    storage,
    storageKey = 'daily_rewards',
    rewards: customRewards = DEFAULT_REWARDS,
  } = options

  const saved = storage.get<DailyRewardState>(storageKey)
  const currentDay = ref(saved?.currentDay ?? 0)
  const lastClaimDate = ref<string | null>(saved?.lastClaimDate ?? null)
  const totalClaimed = ref(saved?.totalClaimed ?? 0)

  function persist() {
    storage.set<DailyRewardState>(storageKey, {
      currentDay: currentDay.value,
      lastClaimDate: lastClaimDate.value,
      totalClaimed: totalClaimed.value,
    })
  }

  const canClaim = computed(() => {
    if (!lastClaimDate.value) return true
    return lastClaimDate.value !== toDateString(new Date())
  })

  const todayReward = computed<DailyReward | null>(() => {
    if (!canClaim.value) return null
    const nextDay = (currentDay.value % customRewards.length) + 1
    return customRewards.find((r) => r.day === nextDay) ?? null
  })

  const rewards = computed(() =>
    customRewards.map((r) => ({
      ...r,
      claimed: r.day <= currentDay.value % customRewards.length || (currentDay.value > 0 && r.day <= (currentDay.value % customRewards.length || customRewards.length)),
      available: canClaim.value && r.day === (currentDay.value % customRewards.length) + 1,
    })),
  )

  const rewardMessage = computed(() => {
    if (!canClaim.value) {
      return 'Récompense du jour déjà récupérée ! Reviens demain.'
    }
    const reward = todayReward.value
    if (!reward) return 'Récompense disponible !'
    if (reward.bonus) {
      return `${reward.icon ?? '🌟'} JOUR BONUS ! ${reward.xp} XP t'attendent !`
    }
    return `${reward.icon ?? '🎁'} ${reward.label} : ${reward.xp} XP disponibles`
  })

  function claim(): { xp: number; day: number; cycleComplete: boolean } {
    if (!canClaim.value) return { xp: 0, day: currentDay.value, cycleComplete: false }

    currentDay.value++
    const dayInCycle = ((currentDay.value - 1) % customRewards.length) + 1
    const reward = customRewards.find((r) => r.day === dayInCycle)
    const xp = reward?.xp ?? 10
    const cycleComplete = dayInCycle === customRewards.length

    lastClaimDate.value = toDateString(new Date())
    totalClaimed.value += xp
    persist()

    return { xp, day: currentDay.value, cycleComplete }
  }

  return {
    currentDay,
    lastClaimDate,
    totalClaimed,
    rewards,
    canClaim,
    todayReward,
    rewardMessage,
    claim,
  }
}
