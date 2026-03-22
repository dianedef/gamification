---
title: "L'alignement de purpose"
description: "Est-ce que la gamification rapproche l'utilisateur de ce qu'il veut vraiment ?"
pubDate: "2026-03-21"
section: "humain"
order: 18
---

## Pourquoi ce document existe

La gamification la plus sophistiquée du monde est un échec si elle pousse l'utilisateur dans une direction qui n'est pas la sienne. On peut créer des streaks parfaits, des badges magnifiques, des niveaux gratifiants — et quand même desservir la personne qu'on prétend aider.

**L'alignement de purpose, c'est la question la plus simple et la plus difficile de la gamification : est-ce que ce qu'on mesure et récompense correspond à ce que l'utilisateur veut réellement accomplir dans sa vie ?**

---

## 1. Le désalignement silencieux

### Quand la gamification et l'utilisateur veulent des choses différentes

Le désalignement n'est pas toujours visible. Il est souvent ressenti avant d'être compris — un malaise vague, une fatigue inexpliquée, un désintérêt progressif.

```
CE QUE L'UTILISATEUR VEUT              CE QUE LA GAMIFICATION MESURE
────────────────────────────            ──────────────────────────────
Parler espagnol en voyage        →     Streak quotidien de 5 min
Être en meilleure santé          →     Nombre de pas par jour
Progresser dans sa carrière      →     Articles lus et badges collectés
Se sentir moins seul             →     Points de contribution au forum
Créer quelque chose de beau      →     Nombre de projets terminés
```

Dans chaque cas, il y a un **gap** entre l'aspiration profonde et ce qu'on mesure. Ce gap, c'est le terreau de la frustration.

### Les 4 types de désalignement

#### Type 1 : Le proxy qui trahit

On mesure un proxy (indicateur indirect) de l'objectif réel, et le proxy devient l'objectif.

| Objectif réel | Proxy mesuré | Ce qui se passe |
|---|---|---|
| Apprendre une langue | Streak Duolingo | L'utilisateur fait son streak de 30 secondes sans rien apprendre, juste pour ne pas « perdre » |
| Lire et comprendre | Articles « lus » | L'utilisateur scrolle rapidement pour marquer comme lu et obtenir le badge |
| Être en forme | 10 000 pas | L'utilisateur secoue son poignet devant la TV pour gonfler son compteur |
| Coder mieux | Commits GitHub | Le développeur fait 10 petits commits vides pour avoir un carré vert |

**La loi de Goodhart** : « Quand une mesure devient un objectif, elle cesse d'être une bonne mesure. »

#### Type 2 : La compétition qui détourne

L'introduction de la compétition peut détourner l'utilisateur de son objectif personnel vers un objectif social.

```
SANS COMPÉTITION                       AVEC LEADERBOARD
────────────────                       ────────────────
« Je lis pour apprendre »     →       « Je lis pour être premier »
« Je cours pour ma santé »    →       « Je cours pour battre Pierre »
« Je médite pour moi »        →       « Je médite 60 min pour le badge,
                                        même si 15 min suffisent »
```

L'objectif glisse de **l'intrinsèque** (ce qui compte pour la personne) vers **l'extrinsèque** (ce que le système récompense).

**Théorie de l'évaluation cognitive (Deci & Ryan, 1985)** : Les récompenses extrinsèques peuvent saper la motivation intrinsèque quand elles sont perçues comme contrôlantes plutôt qu'informatives.

#### Type 3 : Le rythme imposé

La gamification impose un rythme qui ne correspond pas à la réalité de l'utilisateur.

| Rythme imposé | Réalité possible | Conséquence |
|---|---|---|
| Quotidien (streak) | La personne voyage 3 jours | Punition pour une vie riche |
| Hebdomadaire (challenge) | La personne a une semaine de deadline | Pression supplémentaire |
| 30 min/jour | La personne a 10 min entre deux réunions | Sentiment d'échec permanent |
| Progression linéaire | L'apprentissage a des plateaux naturels | Frustration quand le rythme ralentit |

#### Type 4 : La récompense qui dévalue

Quand on récompense une activité que la personne faisait par plaisir, la récompense peut paradoxalement détruire le plaisir.

