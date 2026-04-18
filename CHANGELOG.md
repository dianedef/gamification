# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased] — 2026-03-23

### Added
- **Audit gamification Quit Coke** — analyse Octalysis complète (score 65→278/800 projeté)
- **Recovery score** — nouveau système de niveaux basé sur la guérison réelle (jours clean ×1, cravings résistés ×2, triggers identifiés ×3, stratégies créées ×5, articles ×1) remplace le comptage d'articles (qui était hardcodé à 0)
- **Niveaux renommés** — Curieux → Combattant → Résilient → Déterminé → Libéré (alignés sur le parcours de récupération)
- **Badge unlock toast** — notification célébratoire SnackBar quand un badge est gagné, avec persistence des badges reconnus (SharedPreferences)
- **Recovery insights widget** — insights data-driven sur l'écran Today : tendance cravings, meilleur outil toolkit, compteur de résistance, taux clean, trigger principal — chaque insight connecté à la neuroscience
- **Streak freezes connectés** — gain automatique (1 freeze/14 jours clean, max 3), consommation auto quand un jour manqué casserait le streak, affichage ❄️ dans le header Today
- **Quêtes hebdomadaires** — 3 défis par semaine auto-générés (déterministes par semaine), adaptés à la phase de scaffolding (intensive/progressive/autonomous), progression live depuis les providers existants, écran dédié + widget compact sur Today, 6 templates (clean days, cravings résistés, journal, toolkit, check-ins, intentions matin)
- **Rétrospective mensuelle** — résumé "Spotify Wrapped" de guérison (stats 30j, zone actuelle, meilleur outil, citation du journal de fierté, message pont vie réelle), affiché une fois/mois, dismissable
- **Journal d'impact** — prompt hebdomadaire "Qu'est-ce que ta guérison a changé cette semaine dans ta vie ?", 5 questions rotatives, entrées persistées, message de confirmation ("Ces réflexions valent plus que 1000 badges")
- **Mode zen vérifié** — 14 points de contrôle zen mode ajoutés sur 10 fichiers : badge toast, insights, variable reward, social proof, community pulse, quests, scaffolding message, graduation, streak recovery, weekly retrospective, streak chip, stats row
- **Notifications locales adaptatives** — le NotificationService s'adapte à la phase de scaffolding (intensive: 5 notifs, progressive: 4, autonomous: 2), 2 nouvelles notifications (quêtes lundi 10h, journal d'impact dimanche 18h), reschedule automatique au changement de phase via ref.listen dans app.dart, zéro Firebase

### Fixed
- **toolsCreated hardcodé à 0** — le badge Stratège ("Crée 3 stratégies personnelles") peut maintenant être gagné, connecté au toolkitProvider
- **totalRead hardcodé à 0** — le système de niveaux fonctionnait avec une valeur fixe, remplacé par le recovery score dynamique
- **Import inutilisé** supprimé (scaffolding_provider dans today_screen)

---

## [0.1.0] — 2026-03-21

### Added
- Knowledge base gamification : 22 articles (~14K lignes, ~600Ko)
  - 01→16 : neurosciences, psychologie, frameworks, mécaniques, design, UX, métriques, études de cas, éthique, implémentation, IA, glossaire, copywriting, ressources, casino/jeux mobiles, techniques avancées
  - 17→21 : dimension humaine — utilisateur-personne, alignement purpose, désir vs besoin, responsabilité service, après-app
- Composables enrichis : useStreak (freeze, milestones, status), useBadges (tiers, near-miss)
- Nouveaux composables : useLevel (XP/niveaux), useQuests (quêtes multi-types), useDailyRewards (cycle 7j)
- Skill audit gamification ShipFlow (Octalysis scoring, 28 mécaniques, éthique)
- MCP visuels installés : antvis/mcp-server-chart + Kroki
