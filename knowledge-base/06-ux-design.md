# 06 — UX et design visuel de la gamification

> Principes de design pour créer des expériences gamifiées esthétiques, accessibles et efficaces.

---

## 1. Principes fondamentaux du feedback visuel

### La hiérarchie du feedback

Chaque action de l'utilisateur doit recevoir un feedback proportionnel à son importance :

| Importance | Type de feedback | Timing | Exemple |
|---|---|---|---|
| **Micro** | Changement d'état subtil | < 100ms | Bouton qui change de couleur au hover |
| **Petite** | Animation courte | < 300ms | +10 XP qui apparaît et fade out |
| **Moyenne** | Animation + son | < 500ms | Badge débloqué avec bounce |
| **Grande** | Animation complète | 1-3s | Confetti + son + message toast |
| **Majeure** | Écran dédié | 3-5s | Level up avec animation plein écran |

### La règle des 3 secondes

Après une action significative, l'utilisateur devrait comprendre en **moins de 3 secondes** :
1. Ce qui vient de se passer
2. Pourquoi c'est bien
3. Ce qui vient ensuite

---

## 2. Animations de gamification

### Catalogue des animations essentielles

#### Bounce (Rebond)

**Usage** : Badge débloqué, nouveau niveau atteint.

```css
@keyframes bounce {
  0%   { transform: scale(0); opacity: 0; }
  50%  { transform: scale(1.2); }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

.badge-unlock {
  animation: bounce 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

**Timing** : 400-600ms. Pas plus, sinon ça ralentit l'expérience.

#### Scale Pulse (Pulsation)

**Usage** : Streak actif, élément important.

```css
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.streak-active {
  animation: pulse 2s ease-in-out infinite;
}
```

#### Confetti

**Usage** : Accomplissements majeurs uniquement (pas chaque badge).

```
Quand utiliser le confetti :
✅ Premier badge obtenu
✅ Level up
✅ 100% de complétion
✅ Streak milestone (7, 30, 100, 365 jours)
❌ Chaque XP gagné
❌ Chaque article lu
❌ Chaque visite quotidienne
```

#### Glow (Halo lumineux)

**Usage** : Mise en évidence d'éléments actifs ou récemment débloqués.

```css
@keyframes glow {
  0%   { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5); }
  50%  { box-shadow: 0 0 20px rgba(99, 102, 241, 0.8); }
  100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5); }
}

.newly-earned {
  animation: glow 2s ease-in-out 3; /* 3 cycles puis s'arrête */
}
```

#### Shake (Tremblement)

**Usage** : Avertissement, streak en danger.

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-5px); }
  75%      { transform: translateX(5px); }
}

.streak-danger {
  animation: shake 0.5s ease-in-out;
  color: var(--gamification-warning);
}
```

#### Count Up (Compteur animé)

**Usage** : Points gagnés, progression numérique.

```javascript
function animateCounter(element, from, to, duration = 1000) {
  const start = performance.now()
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
    element.textContent = Math.round(from + (to - from) * eased)
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}
```

### Principes d'animation

| Principe | Description | Application |
|---|---|---|
| **Proportionnalité** | L'animation reflète l'importance de l'action | Petit gain = petite animation |
| **Direction** | L'animation guide le regard | XP qui « monte » vers le total |
| **Continuité** | Les transitions sont fluides | Barre de progression animée |
| **Restraint** | Pas trop d'animations simultanées | Max 1 animation majeure à la fois |
| **Accessibilité** | Respecter prefers-reduced-motion | Toujours, sans exception |

### Accessibilité des animations

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .confetti-container {
    display: none !important;
  }
}
```

---

## 3. Design des composants de gamification

### Badge Card

```
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│      ┌─────┐        │     │      ┌─────┐        │
│      │ 🏆  │        │     │      │ 🔒  │        │
│      └─────┘        │     │      └─────┘        │
│                     │     │                     │
│   Explorateur       │     │   ???               │
│   ──────────        │     │   ──────────        │
│   Lu 10 articles    │     │   Lis 20 articles   │
│   dans 3 catégories │     │   pour débloquer    │
│                     │     │                     │
│   🥇 Or             │     │   ░░░░░░░░░ 45%     │
│   Obtenu le 15 mars │     │   9/20 articles     │
└─────────────────────┘     └─────────────────────┘
     État: Débloqué              État: Verrouillé
```

**Design guidelines** :
- **Débloqué** : Couleurs vives, badge visible, date d'obtention
- **Verrouillé** : Grisé avec opacité réduite, icône cadenas, barre de progression vers le déblocage
- **Nouveau** : Glow animation pendant 24h après obtention
- **Secret** : Icône « ? » sans description

### Progress Bar

```
Standard :
┌──────────────────────────────────────┐
│████████████████████░░░░░░░░░░░░░░░░░│ 55%
└──────────────────────────────────────┘

