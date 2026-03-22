# 11 — Personnalisation et IA dans la gamification

> Systèmes adaptatifs, profils joueur dynamiques, difficulté dynamique et recommandations par machine learning.

---

## 1. Pourquoi personnaliser la gamification ?

### Le problème du one-size-fits-all

La gamification identique pour tous les utilisateurs est suboptimale :

| Utilisateur | Réaction au streak | Réaction au leaderboard | Réaction aux badges |
|---|---|---|---|
| **Compétitif** | Indifférent | Très motivé | Collectionneur |
| **Social** | Motivation modérée | Stressé | Aime partager |
| **Autonome** | Irrité (pression) | Ignoré | Aime si significatif |
| **Anxieux** | Très stressé | Très stressé | Aime si pas de pression |
| **Casual** | Trop d'engagement | Ignoré | Aime si facile |

### L'impact de la personnalisation

| Métrique | Gamification standard | Gamification personnalisée | Amélioration |
|---|---|---|---|
| **D7 Retention** | 20% | 28-35% | +40-75% |
| **Session Duration** | 8 min | 11-14 min | +38-75% |
| **Badge Earn Rate** | 45% | 60-70% | +33-56% |
| **Satisfaction (NPS)** | 32 | 48-55 | +50-72% |

---

## 2. Profils joueur dynamiques

### Détection automatique du type de joueur

Plutôt que de demander à l'utilisateur son type (ce qui est imprécis), observer son comportement :

```typescript
interface PlayerProfile {
  // Scores de 0 à 1 pour chaque type (Hexad)
  achiever: number    // Focus sur les badges et la progression
  socializer: number  // Focus sur les interactions sociales
  explorer: number    // Focus sur la découverte
  philanthropist: number // Focus sur l'aide aux autres
  freeSpirit: number  // Focus sur la personnalisation
  player: number      // Focus sur les récompenses

  // Méta-données
  sensitivity: 'low' | 'medium' | 'high'  // Sensibilité à la gamification
  engagement: 'casual' | 'regular' | 'hardcore'
  riskTolerance: 'low' | 'medium' | 'high' // Tolérance à la perte (streaks)
}

function detectPlayerProfile(history: UserActionHistory): PlayerProfile {
  const actions = history.getActions()

  const achieverScore = normalize(
    actions.filter(a => a.type === 'badge_viewed').length +
    actions.filter(a => a.type === 'progress_checked').length * 2 +
    actions.filter(a => a.type === 'leaderboard_viewed').length
  )

  const socializerScore = normalize(
    actions.filter(a => a.type === 'reaction_given').length +
    actions.filter(a => a.type === 'comment_posted').length * 2 +
    actions.filter(a => a.type === 'badge_shared').length * 3
  )

  const explorerScore = normalize(
    new Set(actions.filter(a => a.type === 'article_read')
      .map(a => a.payload.category)).size * 5 +
    actions.filter(a => a.type === 'feature_discovered').length * 3
  )

  // ...autres scores

  return {
    achiever: achieverScore,
    socializer: socializerScore,
    explorer: explorerScore,
    // ...
    sensitivity: detectSensitivity(actions),
    engagement: detectEngagementLevel(actions),
    riskTolerance: detectRiskTolerance(actions)
  }
}
```

### Signaux comportementaux

| Signal | Ce qu'il indique | Adaptation |
|---|---|---|
| **Consulte souvent le leaderboard** | Achiever / compétitif | Plus de leaderboard, défis |
| **Partage des badges** | Socializer | Plus de mécaniques sociales |
| **Lit des catégories variées** | Explorer | Plus d'easter eggs, contenu caché |
| **Aide d'autres utilisateurs** | Philanthropist | Mentorat, badges d'aide |
| **Personnalise son profil** | Free Spirit | Plus de customisation |
| **Fait le minimum pour le streak** | Player (extrinsèque) | Récompenses variées |
| **Ignore les notifications** | Faible sensibilité | Moins de notifications |
| **Perd son streak et revient** | Haute résilience | Streaks plus exigeants OK |
| **Perd son streak et ne revient pas** | Faible tolérance au risque | Streak freeze automatique |

---

## 3. Gamification adaptive

### 3.1 Difficulté adaptive des badges

