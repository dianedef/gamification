<template>
  <div class="service-audit">
    <header class="audit-header">
      <h1>Audit de Service</h1>
      <p class="subtitle">
        Ton produit sert-il l'utilisateur ou l'exploite-t-il ?
        Reponds honnetement a chaque question.
      </p>
    </header>

    <!-- Test de la porte ouverte -->
    <section class="open-door-section">
      <div class="section-card door-card">
        <div class="section-badge">Prealable</div>
        <h2>Le test de la porte ouverte</h2>
        <p class="door-question">
          Si tu ouvrais la porte et disais
          <em>&laquo; Tu peux partir quand tu veux, sans consequence &raquo;</em>,
          ton utilisateur resterait-il ?
        </p>
        <div class="door-options">
          <button
            v-for="(option, idx) in doorOptions"
            :key="idx"
            :class="[
              'door-option-btn',
              { selected: doorAnswer === idx },
              option.type
            ]"
            @click="doorAnswer = idx"
          >
            <span class="door-option-label">{{ option.label }}</span>
            <span v-if="doorAnswer === idx" class="door-interpretation">
              {{ option.interpretation }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Score gauge -->
    <section class="gauge-section" v-if="answeredCount > 0">
      <div class="section-card gauge-card">
        <h2>Score actuel</h2>
        <div class="gauge-container">
          <div class="gauge-bar-track">
            <div
              class="gauge-bar-fill"
              :style="{
                width: gaugePercent + '%',
                backgroundColor: scoreColor
              }"
            ></div>
          </div>
          <div class="gauge-labels">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
        <div class="score-display">
          <span class="score-number" :style="{ color: scoreColor }">
            {{ animatedScore }}
          </span>
          <span class="score-total">/ 10</span>
        </div>
        <p class="score-verdict" :style="{ color: scoreColor }">
          {{ verdictLabel }}
        </p>
        <p class="score-message" v-if="verdictMessage">
          {{ verdictMessage }}
        </p>
        <div class="answered-indicator">
          {{ answeredCount }} / 10 questions repondues
        </div>
      </div>
    </section>

    <!-- Audit questions -->
    <section class="questions-section">
      <h2 class="questions-title">Les 10 questions de l'audit</h2>
      <div
        v-for="(q, idx) in questions"
        :key="idx"
        :class="[
          'question-card',
          {
            'answered-oui': answers[idx] === 'oui',
            'answered-non': answers[idx] === 'non',
            'answered-pasur': answers[idx] === 'pasur'
          }
        ]"
      >
        <div class="question-number">{{ idx + 1 }}</div>
        <div class="question-body">
          <p class="question-text">{{ q.text }}</p>
          <div class="answer-buttons">
            <button
              :class="['btn-answer', 'btn-oui', { active: answers[idx] === 'oui' }]"
              @click="setAnswer(idx, 'oui')"
            >
              Oui
            </button>
            <button
              :class="['btn-answer', 'btn-non', { active: answers[idx] === 'non' }]"
              @click="setAnswer(idx, 'non')"
            >
              Non
            </button>
            <button
              :class="['btn-answer', 'btn-pasur', { active: answers[idx] === 'pasur' }]"
              @click="setAnswer(idx, 'pasur')"
            >
              Pas sur
            </button>
          </div>
          <!-- Feedback for Non -->
          <div v-if="answers[idx] === 'non'" class="feedback feedback-non">
            <span class="feedback-icon">!</span>
            <span>{{ q.recommendation }}</span>
          </div>
          <!-- Feedback for Pas sur -->
          <div v-if="answers[idx] === 'pasur'" class="feedback feedback-pasur">
            <span class="feedback-icon">?</span>
            <span>A investiguer</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary / Results -->
    <section v-if="allAnswered" class="summary-section">
      <div class="section-card summary-card">
        <h2>Resultat de l'audit</h2>

        <!-- Final score display -->
        <div class="final-score">
          <div class="final-gauge">
            <svg viewBox="0 0 120 120" class="circular-gauge">
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="#e8e8e8"
                stroke-width="10"
              />
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                :stroke="scoreColor"
                stroke-width="10"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference - (circumference * score / 10)"
                class="gauge-circle-fill"
              />
            </svg>
            <div class="final-score-text">
              <span class="final-score-number" :style="{ color: scoreColor }">
                {{ score }}
              </span>
              <span class="final-score-label">/ 10</span>
            </div>
          </div>
          <div class="final-verdict">
            <h3 :style="{ color: scoreColor }">{{ verdictLabel }}</h3>
            <p>{{ verdictMessage }}</p>
          </div>
        </div>

        <!-- Recap of all answers -->
        <div class="answer-recap">
          <h3>Detail des reponses</h3>
          <div
            v-for="(q, idx) in questions"
            :key="'recap-' + idx"
            :class="[
              'recap-row',
              'recap-' + answers[idx]
            ]"
          >
            <span class="recap-num">{{ idx + 1 }}.</span>
            <span class="recap-status">
              <span v-if="answers[idx] === 'oui'" class="status-badge badge-oui">Oui</span>
              <span v-else-if="answers[idx] === 'non'" class="status-badge badge-non">Non</span>
              <span v-else class="status-badge badge-pasur">Pas sur</span>
            </span>
            <span class="recap-text">{{ q.shortText }}</span>
          </div>
        </div>

        <!-- Prochaines actions -->
        <div v-if="topPriorities.length > 0" class="next-actions">
          <h3>Prochaines actions</h3>
          <p class="actions-intro">
            Voici les {{ topPriorities.length > 3 ? 3 : topPriorities.length }}
            priorite(s) basee(s) sur tes reponses &laquo; Non &raquo; :
          </p>
          <ol class="priority-list">
            <li
              v-for="(p, idx) in topPriorities.slice(0, 3)"
              :key="'priority-' + idx"
              class="priority-item"
            >
              <strong>Question {{ p.num }} :</strong> {{ p.action }}
            </li>
          </ol>
        </div>

        <!-- Pas sur items -->
        <div v-if="unsureItems.length > 0" class="unsure-actions">
          <h3>Points a investiguer</h3>
          <ul class="unsure-list">
            <li
              v-for="(u, idx) in unsureItems"
              :key="'unsure-' + idx"
              class="unsure-item"
            >
              <strong>Question {{ u.num }} :</strong> {{ u.text }}
            </li>
          </ul>
        </div>

        <!-- Reset -->
        <button class="btn-reset" @click="resetAll">
          Recommencer l'audit
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

