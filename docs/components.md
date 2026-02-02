# Components

All components are **headless/renderless** — they provide structure, logic, and accessibility attributes, but leave visual styling entirely to you via slots.

## BadgeCard

Displays a single badge with earned/locked states.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `badge` | `Badge` | Yes | The badge to display |
| `earned` | `boolean` | Yes | Whether the user has earned this badge |
| `class` | `string` | No | CSS class for the root element |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `Badge` | Emitted when the badge is clicked |

### Slots

#### Default Slot
Full customization of the entire badge card.

```typescript
{
  badge: Badge
  earned: boolean
}
```

#### `icon`
Customize the badge icon.

```typescript
{
  badge: Badge
  earned: boolean
}
```

#### `locked`
Content shown when badge is not earned (replaces description).

```typescript
{
  badge: Badge
}
```

### Usage

```vue
<BadgeCard :badge="badge" :earned="true" @click="showDetails">
  <template #icon="{ badge, earned }">
    <span :class="{ 'grayscale': !earned }">{{ badge.icon }}</span>
  </template>
  <template #locked>
    <span>Keep going to unlock!</span>
  </template>
</BadgeCard>
```

### Accessibility

- Role: `listitem`
- `aria-label` indicates earned/locked state

---

## BadgeGrid

Displays a collection of badges in a grid layout.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `badges` | `Badge[]` | Yes | Array of badges to display |
| `earnedIds` | `string[]` | Yes | IDs of earned badges |
| `columns` | `number` | No | Number of grid columns (for styling reference) |
| `class` | `string` | No | CSS class for the root element |

### Slots

#### `empty`
Content when no badges exist.

#### `badge`
Customize each badge item.

```typescript
{
  badge: Badge
  earned: boolean
}
```

### Usage

```vue
<BadgeGrid :badges="allBadges" :earned-ids="earnedIds">
  <template #badge="{ badge, earned }">
    <BadgeCard :badge="badge" :earned="earned" />
  </template>
  <template #empty>
    <p>No badges available yet.</p>
  </template>
</BadgeGrid>
```

### Accessibility

- Role: `list`
- `aria-label` shows earned count

---

## StreakCounter

Displays the current streak with active/inactive state.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `current` | `number` | Yes | Current streak count |
| `longest` | `number` | Yes | Longest streak achieved |
| `isActive` | `boolean` | Yes | Whether streak is currently active |
| `class` | `string` | No | CSS class for the root element |

### Slots

#### Default Slot
Full customization.

```typescript
{
  current: number
  longest: number
  isActive: boolean
}
```

#### `icon`
Customize the streak icon (fire emoji by default).

```typescript
{
  isActive: boolean
}
```

#### `label`
Customize the text label.

```typescript
{
  current: number
  longest: number
}
```

### Usage

```vue
<StreakCounter :current="5" :longest="12" :is-active="true">
  <template #icon="{ isActive }">
    <span :style="{ filter: isActive ? 'none' : 'grayscale(1)' }">🔥</span>
  </template>
  <template #label="{ current, longest }">
    {{ current }} days (best: {{ longest }})
  </template>
</StreakCounter>
```

### Accessibility

- Role: `status`
- `aria-label` announces current streak

---

## ProgressBar

Displays progress as a bar with optional label.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `number` | Yes | Current progress value |
| `max` | `number` | Yes | Maximum value (100%) |
| `label` | `string` | No | Label text to display |
| `class` | `string` | No | CSS class for the root element |
| `barClass` | `string` | No | CSS class for the progress bar fill |

### Slots

#### Default Slot
Full customization.

```typescript
{
  value: number
  max: number
  percent: number  // 0-100
  label: string | undefined
}
```

#### `label`
Customize the label area.

```typescript
{
  label: string | undefined
  percent: number
}
```

### Usage

```vue
<ProgressBar :value="7" :max="10" label="Basics">
  <template #label="{ percent }">
    <div class="flex justify-between">
      <span>Basics</span>
      <span>{{ percent }}%</span>
    </div>
  </template>
</ProgressBar>
```

### Accessibility

