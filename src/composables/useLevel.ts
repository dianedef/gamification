import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { StorageAdapter } from '../types'

export interface LevelInfo {
  level: number
  name: string
  xpInLevel: number
  xpForNextLevel: number
  progressPercent: number
  isMaxLevel: boolean
}

export interface XPEvent {
  amount: number
  source: string
  leveledUp: boolean
  newLevel: number
  previousLevel: number
}

export interface UseLevelReturn {
  xp: Ref<number>
  levelInfo: ComputedRef<LevelInfo>
  level: ComputedRef<number>
  isNearLevelUp: ComputedRef<boolean>
  levelMessage: ComputedRef<string>
  addXP: (amount: number, source?: string) => XPEvent
}

// Exponential curve: each level requires 50% more XP
function defaultXPCurve(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1))
}

const DEFAULT_LEVEL_NAMES = [
  'Néophyte',        // 1
  'Apprenti',        // 2
  'Initié',          // 3
  'Artisan',         // 4
  'Adepte',          // 5
  'Expert',          // 6
  'Maître',          // 7
  'Grand Maître',    // 8
  'Sage',            // 9
  'Légende',         // 10
]

export function useLevel(options: {
  storage: StorageAdapter
  storageKey?: string
  maxLevel?: number
  levelNames?: string[]
  xpPerLevel?: (level: number) => number
  nearLevelUpThreshold?: number
}): UseLevelReturn {
  const {
    storage,
    storageKey = 'xp',
    maxLevel = 10,
    levelNames = DEFAULT_LEVEL_NAMES,
    xpPerLevel = defaultXPCurve,
    nearLevelUpThreshold = 0.8,
  } = options

  const xp = ref(storage.get<number>(storageKey) ?? 0)

  function persist() {
    storage.set(storageKey, xp.value)
  }

  const levelInfo = computed<LevelInfo>(() => {
    let level = 1
    let remaining = xp.value

    while (level < maxLevel) {
      const needed = xpPerLevel(level)
      if (remaining < needed) {
        return {
          level,
          name: levelNames[level - 1] ?? `Niveau ${level}`,
          xpInLevel: remaining,
          xpForNextLevel: needed,
          progressPercent: Math.round((remaining / needed) * 100),
          isMaxLevel: false,
        }
      }
      remaining -= needed
      level++
    }

    return {
      level: maxLevel,
      name: levelNames[maxLevel - 1] ?? `Niveau ${maxLevel}`,
      xpInLevel: remaining,
      xpForNextLevel: 0,
      progressPercent: 100,
      isMaxLevel: true,
    }
  })

  const level = computed(() => levelInfo.value.level)

  // Goal gradient: near level-up detection
  const isNearLevelUp = computed(() =>
    !levelInfo.value.isMaxLevel &&
    levelInfo.value.progressPercent >= nearLevelUpThreshold * 100,
  )

  const levelMessage = computed(() => {
    const info = levelInfo.value
    if (info.isMaxLevel) {
      return `${info.name} — niveau maximum atteint. Tu es au sommet.`
    }
    if (isNearLevelUp.value) {
      const remaining = info.xpForNextLevel - info.xpInLevel
      return `Plus que ${remaining} XP pour devenir ${levelNames[info.level] ?? `Niveau ${info.level + 1}`} !`
    }
    return `${info.name} — ${info.progressPercent}% vers le prochain niveau`
  })

  function addXP(amount: number, source: string = 'action'): XPEvent {
    const previousLevel = levelInfo.value.level
    xp.value += amount
    persist()
    const newLevel = levelInfo.value.level
    return {
      amount,
      source,
      leveledUp: newLevel > previousLevel,
      newLevel,
      previousLevel,
    }
  }

  return {
    xp,
    levelInfo,
    level,
    isNearLevelUp,
    levelMessage,
    addXP,
  }
}
