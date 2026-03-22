// Types
export type {
  Badge,
  BadgeCondition,
  BadgeTier,
  GamificationState,
  StreakData,
  ProgressEntry,
  StorageAdapter,
  ReadTrackerOptions,
  StreakOptions,
  BadgesOptions,
  ProgressOptions,
  GamificationOptions,
  ReactionType,
  ReactionCounts,
  ReactionConfig,
  FeedbackDimension,
  DifficultyOption,
  EngagementOption,
  ModuleFeedbackCounts,
  ModuleFeedbackSelections,
  FeedbackOptionConfig,
} from './types'

// Utils
export { createStorage } from './utils/storage'
export { fireConfetti, fireBadgeConfetti } from './utils/confetti'
export { REACTIONS } from './utils/reactions'
export { DIFFICULTY_OPTIONS, ENGAGEMENT_OPTIONS } from './utils/feedback'

// Composables
export { useReadTracker } from './composables/useReadTracker'
export type { UseReadTrackerReturn } from './composables/useReadTracker'
export { useStreak } from './composables/useStreak'
export type { UseStreakReturn, StreakStatus, StreakMilestone } from './composables/useStreak'
export { useBadges } from './composables/useBadges'
export type { UseBadgesReturn, BadgeProgress } from './composables/useBadges'
export { useProgress } from './composables/useProgress'
export type { UseProgressReturn } from './composables/useProgress'
export { useGamification } from './composables/useGamification'
export type { UseGamificationReturn } from './composables/useGamification'
export { useReactions } from './composables/useReactions'
export type { UseReactionsReturn, UseReactionsOptions } from './composables/useReactions'
export { useModuleFeedback } from './composables/useModuleFeedback'
export type { UseModuleFeedbackReturn, UseModuleFeedbackOptions } from './composables/useModuleFeedback'
export { useLevel } from './composables/useLevel'
export type { UseLevelReturn, LevelInfo, XPEvent } from './composables/useLevel'
export { useQuests } from './composables/useQuests'
export type { UseQuestsReturn, Quest, QuestStep, QuestType, QuestStatus } from './composables/useQuests'
export { useDailyRewards } from './composables/useDailyRewards'
export type { UseDailyRewardsReturn, DailyReward } from './composables/useDailyRewards'

// Components
export { default as BadgeCard } from './components/BadgeCard.vue'
export { default as BadgeGrid } from './components/BadgeGrid.vue'
export { default as StreakCounter } from './components/StreakCounter.vue'
export { default as ProgressBar } from './components/ProgressBar.vue'
export { default as AchievementToast } from './components/AchievementToast.vue'
export { default as GamificationDashboard } from './components/GamificationDashboard.vue'
export { default as ReactionBar } from './components/ReactionBar.vue'
export { default as ModuleFeedback } from './components/ModuleFeedback.vue'
