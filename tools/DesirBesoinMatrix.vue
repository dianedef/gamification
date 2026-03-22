<template>
  <div class="dbm-root">
    <h1 class="dbm-title">Matrice Desir vs Besoin</h1>
    <p class="dbm-subtitle">
      Positionne chaque mecanique de ton produit sur le spectre desir / besoin
      pour evaluer l'alignement ethique de ta gamification.
    </p>

    <div class="dbm-layout">
      <!-- Left column: Matrix -->
      <div class="dbm-matrix-column">
        <div class="dbm-matrix-container" ref="matrixContainer">
          <svg
            :viewBox="`0 0 ${svgSize} ${svgSize}`"
            class="dbm-svg"
            @mouseup="onSvgMouseUp"
            @mousemove="onSvgMouseMove"
            @mouseleave="onSvgMouseUp"
            @touchend="onSvgMouseUp"
            @touchmove.prevent="onSvgTouchMove"
          >
            <!-- Quadrant backgrounds -->
            <rect
              :x="padding"
              :y="padding"
              :width="plotSize / 2"
              :height="plotSize / 2"
              :fill="quadrantColors.nudge"
              opacity="0.15"
            />
            <rect
              :x="padding + plotSize / 2"
              :y="padding"
              :width="plotSize / 2"
              :height="plotSize / 2"
              :fill="quadrantColors.ideale"
              opacity="0.15"
            />
            <rect
              :x="padding"
              :y="padding + plotSize / 2"
              :width="plotSize / 2"
              :height="plotSize / 2"
              :fill="quadrantColors.morte"
              opacity="0.15"
            />
            <rect
              :x="padding + plotSize / 2"
              :y="padding + plotSize / 2"
              :width="plotSize / 2"
              :height="plotSize / 2"
              :fill="quadrantColors.danger"
              opacity="0.15"
            />

            <!-- Grid lines -->
            <line
              v-for="i in 4"
              :key="'gv' + i"
              :x1="padding + (plotSize / 5) * i"
              :y1="padding"
              :x2="padding + (plotSize / 5) * i"
              :y2="padding + plotSize"
              stroke="#ccc"
              stroke-width="0.5"
              stroke-dasharray="4,4"
            />
            <line
              v-for="i in 4"
              :key="'gh' + i"
              :x1="padding"
              :y1="padding + (plotSize / 5) * i"
              :x2="padding + plotSize"
              :y2="padding + (plotSize / 5) * i"
              stroke="#ccc"
              stroke-width="0.5"
              stroke-dasharray="4,4"
            />

            <!-- Center lines (axis at 3) -->
            <line
              :x1="padding + plotSize / 2"
              :y1="padding"
              :x2="padding + plotSize / 2"
              :y2="padding + plotSize"
              stroke="#999"
              stroke-width="1.5"
            />
            <line
              :x1="padding"
              :y1="padding + plotSize / 2"
              :x2="padding + plotSize"
              :y2="padding + plotSize / 2"
              stroke="#999"
              stroke-width="1.5"
            />

            <!-- Quadrant labels -->
            <text
              :x="padding + plotSize * 0.25"
              :y="padding + plotSize * 0.15"
              text-anchor="middle"
              class="dbm-quadrant-label"
              :fill="quadrantColors.nudge"
            >
              <tspan :x="padding + plotSize * 0.25" dy="0" font-weight="bold">Zone nudge</tspan>
              <tspan :x="padding + plotSize * 0.25" dy="16" font-size="11">"Rends le besoin desirable"</tspan>
            </text>
            <text
              :x="padding + plotSize * 0.75"
              :y="padding + plotSize * 0.15"
              text-anchor="middle"
              class="dbm-quadrant-label"
              :fill="quadrantColors.ideale"
            >
              <tspan :x="padding + plotSize * 0.75" dy="0" font-weight="bold">Zone ideale</tspan>
              <tspan :x="padding + plotSize * 0.75" dy="16" font-size="11">"Fonce !"</tspan>
            </text>
            <text
              :x="padding + plotSize * 0.25"
              :y="padding + plotSize * 0.85"
              text-anchor="middle"
              class="dbm-quadrant-label"
              :fill="quadrantColors.morte"
            >
              <tspan :x="padding + plotSize * 0.25" dy="0" font-weight="bold">Zone morte</tspan>
              <tspan :x="padding + plotSize * 0.25" dy="16" font-size="11">"Ne construis pas ca"</tspan>
            </text>
            <text
              :x="padding + plotSize * 0.75"
              :y="padding + plotSize * 0.85"
              text-anchor="middle"
              class="dbm-quadrant-label"
              :fill="quadrantColors.danger"
            >
              <tspan :x="padding + plotSize * 0.75" dy="0" font-weight="bold">Zone danger</tspan>
              <tspan :x="padding + plotSize * 0.75" dy="16" font-size="11">"Attention : le desir</tspan>
              <tspan :x="padding + plotSize * 0.75" dy="14" font-size="11">n'est pas un besoin"</tspan>
            </text>

            <!-- Axis labels -->
            <text
              :x="padding + plotSize / 2"
              :y="svgSize - 4"
              text-anchor="middle"
              class="dbm-axis-label"
              fill="#444"
            >
              L'utilisateur le veut ? (Desir)
            </text>
            <text
              :x="14"
              :y="padding + plotSize / 2"
              text-anchor="middle"
              class="dbm-axis-label"
              fill="#444"
              :transform="`rotate(-90, 14, ${padding + plotSize / 2})`"
            >
              L'utilisateur en a besoin ? (Besoin)
            </text>

            <!-- Axis tick labels -->
            <text
              v-for="i in 5"
              :key="'tx' + i"
              :x="padding + (plotSize / 5) * (i - 0.5)"
              :y="padding + plotSize + 18"
              text-anchor="middle"
              class="dbm-tick-label"
              fill="#666"
            >
              {{ i }}
            </text>
            <text
              v-for="i in 5"
              :key="'ty' + i"
              :x="padding - 8"
              :y="padding + plotSize - (plotSize / 5) * (i - 0.5) + 4"
              text-anchor="end"
              class="dbm-tick-label"
              fill="#666"
            >
              {{ i }}
            </text>

            <!-- Axis endpoint labels -->
            <text :x="padding" :y="padding + plotSize + 32" text-anchor="start" class="dbm-endpoint-label" fill="#999">
              Pas du tout
            </text>
            <text :x="padding + plotSize" :y="padding + plotSize + 32" text-anchor="end" class="dbm-endpoint-label" fill="#999">
              Absolument
            </text>
            <text :x="padding - 8" :y="padding + plotSize + 4" text-anchor="end" class="dbm-endpoint-label" fill="#999">
              Pas du tout
            </text>
            <text :x="padding - 8" :y="padding + 4" text-anchor="end" class="dbm-endpoint-label" fill="#999">
              Absolument
            </text>

            <!-- Outer border -->
            <rect
              :x="padding"
              :y="padding"
              :width="plotSize"
              :height="plotSize"
              fill="none"
              stroke="#aaa"
              stroke-width="1"
            />

            <!-- Mechanic dots -->
            <g
              v-for="(m, idx) in mechanics"
              :key="m.id"
              :class="{ 'dbm-dot-group': true, 'dbm-dot-dragging': draggingIndex === idx }"
              @mousedown.prevent="onDotMouseDown($event, idx)"
              @touchstart.prevent="onDotTouchStart($event, idx)"
              style="cursor: grab"
            >
              <circle
                :cx="desirToX(m.desir)"
                :cy="besoinToY(m.besoin)"
                r="14"
                :fill="getDotColor(m)"
                :stroke="editingIndex === idx ? '#000' : getDotColor(m)"
                :stroke-width="editingIndex === idx ? 3 : 1.5"
                opacity="0.85"
              />
              <text
                :x="desirToX(m.desir)"
                :y="besoinToY(m.besoin) - 20"
                text-anchor="middle"
                class="dbm-dot-label"
                fill="#333"
              >
                {{ m.nom.length > 18 ? m.nom.substring(0, 16) + '...' : m.nom }}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Right column: Controls + Analysis -->
      <div class="dbm-controls-column">
        <!-- Input form -->
        <div class="dbm-form-card">
          <h3 class="dbm-section-title">{{ editingIndex !== null ? 'Modifier la mecanique' : 'Ajouter une mecanique' }}</h3>
          <div class="dbm-field">
            <label class="dbm-label">Nom de la mecanique</label>
            <input
              v-model="formNom"
              type="text"
              class="dbm-input"
              placeholder="ex: Streak quotidien, Leaderboard..."
              @keydown.enter="addOrUpdateMechanic"
            />
          </div>
          <div class="dbm-field">
            <label class="dbm-label">
              Axe X — L'utilisateur le veut ? (Desir) :
              <strong>{{ formDesir }}</strong> / 5
              <span class="dbm-label-hint">{{ desirLabels[formDesir - 1] }}</span>
            </label>
            <input
              v-model.number="formDesir"
              type="range"
              min="1"
              max="5"
              step="0.1"
              class="dbm-slider dbm-slider-desir"
            />
            <div class="dbm-slider-endpoints">
              <span>1 — Pas du tout</span>
              <span>5 — Absolument</span>
            </div>
          </div>
          <div class="dbm-field">
            <label class="dbm-label">
              Axe Y — L'utilisateur en a besoin ? (Besoin) :
              <strong>{{ formBesoin }}</strong> / 5
              <span class="dbm-label-hint">{{ besoinLabels[formBesoin - 1] }}</span>
            </label>
            <input
              v-model.number="formBesoin"
              type="range"
              min="1"
              max="5"
              step="0.1"
              class="dbm-slider dbm-slider-besoin"
            />
            <div class="dbm-slider-endpoints">
              <span>1 — Pas du tout</span>
              <span>5 — Absolument</span>
            </div>
          </div>
          <div class="dbm-field">
            <label class="dbm-label">Niveau de recompense (Hierarchie)</label>
            <select v-model.number="formNiveau" class="dbm-select">
              <option :value="1">Niveau 1 — Dopamine (desir pur)</option>
              <option :value="2">Niveau 2 — Progression (desir)</option>
              <option :value="3">Niveau 3 — Reconnaissance (desir + besoin)</option>
              <option :value="4">Niveau 4 — Competence (besoin)</option>
              <option :value="5">Niveau 5 — Transcendance (besoin profond)</option>
            </select>
          </div>
          <div class="dbm-form-actions">
            <button class="dbm-btn dbm-btn-primary" @click="addOrUpdateMechanic" :disabled="!formNom.trim()">
              {{ editingIndex !== null ? 'Mettre a jour' : 'Ajouter' }}
            </button>
            <button v-if="editingIndex !== null" class="dbm-btn dbm-btn-secondary" @click="cancelEdit">
              Annuler
            </button>
          </div>
        </div>

        <!-- Mechanics list -->
        <div class="dbm-list-card" v-if="mechanics.length > 0">
          <h3 class="dbm-section-title">Mecaniques ajoutees ({{ mechanics.length }})</h3>
          <div class="dbm-mechanics-list">
            <div
              v-for="(m, idx) in mechanics"
              :key="m.id"
              class="dbm-mechanic-item"
              :class="{ 'dbm-mechanic-editing': editingIndex === idx }"
            >
              <div class="dbm-mechanic-dot" :style="{ backgroundColor: getDotColor(m) }"></div>
              <div class="dbm-mechanic-info">
                <span class="dbm-mechanic-name">{{ m.nom }}</span>
                <span class="dbm-mechanic-meta">
                  D:{{ m.desir.toFixed(1) }} / B:{{ m.besoin.toFixed(1) }} —
                  {{ getQuadrantName(m) }} — Niv.{{ m.niveau }}
                </span>
              </div>
              <div class="dbm-mechanic-actions">
                <button class="dbm-btn-icon" @click="startEdit(idx)" title="Modifier">&#9998;</button>
                <button class="dbm-btn-icon dbm-btn-icon-danger" @click="removeMechanic(idx)" title="Supprimer">&times;</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Analysis -->
        <div class="dbm-analysis-card" v-if="mechanics.length > 0">
          <h3 class="dbm-section-title">Analyse</h3>

          <!-- Quadrant distribution -->
          <div class="dbm-distribution">
            <h4 class="dbm-subsection-title">Repartition par quadrant</h4>
            <div class="dbm-dist-bars">
              <div class="dbm-dist-row" v-for="q in quadrantStats" :key="q.key">
                <span class="dbm-dist-label" :style="{ color: q.color }">{{ q.label }}</span>
                <div class="dbm-dist-bar-container">
                  <div
                    class="dbm-dist-bar"
                    :style="{
                      width: mechanics.length ? (q.count / mechanics.length * 100) + '%' : '0%',
                      backgroundColor: q.color
                    }"
                  ></div>
                </div>
                <span class="dbm-dist-count">{{ q.count }}</span>
              </div>
            </div>
          </div>

          <!-- Computed messages -->
          <div class="dbm-messages">
            <div
              v-for="(msg, i) in analysisMessages"
              :key="i"
              class="dbm-message"
              :class="'dbm-message-' + msg.type"
            >
              {{ msg.text }}
            </div>
          </div>

          <!-- Reward level distribution -->
          <div class="dbm-distribution" v-if="mechanics.length > 0">
            <h4 class="dbm-subsection-title">Distribution par niveau de recompense</h4>
            <div class="dbm-dist-bars">
              <div class="dbm-dist-row" v-for="lvl in niveauStats" :key="lvl.niveau">
                <span class="dbm-dist-label dbm-dist-label-niveau">Niv.{{ lvl.niveau }}</span>
                <div class="dbm-dist-bar-container">
                  <div
                    class="dbm-dist-bar"
                    :style="{
                      width: mechanics.length ? (lvl.count / mechanics.length * 100) + '%' : '0%',
                      backgroundColor: lvl.color
                    }"
                  ></div>
                </div>
                <span class="dbm-dist-count">{{ lvl.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hierarchie des recompenses reference panel -->
    <div class="dbm-hierarchy-panel">
      <h3 class="dbm-section-title">Hierarchie des recompenses — Reference</h3>
      <p class="dbm-hierarchy-subtitle">Du plus extractif au plus aligne. Pour chaque mecanique, demande-toi a quel niveau elle opere.</p>
      <div class="dbm-hierarchy-scale">
        <div
          v-for="lvl in hierarchyLevels"
          :key="lvl.niveau"
          class="dbm-hierarchy-level"
          :style="{ borderLeftColor: lvl.color }"
        >
          <div class="dbm-hierarchy-badge" :style="{ backgroundColor: lvl.color }">{{ lvl.niveau }}</div>
          <div class="dbm-hierarchy-content">
            <div class="dbm-hierarchy-name">
              <strong>{{ lvl.name }}</strong>
              <span class="dbm-hierarchy-type">({{ lvl.type }})</span>
            </div>
            <div class="dbm-hierarchy-desc">{{ lvl.description }}</div>
            <div class="dbm-hierarchy-example">{{ lvl.example }}</div>
          </div>
          <div class="dbm-hierarchy-count" v-if="mechanics.length > 0">
            {{ niveauCountMap[lvl.niveau] || 0 }} mecanique{{ (niveauCountMap[lvl.niveau] || 0) > 1 ? 's' : '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// ─── Types ────────────────────────────────────────────────────

interface Mechanic {
  id: number
  nom: string
  desir: number
  besoin: number
  niveau: number
}

interface AnalysisMessage {
  text: string
  type: 'success' | 'warning' | 'danger' | 'info'
}

// ─── Constants ────────────────────────────────────────────────

const svgSize = 500
const padding = 50
const plotSize = svgSize - padding * 2

const quadrantColors = {
  ideale: '#22c55e',
  danger: '#ef4444',
  nudge: '#f59e0b',
  morte: '#9ca3af',
}

const desirLabels = [
  'Pas du tout',
  'Un peu',
  'Moyennement',
  'Beaucoup',
  'Absolument',
]

const besoinLabels = [
  'Pas du tout',
  'Un peu',
  'Moyennement',
  'Beaucoup',
  'Absolument',
]

const hierarchyLevels = [
  {
    niveau: 5,
    name: 'Transcendance',
    type: 'besoin profond',
    description: 'Contribuer a plus grand que soi',
    example: 'Impact reel, contribution, heritage. La recompense EST le sens.',
    color: '#7c3aed',
  },
  {
    niveau: 4,
    name: 'Competence',
    type: 'besoin',
    description: 'Savoir faire quelque chose de nouveau',
    example: 'Skill acquis, probleme resolu, creation personnelle. La recompense EST la competence.',
    color: '#2563eb',
  },
  {
    niveau: 3,
    name: 'Reconnaissance',
    type: 'desir + besoin',
    description: 'Les autres voient ma valeur',
    example: 'Badge significatif, feedback de pairs, mentorat. La recompense EST la validation sociale authentique.',
    color: '#0891b2',
  },
  {
    niveau: 2,
    name: 'Progression',
    type: 'desir',
    description: "J'avance en chiffres",
    example: 'Points, niveaux, barres de progression. La recompense EST le mouvement, pas la destination.',
    color: '#ea580c',
  },
  {
    niveau: 1,
    name: 'Dopamine',
    type: 'desir pur',
    description: 'Ding ! Confetti !',
    example: 'Animation, son, surprise, loot box. La recompense EST la stimulation neurochimique. Duree : quelques secondes.',
    color: '#dc2626',
  },
]

// ─── State ────────────────────────────────────────────────────

const mechanics = reactive<Mechanic[]>([])
let nextId = 1

const formNom = ref('')
const formDesir = ref(3)
const formBesoin = ref(3)
const formNiveau = ref(3)
const editingIndex = ref<number | null>(null)

const draggingIndex = ref<number | null>(null)
const matrixContainer = ref<HTMLDivElement | null>(null)

// ─── Coordinate conversions ───────────────────────────────────

function desirToX(desir: number): number {
  // desir 1-5 maps to padding .. padding+plotSize
  return padding + ((desir - 0.5) / 5) * plotSize
}

function besoinToY(besoin: number): number {
  // besoin 1-5 maps to padding+plotSize .. padding (inverted Y)
  return padding + plotSize - ((besoin - 0.5) / 5) * plotSize
}

function xToDesir(x: number): number {
  const raw = ((x - padding) / plotSize) * 5 + 0.5
  return Math.round(Math.min(5, Math.max(1, raw)) * 10) / 10
}

function yToBesoin(y: number): number {
  const raw = ((padding + plotSize - y) / plotSize) * 5 + 0.5
  return Math.round(Math.min(5, Math.max(1, raw)) * 10) / 10
}

// ─── Quadrant logic ───────────────────────────────────────────

function getQuadrant(m: Mechanic): string {
  if (m.desir >= 3 && m.besoin >= 3) return 'ideale'
  if (m.desir >= 3 && m.besoin < 3) return 'danger'
  if (m.desir < 3 && m.besoin >= 3) return 'nudge'
  return 'morte'
}

function getQuadrantName(m: Mechanic): string {
  const names: Record<string, string> = {
    ideale: 'Zone ideale',
    danger: 'Zone danger',
    nudge: 'Zone nudge',
    morte: 'Zone morte',
  }
  return names[getQuadrant(m)]
}

function getDotColor(m: Mechanic): string {
  return quadrantColors[getQuadrant(m) as keyof typeof quadrantColors]
}

// ─── Form actions ─────────────────────────────────────────────

function addOrUpdateMechanic() {
  if (!formNom.value.trim()) return

  if (editingIndex.value !== null) {
    const m = mechanics[editingIndex.value]
    m.nom = formNom.value.trim()
    m.desir = formDesir.value
    m.besoin = formBesoin.value
    m.niveau = formNiveau.value
    editingIndex.value = null
  } else {
    mechanics.push({
      id: nextId++,
      nom: formNom.value.trim(),
      desir: formDesir.value,
      besoin: formBesoin.value,
      niveau: formNiveau.value,
    })
  }

  formNom.value = ''
  formDesir.value = 3
  formBesoin.value = 3
  formNiveau.value = 3
}

function removeMechanic(idx: number) {
  if (editingIndex.value === idx) {
    cancelEdit()
  } else if (editingIndex.value !== null && editingIndex.value > idx) {
    editingIndex.value--
  }
  mechanics.splice(idx, 1)
}

function startEdit(idx: number) {
  editingIndex.value = idx
  const m = mechanics[idx]
  formNom.value = m.nom
  formDesir.value = m.desir
  formBesoin.value = m.besoin
  formNiveau.value = m.niveau
}

function cancelEdit() {
  editingIndex.value = null
  formNom.value = ''
  formDesir.value = 3
  formBesoin.value = 3
  formNiveau.value = 3
}

// ─── Drag logic ───────────────────────────────────────────────

function getSvgPoint(clientX: number, clientY: number): { x: number; y: number } | null {
  const container = matrixContainer.value
  if (!container) return null
  const svg = container.querySelector('svg')
  if (!svg) return null
  const rect = svg.getBoundingClientRect()
  const scaleX = svgSize / rect.width
  const scaleY = svgSize / rect.height
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  }
}

function onDotMouseDown(event: MouseEvent, idx: number) {
  draggingIndex.value = idx
}

function onDotTouchStart(event: TouchEvent, idx: number) {
  draggingIndex.value = idx
}

function onSvgMouseMove(event: MouseEvent) {
  if (draggingIndex.value === null) return
  const pt = getSvgPoint(event.clientX, event.clientY)
  if (!pt) return
  const m = mechanics[draggingIndex.value]
  m.desir = xToDesir(pt.x)
  m.besoin = yToBesoin(pt.y)
  // Update form if editing this mechanic
  if (editingIndex.value === draggingIndex.value) {
    formDesir.value = m.desir
    formBesoin.value = m.besoin
  }
}

function onSvgTouchMove(event: TouchEvent) {
  if (draggingIndex.value === null) return
  const touch = event.touches[0]
  if (!touch) return
  const pt = getSvgPoint(touch.clientX, touch.clientY)
  if (!pt) return
  const m = mechanics[draggingIndex.value]
  m.desir = xToDesir(pt.x)
  m.besoin = yToBesoin(pt.y)
  if (editingIndex.value === draggingIndex.value) {
    formDesir.value = m.desir
    formBesoin.value = m.besoin
  }
}

function onSvgMouseUp() {
  draggingIndex.value = null
}

// ─── Computed analysis ────────────────────────────────────────

const quadrantStats = computed(() => {
  const counts: Record<string, number> = { ideale: 0, danger: 0, nudge: 0, morte: 0 }
  for (const m of mechanics) {
    counts[getQuadrant(m)]++
  }
  return [
    { key: 'ideale', label: 'Zone ideale', color: quadrantColors.ideale, count: counts.ideale },
    { key: 'danger', label: 'Zone danger', color: quadrantColors.danger, count: counts.danger },
    { key: 'nudge', label: 'Zone nudge', color: quadrantColors.nudge, count: counts.nudge },
    { key: 'morte', label: 'Zone morte', color: quadrantColors.morte, count: counts.morte },
  ]
})

const niveauCountMap = computed(() => {
  const counts: Record<number, number> = {}
  for (const m of mechanics) {
    counts[m.niveau] = (counts[m.niveau] || 0) + 1
  }
  return counts
})

const niveauStats = computed(() => {
  return hierarchyLevels.map((lvl) => ({
    niveau: lvl.niveau,
    count: niveauCountMap.value[lvl.niveau] || 0,
    color: lvl.color,
  }))
})

const analysisMessages = computed<AnalysisMessage[]>(() => {
  if (mechanics.length === 0) return []

  const messages: AnalysisMessage[] = []
  const counts: Record<string, number> = { ideale: 0, danger: 0, nudge: 0, morte: 0 }
  for (const m of mechanics) {
    counts[getQuadrant(m)]++
  }

  const total = mechanics.length
  const majorityThreshold = total / 2

  // Most in Zone ideale
  if (counts.ideale > majorityThreshold) {
    messages.push({
      text: 'Bel alignement entre desir et besoin.',
      type: 'success',
    })
  }

  // Most in Zone danger
  if (counts.danger > majorityThreshold) {
    messages.push({
      text: "Ta gamification donne ce que l'utilisateur veut, pas ce dont il a besoin. Risque d'extraction.",
      type: 'warning',
    })
  }

  // Most in Zone nudge
  if (counts.nudge > majorityThreshold) {
    messages.push({
      text: "Tes mecaniques repondent a un vrai besoin mais ne sont pas desirables. Travaille l'attractivite.",
      type: 'info',
    })
  }

  // Most in Zone morte
  if (counts.morte > majorityThreshold) {
    messages.push({
      text: "La majorite de tes mecaniques ne sont ni desirees ni necessaires. Repense ta strategie.",
      type: 'danger',
    })
  }

  // Specific dead zone callouts
  for (const m of mechanics) {
    if (getQuadrant(m) === 'morte') {
      messages.push({
        text: `${m.nom} — ni desire ni necessaire. Pourquoi l'avoir ?`,
        type: 'danger',
      })
    }
  }

  // Reward level warnings
  const niv1Count = niveauCountMap.value[1] || 0
  const niv4Count = niveauCountMap.value[4] || 0
  const niv5Count = niveauCountMap.value[5] || 0

  if (niv1Count > majorityThreshold) {
    messages.push({
      text: "La majorite de tes mecaniques operent au Niveau 1 (Dopamine pure). Risque d'escalade des doses. Monte en niveau de recompense.",
      type: 'warning',
    })
  }

  if ((niv4Count + niv5Count) > majorityThreshold) {
    messages.push({
      text: 'Tes mecaniques ciblent la competence et la transcendance. Excellent alignement avec les besoins profonds.',
      type: 'success',
    })
  }

  return messages
})
</script>

<style scoped>
/* ─── Root & Layout ─────────────────────────────────────────── */

.dbm-root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #1a1a2e;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  line-height: 1.5;
}

.dbm-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #1a1a2e;
}

.dbm-subtitle {
  font-size: 15px;
  color: #64748b;
  margin: 0 0 28px 0;
}

.dbm-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}

