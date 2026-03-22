<script setup lang="ts">
import { ref, computed } from 'vue'

// --- Types ---

interface Criterion {
  key: string
  label: string
  low: string
  high: string
}

interface Mechanic {
  id: number
  name: string
  scores: Record<string, number>
}

// --- Constants ---

const criteria: Criterion[] = [
  {
    key: 'proxy',
    label: 'Proxy',
    low: 'La métrique est éloignée de l\'objectif réel',
    high: 'La métrique reflète directement le progrès réel',
  },
  {
    key: 'rythme',
    label: 'Rythme',
    low: 'Le rythme est imposé sans raison',
    high: 'Le rythme correspond au besoin naturel de l\'activité',
  },
  {
    key: 'motivation',
    label: 'Motivation',
    low: 'La motivation est purement extrinsèque',
    high: 'La motivation intrinsèque est préservée ou renforcée',
  },
  {
    key: 'identite',
    label: 'Identité',
    low: 'Construit une identité de joueur',
    high: 'Construit l\'identité souhaitée par l\'utilisateur',
  },
  {
    key: 'regret',
    label: 'Regret',
    low: 'L\'utilisateur pourrait regretter le temps passé',
    high: 'L\'utilisateur sera reconnaissant du temps investi',
  },
  {
    key: 'vie_reelle',
    label: 'Vie réelle',
    low: 'Aucun impact hors app',
    high: 'Impact positif mesurable sur la vie réelle',
  },
  {
    key: 'retrait',
    label: 'Retrait',
    low: 'Sans gamification, l\'utilisateur part',
    high: 'Sans gamification, l\'utilisateur resterait',
  },
]

const scoreColors: Record<number, string> = {
  1: '#e74c3c',
  2: '#e67e22',
  3: '#f1c40f',
  4: '#82cb5e',
  5: '#27ae60',
}

const scoreBgColors: Record<number, string> = {
  1: '#fdecea',
  2: '#fef3e6',
  3: '#fef9e7',
  4: '#eafaf1',
  5: '#d5f5e3',
}

// --- State ---

let nextId = 1
const mechanics = ref<Mechanic[]>([])
const withdrawalAnswer = ref<boolean | null>(null)

// --- Helpers ---

function createMechanic(): Mechanic {
  const scores: Record<string, number> = {}
  for (const c of criteria) {
    scores[c.key] = 3
  }
  return { id: nextId++, name: '', scores }
}

function addMechanic() {
  mechanics.value.push(createMechanic())
}

function removeMechanic(id: number) {
  mechanics.value = mechanics.value.filter((m) => m.id !== id)
}

// --- Computed ---

function mechanicScore(m: Mechanic): number {
  return Object.values(m.scores).reduce((a, b) => a + b, 0)
}

const overallScore = computed<number>(() => {
  if (mechanics.value.length === 0) return 0
  const total = mechanics.value.reduce((sum, m) => sum + mechanicScore(m), 0)
  return Math.round(total / mechanics.value.length)
})

const interpretation = computed(() => {
  const s = overallScore.value
  if (s >= 30) return { text: 'Excellent alignement', color: '#27ae60', bg: '#d5f5e3' }
  if (s >= 20) return { text: 'Bon alignement — quelques mécaniques à ajuster', color: '#82cb5e', bg: '#eafaf1' }
  if (s >= 10) return { text: 'Désalignement significatif — revoir la stratégie', color: '#e67e22', bg: '#fef3e6' }
  return { text: 'Gamification extractive — refonte nécessaire', color: '#e74c3c', bg: '#fdecea' }
})

const weakestCriterion = computed<{ key: string; label: string; avg: number } | null>(() => {
  if (mechanics.value.length === 0) return null

  let worstKey = ''
  let worstLabel = ''
  let worstAvg = Infinity

  for (const c of criteria) {
    const avg =
      mechanics.value.reduce((sum, m) => sum + m.scores[c.key], 0) / mechanics.value.length
    if (avg < worstAvg) {
      worstAvg = avg
      worstKey = c.key
      worstLabel = c.label
    }
  }

  return { key: worstKey, label: worstLabel, avg: Math.round(worstAvg * 10) / 10 }
})

