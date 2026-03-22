# 03 — Frameworks de gamification

> Les modèles structurés pour concevoir, analyser et implémenter la gamification de façon systématique.

---

## 1. Octalysis Framework (Yu-kai Chou)

### Vue d'ensemble

L'Octalysis est le framework de gamification le plus complet et le plus utilisé. Il identifie **8 Core Drives** (motivations fondamentales) organisés en octogone :

```
                    1. EPIC MEANING
                   & CALLING
                  ╱            ╲
        8. LOSS &╱              ╲2. DEVELOPMENT
        AVOIDANCE              & ACCOMPLISHMENT
              ╱                    ╲
             ╱                      ╲
   7. UNPRE- │                      │ 3. EMPOWERMENT
   DICTABILITY│                      │ OF CREATIVITY
   & CURIOSITY│                      │ & FEEDBACK
              ╲                      ╱
               ╲                    ╱
      6. SCARCITY╲                ╱4. OWNERSHIP
      & IMPATIENCE ╲            ╱ & POSSESSION
                    ╲          ╱
                     5. SOCIAL
                     INFLUENCE
                    & RELATEDNESS
```

### Les 8 Core Drives en détail

#### Core Drive 1 : Epic Meaning & Calling

> L'utilisateur croit qu'il fait quelque chose de plus grand que lui.

| Technique | Description | Exemple |
|---|---|---|
| **Narrative** | Histoire englobante | Duolingo : « Apprends une langue pour connecter les cultures » |
| **Humanity Hero** | L'utilisateur sauve/aide | Wikipedia : contribuer au savoir humain |
| **Elitism** | Appartenir à un groupe d'élite | Beta testeurs, early adopters |
| **Beginners Luck** | Succès précoce = signe du destin | Premier quiz parfait → « Tu es un naturel ! » |
| **Free Lunch** | Sentiment d'avoir un avantage | « Bonus de bienvenue gratuit ! » |

**Quand l'utiliser** : Onboarding, récupération d'utilisateurs inactifs, positionnement de marque.

#### Core Drive 2 : Development & Accomplishment

> Le besoin de progresser, de développer ses compétences, de surmonter des défis.

| Technique | Description | Exemple |
|---|---|---|
| **Points** | Mesure quantifiée de progression | XP, points de karma |
| **Badges** | Reconnaissance visuelle | Badges Stack Overflow |
| **Leaderboards** | Classement comparatif | Top contributeurs GitHub |
| **Progress Bar** | Visualisation de progression | Profil LinkedIn complété à 70% |
| **Level Up** | Paliers de progression | Niveaux 1-50 |
| **Status Points** | Points de statut (non échangeables) | Points de réputation |
| **Achievement Symbols** | Symboles de réussite | Trophées, étoiles, couronnes |
| **Fixed Action Rewards** | Récompense après action spécifique | « Complète ton profil → badge Nouveau » |

**Le Core Drive le plus utilisé** (et le plus basique). Souvent le seul implémenté → gamification superficielle.

#### Core Drive 3 : Empowerment of Creativity & Feedback

> Le besoin de s'exprimer créativement et de voir le résultat de ses choix.

| Technique | Description | Exemple |
|---|---|---|
| **Boosters** | Outils qui amplifient les actions | Power-ups, multiplicateurs XP |
| **Milestone Unlock** | Déblocage progressif de fonctionnalités | Nouveaux outils après level 10 |
| **Evergreen Mechanics** | Systèmes jouables à l'infini | Minecraft creative mode |
| **Instant Feedback** | Retour immédiat | Animation à chaque action |
| **Choice Perception** | Illusion ou réalité du choix | Choisir son avatar, son parcours |
| **Plant Picker** | Choix stratégique initial | Choisir sa classe dans un RPG |

**Le Core Drive le plus durable** : quand l'utilisateur peut être créatif, l'engagement est infini.

#### Core Drive 4 : Ownership & Possession

