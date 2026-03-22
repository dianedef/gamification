# 05 — Design comportemental

> Comment concevoir des systèmes qui créent des habitudes durables, en utilisant les sciences comportementales.

---

## 1. Le Hook Model (Nir Eyal)

### Vue d'ensemble

Le modèle Hook, décrit dans *Hooked: How to Build Habit-Forming Products* (2014), est le framework le plus utilisé pour concevoir des produits qui créent des habitudes.

### Les 4 phases

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│    ┌──────────┐      ┌──────────┐                   │
│    │ TRIGGER  │─────▶│  ACTION  │                   │
│    │          │      │          │                   │
│    └──────────┘      └────┬─────┘                   │
│         ▲                 │                         │
│         │            ┌────▼─────────┐               │
│    ┌────┴──────┐     │  VARIABLE    │               │
│    │INVESTMENT │◀────│  REWARD      │               │
│    │           │     │              │               │
│    └───────────┘     └──────────────┘               │
│                                                     │
│    Chaque cycle renforce le suivant                  │
└─────────────────────────────────────────────────────┘
```

### Phase 1 : Trigger (Déclencheur)

#### Triggers externes

| Type | Description | Exemple | Efficacité |
|---|---|---|---|
| **Paid** | Publicité payée | Pub Facebook, Google Ads | Court terme |
| **Earned** | Presse, SEO, viralité | Article de blog viral | Moyen terme |
| **Relationship** | Bouche-à-oreille | Recommandation d'un ami | Long terme |
| **Owned** | Canaux contrôlés | Email, push notification, app icon | Long terme |

#### Triggers internes

Les triggers internes sont l'objectif ultime — l'utilisateur n'a plus besoin de stimulation externe :

| Émotion | Trigger interne | Produit associé |
|---|---|---|
| **Ennui** | « Je m'ennuie » | Instagram, TikTok, Reddit |
| **Solitude** | « Je me sens seul » | Facebook, WhatsApp |
| **Incertitude** | « Je ne sais pas » | Google, Stack Overflow |
| **Anxiété** | « Et si je manque quelque chose ? » | Email, Twitter, Slack |
| **Insatisfaction** | « Je veux progresser » | Duolingo, apps d'apprentissage |

**L'objectif** : Associer votre produit à un trigger interne spécifique. Quand l'utilisateur ressent cette émotion, il pense automatiquement à votre produit.

### Phase 2 : Action

**Modèle de Fogg (B = MAP)** : Un comportement se produit quand trois conditions sont réunies :

```
Behavior = Motivation × Ability × Prompt
```

- **Motivation** — L'utilisateur veut le faire
- **Ability** — L'utilisateur peut le faire facilement
- **Prompt** — L'utilisateur est incité à le faire maintenant

#### Les 6 facteurs de simplicité (Ability)

| Facteur | Question | Optimisation |
|---|---|---|
| **Temps** | Combien de temps ça prend ? | Réduire au minimum |
| **Argent** | Combien ça coûte ? | Gratuit ou très peu |
| **Effort physique** | Quel effort physique ? | Un tap, un swipe |
| **Effort cognitif** | Quel effort mental ? | Interface évidente |
| **Déviance sociale** | Est-ce socialement accepté ? | Normaliser le comportement |
| **Non-routine** | Est-ce nouveau/inhabituel ? | Intégrer dans la routine existante |

**Règle d'or** : Si l'utilisateur a la motivation mais pas la capacité → simplifier l'action. Si l'utilisateur a la capacité mais pas la motivation → augmenter la récompense.

### Phase 3 : Variable Reward (Récompense variable)

Les trois types de récompenses variables :

| Type | Description | Fondement | Exemple |
|---|---|---|---|
| **Tribe (La tribu)** | Récompenses sociales variables | Besoin d'appartenance | Likes, commentaires, mentions |
| **Hunt (La chasse)** | Récompenses matérielles variables | Besoin de ressources | Scroll infini, résultats de recherche |
| **Self (Le soi)** | Récompenses de maîtrise variables | Besoin de compétence | Niveau suivant, compétence débloquée |

**La variabilité est clé** : La même récompense à chaque fois crée de l'habituation. La variabilité maintient l'engagement.

### Phase 4 : Investment (Investissement)

L'utilisateur donne quelque chose qui rend le prochain cycle plus probable :

| Type d'investissement | Description | Effet |
|---|---|---|
| **Données** | Remplir son profil, préférences | Personnalisation future |
| **Contenu** | Créer des posts, commentaires | Attachement au contenu créé |
| **Social** | Ajouter des amis, suivre des gens | Réseau social = coût de sortie |
| **Réputation** | Accumuler des points, badges | Perte de statut si on quitte |
| **Compétence** | Apprendre à utiliser le produit | Coût de ré-apprentissage |
| **Temps** | Heures passées | Sunk cost fallacy |

**Principe** : Chaque investissement améliore le produit pour l'utilisateur, rendant le prochain trigger plus efficace.

---

## 2. Le modèle comportemental de Fogg

### B.J. Fogg (Stanford)

Le Tiny Habits® de Fogg est une approche de changement comportemental fondée sur la science :

### B = MAP (Behavior = Motivation × Ability × Prompt)

```
Motivation
    ▲
    │         ★ Comportement se produit
    │        ╱
    │       ╱  Ligne d'action
    │      ╱   (seuil)
    │     ╱
    │    ╱
    │   ╱  ✗ Comportement ne se produit pas
    │  ╱
    │ ╱
    └────────────────────────▶ Ability (Facilité)
