# 10 — Patterns d'implémentation technique

> Architecture, state management, persistance et patterns techniques pour implémenter la gamification dans vos applications.

---

## 1. Architecture générale

### Architecture en couches

```
┌─────────────────────────────────────────────────────┐
│                    UI Layer                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │BadgeCard │ │StreakBar │ │Progress  │  ...        │
│  └──────────┘ └──────────┘ └──────────┘            │
├─────────────────────────────────────────────────────┤
│                 Composable Layer                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │useBadges │ │useStreak │ │useProgress│ ...       │
│  └──────────┘ └──────────┘ └──────────┘            │
├─────────────────────────────────────────────────────┤
│                  Engine Layer                        │
│  ┌────────────────────────────────────┐             │
│  │       GamificationEngine          │             │
│  │  - Rule evaluation                │             │
│  │  - Event processing               │             │
│  │  - State transitions              │             │
│  └────────────────────────────────────┘             │
├─────────────────────────────────────────────────────┤
│               Persistence Layer                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │localStorage│ │  API    │ │ IndexedDB│            │
│  └──────────┘ └──────────┘ └──────────┘            │
└─────────────────────────────────────────────────────┘
```

### Principes architecturaux

| Principe | Description | Application |
|---|---|---|
| **Découplage** | Chaque mécanique est indépendante | useBadges ne dépend pas de useStreak |
| **Event-driven** | Les actions émettent des événements | `articleRead` → vérifie badges, streak, progress |
| **Storage-agnostic** | L'adaptateur de stockage est injectable | localStorage, API, IndexedDB |
| **Headless** | Les composants sont renderless | La logique est dans les composables, pas les templates |
| **Lazy evaluation** | Les badges sont vérifiés uniquement quand nécessaire | Pas à chaque rendu |

---

## 2. Event System (Système d'événements)

### Architecture événementielle

L'événement est le concept central de la gamification technique. Chaque action utilisateur émet un événement que les mécaniques écoutent :

```typescript
// Types d'événements
interface GamificationEvent {
  type: string
  payload: Record<string, unknown>
  timestamp: number
  userId?: string
}

// Exemples d'événements
type EventTypes =
  | { type: 'article:read'; payload: { articleId: string; category: string } }
  | { type: 'quiz:completed'; payload: { quizId: string; score: number } }
  | { type: 'profile:updated'; payload: { field: string } }
  | { type: 'comment:posted'; payload: { articleId: string } }
  | { type: 'reaction:submitted'; payload: { articleId: string; type: string } }
```

### Event Bus

```typescript
// Simple event bus pour la gamification
class GamificationEventBus {
  private listeners = new Map<string, Set<Function>>()

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)
    return () => this.listeners.get(event)?.delete(callback)
  }

  emit(event: string, payload: unknown) {
    this.listeners.get(event)?.forEach(cb => cb(payload))
    // Wildcard listeners
    this.listeners.get('*')?.forEach(cb => cb({ type: event, payload }))
  }
}

// Usage
const bus = new GamificationEventBus()

// Le système de badges écoute les articles lus
bus.on('article:read', (payload) => {
  checkBadgeConditions(payload)
})

// Le streak écoute toute activité
bus.on('*', () => {
  updateStreak()
})

// Quand l'utilisateur lit un article
bus.emit('article:read', { articleId: '123', category: 'javascript' })
```

---

## 3. State Management

### Structure de l'état gamification

```typescript
interface GamificationState {
  // Identité
  userId: string
  createdAt: number

  // Progression
  xp: number
  level: number

  // Streaks
  streak: {
    current: number
    longest: number
    lastActiveDate: string // YYYY-MM-DD
    freezesAvailable: number
    freezeUsedToday: boolean
  }

  // Badges
  badges: {
    earned: string[]          // IDs des badges obtenus
    earnedDates: Record<string, number>  // badge_id → timestamp
    progress: Record<string, number>     // badge_id → progress count
  }

  // Lecture
  reads: {
    articles: string[]        // IDs lus
    byCategory: Record<string, string[]>
  }

  // Réactions
  reactions: Record<string, string>  // article_id → reaction_type

  // Feedback
  feedback: Record<string, {
    difficulty?: string
    engagement?: string
  }>
}
```

### Persistence avec Storage Adapter