Segmentée :
┌────┬────┬────┬────┬────┬────┬────┬────┐
│████│████│████│████│████│░░░░│░░░░│░░░░│ 5/8
└────┴────┴────┴────┴────┴────┴────┴────┘

Circulaire :
    ╭───────╮
   ╱ ╲     ╱ ╲
  │   ╲   ╱   │
  │    ╲ ╱    │     72%
  │    ╱ ╲    │
  │   ╱   ╲   │
   ╲ ╱     ╲ ╱
    ╰───────╯

Multi-catégories :
JavaScript  ████████████████████░░ 85%
CSS         ████████████░░░░░░░░░░ 55%
React       ████████░░░░░░░░░░░░░░ 35%
Node.js     ████░░░░░░░░░░░░░░░░░░ 15%
```

**Design guidelines** :
- **Couleur** : Gradient de gauche (gris) à droite (couleur primaire)
- **Animation** : Transition fluide quand le pourcentage change
- **Label** : Pourcentage ou fraction (5/10), pas les deux
- **Micro-célébration** : Animation spéciale à 25%, 50%, 75%, 100%

### Streak Counter

```
    ┌────────────────────────────┐
    │        🔥 15 jours        │
    │   ●●●●●●●●●●●●●●●○○○○○   │
    │   Prochain milestone: 30  │
    └────────────────────────────┘

    Variations par état :

    🔥 Actif (vert)         — Streak maintenu aujourd'hui
    ⚠️ En danger (ambre)   — Pas encore actif aujourd'hui
    ❄️ Gelé (bleu)         — Streak freeze utilisé
    💔 Perdu (rouge)        — Streak cassé
```

**Design guidelines** :
- **Flamme animée** quand le streak est actif (pulse subtil)
- **Couleur progressive** : plus le streak est long, plus la flamme est intense
- **Historique visuel** : les 7-30 derniers jours en points/cercles
- **Milestone markers** : 7, 30, 100, 365 jours

### Toast / Achievement Notification

```
┌──────────────────────────────────────┐
│ 🏆  Badge débloqué !                │
│                                      │
│     Explorateur curieux              │
│     Tu as lu des articles dans       │
│     5 catégories différentes         │
│                                      │
│     [Voir mes badges]  [✕]           │
└──────────────────────────────────────┘
```

**Positioning** :
- **Desktop** : Coin supérieur droit
- **Mobile** : Haut de l'écran (slide down)
- **Multi-toast** : Stack vertical avec max 3 visibles

**Timing** :
- Apparition : 300ms (slide + fade)
- Durée : 5-8 secondes
- Disparition : 200ms (fade out)

### Leaderboard

```
┌──────────────────────────────────────┐
│  Classement hebdomadaire             │
│                                      │
│  🥇 1. Marie         1,250 XP       │
│  🥈 2. Thomas        1,100 XP       │
│  🥉 3. Sophie        980 XP         │
│     4. Lucas          850 XP         │
│     5. Emma           720 XP         │
│  ─────────────────────────────       │
│  ▶ 12. Vous          340 XP  ⬆+3    │
│  ─────────────────────────────       │
│     13. Hugo          320 XP         │
│     14. Léa           290 XP         │
│                                      │
│  [Cette semaine ▼] [Amis | Global]  │
└──────────────────────────────────────┘
```

**Design guidelines** :
- L'utilisateur doit **toujours se voir** dans le classement (scroll automatique)
- Indicateur de mouvement (⬆+3, ⬇-2, ═)
- Médailles uniquement pour le top 3
- Pas de position après le top 100 (éviter la honte)

---

## 4. Palette de couleurs pour la gamification

### Système de couleurs sémantiques

| Sémantique | Couleur | Hex | Usage |
|---|---|---|---|
| **Succès** | Vert | `#22c55e` | Complétion, streak actif, badge obtenu |
| **Progression** | Bleu/Indigo | `#6366f1` | Barre de progression, XP, niveaux |
| **Avertissement** | Ambre | `#f59e0b` | Streak en danger, proche de la limite |
| **Danger** | Rouge | `#ef4444` | Streak perdu, erreur, échec |
| **Info** | Bleu clair | `#3b82f6` | Information neutre, nouveau contenu |
| **Premium** | Violet | `#8b5cf6` | Contenu premium, récompense rare |
| **Social** | Rose | `#ec4899` | Likes, réactions, social |

### Badges — Système de tiers

