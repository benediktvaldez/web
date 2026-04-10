# valdez.is

Personal website and living resume for Benedikt D. Valdez.

## Tech stack

- Next.js 16 (App Router)
- React 19, TypeScript
- CSS Modules
- Phosphor Icons
- MDX for blog posts
- Bilingual: English + Icelandic

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm run test        # Vitest (watch + UI + coverage)
npm run test:ci     # Vitest (single run + coverage)
npm run test:e2e    # Playwright (routes, a11y, navigation)
```

## Deployment

Pushes to `next` deploy a preview. Pushes to `main` deploy production. CI (lint, test, build, e2e) must pass before deploy.