```typescript
interface StorageAdapter {
  get<T>(key: string): T | null
  set<T>(key: string, value: T): void
  remove(key: string): void
  clear(): void
}

// localStorage (défaut, client-side)
class LocalStorageAdapter implements StorageAdapter {
  constructor(private prefix: string = 'gamification') {}

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem(`${this.prefix}_${key}`)
    return raw ? JSON.parse(raw) : null
  }

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(`${this.prefix}_${key}`, JSON.stringify(value))
  }

  remove(key: string): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(`${this.prefix}_${key}`)
  }

  clear(): void {
    if (typeof window === 'undefined') return
    const keys = Object.keys(localStorage)
    keys.filter(k => k.startsWith(this.prefix))
        .forEach(k => localStorage.removeItem(k))
  }
}

// API adapter (server-side)
class APIStorageAdapter implements StorageAdapter {
  constructor(private baseUrl: string, private token: string) {}

  async get<T>(key: string): Promise<T | null> {
    const res = await fetch(`${this.baseUrl}/gamification/${key}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    if (!res.ok) return null
    return res.json()
  }

  async set<T>(key: string, value: T): Promise<void> {
    await fetch(`${this.baseUrl}/gamification/${key}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
  }

  // ...
}
```

---

## 4. Implémentation des mécaniques

### 4.1 Streak Engine

```typescript
interface StreakConfig {
  gracePeriodHours: number    // Heures de grâce (défaut: 36)
  freezeMax: number           // Max freezes stockables (défaut: 2)
  milestones: number[]        // Jalons célébrés (défaut: [7, 30, 100, 365])
}

function createStreakEngine(config: StreakConfig = {
  gracePeriodHours: 36,
  freezeMax: 2,
  milestones: [7, 30, 100, 365]
}) {
  function recordActivity(state: StreakState): StreakState {
    const today = getDateString(new Date())

    if (state.lastActiveDate === today) {
      return state // Déjà actif aujourd'hui
    }

    const daysSinceLastActive = getDaysDiff(state.lastActiveDate, today)

    if (daysSinceLastActive <= 1) {
      // Jour consécutif → incrémenter
      return {
        ...state,
        current: state.current + 1,
        longest: Math.max(state.current + 1, state.longest),
        lastActiveDate: today,
        freezeUsedToday: false
      }
    }

    if (daysSinceLastActive === 2 && state.freezesAvailable > 0) {
      // 1 jour manqué + freeze disponible → utiliser freeze
      return {
        ...state,
        current: state.current + 1,
        longest: Math.max(state.current + 1, state.longest),
        lastActiveDate: today,
        freezesAvailable: state.freezesAvailable - 1,
        freezeUsedToday: true
      }
    }

    // Streak cassé → reset
    return {
      ...state,
      current: 1,
      lastActiveDate: today,
      freezeUsedToday: false
      // longest reste inchangé
    }
  }

  function isMilestone(streakLength: number): boolean {
    return config.milestones.includes(streakLength)
  }

  function getStreakStatus(state: StreakState): 'active' | 'danger' | 'frozen' | 'broken' {
    const hoursSinceActive = getHoursDiff(state.lastActiveDate, new Date())

    if (hoursSinceActive < 24) return 'active'
    if (hoursSinceActive < config.gracePeriodHours) return 'danger'
    if (state.freezesAvailable > 0) return 'frozen'
    return 'broken'
  }

  return { recordActivity, isMilestone, getStreakStatus }
}
```

### 4.2 Badge Engine

```typescript
interface BadgeDefinition {
  id: string
  name: string
  description: string
  icon: string
  tier: 'bronze' | 'silver' | 'gold' | 'diamond'
  category: string
  secret: boolean
  condition: (state: GamificationState) => boolean
  progress?: (state: GamificationState) => { current: number; total: number }
}

function createBadgeEngine(badges: BadgeDefinition[]) {
  function checkAll(state: GamificationState): {
    earned: BadgeDefinition[]
    newlyEarned: BadgeDefinition[]
    unearned: BadgeDefinition[]
    progress: Record<string, { current: number; total: number }>
  } {
    const earned: BadgeDefinition[] = []
    const newlyEarned: BadgeDefinition[] = []
    const unearned: BadgeDefinition[] = []
    const progress: Record<string, { current: number; total: number }> = {}

    for (const badge of badges) {
      if (state.badges.earned.includes(badge.id)) {
        earned.push(badge)
        continue
      }

      if (badge.condition(state)) {
        newlyEarned.push(badge)
        earned.push(badge)
      } else {
        unearned.push(badge)
        if (badge.progress) {
          progress[badge.id] = badge.progress(state)
        }
      }
    }

    return { earned, newlyEarned, unearned, progress }
  }

  return { checkAll }
}

// Définition de badges
const BADGES: BadgeDefinition[] = [
  {
    id: 'first-step',
    name: 'Premier pas',
    description: 'Lire ton premier article',
    icon: '👣',
    tier: 'bronze',
    category: 'onboarding',
    secret: false,
    condition: (s) => s.reads.articles.length >= 1
  },
  {
    id: 'explorer',
    name: 'Explorateur',
    description: 'Lire des articles dans 5 catégories',
    icon: '🧭',
    tier: 'silver',
    category: 'exploration',
    secret: false,
    condition: (s) => Object.keys(s.reads.byCategory).length >= 5,
    progress: (s) => ({
      current: Object.keys(s.reads.byCategory).length,
      total: 5
    })
  },
  {
    id: 'streaker-30',
    name: 'Flamme éternelle',
    description: 'Maintenir un streak de 30 jours',
    icon: '🔥',
    tier: 'gold',
    category: 'regularity',
    secret: false,
    condition: (s) => s.streak.longest >= 30,
    progress: (s) => ({
      current: s.streak.current,
      total: 30
    })
  },
  {
    id: 'night-owl',
    name: '???',
    description: 'Découvre ce badge mystérieux',
    icon: '🦉',
    tier: 'silver',
    category: 'secret',
    secret: true,
    condition: (s) => {
      // Badge secret : lire un article entre minuit et 5h du matin
      const hour = new Date().getHours()
      return hour >= 0 && hour < 5 && s.reads.articles.length > 0
    }
  }
]
```

### 4.3 XP et Level Engine

```typescript
interface LevelConfig {
  xpPerLevel: (level: number) => number  // XP requis pour le niveau N
  maxLevel: number
}

// Courbe exponentielle : chaque niveau demande plus d'XP
const DEFAULT_LEVEL_CONFIG: LevelConfig = {
  xpPerLevel: (level) => Math.floor(100 * Math.pow(1.5, level - 1)),
  maxLevel: 50
}

function createLevelEngine(config: LevelConfig = DEFAULT_LEVEL_CONFIG) {
  function getLevel(totalXP: number): {
    level: number
    xpInCurrentLevel: number
    xpForNextLevel: number
    progressPercent: number
  } {
    let level = 1
    let xpRemaining = totalXP

    while (level < config.maxLevel) {
      const xpNeeded = config.xpPerLevel(level)
      if (xpRemaining < xpNeeded) {
        return {
          level,
          xpInCurrentLevel: xpRemaining,
          xpForNextLevel: xpNeeded,
          progressPercent: Math.round((xpRemaining / xpNeeded) * 100)
        }
      }
      xpRemaining -= xpNeeded
      level++
    }

    return {
      level: config.maxLevel,
      xpInCurrentLevel: xpRemaining,
      xpForNextLevel: 0,
      progressPercent: 100
    }
  }

  function addXP(currentXP: number, amount: number): {
    newXP: number
    leveledUp: boolean
    newLevel: number
    previousLevel: number
  } {
    const previousLevel = getLevel(currentXP).level
    const newXP = currentXP + amount
    const newLevel = getLevel(newXP).level

    return {
      newXP,
      leveledUp: newLevel > previousLevel,
      newLevel,
      previousLevel
    }
  }

  // Table des XP requis
  function getLevelTable(): Array<{ level: number; xpRequired: number; xpCumulative: number }> {
    const table = []
    let cumulative = 0
    for (let i = 1; i <= config.maxLevel; i++) {
      const required = config.xpPerLevel(i)
      cumulative += required
      table.push({ level: i, xpRequired: required, xpCumulative: cumulative })
    }
    return table
  }

  return { getLevel, addXP, getLevelTable }
}
```

### 4.4 Progress Tracker

```typescript
interface ProgressConfig {
  categories: Record<string, { total: number; label: string }>
}

function createProgressTracker(config: ProgressConfig) {
  function calculateProgress(reads: GamificationState['reads']): {
    byCategory: Record<string, { read: number; total: number; percent: number }>
    overall: { read: number; total: number; percent: number }
  } {
    const byCategory: Record<string, { read: number; total: number; percent: number }> = {}
    let totalRead = 0
    let totalAll = 0

    for (const [category, { total, label }] of Object.entries(config.categories)) {
      const read = reads.byCategory[category]?.length ?? 0
      const percent = Math.round((read / total) * 100)
      byCategory[category] = { read, total, percent }
      totalRead += read
      totalAll += total
    }

    return {
      byCategory,
      overall: {
        read: totalRead,
        total: totalAll,
        percent: Math.round((totalRead / totalAll) * 100)
      }
    }
  }

  return { calculateProgress }
}
```

---

## 5. Composable Vue 3 (Pattern complet)

### useGamification — Composable principal

```typescript
import { ref, computed, onMounted } from 'vue'

interface UseGamificationOptions {
  storagePrefix?: string
  storage?: StorageAdapter
  badges?: BadgeDefinition[]
  levelConfig?: LevelConfig
  streakConfig?: StreakConfig
}

export function useGamification(options: UseGamificationOptions = {}) {
  const {
    storagePrefix = 'gamification',
    storage = new LocalStorageAdapter(storagePrefix),
    badges = BADGES,
    levelConfig = DEFAULT_LEVEL_CONFIG,
    streakConfig = DEFAULT_STREAK_CONFIG
  } = options

  // State
  const state = ref<GamificationState>(loadState())

  // Engines
  const badgeEngine = createBadgeEngine(badges)
  const levelEngine = createLevelEngine(levelConfig)
  const streakEngine = createStreakEngine(streakConfig)

  // Computed
  const level = computed(() => levelEngine.getLevel(state.value.xp))
  const badgeResults = computed(() => badgeEngine.checkAll(state.value))
  const streakStatus = computed(() =>
    streakEngine.getStreakStatus(state.value.streak)
  )

  // Actions
  function markAsRead(articleId: string, category: string) {
    if (state.value.reads.articles.includes(articleId)) return

    state.value.reads.articles.push(articleId)
    if (!state.value.reads.byCategory[category]) {
      state.value.reads.byCategory[category] = []
    }
    state.value.reads.byCategory[category].push(articleId)

    // XP
    const xpResult = levelEngine.addXP(state.value.xp, 10)
    state.value.xp = xpResult.newXP

    // Streak
    state.value.streak = streakEngine.recordActivity(state.value.streak)

    // Check badges
    const { newlyEarned } = badgeEngine.checkAll(state.value)
    for (const badge of newlyEarned) {
      state.value.badges.earned.push(badge.id)
      state.value.badges.earnedDates[badge.id] = Date.now()
      // Emit event for UI (toast, confetti)
      emitBadgeEarned(badge)
    }

    // Persist
    saveState()

    // Return what happened
    return {
      xpGained: 10,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel,
      badgesEarned: newlyEarned,
      streakUpdated: true
    }
  }

  function loadState(): GamificationState {
    return storage.get('state') ?? createInitialState()
  }

  function saveState() {
    storage.set('state', state.value)
  }

  return {
    // State (readonly)
    state: computed(() => state.value),

    // Computed
    level,
    badgeResults,
    streakStatus,

    // Actions
    markAsRead,

    // Direct access
    streak: computed(() => state.value.streak),
    xp: computed(() => state.value.xp),
    earnedBadges: computed(() => badgeResults.value.earned),
    unearnedBadges: computed(() => badgeResults.value.unearned),
  }
}
```

---

## 6. Patterns de performance

### 6.1 Lazy Badge Evaluation

Ne pas évaluer tous les badges à chaque action :

```typescript
// ❌ Mauvais : vérifie tous les badges à chaque render
const badges = computed(() => badgeEngine.checkAll(state.value))

// ✅ Bon : vérifie uniquement quand l'état change
const badges = computed(() => {
  // Vue track les dépendances automatiquement
  // Mais on peut optimiser avec un hash
  const stateHash = hashRelevantState(state.value)
  return badgeEngine.checkAll(state.value)
})
```

### 6.2 Debounced Persistence

Ne pas sauvegarder à chaque micro-action :

```typescript
import { watchDebounced } from '@vueuse/core'

// Sauvegarder au maximum toutes les 500ms
watchDebounced(
  state,
  (newState) => storage.set('state', newState),
  { debounce: 500, deep: true }
)
```

### 6.3 Progressive Loading

Charger les données gamification en priorité décroissante :

```typescript
// 1. Immédiat : streak et badges (critique pour l'UI)
const criticalData = storage.get('streak')

// 2. Après render : leaderboard et social
onMounted(async () => {
  const leaderboard = await fetchLeaderboard()
})

// 3. En arrière-plan : analytics et historique
requestIdleCallback(() => {
  trackGamificationEvent('session_start')
})
```

---

## 7. Temps réel et synchronisation

### Optimistic Updates

```typescript
async function markAsRead(articleId: string) {
  // 1. Mettre à jour l'UI immédiatement
  state.value.reads.articles.push(articleId)
  state.value.xp += 10

  // 2. Sauvegarder en local
  storage.set('state', state.value)

  // 3. Synchroniser avec le serveur en arrière-plan
  try {
    await api.post('/gamification/read', { articleId })
  } catch (error) {
    // 4. Rollback si erreur
    state.value.reads.articles = state.value.reads.articles
      .filter(id => id !== articleId)
    state.value.xp -= 10
    storage.set('state', state.value)
  }
}
```

### Conflict Resolution

Quand les données locales et serveur divergent :

```typescript
function mergeState(local: GamificationState, server: GamificationState): GamificationState {
  return {
    ...server,
    // Garder le plus récent pour le streak
    streak: local.streak.lastActiveDate > server.streak.lastActiveDate
      ? local.streak
      : server.streak,
    // Union des badges (jamais perdre un badge)
    badges: {
      earned: [...new Set([...local.badges.earned, ...server.badges.earned])],
      earnedDates: { ...server.badges.earnedDates, ...local.badges.earnedDates }
    },
    // Union des articles lus
    reads: {
      articles: [...new Set([...local.reads.articles, ...server.reads.articles])]
    },
    // Garder le XP le plus élevé
    xp: Math.max(local.xp, server.xp)
  }
}
```

---

## 8. Anti-triche

### Mesures côté client

```typescript
// Rate limiting des actions
const actionThrottle = new Map<string, number>()

function canPerformAction(actionType: string, cooldownMs: number = 1000): boolean {
  const lastTime = actionThrottle.get(actionType) ?? 0
  const now = Date.now()

  if (now - lastTime < cooldownMs) return false

  actionThrottle.set(actionType, now)
  return true
}

// Validation des actions
function validateRead(articleId: string): boolean {
  // L'article existe-t-il ?
  if (!articles.value.has(articleId)) return false

  // Déjà lu ?
  if (state.value.reads.articles.includes(articleId)) return false

  // Rate limit (max 1 article / 30 secondes)
  if (!canPerformAction('read', 30_000)) return false

  return true
}
```

### Mesures côté serveur (si applicable)

```typescript
// Validation serveur
app.post('/api/gamification/read', async (req, res) => {
  const { articleId, userId } = req.body

  // 1. L'article existe ?
  const article = await db.articles.findById(articleId)
  if (!article) return res.status(404).json({ error: 'Article not found' })

  // 2. Déjà lu ?
  const alreadyRead = await db.reads.exists({ userId, articleId })
  if (alreadyRead) return res.status(409).json({ error: 'Already read' })

  // 3. Rate limit (max 60 lectures/heure)
  const recentReads = await db.reads.count({
    userId,
    createdAt: { $gt: new Date(Date.now() - 3600000) }
  })
  if (recentReads >= 60) return res.status(429).json({ error: 'Rate limited' })

  // 4. Enregistrer
  await db.reads.create({ userId, articleId, createdAt: new Date() })

  // 5. Mettre à jour les compteurs
  await updateGamificationState(userId)

  res.json({ success: true })
})
```

---

## 9. Testing de la gamification

### Tests unitaires des engines

```typescript
import { describe, it, expect } from 'vitest'

describe('StreakEngine', () => {
  const engine = createStreakEngine()

  it('should increment streak on consecutive days', () => {
    const state = { current: 5, longest: 10, lastActiveDate: '2026-03-20' }
    // Mock: aujourd'hui = 2026-03-21
    const result = engine.recordActivity(state)
    expect(result.current).toBe(6)
  })

  it('should reset streak after 2+ days gap', () => {
    const state = { current: 5, longest: 10, lastActiveDate: '2026-03-18' }
    // Mock: aujourd'hui = 2026-03-21 (3 jours d'écart)
    const result = engine.recordActivity(state)
    expect(result.current).toBe(1)
    expect(result.longest).toBe(10) // Le record est préservé
  })

  it('should use freeze when 1 day is missed', () => {
    const state = {
      current: 5, longest: 10,
      lastActiveDate: '2026-03-19',
      freezesAvailable: 2
    }
    // Mock: aujourd'hui = 2026-03-21 (1 jour manqué)
    const result = engine.recordActivity(state)
    expect(result.current).toBe(6) // Streak continue
    expect(result.freezesAvailable).toBe(1) // Freeze consommé
  })

  it('should preserve longest streak record', () => {
    const state = { current: 15, longest: 15, lastActiveDate: '2026-03-18' }
    const result = engine.recordActivity(state)
    expect(result.current).toBe(1)
    expect(result.longest).toBe(15) // Record préservé
  })
})

describe('BadgeEngine', () => {
  const engine = createBadgeEngine(BADGES)

  it('should earn first-step badge after 1 read', () => {
    const state = createState({ reads: { articles: ['a1'] } })
    const { newlyEarned } = engine.checkAll(state)
    expect(newlyEarned.map(b => b.id)).toContain('first-step')
  })

  it('should not re-earn already earned badges', () => {
    const state = createState({
      reads: { articles: ['a1'] },
      badges: { earned: ['first-step'] }
    })
    const { newlyEarned } = engine.checkAll(state)
    expect(newlyEarned).toHaveLength(0)
  })

  it('should track progress for unearned badges', () => {
    const state = createState({
      reads: { byCategory: { js: ['a1'], css: ['a2'], react: ['a3'] } }
    })
    const { progress } = engine.checkAll(state)
    expect(progress['explorer']).toEqual({ current: 3, total: 5 })
  })
})
```

### Tests d'intégration

```typescript
describe('useGamification', () => {
  it('should complete full flow: read → XP → badge → streak', () => {
    const { markAsRead, xp, streak, earnedBadges } = useGamification()

    const result = markAsRead('article-1', 'javascript')

    expect(xp.value).toBe(10)
    expect(streak.value.current).toBe(1)
    expect(result.xpGained).toBe(10)
    expect(result.badgesEarned.map(b => b.id)).toContain('first-step')
  })
})
```

---

## 10. Checklist d'implémentation

### MVP Gamification (Phase 1)

- [ ] Storage adapter (localStorage)
- [ ] Streak engine (avec grace period)
- [ ] Badge engine (5-10 badges de base)
- [ ] Progress tracker (par catégorie)
- [ ] Composable `useGamification`
- [ ] Composants : BadgeCard, StreakCounter, ProgressBar
- [ ] Toast component pour les badges
- [ ] Animations basiques (bounce, confetti)
- [ ] Tests unitaires des engines

### Engagement (Phase 2)

- [ ] XP et niveaux
- [ ] Réactions (upvote, love, etc.)
- [ ] Feedback module (difficulté, engagement)
- [ ] Daily rewards
- [ ] Quêtes quotidiennes/hebdomadaires
- [ ] Leaderboard (local)
- [ ] Streak freeze
- [ ] Dashboard complet

### Social et avancé (Phase 3)

- [ ] Synchronisation serveur
- [ ] Leaderboard serveur (global, amis)
- [ ] Profil gamifié public
- [ ] Partage de badges
- [ ] Défis sociaux
- [ ] Notifications push
- [ ] Year in review
- [ ] Analytics et A/B testing

---

## Lectures recommandées

- **Vue.js Documentation** — Composition API, composables
- **VueUse** — Référence de patterns de composables
- **Patterns.dev** — Design patterns pour le web
- **Martin Fowler** — *Patterns of Enterprise Application Architecture*
