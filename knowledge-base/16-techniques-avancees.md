# 16 — Techniques avancées pour faire agir les gens

> Au-delà de la gamification classique : les techniques les plus puissantes issues de la psychologie clinique, du coaching comportemental, de l'économie comportementale et de la science de la persuasion pour déclencher et maintenir l'action.

---

## 1. Les dispositifs d'engagement (Commitment Devices)

### Le principe

Un dispositif d'engagement est un **choix fait à l'avance** qui contraint le comportement futur. C'est l'outil le plus puissant pour vaincre la procrastination car il élimine le choix au moment de l'action.

**Origine** : Ulysse se faisant attacher au mât pour résister aux sirènes.

### Types de commitment devices

| Type | Description | Exemple gamification | Puissance |
|---|---|---|---|
| **Financier** | Perdre de l'argent si on n'agit pas | Payer d'avance pour un cours → obligation de le suivre | Très élevée |
| **Social** | Annonce publique de l'objectif | « J'ai annoncé dans mon clan que je ferai 5 articles cette semaine » | Élevée |
| **Contractuel** | Engagement formel | « Je m'engage à lire 1 article par jour pendant 30 jours » (signé) | Élevée |
| **Technologique** | Le système bloque les alternatives | App qui bloque les réseaux sociaux pendant la session d'apprentissage | Élevée |
| **Identitaire** | S'identifier publiquement | Changer son titre en « En formation JavaScript » | Moyenne-élevée |
| **Temporel** | Planifier à l'avance | « Demain à 8h, je lis mon article » (rappel programmé) | Moyenne |

### Applications en gamification