```

Au-dessus de la ligne → le comportement se produit.
En-dessous → il ne se produit pas.

### Les Tiny Habits

**Principe** : Commencer extrêmement petit, puis escalader.

```
Étape 1 : « Après [ANCRE EXISTANTE], je vais [TINY BEHAVIOR] »
Étape 2 : Célébrer immédiatement (« Yes ! »)
Étape 3 : Laisser le comportement grandir naturellement
```

**Exemple en gamification** :
- « Après avoir ouvert mon navigateur (ancre), je lis le titre d'un article (tiny) »
- Célébrer : +5 XP, animation subtile
- Grandit naturellement vers : lire l'article entier

### Les 3 types de Prompts

| Prompt | Description | Quand l'utiliser |
|---|---|---|
| **Person Prompt** | L'utilisateur se rappelle lui-même | Trigger interne établi (utilisateur avancé) |
| **Context Prompt** | L'environnement rappelle | Badge sur l'icône app, widget |
| **Action Prompt** | Quelque chose d'actif rappelle | Push notification, email |

---

## 3. L'architecture de choix (Nudge Theory)

### Thaler & Sunstein (2008)

Le **nudge** est une modification subtile de l'environnement de choix qui influence les décisions sans les contraindre.

### Principes NUDGE

| Lettre | Principe | Description | Exemple gamification |
|---|---|---|---|
| **N** | iNcentives | Rendre les bénéfices visibles | « En complétant ce module, tu gagnes le badge Expert » |
| **U** | Understand mappings | Montrer les correspondances | « 3 articles = 1 badge = top 20% » |
| **D** | Defaults | Bons défauts par défaut | Notifications activées avec fréquence raisonnable |
| **G** | Give feedback | Feedback immédiat | Barre de progression à chaque action |
| **E** | Expect error | Anticiper les erreurs | Streak freeze automatique le premier oubli |
| **S** | Structure complex choices | Simplifier les choix | 3 parcours au lieu de 50 options |

### Les biais cognitifs les plus utiles en gamification

| Biais | Description | Application |
|---|---|---|
| **Ancrage** | La première information influence le jugement | « La plupart des utilisateurs lisent 5 articles/semaine » |
| **Effet de dotation** | On valorise plus ce qu'on possède | Streak, collection, avatar personnalisé |
| **Aversion à la perte** | La perte fait plus mal que le gain | Streaks, countdown timers |
| **Preuve sociale** | On suit ce que font les autres | « 1 247 personnes ont obtenu ce badge » |
| **Biais de statu quo** | Préférence pour l'état actuel | Renouvellement automatique, défauts |
| **Effet IKEA** | On valorise ce qu'on a construit | Profil personnalisé, contenu créé |
| **Peak-end rule** | On se souvient du pic et de la fin | Grande célébration finale |
| **Paradoxe du choix** | Trop de choix paralyse | 3 options, pas 30 |
| **Endowed progress** | La progression donnée motive | Commencer à 10% |
| **Reciprocity** | On rend ce qu'on a reçu | Badge gratuit → plus d'engagement |
| **Completion bias** | Besoin de compléter les ensembles | Collections, barres de progression |
| **Framing** | La façon de présenter change la décision | « 90% réussissent » vs « 10% échouent » |

---

## 4. Boucles de feedback

### Boucle simple

```
Action ──▶ Feedback ──▶ Ajustement ──▶ Action (améliorée)
```

### Boucle de renforcement (positive feedback loop)

```
Plus d'action ──▶ Plus de récompense ──▶ Plus de motivation ──▶ Plus d'action
                                              ▲
                                              │
                                    (Cercle vertueux)