type Answer = 'oui' | 'non' | 'pasur' | null

interface Question {
  text: string
  shortText: string
  recommendation: string
  action: string
}

interface DoorOption {
  label: string
  interpretation: string
  type: 'service' | 'retention' | 'extraction' | 'best'
}

const doorOptions: DoorOption[] = [
  {
    label: 'Oui, parce que c\'est utile',
    interpretation: 'Service — Le produit a une valeur intrinseque. Tu es dans la bonne posture.',
    type: 'service'
  },
  {
    label: 'Oui, mais j\'ai peur de perdre mon streak/donnees',
    interpretation: 'Retention par cout irrecuperable — C\'est un piege, pas un service. L\'utilisateur reste par peur, pas par choix.',
    type: 'retention'
  },
  {
    label: 'Non, il part, il attendait l\'occasion',
    interpretation: 'Extraction — L\'utilisateur est prisonnier, pas client. Il faut repenser toute la proposition de valeur.',
    type: 'extraction'
  },
  {
    label: 'Non, il part parce qu\'il a atteint son objectif',
    interpretation: 'Meilleur scenario — Tu l\'as aide. Il reviendra peut-etre, ou il te recommandera. C\'est ca, servir.',
    type: 'best'
  }
]

const questions: Question[] = [
  {
    text: 'Si l\'utilisateur voyait ton code et tes A/B tests, serait-il d\'accord avec ce que tu fais ?',
    shortText: 'Transparence du code et des A/B tests',
    recommendation: 'Applique le principe de transparence : ne fais rien que tu ne pourrais montrer a tes utilisateurs.',
    action: 'Audite tes A/B tests en cours et supprime ceux qui ne servent pas l\'utilisateur.'
  },
  {
    text: 'Peux-tu expliquer chaque mecanique de gamification en termes de benefice POUR L\'UTILISATEUR ?',
    shortText: 'Benefice utilisateur de chaque mecanique',
    recommendation: 'Documente chaque mecanique avec un benefice clair pour l\'utilisateur — si tu ne peux pas, supprime-la.',
    action: 'Liste chaque mecanique de gamification et ecris son benefice utilisateur. Supprime celles sans benefice clair.'
  },
  {
    text: 'L\'utilisateur peut-il atteindre son objectif ET partir sans penalite ?',
    shortText: 'Depart sans penalite',
    recommendation: 'Assure-toi que l\'utilisateur peut exporter ses donnees et partir sans friction ni culpabilisation.',
    action: 'Implemente un parcours de depart propre : export de donnees, pas de culpabilisation, message de gratitude.'
  },
  {
    text: 'Investis-tu autant d\'energie dans le "laisser partir" que dans le "faire rester" ?',
    shortText: 'Equilibre onboarding/offboarding',
    recommendation: 'Investis autant dans l\'offboarding que dans l\'onboarding.',
    action: 'Concois un offboarding aussi soigne que ton onboarding : export, remerciement, porte ouverte au retour.'
  },
  {
    text: 'Ta gamification fonctionne-t-elle sans notifications push ?',
    shortText: 'Independance aux notifications push',
    recommendation: 'Ta valeur doit exister sans sollicitation. Si la gamification s\'effondre sans push, c\'est de la manipulation.',
    action: 'Desactive les notifications push pendant une semaine et mesure l\'impact. Renforce la valeur intrinseque.'
  },
  {
    text: 'Un parent serait-il a l\'aise de voir son enfant utiliser ta gamification ?',
    shortText: 'Test du parent',
    recommendation: 'Si un parent serait mal a l\'aise, c\'est que tes mecaniques exploitent des vulnerabilites psychologiques.',
    action: 'Fais tester ta gamification par un panel de parents et note leurs reactions. Ajuste les mecaniques problematiques.'
  },
  {
    text: 'Tes metriques de succes incluent-elles l\'impact sur la vie reelle de l\'utilisateur ?',
    shortText: 'Metriques d\'impact reel',
    recommendation: 'Ajoute des metriques de service (objectif atteint, competence acquise, transfert vie reelle) a ton tableau de bord.',
    action: 'Ajoute au moins 2 metriques d\'impact reel a ton dashboard : "objectif atteint" et "application dans la vie reelle".'
  },
  {
    text: 'As-tu un mode "sans gamification" pour ceux qui n\'en veulent pas ?',
    shortText: 'Mode sans gamification',
    recommendation: 'Offre un mode sans gamification. Si ton produit ne tient pas sans, c\'est que la gamification masque un manque de valeur.',
    action: 'Implemente un toggle "Mode sans gamification" et verifie que le produit reste fonctionnel et utile sans.'
  },
  {
    text: 'Quand un utilisateur est en difficulte (streak perdu, classement bas), ton app l\'aide-t-elle ou l\'enfonce-t-elle ?',
    shortText: 'Soutien en cas de difficulte',
    recommendation: 'Transforme chaque moment de difficulte en moment de soutien, pas en levier de culpabilisation.',
    action: 'Revois tous les messages affiches apres un "echec" (streak perdu, etc.) et remplace la culpabilisation par l\'encouragement.'
  },
  {
    text: 'Serais-tu fier de presenter ta strategie de gamification a un panel d\'ethiciens ?',
    shortText: 'Fierte ethique',
    recommendation: 'Si tu ne pourrais pas presenter ta strategie a un panel d\'ethiciens, c\'est qu\'elle ne respecte pas tes propres valeurs.',
    action: 'Organise une revue ethique interne de ta strategie de gamification avec des criteres clairs de service vs extraction.'
  }
]

