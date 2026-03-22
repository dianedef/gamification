# 19 — Désir vs besoin

> Ce qu'il veut vs ce qui est bon pour lui — et la responsabilité du concepteur entre les deux.

---

## Pourquoi ce document existe

L'utilisateur veut un streak parfait. Mais il a besoin de dormir.
L'utilisateur veut être premier du classement. Mais il a besoin de progresser à son rythme.
L'utilisateur veut « encore une partie ». Mais il a besoin de fermer l'app et de vivre sa vie.

**Le désir et le besoin ne sont pas toujours alignés.** Et quand ils divergent, le concepteur de gamification a un choix moral à faire : donner à l'utilisateur ce qu'il veut (et maximiser ses métriques) ou lui donner ce dont il a besoin (et construire de la confiance).

Ce document explore ce dilemme — pas pour donner une réponse simple, mais pour armer le concepteur d'une conscience claire de ce qu'il fait.

---

## 1. La distinction fondamentale

### Désir vs besoin : deux logiques différentes

| | Désir | Besoin |
|---|---|---|
| **Nature** | Subjectif, ressenti, immédiat | Objectif (ou du moins vérifiable), profond, long terme |
| **Temporalité** | « Je le veux MAINTENANT » | « J'en ai besoin dans ma vie » |
| **Origine** | Souvent stimulé par l'environnement | Souvent intrinsèque à la personne |
| **Satisfaction** | Éphémère (adaptation hédonique) | Durable (croissance réelle) |
| **Après satisfaction** | Nouveau désir (boucle sans fin) | Stabilité, fondation pour la suite |

### La matrice désir × besoin

```
                    L'UTILISATEUR LE VEUT
                    NON                OUI
                ┌───────────────┬───────────────┐
    L'UTILISATEUR│               │               │
    EN A BESOIN  │   Zone morte  │   Zone idéale │
                │   (ni désir    │   (le besoin   │
       OUI      │   ni besoin    │   est désiré)  │
                │   → non       │   → fonce      │
                │   pertinent)   │               │
                ├───────────────┼───────────────┤
                │               │               │
                │   Zone neutre │   Zone danger  │
       NON      │   (pas grave)  │   (le désir    │
                │               │   n'est pas un │
                │   → ignorer   │   besoin)      │
                │               │   → attention  │
                └───────────────┴───────────────┘
```

### Exemples dans chaque zone

| Zone | Exemple | Action du concepteur |
|---|---|---|
| **Idéale** (veut + besoin) | Apprendre une compétence utile de façon gamifiée | Accélérer, faciliter, célébrer |
| **Dangereuse** (veut + pas besoin) | Scroller 3 heures pour des récompenses virtuelles | Freiner, alerter, proposer des alternatives |
| **Morte** (pas veut + besoin) | Prendre une pause après 2h d'utilisation | Nudger doucement, rendre le besoin désirable |
| **Neutre** (pas veut + pas besoin) | Feature que personne ne demande et dont personne n'a besoin | Ne pas construire |

---

## 2. La psychologie du désir

### Pourquoi on veut ce qu'on veut

Le désir n'est pas rationnel. Il est le produit de mécanismes psychologiques bien documentés que la gamification peut exploiter ou respecter.

#### Le biais du présent (Temporal Discounting)

Le cerveau humain surestime la valeur du plaisir immédiat et sous-estime les conséquences futures.

```
MAINTENANT                              DANS 6 MOIS
──────────                              ───────────
« Je veux continuer à jouer »    vs    « J'aurais dû dormir »
« Je veux ouvrir cette loot box » vs   « J'aurais dû garder mon argent »
« Je veux battre mon record »    vs    « J'aurais dû reposer mon genou »

Le cerveau choisit systématiquement MAINTENANT.
C'est pourquoi le concepteur a une responsabilité.
```

**Référence** : Frederick, Loewenstein & O'Donoghue (2002) — *Time Discounting and Time Preference: A Critical Review*

#### Le désir mimétique (René Girard)

On ne désire pas spontanément — on désire ce que les autres désirent. La gamification sociale amplifie ce mécanisme.

