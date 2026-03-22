# 04 — Catalogue des mécaniques de jeu

> Référence exhaustive de toutes les mécaniques de gamification connues, avec descriptions, exemples concrets et conseils d'implémentation.

---

## Classification des mécaniques

Les mécaniques sont organisées en 7 catégories fonctionnelles :

1. **Progression** — Avancer, grandir, évoluer
2. **Récompense** — Gagner, obtenir, collectionner
3. **Social** — Interagir, collaborer, rivaliser
4. **Temporel** — Régularité, urgence, rareté
5. **Défi** — Surmonter, résoudre, maîtriser
6. **Narratif** — Raconter, découvrir, vivre une histoire
7. **Feedback** — Retour immédiat, visualisation, célébration

---

## 1. Mécaniques de progression

### 1.1 Points (XP / Experience Points)

**Description** : Unité de mesure quantifiée de l'activité ou de la progression.

| Aspect | Détail |
|---|---|
| **Types** | XP (expérience), SP (skill), RP (réputation), CP (currency) |
| **Fonction** | Mesurer le progrès, alimenter le level-up, monnaie d'échange |
| **Visibilité** | Toujours visible ou uniquement dans le profil |
| **Accumulation** | Linéaire ou exponentielle |

**Variantes** :
- **Points d'expérience (XP)** — Progressent vers le prochain niveau
- **Points de compétence (SP)** — Liés à une compétence spécifique
- **Points de réputation** — Basés sur la qualité (votes des pairs)
- **Monnaie virtuelle** — Échangeables contre des récompenses
- **Points de karma** — Basés sur la contribution à la communauté

**Bonnes pratiques** :
- Les points doivent avoir un **sens** (pas juste un nombre)
- Lier les points à des actions **significatives** (pas cliquer partout)
- Pas d'inflation excessive (si tout donne des points, rien n'en a)
- Combiner avec une autre mécanique (niveaux, badges) pour donner du contexte

**Exemples** :
- Stack Overflow : points de réputation (upvotes sur réponses)
- Duolingo : XP par leçon complétée
- Reddit : Karma (post karma + comment karma)

---

### 1.2 Niveaux (Levels)

**Description** : Paliers de progression qui découpent l'expérience en étapes.

**Types de courbes de progression** :

```
XP requis
par niveau
    ▲
    │                          ╱ Exponentielle
    │                        ╱   (RPG classique)
    │                      ╱
    │                    ╱
    │               ───── Logarithmique
    │            ──╱      (progression rapide au début)
    │         ╱──
    │      ╱──────────── Linéaire
    │   ╱──              (progression constante)
    │╱──
    └────────────────────▶ Niveau
```

| Courbe | Avantage | Inconvénient | Quand l'utiliser |
|---|---|---|---|
| **Linéaire** | Simple, prévisible | Peut devenir ennuyeux | Apps simples |
| **Exponentielle** | Sens de progression croissante | Les niveaux élevés deviennent inaccessibles | Jeux long terme |
| **Logarithmique** | Gratification rapide au début | Ralentissement perçu | Onboarding rapide |
| **Par paliers** | Contrôle précis du rythme | Complex à équilibrer | Apps professionnelles |

**Bonnes pratiques** :
- Chaque niveau devrait débloquer quelque chose de concret (pas juste un nombre)
- 5-10 niveaux est idéal pour la plupart des apps (pas 100)
- Le premier niveau doit être atteint en < 5 minutes
- Afficher le progrès vers le prochain niveau (barre ou fraction)

---

### 1.3 Barres de progression (Progress Bars)

**Description** : Représentation visuelle du pourcentage de complétion.

**Fondement psychologique** : L'effet Zeigarnik — les tâches incomplètes restent en mémoire et créent une tension cognitive qui motive la complétion.

**Types** :
- **Linéaire** — Barre horizontale classique
- **Circulaire** — Anneaux (style Apple Watch)
- **Segmentée** — Étapes discrètes (profil LinkedIn)
- **Animée** — Avec transition fluide à chaque progression

**Bonnes pratiques** :
- **Commencer à > 0%** (Endowed Progress Effect) — « Tu as déjà complété 12% en créant ton compte ! »
- **Accélérer visuellement la fin** — La barre devrait sembler avancer plus vite vers 90-100%
- **Micro-célébrations** à chaque étape franchie
- **Pas de régression** — Ne jamais faire reculer une barre de progression (sauf indication explicite)

---

### 1.4 Arbre de compétences (Skill Tree)