const answers = ref<Answer[]>(new Array(10).fill(null))
const doorAnswer = ref<number | null>(null)
const animatedScore = ref(0)

function setAnswer(idx: number, value: Answer) {
  if (answers.value[idx] === value) {
    answers.value[idx] = null
  } else {
    answers.value[idx] = value
  }
}

const score = computed(() => {
  return answers.value.filter(a => a === 'oui').length
})

const answeredCount = computed(() => {
  return answers.value.filter(a => a !== null).length
})

const allAnswered = computed(() => {
  return answeredCount.value === 10
})

const gaugePercent = computed(() => {
  return (score.value / 10) * 100
})

const circumference = 2 * Math.PI * 52

const scoreColor = computed(() => {
  if (score.value >= 8) return '#16a34a'
  if (score.value >= 5) return '#ea580c'
  return '#dc2626'
})

const verdictLabel = computed(() => {
  if (!allAnswered.value && answeredCount.value === 0) return ''
  if (score.value >= 8) return 'Posture de service forte'
  if (score.value >= 5) return 'Posture mixte — des choses a revoir'
  return 'Posture d\'extraction — refonte necessaire'
})

const verdictMessage = computed(() => {
  if (!allAnswered.value) return ''
  if (score.value >= 8) {
    return 'Felicitations. Ta gamification sert reellement l\'utilisateur. Continue a maintenir ce cap et a questionner tes pratiques regulierement.'
  }
  if (score.value >= 5) {
    return 'Ta posture est partagee entre service et extraction. Les points "Non" meritent une attention immediate. C\'est le moment d\'ajuster le tir.'
  }
  return 'Attention : la majorite de tes mecaniques semblent extraire plus qu\'elles ne servent. Une refonte de ta strategie de gamification est necessaire pour passer d\'une logique d\'extraction a une logique de service.'
})