```
SANS LEADERBOARD                         AVEC LEADERBOARD
────────────────                         ────────────────
Je ne désire pas lire 50 articles       Je vois que Marie a lu 47 articles
par mois. Je lis à mon rythme.          → Soudain je VEUX en lire 50.
                                         → Ce n'est pas mon désir. C'est
                                            le désir de Marie, importé.
```

| Mécanique | Désir mimétique activé | Question éthique |
|---|---|---|
| Leaderboard | « Je veux être comme les premiers » | Est-ce que les premiers font quelque chose de bon ? |
| Badges publics | « Je veux les mêmes que les autres » | Les badges reflètent-ils une vraie progression ? |
| Compteur social | « 2 347 personnes ont fait X » | Est-ce que la norme sociale poussée est bénéfique ? |
| Activité des amis | « Pierre a terminé le module 5 » | Est-ce de l'émulation positive ou de la pression ? |

#### L'adaptation hédonique

On s'habitue à tout. Le désir est un tapis roulant — satisfait, il se déplace vers le prochain niveau.

```
JOUR 1    : « Un badge ! GÉNIAL ! »           → Dopamine +++
JOUR 30   : « Un autre badge. Cool. »          → Dopamine +
JOUR 100  : « Encore un badge... »             → Dopamine ±
JOUR 200  : « Les badges ne me font plus rien » → Dopamine —

Le désir de badges n'a pas disparu.
Il s'est déplacé : « Je veux le badge RARE, le LÉGENDAIRE, le SPECIAL. »
C'est la même logique que l'escalade des doses.
```

**Le piège pour le concepteur** : Augmenter les doses (plus de badges, plus rares, plus brillants) pour satisfaire un désir en escalade perpétuelle. C'est la spirale extractive.

**L'alternative** : Changer la nature de la récompense plutôt que son intensité. Passer des récompenses extrinsèques (badges, points) aux récompenses intrinsèques (compétence, sens, relation).

---

## 3. La psychologie du besoin

### Les besoins fondamentaux qui ne changent pas

Contrairement aux désirs, les besoins fondamentaux sont stables, universels et ne s'épuisent pas par l'adaptation hédonique.

#### Besoins psychologiques (SDT — Deci & Ryan)

| Besoin | Description | Quand il est nourri | Quand il est frustré |
|---|---|---|---|
| **Autonomie** | Sentir que je contrôle mes actions | « Je choisis quand et comment j'utilise l'app » | « L'app me dicte ce que je dois faire » |
| **Compétence** | Sentir que je progresse, que je suis capable | « Je résous des problèmes de plus en plus difficiles » | « Tout est trop facile ou trop dur » |
| **Relation** | Sentir que je suis connecté aux autres | « Je fais partie d'une communauté qui m'encourage » | « Je suis en compétition contre des inconnus » |

**Propriété critique** : Quand les besoins fondamentaux sont nourris, la motivation est auto-entretenue. Pas besoin de récompenses externes pour continuer. La personne fait l'activité parce qu'elle la trouve satisfaisante en elle-même.

#### Besoins existentiels

Au-delà des besoins psychologiques, il y a des besoins plus profonds que la gamification devrait respecter :

| Besoin existentiel | Ce que ça signifie | Comment la gamification peut le servir |
|---|---|---|
| **Sens** | Ma vie a une direction, un but | Connecter l'activité gamifiée à un objectif qui dépasse l'app |
| **Croissance** | Je deviens une meilleure version de moi | Montrer le chemin parcouru, pas seulement le chemin restant |
| **Contribution** | Ce que je fais compte pour les autres | Permettre l'entraide, le mentorat, le partage |
| **Liberté** | Je suis maître de mon temps et de mes choix | Pas de rétention forcée, pas de culpabilisation |
| **Repos** | J'ai le droit de ne rien faire | La gamification peut se taire parfois |

---

## 4. Quand désir et besoin divergent

### Les 5 conflits les plus fréquents en gamification

#### Conflit 1 : L'engagement vs le repos

