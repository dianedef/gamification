# 17 — Qui est l'utilisateur en tant que personne ?

> Sa vie, son contexte, ses aspirations — au-delà de l'abstraction « user ».

---

## Pourquoi ce document existe

La gamification parle de « users », de « players », de « segments ». Elle modélise des comportements, trace des funnels, optimise des métriques. Mais derrière chaque point de données, il y a une personne qui se réveille le matin avec des soucis, qui a des enfants à déposer à l'école, qui doute de ses choix, qui rêve de quelque chose qu'elle n'a pas encore.

**Si tu ne comprends pas cette personne, ta gamification sera un mécanisme qui tourne à vide.**

Ce document n'est pas une méthodologie UX. C'est un exercice d'empathie radicale — le fondement sur lequel tout le reste devrait être construit.

---

## 1. Au-delà de l'abstraction « utilisateur »

### Le piège de la déshumanisation

Quand on dit « l'utilisateur », on fait déjà une erreur. On réduit un être humain complexe à sa relation avec notre produit. C'est comme si un médecin ne voyait que « le foie du lit 12 ».

```
CE QUE NOS OUTILS VOIENT          CE QUI EXISTE RÉELLEMENT
─────────────────────────          ────────────────────────
session_duration: 4min23s          Elle lit entre deux réunions
bounce_rate: 34%                   Il a été interrompu par son fils
DAU: declining                     Elle part en vacances, enfin
churn: day 7                       Il a trouvé ce qu'il cherchait
streak_broken: true                Sa mère est à l'hôpital
```

### La personne entière

Chaque « utilisateur » de ton application est simultanément :

| Dimension | Ce que ça signifie | Impact sur la gamification |
|---|---|---|
| **Un corps** | Fatigue, faim, maladie, énergie | Un streak brisé peut être un jour de grippe |
| **Un esprit** | Pensées, charge mentale, préoccupations | La gamification ajoute-t-elle à sa charge cognitive ? |
| **Un cœur** | Émotions, relations, solitude, joie | Un badge n'a aucune valeur si la personne souffre |
| **Un contexte** | Travail, famille, finances, culture | Un classement public peut être humiliant dans certaines cultures |
| **Un passé** | Expériences, traumas, apprentissages | Une « punition » gamifiée peut réactiver un trauma |
| **Un futur** | Rêves, ambitions, peurs, espoirs | Est-ce que ta gamification sert son futur ? |

### Les questions fondamentales

Avant d'ajouter la moindre mécanique de gamification, pose-toi ces questions sur la personne que tu sers :

1. **Qu'est-ce qui l'a amenée ici ?** — Pas « quel canal d'acquisition », mais quel problème dans sa vie l'a poussée à chercher une solution.
2. **Qu'est-ce qu'elle fait avant et après ton app ?** — Ton app s'insère dans une journée déjà pleine.
3. **Qu'est-ce qu'elle ressentirait si ton app disparaissait demain ?** — Soulagement ? Panique ? Indifférence ?
4. **Est-ce qu'elle parlerait de ton app à quelqu'un qu'elle aime ?** — Pas « referral program » — est-ce qu'elle en serait fière ?
5. **Dans 5 ans, sera-t-elle reconnaissante d'avoir utilisé ton app ?** — La question ultime.

---

## 2. Les saisons de la vie

### Les phases qui changent tout

Une même personne n'a pas les mêmes besoins, la même disponibilité, ni la même psychologie selon où elle en est dans sa vie. La gamification qui l'ignore traite tout le monde pareil — et perd tout le monde.

#### L'étudiant (18-25 ans)

```
VIE INTÉRIEURE                         CE QUE ÇA IMPLIQUE
───────────────                        ───────────────────
• Cherche son identité                 La gamification peut l'aider à se définir
• A du temps mais peu d'argent         Pas de paywall, beaucoup de contenu
• Sensible à la validation sociale     Les badges ont un fort pouvoir identitaire
• Explore, pas encore spécialisé       Parcours ouverts, pas de voies uniques
• Impatient, veut des résultats        Feedback rapide, progression visible
• Connecté, vit en réseau              Le social est un levier naturel
```

**Risques éthiques** : Vulnérable à l'addiction, au FOMO, à la comparaison sociale toxique. Cortex préfrontal pas encore mature (jusqu'à ~25 ans) → moins de contrôle des impulsions.