| Tier | Couleur | Hex | Rareté |
|---|---|---|---|
| **Bronze** | Bronze | `#CD7F32` | 80% des utilisateurs |
| **Argent** | Argent | `#C0C0C0` | 30% des utilisateurs |
| **Or** | Or | `#FFD700` | 10% des utilisateurs |
| **Diamant** | Cyan/Blanc | `#00D4FF` | 1% des utilisateurs |
| **Légendaire** | Violet + glow | `#9333EA` | 0.1% des utilisateurs |

### Dark mode

| Élément | Light mode | Dark mode |
|---|---|---|
| **Background** | `#ffffff` | `#1a1a2e` |
| **Surface** | `#f9fafb` | `#16213e` |
| **Text primary** | `#111827` | `#e5e7eb` |
| **Text secondary** | `#6b7280` | `#9ca3af` |
| **Badge locked** | `#e5e7eb` | `#374151` |
| **Progress track** | `#e5e7eb` | `#374151` |
| **Progress fill** | `#6366f1` | `#818cf8` |

---

## 5. Typographie de gamification

### Hiérarchie typographique

| Élément | Taille | Poids | Exemple |
|---|---|---|---|
| **Score/Points** | 2-3rem | Bold (700-800) | « 1,250 XP » |
| **Niveau** | 1.5-2rem | Bold (700) | « Niveau 12 » |
| **Badge name** | 1-1.25rem | Semi-bold (600) | « Explorateur » |
| **Badge description** | 0.875rem | Normal (400) | « Lu 10 articles » |
| **Progress label** | 0.75rem | Medium (500) | « 7/10 articles » |
| **Toast message** | 0.875-1rem | Medium (500) | « Badge débloqué ! » |

### Nombres et données

- Utiliser une **police monospace ou tabulaire** pour les nombres qui changent (évite le « jumping »)
- Toujours formater les grands nombres : `1,250` pas `1250`
- Utiliser des abréviations intelligentes : `1.2K` au-delà de 1000

---

## 6. Iconographie

### Icônes standard de gamification

| Concept | Icône recommandée | Alternative |
|---|---|---|
| **Badge** | 🏆 Trophée | ⭐ Étoile, 🎖 Médaille |
| **Streak** | 🔥 Flamme | ⚡ Éclair |
| **Streak perdu** | 💔 Cœur brisé | ❄️ Flocon |
| **Points** | ✨ Étincelles | 💎 Diamant |
| **Level up** | ⬆️ Flèche | 🚀 Fusée |
| **Progression** | 📊 Graphique | 📈 Courbe montante |
| **Verrouillé** | 🔒 Cadenas | |
| **Débloqué** | 🔓 Cadenas ouvert | |
| **Temps** | ⏱ Chronomètre | ⌛ Sablier |
| **Social** | 👥 Groupe | 🤝 Poignée de main |
| **Célébration** | 🎉 Fête | 🎊 Confetti |

### Émojis vs icônes SVG

| Critère | Émojis | Icônes SVG |
|---|---|---|
| **Facilité** | ✅ Aucun asset | ❌ Design nécessaire |
| **Consistance** | ❌ Varie par OS | ✅ Identique partout |
| **Personnalisation** | ❌ Non stylable | ✅ Couleurs, taille |
| **Performance** | ✅ Natif | ✅ Léger en SVG |
| **Recommandation** | Prototypage, MVP | Production |

---

## 7. Sons et haptics

### Design sonore

| Événement | Type de son | Durée | Volume |
|---|---|---|---|
| **XP gagné** | Ding léger, note ascendante | 200ms | Faible |
| **Badge obtenu** | Fanfare courte, accord majeur | 500-800ms | Moyen |
| **Level up** | Mélodie ascendante | 1-2s | Moyen-fort |
| **Streak maintenu** | Son satisfaisant, « swoosh » | 300ms | Faible |
| **Streak perdu** | Note descendante, douce | 400ms | Faible |
| **Erreur** | Son neutre (pas punitif) | 200ms | Très faible |
| **Confetti** | Effet sparkle/twinkle | 1-2s | Faible |

**Principes** :
- **Opt-in uniquement** — Jamais de son par défaut
- **Volume minimal** — Le son ne doit pas surprendre
- **Positif par défaut** — Les sons d'échec doivent être neutres, pas punitifs
- **Pas de musique** — Seulement des effets sonores ponctuels

### Retour haptique (mobile)

| Événement | Type de vibration | Intensité |
|---|---|---|
| **Tap sur un badge** | Tap léger | Light |
| **Badge débloqué** | Notification success | Medium |
| **Level up** | Double tap | Medium |
| **Streak perdu** | Notification warning | Light |