```
DÉSIR                                   BESOIN
─────                                   ──────
« Encore un niveau ! »                  Dormir. Se reposer.
« J'ai presque le badge ! »             Fermer l'écran.
« Si je m'arrête, je perds              Mon corps et mon esprit
  mon streak. »                         ont besoin de récupérer.
```

**Responsabilité du concepteur** :
- Limiter les sessions (rappel de temps, pas de boucle infinie)
- Ne jamais pénaliser le repos (streak freeze, grace period)
- Ne pas envoyer de notifications qui sabotent le sommeil

#### Conflit 2 : La vitesse vs la profondeur

```
DÉSIR                                   BESOIN
─────                                   ──────
« Je veux finir vite ! »               Prendre le temps de comprendre.
« Suivant, suivant, suivant... »       Réfléchir, assimiler, pratiquer.
« Plus de leçons = plus de             La compétence vient de la
  points = plus de niveaux »           profondeur, pas de la quantité.
```

**Responsabilité du concepteur** :
- Récompenser la compréhension, pas la vitesse
- Quiz de vérification avant de progresser
- Ralentir volontairement quand nécessaire (« Prends le temps de pratiquer avant de continuer »)

#### Conflit 3 : La comparaison vs l'estime de soi

```
DÉSIR                                   BESOIN
─────                                   ──────
« Je veux voir où je suis par          Me comparer à moi-même d'hier,
  rapport aux autres ! »               pas aux autres d'aujourd'hui.
« Montre-moi le classement ! »         Préserver mon estime de soi,
                                        même si je suis « en bas ».
```

**Responsabilité du concepteur** :
- Leaderboard opt-in, jamais forcé
- Personal Records > classements
- Montrer le progrès personnel, pas la position relative
- Si leaderboard : groupes de niveau, pas global

#### Conflit 4 : L'accumulation vs la satisfaction

```
DÉSIR                                   BESOIN
─────                                   ──────
« Plus de badges ! Plus de points !    Savoir quand « assez » est assez.
  Plus de niveaux ! »                  Apprécier ce que j'ai accompli.
« Je veux TOUT compléter. »            Le complétionisme est un piège —
                                        je n'ai pas BESOIN de tout.
```

**Responsabilité du concepteur** :
- Ne pas créer de collection artificiellement incomplétable
- Célébrer les paliers sans immédiatement pointer vers le suivant
- Offrir des moments de pause et de rétrospective
- Permettre de « terminer » (contrairement aux jeux sans fin)

#### Conflit 5 : La nouveauté vs la maîtrise

```
DÉSIR                                   BESOIN
─────                                   ──────
« Du nouveau ! De la variété !         Consolider ce que je sais.
  Je m'ennuie ! »                      La maîtrise vient de la répétition.
« Quand est-ce que ça change ? »       La plupart des compétences
                                        demandent de la pratique
                                        délibérée, pas de la variété.
```

**Responsabilité du concepteur** :
- Varier la FORME, pas le FOND (même compétence, exercices différents)
- Expliquer pourquoi la répétition est nécessaire
- Rendre la répétition intéressante (Ericsson — pratique délibérée)

---

## 5. L'architecte des choix

### La responsabilité du concepteur

Le concepteur de gamification est un **architecte des choix** (Thaler & Sunstein, 2008). Chaque écran, chaque notification, chaque mécanique influence les décisions de l'utilisateur.

#### Le spectre de l'influence

```
LAISSER FAIRE        INFORMER          NUDGER           POUSSER          FORCER
     │                  │                │                 │                │
     ▼                  ▼                ▼                 ▼                ▼
Pas d'opinion.     « Il est 23h.    « Et si tu        « N'oublie pas   « Tu DOIS
L'utilisateur       Tu utilises     prenais une       ton streak !      jouer ou
décide seul.        l'app depuis    pause ? 🌙 »      Plus que 2h ! »   tu perds
                    2h. »                                                tout ! »
     │                  │                │                 │                │
     ▼                  ▼                ▼                 ▼                ▼
   Neutre            Éthique         Éthique SI          Limite          Dark
                                    bienveillant        éthique          pattern
```

