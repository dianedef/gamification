<template>
  <div class="portrait-empathique">
    <header class="pe-header">
      <h1>Portrait Empathique</h1>
      <p class="pe-subtitle">
        Concevoir pour des personnes, pas des utilisateurs.
      </p>
    </header>

    <!-- Progress indicator -->
    <nav class="pe-stepper">
      <ol class="pe-steps">
        <li
          v-for="(section, idx) in sections"
          :key="idx"
          class="pe-step"
          :class="{
            'pe-step--active': currentStep === idx,
            'pe-step--completed': currentStep > idx,
            'pe-step--summary': idx === sections.length - 1 && showSummary
          }"
          @click="goToStep(idx)"
        >
          <span class="pe-step-number">{{ idx + 1 }}</span>
          <span class="pe-step-label">{{ section.shortTitle }}</span>
        </li>
      </ol>
      <div class="pe-progress-bar">
        <div
          class="pe-progress-fill"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
    </nav>

    <!-- Wizard sections -->
    <main v-if="!showSummary" class="pe-main">
      <transition name="pe-slide" mode="out-in">
        <section :key="currentStep" class="pe-section">
          <div class="pe-section-header">
            <span class="pe-section-number">{{ currentStep + 1 }}</span>
            <div>
              <h2 class="pe-section-title">{{ sections[currentStep].title }}</h2>
              <p class="pe-section-description">{{ sections[currentStep].description }}</p>
            </div>
          </div>

          <div class="pe-fields">
            <div
              v-for="field in sections[currentStep].fields"
              :key="field.key"
              class="pe-field"
            >
              <label :for="field.key" class="pe-label">
                {{ field.label }}
                <span v-if="field.hint" class="pe-hint">{{ field.hint }}</span>
              </label>

              <input
                v-if="field.type === 'text'"
                :id="field.key"
                v-model="formData[field.key]"
                type="text"
                class="pe-input"
                :placeholder="field.placeholder"
              />

              <textarea
                v-if="field.type === 'textarea'"
                :id="field.key"
                v-model="formData[field.key]"
                class="pe-textarea"
                :placeholder="field.placeholder"
                rows="3"
              ></textarea>

              <select
                v-if="field.type === 'select'"
                :id="field.key"
                v-model="formData[field.key]"
                class="pe-select"
              >
                <option value="" disabled>{{ field.placeholder }}</option>
                <option
                  v-for="opt in field.options"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>

              <input
                v-if="field.type === 'number'"
                :id="field.key"
                v-model.number="formData[field.key]"
                type="number"
                class="pe-input pe-input--number"
                :placeholder="field.placeholder"
                min="1"
                max="480"
              />
            </div>
          </div>
        </section>
      </transition>

      <!-- Navigation buttons -->
      <div class="pe-nav">
        <button
          v-if="currentStep > 0"
          class="pe-btn pe-btn--secondary"
          @click="prevStep"
        >
          &larr; Pr&eacute;c&eacute;dent
        </button>
        <div v-else class="pe-nav-spacer"></div>

        <button
          v-if="currentStep < sections.length - 1"
          class="pe-btn pe-btn--primary"
          @click="nextStep"
        >
          Suivant &rarr;
        </button>
        <button
          v-else
          class="pe-btn pe-btn--primary pe-btn--finish"
          @click="showSummary = true"
        >
          Voir le portrait
        </button>
      </div>
    </main>

    <!-- Summary view -->
    <main v-else class="pe-main">
      <div class="pe-summary">
        <div class="pe-card">
          <div class="pe-card-header">
            <div class="pe-card-avatar">
              {{ initials }}
            </div>
            <div>
              <h2 class="pe-card-name">
                Portrait Empathique : {{ formData.prenom || '...' }}
              </h2>
              <p class="pe-card-meta">
                {{ phaseLabel }} &middot; {{ tempsLabel }}
              </p>
            </div>
          </div>

          <!-- Section 1 summary -->
          <div class="pe-card-section">
            <h3 class="pe-card-section-title">Sa vie en ce moment</h3>
            <dl class="pe-card-dl">
              <div class="pe-card-dl-row" v-if="formData.situation">
                <dt>Situation</dt>
                <dd>{{ formData.situation }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.preoccupation">
                <dt>Pr&eacute;occupation principale</dt>
                <dd>{{ formData.preoccupation }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.tempsLibre">
                <dt>Temps libre</dt>
                <dd>{{ tempsLabel }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.phaseVie">
                <dt>Phase de vie</dt>
                <dd>{{ phaseLabel }}</dd>
              </div>
            </dl>
          </div>

          <!-- Section 2 summary -->
          <div class="pe-card-section">
            <h3 class="pe-card-section-title">Ce qu'il/elle veut (conscient)</h3>
            <dl class="pe-card-dl">
              <div class="pe-card-dl-row" v-if="formData.pourquoiOuvert">
                <dt>Pourquoi ce produit</dt>
                <dd>{{ formData.pourquoiOuvert }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.diraitSiDemande">
                <dt>Ce qu'il/elle dirait</dt>
                <dd>{{ formData.diraitSiDemande }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.resultatConcret">
                <dt>R&eacute;sultat attendu</dt>
                <dd>{{ formData.resultatConcret }}</dd>
              </div>
            </dl>
          </div>

          <!-- Section 3 summary -->
          <div class="pe-card-section">
            <h3 class="pe-card-section-title">Ce qu'il/elle veut vraiment (profond)</h3>
            <dl class="pe-card-dl">
              <div class="pe-card-dl-row" v-if="formData.identite">
                <dt>Identit&eacute; vis&eacute;e</dt>
                <dd>{{ formData.identite }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.peur">
                <dt>Peur</dt>
                <dd>{{ formData.peur }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.fierte">
                <dt>Fiert&eacute;</dt>
                <dd>{{ formData.fierte }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.besoinEmotionnel">
                <dt>Besoin &eacute;motionnel dominant</dt>
                <dd>{{ besoinLabel }}</dd>
              </div>
            </dl>
          </div>

          <!-- Section 4 summary -->
          <div class="pe-card-section">
            <h3 class="pe-card-section-title">Sa relation avec notre produit</h3>
            <dl class="pe-card-dl">
              <div class="pe-card-dl-row" v-if="formData.momentUtilisation">
                <dt>Moment d'utilisation</dt>
                <dd>{{ momentLabel }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.etatEmotionnel">
                <dt>&Eacute;tat &eacute;motionnel</dt>
                <dd>{{ etatLabel }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.minutesSession">
                <dt>Minutes par session</dt>
                <dd>{{ formData.minutesSession }} min</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.reviendrait">
                <dt>Ce qui le/la ferait revenir</dt>
                <dd>{{ formData.reviendrait }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.partirait">
                <dt>Ce qui le/la ferait partir</dt>
                <dd>{{ formData.partirait }}</dd>
              </div>
            </dl>
          </div>

          <!-- Section 5 summary -->
          <div class="pe-card-section">
            <h3 class="pe-card-section-title">Notre responsabilit&eacute;</h3>
            <dl class="pe-card-dl">
              <div class="pe-card-dl-row" v-if="formData.aiderSansNuire">
                <dt>Aider sans nuire</dt>
                <dd>{{ formData.aiderSansNuire }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.gamificationAppropriee">
                <dt>Gamification appropri&eacute;e</dt>
                <dd>{{ formData.gamificationAppropriee }}</dd>
              </div>
              <div class="pe-card-dl-row" v-if="formData.pasBesoin">
                <dt>Pas besoin de notre part</dt>
                <dd>{{ formData.pasBesoin }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="pe-recommandations">
          <h3 class="pe-recommandations-title">Recommandations</h3>
          <p class="pe-recommandations-intro">
            Conseils contextuels bas&eacute;s sur le profil de {{ formData.prenom || 'cette personne' }}.
          </p>
          <div
            v-for="(rec, idx) in recommendations"
            :key="idx"
            class="pe-rec"
            :class="'pe-rec--' + rec.type"
          >
            <div class="pe-rec-icon">
              <span v-if="rec.type === 'warning'">!</span>
              <span v-else-if="rec.type === 'suggestion'">+</span>
              <span v-else-if="rec.type === 'adapt'">~</span>
              <span v-else>*</span>
            </div>
            <div class="pe-rec-content">
              <strong class="pe-rec-category">{{ rec.category }}</strong>
              <p class="pe-rec-text">{{ rec.text }}</p>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="pe-actions">
          <button class="pe-btn pe-btn--secondary" @click="showSummary = false">
            &larr; Modifier le portrait
          </button>
          <button class="pe-btn pe-btn--primary" @click="exportMarkdown">
            {{ exportLabel }}
          </button>
          <button class="pe-btn pe-btn--ghost" @click="resetForm">
            Nouveau portrait
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// ─── Types ──────────────────────────────────────────────

interface SelectOption {
  value: string
  label: string
}

interface FormField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'number'
  placeholder: string
  hint?: string
  options?: SelectOption[]
}

interface Section {
  title: string
  shortTitle: string
  description: string
  fields: FormField[]
}

interface Recommendation {
  category: string
  text: string
  type: 'warning' | 'suggestion' | 'adapt' | 'emphasis'
}

// ─── Form data ──────────────────────────────────────────

const formData = reactive<Record<string, string | number>>({
  prenom: '',
  situation: '',
  preoccupation: '',
  tempsLibre: '',
  phaseVie: '',
  pourquoiOuvert: '',
  diraitSiDemande: '',
  resultatConcret: '',
  identite: '',
  peur: '',
  fierte: '',
  besoinEmotionnel: '',
  momentUtilisation: '',
  etatEmotionnel: '',
  minutesSession: '',
  reviendrait: '',
  partirait: '',
  aiderSansNuire: '',
  gamificationAppropriee: '',
  pasBesoin: '',
})

// ─── Section definitions ────────────────────────────────

const sections: Section[] = [
  {
    title: 'Sa vie en ce moment',
    shortTitle: 'Sa vie',
    description: 'Comprendre la personne dans son contexte de vie actuel, au-dela de son role d\'utilisateur.',
    fields: [
      {
        key: 'prenom',
        label: 'Prenom',
        type: 'text',
        placeholder: 'Ex : Sarah, Thomas, Amina...',
        hint: 'Donner un prenom rend la personne reelle.',
      },
      {
        key: 'situation',
        label: 'Ou en est-il/elle dans sa vie ?',
        type: 'textarea',
        placeholder: 'Ex : Maman d\'un enfant de 18 mois, en reconversion dans le developpement web. Se forme le soir apres le coucher de l\'enfant.',
      },
      {
        key: 'preoccupation',
        label: 'Quelle est sa plus grande preoccupation ?',
        type: 'textarea',
        placeholder: 'Ex : Syndrome de l\'imposteur massif — « Je suis trop vieille pour commencer »',
      },
      {
        key: 'tempsLibre',
        label: 'Combien de temps libre a-t-il/elle vraiment ?',
        type: 'select',
        placeholder: 'Choisir une tranche...',
        options: [
          { value: 'moins30', label: 'Moins de 30 min/jour' },
          { value: '30a1h', label: '30 min a 1h/jour' },
          { value: '1a2h', label: '1 a 2h/jour' },
          { value: 'plus2h', label: 'Plus de 2h/jour' },
        ],
      },
      {
        key: 'phaseVie',
        label: 'Phase de vie',
        type: 'select',
        placeholder: 'Choisir une phase...',
        options: [
          { value: 'etudiant', label: 'Etudiant' },
          { value: 'jeunePro', label: 'Jeune professionnel' },
          { value: 'parent', label: 'Parent' },
          { value: 'proEtabli', label: 'Professionnel etabli' },
          { value: 'transition', label: 'En transition' },
          { value: 'retraite', label: 'Retraite' },
        ],
      },
    ],
  },
  {
    title: 'Ce qu\'il/elle veut (conscient)',
    shortTitle: 'Conscient',
    description: 'Les motivations explicites — ce que la personne dirait si on lui demandait pourquoi elle est la.',
    fields: [
      {
        key: 'pourquoiOuvert',
        label: 'Pourquoi a-t-il/elle ouvert ce produit ?',
        type: 'textarea',
        placeholder: 'Ex : Apprendre le developpement web pour trouver un emploi flexible.',
        hint: 'Pas « quel canal d\'acquisition » — quel probleme dans sa vie l\'a pousse a chercher une solution.',
      },
      {
        key: 'diraitSiDemande',
        label: 'Qu\'est-ce qu\'il/elle dirait si on lui demandait ?',
        type: 'textarea',
        placeholder: 'Ex : « Je veux finir ma formation avant la fin de mon conge parental. »',
      },
      {
        key: 'resultatConcret',
        label: 'Quel resultat concret attend-il/elle ?',
        type: 'textarea',
        placeholder: 'Ex : Obtenir un certificat qui prouve ses competences, decrocher un premier stage.',
      },
    ],
  },
  {
    title: 'Ce qu\'il/elle veut vraiment (profond)',
    shortTitle: 'Profond',
    description: 'Les aspirations profondes — l\'identite, les peurs, les besoins emotionnels reels.',
    fields: [
      {
        key: 'identite',
        label: 'Quelle identite veut-il/elle construire ?',
        type: 'textarea',
        placeholder: 'Ex : Prouver qu\'elle peut se reinventer — « Je suis quelqu\'un qui apprend »',
        hint: 'Le changement durable vient de l\'identite, pas des recompenses.',
      },
      {
        key: 'peur',
        label: 'De quoi a-t-il/elle peur ?',
        type: 'textarea',
        placeholder: 'Ex : Perdre tout son progres, etre jugee par les plus jeunes, ne pas y arriver a temps.',
      },
      {
        key: 'fierte',
        label: 'Qu\'est-ce qui le/la rendrait fier/fiere ?',
        type: 'textarea',
        placeholder: 'Ex : Montrer a son enfant qu\'on peut toujours apprendre, decrocher son premier emploi tech.',
      },
      {
        key: 'besoinEmotionnel',
        label: 'Besoin emotionnel dominant',
        type: 'select',
        placeholder: 'Choisir un besoin...',
        hint: 'Quel niveau de la pyramide des aspirations est le plus en jeu ?',
        options: [
          { value: 'securite', label: 'Securite — Savoir que je controle ma situation' },
          { value: 'appartenance', label: 'Appartenance — Ne pas etre seul dans ce parcours' },
          { value: 'reconnaissance', label: 'Reconnaissance — Que les autres voient ma valeur' },
          { value: 'realisation', label: 'Realisation — Devenir la personne que je veux etre' },
          { value: 'transcendance', label: 'Sens / Transcendance — Contribuer a quelque chose de plus grand' },
        ],
      },
    ],
  },
  {
    title: 'Sa relation avec notre produit',
    shortTitle: 'Produit',
    description: 'Comment, quand, et dans quel etat la personne interagit avec notre produit.',
    fields: [
      {
        key: 'momentUtilisation',
        label: 'Quand utilise-t-il/elle notre produit ?',
        type: 'select',
        placeholder: 'Choisir un moment...',
        options: [
          { value: 'matinTot', label: 'Matin tot (avant 8h)' },
          { value: 'journee', label: 'En journee (8h-17h)' },
          { value: 'pauseDej', label: 'Pause dejeuner (12h-14h)' },
          { value: 'soir', label: 'Le soir (17h-22h)' },
          { value: 'nuit', label: 'La nuit (apres 22h)' },
        ],
      },
      {
        key: 'etatEmotionnel',
        label: 'Dans quel etat emotionnel ?',
        type: 'select',
        placeholder: 'Choisir un etat...',
        options: [
          { value: 'motive', label: 'Motive — Pret a relever des defis' },
          { value: 'curieux', label: 'Curieux — Envie de decouvrir' },
          { value: 'ennuye', label: 'Ennuye — Cherche une stimulation' },
          { value: 'anxieux', label: 'Anxieux — Besoin de controle et structure' },
          { value: 'epuise', label: 'Epuise — Veut le minimum viable' },
        ],
      },
      {
        key: 'minutesSession',
        label: 'Combien de minutes realistes par session ?',
        type: 'number',
        placeholder: 'Ex : 15',
        hint: 'Soyez honnete — pas combien vous aimeriez, combien realiste.',
      },
      {
        key: 'reviendrait',
        label: 'Qu\'est-ce qui le/la ferait revenir demain ?',
        type: 'textarea',
        placeholder: 'Ex : Voir un progres concret, retrouver exactement la ou elle s\'etait arretee.',
      },
      {
        key: 'partirait',
        label: 'Qu\'est-ce qui le/la ferait partir pour toujours ?',
        type: 'textarea',
        placeholder: 'Ex : Perdre son progres, se sentir jugee, recevoir des notifications culpabilisantes.',
      },
    ],
  },
  {
    title: 'Notre responsabilite',
    shortTitle: 'Responsabilite',
    description: 'Ce que nous nous engageons a faire — et a ne pas faire — pour cette personne.',
    fields: [
      {
        key: 'aiderSansNuire',
        label: 'Comment pouvons-nous l\'aider sans lui nuire ?',
        type: 'textarea',
        placeholder: 'Ex : Celebrer le courage de se former le soir a 21h apres une journee de maman. Sauvegarder son progres de facon fiable.',
        hint: 'La question la plus importante de ce portrait.',
      },
      {
        key: 'gamificationAppropriee',
        label: 'Quelle gamification est APPROPRIEE pour cette personne ?',
        type: 'textarea',
        placeholder: 'Ex : Progression personnelle (pas de comparaison), streak hebdomadaire (pas quotidien), badges de competences reelles.',
      },
      {
        key: 'pasBesoin',
        label: 'De quoi n\'a-t-il/elle PAS besoin de notre part ?',
        type: 'textarea',
        placeholder: 'Ex : Pas de leaderboard, pas de notifications avant 9h ni apres 20h, pas de gamification agressive.',
      },
    ],
  },
]

// ─── State ──────────────────────────────────────────────

const currentStep = ref(0)
const showSummary = ref(false)
const exportLabel = ref('Exporter en Markdown')

// ─── Computed ───────────────────────────────────────────

const progressPercent = computed(() => {
  if (showSummary.value) return 100
  return ((currentStep.value + 1) / sections.length) * 100
})

const initials = computed(() => {
  const name = String(formData.prenom || '')
  if (!name.trim()) return '?'
  return name.trim().charAt(0).toUpperCase()
})

const labelMaps: Record<string, Record<string, string>> = {
  tempsLibre: {
    moins30: 'Moins de 30 min/jour',
    '30a1h': '30 min a 1h/jour',
    '1a2h': '1 a 2h/jour',
    plus2h: 'Plus de 2h/jour',
  },
  phaseVie: {
    etudiant: 'Etudiant',
    jeunePro: 'Jeune professionnel',
    parent: 'Parent',
    proEtabli: 'Professionnel etabli',
    transition: 'En transition',
    retraite: 'Retraite',
  },
  besoinEmotionnel: {
    securite: 'Securite',
    appartenance: 'Appartenance',
    reconnaissance: 'Reconnaissance',
    realisation: 'Realisation',
    transcendance: 'Sens / Transcendance',
  },
  momentUtilisation: {
    matinTot: 'Matin tot',
    journee: 'En journee',
    pauseDej: 'Pause dejeuner',
    soir: 'Le soir',
    nuit: 'La nuit',
  },
  etatEmotionnel: {
    motive: 'Motive',
    curieux: 'Curieux',
    ennuye: 'Ennuye',
    anxieux: 'Anxieux',
    epuise: 'Epuise',
  },
}

function getLabel(field: string): string {
  const val = String(formData[field] || '')
  return labelMaps[field]?.[val] || val || '...'
}

const tempsLabel = computed(() => getLabel('tempsLibre'))
const phaseLabel = computed(() => getLabel('phaseVie'))
const besoinLabel = computed(() => getLabel('besoinEmotionnel'))
const momentLabel = computed(() => getLabel('momentUtilisation'))
const etatLabel = computed(() => getLabel('etatEmotionnel'))

// ─── Recommendations engine ─────────────────────────────

const recommendations = computed<Recommendation[]>(() => {
  const recs: Recommendation[] = []
  const phase = String(formData.phaseVie || '')
  const temps = String(formData.tempsLibre || '')
  const etat = String(formData.etatEmotionnel || '')
  const besoin = String(formData.besoinEmotionnel || '')
  const moment = String(formData.momentUtilisation || '')
  const minutes = Number(formData.minutesSession) || 0

  // Phase de vie recommendations
  if (phase === 'parent') {
    recs.push({
      category: 'Phase de vie : Parent',
      text: 'Ne jamais culpabiliser pour un streak manque. Le streak quotidien est potentiellement cruel pour un parent de nourrisson. Privilegier un streak hebdomadaire et ne pas envoyer de notifications avant 9h ni apres 20h.',
      type: 'warning',
    })
  }
  if (phase === 'etudiant') {
    recs.push({
      category: 'Phase de vie : Etudiant',
      text: 'Attention a la vulnerabilite face a l\'addiction et au FOMO. Le cortex prefrontal n\'est pas encore mature — privilegier des badges qui refletent de vrais accomplissements, pas du temps passe. Eviter la comparaison sociale toxique.',
      type: 'warning',
    })
  }
  if (phase === 'jeunePro') {
    recs.push({
      category: 'Phase de vie : Jeune professionnel',
      text: 'Syndrome de l\'imposteur frequent. Privilegier la progression personnelle plutot que comparative : « Tu as progresse de 40% ce mois-ci » plutot que « Tu es 847eme ». Celebrer les victoires, meme petites.',
      type: 'suggestion',
    })
  }
  if (phase === 'proEtabli') {
    recs.push({
      category: 'Phase de vie : Professionnel etabli',
      text: 'Eviter toute gamification infantilisante. Respecter son expertise existante — ne pas commencer au « Niveau 1 : Neophyte ». Le mentorat et la transmission sont des leviers puissants. Les urgences artificielles ne fonctionnent plus.',
      type: 'warning',
    })
  }
  if (phase === 'transition') {
    recs.push({
      category: 'Phase de vie : En transition',
      text: 'Population la plus vulnerable. Zero penalite d\'absence. Messages de « bon retour ». Progres qui ne se perdent jamais. Flexibilite absolue, zero pression. La moindre « punition » peut etre devastatrice.',
      type: 'warning',
    })
  }
  if (phase === 'retraite') {
    recs.push({
      category: 'Phase de vie : Retraite',
      text: 'Privilegier le sens et la transmission. Cette personne cherche a laisser une trace et contribuer. Le rythme doit etre choisi, pas impose. Valoriser l\'experience et la sagesse accumulee.',
      type: 'suggestion',
    })
  }

  // Temps libre recommendations
  if (temps === 'moins30') {
    recs.push({
      category: 'Temps libre : Tres limite',
      text: 'Chaque minute dans l\'app est une minute en moins pour le reste de sa vie. Sessions ultra-courtes, pas d\'engagement quotidien obligatoire. Mecaniques a faible charge cognitive (points simples, feedback immediat). Eviter les quetes multi-etapes.',
      type: 'adapt',
    })
  }
  if (temps === '30a1h') {
    recs.push({
      category: 'Temps libre : Moderee',
      text: 'Sessions de 15-30 minutes ideales. Une mecanique de progression legere est appropriee. Eviter les streaks quotidiens stricts — privilegier la constance sur le long terme. Sauvegarder le progres de facon fiable.',
      type: 'adapt',
    })
  }
  if (temps === 'plus2h') {
    recs.push({
      category: 'Temps libre : Abondant',
      text: 'Des parcours plus profonds sont possibles, mais attention a ne pas creer de dependance. Proposer des pauses naturelles. Valoriser la qualite du temps passe, pas la quantite. Prevoir des « points de sortie » sains.',
      type: 'adapt',
    })
  }

  // Etat emotionnel recommendations
  if (etat === 'anxieux') {
    recs.push({
      category: 'Etat emotionnel : Anxieux',
      text: 'Privilegier la structure claire, le progres mesurable, la previsibilite. Eviter absolument les comptes a rebours, la competition, et l\'urgence artificielle. Ton rassurant et bienveillant.',
      type: 'adapt',
    })
  }
  if (etat === 'epuise') {
    recs.push({
      category: 'Etat emotionnel : Epuise',
      text: 'Mode simplifie obligatoire. Pas de choix complexes, pas de tutoriels, pas de gamification agressive. Le minimum viable. Cette personne a besoin qu\'on respecte son energie limitee.',
      type: 'warning',
    })
  }
  if (etat === 'ennuye') {
    recs.push({
      category: 'Etat emotionnel : Ennuye',
      text: 'Contenu nouveau, surprises, variete. Les recompenses inattendues fonctionnent bien. Eviter la repetition et le contenu deja vu. C\'est le moment ideal pour les decouvertes et deblocages.',
      type: 'suggestion',
    })
  }
  if (etat === 'motive') {
    recs.push({
      category: 'Etat emotionnel : Motive',
      text: 'Le bon moment pour les challenges et objectifs clairs. Mais ne pas prendre cette energie pour acquise — elle fluctue. Stocker la motivation dans des mecaniques durables (identite, competences), pas juste des recompenses ephemeres.',
      type: 'suggestion',
    })
  }
  if (etat === 'curieux') {
    recs.push({
      category: 'Etat emotionnel : Curieux',
      text: 'Ideal pour le contenu a debloquer, les secrets, les parcours d\'exploration. Ne pas gatekeep le savoir derriere trop de mecaniques. Nourrir la curiosite naturelle plutot que la remplacer par des recompenses externes.',
      type: 'suggestion',
    })
  }

  // Besoin emotionnel dominant → Core Drives
  if (besoin === 'securite') {
    recs.push({
      category: 'Besoin dominant : Securite',
      text: 'Core Drives a privilegier : Ownership & Possession (CD4), Development & Accomplishment (CD2). Progres sauvegarde, pas de perte, feedback clair. Jamais de reset de streak ou perte de points. La fiabilite est la priorite absolue.',
      type: 'emphasis',
    })
  }
  if (besoin === 'appartenance') {
    recs.push({
      category: 'Besoin dominant : Appartenance',
      text: 'Core Drives a privilegier : Social Influence & Relatedness (CD5). Communaute, equipes, mentorat. Eviter les leaderboards qui isolent et la competition toxique. Le collectif doit primer sur l\'individuel.',
      type: 'emphasis',
    })
  }
  if (besoin === 'reconnaissance') {
    recs.push({
      category: 'Besoin dominant : Reconnaissance',
      text: 'Core Drives a privilegier : Empowerment of Creativity (CD3), Development & Accomplishment (CD2). Badges significatifs, profil public, celebrations. Les badges doivent refleter de vrais accomplissements — pas d\'inflation de points ni reconnaissance automatisee.',
      type: 'emphasis',
    })
  }
  if (besoin === 'realisation') {
    recs.push({
      category: 'Besoin dominant : Realisation',
      text: 'Core Drives a privilegier : Development & Accomplishment (CD2), Empowerment of Creativity (CD3). Parcours de maitrise, competences reelles, identite. Construire l\'identite sur la competence reelle, pas sur les metriques de la gamification.',
      type: 'emphasis',
    })
  }
  if (besoin === 'transcendance') {
    recs.push({
      category: 'Besoin dominant : Sens / Transcendance',
      text: 'Core Drives a privilegier : Epic Meaning & Calling (CD1). Impact reel, contribution a une cause, heritage. Montrer comment chaque action contribue a quelque chose de plus grand. Eviter la gamification purement egocentrique.',
      type: 'emphasis',
    })
  }

  // Moment d'utilisation recommendations
  if (moment === 'nuit') {
    recs.push({
      category: 'Moment : La nuit',
      text: 'Si la personne utilise le produit apres 22h, elle est peut-etre en situation de vulnerabilite ou d\'insomnie. Eviter les achats impulsifs, les boucles addictives. Jamais de notification a cette heure. Proposer des contenus apaisants.',
      type: 'warning',
    })
  }
  if (moment === 'pauseDej') {
    recs.push({
      category: 'Moment : Pause dejeuner',
      text: 'Sessions courtes (10-20 min). Contenu leger, recompenses rapides. C\'est un moment de relachement — ne pas demander un effort cognitif intense. Le creux d\'energie de l\'apres-midi arrive bientot.',
      type: 'adapt',
    })
  }

  // Session duration warnings
  if (minutes > 0 && minutes <= 5) {
    recs.push({
      category: 'Duree de session : Tres courte',
      text: 'Avec ' + minutes + ' minutes par session, chaque interaction doit etre instantanement utile. Pas de tutoriels, pas d\'onboarding long. Feedback immediat, progression visible en un coup d\'oeil. Envisager un format « micro-learning ».',
      type: 'adapt',
    })
  }
  if (minutes > 60) {
    recs.push({
      category: 'Duree de session : Longue',
      text: 'Avec ' + minutes + ' minutes par session, prevoir des points de pause naturels. Le risque d\'immersion excessive existe — integrer des rappels bienveillants de faire une pause. Varier les types d\'activites pour eviter la fatigue cognitive.',
      type: 'warning',
    })
  }

  // If no data at all, provide a default
  if (recs.length === 0) {
    recs.push({
      category: 'Conseil general',
      text: 'Remplissez les champs du portrait pour recevoir des recommandations contextuelles adaptees a votre persona.',
      type: 'suggestion',
    })
  }

  return recs
})

// ─── Navigation ─────────────────────────────────────────

function nextStep() {
  if (currentStep.value < sections.length - 1) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function goToStep(idx: number) {
  if (idx >= 0 && idx < sections.length) {
    showSummary.value = false
    currentStep.value = idx
  }
}

// ─── Export ─────────────────────────────────────────────

function generateMarkdown(): string {
  const lines: string[] = []
  const name = String(formData.prenom || '...')

  lines.push(`# Portrait Empathique : ${name}`)
  lines.push('')
  lines.push(`> ${phaseLabel.value} | ${tempsLabel.value} de temps libre`)
  lines.push('')

  lines.push('## 1. Sa vie en ce moment')
  lines.push('')
  if (formData.situation) lines.push(`- **Situation** : ${formData.situation}`)
  if (formData.preoccupation) lines.push(`- **Preoccupation principale** : ${formData.preoccupation}`)
  if (formData.tempsLibre) lines.push(`- **Temps libre** : ${tempsLabel.value}`)
  if (formData.phaseVie) lines.push(`- **Phase de vie** : ${phaseLabel.value}`)
  lines.push('')

  lines.push('## 2. Ce qu\'il/elle veut (conscient)')
  lines.push('')
  if (formData.pourquoiOuvert) lines.push(`- **Pourquoi ce produit** : ${formData.pourquoiOuvert}`)
  if (formData.diraitSiDemande) lines.push(`- **Ce qu'il/elle dirait** : ${formData.diraitSiDemande}`)
  if (formData.resultatConcret) lines.push(`- **Resultat attendu** : ${formData.resultatConcret}`)
  lines.push('')

  lines.push('## 3. Ce qu\'il/elle veut vraiment (profond)')
  lines.push('')
  if (formData.identite) lines.push(`- **Identite visee** : ${formData.identite}`)
  if (formData.peur) lines.push(`- **Peur** : ${formData.peur}`)
  if (formData.fierte) lines.push(`- **Fierte** : ${formData.fierte}`)
  if (formData.besoinEmotionnel) lines.push(`- **Besoin emotionnel dominant** : ${besoinLabel.value}`)
  lines.push('')

  lines.push('## 4. Sa relation avec notre produit')
  lines.push('')
  if (formData.momentUtilisation) lines.push(`- **Moment d'utilisation** : ${momentLabel.value}`)
  if (formData.etatEmotionnel) lines.push(`- **Etat emotionnel** : ${etatLabel.value}`)
  if (formData.minutesSession) lines.push(`- **Minutes par session** : ${formData.minutesSession} min`)
  if (formData.reviendrait) lines.push(`- **Ce qui le/la ferait revenir** : ${formData.reviendrait}`)
  if (formData.partirait) lines.push(`- **Ce qui le/la ferait partir** : ${formData.partirait}`)
  lines.push('')

  lines.push('## 5. Notre responsabilite')
  lines.push('')
  if (formData.aiderSansNuire) lines.push(`- **Aider sans nuire** : ${formData.aiderSansNuire}`)
  if (formData.gamificationAppropriee) lines.push(`- **Gamification appropriee** : ${formData.gamificationAppropriee}`)
  if (formData.pasBesoin) lines.push(`- **Pas besoin de notre part** : ${formData.pasBesoin}`)
  lines.push('')

  lines.push('## Recommandations')
  lines.push('')
  for (const rec of recommendations.value) {
    const prefix = rec.type === 'warning' ? '!' : rec.type === 'emphasis' ? '*' : rec.type === 'adapt' ? '~' : '+'
    lines.push(`### [${prefix}] ${rec.category}`)
    lines.push('')
    lines.push(rec.text)
    lines.push('')
  }

  lines.push('---')
  lines.push('')
  lines.push('*Portrait genere avec l\'outil Portrait Empathique — concevoir pour des personnes, pas des utilisateurs.*')

  return lines.join('\n')
}

async function exportMarkdown() {
  const md = generateMarkdown()
  try {
    await navigator.clipboard.writeText(md)
    exportLabel.value = 'Copie !'
    setTimeout(() => {
      exportLabel.value = 'Exporter en Markdown'
    }, 2000)
  } catch {
    // Fallback: create a temporary textarea
    const ta = document.createElement('textarea')
    ta.value = md
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    exportLabel.value = 'Copie !'
    setTimeout(() => {
      exportLabel.value = 'Exporter en Markdown'
    }, 2000)
  }
}

function resetForm() {
  for (const key in formData) {
    formData[key] = ''
  }
  currentStep.value = 0
  showSummary.value = false
}
</script>

<style scoped>
/* ─── Design tokens ──────────────────────────────────── */
:root {
  --pe-blue-50: #f0f5fa;
  --pe-blue-100: #dce8f3;
  --pe-blue-200: #b8cfe6;
  --pe-blue-400: #6b9fd4;
  --pe-blue-500: #4a82b8;
  --pe-blue-600: #3a6a9a;
  --pe-blue-700: #2d5580;
  --pe-gray-50: #faf9f7;
  --pe-gray-100: #f3f1ed;
  --pe-gray-200: #e5e2db;
  --pe-gray-300: #d1cdc4;
  --pe-gray-400: #a8a298;
  --pe-gray-500: #7a756c;
  --pe-gray-600: #5c574f;
  --pe-gray-700: #3d3933;
  --pe-gray-800: #2a2722;
  --pe-warm-50: #fdf8f3;
  --pe-warm-100: #f9eee0;
  --pe-green-50: #f0f7f2;
  --pe-green-600: #3a7d52;
  --pe-amber-50: #fef8ec;
  --pe-amber-600: #b07d2e;
  --pe-red-50: #fdf2f2;
  --pe-red-600: #c0392b;
  --pe-purple-50: #f5f2fa;
  --pe-purple-600: #6c3fa0;
}

/* ─── Base ───────────────────────────────────────────── */
.portrait-empathique {
  --pe-radius: 8px;
  --pe-radius-lg: 12px;
  --pe-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --pe-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  --pe-shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04);

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px 48px;
  color: var(--pe-gray-800);
  line-height: 1.6;
}

/* ─── Header ─────────────────────────────────────────── */
.pe-header {
  text-align: center;
  margin-bottom: 32px;
}

.pe-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--pe-gray-800);
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}

.pe-subtitle {
  font-size: 15px;
  color: var(--pe-gray-500);
  margin: 0;
  font-style: italic;
}

/* ─── Stepper ────────────────────────────────────────── */
.pe-stepper {
  margin-bottom: 32px;
}

.pe-steps {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
  gap: 4px;
}

.pe-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  flex: 1;
  transition: opacity 0.2s ease;
}

.pe-step:hover {
  opacity: 0.8;
}

.pe-step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  background: var(--pe-gray-200);
  color: var(--pe-gray-500);
  transition: all 0.3s ease;
}

.pe-step--active .pe-step-number {
  background: var(--pe-blue-500);
  color: #fff;
  box-shadow: 0 0 0 4px rgba(74, 130, 184, 0.15);
}

.pe-step--completed .pe-step-number {
  background: var(--pe-blue-200);
  color: var(--pe-blue-700);
}

.pe-step-label {
  font-size: 11px;
  color: var(--pe-gray-400);
  text-align: center;
  transition: color 0.3s ease;
}

.pe-step--active .pe-step-label {
  color: var(--pe-blue-600);
  font-weight: 600;
}

.pe-step--completed .pe-step-label {
  color: var(--pe-gray-600);
}

.pe-progress-bar {
  height: 3px;
  background: var(--pe-gray-200);
  border-radius: 3px;
  overflow: hidden;
}

.pe-progress-fill {
  height: 100%;
  background: var(--pe-blue-500);
  border-radius: 3px;
  transition: width 0.4s ease;
}

/* ─── Section ────────────────────────────────────────── */
.pe-main {
  min-height: 400px;
}

.pe-section {
  background: #fff;
  border: 1px solid var(--pe-gray-200);
  border-radius: var(--pe-radius-lg);
  padding: 28px 24px;
  box-shadow: var(--pe-shadow);
}

.pe-section-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--pe-gray-100);
}

.pe-section-number {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  background: var(--pe-blue-50);
  color: var(--pe-blue-600);
}

.pe-section-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--pe-gray-800);
}

.pe-section-description {
  font-size: 14px;
  color: var(--pe-gray-500);
  margin: 0;
}

/* ─── Fields ─────────────────────────────────────────── */
.pe-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pe-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pe-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--pe-gray-700);
}

.pe-hint {
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: var(--pe-gray-400);
  margin-top: 2px;
  font-style: italic;
}

.pe-input,
.pe-textarea,
.pe-select {
  font-family: inherit;
  font-size: 14px;
  padding: 10px 12px;
  border: 1px solid var(--pe-gray-300);
  border-radius: var(--pe-radius);
  background: var(--pe-gray-50);
  color: var(--pe-gray-800);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.pe-input:focus,
.pe-textarea:focus,
.pe-select:focus {
  outline: none;
  border-color: var(--pe-blue-400);
  box-shadow: 0 0 0 3px rgba(74, 130, 184, 0.12);
  background: #fff;
}

.pe-textarea {
  resize: vertical;
  min-height: 72px;
  line-height: 1.5;
}

.pe-input--number {
  max-width: 160px;
}

.pe-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%237a756c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  cursor: pointer;
}

.pe-input::placeholder,
.pe-textarea::placeholder {
  color: var(--pe-gray-400);
  font-style: italic;
}

/* ─── Navigation ─────────────────────────────────────── */
.pe-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
}

.pe-nav-spacer {
  width: 1px;
}

.pe-btn {
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: var(--pe-radius);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.pe-btn--primary {
  background: var(--pe-blue-500);
  color: #fff;
}

.pe-btn--primary:hover {
  background: var(--pe-blue-600);
  box-shadow: var(--pe-shadow-md);
}

.pe-btn--secondary {
  background: var(--pe-gray-100);
  color: var(--pe-gray-700);
}

.pe-btn--secondary:hover {
  background: var(--pe-gray-200);
}

.pe-btn--ghost {
  background: transparent;
  color: var(--pe-gray-500);
  border: 1px solid var(--pe-gray-300);
}

.pe-btn--ghost:hover {
  background: var(--pe-gray-50);
  color: var(--pe-gray-700);
}

.pe-btn--finish {
  background: var(--pe-green-600);
}

.pe-btn--finish:hover {
  background: #2e6844;
}

/* ─── Transition ─────────────────────────────────────── */
.pe-slide-enter-active,
.pe-slide-leave-active {
  transition: all 0.25s ease;
}

.pe-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.pe-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* ─── Summary card ───────────────────────────────────── */
.pe-summary {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pe-card {
  background: #fff;
  border: 1px solid var(--pe-gray-200);
  border-radius: var(--pe-radius-lg);
  box-shadow: var(--pe-shadow-lg);
  overflow: hidden;
}

.pe-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, var(--pe-blue-50), var(--pe-warm-50));
  border-bottom: 1px solid var(--pe-gray-200);
}

.pe-card-avatar {
  width: 52px;
  height: 52px;
  min-width: 52px;
  border-radius: 50%;
  background: var(--pe-blue-500);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(74, 130, 184, 0.3);
}

.pe-card-name {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: var(--pe-gray-800);
}

.pe-card-meta {
  font-size: 13px;
  color: var(--pe-gray-500);
  margin: 4px 0 0;
}

.pe-card-section {
  padding: 20px 24px;
  border-bottom: 1px solid var(--pe-gray-100);
}

.pe-card-section:last-child {
  border-bottom: none;
}

.pe-card-section-title {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--pe-blue-600);
  margin: 0 0 12px;
}