**Approche responsable** : Gamification qui construit des compétences réelles. Les badges doivent refléter de vrais accomplissements, pas du temps passé.

#### Le jeune professionnel (25-35 ans)

```
VIE INTÉRIEURE                         CE QUE ÇA IMPLIQUE
───────────────                        ───────────────────
• Construit sa carrière                Progression = résonance forte
• Temps limité, optimise tout          Respecte son temps, sois utile
• Commence à avoir des responsabilités Ne le culpabilise pas pour un streak manqué
• Veut prouver sa valeur               Les réalisations doivent être partageables
• Syndrome de l'imposteur fréquent     Célèbre les victoires, même petites
• Compare sa vie aux réseaux sociaux   Attention aux leaderboards
```

**Risques éthiques** : Burnout, pression de performance, comparaison malsaine. La gamification peut amplifier le syndrome de l'imposteur.

**Approche responsable** : Progression personnelle, pas comparative. « Tu as progressé de 40% ce mois-ci » > « Tu es 847ème ».

#### Le parent (30-45 ans)

```
VIE INTÉRIEURE                         CE QUE ÇA IMPLIQUE
───────────────                        ───────────────────
• Le temps est son bien le plus rare   Chaque minute dans l'app = une minute en moins avec ses enfants
• La culpabilité est omniprésente      NE JAMAIS ajouter de la culpabilité
• Fatigue chronique                    Sessions courtes, pas d'engagement quotidien obligatoire
• Ses priorités ne sont plus lui-même  La gamification doit servir sa famille aussi
• Multitâche permanent                 UI simple, charge cognitive minimale
• Cherche de l'efficacité, pas du fun  Les mécaniques doivent avoir un ROI de temps clair
```

**Risques éthiques** : Le streak quotidien est potentiellement cruel pour un parent de nourrisson. Les notifications nocturnes sont une agression.

**Approche responsable** : Mode « parent » — streak hebdomadaire au lieu de quotidien, pas de notifications avant 9h ni après 20h, célébration de la constance sur le long terme plutôt que la fréquence.

#### Le professionnel établi (40-55 ans)

```
VIE INTÉRIEURE                         CE QUE ÇA IMPLIQUE
───────────────                        ───────────────────
• Sait ce qu'il veut (et ce qu'il ne veut pas)  Pas de gamification infantilisante
• Expertise dans son domaine           Respecte sa compétence, ne simplifie pas trop
• Peut avoir des moyens financiers     Freemium acceptable, mais pas de manipulation
• Valorise la qualité, pas la quantité Profondeur > quantité d'interactions
• Commence à penser à l'héritage      Le mentorat / la transmission est un levier puissant
• Moins sensible au FOMO              Les urgences artificielles ne marchent plus
```

**Risques éthiques** : Le condescendre. Traiter un expert de 20 ans comme un « Néophyte Niveau 1 ». La gamification mal calibrée est perçue comme un manque de respect.

**Approche responsable** : Reconnaissance de l'expertise existante. Commencer au bon niveau. Titres qui reflètent la maturité, pas l'infantilisme.

#### La personne en transition

Ce n'est pas un âge, c'est un état. Divorce, licenciement, maladie, deuil, déménagement, reconversion.

```
VIE INTÉRIEURE                         CE QUE ÇA IMPLIQUE
───────────────                        ───────────────────
• Vulnérabilité émotionnelle élevée    La moindre « punition » peut être dévastatrice
• Recherche de contrôle                La progression donne un sentiment de maîtrise
• Besoin de sens                       Chaque action doit avoir un « pourquoi »
• Isolement possible                   La communauté peut être thérapeutique
• Reconstruction identitaire           « Tu es quelqu'un qui fait X » est puissant
• Énergie variable, imprévisible       Flexibilité absolue, zéro pression
```

**Risques éthiques** : C'est la population la plus vulnérable. La gamification peut être un soutien extraordinaire OU une source d'anxiété supplémentaire. La différence ? L'empathie de la conception.

**Approche responsable** : Pas de pénalité d'absence. Messages de « bon retour ». Progrès qui ne se perdent jamais. Célébration du courage de revenir.

---

## 3. Le contexte invisible

### Ce que tu ne vois pas dans tes analytics

Chaque session d'utilisation de ton app se produit dans un contexte que tu ne connais pas. Et ce contexte change tout.