### Quand nudger est éthique

Le nudge (Thaler & Sunstein) est éthique quand il respecte 3 conditions :

| Condition | Description | Exemple |
|---|---|---|
| **Transparence** | L'utilisateur sait qu'il est « nudgé » | « Nous te suggérons une pause parce que tu es actif depuis 2h » |
| **Liberté** | L'utilisateur peut ignorer le nudge sans conséquence | « Non merci, je continue » → aucune pénalité |
| **Direction bénéfique** | Le nudge pousse vers ce qui est bon pour l'utilisateur | Pause, modération, profondeur → oui. Achat, addiction → non |

### Quand nudger est problématique

| Situation | Pourquoi c'est problématique | Exemple |
|---|---|---|
| **Nudge vers l'achat** | Sert le business, pas l'utilisateur | « Débloquer ce badge pour 2,99€ ? (bouton vert énorme) » |
| **Nudge par la peur** | Exploite l'anxiété | « Ton streak va être perdu dans 1h ! » |
| **Nudge par la honte** | Exploite la pression sociale | « Tous tes amis ont fait leur leçon sauf toi » |
| **Nudge invisible** | L'utilisateur ne sait pas qu'il est influencé | Algorithme qui montre certains contenus pour maximiser le temps passé |

---

## 6. Le paternalisme bienveillant — le débat

### Le dilemme du concepteur

> Si je sais que l'utilisateur VEUT scroller pendant 3 heures mais qu'il a BESOIN de dormir, est-ce que j'ai le droit de l'en empêcher ?

#### Les deux écoles

**École 1 — Liberté pure** (libertarianisme)
```
L'utilisateur est un adulte. C'est son choix.
Si je limite son utilisation, je suis paternaliste.
Mon rôle est de fournir le meilleur produit, pas de moraliser.
L'utilisateur sait ce qui est bon pour lui.
```

**École 2 — Responsabilité du concepteur** (paternalisme libertarien)
```
L'utilisateur n'a pas conçu les boucles de dopamine — moi oui.
Je connais les mécanismes psychologiques que j'exploite — lui non.
L'asymétrie d'information me donne une responsabilité.
« Avec un grand pouvoir vient une grande responsabilité. »
```

#### La position nuancée

La plupart des éthiciens du design convergent vers une position intermédiaire :

```
1. INFORMER TOUJOURS
   L'utilisateur doit savoir combien de temps il passe,
   quels mécanismes sont à l'œuvre, et quelles alternatives existent.

2. PROPOSER SOUVENT
   « Tu es là depuis 2h. Prendre une pause ? »
   → Le choix reste à l'utilisateur.

3. LIMITER PARFOIS
   Pour les populations vulnérables (enfants, adolescents),
   des limites dures sont justifiées.

4. JAMAIS FORCER EN SENS INVERSE
   Ne jamais utiliser les mêmes techniques
   pour pousser vers plus de consommation.
```

### Le test de l'asymétrie

Quand tu conçois une mécanique, demande-toi :

> **Est-ce que j'utiliserais la même énergie de conception pour aider l'utilisateur à ARRÊTER que pour l'aider à CONTINUER ?**

| Action | Énergie de conception typique | Énergie éthique nécessaire |
|---|---|---|
| Onboarding (faire rester) | ★★★★★ (énorme) | ★★★★★ |
| Re-engagement (faire revenir) | ★★★★☆ (grande) | ★★★☆☆ |
| **Pause (faire s'arrêter)** | **★☆☆☆☆ (minimale)** | **★★★★★ (devrait être égale à l'onboarding)** |
| **Départ (laisser partir)** | **★☆☆☆☆ (minimale, dark patterns)** | **★★★★☆ (devrait être digne)** |

---

## 7. Concevoir le « non »

### Donner à l'utilisateur les outils de son propre contrôle

La meilleure gamification donne aussi à l'utilisateur le pouvoir de dire « non » à la gamification elle-même.

#### Les outils du « non »

