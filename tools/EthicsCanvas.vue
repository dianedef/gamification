<template>
  <div class="ethics-canvas">
    <header class="canvas-header">
      <h1>Persuasive Design Ethics Canvas</h1>
      <p class="canvas-subtitle">
        Outil d'evaluation ethique pour les mecaniques de gamification
      </p>
    </header>

    <!-- Section 1: Nom de la mecanique -->
    <section class="canvas-section">
      <div class="section-card">
        <h2 class="section-title">Mecanique evaluee</h2>
        <div class="field-group">
          <label for="mechanic-name" class="field-label">Nom de la mecanique</label>
          <input
            id="mechanic-name"
            v-model="mechanicName"
            type="text"
            class="text-input"
            placeholder="Ex: Streak quotidien, Leaderboard, Loot boxes..."
          />
        </div>
      </div>
    </section>

    <!-- Section 2-5: Radio grids -->
    <section class="canvas-section canvas-grid">
      <!-- Intention -->
      <div class="section-card">
        <h2 class="section-title">Intention</h2>
        <p class="section-description">Pourquoi cette mecanique ?</p>
        <div class="radio-group">
          <label
            v-for="option in intentionOptions"
            :key="option.value"
            class="radio-label"
            :class="{ selected: intention === option.value }"
          >
            <input
              v-model="intention"
              type="radio"
              name="intention"
              :value="option.value"
              class="radio-input"
            />
            <span class="radio-indicator"></span>
            <span class="radio-text">{{ option.label }}</span>
          </label>
        </div>
      </div>

      <!-- Impact utilisateur -->
      <div class="section-card">
        <h2 class="section-title">Impact utilisateur</h2>
        <p class="section-description">Quel effet reel sur l'utilisateur ?</p>
        <div class="radio-group">
          <label
            v-for="option in impactOptions"
            :key="option.value"
            class="radio-label"
            :class="{ selected: impact === option.value }"
          >
            <input
              v-model="impact"
              type="radio"
              name="impact"
              :value="option.value"
              class="radio-input"
            />
            <span class="radio-indicator"></span>
            <span class="radio-text">{{ option.label }}</span>
          </label>
        </div>
      </div>

      <!-- Transparence -->
      <div class="section-card">
        <h2 class="section-title">Transparence</h2>
        <p class="section-description">L'utilisateur sait comment ca fonctionne ?</p>
        <div class="radio-group">
          <label
            v-for="option in transparencyOptions"
            :key="option.value"
            class="radio-label"
            :class="{ selected: transparency === option.value }"
          >
            <input
              v-model="transparency"
              type="radio"
              name="transparency"
              :value="option.value"
              class="radio-input"
            />
            <span class="radio-indicator"></span>
            <span class="radio-text">{{ option.label }}</span>
          </label>
        </div>
      </div>

      <!-- Controle -->
      <div class="section-card">
        <h2 class="section-title">Controle</h2>
        <p class="section-description">L'utilisateur peut opt-out ?</p>
        <div class="radio-group">
          <label
            v-for="option in controlOptions"
            :key="option.value"
            class="radio-label"
            :class="{ selected: control === option.value }"
          >
            <input
              v-model="control"
              type="radio"
              name="control"
              :value="option.value"
              class="radio-input"
            />
            <span class="radio-indicator"></span>
            <span class="radio-text">{{ option.label }}</span>
          </label>
        </div>
      </div>
    </section>

    <!-- Section 6: Test de l'intention -->
    <section class="canvas-section">
      <div class="section-card">
        <h2 class="section-title">Le test de l'intention</h2>
        <p class="section-description">
          Pour chaque mecanique de gamification, posez-vous ces 3 questions.
          Si la reponse a l'une de ces questions est "non", reconsiderez la mecanique.
        </p>
        <div class="checkbox-group">
          <label
            v-for="(item, index) in intentionTestItems"
            :key="index"
            class="checkbox-label"
            :class="{ checked: intentionTest[index] }"
          >
            <input
              v-model="intentionTest[index]"
              type="checkbox"
              class="checkbox-input"
            />
            <span class="checkbox-indicator"></span>
            <span class="checkbox-text">{{ item }}</span>
          </label>
        </div>
      </div>
    </section>

    <!-- Section 7: ETHICAL framework -->
    <section class="canvas-section">
      <div class="section-card">
        <h2 class="section-title">Framework ETHICAL</h2>
        <p class="section-description">
          Evaluez votre mecanique selon les 7 principes du framework ETHICAL.
        </p>
        <div class="checkbox-group ethical-group">
          <label
            v-for="(item, index) in ethicalItems"
            :key="index"
            class="checkbox-label"
            :class="{ checked: ethical[index] }"
          >
            <input
              v-model="ethical[index]"
              type="checkbox"
              class="checkbox-input"
            />
            <span class="checkbox-indicator"></span>
            <span class="checkbox-text">
              <strong class="ethical-letter">{{ item.letter }}</strong>
              <span class="ethical-principle">{{ item.principle }}</span>
              <span class="ethical-question">{{ item.question }}</span>
            </span>
          </label>
        </div>
      </div>
    </section>

    <!-- Verdict -->
    <Transition name="verdict-transition">
      <section v-if="isFormStarted" class="canvas-section verdict-section">
        <div class="section-card verdict-card" :class="verdictClass">
          <h2 class="section-title">Verdict</h2>

          <div class="score-display">
            <div class="score-bar-container">
              <div class="score-bar" :style="{ width: scorePercentage + '%' }"></div>
            </div>
            <span class="score-value">{{ score }} / {{ maxScore }} points</span>
          </div>

          <div class="verdict-result">
            <span class="verdict-icon">{{ verdictIcon }}</span>
            <div class="verdict-text">
              <h3 class="verdict-level">{{ verdictLabel }}</h3>
              <p class="verdict-recommendation">{{ verdictDescription }}</p>
            </div>
          </div>

          <!-- Warnings -->
          <Transition name="warnings-transition">
            <div v-if="warnings.length > 0" class="warnings-container">
              <h4 class="warnings-title">Points d'attention</h4>
              <ul class="warnings-list">
                <li v-for="(warning, index) in warnings" :key="index" class="warning-item">
                  {{ warning }}
                </li>
              </ul>
            </div>
          </Transition>

          <!-- Recommendations -->
          <Transition name="recommendations-transition">
            <div v-if="recommendations.length > 0" class="recommendations-container">
              <h4 class="recommendations-title">Recommandations</h4>
              <ul class="recommendations-list">
                <li
                  v-for="(rec, index) in recommendations"
                  :key="index"
                  class="recommendation-item"
                >
                  {{ rec }}
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </section>
    </Transition>

    <!-- Reset -->
    <div v-if="isFormStarted" class="canvas-actions">
      <button class="reset-button" @click="resetForm">
        Reinitialiser le canvas
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// --- Reactive state ---

