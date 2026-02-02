# Composables

All composables are Vue 3 composition functions that return reactive state and methods.

## useGamification

The main composable that orchestrates all gamification features. Use this for a complete solution, or use individual composables for more control.

### Options

```typescript
interface GamificationOptions {
  badges: Badge[]                              // Badge definitions
  categories: Record<string, string[]>         // Category → article slugs mapping
  storagePrefix?: string                       // Storage key prefix (default: 'gamification')
  gracePeriodHours?: number                    // Streak grace period (default: 36)
  onBadgeEarned?: (badge: Badge) => void       // Callback when badge is earned
}
```

### Returns

```typescript
interface UseGamificationReturn {
  reader: UseReadTrackerReturn    // Read tracking state
  streak: UseStreakReturn         // Streak state
  badges: UseBadgesReturn         // Badge state
  progress: UseProgressReturn     // Progress state
  markAsRead: (slug: string, category?: string) => void
}
```

### Usage

```typescript
const { reader, streak, badges, progress, markAsRead } = useGamification({
  badges: myBadges,
  categories: myCategories,
  onBadgeEarned: (badge) => showToast(badge),
})

// Mark an article as read
markAsRead('getting-started', 'basics')
```

### Storage Keys

- `{prefix}_reads` - Read entries
- `{prefix}_streak` - Streak data
- `{prefix}_badges_earned` - Earned badge IDs

---

## useReadTracker

Tracks which articles/modules the user has read.

### Options

```typescript
interface Options {
  storage: StorageAdapter         // Storage adapter from createStorage()
  storageKey?: string             // Key name (default: 'reads')
}
```

### Returns

```typescript
interface UseReadTrackerReturn {
  articlesRead: Ref<string[]>                           // List of read slugs
  totalRead: ComputedRef<number>                        // Total count
  readByCategory: ComputedRef<Record<string, string[]>> // Slugs grouped by category
  markAsRead: (slug: string, category?: string) => void // Mark as read
  isRead: (slug: string) => boolean                     // Check if read
}
```

### Usage

```typescript
import { createStorage, useReadTracker } from '@diane-winflowz/gamification'

const storage = createStorage('my-app')
const { articlesRead, markAsRead, isRead } = useReadTracker({ storage })

if (!isRead('intro')) {
  markAsRead('intro', 'basics')
}
```

---

## useStreak

Tracks daily engagement streaks with a configurable grace period.

### Options

```typescript
interface Options {
  storage: StorageAdapter         // Storage adapter
  storageKey?: string             // Key name (default: 'streak')
  gracePeriodHours?: number       // Hours before streak breaks (default: 36)
}
```

### Returns

```typescript
interface UseStreakReturn {
  currentStreak: Ref<number>           // Current streak count
  longestStreak: Ref<number>           // All-time longest streak
  lastVisitDate: Ref<string | null>    // ISO date of last visit
  isActive: ComputedRef<boolean>       // True if within grace period
  recordVisit: () => void              // Record today's visit
}
```

### Usage

```typescript
const { currentStreak, longestStreak, isActive, recordVisit } = useStreak({
  storage,
  gracePeriodHours: 48, // More lenient grace period
})

// Call on page visit
recordVisit()
```

---

## useBadges

Manages badge definitions, tracks earned badges, and checks conditions.

### Options

```typescript
interface Options {
  badges: Badge[]                 // Badge definitions with conditions
  storage: StorageAdapter         // Storage adapter
  storageKey?: string             // Key name (default: 'badges_earned')
}
```

### Returns

```typescript
interface UseBadgesReturn {
  earned: Ref<Badge[]>                  // Badges the user has earned
  unearned: Ref<Badge[]>                // Unearned non-secret badges
  newlyEarned: Ref<Badge[]>             // Badges earned in last checkAll()
  progress: ComputedRef<number>         // Percentage of non-secret badges earned
  checkAll: (state: GamificationState) => void // Check all badge conditions
}
```

### Usage

```typescript
const { earned, unearned, newlyEarned, checkAll } = useBadges({
  badges: myBadges,
  storage,
})

// Check badges after state change
checkAll({
  articlesRead: ['intro', 'setup'],
  readByCategory: { basics: ['intro', 'setup'] },
  currentStreak: 3,
  longestStreak: 5,
  totalRead: 2,
})

// React to newly earned badges
watch(newlyEarned, (badges) => {
  badges.forEach((b) => console.log(`Earned: ${b.name}`))
})
```

---

## useProgress

Computes read completion percentages by category and overall.