| Outil | Description | Implémentation |
|---|---|---|
| **Mode zen** | Désactiver toute gamification | Toggle dans les paramètres → plus de points, badges, streaks |
| **Limites auto-imposées** | L'utilisateur définit ses propres limites | « Je ne veux pas passer plus de 30 min/jour sur cette app » |
| **Notifications contrôlables** | Granularité fine des notifications | Par type (streak, badge, social), par heure, par fréquence |
| **Leaderboard opt-out** | Ne pas apparaître dans les classements | Option de profil, pas de pression pour activer |
| **Streak vacation** | Mettre le streak en pause volontairement | « Je pars en vacances du 15 au 22 — pause streak » |
| **Export et départ** | Exporter ses données et partir dignement | Un bouton, pas un parcours du combattant |

#### Le paradoxe vertueux

Les apps qui offrent le plus de contrôle à l'utilisateur sont souvent celles que l'utilisateur quitte le moins.

```
PLUS DE CONTRÔLE DONNÉ À L'UTILISATEUR
  → Plus de confiance
  → Plus de confort
  → Moins de sentiment de piège
  → Plus de motivation intrinsèque (autonomie — SDT)
  → Plus de rétention long terme

MOINS DE CONTRÔLE DONNÉ À L'UTILISATEUR
  → Moins de confiance
  → Plus de sentiment de piège
  → Plus de réactance psychologique (Brehm, 1966)
  → Rejet ou désinstallation
```

---

## 8. Les signaux de divergence

### Comment détecter que le désir a pris le dessus sur le besoin

En tant que concepteur, surveille ces signaux dans tes données :

| Signal | Ce que ça indique | Action |
|---|---|---|
| **Sessions très longues chez certains utilisateurs** | Possible comportement compulsif | Ajouter un rappel de temps, analyser le profil |
| **Utilisation nocturne élevée** | L'app interfère avec le sommeil | Limiter les notifications nocturnes, mode nuit |
| **Pics d'achats impulsifs** | Les utilisateurs achètent sous émotion | Ajouter un délai de confirmation, montrer l'historique de dépenses |
| **Streak anxiety visible** (messages support, avis) | Le streak cause de la souffrance | Streak freeze automatique, ton bienveillant |
| **Usage sans progrès réel** | L'utilisateur « joue » sans apprendre/progresser | Alerter : « Tu as passé 2h mais n'as pas avancé — besoin d'aide ? » |
| **Abandon post-streak-break** | La perte du streak cause l'abandon total | Streak recovery, message empathique, fresh start |

### Les métriques qui comptent vraiment

| Métrique « désir » (ce qu'on mesure souvent) | Métrique « besoin » (ce qu'on devrait mesurer) |
|---|---|
| DAU (utilisateurs actifs quotidiens) | Progrès réel vers l'objectif de l'utilisateur |
| Temps par session | Efficacité par session (résultat / temps) |
| Streaks maintenus | Compétences acquises |
| Badges collectés | Comportements transférés dans la vie réelle |
| Rétention J30 | Satisfaction de vie déclarée à J30 |
| Taux de conversion payant | Valeur perçue par l'utilisateur |

---

## 9. La hiérarchie des récompenses

### Du plus extractif au plus aligné

Toutes les récompenses ne sont pas égales. Certaines nourrissent le désir, d'autres le besoin.

```
NIVEAU 5 — TRANSCENDANCE (besoin profond)
─────────────────────────────────────────
« Ce que tu fais contribue à quelque chose de plus grand. »
→ Impact réel, contribution, héritage
→ La récompense EST le sens

NIVEAU 4 — COMPÉTENCE (besoin)
──────────────────────────────
« Tu sais faire quelque chose que tu ne savais pas faire hier. »
→ Skill acquis, problème résolu, création personnelle
→ La récompense EST la compétence

NIVEAU 3 — RECONNAISSANCE (désir + besoin)
──────────────────────────────────────────
« Les autres voient ta valeur. »
→ Badge significatif, feedback de pairs, mentorat
→ La récompense EST la validation sociale authentique

NIVEAU 2 — PROGRESSION (désir)
──────────────────────────────
« Tu avances, tu accumules, tu grandis en chiffres. »
→ Points, niveaux, barres de progression
→ La récompense EST le mouvement, pas la destination

NIVEAU 1 — DOPAMINE (désir pur)
───────────────────────────────
« Ding ! Brillant ! Confetti ! »
→ Animation, son, surprise, loot box
→ La récompense EST la stimulation neurochimique
→ Durée : quelques secondes
```

