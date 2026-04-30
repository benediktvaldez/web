# benedikt.valdez.is - Claude Instructions

## Project Overview

Personal website and living resume for Benedikt Valdez. Bilingual (English + Icelandic) with translated URL slugs.

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **CSS Modules** for styling (no Tailwind, no SCSS)
- **Phosphor Icons** (`@phosphor-icons/react`) with `Icon` suffix imports
- **MDX** for blog posts via `@next/mdx`
- **Vitest** for unit tests, **Playwright** + **@axe-core/playwright** for e2e and accessibility
- Deployed on **Vercel** via GitHub Actions

## Coding Conventions

- Use `@/*` import alias for src-relative imports
- CSS Modules for all component styling, `globals.css` for site-wide variables and resets
- Server Components by default; `"use client"` only when interactivity is needed
- No inline styles
- No em dashes anywhere in content
- All user-facing text must be in both `en.ts` and `is.ts` dictionaries
- Phosphor icons: use `Icon` suffix (e.g. `GithubLogoIcon`), `weight="regular"` for most, `aria-hidden` on decorative icons, `aria-label` on icon-only links
- SSR icon imports (`@phosphor-icons/react/dist/ssr`) for Server Components, regular imports for Client Components

## Commits

Use **Conventional Commits**: `<type>(<scope>): <description>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`

## i18n Architecture

- All pages under `src/app/[locale]/`
- English routes are canonical; Icelandic uses translated slugs (`/is/hver-eg-er`, `/is/verkefni`, etc.)
- `src/proxy.ts` handles slug rewriting and locale detection
- Slug mappings in `src/i18n/config.ts`
- UI strings in `src/i18n/dictionaries/{en,is}.ts`
- Content data in `src/content/{en,is}/`

## Gradient System

Per-page oklch gradients using CSS custom properties:

- `--gradient-hue`, `--gradient-lightness`, `--gradient-chroma`, `--gradient-chroma-dark`
- Set locally on each page's gradient element
- The home page gradient (`oklch(51.18% 0.201 28.28)`) is the signature element and must not be modified without explicit approval

## Testing

- `npm run test` - Vitest watch mode with coverage UI
- `npm run test:ci` - Vitest single run with coverage
- `npm run test:e2e` - Playwright (routes, a11y, navigation, metadata, print)
- All pages must pass axe-core accessibility scans
- Content data validated for completeness across both locales

## Branching & Deployment

- `next` branch for development (deploys preview on push)
- `main` for production (deploys only via GitHub Releases)
- CI must pass before any deploy (lint, unit tests, build, e2e)