#### Le contexte temporel

| Moment | État probable | Implication pour la gamification |
|---|---|---|
| **6h-8h** | Routine matinale, énergie montante | Bon moment pour les habitudes, mauvais pour les challenges complexes |
| **8h-12h** | Travail, concentration | Si l'app est pro : focus. Si l'app est perso : l'utilisateur est distrait |
| **12h-14h** | Pause, relâchement | Sessions courtes, contenu léger, récompenses rapides |
| **14h-17h** | Creux d'énergie (chronobiologie) | Pas le moment de demander un effort cognitif |
| **17h-20h** | Transition, famille, fatigue | Respecte ce temps — il n'est pas pour toi |
| **20h-22h** | Détente, choix personnel | L'utilisateur est là par choix — c'est précieux |
| **22h-minuit** | Vulnérabilité, impulsivité | Les achats impulsifs et le doomscrolling vivent ici |
| **Minuit-6h** | Sommeil (ou insomnie) | JAMAIS de notification. Si l'utilisateur est là, c'est qu'il souffre peut-être |

#### Le contexte spatial

```
DANS LES TRANSPORTS     → Sessions courtes, connectivité instable
                           Ne demande pas une action complexe

AU BUREAU               → Mode discret, pas de sons, pas d'animations voyantes
                           Le badge qui fait « DING! » est une humiliation publique

DANS LE LIT             → Dernier geste avant de dormir
                           Ne le retiens pas éveillé avec « encore un niveau ! »

DANS UNE SALLE D'ATTENTE → Anxieux (médecin, administration)
                           L'app peut être un réconfort ou une distraction bienvenue

AUX TOILETTES           → Oui, c'est là que beaucoup ouvrent les apps
                           Sessions de 2-5 minutes — respecte ce format
```

#### Le contexte émotionnel

L'état émotionnel de la personne au moment où elle ouvre ton app est le facteur le plus important — et le plus invisible.

| État | Ce qu'elle cherche | Ce qui aide | Ce qui blesse |
|---|---|---|---|
| **Motivée** | Un défi, une progression | Challenges, objectifs clairs | Rien — mais ne prends pas son énergie pour acquise |
| **Ennuyée** | Une stimulation, une distraction | Contenu nouveau, surprise, variété | Répétition, contenu déjà vu |
| **Anxieuse** | Du contrôle, de la prévisibilité | Structure claire, progrès mesurable | Urgence, comptes à rebours, compétition |
| **Triste** | Du réconfort, de la connexion | Messages chaleureux, communauté | Comparaison sociale, classements |
| **En colère** | Un exutoire, de la justice | Feedback rapide, action concrète | Paternalisme, messages condescendants |
| **Épuisée** | Le minimum viable | Mode simplifié, pas de choix | Tutoriels, onboarding, gamification agressive |
| **Fière** | De la reconnaissance | Célébration, partage, badge | Minimiser sa réussite (« Bien joué ! Et maintenant... ») |

---

## 4. Les aspirations profondes

### Ce que les gens veulent vraiment

Quand quelqu'un utilise ton app, il ne veut pas des badges. Il ne veut pas des points. Il ne veut même pas nécessairement ce que ton app vend.

Il veut quelque chose de plus profond.

#### La pyramide des aspirations

```
                    ╱╲
                   ╱  ╲
                  ╱ SE ╲
                 ╱TRANS-╲
                ╱ CENDER╲
               ╱──────────╲          « Contribuer à quelque chose
              ╱  LAISSER    ╲         de plus grand que moi »
             ╱  UNE TRACE    ╲
            ╱──────────────────╲     « Que mon passage ait compté »
           ╱    SE RÉALISER     ╲
          ╱     (devenir)        ╲    « Devenir la personne
         ╱────────────────────────╲    que je veux être »
        ╱      ÊTRE RECONNU        ╲
       ╱       (exister)            ╲  « Que les autres voient
      ╱──────────────────────────────╲  ma valeur »
     ╱        APPARTENIR              ╲
    ╱         (connecter)              ╲ « Ne pas être seul
   ╱────────────────────────────────────╲ dans ce parcours »
  ╱          SE SENTIR EN SÉCURITÉ       ╲
 ╱           (maîtriser)                  ╲ « Savoir que je contrôle
╱──────────────────────────────────────────╲  ma situation »
```

