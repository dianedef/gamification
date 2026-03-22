# 07 — Métriques et analytics de la gamification

> Comment mesurer l'efficacité de votre gamification, quels KPIs suivre, et comment itérer sur les données.

---

## 1. Le framework de mesure

### Pourquoi mesurer ?

La gamification sans mesure, c'est naviguer à l'aveugle. Vous devez pouvoir répondre à ces questions :

1. **Est-ce que les utilisateurs sont plus engagés grâce à la gamification ?**
2. **Quelles mécaniques fonctionnent le mieux ?**
3. **Est-ce que la gamification ne crée pas d'effets pervers ?**
4. **Quel est le ROI de l'investissement en gamification ?**

### La pyramide de mesure

```
                    ╱╲
                   ╱  ╲
                  ╱ ROI ╲         Retour sur investissement
                 ╱       ╲
                ╱──────────╲
               ╱  Business  ╲     Revenus, conversion, rétention
              ╱  Outcomes    ╲
             ╱────────────────╲
            ╱   Engagement     ╲   Sessions, durée, fréquence
           ╱    Metrics         ╲
          ╱──────────────────────╲
         ╱   Gamification         ╲  Badges, streaks, points
        ╱    Metrics               ╲
       ╱────────────────────────────╲
      ╱   Activity Metrics           ╲ Actions, clics, vues
     ╱                                ╲
    ╱──────────────────────────────────╲
```

**Mesurez de bas en haut** : Les métriques d'activité alimentent les métriques de gamification, qui alimentent l'engagement, qui alimente le business.

---

## 2. KPIs essentiels de gamification

### Métriques d'engagement

| KPI | Formule | Cible | Fréquence |
|---|---|---|---|
| **DAU/MAU** | Utilisateurs actifs quotidiens / mensuels | > 20% | Quotidien |
| **Session Duration** | Temps moyen par session | +15% vs baseline | Quotidien |
| **Session Frequency** | Nombre de sessions / utilisateur / semaine | +20% vs baseline | Hebdo |
| **Return Rate** | % d'utilisateurs qui reviennent le lendemain | > 40% Day 1 | Quotidien |
| **Stickiness** | DAU / MAU × 100 | > 20% | Quotidien |
| **Time to First Action** | Temps avant la première action significative | < 30s | Quotidien |

### Métriques de rétention

| KPI | Formule | Benchmark | Fréquence |
|---|---|---|---|
| **D1 Retention** | % d'utilisateurs actifs à J+1 | > 40% | Quotidien |
| **D7 Retention** | % d'utilisateurs actifs à J+7 | > 20% | Hebdo |
| **D30 Retention** | % d'utilisateurs actifs à J+30 | > 10% | Mensuel |
| **Churn Rate** | % d'utilisateurs perdus par période | < 5% / mois | Mensuel |
| **Resurrection Rate** | % d'utilisateurs inactifs qui reviennent | > 5% | Mensuel |

### Métriques spécifiques à la gamification

| KPI | Description | Calcul | Ce que ça indique |
|---|---|---|---|
| **Badge Earn Rate** | % d'utilisateurs qui gagnent ≥1 badge | Earned / Total × 100 | Accessibilité des badges |
| **Badge Completion Rate** | % de badges gagnés vs disponibles | Earned / Available × 100 | Profondeur d'engagement |
| **Streak Length (avg)** | Durée moyenne des streaks | Σ(streak days) / N | Force de l'habitude |
| **Streak Break Rate** | % de streaks cassés par jour | Broken / Active × 100 | Stress du streak |
| **Points Velocity** | Points gagnés par session | Σ(points) / Sessions | Rythme de progression |
| **Leaderboard Mobility** | Changements de position par semaine | Σ(|pos changes|) / N | Dynamisme de la compétition |
| **Feature Adoption** | % d'utilisateurs utilisant chaque mécanique | Users(feature) / Total | Popularité des mécaniques |

---

## 3. Tableaux de bord (Dashboard)

### Dashboard opérationnel (quotidien)