> Le besoin de posséder, collectionner, améliorer et protéger ses possessions.

| Technique | Description | Exemple |
|---|---|---|
| **Virtual Goods** | Objets virtuels possédés | Skins, items, décorations |
| **Collection Sets** | Ensembles à compléter | Pokémon, stickers Panini |
| **Avatar** | Représentation personnalisée | Profil, personnage, workspace |
| **Build from Scratch** | Créer quelque chose de zéro | Base building, profil construit |
| **Alfred Effect** | Personnalisation qui s'améliore avec le temps | Recommandations Spotify |
| **Protection** | Protéger ce qui a été construit | Streak freeze Duolingo |
| **Monitoring** | Surveiller ses possessions | Dashboard, statistiques personnelles |

**L'effet IKEA** : Ce que l'on construit soi-même a plus de valeur subjective que ce que l'on reçoit.

#### Core Drive 5 : Social Influence & Relatedness

> L'influence des autres sur nos comportements : mentorat, compétition, envie, pression sociale.

| Technique | Description | Exemple |
|---|---|---|
| **Friending** | Ajouter des amis/contacts | Réseau social in-app |
| **Social Treasure** | Cadeaux entre utilisateurs | Envoyer un power-up à un ami |
| **Group Quests** | Défis collaboratifs | Raids, équipes |
| **Social Prods** | Incitations sociales douces | « Ton ami vient de débloquer... » |
| **Mentorship** | Relation mentor-élève | Parrainage, coaching |
| **Conformity Anchors** | Normes sociales | « 85% des utilisateurs ont fait ça » |
| **Water Cooler** | Espaces de discussion informels | Forum, chat, commentaires |
| **Tout Display** | Affichage public des accomplissements | Badges sur le profil public |
| **Envy** | Envie positive | Voir les accomplissements des autres |

**Attention** : La pression sociale peut devenir toxique si mal gérée (shame, bullying, comparaison négative).

#### Core Drive 6 : Scarcity & Impatience

> Ce qui est rare est désirable. L'attente crée le désir.

| Technique | Description | Exemple |
|---|---|---|
| **Appointment Dynamics** | Revenir à un moment précis | Récompense quotidienne à heure fixe |
| **Magnetic Caps** | Limites qui créent le désir | « 3 vies par jour » (Duolingo) |
| **Dangling** | Montrer mais pas donner | Aperçu de contenu premium |
| **Prize Pacing** | Espacement des récompenses | Badge tous les 5 niveaux, pas chaque niveau |
| **Countdown Timer** | Compte à rebours | « Offre expire dans 23h » |
| **Moats** | Barrières d'entrée | « Déblocable au niveau 20 » |
| **Torture Breaks** | Pause forcée | Énergie qui se recharge en 4h |
| **Evolved UI** | Interface qui évolue avec le niveau | Fonctionnalités avancées débloquées |

**Éthiquement sensible** : Ces techniques sont puissantes mais flirtent avec la manipulation. À utiliser avec modération.

#### Core Drive 7 : Unpredictability & Curiosity

> L'inconnu attire. La curiosité est un moteur puissant d'engagement.

| Technique | Description | Exemple |
|---|---|---|
| **Glowing Choice** | Choix qui brille/attire l'attention | Bouton animé, « ? » mystérieux |
| **Mystery Box** | Récompense inconnue | Loot boxes, coffres |
| **Random Rewards** | Récompenses aléatoires | Bonus surprise après une action |
| **Easter Eggs** | Surprises cachées | Fonctionnalités secrètes à découvrir |
| **Rolling Rewards** | Récompenses progressives imprévisibles | Roue de la fortune |
| **Obvious Wonder** | Quelque chose d'intrigant en vue | « Prochainement : ???  » |
| **Mini Quests** | Quêtes secondaires surprises | Mission pop-up aléatoire |
| **Visual Storytelling** | Narration visuelle qui intrigue | Illustrations qui révèlent une histoire |