```
AVANT LA GAMIFICATION
─────────────────────
Marie lit des articles sur le design parce qu'elle adore ça.
Elle en lit 3-4 par semaine, par curiosité pure.

APRÈS LA GAMIFICATION
─────────────────────
Marie gagne des points pour chaque article lu.
Au début : « Cool, des points en plus ! »
Après 3 mois : « Je DOIS lire mes articles pour mes points. »
Après 6 mois : Marie arrête. « C'est devenu une corvée. »

Le plaisir intrinsèque a été remplacé par une obligation extrinsèque.
C'est l'effet de surjustification (Lepper et al., 1973).
```

---

## 2. Le test d'alignement

### 7 questions pour vérifier l'alignement

Pour chaque mécanique de gamification, pose ces 7 questions. Si tu réponds « non » à plus de 2, il y a un problème d'alignement.

| # | Question | Ce que ça teste |
|---|---|---|
| 1 | **Est-ce que cette mécanique existait naturellement avant la gamification ?** | Un streak n'a de sens que si la régularité sert l'objectif |
| 2 | **Est-ce que l'utilisateur peut atteindre son objectif SANS cette mécanique ?** | La mécanique doit aider, pas être obligatoire |
| 3 | **Si on retirait cette mécanique, l'utilisateur continuerait-il ?** | Si non, la motivation est purement extrinsèque — c'est fragile |
| 4 | **Est-ce que la métrique mesurée reflète un progrès réel ?** | « Articles lus » ≠ « savoir acquis » |
| 5 | **Est-ce que le rythme imposé correspond au rythme naturel de l'activité ?** | Méditer tous les jours ≠ apprendre le piano tous les jours |
| 6 | **Est-ce que l'utilisateur serait fier de raconter ce qu'il a fait ?** | « J'ai maintenu un streak » vs « J'ai appris à cuisiner » |
| 7 | **Dans 1 an, qu'est-ce que l'utilisateur aura gagné grâce à cette mécanique ?** | Une compétence ? Un souvenir ? Ou juste des points virtuels ? |

### Le test du « et si on retirait tout ? »

L'expérience de pensée la plus révélatrice :

> **Imagine que tu retires TOUTE la gamification de ton produit demain. Plus de points, plus de badges, plus de streaks, plus de niveaux. Est-ce que ton produit a encore de la valeur ?**

- **Si oui** : Ta gamification est un accélérateur. Elle amplifie une valeur existante. C'est bon.
- **Si non** : Ta gamification est un substitut. Elle masque l'absence de valeur réelle. C'est un problème fondamental.

```
GAMIFICATION COMME ACCÉLÉRATEUR          GAMIFICATION COMME SUBSTITUT
(alignée)                                (désalignée)
──────────────────────────────          ─────────────────────────────
Duolingo sans gamification              Un jeu mobile vide sans gamification
= encore un bon outil d'apprentissage   = rien

GitHub sans les carrés verts            Un réseau social sans likes
= encore la meilleure plateforme        = personne ne revient
  de code

Strava sans les segments               Un tracker vide sans les streaks
= encore un bon GPS de running          = une app météo
```

---

## 3. Les 3 niveaux d'alignement

### Niveau 1 : Alignement fonctionnel — « Est-ce que ça aide ? »

Le niveau le plus basique. La gamification aide-t-elle l'utilisateur à faire ce qu'il est venu faire ?

| Critère | Aligné | Désaligné |
|---|---|---|
| **Mesure** | Mesure ce qui compte | Mesure ce qui est facile à mesurer |
| **Rythme** | S'adapte au rythme de l'utilisateur | Impose un rythme arbitraire |
| **Difficulté** | Appropriée au niveau réel | Trop facile (ennui) ou trop dur (frustration) |
| **Feedback** | Informati (« tu progresses en X ») | Vague (« +10 points ! ») |
| **Chemin** | Mène vers l'objectif | Mène vers plus de gamification |

**Exemple d'alignement fonctionnel** :
- App de course → Mesure la progression en endurance, pas seulement la distance
- App d'apprentissage → Mesure la compréhension, pas seulement les leçons terminées

### Niveau 2 : Alignement motivationnel — « Est-ce que ça motive pour les bonnes raisons ? »

La gamification motive-t-elle l'utilisateur de la bonne manière ?

| Motivation | Alignée | Désalignée |
|---|---|---|
| **Intrinsèque** | « Je veux apprendre ça parce que c'est fascinant » | La gamification remplace la curiosité par des points |
| **Identitaire** | « Je deviens quelqu'un qui fait X » | « J'accumule des badges pour le profil » |
| **Sociale** | « On progresse ensemble, on s'entraide » | « Je dois battre les autres pour exister » |
| **Accomplissement** | « J'ai surmonté un vrai défi » | « J'ai cliqué 100 fois pour un badge » |