function scoreBarWidth(score: number): string {
  return `${(score / 35) * 100}%`
}

function interpretationForMechanic(m: Mechanic) {
  const s = mechanicScore(m)
  if (s >= 30) return { color: '#27ae60' }
  if (s >= 20) return { color: '#82cb5e' }
  if (s >= 10) return { color: '#e67e22' }
  return { color: '#e74c3c' }
}
</script>

<template>
  <div class="ad-root">
    <header class="ad-header">
      <h2 class="ad-title">Diagnostic d'alignement</h2>
      <p class="ad-subtitle">
        Évaluez si vos mécaniques de gamification sont alignées avec les objectifs réels de vos
        utilisateurs.
      </p>
    </header>

    <!-- Empty state -->
    <div v-if="mechanics.length === 0" class="ad-empty">
      <p>Aucune mécanique ajoutée.</p>
      <p class="ad-empty-hint">
        Ajoutez vos mécaniques de gamification (Streak, Badges, Leaderboard, etc.) pour les
        évaluer.
      </p>
    </div>

    <!-- Desktop table view -->
    <div v-if="mechanics.length > 0" class="ad-table-wrapper">
      <table class="ad-table">
        <thead>
          <tr>
            <th class="ad-th-mechanic">Mécanique</th>
            <th
              v-for="c in criteria"
              :key="c.key"
              class="ad-th-criterion"
              :title="`1: ${c.low}\n5: ${c.high}`"
            >
              <span class="ad-th-label">{{ c.label }}</span>
            </th>
            <th class="ad-th-score">Score</th>
            <th class="ad-th-actions"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in mechanics" :key="m.id" class="ad-row">
            <td class="ad-td-name">
              <input
                v-model="m.name"
                type="text"
                class="ad-name-input"
                placeholder="Ex: Streak, Badges..."
              />
            </td>
            <td
              v-for="c in criteria"
              :key="c.key"
              class="ad-td-score"
              :style="{
                backgroundColor: scoreBgColors[m.scores[c.key]],
              }"
            >
              <select
                v-model.number="m.scores[c.key]"
                class="ad-score-select"
                :style="{ color: scoreColors[m.scores[c.key]] }"
                :title="`1: ${c.low}\n5: ${c.high}`"
              >
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
                <option :value="5">5</option>
              </select>
            </td>
            <td class="ad-td-total">
              <div class="ad-score-cell">
                <div class="ad-score-bar-track">
                  <div
                    class="ad-score-bar-fill"
                    :style="{
                      width: scoreBarWidth(mechanicScore(m)),
                      backgroundColor: interpretationForMechanic(m).color,
                    }"
                  ></div>
                </div>
                <span
                  class="ad-score-value"
                  :style="{ color: interpretationForMechanic(m).color }"
                >
                  {{ mechanicScore(m) }}/35
                </span>
              </div>
            </td>
            <td class="ad-td-actions">
              <button
                class="ad-btn-remove"
                @click="removeMechanic(m.id)"
                title="Supprimer cette mécanique"
                aria-label="Supprimer cette mécanique"
              >
                &times;
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile card view -->
    <div v-if="mechanics.length > 0" class="ad-cards">
      <div v-for="m in mechanics" :key="m.id" class="ad-card">
        <div class="ad-card-header">
          <input
            v-model="m.name"
            type="text"
            class="ad-name-input"
            placeholder="Ex: Streak, Badges..."
          />
          <button
            class="ad-btn-remove"
            @click="removeMechanic(m.id)"
            title="Supprimer cette mécanique"
            aria-label="Supprimer cette mécanique"
          >
            &times;
          </button>
        </div>
        <div class="ad-card-criteria">
          <div
            v-for="c in criteria"
            :key="c.key"
            class="ad-card-criterion"
            :style="{ backgroundColor: scoreBgColors[m.scores[c.key]] }"
          >
            <div class="ad-card-criterion-header">
              <span class="ad-card-criterion-label">{{ c.label }}</span>
              <select
                v-model.number="m.scores[c.key]"
                class="ad-score-select"
                :style="{ color: scoreColors[m.scores[c.key]] }"
              >
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
                <option :value="5">5</option>
              </select>
            </div>
            <div class="ad-card-criterion-desc">
              <span class="ad-desc-low">1: {{ c.low }}</span>
              <span class="ad-desc-high">5: {{ c.high }}</span>
            </div>
          </div>
        </div>
        <div class="ad-card-footer">
          <div class="ad-score-bar-track">
            <div
              class="ad-score-bar-fill"
              :style="{
                width: scoreBarWidth(mechanicScore(m)),
                backgroundColor: interpretationForMechanic(m).color,
              }"
            ></div>
          </div>
          <span class="ad-score-value" :style="{ color: interpretationForMechanic(m).color }">
            {{ mechanicScore(m) }}/35
          </span>
        </div>
      </div>
    </div>

    <!-- Criterion legend (tooltips for desktop) -->
    <details v-if="mechanics.length > 0" class="ad-legend">
      <summary class="ad-legend-toggle">Voir la légende des critères</summary>
      <div class="ad-legend-grid">
        <div v-for="c in criteria" :key="c.key" class="ad-legend-item">
          <strong>{{ c.label }}</strong>
          <div class="ad-legend-range">
            <span class="ad-legend-low">1 : {{ c.low }}</span>
            <span class="ad-legend-high">5 : {{ c.high }}</span>
          </div>
        </div>
      </div>
    </details>

    <!-- Add button -->
    <div class="ad-add-row">
      <button class="ad-btn-add" @click="addMechanic">+ Ajouter une mécanique</button>
    </div>

    <!-- Overall results -->
    <div v-if="mechanics.length > 0" class="ad-results">
      <div class="ad-overall" :style="{ backgroundColor: interpretation.bg }">
        <div class="ad-overall-score">
          <span class="ad-overall-number" :style="{ color: interpretation.color }">
            {{ overallScore }}
          </span>
          <span class="ad-overall-max">/35</span>
        </div>
        <div class="ad-overall-label">Score moyen du produit</div>
        <div class="ad-overall-interpretation" :style="{ color: interpretation.color }">
          {{ interpretation.text }}
        </div>
      </div>

      <!-- Weakest criterion -->
      <div v-if="weakestCriterion" class="ad-weakest">
        <div class="ad-weakest-icon">!</div>
        <div class="ad-weakest-content">
          <div class="ad-weakest-title">Point faible identifié</div>
          <div class="ad-weakest-detail">
            Le critère <strong>{{ weakestCriterion.label }}</strong> est le plus faible avec une
            moyenne de
            <strong :style="{ color: scoreColors[Math.round(weakestCriterion.avg)] || '#e67e22' }">
              {{ weakestCriterion.avg }}/5</strong
            >
            sur l'ensemble des mécaniques.
          </div>
        </div>
      </div>
    </div>

    <!-- Le test du retrait -->
    <section class="ad-withdrawal">
      <h3 class="ad-withdrawal-title">Le test du retrait</h3>
      <p class="ad-withdrawal-question">
        Si tu retirais <strong>TOUTE</strong> la gamification de ton produit demain — plus de
        points, plus de badges, plus de streaks, plus de niveaux — est-ce que ton produit aurait
        encore de la valeur ?
      </p>
      <div class="ad-withdrawal-buttons">
        <button
          :class="['ad-btn-withdrawal', { 'ad-btn-withdrawal--active': withdrawalAnswer === true }]"
          @click="withdrawalAnswer = true"
        >
          Oui
        </button>
        <button
          :class="[
            'ad-btn-withdrawal',
            { 'ad-btn-withdrawal--active': withdrawalAnswer === false },
          ]"
          @click="withdrawalAnswer = false"
        >
          Non
        </button>
      </div>
      <div v-if="withdrawalAnswer === true" class="ad-withdrawal-result ad-withdrawal-result--yes">
        <strong>Ta gamification est un accélérateur.</strong> Elle amplifie une valeur existante.
        C'est la bonne approche : le produit a de la valeur intrinsèque, et la gamification la
        renforce.
      </div>
      <div
        v-if="withdrawalAnswer === false"
        class="ad-withdrawal-result ad-withdrawal-result--no"
      >
        <strong>Ta gamification est un substitut.</strong> Elle masque l'absence de valeur réelle.
        C'est un problème fondamental. Avant d'optimiser la gamification, il faut d'abord
        construire un produit qui a de la valeur sans elle.
      </div>
    </section>
  </div>
