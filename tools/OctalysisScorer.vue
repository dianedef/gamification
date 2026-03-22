<template>
  <div class="octalysis-scorer">
    <h1 class="title">Octalysis Scorer</h1>
    <p class="subtitle">Evaluez la gamification de votre produit sur les 8 Core Drives de Yu-kai Chou</p>

    <!-- Score and Grade -->
    <div class="score-display">
      <div class="score-total">
        <span class="score-value">{{ totalScore }}</span>
        <span class="score-max">/ 800</span>
      </div>
      <div :class="['grade-badge', `grade-${letterGrade.toLowerCase()}`]">
        {{ letterGrade }}
      </div>
    </div>

    <!-- SVG Octagon Chart -->
    <div class="chart-container">
      <svg
        :viewBox="`0 0 ${svgSize} ${svgSize}`"
        class="octagon-chart"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="gradientStartColor" />
            <stop offset="100%" :stop-color="gradientEndColor" />
          </linearGradient>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--color-chart-bg-start)" />
            <stop offset="100%" stop-color="var(--color-chart-bg-end)" />
          </linearGradient>
        </defs>

        <!-- Background grid rings -->
        <polygon
          v-for="ring in 5"
          :key="'ring-' + ring"
          :points="getOctagonPoints(ring * 2).map(p => `${p.x},${p.y}`).join(' ')"
          fill="none"
          stroke="var(--color-grid)"
          :stroke-width="ring === 5 ? 1.5 : 0.5"
          :stroke-dasharray="ring === 5 ? 'none' : '4,4'"
        />

        <!-- Axis lines -->
        <line
          v-for="(drive, i) in coreDrives"
          :key="'axis-' + i"
          :x1="center"
          :y1="center"
          :x2="getOctagonPoints(10)[i].x"
          :y2="getOctagonPoints(10)[i].y"
          stroke="var(--color-grid)"
          stroke-width="0.5"
        />

        <!-- Score polygon (filled shape) -->
        <polygon
          :points="scorePolygonPoints"
          fill="url(#scoreGradient)"
          fill-opacity="0.35"
          stroke="url(#scoreGradient)"
          stroke-width="2.5"
          stroke-linejoin="round"
        />

        <!-- Score dots on vertices -->
        <circle
          v-for="(point, i) in scorePoints"
          :key="'dot-' + i"
          :cx="point.x"
          :cy="point.y"
          r="5"
          :fill="getDriveColor(coreDrives[i].score)"
          stroke="white"
          stroke-width="1.5"
        />

        <!-- Drive labels -->
        <text
          v-for="(drive, i) in coreDrives"
          :key="'label-' + i"
          :x="labelPositions[i].x"
          :y="labelPositions[i].y"
          :text-anchor="labelAnchors[i]"
          :dominant-baseline="labelBaselines[i]"
          class="drive-label"
          fill="var(--color-text)"
        >
          <tspan :x="labelPositions[i].x" dy="0" font-weight="600">CD{{ drive.id }}</tspan>
          <tspan :x="labelPositions[i].x" dy="1.2em" font-size="11">{{ drive.shortName }}</tspan>
        </text>

        <!-- Score values near dots -->
        <text
          v-for="(point, i) in scoreValuePositions"
          :key="'score-val-' + i"
          :x="point.x"
          :y="point.y"
          text-anchor="middle"
          dominant-baseline="middle"
          class="score-on-chart"
          :fill="getDriveColor(coreDrives[i].score)"
        >
          {{ coreDrives[i].score }}
        </text>
      </svg>
    </div>

    <!-- White Hat / Black Hat Balance -->
    <div class="hat-balance">
      <div class="hat-section white-hat">
        <div class="hat-header">
          <span class="hat-icon">&#9728;</span>
          <span class="hat-title">White Hat</span>
        </div>
        <div class="hat-bar-container">
          <div class="hat-bar white-hat-bar" :style="{ width: whiteHatPercent + '%' }"></div>
        </div>
        <span class="hat-score">{{ whiteHatScore }} / 400</span>
      </div>
      <div class="hat-section black-hat">
        <div class="hat-header">
          <span class="hat-icon">&#9790;</span>
          <span class="hat-title">Black Hat</span>
        </div>
        <div class="hat-bar-container">
          <div class="hat-bar black-hat-bar" :style="{ width: blackHatPercent + '%' }"></div>
        </div>
        <span class="hat-score">{{ blackHatScore }} / 400</span>
      </div>
    </div>

    <!-- Sliders in 2 columns -->
    <div class="sliders-grid">
      <div
        v-for="drive in coreDrives"
        :key="drive.id"
        class="slider-card"
        :class="{ 'white-hat-card': drive.hat === 'white', 'black-hat-card': drive.hat === 'black' }"
      >
        <div class="slider-header">
          <span class="slider-cd">CD{{ drive.id }}</span>
          <span class="slider-name">{{ drive.name }}</span>
          <span class="slider-value" :style="{ color: getDriveColor(drive.score) }">
            {{ drive.score }}
          </span>
        </div>
        <p class="slider-description">{{ drive.description }}</p>
        <input
          type="range"
          min="0"
          max="10"
          :value="drive.score"
          @input="updateScore(drive.id, Number(($event.target as HTMLInputElement).value))"
          class="slider"
          :style="sliderBackground(drive.score)"
        />
        <div class="slider-ticks">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
    </div>

    <!-- Diagnostics -->
    <div v-if="diagnostics.length > 0" class="diagnostics">
      <h2 class="diagnostics-title">Diagnostic</h2>
      <div
        v-for="(diag, i) in diagnostics"
        :key="i"
        :class="['diagnostic-item', `diagnostic-${diag.type}`]"
      >
        <span class="diagnostic-icon">{{ diag.icon }}</span>
        <span class="diagnostic-text">{{ diag.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface CoreDrive {
  id: number
  name: string
  shortName: string
  description: string
  score: number
  hat: 'white' | 'black'
}

interface Diagnostic {
  type: 'warning' | 'success' | 'danger'
  icon: string
  message: string
}

const svgSize = 500
const center = svgSize / 2
const maxRadius = 180
const labelRadius = maxRadius + 45

const scores = ref<number[]>([5, 5, 5, 5, 5, 5, 5, 5])

const driveDefinitions: Omit<CoreDrive, 'score'>[] = [
  {
    id: 1,
    name: 'Epic Meaning & Calling',
    shortName: 'Sens Epique',
    description: "L'utilisateur sent qu'il fait partie de quelque chose de plus grand",
    hat: 'white',
  },
  {
    id: 2,
    name: 'Development & Accomplishment',
    shortName: 'Accomplissement',
    description: 'Progression, badges, maîtrise',
    hat: 'white',
  },
  {
    id: 3,
    name: 'Empowerment of Creativity & Feedback',
    shortName: 'Créativité',
    description: "L'utilisateur peut créer, personnaliser, expérimenter",
    hat: 'white',
  },
  {
    id: 4,
    name: 'Ownership & Possession',
    shortName: 'Possession',
    description: "L'utilisateur possède quelque chose qu'il construit",
    hat: 'white',
  },
  {
    id: 5,
    name: 'Social Influence & Relatedness',
    shortName: 'Influence Sociale',
    description: 'Communauté, mentorat, compétition, collaboration',
    hat: 'black',
  },
  {
    id: 6,
    name: 'Scarcity & Impatience',
    shortName: 'Rareté',
    description: 'Rareté, FOMO, contenu limité',
    hat: 'black',
  },
  {
    id: 7,
    name: 'Unpredictability & Curiosity',
    shortName: 'Imprévisibilité',
    description: 'Surprises, récompenses variables, mystère',
    hat: 'black',
  },
  {
    id: 8,
    name: 'Loss & Avoidance',
    shortName: 'Perte & Évitement',
    description: 'Peur de perdre, streaks, countdown',
    hat: 'black',
  },
]

const coreDrives = computed<CoreDrive[]>(() =>
  driveDefinitions.map((def, i) => ({
    ...def,
    score: scores.value[i],
  }))
)

function updateScore(driveId: number, value: number): void {
  scores.value[driveId - 1] = value
}

// --- Scoring computations ---

const totalScore = computed(() => {
  return scores.value.reduce((sum, s) => sum + s * 10, 0)
})

const letterGrade = computed(() => {
  const t = totalScore.value
  if (t >= 600) return 'A'
  if (t >= 400) return 'B'
  if (t >= 200) return 'C'
  return 'D'
})

const whiteHatScore = computed(() => {
  return (scores.value[0] + scores.value[1] + scores.value[2] + scores.value[3]) * 10
})

const blackHatScore = computed(() => {
  return (scores.value[4] + scores.value[5] + scores.value[6] + scores.value[7]) * 10
})

const whiteHatPercent = computed(() => (whiteHatScore.value / 400) * 100)
const blackHatPercent = computed(() => (blackHatScore.value / 400) * 100)

// --- SVG Chart computations ---

function getAngle(index: number): number {
  // Start from top (270 degrees) and go clockwise
  return ((2 * Math.PI) / 8) * index - Math.PI / 2
}

function getOctagonPoints(scoreValue: number): { x: number; y: number }[] {
  const radius = (scoreValue / 10) * maxRadius
  return Array.from({ length: 8 }, (_, i) => {
    const angle = getAngle(i)
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  })
}

const scorePoints = computed(() => {
  return scores.value.map((score, i) => {
    const radius = (score / 10) * maxRadius
    const angle = getAngle(i)
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  })
})

const scorePolygonPoints = computed(() => {
  return scorePoints.value.map((p) => `${p.x},${p.y}`).join(' ')
})

const labelPositions = computed(() => {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = getAngle(i)
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
    }
  })
})