const topPriorities = computed(() => {
  return answers.value
    .map((a, idx) => ({
      answer: a,
      num: idx + 1,
      action: questions[idx].action
    }))
    .filter(item => item.answer === 'non')
})

const unsureItems = computed(() => {
  return answers.value
    .map((a, idx) => ({
      answer: a,
      num: idx + 1,
      text: questions[idx].shortText
    }))
    .filter(item => item.answer === 'pasur')
})

// Animated score counter
let animationFrame: number | null = null
watch(score, (newVal) => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  const start = animatedScore.value
  const diff = newVal - start
  const duration = 400
  const startTime = performance.now()

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    animatedScore.value = Math.round(start + diff * eased)
    if (progress < 1) {
      animationFrame = requestAnimationFrame(step)
    }
  }
  animationFrame = requestAnimationFrame(step)
})

function resetAll() {
  answers.value = new Array(10).fill(null)
  doorAnswer.value = null
  animatedScore.value = 0
}
</script>

<style scoped>
.service-audit {
  --color-oui: #16a34a;
  --color-non: #dc2626;
  --color-pasur: #ca8a04;
  --color-service: #16a34a;
  --color-retention: #ea580c;
  --color-extraction: #dc2626;
  --color-best: #2563eb;
  --color-bg: #f8fafc;
  --color-card: #ffffff;
  --color-border: #e2e8f0;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --radius: 12px;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
  max-width: 780px;
  margin: 0 auto;
  padding: 24px 16px 64px;
  line-height: 1.6;
}

/* Header */
.audit-header {
  text-align: center;
  margin-bottom: 40px;
}

.audit-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  margin: 0;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}

/* Section card shared */
.section-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 28px 24px;
  box-shadow: var(--shadow);
}

.section-card h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 16px;
}