</template>

<style scoped>
/* --- Reset & Root --- */
.ad-root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  color: #1a1a2e;
  line-height: 1.5;
}

/* --- Header --- */
.ad-header {
  margin-bottom: 28px;
}

.ad-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: #1a1a2e;
}

.ad-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
}

/* --- Empty state --- */
.ad-empty {
  text-align: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px dashed #d0d0d0;
  margin-bottom: 20px;
}

.ad-empty p {
  margin: 0 0 6px;
  color: #666;
}

.ad-empty-hint {
  font-size: 0.88rem;
  color: #999;
}

/* --- Desktop Table --- */
.ad-table-wrapper {
  overflow-x: auto;
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}

.ad-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 800px;
}

.ad-table thead {
  background: #f5f6fa;
}

.ad-table th {
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 0.82rem;
  color: #444;
  border-bottom: 2px solid #e0e0e0;
  white-space: nowrap;
}

.ad-th-mechanic {
  text-align: left;
  padding-left: 14px !important;
  min-width: 160px;
}

.ad-th-criterion {
  min-width: 70px;
  cursor: help;
}

.ad-th-score {
  min-width: 120px;
}

.ad-th-actions {
  width: 44px;
}

.ad-th-label {
  display: block;
}

/* --- Table rows --- */
.ad-row {
  border-bottom: 1px solid #eee;
  transition: background-color 0.15s;
}