#### Comment la gamification sert (ou trahit) chaque aspiration

| Aspiration | Comment la servir | Comment la trahir |
|---|---|---|
| **Sécurité** | Progrès sauvegardé, pas de perte, feedback clair | Reset de streak, perte de points, « tu as tout perdu » |
| **Appartenance** | Communauté, équipes, mentorat | Leaderboards qui isolent, compétition toxique |
| **Reconnaissance** | Badges significatifs, profil public, célébrations | Badges vides, inflation de points, reconnaissance automatisée |
| **Réalisation** | Parcours de maîtrise, compétences réelles | Progression artificielle, niveaux sans substance |
| **Trace** | Contributions visibles, mentorat, partage | Données perdues, historique effacé, « recommence » |
| **Transcendance** | Impact réel, contribution à une cause | Gamification purement égocentrique |

### Les 7 désirs universels (Reiss, 2004)

Steven Reiss a identifié 16 désirs fondamentaux. Voici les 7 les plus pertinents pour la gamification :

| Désir | Description | Mécanique qui y répond | Attention |
|---|---|---|---|
| **Pouvoir** | Influencer les autres | Statut, rôles, modération | Ne pas créer de tyrannie |
| **Curiosité** | Apprendre, comprendre | Contenu à débloquer, secrets | Ne pas gatekeep le savoir |
| **Indépendance** | Liberté de choix | Parcours non linéaires, opt-out | Ne pas forcer un chemin unique |
| **Statut** | Position sociale | Badges, titres, leaderboards | Ne pas humilier ceux en bas |
| **Ordre** | Structure, prévisibilité | Progression claire, checklists | Ne pas surcharger de règles |
| **Idéalisme** | Justice, contribution | Impact, charité, contribution | Ne pas instrumentaliser la vertu |
| **Contact social** | Compagnie, collaboration | Équipes, communauté, chat | Ne pas forcer la sociabilité |

---

## 5. Les identités en jeu

### Tu ne gamifies pas un comportement — tu touches une identité

La psychologie de l'identité (James Clear, *Atomic Habits*) montre que le changement durable vient de l'identité, pas des récompenses :

```
NIVEAU 1 — RÉSULTAT      « Je veux lire 30 articles »        → Motivation éphémère
NIVEAU 2 — PROCESSUS     « Je lis tous les jours »           → Habitude fragile
NIVEAU 3 — IDENTITÉ      « Je suis quelqu'un qui apprend »   → Changement durable
```

#### Comment la gamification touche l'identité

Chaque interaction avec ton système de gamification envoie un message identitaire à l'utilisateur :

| Ce que tu affiches | Le message identitaire reçu | L'effet sur la personne |
|---|---|---|
| « Streak : 30 jours » | « Je suis constant, fiable, discipliné » | Fierté, renforcement identitaire |
| « Streak perdu » | « J'ai échoué, je ne suis pas discipliné » | Honte, dissonance identitaire |
| « Badge Expert » | « Je suis compétent dans ce domaine » | Confiance, autorité ressentie |
| « Niveau 1 : Néophyte » | « Je suis un débutant, je ne sais rien » | Motivation ou humiliation (selon la personne) |
| « 12ème sur 500 » | « Je suis meilleur que les autres » | Orgueil (fragile) |
| « 489ème sur 500 » | « Je suis nul, je n'y arriverai jamais » | Abandon, blessure |

#### Le danger : l'identité fragile

Quand l'identité est construite sur la gamification plutôt que sur la compétence réelle, elle est fragile :

```
IDENTITÉ CONSTRUITE SUR LA GAMIFICATION (fragile)
─────────────────────────────────────────────────
« J'ai un streak de 365 jours sur Duolingo »
  → Le streak casse → Crise identitaire
  → « Si je n'ai plus mon streak, qui suis-je ? »

IDENTITÉ CONSTRUITE SUR LA COMPÉTENCE (solide)
──────────────────────────────────────────────
« Je parle espagnol, j'ai eu une conversation avec un local en voyage »
  → Le streak est secondaire
  → L'identité survit à la perte du streak
```

**Principe** : La gamification devrait construire l'identité sur la compétence réelle, pas sur les métriques de la gamification elle-même.

---

## 6. La charge mentale — ce que tu ajoutes