**SDT (Deci & Ryan, 2000)** — L'alignement motivationnel optimal nourrit les 3 besoins :

```
AUTONOMIE          → L'utilisateur choisit quand, comment, combien
                     Pas : le système décide pour lui

COMPÉTENCE         → L'utilisateur développe un vrai savoir-faire
                     Pas : il accumule des métriques vides

RELATION           → L'utilisateur se connecte à d'autres humains
                     Pas : il est en compétition contre des avatars
```

### Niveau 3 : Alignement existentiel — « Est-ce que ça sert sa vie ? »

Le niveau le plus profond et le plus rare. La gamification contribue-t-elle à ce que l'utilisateur veut pour sa vie ?

| Question existentielle | Ce que ça implique pour le design |
|---|---|
| « Vers quoi il avance ? » | La gamification devrait pointer vers son objectif de vie, pas vers notre rétention |
| « À quoi on lui sert ? » | On est un outil, pas une fin. On aide, on ne retient pas |
| « Qu'est-ce qu'il veut être ? » | Les badges et niveaux devraient refléter l'identité qu'il construit |
| « Ses désirs profonds ? » | Maîtrise, liberté, connexion, sens — pas des points |
| « Sa vie en dehors de l'app ? » | Notre app est une parenthèse dans sa vie, pas l'inverse |

**Ce que ça donne concrètement** :

```
GAMIFICATION EXISTENTIELLEMENT ALIGNÉE
──────────────────────────────────────
App de formation :
  « Tu as développé 3 compétences recherchées par les employeurs
    dans ta région. Tu es plus proche de ton changement de carrière. »
  → Connecte la progression dans l'app à la vie réelle

App de santé :
  « Tes 30 jours de marche = environ 45 000 calories dépensées.
    C'est 6 kg de graisse. Ton corps te remercie. »
  → Traduit la métrique en impact concret sur la vie

App de lecture :
  « Tu as lu l'équivalent de 12 livres cette année.
    Sur le sujet X, tu en sais plus que 90% des gens. »
  → Donne du sens à l'effort
```

---

## 4. Les mécaniques alignées vs désalignées

### Audit mécanique par mécanique

#### Le streak

| | Aligné | Désaligné |
|---|---|---|
| **Quand** | L'activité bénéficie réellement de la régularité quotidienne (langue, sport, méditation) | L'activité n'a pas besoin d'être quotidienne (lecture de fond, création, réflexion) |
| **Comment** | Grace period, freezes, celebrations, pas de punition | Reset brutal, notification culpabilisante, pas de filet |
| **Pourquoi** | Construire une habitude qui sert l'utilisateur | Augmenter la rétention quotidienne |

#### Les badges