const mechanicName = ref('')

const intention = ref<string | null>(null)
const impact = ref<string | null>(null)
const transparency = ref<string | null>(null)
const control = ref<string | null>(null)

const intentionTest = reactive<boolean[]>([false, false, false])
const ethical = reactive<boolean[]>([false, false, false, false, false, false, false])

// --- Option definitions ---

const intentionOptions = [
  { value: 'user', label: "Aide l'utilisateur" },
  { value: 'business', label: 'Aide le business' },
  { value: 'both', label: 'Les deux' },
]

const impactOptions = [
  { value: 'positive', label: 'Positif' },
  { value: 'neutral', label: 'Neutre' },
  { value: 'negative', label: 'Negatif potentiel' },
]

const transparencyOptions = [
  { value: 'yes', label: 'Oui' },
  { value: 'partial', label: 'Partiellement' },
  { value: 'no', label: 'Non' },
]

const controlOptions = [
  { value: 'easy', label: 'Oui, facilement' },
  { value: 'hard', label: 'Oui, difficilement' },
  { value: 'no', label: 'Non' },
]

const intentionTestItems = [
  "Cette mecanique sert l'utilisateur, pas uniquement le business",
  "L'utilisateur serait d'accord s'il comprenait le mecanisme",
  "Je serais a l'aise si un journaliste ecrivait sur cette mecanique",
]

interface EthicalItem {
  letter: string
  principle: string
  question: string
}

