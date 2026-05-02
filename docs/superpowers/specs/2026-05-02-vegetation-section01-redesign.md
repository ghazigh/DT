# Vegetation Page — Section [ 01 ] Redesign

**Date:** 2026-05-02
**Status:** Approved

## Goal

Replace the generic "Three steps, same pipeline" section with a vegetation-specific section that immediately communicates the value of the product to a utility buyer (e.g. Hydro-Québec operations manager).

## Approved Design

### Headline

Problem-led, two lines:

> Trees take down your grid.
> *Most could be prevented.*

Green italic on the second line (chlorophyll accent). Supporting paragraph leads with the 38% stat and closes with the key promise: spans ranked up to 18 months ahead.

### Layout

Two-column headline block (8/4 grid) above a full-width 3-column step panel bordered in `var(--steel)`.

### Step Cards (3 columns, bordered)

Each card: step label → headline → body copy → metric footer (border-top) → **animated SVG visual above or below the text block**.

| Step | Headline | Visual | Metric |
|------|----------|--------|--------|
| 01 | We map every tree near your lines | Satellite scan grid — cells lighting up on a scanline pass | ↳ 98% detection accuracy |
| 02 | AI ranks every span by outage risk | Risk tier bars (T1–T4) animating to height | ↳ Tier-1 spans flagged 18 mo ahead |
| 03 | Crews go to the right span, every time | Work order list sliding in row-by-row (red → amber → green) | ↳ 40% fewer crew-hours wasted |

### Animations

- Pure CSS + inline SVG, no extra dependencies
- All animations respect `prefers-reduced-motion`
- Triggered on scroll via `IntersectionObserver` (same `.reveal` pattern already in the site)

### Copy (body per step)

**01:** Sentinel-2 satellite imagery fused with LiDAR builds a live canopy model of your entire corridor — updated every 6 days, no ground crews required.

**02:** Growth rate, species, encroachment distance, voltage class, and historical storm data — combined into a single risk tier for every span in your network.

**03:** Ranked work orders flow into your existing GIS. Red first, then amber. A full NERC FAC-003 audit trail is generated automatically — no extra paperwork.

## Files Changed

- `src/components/home/HowItWorks.astro` — full rewrite of content and layout
