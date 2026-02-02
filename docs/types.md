# Types

TypeScript type definitions exported by the library.

## Core Types

### Badge

Represents an achievement badge with a condition function.

```typescript
interface Badge {
  id: string              // Unique identifier
  name: string            // Display name
  description: string     // Description shown when earned
  icon: string            // Emoji or icon
  condition: BadgeCondition  // Function that returns true when badge is earned
  category?: string       // Optional grouping category
  secret?: boolean        // If true, hidden until earned
}
```

### BadgeCondition

Function type for badge unlock conditions.

```typescript
type BadgeCondition = (state: GamificationState) => boolean
```

### GamificationState

The state object passed to badge conditions.

```typescript
interface GamificationState {
  articlesRead: string[]                    // All read article slugs
  readByCategory: Record<string, string[]>  // Slugs grouped by category
  currentStreak: number                     // Current streak count
  longestStreak: number                     // All-time longest streak
  totalRead: number                         // Total articles read
}
```

### StreakData

Persisted streak information.

```typescript
interface StreakData {
  current: number            // Current streak count
  longest: number            // Longest streak achieved
  lastVisitDate: string | null  // ISO date string (YYYY-MM-DD)
}
```

### ProgressEntry

Progress calculation result for a category or overall.

```typescript
interface ProgressEntry {
  read: number    // Number of articles read
  total: number   // Total articles in scope
  percent: number // Completion percentage (0-100)
}
```

---

## Storage Types

### StorageAdapter

Interface for storage backends. Default implementation uses localStorage.

```typescript
interface StorageAdapter {
  get<T>(key: string): T | null       // Retrieve value
  set<T>(key: string, value: T): void // Store value
  remove(key: string): void           // Delete key
  clear(): void                       // Clear all keys with prefix
}
```

---

## Options Types

### ReadTrackerOptions

```typescript
interface ReadTrackerOptions {
  storage: StorageAdapter
  storageKey?: string  // Default: 'reads'
}
```

### StreakOptions

```typescript
interface StreakOptions {
  storage: StorageAdapter
  storageKey?: string        // Default: 'streak'
  gracePeriodHours?: number  // Default: 36
}
```

### BadgesOptions

```typescript
interface BadgesOptions {
  badges: Badge[]
  storage: StorageAdapter
  storageKey?: string  // Default: 'badges_earned'
}
```

### ProgressOptions

```typescript
interface ProgressOptions {
  categories: Record<string, string[]>  // Category → article slugs
  articlesRead: string[]                 // Currently read articles
}
```

### GamificationOptions

Options for the main `useGamification` composable.

```typescript
interface GamificationOptions {
  badges: Badge[]                           // Badge definitions
  categories: Record<string, string[]>      // Category → article slugs
  storagePrefix?: string                    // Default: 'gamification'
  gracePeriodHours?: number                 // Default: 36
  onBadgeEarned?: (badge: Badge) => void    // Callback for new badges
}
```

---

## Reaction Types

### ReactionType

Available reaction options.

```typescript
type ReactionType = 'upvote' | 'funny' | 'love' | 'surprised' | 'angry' | 'sad'
```

### ReactionCounts

Count for each reaction type.

```typescript
interface ReactionCounts {
  upvote: number
  funny: number
  love: number
  surprised: number
  angry: number
  sad: number
}
```

### ReactionConfig

Configuration for a single reaction option.

```typescript
interface ReactionConfig {
  type: ReactionType
  emoji: string
  label: string
}
```

---

## Module Feedback Types

### FeedbackDimension

The two dimensions of module feedback.

```typescript
type FeedbackDimension = 'difficulty' | 'engagement'
```

### DifficultyOption

Options for the difficulty dimension.

```typescript
type DifficultyOption = 'easy' | 'justRight' | 'hard'
```

### EngagementOption

Options for the engagement dimension.

```typescript
type EngagementOption = 'boring' | 'interesting' | 'fascinating'
```

### ModuleFeedbackCounts

Counts for all feedback options.

```typescript
interface ModuleFeedbackCounts {
  difficulty: {
    easy: number
    justRight: number
    hard: number
  }
  engagement: {
    boring: number
    interesting: number
    fascinating: number
  }
}
```

### ModuleFeedbackSelections

User's current selections (or null if not selected).

```typescript
interface ModuleFeedbackSelections {
  difficulty: DifficultyOption | null
  engagement: EngagementOption | null
}
```

### FeedbackOptionConfig

Configuration for a feedback option button.

```typescript
interface FeedbackOptionConfig {
  key: DifficultyOption | EngagementOption
  emoji: string
  label: string
}
```

---

## Constants

### REACTIONS

Pre-configured reaction options with emojis.

```typescript
const REACTIONS: ReactionConfig[] = [
  { type: 'upvote', emoji: '👍', label: 'Upvote' },
  { type: 'funny', emoji: '😂', label: 'Funny' },
  { type: 'love', emoji: '❤️', label: 'Love' },
  { type: 'surprised', emoji: '😮', label: 'Surprised' },
  { type: 'angry', emoji: '😠', label: 'Angry' },
  { type: 'sad', emoji: '😢', label: 'Sad' },
]
```

### DIFFICULTY_OPTIONS

Pre-configured difficulty feedback options.

```typescript
const DIFFICULTY_OPTIONS: DifficultyOptionConfig[] = [
  { key: 'easy', emoji: '😌', label: 'Easy' },
  { key: 'justRight', emoji: '👌', label: 'Just Right' },
  { key: 'hard', emoji: '🤯', label: 'Hard' },
]
```

### ENGAGEMENT_OPTIONS

Pre-configured engagement feedback options.

```typescript
const ENGAGEMENT_OPTIONS: EngagementOptionConfig[] = [
  { key: 'boring', emoji: '😴', label: 'Boring' },
  { key: 'interesting', emoji: '🤔', label: 'Interesting' },
  { key: 'fascinating', emoji: '🤩', label: 'Fascinating' },
]
```