@media (max-width: 900px) {
  .dbm-layout {
    grid-template-columns: 1fr;
  }
}

/* ─── Matrix / SVG ──────────────────────────────────────────── */

.dbm-matrix-column {
  position: sticky;
  top: 24px;
}

.dbm-matrix-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 500px;
}

.dbm-svg {
  width: 100%;
  height: 100%;
  display: block;
  user-select: none;
  -webkit-user-select: none;
}

.dbm-quadrant-label {
  font-size: 13px;
  pointer-events: none;
}

.dbm-axis-label {
  font-size: 12px;
  font-weight: 600;
}

.dbm-tick-label {
  font-size: 11px;
}

.dbm-endpoint-label {
  font-size: 9px;
  font-style: italic;
}

.dbm-dot-label {
  font-size: 11px;
  font-weight: 600;
  pointer-events: none;
  text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff;
}

.dbm-dot-group {
  transition: transform 0.05s ease-out;
}

.dbm-dot-dragging circle {
  r: 17;
  opacity: 1;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
}

/* ─── Controls column ───────────────────────────────────────── */

.dbm-controls-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dbm-form-card,
.dbm-list-card,
.dbm-analysis-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.dbm-section-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #1a1a2e;
}

.dbm-subsection-title {
  font-size: 14px;
  font-weight: 600;
  margin: 16px 0 10px 0;
  color: #334155;
}

