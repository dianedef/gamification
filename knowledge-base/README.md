# Base de connaissances — Gamification

> Tout ce qu'il faut savoir pour concevoir, écrire et implémenter une gamification efficace, éthique et durable.

**22 documents** · **~14 000 lignes** · **~600 Ko** de contenu structuré

---

## Navigation rapide

### Outils

| | Document | En un mot |
|---|---|---|
| 🧭 | [**Prompts IA**](./00-prompts.md) | Prompts prêts à l'emploi pour utiliser cette base avec un LLM |
| 📖 | [**Glossaire**](./12-glossaire.md) | 100+ termes définis — le dictionnaire de la gamification |
| 🔗 | [**Ressources externes**](./14-ressources-externes.md) | Livres, podcasts, cours, outils, communautés, articles académiques |

### Comprendre (pourquoi ça marche)

| | Document | En un mot |
|---|---|---|
| 🧠 | [**Neurosciences**](./01-neurosciences.md) | Dopamine, circuits de récompense, mémoire, chronobiologie |
| 💡 | [**Psychologie**](./02-psychologie-motivation.md) | SDT, Flow, Cialdini, réactance, adaptation hédonique, 17 théories |
| 🔄 | [**Design comportemental**](./05-design-comportemental.md) | Hook Model, Fogg, nudges, boucles d'habitude, onboarding |
| 🎰 | [**Casinos et jeux mobiles**](./15-casino-jeux-mobiles.md) | Slots, near-miss, Clash Royale, Candy Crush, Genshin, Fortnite, Pokémon GO |
| ⚡ | [**Techniques avancées**](./16-techniques-avancees.md) | Commitment devices, WOOP, goal gradient, Zeigarnik, coaching, identité |

### Concevoir (quoi faire)

| | Document | En un mot |
|---|---|---|
| 🏗 | [**Frameworks**](./03-frameworks.md) | Octalysis, MDA, Hexad, 6D, Hook — les modèles pour structurer |
| 🎮 | [**Mécaniques de jeu**](./04-mecaniques-de-jeu.md) | 30+ mécaniques : points, badges, streaks, quêtes, leaderboards |
| 🔬 | [**Études de cas**](./08-etudes-de-cas.md) | Duolingo, GitHub, Stack Overflow, Strava, Nike + exemples d'échecs |

### Créer (comment le faire)

| | Document | En un mot |
|---|---|---|
| ✍️ | [**Copywriting**](./13-copywriting-persuasion.md) | Microcopy, power words, storytelling, framing, naming, voix et ton |
| 🎨 | [**UX et design**](./06-ux-design.md) | Animations, couleurs, accessibilité, sons, responsive |
| ⚙️ | [**Implémentation**](./10-implementation.md) | Architecture, state management, engines, composables Vue 3 |
| 🤖 | [**Personnalisation IA**](./11-personnalisation-ia.md) | Profils dynamiques, adaptation, ML, recommandations |

### Valider (est-ce que ça marche / est-ce éthique)

| | Document | En un mot |
|---|---|---|
| 📊 | [**Métriques**](./07-metriques-analytics.md) | KPIs, cohortes, A/B testing, ROI, événements à tracker |
| ⚖️ | [**Éthique**](./09-ethique.md) | Dark patterns, RGPD, santé mentale, checklist, gamification responsable |

### Comprendre l'humain (qui on sert)

