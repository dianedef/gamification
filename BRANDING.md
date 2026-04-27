---
artifact: brand_context
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: gamification
created: "2026-04-25"
updated: "2026-04-26"
status: active
source_skill: sf-docs
scope: brand
owner: diane-winflowz
confidence: medium
risk_level: low
security_impact: low
docs_impact: yes
brand_voice: unknown
trust_posture: unknown
depends_on: []
supersedes: []
evidence: []
next_review: "2026-07-26"
next_step: /sf-docs audit BRANDING.md
---
# Branding — @diane-winflowz/gamification

## Identité

- **Nom** : `@diane-winflowz/gamification`
- **Tagline** : "Ajoute du jeu à tes apps"

## Identité visuelle

Cohérente avec l'écosystème WinFlowz (rainbow spectrum). La bibliothèque s'intègre visuellement dans n'importe quel projet grâce à la thémarisation par CSS custom properties.

## Composants visuels

### Badges

- Forme ronde avec icône centrale + label en dessous
- 3 tiers visuels distincts :
  - **Bronze** (`#CD7F32`) — achievements de base
  - **Argent** (`#C0C0C0`) — achievements intermédiaires
  - **Or** (`#FFD700`) — achievements avancés
- État verrouillé : grisé, icône de cadenas, opacité réduite

### Streaks

- Compteur numérique proéminent
- Icône flamme animée (pulse quand le streak est actif)
- Couleur qui s'intensifie avec la durée du streak
- Indicateur "jour actuel" (complété / en attente)

### Progress bars

- Gradient animé (direction gauche-droite)
- Pourcentage affiché (intérieur ou extérieur selon la taille)
- Micro-animation au chargement et à chaque mise à jour
- Variantes : linéaire, circulaire

### Toasts (AchievementToast)

- Slide-in depuis le haut ou le coin
- Confetti optionnel à l'apparition
- Icône du badge débloqué + message de félicitation
- Auto-dismiss configurable (durée par défaut : 5 secondes)

## Palette

La palette est entièrement configurable via CSS custom properties. Valeurs par défaut :

| Variable | Valeur par défaut | Utilisation |
|---|---|---|
| `--gamification-primary` | `#6366f1` (indigo) | Éléments principaux |
| `--gamification-success` | `#22c55e` (vert) | Streak actif, complétion |
| `--gamification-warning` | `#f59e0b` (ambre) | Streak en danger, alertes |
| `--gamification-danger` | `#ef4444` (rouge) | Streak perdu |
| `--gamification-badge-bronze` | `#CD7F32` | Tier bronze |
| `--gamification-badge-silver` | `#C0C0C0` | Tier argent |
| `--gamification-badge-gold` | `#FFD700` | Tier or |

## Animations

- **Bounce** : badge débloqué, rebond satisfaisant
- **Scale** : progression qui atteint 100%, agrandissement momentané
- **Confetti** : achievement majeur, optionnel et configurable
- **Glow** : halo lumineux sur les éléments actifs (streak, badge récent)
- **Shake** : avertissement de streak en danger
- Toutes les animations respectent `prefers-reduced-motion`

## Documentation visuelle

- README avec screenshots de chaque composant dans ses différents états
- GIFs animés pour les interactions (unlock, progression, toast)
- Playground interactif (Storybook ou Histoire) pour tester les composants

## Valeurs de marque

| Valeur | Ce que cela signifie pour la lib |
|---|---|
| Fun | Les composants doivent donner envie d'interagir |
| Engagement | Chaque mécanique vise à créer une habitude positive |
| Progression | L'utilisateur doit toujours voir où il en est et ce qu'il reste |
| Récompense | Chaque accomplissement est célébré visuellement |