const ethicalItems: EthicalItem[] = [
  {
    letter: 'E',
    principle: 'Empowerment',
    question: "Donne du pouvoir a l'utilisateur ?",
  },
  {
    letter: 'T',
    principle: 'Transparency',
    question: "L'utilisateur comprend le fonctionnement ?",
  },
  {
    letter: 'H',
    principle: 'Honesty',
    question: 'Pas de faux chiffres ?',
  },
  {
    letter: 'I',
    principle: 'Informed consent',
    question: 'Choix en connaissance de cause ?',
  },
  {
    letter: 'C',
    principle: 'Control',
    question: 'Opt-out facile ?',
  },
  {
    letter: 'A',
    principle: 'Accessibility',
    question: 'Accessible a tous, pas juste aux payants ?',
  },
  {
    letter: 'L',
    principle: 'Long-term wellbeing',
    question: "Sert le bien-etre long terme ?",
  },
]

// --- Scoring ---

// Weights: intention (3), impact (4), transparency (3), control (3),
//          intention test (2 each = 6), ethical (1 each = 7) => max = 26

const maxScore = 26

const score = computed<number>(() => {
  let s = 0

  // Intention (max 3)
  if (intention.value === 'user') s += 3
  else if (intention.value === 'both') s += 2
  else if (intention.value === 'business') s += 0

  // Impact (max 4)
  if (impact.value === 'positive') s += 4
  else if (impact.value === 'neutral') s += 2
  else if (impact.value === 'negative') s += 0

  // Transparency (max 3)
  if (transparency.value === 'yes') s += 3
  else if (transparency.value === 'partial') s += 1
  else if (transparency.value === 'no') s += 0

  // Control (max 3)
  if (control.value === 'easy') s += 3
  else if (control.value === 'hard') s += 1
  else if (control.value === 'no') s += 0

  // Intention test (2 per checkbox, max 6)
  for (let i = 0; i < intentionTest.length; i++) {
    if (intentionTest[i]) s += 2
  }

  // ETHICAL (1 per checkbox, max 7)
  for (let i = 0; i < ethical.length; i++) {
    if (ethical[i]) s += 1
  }

  return s
})

const scorePercentage = computed(() => {
  return Math.round((score.value / maxScore) * 100)
})

const isFormStarted = computed(() => {
  return (
    mechanicName.value.trim() !== '' ||
    intention.value !== null ||
    impact.value !== null ||
    transparency.value !== null ||
    control.value !== null ||
    intentionTest.some(Boolean) ||
    ethical.some(Boolean)
  )
})

// Verdict thresholds
type VerdictLevel = 'ethical' | 'caution' | 'dark'

const verdictLevel = computed<VerdictLevel>(() => {
  const pct = scorePercentage.value

  // Hard disqualifiers: if any of these are true, it is a dark pattern
  const hasCriticalFailure =
    impact.value === 'negative' &&
    transparency.value === 'no' &&
    control.value === 'no'

  if (hasCriticalFailure) return 'dark'

  // If intention is purely business with negative impact
  if (intention.value === 'business' && impact.value === 'negative') return 'dark'

  // Score-based thresholds
  if (pct >= 75) return 'ethical'
  if (pct >= 45) return 'caution'
  return 'dark'
})

const verdictClass = computed(() => `verdict-${verdictLevel.value}`)

const verdictIcon = computed(() => {
  switch (verdictLevel.value) {
    case 'ethical':
      return '\u2705'
    case 'caution':
      return '\u26A0\uFE0F'
    case 'dark':
      return '\u274C'
  }
})

const verdictLabel = computed(() => {
  switch (verdictLevel.value) {
    case 'ethical':
      return 'Ethique -- Implementer'
    case 'caution':
      return 'Attention -- Implementer avec garde-fous'
    case 'dark':
      return 'Dark pattern -- Ne pas implementer'
  }
})

const verdictDescription = computed(() => {
  switch (verdictLevel.value) {
    case 'ethical':
      return 'Cette mecanique respecte les principes ethiques de la gamification. Elle peut etre implementee en l\'etat.'
    case 'caution':
      return 'Cette mecanique presente des risques. Consultez les recommandations ci-dessous avant de l\'implementer.'
    case 'dark':
      return 'Cette mecanique presente des caracteristiques de dark pattern. Il est fortement deconseille de l\'implementer sous cette forme.'
  }
})

// --- Warnings ---