.dbm-subsection-title:first-child {
  margin-top: 0;
}

/* ─── Form ──────────────────────────────────────────────────── */

.dbm-field {
  margin-bottom: 16px;
}

.dbm-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
}

.dbm-label-hint {
  font-weight: 400;
  color: #94a3b8;
  margin-left: 6px;
  font-style: italic;
}

.dbm-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a2e;
  background: #f8fafc;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.dbm-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.dbm-input::placeholder {
  color: #94a3b8;
}

.dbm-slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  outline: none;
}

.dbm-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.dbm-slider-desir::-webkit-slider-thumb {
  background: #ef4444;
}

.dbm-slider-besoin::-webkit-slider-thumb {
  background: #22c55e;
}

.dbm-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.dbm-slider-desir::-moz-range-thumb {
  background: #ef4444;
}

.dbm-slider-besoin::-moz-range-thumb {
  background: #22c55e;
}

.dbm-slider-endpoints {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
}

.dbm-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a2e;
  background: #f8fafc;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
}

.dbm-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.dbm-form-actions {
  display: flex;
  gap: 10px;
}

.dbm-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s, opacity 0.15s;
}

.dbm-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dbm-btn-primary {
  background: #6366f1;
  color: #fff;
}

.dbm-btn-primary:hover:not(:disabled) {
  background: #4f46e5;
}