**Description** : Graphe de compétences à débloquer progressivement, avec des branches et des prérequis.

```
                    ┌──────┐
                    │Master│
                    └──┬───┘
               ┌───────┴───────┐
          ┌────┴────┐    ┌─────┴────┐
          │Advanced │    │ Advanced │
          │  Path A │    │  Path B  │
          └────┬────┘    └─────┬────┘
          ┌────┴────┐    ┌─────┴────┐
          │Inter.   │    │ Inter.   │
          │Level A  │    │ Level B  │
          └────┬────┘    └─────┬────┘
               └───────┬───────┘
                  ┌────┴────┐
                  │  Basics │
                  └─────────┘
```

**Bonnes pratiques** :
- Permettre le **choix de branche** (autonomie)
- Prérequis visibles mais pas bloquants trop tôt
- 3-4 niveaux de profondeur maximum
- Visualiser les branches non encore explorées (motivant)

---

### 1.5 Mastery System

**Description** : Système de maîtrise par compétence (pas global), inspiré de Khan Academy.

| Niveau | Description | Indicateur visuel |
|---|---|---|
| **Non commencé** | Jamais touché | Gris, cadenas |
| **Familiarisé** | 1-2 exercices | Bleu clair |
| **Pratiqué** | Plusieurs exercices réussis | Bleu |
| **Maîtrisé** | Score parfait + rétention | Or / étoile |

**Avantage** : Plus granulaire que les niveaux globaux. L'utilisateur voit exactement où il excelle et où il doit progresser.

---

## 2. Mécaniques de récompense

### 2.1 Badges / Achievements

**Description** : Récompenses visuelles permanentes qui marquent l'accomplissement d'un objectif spécifique.

**Taxonomie des badges** :

| Type | Description | Exemple | Difficulté |
|---|---|---|---|
| **Onboarding** | Actions de découverte | « Premier pas » (créer un compte) | Facile |
| **Régularité** | Constance dans le temps | « 7 jours consécutifs » | Moyenne |
| **Quantité** | Volume d'actions | « 100 articles lus » | Variable |
| **Qualité** | Excellence dans une action | « Score parfait au quiz » | Difficile |
| **Exploration** | Découverte de fonctionnalités | « A exploré toutes les catégories » | Moyenne |
| **Social** | Interaction avec les autres | « A aidé 10 utilisateurs » | Moyenne |
| **Secret** | Non visible avant obtention | « ??? » (easter egg) | Variable |
| **Événement** | Disponible temporairement | « Participant Beta 2026 » | Exclusif |
| **Mastery** | Maîtrise complète d'un domaine | « Master JavaScript » | Très difficile |

**Système de tiers** :

```
🥉 Bronze    — Accessible à 80% des utilisateurs
🥈 Argent    — Accessible à 30% des utilisateurs
🥇 Or        — Accessible à 10% des utilisateurs
💎 Diamant   — Accessible à 1% des utilisateurs
```

**Bonnes pratiques** :
- Le premier badge doit être obtenu en **< 2 minutes** d'utilisation
- Chaque badge doit avoir une **description** de comment il a été obtenu
- Les badges secrets ne doivent pas représenter plus de 10-20% du total
- Pas trop de badges (20-50 est idéal, pas 500)
- Chaque badge doit être **significatif** (pas de badge pour avoir cliqué sur un bouton)

---

### 2.2 Récompenses variables (Loot / Mystery Rewards)

**Description** : Récompenses dont le contenu est inconnu à l'avance.

**Types** :
- **Mystery Box** — Coffre avec contenu aléatoire
- **Daily Reward** — Récompense quotidienne différente chaque jour
- **Spin Wheel** — Roue de la fortune
- **Gacha** — Tirage aléatoire d'items avec raretés

**Fondement** : Ratio variable de renforcement (Skinner). Le cerveau libère plus de dopamine quand la récompense est incertaine.

**Attention éthique** : Les loot boxes sont réglementées dans certains pays (Belgique, Pays-Bas) et considérées comme du jeu d'argent quand elles impliquent un achat.

**Alternative éthique** :
- « Récompense surprise » après un accomplissement (pas à acheter)
- Contenu du coffre visible mais l'item reçu est aléatoire
- Pas de récompenses payantes aléatoires

---

### 2.3 Collections

**Description** : Ensembles d'items à collectionner pour atteindre la complétion.

**Fondement** : L'effet collection (Set Completion) — le cerveau est câblé pour vouloir compléter un ensemble.