### Chaque mécanique a un coût cognitif

Ton utilisateur arrive avec une charge mentale existante. Chaque élément de gamification ajoute à cette charge :

```
CHARGE MENTALE EXISTANTE DE L'UTILISATEUR
──────────────────────────────────────────
+ Travail (deadlines, réunions, emails)
+ Famille (enfants, couple, parents)
+ Santé (rendez-vous, régime, sport)
+ Finances (factures, budget, épargne)
+ Social (amis, obligations, conflits)
+ Administratif (impôts, paperasse)
+ Mental (anxiété, doutes, projets)
= ████████████████████████████████░░░░ 80% plein

CE QUE TA GAMIFICATION AJOUTE
─────────────────────────────
+ « N'oublie pas ton streak ! »
+ « Nouveau badge disponible ! »
+ « Tu es descendu au classement ! »
+ « Challenge de la semaine ! »
+ « 3 quêtes non terminées ! »
= ████████████████████████████████████ 100% → SURCHARGE → ABANDON
```

### Le calcul que personne ne fait

**Théorie de la charge cognitive (Sweller, 1988)** — La mémoire de travail a une capacité limitée. Chaque décision, chaque notification, chaque choix proposé consomme de cette capacité.

| Mécanique | Charge cognitive ajoutée | Justification nécessaire |
|---|---|---|
| Points simples | ★☆☆☆☆ Faible | Passive, pas de décision |
| Badges | ★★☆☆☆ Modérée | Comprendre les conditions |
| Streak | ★★★☆☆ Élevée | Obligation quotidienne, anxiété |
| Quêtes multi-étapes | ★★★★☆ Très élevée | Planification, suivi, décisions |
| Leaderboard | ★★★☆☆ Élevée | Comparaison permanente, stress |
| Choix de parcours | ★★★★☆ Très élevée | Paralysie du choix possible |
| Système complet (tout) | ★★★★★ Maximale | Si tout est actif = surcharge garantie |

### Règle de conception : la règle du « et si c'était toi ? »

Avant d'ajouter une mécanique, imagine :
- Tu as mal dormi
- Ton enfant est malade
- Tu as une deadline au travail
- Tu as 3 minutes dans le bus

**Est-ce que ta mécanique aide ou agresse dans ce contexte ?**

---

## 7. Les moments de vérité

### Les instants où ta gamification est vraiment testée

Il y a des moments où ta gamification révèle sa vraie nature — bienveillante ou extractive.

#### Moment 1 : Le retour après absence

La personne revient après 2 semaines d'absence. Qu'est-ce qu'elle voit ?

```
EXTRACTIF                              BIENVEILLANT
─────────                              ────────────
« Ton streak de 47 jours              « Content de te revoir !
  a été perdu. »                        Ton meilleur streak : 47 jours.
                                        On recommence ensemble ? »
« Tu as manqué 14 récompenses
  quotidiennes. »                      « Pendant ton absence, voici
                                        ce qui est nouveau. »
« Tu es passé du niveau 12
  au niveau 8. »                       « Tu reprends exactement
                                        là où tu t'étais arrêté. »
```

#### Moment 2 : L'échec

La personne n'a pas réussi un challenge ou un objectif.

```
EXTRACTIF                              BIENVEILLANT
─────────                              ────────────
« Objectif non atteint.               « 73% de l'objectif — c'est
  Essaie encore. »                      déjà beaucoup.
                                        Tu veux ajuster l'objectif ? »
« Tu as perdu. Recommence. »
                                       « Chaque tentative t'a appris
                                        quelque chose. Voici ta
                                        progression quand même. »
```

#### Moment 3 : Le plateau

La personne progresse plus lentement. Les gains visibles ralentissent.

```
EXTRACTIF                              BIENVEILLANT
─────────                              ────────────
[Rien. Silence. L'app n'a rien        « Les plateaux font partie du
 à offrir si pas de mécanique           chemin. Tu consolides ce que
 déclenchée. La personne se             tu as appris. C'est aussi
 sent invisible.]                       du progrès. »

                                       « Tu es sur ce sujet depuis
                                        3 semaines — voici tout ce
                                        que tu as accompli. »
```

#### Moment 4 : L'accomplissement majeur

La personne atteint un objectif important.