/* Open door section */
.open-door-section {
  margin-bottom: 32px;
}

.door-card {
  position: relative;
}

.section-badge {
  position: absolute;
  top: -10px;
  left: 20px;
  background: var(--color-text);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 3px 10px;
  border-radius: 20px;
}

.door-question {
  font-size: 1.05rem;
  color: var(--color-text);
  margin: 0 0 20px;
}

.door-question em {
  font-style: italic;
  color: var(--color-text-muted);
}

.door-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.door-option-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 14px 18px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-card);
  cursor: pointer;
  text-align: left;
  font-size: 0.95rem;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.door-option-btn:hover {
  border-color: #94a3b8;
  background: #f1f5f9;
}

.door-option-btn.selected.service {
  border-color: var(--color-service);
  background: #f0fdf4;
}

.door-option-btn.selected.retention {
  border-color: var(--color-retention);
  background: #fff7ed;
}

.door-option-btn.selected.extraction {
  border-color: var(--color-extraction);
  background: #fef2f2;
}

.door-option-btn.selected.best {
  border-color: var(--color-best);
  background: #eff6ff;
}

.door-option-label {
  font-weight: 600;
}

.door-interpretation {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  padding-top: 2px;
  border-top: 1px solid var(--color-border);
  width: 100%;
}

/* Gauge section */
.gauge-section {
  margin-bottom: 32px;
  position: sticky;
  top: 12px;
  z-index: 10;
}

.gauge-card {
  box-shadow: var(--shadow-lg);
}

.gauge-container {
  margin-bottom: 8px;
}

.gauge-bar-track {
  width: 100%;
  height: 12px;
  background: #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
}

.gauge-bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.5s cubic-bezier(0.33, 1, 0.68, 1),
              background-color 0.5s ease;
}

.gauge-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 4px;
  padding: 0 2px;
}

.score-display {
  text-align: center;
  margin-top: 8px;
}

.score-number {
  font-size: 2.5rem;
  font-weight: 800;
  transition: color 0.4s ease;
}

.score-total {
  font-size: 1.2rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.score-verdict {
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  margin: 4px 0 0;
  transition: color 0.4s ease;
}

.score-message {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin: 6px 0 0;
}

.answered-indicator {
  text-align: center;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-top: 8px;
}

/* Questions section */
.questions-section {
  margin-bottom: 32px;
}

.questions-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 20px;
}

