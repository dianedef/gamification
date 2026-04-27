---
artifact: content_map
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "gamification"
created: "2026-04-26"
updated: "2026-04-27"
status: active
source_skill: sf-docs
scope: content-map
owner: diane-winflowz
confidence: medium
risk_level: medium
content_surfaces:
  - readme
  - api_docs
  - component_docs
  - type_reference
  - package_registry
  - changelog
  - business_contracts
security_impact: none
docs_impact: yes
evidence:
  - "README.md defines public install and usage contract."
  - "docs/README.md, docs/composables.md, docs/components.md, docs/types.md cover API surfaces."
  - "src/index.ts exports package API and composable/component surface."
  - "package.json defines publish metadata and distribution entrypoints."
  - "BUSINESS.md and BRANDING.md describe project positioning."
linked_artifacts: []
depends_on:
  - artifact: "PRODUCT.md"
    artifact_version: "1.0.0"
    required_status: "active"
  - artifact: "GTM.md"
    artifact_version: "1.0.0"
    required_status: "active"
  - artifact: "BUSINESS.md"
    artifact_version: "1.0.0"
    required_status: "active"
  - artifact: "BRANDING.md"
    artifact_version: "1.0.0"
    required_status: "active"
supersedes: []
next_review: "2026-07-26"
next_step: "/sf-repurpose"
---

# Content Map

## Purpose

`CONTENT_MAP.md` defines where `gamification` content lives and how repurposed work should be routed. It is the source-of-truth map for documentation, API references, and distribution-facing claims.

## Content Surfaces

| Surface | Canonical path | Purpose | Format | Source of truth | Update when |
|---|---|---|---|---|---|
| README | `README.md` | Consumer entrypoint, install, and quick usage | Markdown | `src/index.ts`, `package.json` | API exports or install contract changes |
| API docs hub | `docs/README.md` | Quick orientation + links to API docs | Markdown | Feature surface in `src/` and docs updates | API or composable behavior changes |
| Composables reference | `docs/composables.md` | Detailed composable usage | Markdown | `src/composables/*.ts` | Composable signature or behavior changes |
| Components reference | `docs/components.md` | Component props/events/slots and semantics | Markdown | `src/components/*.vue` | Component prop/event/slotted contract changes |
| Types reference | `docs/types.md` | Public TypeScript contract for library users | Markdown | `src/types/index.ts` | Public types evolve |
| Registry/package surface | `package.json`, npm | Publish config, versioning, and compatibility | JSON/Registry metadata | `package.json` | Dependency or compatibility changes |
| Positioning docs | `BUSINESS.md`, `BRANDING.md`, `GTM.md` | Audience, tone, and offer boundaries | Markdown | Marketing/positioning decisions | Positioning or audience shifts |
| Product contract | `PRODUCT.md` | Feature scope and behavior promise for consumers | Markdown | `src` + docs | Product scope or API contract changes |
| Changelog | `CHANGELOG.md` | Release-visible changes and evolution | Markdown | git history and release policy | Release and behavioral changes |

## Semantic Architecture

| Cluster | Pillar page | Supporting pages | Target intent | Internal link rule | Status |
|---|---|---|---|---|---|
| Gamification primitives | `docs/composables.md` | `docs/types.md` | Explain state primitives and composable contracts | Link from API docs to each related component/type page | live |
| Display layer | `docs/components.md` | `docs/README.md` | Explain renderless component behavior and slot customization | `docs/README.md` links to component and composable docs | live |
| Distribution model | `README.md` | `package.json`, `CHANGELOG.md` | Explain install, setup, and package expectations | Keep README and changelog aligned with publish metadata | live |

## Page Roles

| Page type | Job | Must include | Must not include |
|---|---|---|---|
| Library README | Publish install and value proposition | Setup, example, supported use cases, limitations | Deep type-by-type API detail |
| Composable doc | Explain behavior contract | Inputs, outputs, state, edge cases | UI styling guidance |
| Component doc | Explain render model and slots | Props, events, accessibility notes, usage examples | Implementation internals |
| Type doc | Define public contracts | Exported types and compatibility expectations | Internal implementation detail |
| Product contract | Keep public scope truthful | Scope, in/out, risks, evidence | Unproven growth claims |

## Repurposing Rules

- Library code changes should first update `docs/composables.md`, `docs/components.md`, and `docs/types.md`.
- API or signature changes in `src/` must update README and corresponding docs before release.
- Any scope/positioning change should update `PRODUCT.md`, `GTM.md`, `BUSINESS.md`, `BRANDING.md` together.
- Changelog entries should match user-visible behavior changes before publish.

## Cross-Surface Update Rules

| Trigger | Update these surfaces |
|---|---|
| New composable or export | `README.md`, `docs/composables.md`, `docs/types.md`, `src/index.ts` |
| New component surface | `docs/components.md`, `src/index.ts`, demo examples in `docs/README.md` |
| Type export changes | `docs/types.md`, `docs/composables.md`, TypeScript source files |
| Packaging updates | `package.json`, `README.md`, `CHANGELOG.md` |
| Positioning update | `PRODUCT.md`, `GTM.md`, `BRANDING.md`, `BUSINESS.md` |

## Open Gaps

- No Storybook/Histoire playground exists yet; add `playground` surface if one is introduced.
- No dedicated migration guide for storage key/version changes in consumers.
- No dedicated changelog policy page; keep this as `CHANGELOG.md`.