```typescript
interface AdaptiveBadgeConfig {
  baseThreshold: number
  difficultyMultiplier: (profile: PlayerProfile) => number
}

function getAdaptiveThreshold(
  badge: AdaptiveBadgeConfig,
  profile: PlayerProfile
): number {
  // Un achiever hardcore → seuil plus élevé (plus de challenge)
  // Un casual → seuil plus bas (plus accessible)
  return Math.round(
    badge.baseThreshold * badge.difficultyMultiplier(profile)
  )
}

// Exemple
const explorerBadge: AdaptiveBadgeConfig = {
  baseThreshold: 5, // 5 catégories par défaut
  difficultyMultiplier: (profile) => {
    if (profile.engagement === 'hardcore') return 1.5  // 8 catégories
    if (profile.engagement === 'casual') return 0.6    // 3 catégories
    return 1.0  // 5 catégories (standard)
  }
}
```

### 3.2 Notifications adaptives

```typescript
interface NotificationStrategy {
  frequency: 'none' | 'low' | 'medium' | 'high'
  tone: 'minimal' | 'encouraging' | 'competitive'
  timing: 'morning' | 'afternoon' | 'evening' | 'adaptive'
  streakReminder: boolean
  socialNotifications: boolean
}

function getNotificationStrategy(profile: PlayerProfile): NotificationStrategy {
  if (profile.sensitivity === 'low') {
    return {
      frequency: 'low',
      tone: 'minimal',
      timing: 'adaptive',
      streakReminder: false,
      socialNotifications: false
    }
  }

  if (profile.achiever > 0.7) {
    return {
      frequency: 'medium',
      tone: 'competitive',
      timing: 'morning', // Défis du matin
      streakReminder: true,
      socialNotifications: profile.socializer > 0.5
    }
  }

  if (profile.socializer > 0.7) {
    return {
      frequency: 'medium',
      tone: 'encouraging',
      timing: 'evening', // Récapitulatif social
      streakReminder: false,
      socialNotifications: true
    }
  }

  // Défaut
  return {
    frequency: 'low',
    tone: 'encouraging',
    timing: 'adaptive',
    streakReminder: true,
    socialNotifications: false
  }
}
```

### 3.3 Mécanique de streak adaptive

```typescript
interface AdaptiveStreakConfig {
  gracePeriodHours: number
  autoFreeze: boolean
  breakMessage: string
  reminderTone: 'gentle' | 'urgent' | 'competitive'
}

function getAdaptiveStreakConfig(profile: PlayerProfile): AdaptiveStreakConfig {
  if (profile.riskTolerance === 'low') {
    return {
      gracePeriodHours: 48,     // 2 jours de grâce
      autoFreeze: true,         // Freeze automatique au premier oubli
      breakMessage: 'Pas de souci ! Ton progrès est toujours là. Reprends quand tu veux.',
      reminderTone: 'gentle'
    }
  }

  if (profile.riskTolerance === 'high' && profile.achiever > 0.7) {
    return {
      gracePeriodHours: 24,     // 1 jour seulement
      autoFreeze: false,        // Pas de freeze automatique (le défi !)
      breakMessage: 'Streak perdu ! Prêt à battre ton record ?',
      reminderTone: 'competitive'
    }
  }

  // Standard
  return {
    gracePeriodHours: 36,
    autoFreeze: false,
    breakMessage: 'Ton streak a été réinitialisé. Tu peux recommencer !',
    reminderTone: 'gentle'
  }
}
```

---

## 4. Machine Learning pour la gamification

### 4.1 Prédiction de churn

```python
# Modèle simplifié de prédiction de churn
features = [
    'days_since_last_active',      # Récence
    'sessions_last_7_days',        # Fréquence récente
    'sessions_last_30_days',       # Fréquence mensuelle
    'streak_current',              # Streak actuel
    'streak_breaks_count',         # Nombre de streaks cassés
    'badges_earned_ratio',         # % de badges obtenus
    'avg_session_duration',        # Durée moyenne des sessions
    'social_interactions_count',   # Interactions sociales
    'days_since_last_badge',       # Jours depuis dernier badge
    'xp_velocity_trend',          # Tendance de la vitesse XP
]

# Signaux de churn imminent
high_risk_signals = {
    'days_since_last_active > 3': 'Inactivité récente',
    'streak_breaks_count > 3': 'Streaks cassés répétés',
    'xp_velocity_trend < -0.5': 'Ralentissement fort',
    'sessions_last_7_days = 0': 'Semaine sans session',
    'days_since_last_badge > 14': 'Pas de progression badge',
}
```

### 4.2 Recommandation de contenu gamifié

