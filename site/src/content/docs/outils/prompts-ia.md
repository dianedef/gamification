---
title: "Prompts pour utiliser cette base de connaissances"
description: "Des prompts prêts à l'emploi pour tirer le maximum de cette base de connaissances avec un LLM (Claude, GPT, etc.)."
pubDate: "2026-03-21"
section: "outils"
order: 0
---

## Comment utiliser ce document

1. **Copier le prompt** qui correspond à ton besoin
2. **Donner au LLM accès** à la base de connaissances (en contexte, en RAG, ou en référence)
3. **Adapter** les parties entre `[crochets]` à ta situation
4. **Itérer** — Les meilleurs résultats viennent des conversations, pas d'un seul prompt

---

## 1. Concevoir un système de gamification

### Prompt : Conception complète

```
Tu es un expert en gamification. Tu as accès à une base de connaissances
complète sur le sujet (neurosciences, psychologie, frameworks, mécaniques,
éthique, copywriting).

Mon application est [DESCRIPTION DE L'APP].
Mes utilisateurs sont [DESCRIPTION DES UTILISATEURS].
Mon objectif principal est [OBJECTIF : rétention / engagement / apprentissage / etc.].

Conçois un système de gamification complet en suivant cette approche :

1. ANALYSE — Identifie les Core Drives (Octalysis) les plus pertinents
   pour mon contexte. Quels types d'utilisateurs (Hexad) vais-je rencontrer ?

2. MÉCANIQUES — Propose 5-8 mécaniques adaptées à mon contexte.
   Pour chaque mécanique, explique :
   - Pourquoi elle est pertinente (quelle théorie psychologique la justifie)
   - Comment l'implémenter concrètement
   - Les risques éthiques à surveiller

3. PROGRESSION — Dessine le parcours d'un utilisateur de J1 à J90 :
   - Quand chaque mécanique entre en jeu (progressive disclosure)
   - Les milestones clés
   - Les moments de risque de churn et comment les adresser

4. COPY — Écris les messages clés :
   - 3 messages de badge (bronze, argent, or)
   - Le message de streak perdu
   - La notification de réengagement à J+3
   - L'empty state du dashboard gamification

5. ÉTHIQUE — Passe ton système au crible de la checklist éthique :
   - Transparence, consentement, bien-être, équité
   - Identifie les risques et propose des garde-fous

Sois concret et actionnable. Pas de généralités.
```

### Prompt : Audit d'une gamification existante

```
Tu es un auditeur expert en gamification. Analyse le système de gamification
suivant et identifie les forces, faiblesses et opportunités d'amélioration.

Système actuel :
[DÉCRIRE LES MÉCANIQUES EN PLACE : badges, points, streaks, etc.]

Contexte :
- Application : [TYPE D'APP]
- Utilisateurs : [QUI]
- Métriques actuelles : [D7 RETENTION, DAU, etc. si disponibles]

Pour ton audit, évalue :

1. COUVERTURE OCTALYSIS — Quels Core Drives sont couverts ? Lesquels manquent ?
   Le système est-il trop "PBL" (Points/Badges/Leaderboards) ?

2. PSYCHOLOGIE — Les mécaniques respectent-elles la SDT (autonomie, compétence,
   relation) ? Y a-t-il un risque d'overjustification ? D'adaptation hédonique ?

3. COPYWRITING — Les messages sont-ils positifs, identitaires, encourageants ?
   Ou sont-ils génériques/culpabilisants ?

4. ÉTHIQUE — Y a-t-il des dark patterns ? Des mécaniques de honte ?
   De la manipulation émotionnelle ?

5. PARCOURS — Le onboarding est-il gamifié ? Le premier badge arrive-t-il
   en < 2 minutes ? La progression est-elle visible ?

6. RECOMMANDATIONS — 5 améliorations prioritaires classées par impact/effort.
```

---

## 2. Écrire du copy gamifié

### Prompt : Messages de badges

```
Tu es un copywriter spécialisé en gamification. Tu connais les principes
de Cialdini, le framing positif, et l'importance de l'identité dans le copy.

Écris les messages pour ces badges :
[LISTE DES BADGES AVEC NOM, CONDITION, TIER]

Pour chaque badge, fournis :
1. Le message toast (court, émotionnel, max 2 lignes)
2. La description détaillée (pourquoi ce badge, ce qu'il signifie)
3. Le message « en cours » (progression vers le badge)
4. Le message « prochain pas » (ce qu'il faut faire ensuite)

Respecte ces règles :
- Ton : [CHOISIR : complice / professionnel / épique / minimaliste]
- Tutoiement / vouvoiement : [CHOISIR]
- Célébrer l'effort, pas le résultat
- Framing toujours positif
- Chaque message inclut la prochaine étape (anticipation = dopamine)
- Les badges Or/Diamant ont un ton plus solennel que les Bronze
- Jamais de culpabilisation
```