| | Document | En un mot |
|---|---|---|
| 👤 | [**L'utilisateur comme personne**](./17-utilisateur-personne.md) | Sa vie, son contexte, ses aspirations — au-delà de l'abstraction « user » |
| 🎯 | [**Alignement de purpose**](./18-alignement-purpose.md) | La gamification le rapproche-t-elle de ce qu'il veut vraiment ? |
| 💎 | [**Désir vs besoin**](./19-desir-vs-besoin.md) | Ce qu'il veut vs ce qui est bon pour lui — la responsabilité du concepteur |
| 🤝 | [**À quoi on lui sert**](./20-responsabilite-service.md) | Notre responsabilité de service — extraction vs service |
| 🌍 | [**L'après-app**](./21-apres-app.md) | Sa vie hors écran, le transfert, l'échafaudage, la graduation |

---

## Par où commencer ?

### « Je pars de zéro »

```
01-Neurosciences    → Comprendre POURQUOI ça marche (le cerveau)
      ↓
02-Psychologie      → Comprendre la MOTIVATION humaine
      ↓
03-Frameworks       → Se donner un CADRE de conception
      ↓
04-Mécaniques       → Choisir les BONNES mécaniques
      ↓
09-Éthique          → Poser les GARDE-FOUS
      ↓
13-Copywriting      → Écrire les MESSAGES
      ↓
10-Implémentation   → CONSTRUIRE
```

### « Je veux améliorer une gamification existante »

```
08-Études de cas    → Voir ce qui MARCHE ailleurs
      ↓
07-Métriques        → MESURER ce qui marche chez moi
      ↓
03-Frameworks       → DIAGNOSTIQUER avec l'Octalysis
      ↓
13-Copywriting      → AMÉLIORER les messages
      ↓
09-Éthique          → VÉRIFIER l'éthique
```

### « Je veux juste les quick wins »

| Besoin | Aller à |
|---|---|
| Je veux des badges qui marchent | [04-Mécaniques §2.1](./04-mecaniques-de-jeu.md) + [13-Copywriting §2.1](./13-copywriting-persuasion.md) |
| Je veux des streaks bien faits | [04-Mécaniques §2.4](./04-mecaniques-de-jeu.md) + [13-Copywriting §2.2](./13-copywriting-persuasion.md) |
| Je veux écrire de bonnes notifs | [13-Copywriting §2.4](./13-copywriting-persuasion.md) |
| Je veux mesurer si ça marche | [07-Métriques §2](./07-metriques-analytics.md) |
| Je veux éviter les dark patterns | [09-Éthique §2](./09-ethique.md) |
| Je veux des prompts IA tout faits | [00-Prompts](./00-prompts.md) |
| Comment Clash Royale / Candy Crush font | [15-Casino & jeux mobiles](./15-casino-jeux-mobiles.md) |
| Techniques avancées pour l'action | [16-Techniques avancées](./16-techniques-avancees.md) |
| Comprendre l'humain derrière le « user » | [17-Utilisateur personne](./17-utilisateur-personne.md) |
| Ma gamification sert-elle vraiment l'utilisateur ? | [18-Alignement](./18-alignement-purpose.md) + [20-Service](./20-responsabilite-service.md) |
| Concevoir une gamification qui améliore la vie réelle | [21-L'après-app](./21-apres-app.md) |

---

## Les 5 principes de cette base de connaissances

| # | Principe | Ce que ça signifie |
|---|---|---|
| 1 | **L'utilisateur d'abord** | La gamification sert les objectifs de l'utilisateur, pas uniquement le business |
| 2 | **Fondé sur la science** | Chaque recommandation s'appuie sur une théorie psychologique ou neuroscientifique |
| 3 | **Éthique par design** | Pas de dark patterns, pas de manipulation, pas d'addiction forcée |
| 4 | **Actionnable** | Chaque concept est accompagné de son application concrète |
| 5 | **Simplicité** | Une mécanique bien exécutée vaut mieux que dix mal implémentées |

---

## Cartographie des connexions

Comment les documents se relient entre eux :

```
                COMPRENDRE L'HUMAIN
            ┌─────────────────────────┐
            │  17-Utilisateur personne │
            │  18-Alignement purpose   │
            │  19-Désir vs besoin      │
            │  20-Responsabilité       │
            │  21-L'après-app          │
            └──────────┬──────────────┘
                       │ éclaire
                       ▼
                   COMPRENDRE
            ┌─────────────────────┐
            │  01-Neurosciences   │
            │  02-Psychologie     │──────────────┐
            │  05-Comportemental  │              │
            │  15-Casino & jeux   │              │
            │  16-Techniques adv. │              │
            └──────────┬──────────┘              │
                       │ informe                 │
                       ▼                         │
                   CONCEVOIR                     │
            ┌─────────────────────┐              │
            │  03-Frameworks      │              │
            │  04-Mécaniques      │              │ alimente
            │  08-Études de cas   │              │
            └──────────┬──────────┘              │
                       │ guide                   │
                       ▼                         ▼
                    CRÉER                    VALIDER
            ┌─────────────────────┐  ┌─────────────────┐
            │  13-Copywriting     │  │  07-Métriques    │
            │  06-UX Design       │  │  09-Éthique      │
            │  10-Implémentation  │  │                  │
            │  11-Personnalisation│  │                  │
            └─────────────────────┘  └─────────────────┘
                       │                    │
                       └───── itérer ◀──────┘
```

---

## Utilisation avec une IA

Cette base de connaissances est conçue pour être utilisée en contexte avec un LLM. Voir [00-Prompts](./00-prompts.md) pour des prompts prêts à l'emploi.

**Contexte minimal à donner au LLM** :

> Tu as accès à une base de connaissances gamification couvrant : neurosciences (dopamine, reward circuits), psychologie (SDT, Flow, Cialdini, 17 théories), frameworks (Octalysis, Hexad, Hook Model), 30+ mécaniques de jeu, design comportemental, UX, copywriting persuasif (microcopy, framing, naming, storytelling), métriques, études de cas (Duolingo, GitHub, etc.), et éthique. Utilise ces connaissances pour répondre de façon précise et fondée.
