import type { DifficultyOption, EngagementOption, FeedbackOptionConfig } from '../types'

export interface DifficultyOptionConfig extends FeedbackOptionConfig {
  key: DifficultyOption
}

export interface EngagementOptionConfig extends FeedbackOptionConfig {
  key: EngagementOption
}

export const DIFFICULTY_OPTIONS: DifficultyOptionConfig[] = [
  { key: 'easy', emoji: '😌', label: 'Easy' },
  { key: 'justRight', emoji: '👌', label: 'Just Right' },
  { key: 'hard', emoji: '🤯', label: 'Hard' },
]

export const ENGAGEMENT_OPTIONS: EngagementOptionConfig[] = [
  { key: 'boring', emoji: '😴', label: 'Boring' },
  { key: 'interesting', emoji: '🤔', label: 'Interesting' },
  { key: 'fascinating', emoji: '🤩', label: 'Fascinating' },
]