**Exemples** :
- Pokémon : « Attrapez-les tous »
- Panini : album de stickers
- Apps : collection de badges par catégorie

**Bonnes pratiques** :
- Montrer les items manquants (silhouettes grises) pour motiver
- Récompense bonus à la complétion du set
- Sets de taille raisonnable (5-10 items, pas 500)
- Possibilité d'afficher sa collection sur son profil

---

### 2.4 Streaks

**Description** : Compteur de jours consécutifs d'activité.

**Le mécanisme de gamification le plus puissant** selon les données (Duolingo, Snapchat, GitHub).

**Anatomie d'un streak** :

```
Jour 1  ●  ← Facile de commencer
Jour 3  ●●●  ← Premier sentiment d'accomplissement
Jour 7  ●●●●●●●  ← « Toute une semaine ! »
Jour 14 ████████████████  ← Habitude en formation
Jour 30 ████████████████████████████████  ← Habitude établie
Jour 100 ████... ← Investissement sunk cost + fierté
```

**Éléments essentiels** :
- **Grace period** — Permettre 1 jour de pause sans casser le streak
- **Streak freeze** — Item achetable/gagnable pour protéger le streak
- **Streak recovery** — Possibilité de restaurer un streak récemment perdu
- **Célébration aux milestones** — 7, 30, 100, 365 jours
- **Streak longest record** — Garder la trace du plus long streak

**Risques** :
- Anxiété de perte (surtout après 50+ jours)
- L'activité devient une corvée (« je le fais pour le streak, pas pour moi »)
- Abandon brutal après perte d'un long streak

---

### 2.5 Monnaie virtuelle

**Description** : Devise in-app échangeable contre des récompenses.

**Types** :
- **Soft currency** — Gagnée par l'activité (gemmes, coins)
- **Hard currency** — Achetée avec de l'argent réel (premium coins)
- **Dual currency** — Les deux systèmes coexistent

**Bonnes pratiques** :
- Taux de change clair et stable
- Les items essentiels doivent être accessibles en soft currency
- Pas de pay-to-win dans les classements

---

## 3. Mécaniques sociales

### 3.1 Leaderboards (Classements)

**Description** : Classement des utilisateurs par score, activité ou autre métrique.

**Types de leaderboards** :

| Type | Description | Avantage | Risque |
|---|---|---|---|
| **Global** | Tous les utilisateurs | Vision d'ensemble | Décourageant pour les nouveaux |
| **Amis uniquement** | Cercle social | Comparaison pertinente | Besoin d'amis actifs |
| **Relatif** | ±10 positions autour de vous | Toujours compétitif | Peut sembler artificiel |
| **Hebdomadaire** | Reset chaque semaine | Chance de recommencer | Perd l'historique |
| **Par catégorie** | Par sujet/compétence | Comparaison juste | Fragmentation |
| **Équipe** | Groupes vs groupes | Collaboration | Blame des faibles |