const warnings = computed<string[]>(() => {
  const w: string[] = []

  if (intention.value === 'business') {
    w.push("L'intention sert uniquement le business, pas l'utilisateur.")
  }

  if (impact.value === 'negative') {
    w.push("L'impact sur l'utilisateur est potentiellement negatif.")
  }

  if (transparency.value === 'no') {
    w.push("L'utilisateur ne sait pas comment cette mecanique fonctionne.")
  } else if (transparency.value === 'partial') {
    w.push("La transparence est partielle : l'utilisateur ne comprend pas entierement le mecanisme.")
  }

  if (control.value === 'no') {
    w.push("L'utilisateur ne peut pas desactiver cette mecanique (pas d'opt-out).")
  } else if (control.value === 'hard') {
    w.push("L'opt-out est difficile d'acces pour l'utilisateur.")
  }

  if (!intentionTest[0]) {
    w.push("Test de l'intention : la mecanique ne sert pas clairement l'utilisateur.")
  }
  if (!intentionTest[1]) {
    w.push("Test de l'intention : l'utilisateur ne serait pas d'accord s'il comprenait le mecanisme.")
  }
  if (!intentionTest[2]) {
    w.push("Test de l'intention : cette mecanique ne survivrait pas a un examen public.")
  }

  if (!ethical[0]) {
    w.push("ETHICAL (E) : cette mecanique ne donne pas de pouvoir a l'utilisateur.")
  }
  if (!ethical[1]) {
    w.push("ETHICAL (T) : le fonctionnement n'est pas compris par l'utilisateur.")
  }
  if (!ethical[2]) {
    w.push("ETHICAL (H) : risque de faux chiffres ou d'indicateurs trompeurs.")
  }
  if (!ethical[3]) {
    w.push("ETHICAL (I) : le consentement eclaire n'est pas garanti.")
  }
  if (!ethical[4]) {
    w.push("ETHICAL (C) : l'opt-out n'est pas facile.")
  }
  if (!ethical[5]) {
    w.push("ETHICAL (A) : la mecanique n'est pas accessible a tous de maniere equitable.")
  }
  if (!ethical[6]) {
    w.push("ETHICAL (L) : le bien-etre long terme de l'utilisateur n'est pas pris en compte.")
  }

  return w
})

// --- Recommendations ---

const recommendations = computed<string[]>(() => {
  const r: string[] = []

  if (intention.value === 'business') {
    r.push("Reconsiderez l'intention : la mecanique devrait servir l'utilisateur en priorite, pas uniquement les metriques business.")
  }

  if (impact.value === 'negative') {
    r.push("Analysez l'impact reel sur l'utilisateur : testez avec des utilisateurs et mesurez les signaux d'anxiete, de culpabilite ou de frustration.")
  }

  if (transparency.value !== 'yes') {
    r.push("Ameliorez la transparence : expliquez clairement a l'utilisateur comment fonctionne cette mecanique et pourquoi elle existe.")
  }

  if (control.value !== 'easy') {
    r.push("Rendez l'opt-out facile et accessible : l'utilisateur doit pouvoir desactiver cette mecanique en un clic depuis ses parametres.")
  }

  if (!intentionTest[0] || !intentionTest[1]) {
    r.push("Appliquez le test de l'intention de Deterding : cette mecanique developpe-t-elle de bonnes qualites ? Les droits de l'utilisateur sont-ils respectes ?")
  }

  if (!intentionTest[2]) {
    r.push("Soumettez cette mecanique au test du journaliste : seriez-vous a l'aise si elle faisait la une ?")
  }

  const uncheckedEthical = ethical.filter((v) => !v).length
  if (uncheckedEthical >= 4) {
    r.push("Trop de criteres ETHICAL echouent. Repensez cette mecanique en profondeur avant de l'implementer.")
  } else if (uncheckedEthical >= 2) {
    r.push("Plusieurs criteres ETHICAL ne sont pas remplis. Ajoutez des garde-fous specifiques pour chaque critere en echec.")
  }

  if (!ethical[0]) {
    r.push("Empowerment : donnez plus de choix et d'autonomie a l'utilisateur dans cette mecanique.")
  }
  if (!ethical[5]) {
    r.push("Accessibilite : assurez-vous que cette mecanique est accessible a tous, independamment du pouvoir d'achat.")
  }
  if (!ethical[6]) {
    r.push("Bien-etre long terme : integrez des limites de temps, un mode zen, ou des rappels de pause.")
  }

  return r
})