.ad-row:hover {
  background-color: #fafbff;
}

.ad-td-name {
  padding: 10px 8px 10px 14px;
}

.ad-name-input {
  width: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 0.9rem;
  background: #fff;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.2s;
}

.ad-name-input:focus {
  border-color: #5b7fff;
  box-shadow: 0 0 0 2px rgba(91, 127, 255, 0.15);
}

.ad-name-input::placeholder {
  color: #aaa;
}

.ad-td-score {
  padding: 6px 4px;
  text-align: center;
  transition: background-color 0.2s;
}

.ad-score-select {
  width: 48px;
  height: 34px;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  background: #fff;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.ad-score-select:focus {
  border-color: #5b7fff;
  box-shadow: 0 0 0 2px rgba(91, 127, 255, 0.15);
}

.ad-td-total {
  padding: 10px 8px;
}

.ad-score-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ad-score-bar-track {
  flex: 1;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  min-width: 50px;
}

.ad-score-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.ad-score-value {
  font-weight: 700;
  font-size: 0.88rem;
  white-space: nowrap;
}

.ad-td-actions {
  padding: 10px 8px;
  text-align: center;
}

.ad-btn-remove {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: #f5f5f5;
  color: #888;
  font-size: 1.2rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s, color 0.15s;
  line-height: 1;
}

.ad-btn-remove:hover {
  background: #fee;
  color: #e74c3c;
}

/* --- Mobile Cards (hidden on desktop) --- */
.ad-cards {
  display: none;
}

/* --- Legend --- */
.ad-legend {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}

.ad-legend-toggle {
  padding: 12px 16px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  background: #f8f9fa;
  list-style: none;
  user-select: none;
}

.ad-legend-toggle::-webkit-details-marker {
  display: none;
}

.ad-legend-toggle::before {
  content: '\25B6';
  display: inline-block;
  margin-right: 8px;
  font-size: 0.7rem;
  transition: transform 0.2s;
}

details[open] > .ad-legend-toggle::before {
  transform: rotate(90deg);
}

.ad-legend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  padding: 16px;
}

.ad-legend-item {
  padding: 10px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.85rem;
}

.ad-legend-item strong {
  display: block;
  margin-bottom: 4px;
  color: #333;
}