### Prompt : Messages de streak

```
Tu es un copywriter expert en gamification. Écris tous les messages
liés au streak pour mon application [NOM/TYPE].

J'ai besoin des messages pour chaque état :

STREAK ACTIF :
- Jour 1, 3, 7, 14, 30, 50, 100, 365
- Message quotidien standard (quand ce n'est pas un milestone)

STREAK EN DANGER :
- Notification de rappel (pas anxiogène !)
- Message quand il reste < 3h

STREAK PERDU :
- Message principal (compassionnel, tourné vers l'avenir)
- Invitation à recommencer
- Rappel du record personnel

STREAK GELÉ :
- Confirmation que le freeze a été utilisé
- Message le lendemain (« ton streak a été sauvé »)

Règles :
- JAMAIS culpabilisant ou anxiogène
- Le ton passe de "encourageant" (début) à "respectueux" (streak long)
- Utiliser le record personnel comme motivation positive
- Chaque message de streak perdu doit contenir un élément d'espoir
```

### Prompt : Notifications de réengagement

```
Tu es un copywriter qui comprend la psychologie du réengagement.
Écris une séquence de messages pour ramener un utilisateur inactif.

Contexte :
- App : [TYPE]
- Données utilisateur disponibles : [prénom, dernier badge, streak record, etc.]

Écris les messages pour :
- J+1 inactif (rappel doux)
- J+3 inactif (contenu intéressant)
- J+7 inactif (win-back avec bonus)
- J+14 inactif (récapitulatif de ce qu'il a accompli)
- J+30 inactif (dernier message, respectueux)

Pour chaque message :
- Objet de notification / email
- Corps du message (3-5 lignes max)
- CTA

Règles :
- Maximum 1 message par semaine
- Jamais "tu nous manques" (centré sur le business, pas l'utilisateur)
- Toujours centré sur la VALEUR pour l'utilisateur
- Le message de J+30 doit accepter le départ avec grâce
- Respecter le RGPD (opt-out facile)
```

---

## 3. Nommer et structurer

### Prompt : Nommer les badges

```
Tu es un naming expert spécialisé en gamification. Tu sais que
les noms de badges doivent être identitaires ("je SUIS un..."),
évocateurs et aspirationnels.

Mon application est [DESCRIPTION].
Voici les conditions de mes badges :
[LISTE : condition → à nommer]

Pour chaque badge, propose :
- 3 options de nom (du plus classique au plus créatif)
- Pour chaque nom : pourquoi il fonctionne psychologiquement
- Le nom recommandé

Contraintes :
- Univers / thème : [CHOISIR : médiéval / spatial / académique / neutre / etc.]
- Langue : [français / anglais / bilingue]
- Les noms doivent pouvoir fonctionner comme identité sociale
  ("Je suis un [NOM DU BADGE]" doit sonner bien)
```

### Prompt : Structurer les niveaux

```
Conçois un système de niveaux pour mon application [DESCRIPTION].

Paramètres :
- Nombre de niveaux : [5-10 recommandé]
- Courbe de progression : [linéaire / exponentielle / logarithmique]
- Ce qui est débloqué à chaque niveau : [fonctionnalités / cosmétiques / badges]

Pour chaque niveau, définis :
- Le nom (thème : [CHOISIR])
- L'XP requis
- Ce qui est débloqué
- Le message de level-up
- Le changement visuel (couleur, icône, cadre)

Assure-toi que :
- Le niveau 1 → 2 prend < 5 minutes
- Chaque niveau débloque quelque chose de CONCRET (pas juste un chiffre)
- La courbe maintient le flow (pas trop facile ni trop dur)
- Les noms racontent une histoire de progression
```

---

## 4. Analyser et décider

### Prompt : Choisir les mécaniques

```
Je construis [TYPE D'APP] pour [AUDIENCE].
Mon objectif #1 est [OBJECTIF].

En utilisant tes connaissances sur les frameworks de gamification
(Octalysis, Hexad, MDA), aide-moi à choisir les bonnes mécaniques.

Pour chaque mécanique que tu recommandes :
1. Quelle théorie psychologique la soutient ?
2. Quel Core Drive (Octalysis) active-t-elle ?
3. Quel type d'utilisateur (Hexad) va l'apprécier le plus ?
4. Quel impact mesurable attendre ? (benchmark si disponible)
5. Quels risques éthiques surveiller ?
6. Quelle priorité d'implémentation ? (MVP / Phase 2 / Phase 3)

Classe tes recommandations par ordre de priorité.
```