```

**Exemple** : Plus tu lis → plus tu gagnes de badges → plus tu es motivé → plus tu lis.

### Boucle d'équilibrage (negative feedback loop)

```
Trop d'action ──▶ Difficulté augmente ──▶ Ralentissement ──▶ Défi optimal
                                              ▲
                                              │
                                    (Maintien du flow)
```

**Exemple** : Tu réussis trop facilement → la difficulté augmente → tu es de nouveau challengé → tu restes en flow.

### Double boucle (engagement + progression)

```
BOUCLE D'ENGAGEMENT (micro, minutes)
┌─────────────────────────────┐
│ Trigger → Action → Feedback │
└──────────────┬──────────────┘
               │ accumulation
               ▼
BOUCLE DE PROGRESSION (macro, jours/semaines)
┌──────────────────────────────────────┐
│ Niveau N → Challenges → Niveau N+1  │
│ (nouvelles mécaniques débloquées)    │
└──────────────────────────────────────┘
```

---

## 5. Les 7 péchés capitaux du design comportemental

Chaque « péché » est un levier motivationnel puissant (à utiliser éthiquement) :

| Péché | Levier | Exemple gamification | Risque éthique |
|---|---|---|---|
| **Orgueil** | Statut et reconnaissance | Leaderboards, titres, badges visibles | Narcissisme, exclusion |
| **Avarice** | Accumulation et possession | Collections, monnaie virtuelle, loot | Addiction au grinding |
| **Luxure** | Plaisir sensoriel | Animations satisfaisantes, design soigné | Dépendance esthétique |
| **Envie** | Comparaison sociale | Feed d'activité, « ton ami a obtenu... » | Jalousie toxique |
| **Gourmandise** | Plus, toujours plus | Scroll infini, contenu illimité | Surconsommation |
| **Colère** | Compétition et rivalité | PvP, défis 1v1, classements | Agressivité, toxicité |
| **Paresse** | Facilité et confort | Auto-complete, raccourcis, defaults | Passivité excessive |

---

## 6. La courbe d'engagement utilisateur

### Le modèle AARRR (Pirate Metrics) gamifié

```
        ┌─────────────────┐
        │   ACQUISITION   │ ← Badge de bienvenue, premier succès rapide
        │   (Découverte)  │
        └────────┬────────┘
                 │ ▼ Friction
        ┌────────┴────────┐
        │   ACTIVATION    │ ← Onboarding gamifié, premier « wow moment »
        │   (Premier use) │
        └────────┬────────┘
                 │ ▼ Drop-off
        ┌────────┴────────┐
        │   RETENTION     │ ← Streaks, daily rewards, progression
        │   (Retour)      │
        └────────┬────────┘
                 │ ▼ Engagement
        ┌────────┴────────┐
        │    REVENUE      │ ← Premium, cosmétiques, monnaie virtuelle
        │    (Monétisation)│
        └────────┬────────┘
                 │ ▼ Satisfaction
        ┌────────┴────────┐
        │    REFERRAL     │ ← Badges partageables, rewards de parrainage
        │    (Viralité)   │
        └─────────────────┘