const labelAnchors = computed(() => {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = getAngle(i)
    const cos = Math.cos(angle)
    if (Math.abs(cos) < 0.1) return 'middle'
    return cos > 0 ? 'start' : 'end'
  })
})

const labelBaselines = computed(() => {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = getAngle(i)
    const sin = Math.sin(angle)
    if (Math.abs(sin) < 0.1) return 'middle'
    return sin > 0 ? 'hanging' : 'auto'
  })
})

const scoreValuePositions = computed(() => {
  return scores.value.map((score, i) => {
    const displayRadius = Math.max(score, 1.5)
    const radius = (displayRadius / 10) * maxRadius + 16
    const angle = getAngle(i)
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  })
})

// --- Colors ---

function getDriveColor(score: number): string {
  if (score <= 3) return 'var(--color-low)'
  if (score <= 6) return 'var(--color-mid)'
  return 'var(--color-high)'
}

const gradientStartColor = computed(() => {
  const avg = totalScore.value / 80
  if (avg <= 3) return '#ef4444'
  if (avg <= 6) return '#f59e0b'
  return '#22c55e'
})

const gradientEndColor = computed(() => {
  const avg = totalScore.value / 80
  if (avg <= 3) return '#f87171'
  if (avg <= 6) return '#fbbf24'
  return '#4ade80'
})