### Options

```typescript
interface Options {
  categories: Record<string, string[]>   // Category → article slugs
  getArticlesRead: () => string[]        // Getter for read slugs
}
```

### Returns

```typescript
interface UseProgressReturn {
  byCategory: ComputedRef<Record<string, ProgressEntry>>
  overall: ComputedRef<ProgressEntry>
}

interface ProgressEntry {
  read: number      // Count of read articles
  total: number     // Total articles in category
  percent: number   // Completion percentage (0-100)
}
```

### Usage

```typescript
const { byCategory, overall } = useProgress({
  categories: {
    basics: ['intro', 'setup'],
    advanced: ['performance', 'testing'],
  },
  getArticlesRead: () => reader.articlesRead.value,
})

// overall.value.percent → 50 (if 2 of 4 read)
// byCategory.value.basics.percent → 100 (if both read)
```

---

## useReactions

Manages emoji reactions with single-vote-per-user semantics.

### Options

```typescript
interface UseReactionsOptions {
  itemId: string                              // Unique item identifier
  storagePrefix?: string                      // Storage prefix (default: 'gamification')
  initialCounts?: Partial<ReactionCounts>     // Seed counts from server
}
```

### Returns

```typescript
interface UseReactionsReturn {
  counts: Ref<ReactionCounts>                 // Counts per reaction type
  userReaction: Ref<ReactionType | null>      // User's current reaction
  hasVoted: ComputedRef<boolean>              // True if user has reacted
  totalResponses: ComputedRef<number>         // Sum of all reactions
  react: (type: ReactionType) => void         // Set/toggle reaction
  clearReaction: () => void                   // Remove user's reaction
}
```

### Usage

```typescript
import { useReactions, REACTIONS } from '@diane-winflowz/gamification'

const { counts, userReaction, react } = useReactions({
  itemId: 'article-123',
  initialCounts: { upvote: 5, love: 3 }, // From API
})

// Toggle reaction
react('love') // Adds love
react('love') // Removes love (toggle)
react('funny') // Switches to funny
```

### Storage Keys

- `{prefix}_reactions:{itemId}:user` - User's selected reaction
- `{prefix}_reactions:{itemId}:counts` - Local count adjustments

---

## useModuleFeedback

Collects two-dimensional feedback for course modules: Difficulty and Engagement.

### Options

```typescript
interface UseModuleFeedbackOptions {
  moduleId: string                                  // Unique module identifier
  storagePrefix?: string                            // Storage prefix (default: 'gamification')
  initialCounts?: Partial<ModuleFeedbackCounts>     // Seed counts from server
}
```

### Returns

```typescript
interface UseModuleFeedbackReturn {
  counts: Ref<ModuleFeedbackCounts>                 // Counts per option
  userSelections: Ref<ModuleFeedbackSelections>     // User's current selections
  hasVoted: ComputedRef<boolean>                    // True if voted on either dimension
  totalResponses: ComputedRef<number>               // Max of dimension totals
  selectDifficulty: (option: DifficultyOption) => void
  selectEngagement: (option: EngagementOption) => void
  clearDifficulty: () => void
  clearEngagement: () => void
  clearAll: () => void
}
```

### Types

```typescript
type DifficultyOption = 'easy' | 'justRight' | 'hard'
type EngagementOption = 'boring' | 'interesting' | 'fascinating'

interface ModuleFeedbackCounts {
  difficulty: { easy: number; justRight: number; hard: number }
  engagement: { boring: number; interesting: number; fascinating: number }
}

interface ModuleFeedbackSelections {
  difficulty: DifficultyOption | null
  engagement: EngagementOption | null
}
```

### Usage

```typescript
import { useModuleFeedback, DIFFICULTY_OPTIONS, ENGAGEMENT_OPTIONS } from '@diane-winflowz/gamification'

const {
  counts,
  userSelections,
  selectDifficulty,
  selectEngagement,
} = useModuleFeedback({
  moduleId: 'intro-to-vue',
  initialCounts: {
    difficulty: { easy: 5, justRight: 12, hard: 3 },
    engagement: { boring: 1, interesting: 8, fascinating: 6 },
  },
})

// User selects difficulty
selectDifficulty('justRight')

// User changes mind
selectDifficulty('hard') // Switches from justRight to hard

// Toggle off
selectDifficulty('hard') // Removes selection
```

### Storage Keys

- `{prefix}_feedback:{moduleId}:user` - User's selections
- `{prefix}_feedback:{moduleId}:counts` - Local count adjustments
