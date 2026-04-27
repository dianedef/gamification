# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

`@diane-winflowz/gamification` is a Vue 3 component and composable library for reusable gamification primitives (badges, streaks, progression, rewards, and feedback).

## Tech Stack

- Vue 3.4+ with Composition API
- TypeScript
- Vite library build
- vue-tsc declarations
- canvas-confetti

## Common Commands

- `npm install` — install dependencies
- `npm run build` — build distribution bundle + `.d.ts` declarations
- `npm run dev` — run Vite build watch mode

## Structure Notes

- `src/index.ts`: public exports
- `src/components/*`: component primitives
- `src/composables/*`: shared gamification state logic
- `src/types/*`: public types
- `src/utils/*`: helpers like confetti and storage adapters
- `site/`: public demo/site build artifacts

## Environment Variables

- No required runtime variables are used by the library code.
- If you run the demo/site locally, define custom `VITE_` variables there only if your local workflow requires them.
- Keep secrets out of this repo.

## Practical Guidance

- Preserve exported API stability in `src/index.ts` when editing components/composables.
- Keep CSS custom properties and defaults predictable for consumer theming.
- Respect existing naming and keep generated outputs backward-compatible when possible.
- Prefer composition patterns and typed options/returns on new composables.