```
┌──────────────────────────────────────────────────────────┐
│  Gamification Dashboard — 21 mars 2026                   │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ DAU      │  │ Badges   │  │ Avg      │  │ Streak   │ │
│  │ 1,247    │  │ earned   │  │ Streak   │  │ Break    │ │
│  │ ⬆+12%   │  │ 89       │  │ 8.3 days │  │ Rate     │ │
│  │          │  │ ⬆+15%   │  │ ⬆+2.1   │  │ 4.2%     │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
│                                                          │
│  Badge Popularity          Streak Distribution           │
│  ┌──────────────────┐      ┌──────────────────┐          │
│  │ Premier Pas  89% │      │ 1-7 jours   45% │          │
│  │ Explorateur  34% │      │ 8-30 jours  30% │          │
│  │ Régulier     22% │      │ 31-100      18% │          │
│  │ Expert        5% │      │ 100+         7% │          │
│  └──────────────────┘      └──────────────────┘          │
│                                                          │
│  Retention Cohort                                        │
│  ┌────────────────────────────────────────┐               │
│  │ D1: 42% | D7: 23% | D30: 12% | D90: 8%│              │
│  └────────────────────────────────────────┘               │
└──────────────────────────────────────────────────────────┘
```

### Métriques à surveiller (alertes)

| Alerte | Condition | Action |
|---|---|---|
| 🔴 **Streak Break Spike** | Break rate > 10% en 24h | Vérifier bug, ajouter grace period |
| 🔴 **Badge Inflation** | >50% des users ont >80% des badges | Badges trop faciles, ajouter difficulté |
| 🟡 **Low Badge Earn** | <5% earn rate sur un badge | Badge trop dur ou pas assez visible |
| 🟡 **Session Drop** | Durée moyenne -20% | Ennui potentiel, nouveau contenu nécessaire |
| 🔴 **Churn Spike** | Churn > 2× la moyenne | Investiguer — bug, UX, ou fatigue gamification |

---

## 4. Analyse de cohorte

### Cohorte par semaine d'inscription

```
         Semaine 1  Semaine 2  Semaine 3  Semaine 4  Semaine 5
Cohorte 1   100%       42%        28%        18%        15%
Cohorte 2   100%       45%        31%        22%        19%  ← Amélioration
Cohorte 3   100%       48%        35%        25%        21%  ← Gamification v2
Cohorte 4   100%       52%        38%        28%        24%  ← Streaks ajoutés
```

**Comment lire** :
- Chaque ligne = un groupe d'utilisateurs inscrits la même semaine
- Les pourcentages montrent combien sont encore actifs X semaines plus tard
- Si la rétention augmente de cohorte en cohorte → la gamification fonctionne

### Cohorte par type de joueur

Segmenter les cohortes par comportement de gamification :

| Segment | D1 Retention | D30 Retention | LTV |
|---|---|---|---|
| **Avec streak actif** | 78% | 45% | Élevée |
| **Avec badges mais sans streak** | 55% | 22% | Moyenne |
| **Sans gamification** | 32% | 8% | Faible |

→ Montre la corrélation (pas causalité !) entre gamification et rétention.

---

## 5. A/B Testing de la gamification

### Quoi tester ?

| Test | Variante A | Variante B | Métrique principale |
|---|---|---|---|
| **Streak visible** | Pas de streak | Streak visible | D7 Retention |
| **Nombre de badges** | 10 badges | 30 badges | Badge Earn Rate |
| **Difficulté badge** | Facile (3 actions) | Dur (10 actions) | Completion Rate |
| **Confetti** | Pas de confetti | Confetti au badge | Session Duration |
| **Leaderboard** | Pas de leaderboard | Leaderboard hebdo | DAU |
| **Notifications** | 1 push/jour | 3 push/jour | D1 Retention vs Uninstall |
| **Streak freeze** | Pas de freeze | 1 freeze gratuit | Streak Break Rate |
| **Daily reward** | Fixe (10 coins) | Variable (5-50 coins) | Session Frequency |

### Méthodologie

1. **Hypothèse** : « Ajouter un streak visible augmentera la D7 retention de 15% »
2. **Sample size** : Calculer la taille d'échantillon nécessaire (typiquement 1000+ par variante)
3. **Durée** : Minimum 2 semaines (1 cycle complet de comportement)
4. **Segmentation** : Exclure les power users et les utilisateurs inactifs
5. **Signifiance** : p < 0.05, confiance à 95%

### Pièges à éviter