.dbm-btn-secondary {
  background: #e2e8f0;
  color: #475569;
}

.dbm-btn-secondary:hover {
  background: #cbd5e1;
}

/* ─── Mechanics list ────────────────────────────────────────── */

.dbm-mechanics-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dbm-mechanic-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: border-color 0.15s;
}

.dbm-mechanic-editing {
  border-color: #6366f1;
  background: #eef2ff;
}

.dbm-mechanic-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dbm-mechanic-info {
  flex: 1;
  min-width: 0;
}

.dbm-mechanic-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dbm-mechanic-meta {
  display: block;
  font-size: 12px;
  color: #94a3b8;
}

.dbm-mechanic-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.dbm-btn-icon {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #64748b;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s, color 0.15s;
}

.dbm-btn-icon:hover {
  background: #e2e8f0;
  color: #1a1a2e;
}

.dbm-btn-icon-danger:hover {
  background: #fee2e2;
  color: #dc2626;
}

/* ─── Analysis ──────────────────────────────────────────────── */

.dbm-distribution {
  margin-bottom: 12px;
}

.dbm-dist-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dbm-dist-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dbm-dist-label {
  font-size: 13px;
  font-weight: 600;
  width: 100px;
  flex-shrink: 0;
  text-align: right;
}

.dbm-dist-label-niveau {
  width: 50px;
}