```python
# Recommander du contenu basé sur la progression gamification
def recommend_next_content(user_profile, content_catalog):
    """
    Recommande le contenu qui maximise l'engagement gamifié.
    """
    scores = []

    for content in content_catalog:
        score = 0

        # Bonus si le contenu aide à obtenir un badge proche
        for badge in get_near_badges(user_profile):
            if content.category in badge.required_categories:
                score += 50  # Forte incitation

        # Bonus si dans une catégorie peu explorée (explorer)
        if user_profile.explorer > 0.5:
            category_reads = user_profile.reads_by_category.get(content.category, 0)
            if category_reads < 3:
                score += 30

        # Bonus si la difficulté correspond au niveau
        difficulty_match = 1 - abs(content.difficulty - user_profile.level / 50)
        score += difficulty_match * 20

        # Bonus si contenu social et profil social
        if content.has_comments and user_profile.socializer > 0.5:
            score += 15

        scores.append((content, score))

    return sorted(scores, key=lambda x: x[1], reverse=True)[:5]
```

### 4.3 Timing optimal des notifications

```python
# Trouver le meilleur moment pour envoyer une notification
def find_optimal_notification_time(user_history):
    """
    Analyse l'historique pour trouver quand l'utilisateur
    est le plus susceptible d'ouvrir une notification.
    """
    # Extraire les heures d'ouverture de session
    session_hours = [session.start_hour for session in user_history.sessions]

    # Trouver le pic
    hour_counts = Counter(session_hours)
    peak_hour = hour_counts.most_common(1)[0][0]

    # Envoyer 30 min avant le pic (anticipation)
    notification_hour = (peak_hour - 0.5) % 24

    # Contraintes
    if notification_hour < 8: notification_hour = 8    # Pas avant 8h
    if notification_hour > 21: notification_hour = 21  # Pas après 21h

    return notification_hour
```

---

## 5. Systèmes de recommandation de badges

### Recommandation proactive

```typescript
interface BadgeRecommendation {
  badge: BadgeDefinition
  progress: { current: number; total: number }
  estimatedActions: number  // Actions estimées pour obtenir le badge
  message: string
}

function recommendNextBadges(
  state: GamificationState,
  badges: BadgeDefinition[]
): BadgeRecommendation[] {
  const recommendations: BadgeRecommendation[] = []

  for (const badge of badges) {
    if (state.badges.earned.includes(badge.id)) continue
    if (badge.secret) continue  // Ne pas recommander les badges secrets

    const progress = badge.progress?.(state)
    if (!progress) continue

    const percentComplete = progress.current / progress.total
    if (percentComplete < 0.3) continue  // Trop loin, pas pertinent

    const remaining = progress.total - progress.current
    recommendations.push({
      badge,
      progress,
      estimatedActions: remaining,
      message: generateMessage(badge, progress, percentComplete)
    })
  }

  // Trier par proximité (le plus proche d'être obtenu en premier)
  return recommendations
    .sort((a, b) => a.estimatedActions - b.estimatedActions)
    .slice(0, 3)  // Top 3 recommendations
}

function generateMessage(
  badge: BadgeDefinition,
  progress: { current: number; total: number },
  percent: number
): string {
  if (percent >= 0.9) return `Plus qu'une action pour obtenir "${badge.name}" !`
  if (percent >= 0.7) return `Tu es à ${Math.round(percent * 100)}% de "${badge.name}"`
  if (percent >= 0.5) return `À mi-chemin vers "${badge.name}" !`
  return `Continue, "${badge.name}" est à portée`
}
```

---

## 6. A/B Testing automatisé (Multi-Armed Bandit)

### Principe

Au lieu d'un A/B test classique (50/50 fixe), le Multi-Armed Bandit alloue progressivement plus de trafic à la variante gagnante :

```
Début : 33% A, 33% B, 33% C
Après 1000 users : 20% A, 50% B, 30% C  (B gagne)
Après 5000 users : 10% A, 70% B, 20% C  (B confirme)
```

### Application à la gamification

```typescript
interface GamificationVariant {
  id: string
  streakGracePeriod: number
  badgeDifficulty: 'easy' | 'medium' | 'hard'
  notificationFrequency: 'low' | 'medium' | 'high'
  confettiEnabled: boolean
}

class GamificationBandit {
  private variants: GamificationVariant[]
  private rewards: Map<string, number[]> = new Map()