| Piège | Description | Solution |
|---|---|---|
| **Peeking** | Regarder les résultats trop tôt | Définir la durée à l'avance, ne pas toucher |
| **Multiple testing** | Tester 10 métriques, une sera significative par hasard | Définir UNE métrique principale |
| **Novelty effect** | Hausse temporaire juste parce que c'est nouveau | Attendre 2+ semaines avant de conclure |
| **Survivor bias** | Ne mesurer que ceux qui sont restés | Inclure les churned dans l'analyse |
| **Simpson's paradox** | Tendance globale opposée aux sous-groupes | Segmenter par cohorte et comportement |

---

## 6. Funnel de gamification

### Le funnel d'engagement gamifié

```
                    100% ─── Utilisateurs inscrits
                     │
              ┌──────▼──────┐
              │   Premier    │ 80% ← Exposition à la gamification
              │   contact    │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │   Premier    │ 60% ← Première interaction gamifiée
              │   badge      │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │   Streak     │ 35% ← Début du streak
              │   commencé   │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │   Streak     │ 15% ← Habitude formée
              │   7+ jours   │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │   Power      │ 5%  ← Utilisateur engagé long terme
              │   user       │
              └──────────────┘
```

**Optimiser chaque étape** :
- **100% → 80%** : Gamification visible dès le premier écran
- **80% → 60%** : Premier badge en < 2 minutes
- **60% → 35%** : Streak introduit dès le badge #2
- **35% → 15%** : Grace period + streak freeze pour protéger
- **15% → 5%** : Contenu avancé, communauté, défis

---

## 7. ROI de la gamification

### Calcul du ROI

```
ROI = (Gain attribuable à la gamification - Coût de la gamification) / Coût × 100

Gain = (Δ Rétention × LTV) + (Δ Conversion × Revenue) + (Δ Engagement × Valeur/session)
Coût = Développement + Design + Maintenance + Infrastructure
```

### Méthode d'attribution

Comment savoir quel gain est dû à la gamification ?

1. **A/B test** (le plus fiable) : Groupe avec gamification vs sans
2. **Before/After** : Comparer les métriques avant et après implémentation
3. **Analyse de cohorte** : Comparer users gamifiés vs non-gamifiés
4. **Modèle d'attribution** : Pondérer l'impact de chaque mécanique

### Benchmarks ROI par industrie

| Industrie | ROI typique | Mécanique la plus efficace |
|---|---|---|
| **E-learning** | 40-60% ↑ completion | Streaks + progression |
| **E-commerce** | 15-30% ↑ conversion | Points de fidélité + niveaux |
| **Fitness** | 50-100% ↑ rétention | Streaks + défis sociaux |
| **SaaS** | 20-40% ↑ adoption features | Onboarding gamifié + badges |
| **Communauté** | 30-50% ↑ participation | Réputation + leaderboards |

### Études chiffrées

- **Duolingo** : L'ajout des streaks a augmenté la DAU de 14% et la D14 retention de 21%
- **Fitbit** : Les défis sociaux augmentent l'activité physique de 27%
- **SAP Community Network** : La gamification a augmenté les contributions de 400%
- **Khan Academy** : Les badges ont augmenté le temps passé de 36%
- **Nike Run Club** : Les challenges sociaux augmentent la fréquence de course de 18%

---

## 8. Événements à tracker

### Taxonomy d'événements

```
gamification.badge.earned
  ├── badge_id: string
  ├── badge_name: string
  ├── badge_tier: bronze|silver|gold
  ├── time_to_earn: number (seconds since account creation)
  └── total_badges_earned: number

gamification.streak.updated
  ├── streak_length: number
  ├── streak_status: active|frozen|broken
  ├── is_milestone: boolean
  └── milestone_value: number (7, 30, 100...)

gamification.streak.broken
  ├── streak_length: number (length before break)
  ├── last_active: timestamp
  └── had_freeze_available: boolean

gamification.level.up
  ├── new_level: number
  ├── previous_level: number
  ├── total_xp: number
  └── time_at_previous_level: number (seconds)

gamification.points.earned
  ├── amount: number
  ├── source: string (article_read, quiz_completed, etc.)
  ├── total_points: number
  └── multiplier: number (if bonus active)

gamification.leaderboard.viewed
  ├── type: global|friends|weekly
  ├── user_position: number
  └── position_change: number

gamification.reaction.submitted
  ├── content_id: string
  ├── reaction_type: upvote|love|funny|surprised|angry|sad
  └── is_change: boolean (changed from another reaction)

gamification.feedback.submitted
  ├── content_id: string
  ├── difficulty: easy|justRight|hard
  ├── engagement: boring|interesting|fascinating
  └── has_comment: boolean

gamification.quest.completed
  ├── quest_id: string
  ├── quest_type: daily|weekly|main|side
  ├── steps_completed: number
  └── time_to_complete: number (seconds)
```