- Role: `progressbar`
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` attributes

---

## AchievementToast

Displays a toast notification when a badge is earned.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `badge` | `Badge \| null` | Yes | Badge to display (null hides toast) |
| `duration` | `number` | No | Auto-hide duration in ms (default: 4000) |
| `class` | `string` | No | CSS class for the root element |

### Slots

#### Default Slot
Full customization of toast content.

```typescript
{
  badge: Badge
  dismiss: () => void  // Call to manually hide
}
```

### Usage

```vue
<script setup>
const latestBadge = ref(null)

// Set when badge earned
function onBadgeEarned(badge) {
  latestBadge.value = badge
}
</script>

<template>
  <AchievementToast :badge="latestBadge" :duration="5000">
    <template #default="{ badge, dismiss }">
      <div class="toast">
        <span>{{ badge.icon }}</span>
        <span>{{ badge.name }} unlocked!</span>
        <button @click="dismiss">×</button>
      </div>
    </template>
  </AchievementToast>
</template>
```

### Accessibility

- Role: `alert`
- `aria-live="polite"` for screen reader announcements

---

## GamificationDashboard

A compound component that displays all gamification data in one place.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `currentStreak` | `number` | Yes | Current streak |
| `longestStreak` | `number` | Yes | Longest streak |
| `isStreakActive` | `boolean` | Yes | Streak active state |
| `earnedBadges` | `Badge[]` | Yes | Earned badges |
| `unearnedBadges` | `Badge[]` | Yes | Unearned badges |
| `earnedIds` | `string[]` | Yes | Earned badge IDs |
| `allBadges` | `Badge[]` | Yes | All badge definitions |
| `badgeProgress` | `number` | Yes | Badge completion percentage |
| `progressByCategory` | `Record<string, ProgressEntry>` | Yes | Progress per category |
| `overallProgress` | `ProgressEntry` | Yes | Overall progress |
| `class` | `string` | No | CSS class for the root element |

### Slots

#### `header`
Dashboard header (default: "Progression").

#### `streak`
Streak section.

```typescript
{
  current: number
  longest: number
  isActive: boolean
}
```

#### `badges`
Badges section.

```typescript
{
  earned: Badge[]
  unearned: Badge[]
  earnedIds: string[]
  allBadges: Badge[]
  progress: number
}
```

#### `progress`
Progress section.

```typescript
{
  byCategory: Record<string, ProgressEntry>
  overall: ProgressEntry
}
```

#### `footer`
Optional footer content.

### Usage

```vue
<GamificationDashboard
  :current-streak="streak.currentStreak.value"
  :longest-streak="streak.longestStreak.value"
  :is-streak-active="streak.isActive.value"
  :earned-badges="badges.earned.value"
  :unearned-badges="badges.unearned.value"
  :earned-ids="badges.earned.value.map(b => b.id)"
  :all-badges="allBadges"
  :badge-progress="badges.progress.value"
  :progress-by-category="progress.byCategory.value"
  :overall-progress="progress.overall.value"
>
  <template #streak="{ current, isActive }">
    <StreakCounter :current="current" :longest="longestStreak" :is-active="isActive" />
  </template>
</GamificationDashboard>
```

---

## ReactionBar

Displays reaction buttons for content feedback.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `itemId` | `string` | Yes | Unique identifier for the content |
| `initialCounts` | `Partial<ReactionCounts>` | No | Seed counts from server |
| `storagePrefix` | `string` | No | Storage key prefix |
| `class` | `string` | No | CSS class for the root element |

### Slots

#### Default Slot
Full customization.

```typescript
{
  counts: ReactionCounts
  userReaction: ReactionType | null
  hasVoted: boolean
  totalResponses: number
  react: (type: ReactionType) => void
  clearReaction: () => void
  reactions: ReactionConfig[]
  isSelected: (type: ReactionType) => boolean
}
```

#### `header`
Header shown only after voting.

```typescript
{
  total: number
}
```

#### `reaction`
Customize individual reaction buttons.

```typescript
{
  type: ReactionType
  emoji: string
  label: string
  count: number
  isSelected: boolean
  onClick: () => void
}
```

### Usage

```vue
<ReactionBar
  item-id="article-123"
  :initial-counts="{ upvote: 5, love: 3 }"