.ad-legend-range {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ad-legend-low {
  color: #e74c3c;
  font-size: 0.82rem;
}

.ad-legend-high {
  color: #27ae60;
  font-size: 0.82rem;
}

/* --- Add button --- */
.ad-add-row {
  margin-bottom: 24px;
}

.ad-btn-add {
  padding: 10px 20px;
  border: 2px dashed #b0b8cc;
  border-radius: 8px;
  background: transparent;
  color: #5b7fff;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
  width: 100%;
}

.ad-btn-add:hover {
  border-color: #5b7fff;
  background: #f0f4ff;
}

/* --- Results --- */
.ad-results {
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ad-overall {
  text-align: center;
  padding: 28px 20px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.ad-overall-score {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
}

.ad-overall-number {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
}

.ad-overall-max {
  font-size: 1.4rem;
  font-weight: 600;
  color: #888;
}

.ad-overall-label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 6px;
}

.ad-overall-interpretation {
  font-size: 1.05rem;
  font-weight: 700;
  margin-top: 10px;
}

/* --- Weakest criterion --- */
.ad-weakest {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  background: #fff8e6;
  border: 1px solid #f0d060;
  border-radius: 10px;
}

.ad-weakest-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0d060;
  color: #7a5d00;
  font-weight: 800;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ad-weakest-content {
  flex: 1;
}

.ad-weakest-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #7a5d00;
  margin-bottom: 4px;
}

.ad-weakest-detail {
  font-size: 0.88rem;
  color: #555;
}

/* --- Withdrawal test --- */
.ad-withdrawal {
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.ad-withdrawal-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: #1a1a2e;
}

.ad-withdrawal-question {
  font-size: 0.95rem;
  color: #444;
  margin: 0 0 16px;
  line-height: 1.6;
}

.ad-withdrawal-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.ad-btn-withdrawal {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #d0d0d0;
  border-radius: 8px;
  background: #fff;
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}

.ad-btn-withdrawal:hover {
  border-color: #999;
}

.ad-btn-withdrawal--active {
  border-color: #5b7fff;
  background: #f0f4ff;
  color: #5b7fff;
}

.ad-withdrawal-result {
  padding: 16px 20px;
  border-radius: 8px;
  font-size: 0.92rem;
  line-height: 1.6;
}

.ad-withdrawal-result--yes {
  background: #d5f5e3;
  border: 1px solid #82cb5e;
  color: #1a5c2e;
}

.ad-withdrawal-result--no {
  background: #fdecea;
  border: 1px solid #e74c3c;
  color: #7a1a1a;
}

/* --- Responsive: Mobile --- */
@media (max-width: 768px) {
  .ad-root {
    padding: 16px;
  }

  .ad-title {
    font-size: 1.3rem;
  }

  /* Hide table on mobile, show cards */
  .ad-table-wrapper {
    display: none;
  }

  .ad-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
  }

  .ad-card {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
  }

  .ad-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 14px 10px;
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
  }

  .ad-card-header .ad-name-input {
    flex: 1;
  }

  .ad-card-criteria {
    display: flex;
    flex-direction: column;
  }

  .ad-card-criterion {
    padding: 12px 14px;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s;
  }

  .ad-card-criterion:last-child {
    border-bottom: none;
  }

  .ad-card-criterion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .ad-card-criterion-label {
    font-weight: 600;
    font-size: 0.9rem;
    color: #333;
  }

  .ad-card-criterion-desc {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .ad-desc-low,
  .ad-desc-high {
    font-size: 0.75rem;
    line-height: 1.3;
  }

  .ad-desc-low {
    color: #c0392b;
  }

  .ad-desc-high {
    color: #1e8449;
  }

  .ad-card-footer {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px;
    background: #f8f9fa;
    border-top: 1px solid #eee;
  }

  .ad-card-footer .ad-score-bar-track {
    flex: 1;
  }

  .ad-legend-grid {
    grid-template-columns: 1fr;
  }

  .ad-overall-number {
    font-size: 2.4rem;
  }

  .ad-withdrawal-buttons {
    flex-direction: column;
  }
}
</style>