// --- Reset ---

function resetForm(): void {
  mechanicName.value = ''
  intention.value = null
  impact.value = null
  transparency.value = null
  control.value = null
  for (let i = 0; i < intentionTest.length; i++) {
    intentionTest[i] = false
  }
  for (let i = 0; i < ethical.length; i++) {
    ethical[i] = false
  }
}
</script>

<style scoped>
/* --- CSS Variables --- */
.ethics-canvas {
  --color-green-50: #f0fdf4;
  --color-green-100: #dcfce7;
  --color-green-200: #bbf7d0;
  --color-green-500: #22c55e;
  --color-green-600: #16a34a;
  --color-green-700: #15803d;
  --color-green-800: #166534;

  --color-orange-50: #fff7ed;
  --color-orange-100: #ffedd5;
  --color-orange-200: #fed7aa;
  --color-orange-500: #f97316;
  --color-orange-600: #ea580c;
  --color-orange-700: #c2410c;
  --color-orange-800: #9a3412;

  --color-red-50: #fef2f2;
  --color-red-100: #fee2e2;
  --color-red-200: #fecaca;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    sans-serif;
  max-width: 860px;
  margin: 0 auto;
  padding: 24px 16px 48px;
  color: var(--color-gray-800);
  line-height: 1.6;
}

/* --- Header --- */
.canvas-header {
  text-align: center;
  margin-bottom: 32px;
}

.canvas-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.canvas-subtitle {
  font-size: 1rem;
  color: var(--color-gray-500);
  margin: 0;
}

/* --- Sections --- */
.canvas-section {
  margin-bottom: 20px;
}

.canvas-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 640px) {
  .canvas-grid {
    grid-template-columns: 1fr;
  }
}

/* --- Cards --- */
.section-card {
  background: #fff;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-normal);
}

.section-card:hover {
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0 0 4px;
}

.section-description {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  margin: 0 0 16px;
}

/* --- Text Input --- */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-600);
}

.text-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--color-gray-800);
  background: var(--color-gray-50);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  box-sizing: border-box;
}

.text-input::placeholder {
  color: var(--color-gray-400);
}

.text-input:focus {
  outline: none;
  border-color: var(--color-green-500);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
}

/* --- Radio group --- */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
}

.radio-label:hover {
  background: var(--color-gray-50);
  border-color: var(--color-gray-300);
}

.radio-label.selected {
  background: var(--color-green-50);
  border-color: var(--color-green-500);
}

.radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-indicator {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-gray-300);
  border-radius: 50%;
  transition: all var(--transition-fast);
  position: relative;
}

.radio-indicator::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-green-500);
  transform: scale(0);
  transition: transform var(--transition-fast);
}

.radio-label.selected .radio-indicator {
  border-color: var(--color-green-500);
}

.radio-label.selected .radio-indicator::after {
  transform: scale(1);
}

.radio-text {
  font-size: 0.925rem;
  color: var(--color-gray-700);
}

/* --- Checkbox group --- */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
}

.checkbox-label:hover {
  background: var(--color-gray-50);
  border-color: var(--color-gray-300);
}

.checkbox-label.checked {
  background: var(--color-green-50);
  border-color: var(--color-green-500);
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-indicator {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-gray-300);
  border-radius: 4px;
  margin-top: 1px;
  transition: all var(--transition-fast);
  position: relative;
}

.checkbox-indicator::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 5px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform var(--transition-fast);
}

.checkbox-label.checked .checkbox-indicator {
  background: var(--color-green-500);
  border-color: var(--color-green-500);
}

.checkbox-label.checked .checkbox-indicator::after {
  transform: rotate(45deg) scale(1);
}

.checkbox-text {
  font-size: 0.925rem;
  color: var(--color-gray-700);
  line-height: 1.5;
}

/* --- ETHICAL framework specifics --- */
.ethical-group .checkbox-text {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 8px;
}

.ethical-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--color-gray-100);
  color: var(--color-gray-700);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.checkbox-label.checked .ethical-letter {
  background: var(--color-green-200);
  color: var(--color-green-800);
}

.ethical-principle {
  font-weight: 600;
  color: var(--color-gray-800);
}