---

## 8. Responsive et mobile-first

### Adaptations mobiles

| Composant | Desktop | Mobile |
|---|---|---|
| **Badge Grid** | 4-6 colonnes | 2-3 colonnes |
| **Leaderboard** | Table complète | Liste simplifiée (nom + score) |
| **Progress Bar** | Linéaire horizontale | Horizontale ou circulaire |
| **Toast** | Coin supérieur droit | Haut de l'écran (full-width) |
| **Dashboard** | Tout visible | Tabs ou scroll vertical |
| **Streak** | Inline avec détails | Compact avec tap-to-expand |

### Touch targets

- **Minimum 44×44px** pour les éléments interactifs (Apple HIG)
- **Espacement de 8px** minimum entre les targets
- **Zone de tap élargie** pour les petits éléments (padding invisible)

---

## 9. Accessibilité (a11y)

### WCAG 2.1 pour la gamification

| Critère | Niveau | Application gamification |
|---|---|---|
| **Contraste** | AA (4.5:1) | Texte des badges, scores, labels |
| **Focus visible** | AA | Navigation clavier dans les grilles de badges |
| **Alt text** | A | Description de chaque badge et icône |
| **Aria-live** | AA | Annoncer les badges débloqués et scores |
| **Motion** | AAA | Respecter prefers-reduced-motion |
| **Color independence** | AA | Pas uniquement la couleur pour l'info (ajouter texte/icône) |

### Patterns d'accessibilité

```html
<!-- Badge débloqué -->
<div
  role="img"
  aria-label="Badge Or : Explorateur — obtenu le 15 mars 2026"
>
  <!-- contenu visuel -->
</div>

<!-- Toast d'achievement -->
<div
  role="alert"
  aria-live="polite"
  aria-atomic="true"
>
  Badge débloqué : Explorateur curieux
</div>

<!-- Barre de progression -->
<div
  role="progressbar"
  aria-valuenow="55"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Progression globale : 55%"
>
  <!-- contenu visuel -->
</div>

<!-- Leaderboard -->
<table role="table" aria-label="Classement hebdomadaire">
  <thead>
    <tr>
      <th scope="col">Position</th>
      <th scope="col">Utilisateur</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <!-- ... -->
</table>
```

### Ne pas dépendre de la couleur seule

```
❌ Mauvais :
  🟢 Streak actif     🔴 Streak perdu
  (seule la couleur diffère)

✅ Bon :
  ✅ Streak actif (15 jours)
  ❌ Streak perdu
  (couleur + icône + texte)
```

---

## 10. Performance et UX technique

### Loading states pour la gamification

```
Chargement du score :      ████░░░░ (skeleton)
Chargement des badges :    ○ ○ ○ ○ (placeholder circles)
Chargement du leaderboard : ▬ ▬ ▬ (skeleton rows)
```

**Principes** :
- Skeleton screens > spinners (l'utilisateur anticipe le contenu)
- Les données de gamification doivent se charger en < 1 seconde
- Offline-first : montrer les données cached même sans réseau
- Optimistic updates : montrer le résultat avant la confirmation serveur

### Offline support

```
Priorité de cache :
1. Badges et progression de l'utilisateur (toujours disponible offline)
2. Streak data (critique — ne pas perdre un streak à cause du réseau)
3. Leaderboard (peut être stale, afficher la dernière version)
4. Contenu social (best-effort)
```

---

## Résumé : checklist UX gamification

| # | Checklist item | Statut |
|---|---|---|
| 1 | Feedback en < 400ms pour toutes les actions | ☐ |
| 2 | Animations proportionnelles à l'importance | ☐ |
| 3 | prefers-reduced-motion respecté | ☐ |
| 4 | Sons en opt-in uniquement | ☐ |
| 5 | Contraste WCAG AA sur tous les textes | ☐ |
| 6 | Aria-live sur les toasts et scores | ☐ |
| 7 | Touch targets ≥ 44x44px sur mobile | ☐ |
| 8 | Skeleton screens pour le chargement | ☐ |
| 9 | Données de streak disponibles offline | ☐ |
| 10 | Dark mode supporté | ☐ |
| 11 | Max 1 animation majeure simultanée | ☐ |
| 12 | Nombres formatés (1,250 pas 1250) | ☐ |

---

## Lectures recommandées

- **Cooper, A.** — *About Face: The Essentials of Interaction Design* (2014)
- **Norman, D.** — *The Design of Everyday Things* (2013)
- **Krug, S.** — *Don't Make Me Think* (2014)
- **Material Design** — Gamification and motion guidelines
- **Apple HIG** — Achievements and notifications