```

### La courbe d'engagement dans le temps

```
Engagement
    ▲
    │  ●  ← "Wow moment" (onboarding)
    │  │╲
    │  │  ╲ ← Chute post-découverte
    │  │    ╲
    │  │      ╲────● ← Plateau (habitude formée)
    │  │            │╲
    │  │            │  ────────●──── ← Engagement stable
    │  │            │              ╲
    │  │            │                ╲ ← Fatigue si pas de renouvellement
    │  │            │
    └──┴────────────┴──────────────────▶ Temps
    Jour 1  Jour 7  Jour 30         Jour 90+
```

**Points critiques** :
1. **Jour 1** — Premier badge, premier feedback positif (garder l'utilisateur)
2. **Jour 3-7** — Début du streak, première quête complétée
3. **Jour 14** — L'habitude se forme ou l'utilisateur décroche
4. **Jour 30** — Si toujours là → rétention long terme probable
5. **Jour 90+** — Besoin de contenu frais, nouvelles mécaniques

---

## 7. Onboarding gamifié

### Les 5 premiers minutes sont critiques

| Minute | Objectif | Mécanique |
|---|---|---|
| **0-1** | Capture de l'attention | Animation de bienvenue, promesse de valeur |
| **1-2** | Première action | Action ultra-simple avec récompense immédiate |
| **2-3** | Première récompense | Badge « Bienvenue » + confetti |
| **3-4** | Deuxième action | Action légèrement plus engageante |
| **5** | Hook | Montrer ce qui vient ensuite (« Prochain badge dans 2 actions ») |

### Le pattern « Progressive Disclosure »

Ne pas tout montrer d'un coup. Débloquer les fonctionnalités progressivement :

```
Jour 1 : Lecture + badges basiques
Jour 3 : Streak débloqué
Jour 7 : Leaderboard accessible
Jour 14 : Quêtes hebdomadaires
Jour 30 : Défis communautaires
```

### Le « Aha Moment »

Le moment où l'utilisateur comprend la valeur du produit :
- **Facebook** : Ajouter 7 amis en 10 jours
- **Slack** : Envoyer 2000 messages en équipe
- **Duolingo** : Compléter sa première leçon et voir son streak commencer

**L'objectif de l'onboarding gamifié** : Amener l'utilisateur au « Aha Moment » le plus vite possible.

---

## 8. Réengagement et rétention

### Raisons de désengagement

| Raison | Signal | Solution gamification |
|---|---|---|
| **Oubli** | N'ouvre plus l'app | Push notification douce + rappel de streak |
| **Ennui** | Sessions plus courtes | Nouveau contenu, événement spécial |
| **Frustration** | Échecs répétés | Baisser la difficulté, streak freeze |
| **Surcharge** | Trop de notifications | Réduire la fréquence, simplifier |
| **Perte de sens** | « Pourquoi je fais ça ? » | Rappeler la progression, les objectifs |
| **Alternative** | App concurrente | Différenciation, loyalty rewards |

### Campagnes de réengagement

| Type | Timing | Message | Mécanique |
|---|---|---|---|
| **Rappel doux** | J+1 inactif | « Ton streak t'attend ! » | Streak en danger |
| **Réactivation** | J+3 inactif | « Tu nous manques. Voici ce que tu as raté » | FOMO léger |
| **Win-back** | J+7 inactif | « Reviens et reçois un bonus » | Récompense de retour |
| **Nostalgie** | J+30 inactif | « Tu avais un streak de 15 jours ! Prêt à recommencer ? » | Rappel du passé |

**Important** : Respecter le RGPD et les préférences de l'utilisateur. Pas plus d'une notification de réengagement par semaine.

---

## 9. Le concept de « Variable Ratio Schedule » en pratique

### Implémenter des récompenses variables

**Algorithme basique** :

```python
import random