### Prompt : Diagnostiquer un problème de rétention

```
Mon application [DESCRIPTION] a un problème de rétention :
[DÉCRIRE LE PROBLÈME : D7 faible, churn après streak break, etc.]

Données disponibles :
[MÉTRIQUES : D1, D7, D30, streak break rate, badge earn rate, etc.]

En utilisant tes connaissances en psychologie de la gamification,
diagnostique les causes probables et propose des solutions.

Structure ta réponse :
1. DIAGNOSTIC — Quelles sont les causes probables ? (théorie + data)
2. QUICK WINS — 3 actions à impact rapide (< 1 semaine d'implémentation)
3. MOYEN TERME — 3 améliorations structurelles (1-4 semaines)
4. MÉTRIQUES — Comment mesurer si ça marche ?
5. ANTI-PATTERNS — Ce qu'il ne faut PAS faire (ex: plus de notifications)
```

### Prompt : Évaluer l'éthique

```
Voici le système de gamification de mon application :
[DÉCRIRE EN DÉTAIL]

Fais un audit éthique complet en utilisant :
- Le framework ETHICAL (Empowerment, Transparency, Honesty,
  Informed consent, Control, Accessibility, Long-term wellbeing)
- Les dark patterns connus (shame mechanics, artificial scarcity,
  sunk cost exploitation, notification manipulation)
- Les principes du RGPD pour les données de gamification
- La protection des populations vulnérables (enfants, personnes
  à tendance addictive)

Pour chaque mécanique :
- Verdict : ✅ Éthique / ⚠️ À surveiller / ❌ Dark pattern
- Si ⚠️ ou ❌ : alternative éthique proposée
- Test de l'intention : sert l'utilisateur OU sert le business ?
```

---

## 5. Créer du contenu

### Prompt : Quêtes et défis

```
Crée [N] quêtes pour mon application [DESCRIPTION].

Types de quêtes nécessaires :
- 3 quêtes d'onboarding (premières 24h)
- 5 quêtes quotidiennes (variées, renouvelables)
- 3 quêtes hebdomadaires (plus ambitieuses)
- 2 quêtes principales (arc narratif sur plusieurs semaines)
- 2 quêtes secrètes (easter eggs)

Pour chaque quête :
- Nom (évocateur, pas générique)
- Description (1-2 phrases, ton [CHOISIR])
- Étapes détaillées
- Récompense (XP + badge éventuel)
- Durée estimée
- Type d'utilisateur ciblé (Hexad)

Les quêtes d'onboarding doivent former un mini-tutoriel narratif.
Les quêtes secrètes doivent être découvrables par l'exploration.
```

### Prompt : Year in Review / Récapitulatif

```
Conçois un "Year in Review" (style Spotify Wrapped) pour
mon application [DESCRIPTION].

Données utilisateur disponibles :
[LISTE : articles lus, badges, streak, catégories, temps passé, etc.]

Crée une séquence de 8-12 écrans :
1. Écran d'intro (teaser émotionnel)
2-9. Écrans de données (un fait marquant par écran)
10. Écran récapitulatif
11. Écran de partage social
12. Écran de projection (objectifs pour l'année suivante)

Pour chaque écran :
- Le titre (court, impactant)
- Le texte principal (1-2 phrases)
- Le type de visualisation suggéré
- Le ton émotionnel

Règles :
- Commencer par le fait le plus impressionnant
- Toujours positif (même si l'utilisateur a peu utilisé l'app)
- Format partageable sur les réseaux sociaux
- Finir sur une note d'anticipation (année suivante)
```

---

## 6. Prompts de réflexion stratégique

### Prompt : Gamification pour un nouveau produit

```
Je lance [PRODUIT] dans [X] mois. Mon audience cible est [AUDIENCE].
Le comportement principal que je veux encourager est [COMPORTEMENT].

Aide-moi à réfléchir à la gamification AVANT de coder quoi que ce soit.

Questions à explorer ensemble :
1. Ce comportement est-il déjà intrinsèquement motivant ?
   (Si oui, la gamification risque de tuer la motivation — overjustification)
2. Quel est le "Aha Moment" de mon produit ? Comment la gamification
   peut-elle y amener plus vite ?
3. Quels sont les moments de friction naturels ? La gamification
   peut-elle les adoucir ?
4. Quel est le coût d'une gamification ratée ? (utilisateurs qui
   gamifient le système, dépendance aux récompenses, etc.)
5. Quel est le MVP de gamification le plus simple qui a de la valeur ?
   (probablement pas un système complet — peut-être juste un streak)
```

