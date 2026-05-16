# Sat Lab Landing Page

Static Astro site for satlab.io. Companion to the Sat Lab product documentation and MVP code in the parent repository.

Live preview: https://ghazigh.github.io/DT/

## Stack

- Astro 4 (hybrid output, Cloudflare adapter)
- Tailwind CSS + self-hosted Inter / Inter Tight / Fraunces / JetBrains Mono via @fontsource
- React islands: `MapTeaser`, `ContactForm`
- MDX content collections for product pages
- Cloudflare Pages + Pages Functions (form handling)
- Vitest (unit) + Playwright (e2e)

## Dev

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # hybrid build -> dist/ (+ _worker.js for Pages Functions)
npm run preview    # preview the build (limited: @astrojs/cloudflare adapter)
npm test           # vitest unit tests (validation schema)
npm run test:e2e   # Playwright e2e (spawns `npm run dev` automatically)
npm run lint       # astro check + tsc --noEmit
```

## Environment variables

Copy `.env.example` to `.env.local`:

| Var | Purpose |
|---|---|
| `PILOT_WEBHOOK_URL` | Where `/api/pilot-request` forwards submissions. Empty = log to console. |
| `PUBLIC_ANALYTICS_DOMAIN` | Plausible domain. Empty = analytics disabled. |

## Deploying to Cloudflare Pages

1. Push to a git remote.
2. Cloudflare Pages → Create Project → Connect repository.
3. Build command: `cd landing_page && npm install && npm run build`
4. Build output directory: `landing_page/dist`
5. Environment variables (production): set `PILOT_WEBHOOK_URL` as a secret.
6. First deploy should succeed. Visit the assigned `*.pages.dev` URL.

## Content conventions

- All numbers on the site must cite their source (PRD line, Applications doc, or tag `modeled`).
- Never claim unshipped features as live — the roadmap section is the credibility load-bearing piece.

## Project structure

- `src/pages/` — routes (home, about, contact, vegetation, platform, urban-canopy, api/pilot-request)
- `src/components/layout/` — shared shell (Layout, Nav, Footer, SEO)
- `src/components/ui/` — 11 design-system primitives
- `src/components/home/` — home-page sections (Hero, ProblemBand, Wedge, Platform, Portfolio, HowItWorks, Proof, DualPath, Roadmap, TeamBand, FAQ, FooterCTA)
- `src/components/interactive/` — React islands (MapTeaser, ContactForm)
- `src/content/products/` — MDX for each product page
- `src/lib/` — seo + validation + analytics helpers
- `public/` — favicon, OG image, robots.txt, sample risk GeoJSON
- `tests/unit/` — vitest unit tests
- `tests/e2e/` — Playwright smoke + a11y tests