.dbm-dist-bar-container {
  flex: 1;
  height: 14px;
  background: #f1f5f9;
  border-radius: 7px;
  overflow: hidden;
}

.dbm-dist-bar {
  height: 100%;
  border-radius: 7px;
  transition: width 0.3s ease;
  min-width: 0;
}

.dbm-dist-count {
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

/* ─── Messages ──────────────────────────────────────────────── */

.dbm-messages {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.dbm-message {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
}

.dbm-message-success {
  background: #f0fdf4;
  color: #166534;
  border-left: 4px solid #22c55e;
}

.dbm-message-warning {
  background: #fffbeb;
  color: #92400e;
  border-left: 4px solid #f59e0b;
}

.dbm-message-danger {
  background: #fef2f2;
  color: #991b1b;
  border-left: 4px solid #ef4444;
}

.dbm-message-info {
  background: #eff6ff;
  color: #1e40af;
  border-left: 4px solid #3b82f6;
}

/* ─── Hierarchy panel ───────────────────────────────────────── */

.dbm-hierarchy-panel {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-top: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.dbm-hierarchy-subtitle {
  font-size: 13px;
  color: #64748b;
  margin: -8px 0 20px 0;
}

.dbm-hierarchy-scale {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.dbm-hierarchy-level {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-left: 4px solid;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.15s;
}

.dbm-hierarchy-level:hover {
  background: #f8fafc;
}

.dbm-hierarchy-level:last-child {
  border-bottom: none;
}

.dbm-hierarchy-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  flex-shrink: 0;
}

.dbm-hierarchy-content {
  flex: 1;
  min-width: 0;
}

.dbm-hierarchy-name {
  font-size: 15px;
  color: #1a1a2e;
}

.dbm-hierarchy-name strong {
  font-weight: 700;
}

.dbm-hierarchy-type {
  font-size: 12px;
  color: #94a3b8;
  margin-left: 6px;
  font-style: italic;
}

.dbm-hierarchy-desc {
  font-size: 14px;
  color: #475569;
  margin-top: 2px;
  font-weight: 500;
}

.dbm-hierarchy-example {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

.dbm-hierarchy-count {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