>
  <template #reaction="{ emoji, label, count, isSelected, onClick }">
    <button
      :class="{ 'ring-2': isSelected }"
      @click="onClick"
    >
      {{ emoji }} {{ count }}
    </button>
  </template>
</ReactionBar>
```

### Accessibility

- Role: `group`
- `aria-label="Reactions"`
- Buttons have `aria-pressed` state
- Header uses `aria-live="polite"`

---

## ModuleFeedback

Collects two-dimensional feedback (Difficulty + Engagement) for course modules.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `moduleId` | `string` | Yes | Unique module identifier |
| `initialCounts` | `Partial<ModuleFeedbackCounts>` | No | Seed counts from server |
| `storagePrefix` | `string` | No | Storage key prefix |
| `class` | `string` | No | CSS class for the root element |

### Slots

#### Default Slot
Full customization of the entire component.

```typescript
{
  counts: ModuleFeedbackCounts
  userSelections: ModuleFeedbackSelections
  hasVoted: boolean
  totalResponses: number
  selectDifficulty: (option: DifficultyOption) => void
  selectEngagement: (option: EngagementOption) => void
  clearDifficulty: () => void
  clearEngagement: () => void
  clearAll: () => void
  difficultyOptions: DifficultyOptionConfig[]
  engagementOptions: EngagementOptionConfig[]
  isDifficultySelected: (key: DifficultyOption) => boolean
  isEngagementSelected: (key: EngagementOption) => boolean
}
```

#### `header`
Header shown only after voting.

```typescript
{
  total: number
}
```

#### `dimension-label`
Customize dimension labels ("Difficulty:" / "Engagement:").

```typescript
{
  dimension: 'difficulty' | 'engagement'
}
```

#### `difficulty-option`
Customize difficulty option buttons.

```typescript
{
  option: { key: DifficultyOption; emoji: string; label: string }
  count: number
  isSelected: boolean
  onClick: () => void
}
```

#### `engagement-option`
Customize engagement option buttons.

```typescript
{
  option: { key: EngagementOption; emoji: string; label: string }
  count: number
  isSelected: boolean
  onClick: () => void
}
```

### Default Rendering

```
[Header: "X Responses" - only shown after voting]

Difficulty:
[😌 Easy 5] [👌 Just Right 12] [🤯 Hard 3]

Engagement:
[😴 Boring 1] [🤔 Interesting 8] [🤩 Fascinating 6]
```

### Usage

**Basic:**

```vue
<ModuleFeedback
  module-id="intro-to-vue"
  :initial-counts="{
    difficulty: { easy: 5, justRight: 12, hard: 3 },
    engagement: { boring: 1, interesting: 8, fascinating: 6 }
  }"
/>
```

**Custom styling:**

```vue
<ModuleFeedback module-id="intro-to-vue">
  <template #difficulty-option="{ option, count, isSelected, onClick }">
    <button
      :class="['px-4 py-2 rounded', isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100']"
      @click="onClick"
    >
      {{ option.emoji }} {{ option.label }} ({{ count }})
    </button>
  </template>
</ModuleFeedback>
```

**Full customization:**

```vue
<ModuleFeedback module-id="intro-to-vue">
  <template #default="{ counts, selectDifficulty, selectEngagement, isDifficultySelected }">
    <div class="my-custom-feedback">
      <h3>How was this module?</h3>
      <div class="difficulty-row">
        <button
          v-for="opt in ['easy', 'justRight', 'hard']"
          :key="opt"
          :class="{ active: isDifficultySelected(opt) }"
          @click="selectDifficulty(opt)"
        >
          {{ opt }}: {{ counts.difficulty[opt] }}
        </button>
      </div>
    </div>
  </template>
</ModuleFeedback>
```

### Accessibility

- Role: `group`
- `aria-label="Module Feedback"`
- Buttons have `aria-pressed` state
- Header uses `aria-live="polite"` for screen reader announcements