**Principe de conception** : Utiliser le Niveau 1 pour célébrer les accomplissements des Niveaux 3-5. Jamais le Niveau 1 seul.

```
BON USAGE DU NIVEAU 1
─────────────────────
L'utilisateur acquiert une vraie compétence (Niveau 4)
→ Confetti + message significatif (Niveau 1 au service du 4)
→ « Tu viens de résoudre ton premier algorithme de tri ! 🎉
    C'est une compétence que les développeurs utilisent tous les jours. »

MAUVAIS USAGE DU NIVEAU 1
──────────────────────────
L'utilisateur clique sur un bouton (Niveau 0)
→ Confetti + ding + badge (Niveau 1 seul)
→ « Badge débloqué : Premier clic ! 🎉 »
→ La personne ne se souviendra de rien dans 5 minutes.
```

---

## 10. Le guide du concepteur consciencieux

### 8 principes pour naviguer entre désir et besoin

| # | Principe | Application concrète |
|---|---|---|
| 1 | **Connais l'objectif réel** | Avant de gamifier, demande : « qu'est-ce que cette personne veut vraiment dans sa vie ? » |
| 2 | **Récompense le progrès réel** | Mesure et célèbre la compétence, pas l'engagement |
| 3 | **Donne le contrôle** | Mode zen, opt-out, limites personnalisables |
| 4 | **Informe sans culpabiliser** | « Tu as passé 2h ici aujourd'hui » (information), pas « Tu PERDS ton temps ! » (jugement) |
| 5 | **Conçois le « non »** | L'utilisateur doit pouvoir refuser chaque mécanique individuellement |
| 6 | **Mesure ce qui compte** | Compétences acquises > streaks maintenus > badges collectés > points accumulés |
| 7 | **Teste sur les vulnérables** | Si la mécanique est toxique pour un adolescent anxieux, elle ne devrait pas exister pour personne |
| 8 | **Accepte de perdre** | Parfois servir l'utilisateur signifie qu'il s'en va. Et c'est OK. |

### La question finale

Avant chaque décision de gamification, pose-toi cette question :

> **Est-ce que je donne à l'utilisateur ce qu'il VEUT, ce dont il a BESOIN, ou les deux ?**
>
> Si c'est seulement ce qu'il veut — est-ce éthique ?
> Si c'est seulement ce dont il a besoin — est-ce engageant ?
> Si c'est les deux — c'est de la bonne gamification.

---

## Références

- **Thaler, R. & Sunstein, C.** — *Nudge: Improving Decisions About Health, Wealth, and Happiness* (2008) — Architecture des choix
- **Deci, E.L. & Ryan, R.M.** — *Self-Determination Theory* (2000) — Besoins psychologiques fondamentaux
- **Girard, R.** — *Mensonge romantique et vérité romanesque* (1961) — Désir mimétique
- **Frederick, S., Loewenstein, G. & O'Donoghue, T.** — *Time Discounting and Time Preference* (2002) — Biais du présent
- **Brehm, J.W.** — *A Theory of Psychological Reactance* (1966) — Réactance
- **Kahneman, D.** — *Thinking, Fast and Slow* (2011) — Système 1 / Système 2
- **Brickman, P. & Campbell, D.T.** — *Hedonic Relativism and Planning the Good Society* (1971) — Adaptation hédonique
- **Ericsson, A.** — *Peak: Secrets from the New Science of Expertise* (2016) — Pratique délibérée
- **Harris, T.** — *Center for Humane Technology* — Design éthique et attention
- **Reiss, S.** — *Who Am I? The 16 Basic Desires* (2004) — Motivations fondamentales