**Le « Goal Declaration » (déclaration d'objectif)**
```
┌──────────────────────────────────────────────┐
│  🎯 Mon objectif cette semaine               │
│                                              │
│  ○ Lire 3 articles                           │
│  ○ Lire 5 articles                           │
│  ● Lire 7 articles (un par jour !)           │
│                                              │
│  Ton objectif sera visible par ton équipe.    │
│                                              │
│  [Confirmer mon objectif]                    │
└──────────────────────────────────────────────┘
```

**Pourquoi ça marche** :
- **Engagement et cohérence** (Cialdini) : une fois qu'on a choisi, on agit en cohérence
- **Social accountability** : si c'est visible par d'autres, la pression augmente
- **Implementation intention** (Gollwitzer) : l'acte de choisir active la planification

**Le « Pre-commitment streak »**
- « Combien de jours veux-tu maintenir ton streak ? » → L'utilisateur choisit 7, 30 ou 90 jours
- Le compteur affiche l'objectif choisi, pas juste le nombre actuel
- « 12/30 jours — tu es à 40% de ton engagement ! »
- Beaucoup plus motivant qu'un streak open-ended

---

## 2. Le WOOP — Mental Contrasting avec Implementation Intentions

### Gabriele Oettingen (2014)

WOOP est la technique de changement comportemental la plus validée scientifiquement. Méta-analyse de 30+ études : **effet significatif sur l'atteinte d'objectifs** dans tous les domaines.

### Les 4 étapes

| Étape | Nom | Description | Application gamification |
|---|---|---|---|
| **W** | Wish (Souhait) | Qu'est-ce que tu veux accomplir ? | « Je veux obtenir le badge Expert JavaScript » |
| **O** | Outcome (Résultat) | Comment te sentiras-tu quand ce sera fait ? | « Je serai fier, confiant, plus employable » |
| **O** | Obstacle | Quel est le principal obstacle ? | « Je me laisse distraire par les réseaux sociaux le soir » |
| **P** | Plan | Si [obstacle], alors [action] | « Si je suis tenté d'ouvrir Twitter le soir, alors j'ouvre l'app d'apprentissage à la place » |

### Intégration dans la gamification

```
ONBOARDING AVANCÉ :

Étape 1 : "Quel est ton objectif avec cette app ?" [Wish]
           ○ Apprendre une nouvelle compétence
           ○ Rester à jour dans mon domaine
           ○ Changer de carrière
           ○ Autre : ___

Étape 2 : "Imagine-toi ayant atteint cet objectif. [Outcome]
           Qu'est-ce que ça changerait dans ta vie ?"
           [Texte libre ou choix multiples]

Étape 3 : "Quel est ton plus grand obstacle ?" [Obstacle]
           ○ Le manque de temps
           ○ La procrastination
           ○ La difficulté du contenu
           ○ Le manque de motivation

Étape 4 : "Créons un plan ensemble." [Plan]
           "Quand [obstacle] se présente, je vais [action]."
           → Générer un rappel personnalisé basé sur l'obstacle
```

**Pourquoi intégrer le WOOP** :
- La visualisation positive SEULE ne suffit pas (elle peut même démotiver — Oettingen, 2012)
- C'est le **contraste** entre le résultat désiré et l'obstacle qui crée l'énergie d'action
- Le plan « si-alors » est l'intention d'implémentation de Gollwitzer → +65% de probabilité d'action

---

## 3. Le Temptation Bundling

### Katherine Milkman (Wharton, 2014)

**Principe** : Combiner une activité qu'on DOIT faire (mais qu'on n'aime pas) avec une activité qu'on VEUT faire (mais qui est coupable).

**Étude originale** : Les participants pouvaient écouter un audiobook captivant (Harry Potter) UNIQUEMENT pendant leur séance de gym. Résultat : +51% de fréquentation en salle.

### Application en gamification

| Activité « devoir » | Combinée avec activité « plaisir » | Résultat |
|---|---|---|
| Lire un article technique | Gagner des XP pour débloquer un contenu fun | L'article technique devient agréable |
| Compléter un module ennuyeux | Accès à un mini-jeu après complétion | Le module est la « porte d'entrée » |
| Revenir tous les jours | Daily reward croissante (jour 7 = surprise) | Le retour quotidien est anticipé |
| Finir un quiz difficile | Animation de célébration exclusive | Le quiz est associé au plaisir |

**Le temptation bundling est différent de la récompense classique** :
- Récompense classique : « Fais X → reçois Y après »
- Temptation bundling : « Tu peux faire Y UNIQUEMENT pendant que tu fais X »
- La restriction crée le désir (scarcity appliquée au plaisir)

---

## 4. La technique du « Fresh Start Effect »

### Dai, Milkman & Riis (2014)

Les gens sont plus motivés à changer de comportement après un **nouveau départ perçu** :
- Lundi (vs jeudi)
- Premier jour du mois
- Anniversaire
- Nouvel An
- Après des vacances
- Nouvelle saison

**Explication** : Le « fresh start » crée une **distance psychologique** avec le « moi passé » qui avait de mauvaises habitudes. Le « moi présent » est un nouveau chapitre.

### Application en gamification

| Moment | Gamification du fresh start |
|---|---|
| **Lundi** | « Nouvelle semaine, nouveaux défis ! » — Quêtes hebdo qui commencent le lundi |
| **Premier du mois** | « Objectif du mois : [choix]. Quel sera le tien ? » |
| **Après un streak perdu** | « Nouveau départ ! Et si tu battais ton record de [N] jours ? » |
| **Après une absence** | « Content de te revoir ! Voici ce qui est nouveau : [contenu frais] » |
| **Anniversaire d'inscription** | « 1 an avec nous ! Récap de ton année + nouveau défi spécial » |
| **Nouvelle saison** | « Printemps = nouveau parcours. Découvre les défis de la saison. » |

**Le fresh start après un streak perdu est critique** : C'est le moment où l'utilisateur est le plus vulnérable au churn. Le framing « nouveau départ » réduit la douleur de la perte et recrée la motivation.

---

## 5. L'accountability partnership (Partenaire de responsabilité)

### La science derrière

- **ASTD Study** : Probabilité d'atteindre un objectif selon le niveau d'engagement :
  - Avoir une idée : 10%
  - Décider de le faire : 25%
  - Décider QUAND : 40%
  - Planifier COMMENT : 50%
  - S'engager auprès de quelqu'un : 65%
  - Avoir un rendez-vous de suivi avec cette personne : **95%**

### Application en gamification

**Le « Buddy System »**
```
┌──────────────────────────────────────┐
│  👥 Ton partenaire de progression    │
│                                      │
│  Marie L. (depuis 23 jours)          │
│                                      │
│  Son streak : 🔥 15 jours           │
│  Ton streak : 🔥 12 jours           │
│                                      │
│  Cette semaine :                     │
│  Marie : 4 articles ✅               │
│  Toi   : 3 articles 🔄              │
│                                      │
│  [Encourager Marie] [Voir son profil]│
└──────────────────────────────────────┘
```

**Mécaniques** :
- Matching automatique ou choix manuel
- Visibilité mutuelle de la progression
- Possibilité de s'encourager
- Notification quand le partenaire atteint un milestone
- Défi duo : « Lisez 10 articles à deux cette semaine »

---

## 6. La Goal Gradient Hypothesis — L'accélération finale

### Clark Hull (1932), adapté par Kivetz et al. (2006)

**Principe** : Plus on se rapproche du but, plus on accélère. C'est vrai pour les rats dans un labyrinthe, les clients avec une carte de fidélité, et les utilisateurs avec une barre de progression.

```
Effort
    ▲
    │                          ╱
    │                        ╱
    │                      ╱
    │                   ╱╱
    │                ╱╱
    │            ╱╱
    │        ╱╱
    │    ╱╱
    │╱╱
    └──────────────────────────▶ Proximité du but
    Loin                       Proche
```

**Étude de Kivetz (2006)** : Carte de fidélité café. Les clients accéléraient leurs achats à mesure qu'ils approchaient du café gratuit. Le dernier tampon était obtenu 20% plus vite que le premier.

### Application en gamification

| Technique | Description | Impact |
|---|---|---|
| **Progress bar accélérée** | La barre semble avancer plus vite vers la fin | Accélération naturelle de l'effort |
| **Countdown d'items** | « Plus que 2 articles pour le badge ! » | Urgence positive |
| **Unlock preview** | Montrer la récompense du prochain niveau quand on est à 80%+ | Anticipation amplifiée |
| **Streak countdown** | « Plus que 3 jours pour le milestone de 30 ! » | Concentration d'effort |
| **Bonus de proximité** | XP multiplié quand on est proche d'un level-up | Récompenser l'accélération |

### L'anti-pattern : le « mur du 80% »

Si la progression ralentit à 80% (ex : les derniers items sont plus durs), l'utilisateur ressent l'opposé du goal gradient → frustration et abandon. Les derniers 20% doivent être au minimum aussi faciles que les 20% précédents.

---

## 7. Les micro-engagements séquentiels (Foot-in-the-door)

### Freedman & Fraser (1966)

**Principe** : Une petite demande acceptée rend une grande demande ultérieure beaucoup plus probable.

**Étude originale** : Demander aux gens de mettre un petit autocollant → 76% acceptent ensuite un grand panneau dans leur jardin (vs 17% sans la petite demande préalable).

### La séquence d'escalade en gamification

```
JOUR 1
  "Lis le titre de cet article"         → Oui (2 secondes)
  ↓
JOUR 2
  "Lis l'introduction"                  → Oui (30 secondes)
  ↓
JOUR 3
  "Lis un article entier"               → Oui (5 minutes)
  ↓
SEMAINE 2
  "Lis 3 articles cette semaine"         → Oui (15 minutes)
  ↓
MOIS 1
  "Complète le parcours JavaScript"      → Oui (plusieurs heures)
  ↓
MOIS 3
  "Deviens mentor pour les nouveaux"     → Oui (engagement long terme)
```

**Chaque « oui » rend le prochain « oui » plus facile** car :
1. **Cohérence** : « J'ai déjà dit oui, je suis le genre de personne qui dit oui »
2. **Identité** : « Je suis quelqu'un qui lit des articles techniques »
3. **Sunk cost** : « J'ai déjà lu 50 articles, autant continuer »
4. **Compétence** : « Je suis capable, la preuve, j'ai lu 50 articles »

---

## 8. La Peak-End Rule appliquée au parcours gamifié

### Kahneman & Frederickson (1993)

**Principe** : On se souvient d'une expérience principalement par son **pic émotionnel** et sa **fin**. Le reste est presque oublié.

### Design de l'expérience par la Peak-End Rule

```
Émotion
    ▲
    │           ●  ← PIC (badge rare, confetti, level up)
    │          ╱ ╲
    │         ╱   ╲
    │        ╱     ╲        ●  ← FIN (récap positif, anticipation)
    │       ╱       ╲      ╱
    │      ╱         ╲    ╱
    │─────╱───────────╲──╱───── baseline
    │    ╱             ╲╱
    │   ╱               ● ← creux (acceptable si bref)
    └──────────────────────────────▶ Temps
    Début                          Fin de session
```

### Application concrète

| Moment | Design émotionnel |
|---|---|
| **Début de session** | Message de bienvenue, streak mis à jour, petit XP de connexion |
| **Pendant** | Progression stable, feedback régulier mais discret |
| **LE PIC** | Badge surprise, level up, milestone streak → GRANDE célébration |
| **Éventuel creux** | Si échec → message compassionnel, reframing positif |
| **FIN DE SESSION** | Récapitulatif positif + anticipation du lendemain |

**Le récapitulatif de fin de session est critique** :
```
┌──────────────────────────────────────┐
│  📊 Session terminée !               │
│                                      │
│  ✅ 2 articles lus                   │
│  +20 XP gagné                        │
│  🔥 Streak : jour 8                  │
│                                      │
│  Demain : tu es à 1 article du       │
│  badge "Explorateur" ! 🏆            │
│                                      │
│  [Fermer]                            │
└──────────────────────────────────────┘
```

C'est la **dernière chose que l'utilisateur voit** → c'est ce qu'il retiendra de la session → c'est ce qui déterminera s'il revient.

---

## 9. L'identité narrative (Identity-Based Habits)

### James Clear — *Atomic Habits* (2018)

**Principe** : Le changement de comportement le plus durable passe par le changement d'identité, pas par les objectifs ou les processus.

```
3 niveaux de changement :

          ┌─────────────┐
          │  IDENTITÉ   │ ← « Je suis un lecteur »
          │  (Qui)      │    Le plus profond et durable
          └──────┬──────┘
          ┌──────┴──────┐
          │  PROCESSUS  │ ← « Je lis chaque matin à 8h »
          │  (Comment)  │    Plus profond que les résultats
          └──────┬──────┘
          ┌──────┴──────┐
          │  RÉSULTATS  │ ← « Je veux lire 50 articles »
          │  (Quoi)     │    Le plus superficiel
          └─────────────┘
```

### Comment la gamification construit l'identité

| Mécanique | Rôle dans la construction d'identité |
|---|---|
| **Titres et niveaux** | « Tu es un Expert JavaScript » → identité déclarée |
| **Streak long** | « 30 jours consécutifs » → « Je suis quelqu'un de régulier » |
| **Collection de badges** | « 15 badges en design » → « Je suis un designer » |
| **Profil public** | Les autres voient mon identité gamifiée → validation sociale |
| **Leaderboard** | « Je suis dans le top 10% » → identité d'excellence |
| **Mentorat** | « J'aide les débutants » → identité de leader |
| **Year in Review** | « Voici qui tu ES devenu cette année » → narrativisation |

**Le copy doit renforcer l'identité** :
- ❌ « Tu as lu 50 articles » (résultat)
- ✅ « Tu ES un lecteur passionné — 50 articles le prouvent » (identité)

**Le moment de bascule identitaire** : Il y a un seuil où l'utilisateur passe de « je fais » à « je suis ». La gamification doit identifier et célébrer ce moment :
- Premier streak de 7 jours → « Tu es officiellement régulier ! »
- 5 badges dans une catégorie → « Tu es un spécialiste [catégorie] »
- Premier mentorat → « Tu es maintenant un guide pour les autres »

---

## 10. Le Social Proof avancé (Robert Cialdini + recherches récentes)

### Au-delà du simple « 1 247 personnes ont fait ça »

#### Les 5 niveaux de preuve sociale

| Niveau | Description | Puissance | Exemple |
|---|---|---|---|
| **1. Nombre brut** | X personnes ont fait ça | Faible | « 5 000 utilisateurs actifs » |
| **2. Descriptif** | X% des gens comme toi font ça | Moyenne | « 73% des développeurs lisent 3+ articles/semaine » |
| **3. Proximité** | Tes amis/pairs font ça | Élevée | « Marie et Thomas ont obtenu ce badge » |
| **4. Expert** | Les experts/autorités font ça | Élevée | « Recommandé par 200 développeurs seniors » |
| **5. Tendance** | C'est en croissance | Très élevée | « +40% de lecteurs ce mois-ci — la communauté grandit » |

#### L'injonctive vs descriptive (Cialdini, 2003)

| Type | Description | Exemple | Risque |
|---|---|---|---|
| **Norme descriptive** | Ce que les gens FONT | « La plupart des gens lisent 3 articles/semaine » | Si la norme est basse, ça autorise la médiocrité |
| **Norme injonctive** | Ce que les gens APPROUVENT | « Les meilleurs développeurs recommandent de lire quotidiennement » | Peut être perçu comme moralisateur |

**Piège classique** : L'hôtel qui met « La majorité des clients réutilisent leurs serviettes » (norme descriptive). Mais si 40% ne le font pas, ça normalise aussi le non-comportement.

**Solution** : Combiner descriptive + injonctive + tendance :
- « 73% des développeurs lisent 3+ articles/semaine (descriptive), et ce chiffre augmente chaque mois (tendance). Les experts du domaine recommandent 5+ (injonctive). »

#### Le « Social Proof dynamique »

Au lieu d'afficher un nombre statique, montrer le flux en temps réel :

```
┌──────────────────────────────────────┐
│  📊 En ce moment                      │
│                                      │
│  Marie vient d'obtenir le badge      │
│  "Explorateur" il y a 3 minutes      │
│                                      │
│  Thomas a atteint un streak de       │
│  14 jours il y a 12 minutes          │
│                                      │
│  45 personnes lisent un article      │
│  en ce moment                        │
└──────────────────────────────────────┘
```

**Pourquoi c'est plus puissant** :
- Le temps réel crée un sentiment de **communauté vivante**
- « Il y a 3 minutes » est plus tangible que « 5 000 utilisateurs »
- Voir un nom spécifique (Marie, Thomas) crée de l'**identification**
- Le présent continu (« en ce moment ») crée de la **simultanéité**

---

## 11. L'aversion au regret (Regret Aversion)

### Zeelenberg & Pieters (2007)

**Principe** : Les gens ne cherchent pas seulement à maximiser le plaisir et minimiser la douleur — ils cherchent aussi à **minimiser le regret futur anticipé**.

Le regret est plus douloureux quand :
- L'action était **évitable** (j'aurais pu faire autrement)
- Le résultat alternatif est **visible** (je vois ce que j'aurais pu avoir)
- La décision était **inhabituelle** (j'ai dévié de ma routine)

### Application en gamification

| Technique | Description | Mécanisme de regret |
|---|---|---|
| **Preview du badge manqué** | Montrer le badge qu'on AURAIT obtenu | « Si tu avais lu 1 article de plus, tu aurais eu le badge Explorer » |
| **Countdown du streak** | Montrer ce qu'on va perdre | « Plus que 3h pour sauver ton streak de 15 jours » |
| **Regret du regret** | Après la perte, montrer ce qui était possible | « Ton streak était à 2 jours du record » |
| **Comparaison contrefactuelle** | Montrer le chemin non pris | « Si tu avais continué ton rythme de janvier, tu aurais 40 badges maintenant » |

**Attention éthique** : L'aversion au regret est TRÈS puissante mais proche de la culpabilisation. L'utiliser avec parcimonie et toujours offrir une voie de résolution (« mais tu peux recommencer maintenant »).

---

## 12. La technique du « Default Effect » (choix par défaut)

### Johnson & Goldstein (2003)

**Principe** : Les gens acceptent massivement l'option par défaut. Étude célèbre sur le don d'organes :
- Pays avec opt-in (choisir de donner) : 4-27% de donneurs
- Pays avec opt-out (choisir de NE PAS donner) : 85-100% de donneurs

### Application en gamification

| Default | Impact |
|---|---|
| **Streak activé par défaut** | Tout le monde a un streak, pas besoin de l'activer |
| **Notifications ON par défaut** (avec fréquence raisonnable) | Plus de gens reçoivent les rappels |
| **Objectif quotidien pré-rempli** | « Ton objectif aujourd'hui : 1 article » (modifiable) |
| **Leaderboard visible par défaut** | Plus de gens participent à la compétition |
| **Mode « complet » par défaut** | Toutes les mécaniques actives, avec possibilité de simplifier |

**Le meta-default** : Les applications les plus éthiques mettent le **mode raisonnable** par défaut :
- Notifications : 1/jour max (pas 5)
- Objectif : atteignable (pas ambitieux)
- Streak : avec grace period activée
- Leaderboard : amis uniquement (pas global)

---

## 13. L'effet de la progression non-linéaire

### Les courbes qui maintiennent l'engagement

Les jeux les plus addictifs n'utilisent jamais une progression linéaire. Ils utilisent des **courbes composites** :

```
Récompense
perçue
    ▲
    │                    ╱╱ Exponentielle finale
    │                  ╱╱   (les derniers niveaux
    │                ╱╱      sont spectaculaires)
    │              ╱╱
    │         ╱╱──╱
    │       ╱╱      ← Plateau de milieu de jeu
    │     ╱╱         (l'habitude se forme ici)
    │   ╱╱
    │ ╱╱ ← Logarithmique au début
    │╱╱    (gratification rapide)
    └──────────────────────────────────▶ Temps/Effort
```

**Les 3 phases** :
1. **Logarithmique (début)** : Progression rapide, récompenses fréquentes → hook
2. **Plateau (milieu)** : Progression stable, habitude en formation → les quitters quittent ici
3. **Exponentielle (fin)** : Les récompenses deviennent spectaculaires → récompenser les fidèles

**Comment gérer le plateau** (la zone de danger) :
- Introduire de nouvelles mécaniques (guildes, défis sociaux)
- Varier les types de récompenses (pas juste plus de la même chose)
- Proposer des quêtes secondaires et de l'exploration
- Le contenu social maintient l'engagement quand les mécaniques s'émoussent

---

## 14. Le « Zeigarnik Effect » weaponisé (utilisé par les meilleurs)

### Bluma Zeigarnik (1927)

**Principe** : Les tâches incomplètes occupent plus d'espace mental que les tâches complétées. L'esprit cherche activement la clôture.

### Les utilisations les plus puissantes

| Technique | Description | Qui l'utilise |
|---|---|---|
| **Cliffhanger** | Arrêter l'histoire au moment le plus intense | Netflix (auto-play épisode suivant), Duolingo (« La suite demain ») |
| **Barre de progression** | Montrer l'incomplétude | LinkedIn (« Profil 72% complet »), tout le monde |
| **Collection partielle** | Montrer les items manquants en silhouette | Pokémon (Pokédex), tout système de badges |
| **Quête interrompue** | Quête qui s'arrête et reprend le lendemain | Jeux mobiles, apps d'apprentissage |
| **Notification de tâche en cours** | Rappeler qu'une tâche n'est pas finie | Email (« Tu as commencé un article... ») |
| **Compte à rebours** | L'incomplétion a une deadline | Événements limités, streak |

### Le Zeigarnik en séquence

La technique la plus efficace est de créer une **chaîne de Zeigarnik** :

```
Lire article 1 ──► "Tu as commencé le parcours JavaScript"
                    (Zeigarnik 1 : parcours incomplet)
       │
       ▼
Lire article 2 ──► "Badge Explorer à 2/5"
                    (Zeigarnik 2 : badge incomplet)
       │
       ▼
Lire article 3 ──► "Streak de 3 jours — prochain milestone : 7"
                    (Zeigarnik 3 : milestone incomplet)
       │
       ▼
...chaque action COMPLÈTE un Zeigarnik et en CRÉE un nouveau
```

**L'utilisateur n'est jamais « fini »** — il y a toujours quelque chose d'incomplet qui tire l'esprit vers l'app.

---

## 15. La Reciprocity Loop (boucle de réciprocité)

### Au-delà de « donne et tu recevras »

La réciprocité est plus complexe qu'un simple échange :

| Type | Description | Puissance | Exemple gamification |
|---|---|---|---|
| **Directe** | Tu me donnes, je te rends | Moyenne | « Marie t'a envoyé un boost → envoie-lui en un » |
| **Indirecte** | Tu m'aides, j'aide quelqu'un d'autre | Élevée | « Tu as été aidé → maintenant aide un nouveau » |
| **Anticipée** | Je te donne d'abord, en attendant | Très élevée | « Voici un badge gratuit → [plus tard] évalue l'app ? » |
| **Surprise** | Tu reçois sans avoir demandé | Très élevée | « Bonus surprise : 50 XP parce que c'est vendredi ! » |

### La boucle de réciprocité sociale

```
Marie aide Thomas (mentorat)
       ↓
Thomas se sent redevable
       ↓
Thomas aide Léa (paye-it-forward)
       ↓
Léa aide Hugo
       ↓
... la communauté s'auto-entretient
```

**Mécaniques** :
- Badge « Mentor » pour avoir aidé 5 personnes
- Système de remerciement visible (« Thomas dit merci à Marie »)
- Parrainage avec récompense mutuelle

---

## 16. Les systèmes de coaching intégrés

### Du coaching humain au coaching algorithmique

| Technique de coaching | Implémentation gamifiée |
|---|---|
| **Bilan régulier** | Récapitulatif hebdomadaire de progression avec insights |
| **Questions puissantes** | « Qu'est-ce qui t'empêche d'atteindre ton objectif cette semaine ? » |
| **Célébration des victoires** | Célébrer chaque milestone, même petit |
| **Recadrage des échecs** | « Ce n'est pas un échec, c'est de l'apprentissage » |
| **Accountability** | Partage de progression avec un partenaire |
| **Visualisation** | « Imagine-toi avec le badge Expert. Qu'est-ce que ça changerait ? » |
| **Objectifs SMART** | Aider à formuler des objectifs spécifiques et mesurables |
| **Identification des blocages** | « Qu'est-ce qui t'a empêché de lire cette semaine ? » + proposer des solutions |

### Le « Coach algorithmique » en gamification

```
SI streak_break ET streak_était > 14 jours :
  → Message compassionnel + rappel du record
  → Proposer un objectif plus petit pour recommencer
  → « Et si tu visais juste 1 article aujourd'hui ? »

SI 3_échecs_consécutifs_au_quiz :
  → Réduire la difficulté automatiquement
  → « Ces questions étaient corsées ! Voici un module
     de révision pour consolider. »

SI engagement_en_baisse depuis 7 jours :
  → Proposer un nouveau type de contenu
  → « On a remarqué que tu aimes [catégorie].
     Voici 3 nouveaux articles qui pourraient te plaire. »

SI proche_d'un_badge (> 80% de progression) :
  → Notification de proximité
  → « Plus que [N] pour le badge [nom] ! Tu y es presque. »
```

---

## Résumé : les 20 techniques les plus puissantes pour faire agir

| # | Technique | Source | Puissance | Application |
|---|---|---|---|---|
| 1 | **Commitment device** | Économie comportementale | Maximale | Engagement public d'objectif |
| 2 | **Variable ratio reinforcement** | Skinner / Casinos | Maximale | Récompenses surprises |
| 3 | **Near-miss effect** | Casinos / Clark | Très élevée | Progression 9/10, « presque ! » |
| 4 | **Identity-based change** | Clear / Bandura | Très élevée | Titres, badges identitaires |
| 5 | **WOOP** | Oettingen | Très élevée | Onboarding avec obstacle + plan |
| 6 | **Accountability partner** | Coaching | Très élevée | Buddy system |
| 7 | **Goal gradient** | Hull / Kivetz | Élevée | Accélérer vers la fin |
| 8 | **Fresh start effect** | Milkman | Élevée | Lundi, premier du mois, post-streak break |
| 9 | **Foot-in-the-door** | Freedman | Élevée | Micro-engagements séquentiels |
| 10 | **Peak-end rule** | Kahneman | Élevée | Pic émotionnel + fin positive |
| 11 | **Zeigarnik chains** | Zeigarnik | Élevée | Toujours quelque chose d'incomplet |
| 12 | **Temptation bundling** | Milkman | Élevée | Combiner devoir + plaisir |
| 13 | **Social proof dynamique** | Cialdini | Élevée | Flux en temps réel |
| 14 | **Default effect** | Johnson | Élevée | Bons paramètres par défaut |
| 15 | **Reciprocity surprise** | Cialdini | Élevée | Cadeaux inattendus |
| 16 | **Loss-framed messaging** | Kahneman | Moyenne-élevée | « Ne perds pas... » (avec modération) |
| 17 | **Regret aversion** | Zeelenberg | Moyenne-élevée | Preview de ce qu'on aurait pu avoir |
| 18 | **Difficulty oscillation** | Game design | Moyenne | Facile-dur-facile-dur |
| 19 | **Celebration design** | Casinos / UX | Moyenne | Sons, animations, confetti |
| 20 | **Coaching algorithmique** | Coaching + ML | Moyenne | Messages adaptatifs au contexte |

---

## Lectures recommandées

- **Milkman, K.** — *How to Change: The Science of Getting From Where You Are to Where You Want to Be* (2021)
- **Oettingen, G.** — *Rethinking Positive Thinking: Inside the New Science of Motivation* (2014)
- **Clear, J.** — *Atomic Habits* (2018) — chapitres sur l'identité et les systèmes
- **Cialdini, R.** — *Influence* (2021 édition) et *Pre-Suasion* (2016)
- **Kahneman, D.** — *Thinking, Fast and Slow* (2011) — Peak-End Rule, Loss Aversion
- **Schüll, N.D.** — *Addiction by Design* (2012) — psychologie des casinos
- **Eyal, N.** — *Hooked* (2014) — formation d'habitudes produit
- **Heath, C. & D.** — *Switch: How to Change Things When Change is Hard* (2010)