**Le « Relative Leaderboard »** est la meilleure approche (Duolingo l'utilise) : l'utilisateur voit toujours les 5 au-dessus et les 5 en-dessous de lui, ce qui le rend toujours compétitif.

**Bonnes pratiques** :
- Anonymiser les dernières positions (pas de « shame board »)
- Reset périodique pour donner une chance aux nouveaux
- Opt-in, pas opt-out
- Montrer le progrès relatif (« +3 places cette semaine »)

---

### 3.2 Guildes / Équipes

**Description** : Groupements d'utilisateurs qui collaborent vers un objectif commun.

**Éléments** :
- Nom et identité du groupe
- Objectifs collectifs
- Chat interne
- Classement d'équipe
- Rôles (leader, officier, membre)

**Bénéfices** :
- Pression sociale positive (ne pas décevoir l'équipe)
- Sentiment d'appartenance
- Entraide et mentorat naturel
- Rétention augmentée (on ne quitte pas un groupe)

---

### 3.3 Défis sociaux

**Description** : Compétitions ou collaborations entre utilisateurs.

**Types** :
- **1v1** — Duel direct
- **Équipe vs Équipe** — Compétition de groupe
- **Collaboratif** — Tout le monde contribue à un objectif commun
- **Cascade** — Défi transmis d'une personne à l'autre (chain challenge)

**Le défi collaboratif est sous-utilisé** et souvent plus efficace que la compétition pure :
- « Ensemble, lisons 10 000 articles ce mois-ci » (barre de progression commune)
- Pas de perdant, tout le monde contribue
- Renforce l'appartenance

---

### 3.4 Partage et reconnaissance

**Description** : Capacité de partager ses accomplissements et de reconnaître ceux des autres.

**Mécanismes** :
- Partage de badge sur les réseaux sociaux
- « Applaudir » ou « féliciter » les accomplissements des autres
- Feed d'activité des amis
- Mentions et tags

---

## 4. Mécaniques temporelles

### 4.1 Daily Rewards (Récompenses quotidiennes)

**Description** : Récompense croissante pour chaque jour consécutif de connexion.

```
Jour 1: 🟢 10 coins
Jour 2: 🟢 20 coins
Jour 3: 🟢 30 coins
Jour 4: 🟢 50 coins
Jour 5: 🟢 75 coins
Jour 6: 🟢 100 coins
Jour 7: 🌟 200 coins + BADGE BONUS
        ↕ Reset et recommence
```

**Bonnes pratiques** :
- Crescendo progressif (pas linéaire — le jour 7 doit être spécial)
- Reset hebdomadaire (pas mensuel — trop long)
- Le « calendrier de connexion » est un pattern éprouvé
- Ne pas pénaliser les jours manqués (juste pas de récompense)

---

### 4.2 Événements limités (Limited-Time Events)

**Description** : Contenu ou défis disponibles uniquement pendant une période.

**Types** :
- **Saisonnier** — Événement de Noël, Halloween, été
- **Événement flash** — 24-48h d'événement spécial
- **Lancement** — Badge de « early adopter »
- **Anniversaire** — Célébration de la date d'inscription

**Fondement** : FOMO (Fear Of Missing Out) et rareté.

**Bonnes pratiques** :
- Donner suffisamment de temps pour participer (pas 1h)
- Les récompenses exclusives doivent être cosmétiques, pas fonctionnelles
- Prévenir à l'avance (pas de surprise de dernière minute)

---

### 4.3 Cooldowns et énergie

**Description** : Limiter les actions par période (vies, énergie, tentatives).

**Exemples** :
- Duolingo : 5 vies par session
- Jeux mobiles : énergie qui se recharge en temps réel
- Apps d'apprentissage : « Reviens demain pour la suite »

**Attention** : Cette mécanique est souvent perçue comme de la monétisation déguisée (payer pour plus d'énergie). À utiliser avec précaution.

---

### 4.4 Compte à rebours (Countdown)

**Description** : Timer qui crée de l'urgence.

**Types** :
- **Offre limitée** — « Plus que 23h pour cette récompense »
- **Défi chronométré** — Quiz avec timer
- **Attente** — « Ton item sera prêt dans 4h »

**Fondement** : La loi de Parkinson (le travail s'étend pour remplir le temps disponible) → ajouter une contrainte de temps augmente la productivité.

**Risque** : Stress excessif si le timer est trop agressif.

---

## 5. Mécaniques de défi

### 5.1 Quêtes / Missions

**Description** : Objectifs structurés avec des étapes claires et une récompense finale.

**Types** :

| Type | Description | Durée | Exemple |
|---|---|---|---|
| **Tutoriel** | Apprendre les bases | 5-15 min | « Complète ton profil » |
| **Quotidienne** | Objectif du jour | 1 jour | « Lis 1 article aujourd'hui » |
| **Hebdomadaire** | Objectif de la semaine | 1 semaine | « Lis 5 articles cette semaine » |
| **Principale** | Arc narratif | Semaines | « Deviens expert en JavaScript » |
| **Secondaire** | Optionnelle | Variable | « Explore la section Design » |
| **Secrète** | Non visible | Variable | Découverte par l'exploration |

**Structure d'une quête** :

```
🏰 QUÊTE : Devenir Expert JavaScript
├── 📋 Étape 1/5 : Les bases (✅ Complété)
│   └── Lire 3 articles sur les variables
├── 📋 Étape 2/5 : Les fonctions (🔄 En cours - 2/3)
│   └── Lire 3 articles sur les fonctions
├── 🔒 Étape 3/5 : Les objets
├── 🔒 Étape 4/5 : L'asynchrone
└── 🔒 Étape 5/5 : Les patterns avancés
    └── 🏆 Récompense : Badge "Expert JavaScript" (Or)
```

---

### 5.2 Boss Fights / Défis majeurs

**Description** : Épreuve significative qui teste la maîtrise de plusieurs compétences.

**Exemples** :
- Quiz récapitulatif de fin de module
- Projet pratique qui combine tout ce qui a été appris
- Défi chronométré avec score minimum requis

**Bonnes pratiques** :
- Préparation adéquate (le joueur ne doit pas être surpris)
- Possibilité de réessayer
- Feedback détaillé après l'échec
- Récompense proportionnelle à la difficulté

---

### 5.3 Puzzles et énigmes

**Description** : Défis qui nécessitent réflexion et créativité.

**Types** :
- **Logique** — Séquences, patterns, déduction
- **Connaissance** — Quiz, trivia
- **Pratique** — Exercices interactifs, coding challenges
- **Créatif** — Open-ended, sans solution unique

---

### 5.4 Difficulté adaptive

**Description** : Le système ajuste automatiquement la difficulté en fonction du niveau de l'utilisateur.

**Algorithme simplifié** :

```
Si taux_succès > 80% → augmenter la difficulté
Si taux_succès < 50% → diminuer la difficulté
Si taux_succès entre 50-80% → maintenir (zone de flow)
```

**Implémentations** :
- **ELO rating** — Adapté des échecs, utilisé par Duolingo
- **Spaced repetition** — Anki, SuperMemo (intervalle adaptatif)
- **Branching** — Chemins différents selon les réponses

---

## 6. Mécaniques narratives

### 6.1 Storytelling / Narrative

**Description** : Intégrer l'expérience gamifiée dans une histoire engageante.

**Types de narrative** :

| Type | Description | Exemple |
|---|---|---|
| **Linéaire** | Histoire qui progresse séquentiellement | Aventure chapitre par chapitre |
| **Branching** | Choix qui influencent l'histoire | « Choisis ton chemin » |
| **Environnementale** | L'histoire est dans le décor | Indices visuels, détails cachés |
| **Émergente** | L'histoire naît des actions du joueur | « Tu as créé ton propre parcours » |

**Bonnes pratiques** :
- L'histoire ne doit pas bloquer la progression (skippable)
- Personnages attachants avec des motivations claires
- Cliffhangers pour donner envie de revenir
- La narrative renforce le sens (Core Drive 1)

---

### 6.2 Avatars et identité

**Description** : Représentation visuelle personnalisable de l'utilisateur.

**Éléments customisables** :
- Apparence physique
- Vêtements et accessoires (débloqués par progression)
- Titre / rang
- Cadre de profil
- Couleur de fond

**Fondement** : L'effet Proteus — notre avatar influence notre comportement réel. Un avatar « héroïque » nous rend plus confiants.

---

### 6.3 Monde et cartographie

**Description** : Représenter la progression comme un voyage à travers un monde.

**Exemples** :
- Carte avec des étapes (style jeu de plateau)
- Monde à explorer avec des zones débloquées
- Chemin de progression sur une carte

---

## 7. Mécaniques de feedback

### 7.1 Feedback immédiat

**Description** : Retour instantané après chaque action de l'utilisateur.

**Types de feedback** :

| Type | Timing | Exemple |
|---|---|---|
| **Visuel** | Instantané (< 100ms) | Changement de couleur, animation |
| **Sonore** | Instantané | Son de succès, click satisfaisant |
| **Haptique** | Instantané | Vibration sur mobile |
| **Textuel** | < 1 seconde | « Bien joué ! », « +10 XP » |
| **Narratif** | Après action significative | « Tu as débloqué le chapitre 3 ! » |

**La règle des 400ms** : Le feedback doit arriver en moins de 400ms pour que le cerveau l'associe à l'action. Au-delà, la connexion causale est perdue.

---

### 7.2 Micro-célébrations

**Description** : Petites animations de récompense qui renforcent le comportement positif.

**Exemples** :
- **Confetti** — Pour les accomplissements majeurs
- **Bounce** — Animation rebond pour les badges
- **Glow** — Halo lumineux sur l'élément
- **Shake** — Tremblement pour les alertes
- **Scale** — Agrandissement momentané
- **Particle burst** — Explosion de particules
- **Sound** — Son satisfaisant (ding, whoosh)
- **Streak fire** — Flamme animée

**Bonnes pratiques** :
- Proportionnel à l'importance de l'accomplissement
- Respecter `prefers-reduced-motion`
- Pas de son par défaut (opt-in)
- Ne pas en abuser (fatigue de célébration)

---

### 7.3 Toast / Notifications d'accomplissement

**Description** : Message temporaire qui apparaît pour informer d'un événement.

**Structure** :
```
┌───────────────────────────────────┐
│ 🏆 Badge débloqué !              │
│                                   │
│ Explorateur curieux               │
│ Tu as lu 10 articles différents   │
│                                   │
│ [Voir] [Fermer]                   │
└───────────────────────────────────┘
```

**Bonnes pratiques** :
- Auto-dismiss en 5-8 secondes
- Ne pas bloquer l'interface
- Stackable (si plusieurs en même temps)
- Accessible (aria-live="polite")

---

### 7.4 Récapitulatifs et rapports

**Description** : Résumé périodique de l'activité et de la progression.

**Types** :
- **Fin de session** — « Tu as lu 3 articles et gagné 50 XP »
- **Hebdomadaire** — « Cette semaine : 5 articles, 2 badges, streak maintenu »
- **Mensuel** — « Ce mois-ci, tu as progressé de 15% »
- **Annuel** — « Ton année en review » (Spotify Wrapped)

**Le « Year in Review »** est un format extrêmement viral (Spotify Wrapped, GitHub Year in Review) car il combine storytelling + données personnelles + partageabilité.

---

## 8. Mécaniques émergentes et avancées

### 8.1 Méta-jeu (Metagaming)

Quand les utilisateurs développent des stratégies au-delà des mécaniques prévues :
- Optimisation de l'XP/heure
- Guides et walkthroughs communautaires
- Min-maxing (optimiser certains aspects au détriment d'autres)

**C'est un signe de succès** — ça signifie que votre système est assez profond pour être « joué ».

### 8.2 User-Generated Content (UGC)

Permettre aux utilisateurs de créer du contenu gamifié :
- Créer des quêtes pour les autres
- Concevoir des défis communautaires
- Voter sur le meilleur contenu

### 8.3 Prestige / New Game+

Après avoir atteint le maximum, recommencer avec des bonus :
- Reset de niveau mais avec des avantages permanents
- Nouveau tier de badges (Prestige 1, 2, 3...)
- Contenu exclusif pour les « prestigés »

**Avantage** : Résout le problème de fin de contenu pour les utilisateurs avancés.

---

## 9. Matrice de sélection des mécaniques

### Par objectif business

| Objectif | Mécaniques recommandées | Mécaniques à éviter |
|---|---|---|
| **Acquisition** | Badges partageables, referral rewards | Mécaniques complexes (trop de friction) |
| **Activation** | Onboarding gamifié, premier badge rapide | Streaks (trop tôt) |
| **Rétention** | Streaks, daily rewards, progression | Leaderboards (décourageants pour les nouveaux) |
| **Revenue** | Monnaie virtuelle, cosmétiques | Pay-to-win, loot boxes payantes |
| **Referral** | Récompenses de parrainage, partage social | Spam social |

### Par type d'utilisateur (Hexad)

| Type utilisateur | Top 3 mécaniques |
|---|---|
| **Achiever** | Badges, niveaux, leaderboards |
| **Socializer** | Guildes, partage, défis sociaux |
| **Explorer** | Easter eggs, quêtes secrètes, lore |
| **Philanthropist** | Mentorat, contributions, impact visible |
| **Free Spirit** | Personnalisation, parcours libre, création |
| **Player** | Points, récompenses, classements |

---

## 10. Anti-patterns : mécaniques à éviter

| Anti-pattern | Description | Pourquoi c'est mauvais |
|---|---|---|
| **Badge pour tout** | Badge pour chaque micro-action | Dévalue tous les badges |
| **Streak sans filet** | Perte totale sans recovery possible | Abandon brutal des utilisateurs |
| **Leaderboard shame** | Afficher les derniers du classement | Humiliant et démotivant |
| **Pay-to-win** | Les payants dominent les classements | Injuste, frustrant pour les non-payants |
| **Notification spam** | Trop de notifications gamification | Désinstallation de l'app |
| **Points inflation** | Points donnés pour tout, valeur nulle | Les points perdent leur sens |
| **Forced social** | Partage obligatoire pour progresser | Manipulation, spam social |
| **Dark patterns** | Manipulation émotionnelle | Perte de confiance, problèmes éthiques |

---

## Lectures recommandées

- **Schell, J.** — *The Art of Game Design: A Book of Lenses* (2008)
- **Kapp, K.** — *The Gamification of Learning and Instruction* (2012)
- **Zichermann, G. & Cunningham, C.** — *Gamification by Design* (2011)
- **Kim, A.J.** — *Game Thinking* (2018)