.pe-card-dl {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pe-card-dl-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pe-card-dl-row dt {
  font-size: 12px;
  font-weight: 600;
  color: var(--pe-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.pe-card-dl-row dd {
  font-size: 14px;
  color: var(--pe-gray-700);
  margin: 0;
  line-height: 1.5;
}

/* ─── Recommendations ────────────────────────────────── */
.pe-recommandations {
  background: #fff;
  border: 1px solid var(--pe-gray-200);
  border-radius: var(--pe-radius-lg);
  padding: 24px;
  box-shadow: var(--pe-shadow);
}

.pe-recommandations-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--pe-gray-800);
}

.pe-recommandations-intro {
  font-size: 14px;
  color: var(--pe-gray-500);
  margin: 0 0 20px;
}

.pe-rec {
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: var(--pe-radius);
  margin-bottom: 12px;
}

.pe-rec:last-child {
  margin-bottom: 0;
}

.pe-rec--warning {
  background: var(--pe-red-50);
  border-left: 3px solid var(--pe-red-600);
}

.pe-rec--suggestion {
  background: var(--pe-green-50);
  border-left: 3px solid var(--pe-green-600);
}

.pe-rec--adapt {
  background: var(--pe-amber-50);
  border-left: 3px solid var(--pe-amber-600);
}

.pe-rec--emphasis {
  background: var(--pe-purple-50);
  border-left: 3px solid var(--pe-purple-600);
}

.pe-rec-icon {
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}

.pe-rec--warning .pe-rec-icon {
  background: var(--pe-red-600);
  color: #fff;
}

.pe-rec--suggestion .pe-rec-icon {
  background: var(--pe-green-600);
  color: #fff;
}

.pe-rec--adapt .pe-rec-icon {
  background: var(--pe-amber-600);
  color: #fff;
}

.pe-rec--emphasis .pe-rec-icon {
  background: var(--pe-purple-600);
  color: #fff;
}

.pe-rec-content {
  flex: 1;
}

.pe-rec-category {
  font-size: 13px;
  display: block;
  margin-bottom: 4px;
}

.pe-rec--warning .pe-rec-category { color: var(--pe-red-600); }
.pe-rec--suggestion .pe-rec-category { color: var(--pe-green-600); }
.pe-rec--adapt .pe-rec-category { color: var(--pe-amber-600); }
.pe-rec--emphasis .pe-rec-category { color: var(--pe-purple-600); }

.pe-rec-text {
  font-size: 14px;
  color: var(--pe-gray-700);
  margin: 0;
  line-height: 1.5;
}

/* ─── Actions ────────────────────────────────────────── */
.pe-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 600px) {
  .portrait-empathique {
    padding: 16px 12px 32px;
  }

  .pe-header h1 {
    font-size: 22px;
  }

  .pe-step-label {
    display: none;
  }

  .pe-step-number {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .pe-section {
    padding: 20px 16px;
  }

  .pe-section-header {
    flex-direction: column;
    gap: 8px;
  }

  .pe-section-title {
    font-size: 18px;
  }

  .pe-card-header {
    flex-direction: column;
    text-align: center;
    padding: 20px 16px;
  }

  .pe-card-section {
    padding: 16px;
  }

  .pe-rec {
    flex-direction: column;
    gap: 8px;
  }

  .pe-actions {
    flex-direction: column;
  }

  .pe-actions .pe-btn {
    width: 100%;
    justify-content: center;
  }

  .pe-nav {
    gap: 8px;
  }
}
</style>