**Le piège** : Ce Core Drive active le même circuit que le jeu pathologique. Utiliser avec responsabilité.

#### Core Drive 8 : Loss & Avoidance

> La peur de perdre ce qu'on a acquis, de manquer une opportunité, de régresser.

| Technique | Description | Exemple |
|---|---|---|
| **Progress Loss** | Risque de perdre la progression | Streak reset |
| **Countdown Timer** | Urgence temporelle | « Plus que 2h pour compléter » |
| **Status Quo Sloth** | Inertie (rester par défaut) | Renouvellement automatique |
| **Sunk Cost Prison** | « J'ai déjà tellement investi... » | 500h dans le jeu → impossible de quitter |
| **FOMO** | Fear Of Missing Out | « Événement limité ! » |
| **Evanescence Opportunity** | Opportunité qui disparaît | « Badge disponible uniquement ce weekend » |
| **Weep Tune** | Message émotionnel de perte | « Ton streak de 30 jours est perdu... » |

**Le Core Drive le plus dangereux éthiquement.** Très efficace mais crée de l'anxiété et de la culpabilité. À utiliser avec parcimonie.

### Les quadrants de l'Octalysis

```
             LEFT BRAIN                    RIGHT BRAIN
          (Extrinsèque)                  (Intrinsèque)
        ┌────────────────────────────────────────────┐
        │                                            │
WHITE   │  CD2: Accomplishment    CD3: Creativity    │  WHITE
HAT     │  CD4: Ownership         CD1: Epic Meaning  │  HAT
(Positif│                                            │  (Positif)
        │────────────────────────────────────────────│
        │                                            │
BLACK   │  CD6: Scarcity          CD7: Unpredictability│ BLACK
HAT     │  CD8: Loss/Avoidance    CD5: Social Influence│ HAT
(Négatif│                                            │  (Négatif)
        └────────────────────────────────────────────┘
```

- **White Hat** (haut) : L'utilisateur se sent bien, puissant, satisfait → Engagement durable
- **Black Hat** (bas) : L'utilisateur est poussé par l'urgence, la peur, la curiosité → Engagement intense mais fragile
- **Left Brain** : Motivation par la logique, la possession, l'accomplissement → Extrinsèque
- **Right Brain** : Motivation par la créativité, la curiosité, le sens → Intrinsèque

**Stratégie idéale** : Utiliser le White Hat pour l'engagement long terme, le Black Hat uniquement pour des moments ponctuels (onboarding, réactivation).

### Scoring Octalysis

Pour analyser votre produit, évaluez chaque Core Drive de 0 à 10 :

```
Score = côté² = (valeur CD)²

Exemple : CD2 = 8 → Score CD2 = 64
Total Octalysis Score = Σ(CDᵢ²)
```

Un bon produit devrait avoir un score **équilibré** sur les 8 drives, pas seulement fort sur CD2 (le piège classique du « PBL-only »).

---

## 2. Framework MDA (Mechanics, Dynamics, Aesthetics)

### Hunicke, LeBlanc & Zubek (2004)

Le framework MDA structure le game design en trois couches :

```
DESIGNER ──▶  Mechanics ──▶  Dynamics ──▶  Aesthetics  ◀── JOUEUR
              (Règles)       (Comportements)  (Émotions)
```

### Les trois couches

#### Mechanics (Mécaniques)

Les règles et systèmes concrets du jeu :
- Points, badges, niveaux, quêtes
- Règles de scoring, conditions de victoire
- Timers, limites, contraintes
- Systèmes de progression

#### Dynamics (Dynamiques)

Les comportements émergents quand les joueurs interagissent avec les mécaniques :
- Compétition ou coopération entre joueurs
- Optimisation de stratégie
- Exploration et découverte
- Gestion de ressources

#### Aesthetics (Esthétiques)

Les réponses émotionnelles que le joueur ressent :