function sliderBackground(score: number): Record<string, string> {
  const pct = (score / 10) * 100
  const color = getDriveColor(score)
  return {
    background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, var(--color-slider-track) ${pct}%, var(--color-slider-track) 100%)`,
  }
}

// --- Diagnostics ---

const underExploitedSuggestions: Record<number, string> = {
  1: "Ajoutez une narrative engageante ou une mission qui dépasse l'utilisateur",
  2: 'Implémentez des barres de progression, badges ou niveaux',
  3: "Offrez des outils de personnalisation et du feedback immédiat sur les actions de l'utilisateur",
  4: "Permettez aux utilisateurs de construire, collectionner et posséder des éléments virtuels",
  5: 'Intégrez des fonctionnalités sociales : mentorat, équipes, classements collaboratifs',
  6: 'Utilisez des offres limitées dans le temps ou du contenu exclusif avec modération',
  7: 'Ajoutez des surprises, Easter eggs ou récompenses variables',
  8: 'Introduisez des streaks ou des mécaniques de progression à protéger',
}

const diagnostics = computed<Diagnostic[]>(() => {
  const diags: Diagnostic[] = []

  // Per-drive diagnostics
  for (const drive of coreDrives.value) {
    if (drive.score <= 2) {
      diags.push({
        type: 'warning',
        icon: '\u26A0\uFE0F',
        message: `${drive.name} sous-exploité — ${underExploitedSuggestions[drive.id]}`,
      })
    }
    if (drive.score >= 8) {
      diags.push({
        type: 'success',
        icon: '\u2705',
        message: `${drive.name} fort — attention à ne pas en abuser`,
      })
    }
  }

  // White Hat vs Black Hat
  if (whiteHatScore.value < blackHatScore.value) {
    diags.push({
      type: 'danger',
      icon: '\u26A0\uFE0F',
      message:
        'Gamification trop Black Hat — risque de motivation extrinsèque fragile',
    })
  }

  // Total score too low
  if (totalScore.value < 200) {
    diags.push({
      type: 'warning',
      icon: '\u26A0\uFE0F',
      message: "Gamification minimale — beaucoup d'opportunités",
    })
  }

  // PBL Trap detection: CD2 > 6 and all others < 3
  const cd2 = scores.value[1]
  const othersAllLow = scores.value.every((s, i) => i === 1 || s < 3)
  if (cd2 > 6 && othersAllLow) {
    diags.push({
      type: 'danger',
      icon: '\u26A0\uFE0F',
      message:
        'PBL Trap detecté — Votre gamification repose uniquement sur les Points, Badges et Leaderboards (CD2). Diversifiez vos Core Drives pour un engagement durable.',
    })
  }

  return diags
})
</script>

<style scoped>
.octalysis-scorer {
  /* Theme CSS variables */
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-surface-hover: #334155;
  --color-border: #334155;
  --color-text: #e2e8f0;
  --color-text-muted: #94a3b8;
  --color-low: #ef4444;
  --color-mid: #f59e0b;
  --color-high: #22c55e;
  --color-grid: #334155;
  --color-chart-bg-start: #1e293b;
  --color-chart-bg-end: #0f172a;
  --color-slider-track: #334155;
  --color-slider-thumb: #e2e8f0;
  --color-white-hat: #3b82f6;
  --color-black-hat: #a855f7;
  --color-danger-bg: #451a1a;
  --color-danger-border: #dc2626;
  --color-warning-bg: #451a2a;
  --color-warning-border: #f59e0b;
  --color-success-bg: #14332a;
  --color-success-border: #22c55e;

  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
  min-height: 100vh;
}

/* Title */
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  background: linear-gradient(135deg, var(--color-white-hat), var(--color-black-hat));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin: 0 0 2rem 0;
}

/* Score Display */
.score-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.score-total {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.score-value {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.score-max {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

.grade-badge {
  font-size: 1.75rem;
  font-weight: 800;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  line-height: 1;
}

.grade-a {
  background: rgba(34, 197, 94, 0.2);
  color: var(--color-high);
  border: 2px solid var(--color-high);
}

.grade-b {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.grade-c {
  background: rgba(245, 158, 11, 0.2);
  color: var(--color-mid);
  border: 2px solid var(--color-mid);
}

.grade-d {
  background: rgba(239, 68, 68, 0.2);
  color: var(--color-low);
  border: 2px solid var(--color-low);
}

/* Chart Container */
.chart-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.octagon-chart {
  width: 100%;
  max-width: 520px;
  height: auto;
}

.drive-label {
  font-size: 12px;
  fill: var(--color-text-muted);
}

.score-on-chart {
  font-size: 13px;
  font-weight: 700;
}

/* Hat Balance */
.hat-balance {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.hat-section {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border);
}

.hat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.hat-icon {
  font-size: 1.25rem;
}

.hat-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.hat-bar-container {
  width: 100%;
  height: 8px;
  background: var(--color-slider-track);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.hat-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.white-hat-bar {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.black-hat-bar {
  background: linear-gradient(90deg, #a855f7, #c084fc);
}

.hat-score {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

/* Sliders Grid */
.sliders-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.slider-card {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.slider-card:hover {
  background: var(--color-surface-hover);
}

.white-hat-card {
  border-left: 3px solid var(--color-white-hat);
}

.black-hat-card {
  border-left: 3px solid var(--color-black-hat);
}

.slider-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.slider-cd {
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background: var(--color-bg);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  flex-shrink: 0;
}

.slider-name {
  font-weight: 600;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.slider-value {
  font-size: 1.5rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  min-width: 2ch;
  text-align: right;
}

.slider-description {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

/* Range slider styling */
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-slider-thumb);
  cursor: pointer;
  border: 2px solid var(--color-bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.15s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-slider-thumb);
  cursor: pointer;
  border: 2px solid var(--color-bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.slider-ticks {
  display: flex;
  justify-content: space-between;
  margin-top: 0.25rem;
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

/* Diagnostics */
.diagnostics {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
}

.diagnostics-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.diagnostic-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.diagnostic-item:last-child {
  margin-bottom: 0;
}

.diagnostic-warning {
  background: var(--color-warning-bg);
  border: 1px solid var(--color-warning-border);
}

.diagnostic-success {
  background: var(--color-success-bg);
  border: 1px solid var(--color-success-border);
}

.diagnostic-danger {
  background: var(--color-danger-bg);
  border: 1px solid var(--color-danger-border);
}

.diagnostic-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  line-height: 1.4;
}

.diagnostic-text {
  flex: 1;
}

/* Responsive */
@media (max-width: 640px) {
  .octalysis-scorer {
    padding: 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .score-value {
    font-size: 2.25rem;
  }

  .sliders-grid {
    grid-template-columns: 1fr;
  }

  .hat-balance {
    grid-template-columns: 1fr;
  }

  .octagon-chart {
    max-width: 360px;
  }

  .slider-name {
    font-size: 0.8rem;
  }
}
</style>