  selectVariant(userId: string): GamificationVariant {
    // Epsilon-greedy strategy
    const epsilon = 0.1  // 10% exploration

    if (Math.random() < epsilon) {
      // Explorer : variante aléatoire
      return this.variants[Math.floor(Math.random() * this.variants.length)]
    }

    // Exploiter : variante avec le meilleur taux de récompense moyen
    let bestVariant = this.variants[0]
    let bestReward = 0

    for (const variant of this.variants) {
      const rewards = this.rewards.get(variant.id) ?? []
      const avgReward = rewards.length > 0
        ? rewards.reduce((a, b) => a + b, 0) / rewards.length
        : 0

      if (avgReward > bestReward) {
        bestReward = avgReward
        bestVariant = variant
      }
    }

    return bestVariant
  }

  recordOutcome(variantId: string, retained: boolean) {
    if (!this.rewards.has(variantId)) {
      this.rewards.set(variantId, [])
    }
    this.rewards.get(variantId)!.push(retained ? 1 : 0)
  }
}
```

---

## 7. Personnalisation par LLM

### Génération de messages personnalisés

Les LLMs peuvent personnaliser les messages de gamification :

```typescript
async function generatePersonalizedMessage(
  context: {
    event: 'badge_earned' | 'streak_milestone' | 'level_up' | 'comeback'
    userName: string
    badge?: BadgeDefinition
    streakLength?: number
    newLevel?: number
    daysInactive?: number
    playerProfile: PlayerProfile
  }
): Promise<string> {
  // Template-based pour la performance (pas besoin d'IA pour chaque message)
  const templates = {
    badge_earned: {
      achiever: `${context.userName}, badge "${context.badge?.name}" obtenu ! Tu en as maintenant ${context.badge ? 'un de plus' : ''} dans ta collection.`,
      socializer: `${context.userName}, bravo ! Partage ton nouveau badge "${context.badge?.name}" avec tes amis ?`,
      explorer: `${context.userName}, tu as découvert "${context.badge?.name}" ! Combien de badges cachés reste-t-il ?`
    },
    streak_milestone: {
      achiever: `${context.streakLength} jours ! Tu fais partie du top 5% des utilisateurs les plus réguliers.`,
      socializer: `${context.streakLength} jours de suite ! Tes amis seraient impressionnés.`,
      explorer: `${context.streakLength} jours d'exploration continue. Qu'as-tu découvert aujourd'hui ?`
    }
  }

  // Sélectionner le template basé sur le profil dominant
  const dominantType = getDominantType(context.playerProfile)
  return templates[context.event]?.[dominantType] ?? templates[context.event]?.achiever
}
```

### Génération de quêtes personnalisées

```typescript
interface PersonalizedQuest {
  title: string
  description: string
  steps: string[]
  reward: { xp: number; badge?: string }
  estimatedDuration: string
}

function generatePersonalizedQuest(
  profile: PlayerProfile,
  readHistory: string[],
  availableContent: Content[]
): PersonalizedQuest {
  // Quête basée sur les catégories peu explorées
  const unexploredCategories = findUnexploredCategories(readHistory, availableContent)

  if (profile.explorer > 0.7 && unexploredCategories.length > 0) {
    const category = unexploredCategories[0]
    return {
      title: `Explore : ${category.label}`,
      description: `Découvre la catégorie ${category.label} en lisant 3 articles`,
      steps: [
        `Lire un article dans "${category.label}"`,
        `Lire un deuxième article dans "${category.label}"`,
        `Lire un troisième article dans "${category.label}"`
      ],
      reward: { xp: 50, badge: `explorer-${category.id}` },
      estimatedDuration: '15 minutes'
    }
  }

  if (profile.achiever > 0.7) {
    return {
      title: 'Challenge du jour',
      description: 'Lis 5 articles en une seule session',
      steps: Array.from({ length: 5 }, (_, i) => `Lire l'article ${i + 1}/5`),
      reward: { xp: 100, badge: 'daily-champion' },
      estimatedDuration: '30 minutes'
    }
  }

  // Quête par défaut
  return {
    title: 'Ta prochaine étape',
    description: 'Continue ton apprentissage',
    steps: ['Lire 1 article aujourd\'hui'],
    reward: { xp: 15 },
    estimatedDuration: '5 minutes'
  }
}
```

---

## 8. Feedback adaptatif en temps réel

### Adaptation du feedback au comportement

```typescript
interface FeedbackConfig {
  celebrationIntensity: 'none' | 'subtle' | 'moderate' | 'full'
  showProgress: boolean
  showLeaderboard: boolean
  streakVisibility: 'hidden' | 'minimal' | 'prominent'
  socialFeatures: boolean
}