.ethical-question {
  color: var(--color-gray-500);
  font-size: 0.875rem;
  flex-basis: 100%;
}

/* --- Verdict section --- */
.verdict-card {
  border-width: 2px;
  transition: all var(--transition-normal);
}

.verdict-card.verdict-ethical {
  border-color: var(--color-green-500);
  background: var(--color-green-50);
}

.verdict-card.verdict-caution {
  border-color: var(--color-orange-500);
  background: var(--color-orange-50);
}

.verdict-card.verdict-dark {
  border-color: var(--color-red-500);
  background: var(--color-red-50);
}

/* --- Score display --- */
.score-display {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.score-bar-container {
  flex: 1;
  height: 10px;
  background: var(--color-gray-200);
  border-radius: 5px;
  overflow: hidden;
}

.score-bar {
  height: 100%;
  border-radius: 5px;
  transition: width var(--transition-slow), background-color var(--transition-normal);
}

.verdict-ethical .score-bar {
  background: var(--color-green-500);
}

.verdict-caution .score-bar {
  background: var(--color-orange-500);
}

.verdict-dark .score-bar {
  background: var(--color-red-500);
}

.score-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-gray-600);
  white-space: nowrap;
}

/* --- Verdict result --- */
.verdict-result {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
}

.verdict-icon {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

.verdict-text {
  flex: 1;
}

.verdict-level {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 4px;
}

.verdict-ethical .verdict-level {
  color: var(--color-green-700);
}

.verdict-caution .verdict-level {
  color: var(--color-orange-700);
}

.verdict-dark .verdict-level {
  color: var(--color-red-700);
}

.verdict-recommendation {
  font-size: 0.925rem;
  color: var(--color-gray-600);
  margin: 0;
}

/* --- Warnings --- */
.warnings-container {
  margin-bottom: 16px;
}

.warnings-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 8px;
}

.verdict-ethical .warnings-title {
  color: var(--color-green-700);
}

.verdict-caution .warnings-title {
  color: var(--color-orange-700);
}

.verdict-dark .warnings-title {
  color: var(--color-red-700);
}

.warnings-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.warning-item {
  font-size: 0.875rem;
  color: var(--color-gray-700);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.5);
  border-left: 3px solid;
}

.verdict-ethical .warning-item {
  border-left-color: var(--color-green-400);
}

.verdict-caution .warning-item {
  border-left-color: var(--color-orange-400);
}

.verdict-dark .warning-item {
  border-left-color: var(--color-red-400);
}

/* --- Recommendations --- */
.recommendations-container {
  margin-top: 4px;
}

.recommendations-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--color-gray-700);
}

.recommendations-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.recommendation-item {
  font-size: 0.875rem;
  color: var(--color-gray-700);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.7);
  border-left: 3px solid var(--color-gray-300);
}

/* --- Reset button --- */
.canvas-actions {
  text-align: center;
  margin-top: 8px;
}

.reset-button {
  padding: 10px 24px;
  font-size: 0.925rem;
  font-weight: 500;
  color: var(--color-gray-600);
  background: #fff;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.reset-button:hover {
  background: var(--color-gray-50);
  border-color: var(--color-gray-400);
  color: var(--color-gray-800);
}

.reset-button:active {
  transform: scale(0.97);
}

/* --- Transitions --- */
.verdict-transition-enter-active {
  transition: all var(--transition-slow);
}

.verdict-transition-leave-active {
  transition: all var(--transition-normal);
}

.verdict-transition-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.verdict-transition-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.warnings-transition-enter-active,
.recommendations-transition-enter-active {
  transition: all var(--transition-normal);
}

.warnings-transition-leave-active,
.recommendations-transition-leave-active {
  transition: all var(--transition-fast);
}

.warnings-transition-enter-from,
.recommendations-transition-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.warnings-transition-leave-to,
.recommendations-transition-leave-to {
  opacity: 0;
}

/* --- Responsive --- */
@media (max-width: 640px) {
  .ethics-canvas {
    padding: 16px 12px 36px;
  }

  .canvas-header h1 {
    font-size: 1.35rem;
  }

  .section-card {
    padding: 18px;
  }

  .verdict-result {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .score-display {
    flex-direction: column;
    gap: 8px;
  }

  .score-bar-container {
    width: 100%;
  }
}
</style>