| | Alignés | Désalignés |
|---|---|---|
| **Quand** | Célèbrent un accomplissement réel, mesurable, significatif | Célèbrent du temps passé ou des clics |
| **Comment** | Liés à une compétence ou un comportement vertueux | Distribués automatiquement pour tout et n'importe quoi |
| **Pourquoi** | Marqueurs identitaires (« je suis quelqu'un qui... ») | Remplissage de collection pour la complétion |

#### Le leaderboard

| | Aligné | Désaligné |
|---|---|---|
| **Quand** | L'activité est naturellement compétitive (sport, quiz) | L'activité est personnelle (apprentissage, santé, bien-être) |
| **Comment** | Opt-in, groupes de niveau, top visible / bas invisible | Forcé, global, les derniers sont visibles |
| **Pourquoi** | Stimuler par l'émulation entre pairs | Pousser à la surconsommation par la pression sociale |

#### Les quêtes

| | Alignées | Désalignées |
|---|---|---|
| **Quand** | La séquence d'étapes correspond à un vrai parcours d'apprentissage ou de progression | Les étapes sont artificielles (« lis 5 articles + partage 3 fois + invite 1 ami ») |
| **Comment** | Flexibles dans le timing, cohérentes dans la thématique | Timers, urgence, mélanges de métriques sans lien |
| **Pourquoi** | Guider vers un objectif complexe par étapes digestes | Maximiser les interactions par jour |

#### Les récompenses quotidiennes

| | Alignées | Désalignées |
|---|---|---|
| **Quand** | Le retour quotidien a une valeur pour l'utilisateur | Le retour quotidien ne sert que la rétention |
| **Comment** | La récompense est du contenu, un conseil, une découverte | La récompense est des points ou de la monnaie virtuelle |
| **Pourquoi** | « Reviens parce qu'il y a quelque chose de bon pour toi » | « Reviens sinon tu perds ton bonus » |

---

## 5. Aligner la gamification : la méthode

### Étape 1 : Identifier l'objectif réel de l'utilisateur

Pas ce que ton marketing dit. Pas ce que ton produit fait. Ce que **la personne** veut accomplir dans sa vie.

```
TECHNIQUE DES 5 POURQUOI
────────────────────────
Utilisateur : « Je veux apprendre à coder. »
  Pourquoi ? → « Pour changer de métier. »
  Pourquoi ? → « Parce que mon métier actuel ne me plaît plus. »
  Pourquoi ? → « Parce que je n'ai pas de contrôle sur mon travail. »
  Pourquoi ? → « Parce que je veux être libre et autonome. »
  Pourquoi ? → « Parce que la liberté est ce qui compte le plus pour moi. »

OBJECTIF PROFOND : LIBERTÉ ET AUTONOMIE
→ La gamification doit renforcer son sentiment de contrôle et de progression
   vers l'indépendance, pas créer une nouvelle dépendance.
```

### Étape 2 : Mapper les métriques sur l'objectif

Pour chaque métrique que tu gamifies, trace le lien direct avec l'objectif réel :

```
MÉTRIQUE                    LIEN AVEC L'OBJECTIF              ALIGNEMENT
─────────                   ─────────────────────              ──────────
Leçons terminées       →    Savoir coder                 →    ★★★☆☆ Moyen
                            (terminé ≠ compris)

Projets créés          →    Savoir coder                 →    ★★★★★ Fort
                            (créer = prouver la compétence)

Streak quotidien       →    Savoir coder                 →    ★★☆☆☆ Faible
                            (régularité ≠ progression)

Code reviewé par pairs →    Savoir coder + communauté    →    ★★★★★ Fort
                            (feedback réel + connexion)

Badges de complétion   →    Savoir coder                 →    ★★★☆☆ Moyen
                            (dépend de ce que le badge mesure)
```

### Étape 3 : Éliminer ou transformer le désaligné

Pour chaque mécanique mal alignée, deux options :

**Option A — Éliminer** : Si la mécanique ne sert pas l'objectif, supprime-la. Moins de gamification bien alignée > beaucoup de gamification désalignée.

**Option B — Transformer** : Réaligner la mécanique.

| Avant (désaligné) | Après (aligné) |
|---|---|
| Streak de connexion quotidienne | Streak de pratique effective (au moins 1 exercice réussi) |
| Badge « 100 articles lus » | Badge « Maîtrise du sujet X » (quiz validé) |
| Leaderboard global par points | Leaderboard par compétence, opt-in, groupes de niveau |
| Récompense quotidienne en points | Récompense quotidienne = conseil pratique personnalisé |
| Quête « lis 5 articles cette semaine » | Quête « explore le sujet X sous 3 angles différents » |

### Étape 4 : Vérifier avec le test du regret

> **Si l'utilisateur regarde en arrière dans 6 mois, est-ce qu'il sera content du temps passé ?**

| Il dira... | Alignement |
|---|---|
| « J'ai appris à coder, j'ai changé de métier » | Parfait |
| « J'ai eu 47 badges et un streak de 200 jours... mais je ne sais pas vraiment coder » | Échec total |
| « J'ai passé 300 heures sur l'app... je ne sais pas trop ce que j'ai gagné » | Désalignement grave |

---

## 6. Purpose alignment et business

### Le paradoxe apparent

« Si on aligne la gamification sur les objectifs de l'utilisateur plutôt que sur nos métriques, on va perdre de l'engagement ! »

C'est le contraire.

| Approche | Court terme (0-3 mois) | Long terme (6-24 mois) |
|---|---|---|
| **Gamification extractive** (optimisée pour nos métriques) | DAU élevé, sessions longues | Burnout, churn massif, bouche-à-oreille négatif |
| **Gamification alignée** (optimisée pour l'utilisateur) | DAU peut-être plus bas | Rétention élevée, LTV supérieure, bouche-à-oreille positif |

### Les preuves

| Produit | Stratégie | Résultat |
|---|---|---|
| **Duolingo** | Streak + gamification heavy → certains utilisateurs désalignés (streak anxiety) | A ajouté streak freeze et « hearts » pour réaligner — rétention améliorée |
| **Strava** | Segments compétitifs → certains coureurs se blessent pour « gagner » | A ajouté les Personal Records pour réaligner sur le progrès personnel |
| **Forest** | Gamification 100% alignée (focus = objectif = mécanique) | Croissance organique massive, bouche-à-oreille dominant |
| **Headspace** | Gamification légère, jamais de pression | Rétention long-terme supérieure aux concurrents plus « gamifiés » |

### La formule

```
VALEUR LONG TERME = Alignement × Qualité du produit × Temps

Plus l'alignement est fort, plus la valeur croît avec le temps.
Plus l'alignement est faible, plus la valeur décroît avec le temps.
```

---

## 7. Diagnostiquer l'alignement dans ton produit

### Grille de diagnostic rapide

Pour chaque mécanique de gamification, score de 1 à 5 :

| Critère | 1 (désaligné) | 5 (aligné) |
|---|---|---|
| **Proxy** | La métrique est éloignée de l'objectif réel | La métrique reflète directement le progrès réel |
| **Rythme** | Le rythme est imposé sans raison | Le rythme correspond au besoin naturel de l'activité |
| **Motivation** | La motivation est purement extrinsèque | La motivation intrinsèque est préservée ou renforcée |
| **Identité** | La gamification construit une identité de « joueur » | La gamification construit l'identité souhaitée par l'utilisateur |
| **Regret** | L'utilisateur pourrait regretter le temps passé | L'utilisateur sera reconnaissant du temps investi |
| **Vie réelle** | Aucun impact sur la vie hors app | Impact positif mesurable sur la vie réelle |
| **Retrait** | Sans gamification, l'utilisateur part | Sans gamification, l'utilisateur resterait (mais la gamification accélère) |

**Score total** : /35

| Score | Diagnostic |
|---|---|
| **30-35** | Excellent alignement — la gamification sert vraiment l'utilisateur |
| **20-29** | Bon alignement — quelques mécaniques à ajuster |
| **10-19** | Désalignement significatif — revoir la stratégie |
| **< 10** | Gamification extractive — refonte nécessaire |

---

## 8. La conversation d'alignement

### Un outil pour les équipes

Avant de lancer une fonctionnalité gamifiée, l'équipe devrait avoir cette conversation :

```
1. POUR QUI ?
   « Qui est la personne qui va voir cette mécanique ?
     Qu'est-ce qu'elle vit en ce moment ? »

2. POUR QUOI ?
   « Quel est son objectif réel — pas notre objectif business,
     son objectif à ELLE ? »

3. EST-CE QUE ÇA L'AIDE ?
   « Si on lui expliquait cette mécanique, dirait-elle :
     "oui, ça m'aide" ou "ah, c'est pour me retenir" ? »

4. ET SI ON NE LE FAISAIT PAS ?
   « Qu'est-ce qui se passe si on n'ajoute pas cette mécanique ?
     Le produit est-il suffisant sans elle ? »

5. DANS 1 AN ?
   « Quand elle regardera en arrière, sera-t-elle contente
     que cette mécanique ait existé ? »
```

Si l'équipe ne peut pas répondre clairement à ces 5 questions, la mécanique n'est pas prête à être lancée.

---

## Résumé : les 3 lois de l'alignement

| Loi | Énoncé |
|---|---|
| **Loi 1** | La gamification est un **accélérateur**, jamais un **substitut** de valeur |
| **Loi 2** | Ce que tu **mesures** devient ce que l'utilisateur **poursuit** — choisis bien |
| **Loi 3** | L'alignement parfait, c'est quand l'utilisateur ne **distingue plus** l'objectif de l'app et son objectif personnel |

---

## Références

- **Deci, E.L. & Ryan, R.M.** — *Intrinsic Motivation and Self-Determination in Human Behavior* (1985)
- **Deci, E.L. & Ryan, R.M.** — *Self-Determination Theory and the Facilitation of Intrinsic Motivation* (2000)
- **Lepper, M.R., Greene, D. & Nisbett, R.E.** — *Undermining Children's Intrinsic Interest with Extrinsic Reward* (1973) — Effet de surjustification
- **Goodhart, C.** — *Goodhart's Law* (1975) — « When a measure becomes a target... »
- **Christensen, C.** — *Competing Against Luck* (2016) — Jobs to Be Done
- **Nicholson, S.** — *A RECIPE for Meaningful Gamification* (2015) — Gamification centrée sur le sens
- **Pink, D.** — *Drive: The Surprising Truth About What Motivates Us* (2009)
- **Deterding, S.** — *Meaningful Play: Getting Gamification Right* (2011)