```
EXTRACTIF                              BIENVEILLANT
─────────                              ────────────
« Badge débloqué ! Et maintenant,     « Tu as réussi. Prends un moment
  voici le PROCHAIN objectif... »       pour apprécier ça. »

[Immédiatement poussé vers             [Pause. Célébration. Espace pour
 le prochain objectif. La               savourer. Puis, quand l'utilisateur
 victoire dure 2 secondes.]             est prêt, montrer la suite.]
```

#### Moment 5 : Le départ

La personne décide de partir, de désinstaller, d'arrêter.

```
EXTRACTIF                              BIENVEILLANT
─────────                              ────────────
« Tu vas perdre tout ton progrès !    « Merci d'avoir été là.
  Es-tu sûr ? VRAIMENT sûr ? »         Tu peux exporter tes données.
                                        Et si tu reviens un jour,
« Tu vas perdre 2 347 badges           tout sera encore là. »
  et 14 500 points ! »
                                       « On espère t'avoir aidé.
[Dark pattern de rétention]             Bon courage pour la suite. »
```

---

## 8. Le portrait empathique — un outil de conception

### Comment créer un portrait empathique

Avant de concevoir ta gamification, crée un portrait empathique pour chaque persona. Ce n'est pas un persona marketing (âge, revenu, device). C'est un portrait humain.

#### Template de portrait empathique

```
┌─────────────────────────────────────────────────────────┐
│  PORTRAIT EMPATHIQUE : [Prénom]                         │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ SA VIE EN CE MOMENT                                ││
│  │                                                     ││
│  │ • Où en est-il/elle dans sa vie ?                   ││
│  │ • Quelle est sa plus grande préoccupation ?         ││
│  │ • Combien de temps libre a-t-il/elle vraiment ?     ││
│  │ • Qu'est-ce qui le/la réveille à 3h du matin ?      ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ CE QU'IL/ELLE VEUT (conscient)                      ││
│  │                                                     ││
│  │ • Pourquoi a-t-il/elle téléchargé/ouvert ce produit?││
│  │ • Qu'est-ce qu'il/elle dirait si on lui demandait ? ││
│  │ • Quel résultat concret attend-il/elle ?            ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ CE QU'IL/ELLE VEUT VRAIMENT (profond)               ││
│  │                                                     ││
│  │ • Quelle identité veut-il/elle construire ?         ││
│  │ • De quoi a-t-il/elle peur ?                        ││
│  │ • Qu'est-ce qui le/la rendrait fier/fière ?         ││
│  │ • Quel besoin émotionnel est en jeu ?               ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ SA RELATION AVEC NOTRE PRODUIT                      ││
│  │                                                     ││
│  │ • Quand utilise-t-il/elle notre produit ?           ││
│  │ • Dans quel état émotionnel ?                       ││
│  │ • Combien de minutes réalistes ?                    ││
│  │ • Qu'est-ce qui le/la ferait revenir demain ?       ││
│  │ • Qu'est-ce qui le/la ferait partir pour toujours ? ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ NOTRE RESPONSABILITÉ                                ││
│  │                                                     ││
│  │ • Comment pouvons-nous l'aider sans lui nuire ?     ││
│  │ • Quelle gamification est APPROPRIÉE pour cette     ││
│  │   personne dans CE contexte de vie ?                ││
│  │ • De quoi n'a-t-il/elle PAS besoin de notre part ?  ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Exemple : Sarah, 32 ans, jeune maman en reconversion

```
SA VIE EN CE MOMENT
• Maman d'un enfant de 18 mois, en reconversion dans le développement web
• Se forme le soir après le coucher de l'enfant (21h-23h), épuisée
• Syndrome de l'imposteur massif — « Je suis trop vieille pour commencer »
• Budget serré (congé parental), chaque dépense est réfléchie

CE QU'ELLE VEUT (conscient)
• Apprendre le développement web pour trouver un emploi flexible
• Finir sa formation avant la fin de son congé parental
• Obtenir un certificat qui prouve ses compétences

CE QU'ELLE VEUT VRAIMENT (profond)
• Prouver qu'elle peut se réinventer (identité)
• Indépendance financière (sécurité)
• Être un modèle pour son enfant (sens)
• Ne plus dépendre de son ancien métier qu'elle détestait (liberté)