def should_give_bonus_reward(action_count):
    """
    Donne une récompense bonus avec une probabilité
    qui augmente avec le nombre d'actions sans bonus.
    """
    # Base: 10% de chance
    base_probability = 0.10

    # Augmente de 5% par action sans bonus (max 50%)
    adjusted = min(base_probability + (action_count * 0.05), 0.50)

    return random.random() < adjusted
```

### Types de variabilité

| Type | Description | Perception utilisateur |
|---|---|---|
| **Contenu variable** | Même récompense, présentation différente | Fraîcheur sans confusion |
| **Valeur variable** | Récompense de valeur différente | « Peut-être que ce sera le gros lot » |
| **Timing variable** | Récompense à des moments imprévisibles | « Ça peut arriver n'importe quand » |
| **Type variable** | Badge, XP, item — type aléatoire | Diversité et découverte |

---

## 10. Gamification et changement de comportement durable

### Le modèle transthéorique (Prochaska & DiClemente)

Étapes du changement de comportement :

| Étape | État | Gamification adaptée |
|---|---|---|
| **Précontemplation** | « Je ne sais pas que j'ai besoin de changer » | Sensibilisation, données personnelles |
| **Contemplation** | « Je devrais peut-être... » | Success stories, preuve sociale |
| **Préparation** | « Je vais commencer » | Objectifs faciles, premier badge gratuit |
| **Action** | « Je fais » | Streaks, points, feedback immédiat |
| **Maintenance** | « Je continue » | Niveaux avancés, communauté, identité |
| **Terminaison** | « C'est qui je suis » | Mentorat, contribution, legacy |

### Les 3 niveaux de changement

```
Niveau 1 : COMPORTEMENT (le plus facile à changer)
  « Je lis des articles » → Streaks, points, badges

Niveau 2 : PROCESSUS (changement plus profond)
  « J'ai une routine d'apprentissage » → Habitudes, rappels, planification

Niveau 3 : IDENTITÉ (le plus profond et durable)
  « Je suis un apprenant curieux » → Statut, communauté, mentorat
```

**La gamification la plus efficace vise le niveau 3** : changer l'identité de l'utilisateur, pas juste son comportement.

---

## Résumé : les lois du design comportemental

| # | Loi | Application |
|---|-----|-------------|
| 1 | **Hook = Trigger → Action → Reward → Investment** | Concevoir chaque fonctionnalité comme un cycle |
| 2 | **B = MAP** (Motivation × Ability × Prompt) | Simplifier l'action si la motivation existe |
| 3 | **Nudge, ne force pas** | Influencer sans contraindre |
| 4 | **Récompenses variables > fixes** | Varier le contenu, la valeur et le timing |
| 5 | **Commencer petit** (Tiny Habits) | Premier pas ridicuement facile |
| 6 | **Les 5 premières minutes décident de tout** | Onboarding = moment critique |
| 7 | **L'identité bat le comportement** | Viser « je suis... » pas « je fais... » |
| 8 | **Double boucle** | Micro (engagement) + macro (progression) |
| 9 | **Progressive disclosure** | Révéler les mécaniques progressivement |
| 10 | **Réengager avant de perdre** | Agir dès J+1 d'inactivité |

---

## Lectures recommandées

- **Eyal, N.** — *Hooked: How to Build Habit-Forming Products* (2014)
- **Fogg, B.J.** — *Tiny Habits: The Small Changes That Change Everything* (2019)
- **Thaler, R. & Sunstein, C.** — *Nudge: Improving Decisions About Health, Wealth, and Happiness* (2008)
- **Clear, J.** — *Atomic Habits* (2018)
- **Wendel, S.** — *Designing for Behavior Change* (2013)
- **Ariely, D.** — *Predictably Irrational* (2008)
