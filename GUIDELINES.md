---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "0.1.0"
project: gamification
created: "2026-04-25"
updated: "2026-04-25"
status: draft
source_skill: sf-docs
scope: guidelines
owner: unknown
confidence: low
risk_level: medium
security_impact: unknown
docs_impact: yes
linked_systems: []
depends_on: []
supersedes: []
evidence: []
next_review: "unknown"
next_step: /sf-docs audit GUIDELINES.md
---
# Guidelines — @diane-winflowz/gamification

## Architecture

- **Vue 3.4+** avec Composition API exclusivement
- **Composables pattern** : logique réutilisable extraite dans des `use*` composables
- **Aucune dépendance lourde** : la bibliothèque doit rester légère

## Composants disponibles

| Composant | Description |
|---|---|
| `BadgeCard` | Carte de badge individuelle avec icône, label et état (verrouillé/déverrouillé) |
| `BadgeGrid` | Grille responsive de badges avec filtrage par catégorie |
| `StreakCounter` | Compteur de streak avec animation flamme et historique |
| `ProgressBar` | Barre de progression animée avec gradient et pourcentage |
| `GamificationDashboard` | Dashboard agrégé : badges, streaks, points, niveau |
| `AchievementToast` | Notification toast pour les achievements débloqués |

## API Design

- **Props typées** : chaque composant expose des props TypeScript strictes
- **Events émis** : `@unlock`, `@progress`, `@streak-update`, etc. — documentés par composant
- **Slots** : slots nommés pour personnaliser le rendu (icône, contenu, footer)
- **v-model** : support de `defineModel` (Vue 3.4+) quand pertinent

## Style et thémarisation

- **Agnostique au framework CSS** : pas de dépendance à Tailwind, Bootstrap, etc.
- **Tailwind-compatible** : fonctionne avec Tailwind si le projet parent l'utilise
- **CSS custom properties** pour la thémarisation :
  ```css
  --gamification-primary: #6366f1;
  --gamification-success: #22c55e;
  --gamification-warning: #f59e0b;
  --gamification-badge-bronze: #cd7f32;
  --gamification-badge-silver: #c0c0c0;
  --gamification-badge-gold: #ffd700;
  ```

## Réutilisabilité

- Chaque composant doit fonctionner **indépendamment** — pas de couplage entre composants
- Un projet peut importer uniquement `BadgeCard` sans embarquer le reste
- Tree-shaking supporté via exports nommés

## TypeScript

- Types exportés pour chaque composant et composable
- Interfaces publiques : `Badge`, `Streak`, `Achievement`, `Progress`, `GamificationConfig`
- Generics quand pertinent (ex: `BadgeCard<T extends Badge>`)

## Tests

- **Vitest** + **Vue Test Utils** pour chaque composant
- Couverture minimale : 80% par composant
- Tests unitaires pour les composables
- Tests de snapshot pour le rendu visuel

## Versioning

- **Semantic versioning** (semver) strict
- `CHANGELOG.md` obligatoire, mis à jour à chaque release
- Breaking changes uniquement en version majeure
- Pré-releases via tags npm (`@next`, `@beta`)

## Documentation

- Chaque composant documenté avec :
  - Liste des props (nom, type, défaut, description)
  - Events émis
  - Slots disponibles
  - Exemple d'utilisation minimal
  - Screenshot ou GIF du rendu