SA RELATION AVEC NOTRE PRODUIT
• 45 minutes le soir, sur le canapé, fatiguée
• Interruptions fréquentes (l'enfant se réveille)
• A besoin de reprendre exactement là où elle s'est arrêtée
• Culpabilise quand elle « ne fait rien » le soir — l'app soulage cette culpabilité

NOTRE RESPONSABILITÉ
• NE PAS ajouter de la culpabilité (streak manqué un soir d'enfant malade)
• NE PAS la comparer aux étudiants à plein temps
• Célébrer le courage de se former le soir à 21h après une journée de maman
• Progression adaptée à 45 min/jour, pas 8h/jour
• Sauvegarder son progrès de façon FIABLE (sa plus grande peur : perdre son travail)
```

**C'est ça, concevoir pour une personne.** Pas pour un « user segment 25-35 F ».

---

## 9. Les besoins non exprimés

### Ce que l'utilisateur ne dit jamais mais ressent toujours

Les besoins les plus importants sont ceux que personne n'exprime dans un formulaire de feedback :

| Besoin non exprimé | Ce que ça signifie | Comment y répondre |
|---|---|---|
| **« Ne me fais pas sentir bête »** | L'apprentissage est vulnérable | Pas de « mauvaise réponse », reformuler en « pas encore » |
| **« Rappelle-moi pourquoi je fais ça »** | La motivation fluctue | Reconnecter régulièrement à l'objectif initial |
| **« Dis-moi que c'est normal d'être lent »** | La comparaison est toxique | « Chacun avance à son rythme. Toi, tu avances. » |
| **« Ne me juge pas si je disparais »** | La vie est imprévisible | Pas de message culpabilisant au retour |
| **« Montre-moi que j'ai grandi »** | Le progrès est invisible de l'intérieur | Comparaisons avant/après, rétrospectives |
| **« Laisse-moi partir si je veux »** | La liberté est un besoin fondamental | Opt-out facile, pas de rétention agressive |
| **« Surprends-moi parfois »** | La routine lasse | Récompenses inattendues, contenu varié |
| **« Fais-moi sentir que je compte »** | Tout le monde veut être vu | Personnalisation, reconnaissance individuelle |

---

## 10. Le manifeste : concevoir pour des personnes

### 10 engagements de conception centrée sur l'humain

| # | Engagement |
|---|---|
| 1 | **Je conçois pour des personnes, pas des utilisateurs.** Chaque métrique est une vie. |
| 2 | **Je respecte le temps.** Le temps qu'elle me donne, elle ne le donne pas à ses proches. |
| 3 | **Je ne culpabilise jamais.** La vie est déjà assez difficile sans que mon app en rajoute. |
| 4 | **Je célèbre le courage.** Ouvrir l'app après un échec demande plus de courage qu'un streak parfait. |
| 5 | **Je construis des compétences, pas des dépendances.** Le succès, c'est quand ils n'ont plus besoin de moi. |
| 6 | **Je m'adapte à leur vie, pas l'inverse.** C'est mon app qui doit être flexible, pas eux. |
| 7 | **Je protège les vulnérables.** Plus quelqu'un est en difficulté, plus je dois être délicat. |
| 8 | **Je laisse partir.** Si quelqu'un veut partir, je lui dis merci et je lui ouvre la porte. |
| 9 | **Je mesure l'impact réel.** Pas les sessions, pas les DAU — est-ce que sa vie est meilleure ? |
| 10 | **Je me demande : et si c'était ma mère ?** Parce que ça pourrait l'être. |

---

## Références

- **Maslow, A.** — *A Theory of Human Motivation* (1943) — Hiérarchie des besoins
- **Reiss, S.** — *Who Am I? The 16 Basic Desires That Motivate Our Actions* (2004) — Désirs fondamentaux
- **Clear, J.** — *Atomic Habits* (2018) — Identité et changement de comportement
- **Sweller, J.** — *Cognitive Load Theory* (1988) — Charge cognitive et apprentissage
- **Krug, S.** — *Don't Make Me Think* (2000) — Simplicité et charge cognitive UX
- **Brown, B.** — *Daring Greatly* (2012) — Vulnérabilité et courage
- **Christensen, C.** — *Competing Against Luck* (2016) — Jobs to Be Done
- **Norman, D.** — *Emotional Design* (2004) — Les 3 niveaux du design émotionnel
- **Sinek, S.** — *Start With Why* (2009) — Le « pourquoi » comme fondation