### Événements de funnel

```
gamification.onboarding.started
gamification.onboarding.first_action
gamification.onboarding.first_badge
gamification.onboarding.completed
gamification.onboarding.abandoned
  └── step_abandoned: string
```

---

## 9. Segmentation des utilisateurs

### Par engagement gamification

| Segment | Critères | % typique | Stratégie |
|---|---|---|---|
| **Whales** (Ultra-engagés) | Streak 30+, 80%+ badges | 5% | Contenu exclusif, mentorat |
| **Regular** (Engagés) | Streak 7+, 30%+ badges | 15% | Défis, événements |
| **Casual** (Occasionnels) | Streak 1-6, quelques badges | 30% | Rappels doux, motivation |
| **Lurkers** (Observateurs) | 0 streak, 0-1 badge | 30% | Onboarding amélioré |
| **Churned** (Partis) | Inactifs 30+ jours | 20% | Réengagement, win-back |

### Analyse RFM (Récence, Fréquence, Montant)

Adapter le modèle RFM du marketing à la gamification :

| Dimension | Description | Score |
|---|---|---|
| **Récence** | Quand la dernière activité ? | 5 = aujourd'hui, 1 = il y a 30+ jours |
| **Fréquence** | Combien de sessions / semaine ? | 5 = quotidien, 1 = 1×/mois |
| **Engagement** | Niveau de gamification (badges, streak, XP) | 5 = whale, 1 = lurker |

---

## 10. Tableau de bord d'impact

### Rapport mensuel type

```
┌──────────────────────────────────────────────────────┐
│  IMPACT GAMIFICATION — Mars 2026                     │
│                                                      │
│  ┌─ HEADLINE METRICS ─────────────────────────────┐  │
│  │                                                │  │
│  │  DAU: 1,247 (+12% vs fév.)                    │  │
│  │  D7 Retention: 23% (+5pp vs baseline)          │  │
│  │  Avg Session: 8.2 min (+1.3 min vs baseline)   │  │
│  │  NPS gamifié: 42 (vs 31 sans gamification)     │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌─ TOP PERFORMING MECHANICS ─────────────────────┐  │
│  │                                                │  │
│  │  1. Streaks    → +21% D7 retention             │  │
│  │  2. Badges     → +15% feature adoption         │  │
│  │  3. Progress   → +18% completion rate          │  │
│  │  4. Toast      → +8% satisfaction score        │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌─ AREAS FOR IMPROVEMENT ────────────────────────┐  │
│  │                                                │  │
│  │  ⚠ Leaderboard: only 12% view rate            │  │
│  │  ⚠ Secret badges: 2% discovery rate           │  │
│  │  ⚠ Streak break → 35% churn within 7 days     │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌─ ACTIONS NEXT MONTH ───────────────────────────┐  │
│  │                                                │  │
│  │  1. Add streak recovery feature                │  │
│  │  2. Make leaderboard more prominent            │  │
│  │  3. Add hints for secret badges                │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## Résumé : les 10 métriques gamification incontournables

| # | Métrique | Pourquoi c'est critique |
|---|---|---|
| 1 | **D7 Retention** | Indicateur #1 de la valeur perçue |
| 2 | **Streak Length (avg)** | Force de l'habitude créée |
| 3 | **Badge Earn Rate** | Accessibilité de la gamification |
| 4 | **Streak Break Rate** | Santé du système de streaks |
| 5 | **Session Frequency** | Régularité de l'engagement |
| 6 | **Time to First Badge** | Efficacité de l'onboarding |
| 7 | **Feature Adoption** | Impact sur l'usage du produit |
| 8 | **DAU/MAU (Stickiness)** | Engagement global |
| 9 | **Churn after Streak Break** | Impact de la perte sur l'abandon |
| 10 | **NPS gamifié vs non-gamifié** | Satisfaction utilisateur |

---

## Lectures recommandées

- **Croll, A. & Yoskovitz, B.** — *Lean Analytics* (2013)
- **Ellis, S.** — *Hacking Growth* (2017)
- **Hubbard, D.** — *How to Measure Anything* (2014)
- **McClure, D.** — *Pirate Metrics (AARRR)* framework