.question-card {
  display: flex;
  gap: 16px;
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  padding: 20px;
  margin-bottom: 14px;
  box-shadow: var(--shadow);
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.question-card.answered-oui {
  border-color: var(--color-oui);
  background: #f7fef9;
}

.question-card.answered-non {
  border-color: var(--color-non);
  background: #fefafa;
}

.question-card.answered-pasur {
  border-color: var(--color-pasur);
  background: #fefcf3;
}

.question-number {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f1f5f9;
  color: var(--color-text-muted);
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.answered-oui .question-number {
  background: var(--color-oui);
  color: #fff;
}

.answered-non .question-number {
  background: var(--color-non);
  color: #fff;
}

.answered-pasur .question-number {
  background: var(--color-pasur);
  color: #fff;
}

.question-body {
  flex: 1;
  min-width: 0;
}

.question-text {
  font-size: 0.98rem;
  font-weight: 500;
  margin: 0 0 14px;
  line-height: 1.55;
}

.answer-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-answer {
  padding: 8px 20px;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-card);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  transition: all 0.15s ease;
}

.btn-answer:hover {
  background: #f1f5f9;
}

.btn-oui.active {
  border-color: var(--color-oui);
  background: var(--color-oui);
  color: #fff;
}

.btn-non.active {
  border-color: var(--color-non);
  background: var(--color-non);
  color: #fff;
}

.btn-pasur.active {
  border-color: var(--color-pasur);
  background: var(--color-pasur);
  color: #fff;
}

/* Feedback */
.feedback {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  animation: feedback-in 0.3s ease;
}

@keyframes feedback-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feedback-non {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.feedback-pasur {
  background: #fefce8;
  border: 1px solid #fde68a;
  color: #854d0e;
}

.feedback-icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.8rem;
}

.feedback-non .feedback-icon {
  background: #dc2626;
  color: #fff;
}

.feedback-pasur .feedback-icon {
  background: #ca8a04;
  color: #fff;
}

/* Summary section */
.summary-section {
  animation: summary-in 0.5s ease;
}

@keyframes summary-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.summary-card {
  box-shadow: var(--shadow-lg);
}

.summary-card h2 {
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 24px;
}

/* Final score */
.final-score {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-bottom: 32px;
  justify-content: center;
  flex-wrap: wrap;
}

.final-gauge {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.circular-gauge {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.gauge-circle-fill {
  transition: stroke-dashoffset 0.8s cubic-bezier(0.33, 1, 0.68, 1),
              stroke 0.5s ease;
}

.final-score-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.final-score-number {
  font-size: 2rem;
  font-weight: 800;
  display: block;
  line-height: 1;
}

.final-score-label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.final-verdict {
  flex: 1;
  min-width: 200px;
}

.final-verdict h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 6px;
}

.final-verdict p {
  color: var(--color-text-muted);
  font-size: 0.93rem;
  margin: 0;
  line-height: 1.55;
}

/* Answer recap */
.answer-recap {
  margin-bottom: 28px;
}

.answer-recap h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.recap-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 4px;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.recap-row:hover {
  background: #f8fafc;
}

.recap-num {
  flex-shrink: 0;
  width: 24px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.recap-status {
  flex-shrink: 0;
  width: 64px;
}

.status-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 700;
}

.badge-oui {
  background: #dcfce7;
  color: #166534;
}

.badge-non {
  background: #fee2e2;
  color: #991b1b;
}

.badge-pasur {
  background: #fef9c3;
  color: #854d0e;
}

.recap-text {
  flex: 1;
  color: var(--color-text-muted);
}

/* Next actions */
.next-actions,
.unsure-actions {
  margin-bottom: 24px;
}

.next-actions h3,
.unsure-actions h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 8px;
}

.actions-intro {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: 0 0 12px;
}

.priority-list {
  margin: 0;
  padding-left: 20px;
}

.priority-item {
  padding: 8px 0;
  font-size: 0.93rem;
  line-height: 1.5;
  border-bottom: 1px solid var(--color-border);
}

.priority-item:last-child {
  border-bottom: none;
}

.priority-item strong {
  color: var(--color-non);
}

.unsure-list {
  margin: 0;
  padding-left: 20px;
  list-style-type: disc;
}

.unsure-item {
  padding: 6px 0;
  font-size: 0.93rem;
  line-height: 1.5;
}

.unsure-item strong {
  color: var(--color-pasur);
}

/* Reset button */
.btn-reset {
  display: block;
  margin: 20px auto 0;
  padding: 12px 32px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-card);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-reset:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}

/* Responsive */
@media (max-width: 640px) {
  .service-audit {
    padding: 16px 12px 48px;
  }

  .audit-header h1 {
    font-size: 1.5rem;
  }

  .section-card {
    padding: 20px 16px;
  }

  .question-card {
    flex-direction: column;
    gap: 10px;
    padding: 16px;
  }

  .question-number {
    width: 30px;
    height: 30px;
    font-size: 0.85rem;
  }

  .answer-buttons {
    gap: 6px;
  }

  .btn-answer {
    padding: 7px 14px;
    font-size: 0.85rem;
  }

  .final-score {
    flex-direction: column;
    text-align: center;
  }

  .score-number {
    font-size: 2rem;
  }

  .gauge-section {
    position: static;
  }

  .door-option-btn {
    padding: 12px 14px;
    font-size: 0.88rem;
  }

  .recap-row {
    font-size: 0.83rem;
  }

  .recap-text {
    display: none;
  }
}
</style>