| Esthétique | Description | Exemple |
|---|---|---|
| **Sensation** | Plaisir sensoriel | Animations fluides, sons satisfaisants |
| **Fantasy** | Immersion dans un monde imaginaire | Narrative, personnage, quête héroïque |
| **Narrative** | Déroulement d'une histoire | Progression de l'histoire via les niveaux |
| **Challenge** | Plaisir de surmonter un obstacle | Difficulté progressive, boss fights |
| **Fellowship** | Plaisir social, coopération | Guildes, défis d'équipe |
| **Discovery** | Plaisir d'explorer et trouver | Easter eggs, contenu caché |
| **Expression** | Plaisir de créer et personnaliser | Avatar, customisation |
| **Submission** | Plaisir de se laisser porter | Casual gaming, relaxation |

### Application à la gamification

**Erreur commune** : Commencer par les Mechanics (« mettons des badges ! ») au lieu de commencer par les Aesthetics (« quelle émotion voulons-nous créer ? »).

**Processus correct** :
1. Définir les **Aesthetics** souhaitées (« on veut que l'utilisateur ressente de la fierté et de la découverte »)
2. Concevoir les **Dynamics** qui produisent ces émotions (« progression visible + surprises cachées »)
3. Implémenter les **Mechanics** qui créent ces dynamiques (« barres de progression + badges secrets »)

---

## 3. Bartle's Player Types

### Richard Bartle (1996)

Bartle a identifié 4 types de joueurs basés sur deux axes : Action vs Interaction, et Monde vs Joueurs.

```
                     AGIR SUR
                        │
          KILLERS       │       ACHIEVERS
          (Agir sur     │       (Agir sur
           les joueurs) │        le monde)
                        │
   JOUEURS ─────────────┼─────────────── MONDE
                        │
          SOCIALIZERS   │       EXPLORERS
          (Interagir    │       (Interagir
           avec joueurs)│        avec monde)
                        │
                    INTERAGIR AVEC
```

### Les 4 types

| Type | Motivation | % typique | Ce qu'ils veulent |
|---|---|---|---|
| **Achiever** (♦) | Accomplissement, maîtrise | ~10% | Points, badges, niveaux, classements, 100% completion |
| **Explorer** (♠) | Découverte, compréhension | ~10% | Easter eggs, contenu caché, systèmes complexes, lore |
| **Socializer** (♥) | Relations, communauté | ~80% | Chat, amis, collaboration, partage, reconnaissance |
| **Killer** (♣) | Compétition, domination | ~1% | PvP, classements, griefing, pouvoir sur les autres |

### Implications pour le design

| Type | Mécaniques à privilégier | Mécaniques à éviter |
|---|---|---|
| **Achiever** | Badges, niveaux, leaderboards, challenges | Contenu sans objectif clair |
| **Explorer** | Contenu caché, systèmes profonds, lore | Parcours linéaire obligatoire |
| **Socializer** | Guildes, chat, partage, feedback social | Expérience solitaire forcée |
| **Killer** | PvP, classements compétitifs, domination | Systèmes coopératifs obligatoires |

### Limites du modèle

- **Trop simpliste** — La plupart des gens sont un mélange
- **Orienté MMO** — Conçu pour les jeux massivement multijoueurs
- **Statique** — Ne prend pas en compte l'évolution du joueur

→ Des modèles plus récents (Hexad, BrainHex) offrent plus de nuance.

---

## 4. Hexad User Types (Marczewski)

### Andrzej Marczewski (2015)

Le modèle Hexad est spécifiquement conçu pour la gamification (pas le gaming) et identifie 6 types d'utilisateurs :

| Type | Motivation (SDT) | Ce qu'il veut | Mécaniques |
|---|---|---|---|
| **Philanthropist** | Relation + Sens | Aider les autres, donner du sens | Dons, mentorat, contribution communautaire |
| **Socialiser** | Relation | Interagir avec les autres | Chat, équipes, activités sociales |
| **Free Spirit** | Autonomie | Explorer, créer librement | Personnalisation, monde ouvert, création |
| **Achiever** | Compétence | Maîtriser, progresser | Quêtes, niveaux, badges de maîtrise |
| **Player** | Récompenses | Gagner des récompenses | Points, prix, classements, loteries |
| **Disruptor** | Changement | Changer le système | Outils de modding, feedback, votes |

### Différences clés avec Bartle

- **Basé sur la SDT** (autonomie, compétence, relation)
- **6 types au lieu de 4** (plus nuancé)
- **Conçu pour la gamification**, pas le jeu pur
- Le **Disruptor** est un ajout important (utilisateur qui veut changer les règles)
- Le **Philanthropist** et le **Player** sont des distinctions nouvelles

---

## 5. Le modèle 6D de Kevin Werbach

### Les 6 étapes du design de gamification

Kevin Werbach (professeur à Wharton) propose un processus en 6 étapes :

| Étape | Description | Question clé |
|---|---|---|
| **D1 — Define** | Définir les objectifs business | Quel comportement veut-on encourager ? |
| **D2 — Delineate** | Définir les comportements cibles | Quelles actions spécifiques ? |
| **D3 — Describe** | Décrire les joueurs/utilisateurs | Qui sont-ils ? Qu'est-ce qui les motive ? |
| **D4 — Devise** | Concevoir les boucles d'activité | Quels cycles d'engagement ? |
| **D5 — Don't forget** | Ne pas oublier le fun | Est-ce que c'est amusant, pas juste « gamifié » ? |
| **D6 — Deploy** | Déployer avec des outils adaptés | Quelles technologies ? Quel MVP ? |

### Les boucles d'activité (Étape D4)

Werbach distingue deux types de boucles :

#### Boucles d'engagement (micro)

```
┌──────────────┐
│  MOTIVATION  │
│  (pourquoi)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   ACTION     │
│  (quoi)      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  FEEDBACK    │──────┐
│  (résultat)  │      │
└──────────────┘      │
       ▲              │
       └──────────────┘
```

**Exemples** :
- Motivation (streak en danger) → Action (ouvrir l'app) → Feedback (streak sauvé + XP)
- Motivation (badge proche) → Action (lire un article) → Feedback (progression +1)

#### Boucles de progression (macro)

```
Niveau 1 ──▶ Niveau 2 ──▶ Niveau 3 ──▶ ... ──▶ Mastery
(Novice)     (Apprenti)    (Intermédiaire)      (Expert)

Chaque niveau :
- Débloque de nouvelles mécaniques
- Augmente la difficulté
- Introduit de nouveaux défis
```

---

## 6. Le modèle GAME de Marczewski

### Un modèle en 4 phases

| Phase | Description | Activités |
|---|---|---|
| **G — Gather** | Collecter des données | Recherche utilisateur, analytics, interviews |
| **A — Act** | Agir sur les données | Concevoir les mécaniques, prototyper |
| **M — Measure** | Mesurer les résultats | KPIs, A/B tests, cohortes |
| **E — Enrich** | Enrichir et itérer | Optimiser, ajouter, ajuster |

Ce modèle est itératif — après Enrich, on retourne à Gather.

---

## 7. Le modèle Hook (Nir Eyal)

### Les 4 phases du Hook Model

Détaillé dans le chapitre 05, voici le résumé :

```
    ┌──────────┐
    │ TRIGGER  │ ← Externe puis interne
    └────┬─────┘
         │
    ┌────▼─────┐
    │  ACTION  │ ← La plus simple possible
    └────┬─────┘
         │
    ┌────▼─────────┐
    │  VARIABLE    │ ← Récompense imprévisible
    │  REWARD      │
    └────┬─────────┘
         │
    ┌────▼──────────┐
    │ INVESTMENT    │ ← L'utilisateur donne quelque chose
    └────┬──────────┘
         │
         └──────────▶ Retour au TRIGGER (interne cette fois)
```

---

## 8. Le PERMA Model (Seligman) appliqué à la gamification

### Psychologie positive

Martin Seligman (fondateur de la psychologie positive) identifie 5 éléments du bien-être :

| Élément | Description | Application gamification |
|---|---|---|
| **P — Positive Emotions** | Émotions positives | Confetti, animations joyeuses, surprises |
| **E — Engagement** | État de flow, absorption | Difficulté adaptive, feedback immédiat |
| **R — Relationships** | Relations significatives | Social, collaboration, mentorat |
| **M — Meaning** | Sens et but | Narrative, contribution, impact réel |
| **A — Accomplishment** | Réalisation et maîtrise | Badges, niveaux, progression |

### L'avantage du PERMA

Contrairement aux frameworks de gamification purs, le PERMA center le design sur le **bien-être de l'utilisateur** plutôt que sur l'engagement de l'entreprise. C'est un antidote au Black Hat Octalysis.

---

## 9. Comparaison des frameworks

| Critère | Octalysis | MDA | Bartle | Hexad | 6D | Hook |
|---|---|---|---|---|---|---|
| **Complexité** | Élevée | Moyenne | Faible | Moyenne | Moyenne | Faible |
| **Focus** | Motivations | Game design | Types joueurs | Types utilisateurs | Processus | Habitudes |
| **Éthique intégrée** | Partiellement (White/Black Hat) | Non | Non | Partiellement | Non | Non |
| **Actionnable** | Très | Modérément | Modérément | Très | Très | Très |
| **Adapté à** | Tout produit | Game design | Jeux multijoueurs | Gamification | Stratégie | Produits digitaux |
| **Recommandé pour** | Analyse approfondie | Conception émotionnelle | Segmentation basique | Segmentation avancée | Processus complet | Formation d'habitudes |

### Recommandation

**Utilisez plusieurs frameworks ensemble** :
1. **Octalysis** pour l'analyse et le scoring de votre gamification
2. **Hexad** pour comprendre vos types d'utilisateurs
3. **6D** comme processus de conception
4. **MDA** pour aligner mécaniques → comportements → émotions
5. **Hook** pour la formation d'habitudes

---

## 10. Anti-patterns : ce que les frameworks nous enseignent à éviter

### Le PBL Trap (Points, Badges, Leaderboards)

Le piège le plus courant : réduire la gamification au PBL.

```
GAMIFICATION COMPLÈTE (Octalysis)
┌──────────────────────────────────────┐
│  Epic Meaning, Creativity, Social,  │
│  Unpredictability, Ownership,       │
│  Scarcity, Avoidance,               │
│  ┌──────────────────┐               │
│  │    PBL (CD2)     │ ← La majorité │
│  │  Points, Badges, │    ne fait    │
│  │  Leaderboards    │    que ça     │
│  └──────────────────┘               │
└──────────────────────────────────────┘
```

**Symptômes du PBL Trap** :
- Les utilisateurs font des actions uniquement pour les points
- L'engagement chute dès que les récompenses s'arrêtent
- Les utilisateurs trouvent le système « creux » ou « artificiel »
- Pas de rétention à long terme

**Solution** : Équilibrer les 8 Core Drives, pas uniquement CD2.

---

## Lectures recommandées

- **Chou, Y.** — *Actionable Gamification: Beyond Points, Badges, and Leaderboards* (2015)
- **Werbach, K. & Hunter, D.** — *For the Win: How Game Thinking Can Revolutionize Your Business* (2012)
- **Hunicke, R., LeBlanc, M. & Zubek, R.** — *MDA: A Formal Approach to Game Design and Game Research* (2004)
- **Marczewski, A.** — *Even Ninja Monkeys Like to Play* (2015)
- **Bartle, R.** — *Hearts, Clubs, Diamonds, Spades: Players Who Suit MUDs* (1996)
- **Seligman, M.** — *Flourish* (2011)