function adaptFeedback(profile: PlayerProfile, sessionData: SessionData): FeedbackConfig {
  // Si l'utilisateur ignore systématiquement les toasts → réduire
  if (sessionData.toastDismissRate > 0.8) {
    return { ...defaultConfig, celebrationIntensity: 'subtle' }
  }

  // Si l'utilisateur consulte souvent sa progression → plus de visibilité
  if (sessionData.progressCheckFrequency > 3) {
    return { ...defaultConfig, showProgress: true }
  }

  // Si l'utilisateur n'a jamais ouvert le leaderboard → le cacher
  if (sessionData.leaderboardViews === 0 && sessionData.totalSessions > 10) {
    return { ...defaultConfig, showLeaderboard: false }
  }

  return defaultConfig
}
```

---

## 9. Privacy et personnalisation

### Principes de privacy-preserving personalization

| Principe | Description | Implémentation |
|---|---|---|
| **On-device** | Le profiling se fait côté client | Pas d'envoi de données comportementales au serveur |
| **Anonymisé** | Les données sont agrégées | Pas de profil individuel sur le serveur |
| **Opt-in** | L'utilisateur choisit la personnalisation | Toggle dans les paramètres |
| **Transparence** | L'utilisateur peut voir son profil | Page « Mon profil de joueur » |
| **Suppression** | L'utilisateur peut reset son profil | Bouton « Réinitialiser mes préférences » |
| **Minimal** | Ne collecter que le nécessaire | Pas de tracking superflu |

### Architecture privacy-first

```typescript
class PrivacyFirstPersonalization {
  // Tout le profiling est fait côté client
  // Seules les préférences résultantes sont stockées

  private computeProfile(): PlayerProfile {
    // Calculé localement, jamais envoyé au serveur
    const history = this.storage.get<UserActionHistory>('local_history')
    return detectPlayerProfile(history)
  }

  getGamificationConfig(): GamificationConfig {
    const profile = this.computeProfile()
    return {
      streakConfig: getAdaptiveStreakConfig(profile),
      notificationStrategy: getNotificationStrategy(profile),
      feedbackConfig: adaptFeedback(profile, this.getSessionData())
    }
  }

  // L'utilisateur peut voir et modifier son profil
  getProfileForUser(): PlayerProfile {
    return this.computeProfile()
  }

  // L'utilisateur peut réinitialiser
  resetProfile(): void {
    this.storage.remove('local_history')
  }
}
```

---

## 10. Roadmap de la personnalisation

### Phase 1 : Segmentation simple (sans ML)

```
- 3 modes : Casual / Regular / Hardcore
- Choisi par l'utilisateur à l'onboarding
- Affecte : difficulté des badges, fréquence des notifications, streak grace period
- Modifiable dans les paramètres
```

### Phase 2 : Adaptation automatique

```
- Détection automatique du profil (Hexad) basée sur le comportement
- Adaptation des notifications (fréquence, timing, ton)
- Recommandation de badges proches
- Difficulté adaptive des quêtes
```

### Phase 3 : ML et prédiction

```
- Prédiction de churn → intervention proactive
- Recommandation de contenu gamifié personnalisé
- Timing optimal des notifications (par utilisateur)
- A/B testing automatisé (Multi-Armed Bandit)
```

### Phase 4 : LLM et génération

```
- Messages personnalisés par LLM
- Quêtes générées dynamiquement
- Récapitulatifs narratifs personnalisés
- Coaching adaptatif (« Tu apprends mieux en session courte le matin »)
```

---

## Résumé

| # | Principe | Application |
|---|--------|-------------|
| 1 | **Observer, ne pas demander** | Détecter le profil par le comportement, pas par un quiz |
| 2 | **Adapter progressivement** | Pas de changement brutal, ajustement graduel |
| 3 | **Privacy-first** | Profiling côté client, pas de tracking serveur |
| 4 | **Transparence** | L'utilisateur voit et contrôle son profil |
| 5 | **Commencer simple** | 3 modes → adaptation auto → ML |
| 6 | **Mesurer l'impact** | A/B tester chaque adaptation |
| 7 | **Multiple chemins** | Pas un seul profil optimal, plusieurs chemins valides |

---

## Lectures recommandées

- **Tondello, G. et al.** — *The Gamification User Types Hexad Scale* (2016)
- **Kocielnik, R. et al.** — *Designing for Sustained Motivation* (CHI 2018)
- **Sutton, R. & Barto, A.** — *Reinforcement Learning* (2018)
- **Deterding, S.** — *Contextual Autonomy Support in Video Game Play* (2016)
