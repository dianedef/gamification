<template>
  <div class="mechanics-checker">
    <!-- Summary Dashboard -->
    <header class="dashboard">
      <h2 class="dashboard-title">Audit des Mécaniques de Gamification</h2>
      <p class="dashboard-subtitle">Évaluez la présence des mécaniques de jeu dans votre produit</p>

      <div class="score-ring-container">
        <svg class="score-ring" viewBox="0 0 120 120">
          <circle
            class="score-ring-bg"
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#e5e7eb"
            stroke-width="10"
          />
          <circle
            class="score-ring-fill"
            cx="60"
            cy="60"
            r="52"
            fill="none"
            :stroke="overallScoreColor"
            stroke-width="10"
            stroke-linecap="round"
            :stroke-dasharray="ringCircumference"
            :stroke-dashoffset="ringOffset"
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="55" text-anchor="middle" class="score-ring-value">
            {{ overallPercentage }}%
          </text>
          <text x="60" y="72" text-anchor="middle" class="score-ring-label">
            couverture
          </text>
        </svg>
      </div>

      <p class="interpretation" :class="interpretationClass">{{ interpretation }}</p>

      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-value stat-present">{{ totalPresent }}</span>
          <span class="stat-label">Présentes</span>
        </div>
        <div class="stat-card">
          <span class="stat-value stat-partial">{{ totalPartial }}</span>
          <span class="stat-label">Partielles</span>
        </div>
        <div class="stat-card">
          <span class="stat-value stat-absent">{{ totalAbsent }}</span>
          <span class="stat-label">Absentes</span>
        </div>
        <div class="stat-card">
          <span class="stat-value stat-total">{{ TOTAL_MECHANICS }}</span>
          <span class="stat-label">Total</span>
        </div>
      </div>

      <!-- Warnings -->
      <div v-if="warnings.length" class="warnings-container">
        <div v-for="(warning, idx) in warnings" :key="idx" class="warning-card">
          <span class="warning-icon">&#9888;</span>
          <span>{{ warning }}</span>
        </div>
      </div>

      <!-- Quick Wins -->
      <div v-if="quickWins.length" class="quick-wins">
        <h3 class="quick-wins-title">Top 3 Quick Wins</h3>
        <div class="quick-wins-list">
          <div v-for="(qw, idx) in quickWins" :key="idx" class="quick-win-item">
            <span class="quick-win-rank">#{{ idx + 1 }}</span>
            <div class="quick-win-text">
              <strong>{{ qw.label }}</strong>
              <span class="quick-win-category">{{ qw.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Category Accordion -->
    <section class="categories">
      <div
        v-for="(cat, catIdx) in categories"
        :key="catIdx"
        class="category-block"
        :class="{ 'category-open': openCategories[catIdx] }"
      >
        <button
          class="category-header"
          @click="toggleCategory(catIdx)"
          :aria-expanded="openCategories[catIdx]"
        >
          <div class="category-header-left">
            <span class="category-chevron">{{ openCategories[catIdx] ? '\u25BC' : '\u25B6' }}</span>
            <span class="category-name">{{ cat.name }}</span>
            <span class="category-count">
              {{ getCategoryPresentCount(catIdx) }}/{{ cat.items.length }}
            </span>
          </div>
          <div class="category-header-right">
            <span class="category-pct">{{ getCategoryPercentage(catIdx) }}%</span>
            <div class="category-bar-mini">
              <div
                class="bar-segment bar-present"
                :style="{ width: getCategoryBarPresent(catIdx) + '%' }"
              />
              <div
                class="bar-segment bar-partial"
                :style="{ width: getCategoryBarPartial(catIdx) + '%' }"
              />
              <div
                class="bar-segment bar-absent"
                :style="{ width: getCategoryBarAbsent(catIdx) + '%' }"
              />
            </div>
          </div>
        </button>

        <div v-if="openCategories[catIdx]" class="category-body">
          <div
            v-for="(item, itemIdx) in cat.items"
            :key="itemIdx"
            class="mechanic-row"
          >
            <span class="mechanic-label">{{ item }}</span>
            <div class="toggle-group">
              <button
                class="toggle-btn toggle-present"
                :class="{ active: getStatus(catIdx, itemIdx) === 'present' }"
                @click="setStatus(catIdx, itemIdx, 'present')"
                title="Présent"
                aria-label="Présent"
              >
                &#10003;
              </button>
              <button
                class="toggle-btn toggle-partial"
                :class="{ active: getStatus(catIdx, itemIdx) === 'partial' }"
                @click="setStatus(catIdx, itemIdx, 'partial')"
                title="Partiel"
                aria-label="Partiel"
              >
                &#9888;
              </button>
              <button
                class="toggle-btn toggle-absent"
                :class="{ active: getStatus(catIdx, itemIdx) === 'absent' }"
                @click="setStatus(catIdx, itemIdx, 'absent')"
                title="Absent"
                aria-label="Absent"
              >
                &#10007;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Reset -->
    <footer class="checker-footer">
      <button class="reset-btn" @click="resetAll">
        Réinitialiser l'audit
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

type MechanicStatus = 'present' | 'partial' | 'absent'

interface Category {
  name: string
  items: string[]
}

const categories: Category[] = [
  {
    name: 'Progression',
    items: [
      'Points / XP',
      'Niveaux',
      'Barres de progression',
      'Arbres de compétences',
      'Milestones / Jalons',
    ],
  },
  {
    name: 'Récompenses',
    items: [
      'Badges / Trophées',
      'Récompenses quotidiennes',
      'Récompenses variables (surprise)',
      'Loot / Coffres',
      'Monnaie virtuelle',
    ],
  },
  {
    name: 'Social',
    items: [
      'Leaderboards / Classements',
      'Équipes / Guildes',
      'Partage social',
      'Mentorat / Parrainage',
      'Preuve sociale (compteurs)',
    ],
  },
  {
    name: 'Engagement',
    items: [
      'Streaks / Séries',
      'Quêtes / Missions',
      'Challenges limités dans le temps',
      'Check-in quotidien',
      'Notifications gamifiées',
    ],
  },
  {
    name: 'Narration',
    items: [
      'Storytelling / Narration',
      'Avatar / Personnage',
      'Monde / Carte',
      'Easter eggs / Secrets',
    ],
  },
  {
    name: 'Feedback',
    items: [
      'Feedback immédiat',
      'Animations / Célébrations',
      'Sons / Audio',
      'Micro-copy gamifié',
    ],
  },
  {
    name: 'Autonomie',
    items: [
      'Choix de parcours',
      'Personnalisation',
      'Mode zen / opt-out',
      'Difficulté adaptative',
    ],
  },
]

const TOTAL_MECHANICS = categories.reduce((sum, c) => sum + c.items.length, 0)

// State: status for each mechanic, defaults to 'absent'
const statuses = reactive<MechanicStatus[][]>(
  categories.map((cat) => cat.items.map(() => 'absent' as MechanicStatus))
)

// Accordion open state
const openCategories = reactive<boolean[]>(categories.map(() => false))

function toggleCategory(idx: number) {
  openCategories[idx] = !openCategories[idx]
}

function getStatus(catIdx: number, itemIdx: number): MechanicStatus {
  return statuses[catIdx][itemIdx]
}

function setStatus(catIdx: number, itemIdx: number, status: MechanicStatus) {
  // Toggle off if clicking the same status
  if (statuses[catIdx][itemIdx] === status) {
    statuses[catIdx][itemIdx] = 'absent'
  } else {
    statuses[catIdx][itemIdx] = status
  }
}

function resetAll() {
  for (let c = 0; c < categories.length; c++) {
    for (let i = 0; i < categories[c].items.length; i++) {
      statuses[c][i] = 'absent'
    }
  }
}

// Category-level computed helpers
function getCategoryPresentCount(catIdx: number): number {
  return statuses[catIdx].filter((s) => s === 'present').length
}

function getCategoryPartialCount(catIdx: number): number {
  return statuses[catIdx].filter((s) => s === 'partial').length
}

function getCategoryAbsentCount(catIdx: number): number {
  return statuses[catIdx].filter((s) => s === 'absent').length
}

function getCategoryPercentage(catIdx: number): number {
  const total = categories[catIdx].items.length
  const score = statuses[catIdx].reduce((sum, s) => {
    if (s === 'present') return sum + 1
    if (s === 'partial') return sum + 0.5
    return sum
  }, 0)
  return Math.round((score / total) * 100)
}

function getCategoryBarPresent(catIdx: number): number {
  const total = categories[catIdx].items.length
  return (getCategoryPresentCount(catIdx) / total) * 100
}

function getCategoryBarPartial(catIdx: number): number {
  const total = categories[catIdx].items.length
  return (getCategoryPartialCount(catIdx) / total) * 100
}

function getCategoryBarAbsent(catIdx: number): number {
  const total = categories[catIdx].items.length
  return (getCategoryAbsentCount(catIdx) / total) * 100
}

// Global totals
const totalPresent = computed(() =>
  statuses.reduce((sum, cat) => sum + cat.filter((s) => s === 'present').length, 0)
)

const totalPartial = computed(() =>
  statuses.reduce((sum, cat) => sum + cat.filter((s) => s === 'partial').length, 0)
)

const totalAbsent = computed(() =>
  statuses.reduce((sum, cat) => sum + cat.filter((s) => s === 'absent').length, 0)
)

const overallScore = computed(() => {
  return statuses.reduce(
    (sum, cat) =>
      sum +
      cat.reduce((s, status) => {
        if (status === 'present') return s + 1
        if (status === 'partial') return s + 0.5
        return s
      }, 0),
    0
  )
})

const overallPercentage = computed(() =>
  Math.round((overallScore.value / TOTAL_MECHANICS) * 100)
)

const overallScoreColor = computed(() => {
  const pct = overallPercentage.value
  if (pct >= 80) return '#10b981'
  if (pct >= 50) return '#3b82f6'
  if (pct >= 25) return '#f59e0b'
  return '#ef4444'
})

const ringCircumference = computed(() => {
  const r = 52
  return 2 * Math.PI * r
})

const ringOffset = computed(() => {
  const pct = overallPercentage.value / 100
  return ringCircumference.value * (1 - pct)
})

const interpretation = computed(() => {
  const pct = overallPercentage.value
  if (pct >= 80)
    return 'Gamification très complète — attention à la surcharge cognitive'
  if (pct >= 50)
    return "Bonne couverture — opportunités d'enrichissement"
  if (pct >= 25)
    return 'Gamification basique — beaucoup de potentiel'
  return 'Gamification minimale'
})

const interpretationClass = computed(() => {
  const pct = overallPercentage.value
  if (pct >= 80) return 'interp-high'
  if (pct >= 50) return 'interp-good'
  if (pct >= 25) return 'interp-basic'
  return 'interp-minimal'
})

// Warnings
const warnings = computed(() => {
  const w: string[] = []
  // Social category is index 2
  if (getCategoryPercentage(2) === 0) {
    w.push("Aucune mécanique sociale — isolement de l'utilisateur")
  }
  // Autonomie category is index 6
  if (getCategoryPercentage(6) === 0) {
    w.push('Aucune autonomie — risque de réactance')
  }
  return w
})

// Quick wins: suggest top 3 absent mechanics with highest impact
// Priority order: feedback immédiat, récompenses variables, quêtes, then others
interface QuickWin {
  label: string
  category: string
  priority: number
}

const quickWinsPriority: { label: string; catIdx: number; itemIdx: number; priority: number }[] = [
  { label: 'Feedback immédiat', catIdx: 5, itemIdx: 0, priority: 1 },
  { label: 'Récompenses variables (surprise)', catIdx: 1, itemIdx: 2, priority: 2 },
  { label: 'Quêtes / Missions', catIdx: 3, itemIdx: 1, priority: 3 },
  { label: 'Streaks / Séries', catIdx: 3, itemIdx: 0, priority: 4 },
  { label: 'Badges / Trophées', catIdx: 1, itemIdx: 0, priority: 5 },
  { label: 'Points / XP', catIdx: 0, itemIdx: 0, priority: 6 },
  { label: 'Barres de progression', catIdx: 0, itemIdx: 2, priority: 7 },
  { label: 'Animations / Célébrations', catIdx: 5, itemIdx: 1, priority: 8 },
  { label: 'Leaderboards / Classements', catIdx: 2, itemIdx: 0, priority: 9 },
  { label: 'Choix de parcours', catIdx: 6, itemIdx: 0, priority: 10 },
  { label: 'Storytelling / Narration', catIdx: 4, itemIdx: 0, priority: 11 },
  { label: 'Personnalisation', catIdx: 6, itemIdx: 1, priority: 12 },
]

const quickWins = computed<QuickWin[]>(() => {
  return quickWinsPriority
    .filter((qw) => statuses[qw.catIdx][qw.itemIdx] === 'absent')
    .slice(0, 3)
    .map((qw) => ({
      label: qw.label,
      category: categories[qw.catIdx].name,
      priority: qw.priority,
    }))
})
</script>

<style scoped>
.mechanics-checker {
  --color-present: #10b981;
  --color-partial: #f59e0b;
  --color-absent: #e5e7eb;
  --color-absent-icon: #9ca3af;
  --color-bg: #ffffff;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --radius: 8px;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  color: var(--color-text);
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 16px;
}

/* Dashboard */
.dashboard {
  text-align: center;
  margin-bottom: 32px;
}

.dashboard-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 4px;
}

.dashboard-subtitle {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin: 0 0 24px;
}

.score-ring-container {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.score-ring {
  width: 140px;
  height: 140px;
}

.score-ring-fill {
  transition: stroke-dashoffset 0.5s ease, stroke 0.3s ease;
}

.score-ring-value {
  font-size: 1.6rem;
  font-weight: 700;
  fill: var(--color-text);
}

.score-ring-label {
  font-size: 0.7rem;
  fill: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.interpretation {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 8px 0 20px;
  padding: 8px 16px;
  border-radius: var(--radius);
  display: inline-block;
}

.interp-high {
  background: #d1fae5;
  color: #065f46;
}

.interp-good {
  background: #dbeafe;
  color: #1e40af;
}

.interp-basic {
  background: #fef3c7;
  color: #92400e;
}

.interp-minimal {
  background: #fee2e2;
  color: #991b1b;
}

/* Stats row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.stat-present {
  color: var(--color-present);
}

.stat-partial {
  color: var(--color-partial);
}

.stat-absent {
  color: var(--color-absent-icon);
}

.stat-total {
  color: var(--color-text);
}

/* Warnings */
.warnings-container {
  margin-bottom: 16px;
}

.warning-card {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fbbf24;
  border-radius: var(--radius);
  padding: 10px 14px;
  margin-bottom: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  text-align: left;
}

.warning-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

/* Quick Wins */
.quick-wins {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 8px;
  text-align: left;
}

.quick-wins-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.quick-wins-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-win-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quick-win-rank {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
}

.quick-win-text {
  display: flex;
  flex-direction: column;
}

.quick-win-text strong {
  font-size: 0.88rem;
}

.quick-win-category {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* Categories */
.categories {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.category-block {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-bg);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.category-block.category-open {
  border-color: #d1d5db;
}

.category-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: var(--color-surface);
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.92rem;
  color: var(--color-text);
  transition: background 0.15s ease;
  gap: 12px;
}

.category-header:hover {
  background: #f3f4f6;
}

.category-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.category-chevron {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  width: 14px;
}

.category-name {
  font-weight: 600;
}

.category-count {
  font-size: 0.78rem;
  color: var(--color-text-secondary);
  background: var(--color-border);
  padding: 2px 7px;
  border-radius: 10px;
}

.category-header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
  justify-content: flex-end;
}

.category-pct {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  width: 36px;
  text-align: right;
}

.category-bar-mini {
  display: flex;
  height: 6px;
  width: 100px;
  background: var(--color-absent);
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
}

.bar-segment {
  height: 100%;
  transition: width 0.3s ease;
}

.bar-present {
  background: var(--color-present);
}

.bar-partial {
  background: var(--color-partial);
}

.bar-absent {
  background: var(--color-absent);
}

/* Category body */
.category-body {
  border-top: 1px solid var(--color-border);
  padding: 4px 0;
}

.mechanic-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  gap: 12px;
  transition: background 0.1s ease;
}

.mechanic-row:hover {
  background: #f9fafb;
}

.mechanic-label {
  font-size: 0.88rem;
  flex: 1;
  min-width: 0;
}

/* Three-state toggle */
.toggle-group {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.toggle-btn {
  width: 34px;
  height: 30px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  transition: all 0.15s ease;
  font-family: inherit;
}

.toggle-btn:hover {
  border-color: #d1d5db;
  background: #f3f4f6;
}

.toggle-present.active {
  background: #d1fae5;
  border-color: var(--color-present);
  color: #065f46;
}

.toggle-partial.active {
  background: #fef3c7;
  border-color: var(--color-partial);
  color: #92400e;
}

.toggle-absent.active {
  background: #fee2e2;
  border-color: #f87171;
  color: #991b1b;
}

/* Footer */
.checker-footer {
  text-align: center;
}

.reset-btn {
  padding: 10px 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;
}

.reset-btn:hover {
  background: #fee2e2;
  border-color: #f87171;
  color: #991b1b;
}

/* Responsive */
@media (max-width: 600px) {
  .mechanics-checker {
    padding: 16px 12px;
  }

  .dashboard-title {
    font-size: 1.25rem;
  }

  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-header {
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 14px;
  }

  .category-header-right {
    width: 100%;
    justify-content: flex-end;
  }

  .category-bar-mini {
    flex: 1;
    width: auto;
    max-width: 160px;
  }

  .mechanic-row {
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px 14px;
  }

  .mechanic-label {
    width: 100%;
  }

  .toggle-group {
    margin-left: auto;
  }

  .quick-win-item {
    gap: 8px;
  }

  .score-ring {
    width: 120px;
    height: 120px;
  }
}
</style>