### Prompt : Gamification vs Dark Patterns — ligne rouge

```
Je veux augmenter [MÉTRIQUE] dans mon application.
Mon équipe propose [IDÉE DE MÉCANIQUE].

Aide-moi à déterminer si cette mécanique est de la gamification
éthique ou un dark pattern, en appliquant ces tests :

1. TEST DE L'INTENTION — Qui en bénéficie vraiment ?
2. TEST DE LA TRANSPARENCE — L'utilisateur comprendrait-il le mécanisme
   si on le lui expliquait ?
3. TEST DU JOURNALISTE — Serais-je à l'aise si un journaliste écrivait
   un article sur cette mécanique ?
4. TEST DE LA RÉVERSIBILITÉ — L'utilisateur peut-il facilement opt-out ?
5. TEST DU BIEN-ÊTRE — Cette mécanique améliore-t-elle la vie de
   l'utilisateur ou l'exploite-t-elle ?

Si c'est un dark pattern : propose une alternative éthique qui atteint
le même objectif business.
```

---

## 7. Prompts pour l'amélioration continue

### Prompt : Interpréter les métriques

```
Voici les métriques de gamification de ce mois :
[COLLER LES DONNÉES]

Aide-moi à interpréter ces données :
1. Quels signaux sont positifs ? Pourquoi ?
2. Quels signaux sont préoccupants ? Pourquoi ?
3. Quelles hypothèses peut-on formuler ?
4. Quels A/B tests lancer pour valider ces hypothèses ?
5. Quelles actions prendre maintenant (avant les tests) ?

Utilise ta connaissance de la psychologie pour aller au-delà
des chiffres bruts. Par exemple : un streak break rate de 8%
est-il normal ? Que dit la littérature ?
```

### Prompt : Éviter la fatigue de gamification

```
Mon application a [X] mois et je constate des signes de
fatigue de gamification :
[SYMPTÔMES : baisse d'engagement, badges ignorés, etc.]

C'est probablement de l'adaptation hédonique. Aide-moi à :
1. Diagnostiquer quelles mécaniques se sont "émoussées"
2. Proposer des renouvellements sans tout casser
3. Identifier les mécaniques qui résistent au temps
   (et pourquoi — probablement les sociales et identitaires)
4. Planifier un calendrier de renouvellement sur 6 mois
```

---

## Conseils d'utilisation des prompts

### Ce qui rend un prompt efficace

| Élément | Pourquoi | Exemple |
|---|---|---|
| **Contexte** | L'IA adapte sa réponse | « App d'apprentissage pour développeurs juniors » |
| **Rôle** | Active les bonnes connaissances | « Tu es un expert en gamification » |
| **Contraintes** | Évite les réponses génériques | « 5 mécaniques max, pas de leaderboard » |
| **Format** | Structure la réponse | « Pour chaque mécanique : théorie + application + risque » |
| **Anti-exemples** | Clarifie ce qu'on ne veut PAS | « Pas de PBL basique, pas de dark patterns » |

### Enchaîner les prompts

Les meilleurs résultats viennent d'une conversation, pas d'un seul prompt :

```
Prompt 1 : "Conçois le système de gamification" (vue d'ensemble)
Prompt 2 : "Approfondis la mécanique de streak" (zoom)
Prompt 3 : "Écris tous les messages de streak" (copywriting)
Prompt 4 : "Maintenant passe le tout au crible éthique" (audit)
Prompt 5 : "Résume en un plan d'implémentation priorisé" (action)
```

### Donner la base de connaissances en contexte

Pour les meilleurs résultats, inclure dans le contexte du LLM :

```
Tu as accès à une base de connaissances sur la gamification
qui couvre : neurosciences (dopamine, circuits de récompense),
psychologie (SDT, Flow, Cialdini, réactance, adaptation hédonique),
frameworks (Octalysis, Hexad, Hook Model), 30+ mécaniques de jeu,
design comportemental, UX, métriques, études de cas (Duolingo,
GitHub, etc.), éthique, et copywriting persuasif.

Utilise ces connaissances pour répondre de façon précise et fondée,
en citant les théories pertinentes.
```
