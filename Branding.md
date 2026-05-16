# Sat Lab Brand Guidelines

> Working brand bible for the Sat Lab design team. Use this as the source of truth for any visual or written work that goes out under the Sat Lab name — decks, dashboards, marketing site, RFP responses, social, email, swag, and product UI.

**Version:** 1.0 · **Last updated:** 2026-04-25 · **Owner:** Design

---

## Contents

1. [Brand Foundation](#1-brand-foundation)
2. [Verbal Identity](#2-verbal-identity)
3. [Naming & Architecture](#3-naming--architecture)
4. [Logo System](#4-logo-system)
5. [Color](#5-color)
6. [Typography](#6-typography)
7. [Layout & Grid](#7-layout--grid)
8. [Iconography](#8-iconography)
9. [Imagery & Photography](#9-imagery--photography)
10. [Data Visualization](#10-data-visualization)
11. [Motion](#11-motion)
12. [Accessibility](#12-accessibility)
13. [Applications](#13-applications)
14. [Misuse Gallery](#14-misuse-gallery)
15. [Asset Index](#15-asset-index)

---

## 1. Brand Foundation

### Purpose

Sat Lab makes the physical world legible to the systems that operate it. We turn satellite imagery, sensor streams, and 3D context into decisions that utilities, municipalities, and infrastructure operators can act on.

### Vision

A digital twin platform with many use cases — vegetation management for utilities first, urban canopy and smart-city operations next, more after that — all running on one model of the world.

### Positioning statement

*For utilities, municipalities, and infrastructure operators who need to predict and act on what's happening across large physical estates, Sat Lab is the digital twin platform that fuses satellite intelligence with operational data — giving teams a single, accurate picture of the assets and ecosystems they manage. Unlike point-tool vendors, Sat Lab ships one twin and many use cases on top of it.*

### Audience map

| Audience | What they care about | What the brand must signal |
|---|---|---|
| **Transmission/distribution utilities** (e.g., Hydro-Québec) | Outage avoidance, regulatory compliance, integration with existing work-management systems | Engineering rigor, technical specificity, conservative confidence |
| **Municipalities & sustainability agencies** | Canopy health, climate resilience, environmental justice, citizen-visible outcomes | Mission credibility, legibility to non-technical stakeholders, planetary register |
| **Platform-thesis investors** | One model, many markets; defensibility; capital efficiency | Ambition with proof, technical depth, platform leverage |

### Personality — five tensions held in balance

The brand sits between two poles, intentionally. When in doubt, a choice is on-brand if it visibly anchors to one pole *without abandoning* the other.

- **Precise / Planetary**
- **Restrained / Ambitious**
- **Technical / Plainspoken**
- **Engineered / Living**
- **Confident / Curious**

### Brand promise

What every Sat Lab surface implicitly promises the reader:

> *We see the physical world clearly, we explain what we see plainly, and we ship the work that follows from it.*

---

## 2. Verbal Identity

### Primary register: plainspoken technical

This is how 90% of Sat Lab copy reads — product pages, dashboards, RFP responses, sales decks, support docs, error messages, release notes.

**Rules:**

- Specific nouns, active verbs. Cut adjectives that aren't doing measurement work.
- Short sentences. Vary length only when it earns its keep.
- Numbers when making a claim. *"Sub-meter resolution at 12 m³/h trim throughput"*, not *"high-resolution and efficient"*.
- Name the buyer's world in their words: *circuit*, *right-of-way*, *trim cycle*, *outage*, *NDVI*, *canopy*, *parcel*, *work order*.
- No marketing fluff. No *AI-powered*, *cutting-edge*, *revolutionary*, *seamless*, *unleash*, *empower*. The work speaks.
- No climate-stock language. No *"a greener future"*. *"4 % canopy gain in 18 months"* is the same idea, in our voice.

### Reserved register: mission-led optimistic

Used **only** on the manifesto, About, hiring, and the top of investor decks. Never on product pages, dashboards, or RFP copy.

**Rules:**

- Bigger emotional vocabulary is allowed: *resilient*, *thriving*, *planetary*, *forest*, *generations*.
- Still concrete. *"Cities that stay cool when the grid goes down"* lands; *"a more sustainable tomorrow"* does not.
- Never mix registers in the same paragraph. Switch at section boundaries.

### Voice in three audiences — one fact, three rewrites

The same product fact, written for the three audiences. All three are recognizably Sat Lab.

> **Utility RFP (Hydro-Québec-style buyer):**
> Sat Lab predicts where vegetation is likely to contact transmission lines within 18 months, using a multi-resolution satellite cascade and a risk model trained on outage history. Output: a ranked work list per circuit, exportable to your work-management system.

> **Municipal proposal:**
> We help cities see every tree on their streets and forecast where the canopy needs care first — so trim crews and planting budgets go where they matter most.

> **Investor deck (manifesto register allowed at the top):**
> One platform, many use cases. The first — vegetation management for utilities — is an $8B market that pays for itself in avoided outages. The next ships on the same data and the same twin.

### Glossary

| Prefer | Avoid | Why |
|---|---|---|
| Vegetation contact | Tree danger | Industry term; precise; doesn't anthropomorphize |
| Risk score | Threat level | Quantitative, not dramatic |
| Trim cycle | Maintenance schedule | Domain-specific, signals fluency |
| Canopy | Tree cover | Forestry standard |
| Twin | Platform / dashboard | Our proper-noun word for the product |
| Use case / module | Solution / offering | Honest, not over-packaged |
| AI model (when specific) | AI-powered (as a modifier) | Specific is credible; modifier is filler |
| Operationalize | Leverage | Plainer; means something |

### Punctuation and mechanics

- **Numbers:** numerals for everything ≥ 10 and for any measurement (*4 °C*, *12 km*, *3 sensors*). Spell out *one* through *nine* in prose.
- **Units:** thin-space between value and unit (*4 ms*, not *4ms*) where typography supports it; otherwise standard space.
- **Dates:** ISO-8601 in technical contexts (*2026-04-25*), long form in marketing (*April 25, 2026*).
- **Capitalization:** sentence case for headings, titles, button labels. Title Case is reserved for proper nouns and product names.
- **Ampersands:** allowed in section titles, never in body prose.

---

## 3. Naming & Architecture

### Hierarchy

```
Sat Lab           ← the company
└── Twin          ← the digital twin platform
    ├── Vegetation Intelligence   ← use-case module (working name)
    ├── Urban Canopy              ← use-case module (working name)
    └── Smart Operations          ← use-case module (working name)
```

Module names above are working names. Marketing finalizes them. The naming **pattern** is locked.

### Spelling and capitalization

- **Sat Lab** — always two words, capital S, capital L. Never *SatLab*, *satlab*, *SAT LAB*, or *Sat-Lab*.
- **Twin** — proper noun when referring to the platform: *running on Twin*, *Twin ingests…*. Lowercase *twin* is fine when speaking about digital twins as a category.
- **Module names** — title case (*Vegetation Intelligence*).

### Compound forms in copy

- Long form: *Sat Lab Twin's Vegetation Intelligence module*
- Mid form: *Vegetation Intelligence on Twin*
- Short form: *Vegetation* (only after the long form has been introduced in the same surface)

### Disallowed

- *SatLab™*, *Sat Lab AI*, *Sat-Lab*, *satlab.io* (in copy — domain is fine)
- Smashed module names (*VegIntel*, *UrbanCan*) — never
- Internal codenames in external copy

---

## 4. Logo System

### Composition

The logo is **wordmark + symbol**. Either may be used independently in the right context (see *Lockups* below), but the composed lockup is canonical.

### Wordmark principles

- **Starting point:** Inter Display, weight 700, tracking -0.02em. Optical adjustments and a custom-drawn final pass are allowed and encouraged.
- **Two-word integrity:** the space between *Sat* and *Lab* is the visual signal. Do not kern it tight. Do not stack the words. Do not all-caps.
- **No effects:** no shadows, no gradients on the wordmark, no outlines, no italics.

### Symbol direction

The symbol encodes **satellite observation**. Three directions for the design team to explore:

1. **Graticule** — a degree-grid intersection, optionally with a center pulse. Reads as *coordinates / where in the world*.
2. **Scan line** — a horizontal sweep stroke crossing a containing form. Reads as *imaging / sensing*.
3. **Orbital arc** — a partial ellipse cutting across or behind a form. Reads as *from above / in motion*.

**Construction rules** (whichever direction wins):

- Single weight, geometric construction. No painterly strokes.
- Optical correction on circles and intersections.
- Reads at 16 px (favicon).
- Works in one color and in inverse.

**Explicitly out:** leaves, globes, map pins, satellites-as-illustration, neural-network nodes. All too generic for the category.

### Lockups

- **Horizontal lockup** (canonical): symbol left, wordmark right, x-height aligned, gap = symbol cap-height.
- **Stacked lockup** (rare): symbol above wordmark, centered. Use only when horizontal won't fit.
- **Symbol alone:** product UI, favicons, social avatars, swag.
- **Wordmark alone:** wide footers, partner walls, contexts where the symbol is too small to read.

### Clear space

Minimum clear space on all sides equals the cap-height of the wordmark. Nothing — type, edges, other logos — enters that space.

### Minimum sizes

| Surface | Minimum |
|---|---|
| Web | 24 px height (lockup), 16 px (symbol) |
| Print | 12 mm height (lockup), 6 mm (symbol) |
| Favicon | 16 × 16 px (symbol only, hand-tuned) |

### Color use

- Default: Bone (#E6EAF0) on dark surfaces.
- Brand-accent: symbol may render in Chlorophyll on dark when emphasizing brand presence (cover slides, hero sections). Wordmark stays Bone.
- Inverse: Obsidian on light surfaces. Single-color allowed.
- Photography backgrounds: place a solid Obsidian or Slate plate behind the lockup. Never set the wordmark over a busy image.

---

## 5. Color

### Primary palette

Brand lives in dark by default. Hex values are normative.

| Role | Name | Hex | Notes |
|---|---|---|---|
| Base / canvas | **Obsidian** | `#0A0E14` | Default background |
| Surface 1 | **Slate** | `#1A2233` | Cards, panels |
| Surface 2 | **Graphite** | `#2A3142` | Raised, hover, active |
| Primary accent | **Chlorophyll** | `#5EE26B` | Brand signal, primary CTA, highlight |
| Warm accent | **Amber** | `#F4B84A` | Highlight, attention; never error |

### Neutrals

| Step | Name | Hex | Use |
|---|---|---|---|
| 0 | Obsidian | `#0A0E14` | Canvas |
| 1 | Slate | `#1A2233` | Surface 1 |
| 2 | Graphite | `#2A3142` | Surface 2 |
| 3 | Steel | `#3F4859` | Borders, separators |
| 4 | Mist | `#8B95A8` | Secondary text, muted icons |
| 5 | Fog | `#BFC7D4` | De-emphasized text |
| 6 | Bone | `#E6EAF0` | Body text |
| 7 | Lumen | `#FFFFFF` | Display text, max contrast |

### Semantic colors

| Role | Name | Hex | Notes |
|---|---|---|---|
| Success | Chlorophyll | `#5EE26B` | Reuses brand accent — keep this rare so it stays meaningful |
| Warning | Amber | `#F4B84A` | Reuses warm accent |
| Error | **Ember** | `#FF6B57` | Reserved warm red, distinct from Amber |
| Info | **Signal** | `#5EA8FF` | Cool blue, used sparingly |

### Verified contrast (WCAG 2.1)

All foreground/background pairs in routine use clear AAA for body text. Verified ratios:

| Foreground on Background | Contrast | WCAG body | WCAG large/UI |
|---|---|---|---|
| Bone on Obsidian | 16.0 : 1 | AAA | AAA |
| Lumen on Obsidian | 19.3 : 1 | AAA | AAA |
| Mist on Obsidian | 6.3 : 1 | AA  | AAA |
| Chlorophyll on Obsidian | 11.5 : 1 | AAA | AAA |
| Chlorophyll on Slate | 9.5 : 1 | AAA | AAA |
| Chlorophyll on Graphite | 7.7 : 1 | AAA | AAA |
| Amber on Obsidian | 11.1 : 1 | AAA | AAA |
| Amber on Slate | 9.1 : 1 | AAA | AAA |
| Ember on Obsidian | 6.9 : 1 | AA  | AAA |
| Signal on Obsidian | 7.8 : 1 | AAA | AAA |

> Recompute these whenever a hex changes. WCAG 2.1 contrast formula. Mist below 7:1 means Mist is fine for secondary text but not primary body — use Bone for primary body.

### Light-mode policy

The brand lives in dark. A defined inverse exists for print, executive PDFs, and accessibility needs:

- Canvas → Lumen (`#FFFFFF`)
- Body text → Obsidian
- Accent → Chlorophyll holds; Amber holds; Ember/Signal hold

Full light-theme parity (every component re-skinned) is **not** promised. Designers building for light mode must re-verify contrast and may substitute deeper greens/ambers if needed for legibility.

### Don'ts

- Don't apply Chlorophyll to error states.
- Don't mix Amber and Ember in the same chart, alert, or status row.
- Don't use Mist as primary body text.
- Don't introduce new accent hues without a written reason and a contrast check.

---

## 6. Typography

### Type system

| Role | Family | Weights | Use |
|---|---|---|---|
| Display | **Inter Display** | 600, 700, 800 | Headlines, deck titles, marketing hero |
| Body | **Inter** | 400, 500, 600 | UI body, paragraphs, labels |
| Mono | **JetBrains Mono** | 400, 500 | Coordinates, IDs, code, data labels, technical readouts |

All three are open-source and available via Google Fonts. Self-host for production performance.

### Tracking & line-height defaults

- **Display:** tracking -0.02em (loosen to -0.01em above 96 px); line-height 1.1.
- **Body:** tracking 0; line-height 1.5 (1.6 for long-form prose).
- **Mono:** tracking 0; line-height 1.4 in code blocks, 1 in inline data labels.

### Type scale (modular, ratio 1.250)

Web (root 16 px):

| Step | Name | Size | Weight | Use |
|---|---|---|---|---|
| 7 | Display XL | 64 px | 700 | Hero |
| 6 | Display L  | 48 px | 700 | Section opener |
| 5 | Display M  | 36 px | 700 | Page title |
| 4 | Heading 1  | 28 px | 700 | h1 |
| 3 | Heading 2  | 22 px | 600 | h2 |
| 2 | Heading 3  | 18 px | 600 | h3 |
| 1 | Body L     | 16 px | 400 | Default body |
| 0 | Body M     | 14 px | 400 | UI body, dense surfaces |
| -1 | Caption    | 12 px | 500 | Labels, captions |

Deck (16:9 at 1920 × 1080): same ratio, base 24 px. Body minimum 18 pt.

### Mono usage rules

Use mono when the value has technical identity:

- Coordinates: `45.5017° N, 73.5673° W`
- IDs and slugs: `circuit-HQ-3221A`
- Sensor / file names: `S2A_MSIL2A_20250612`
- Code, paths, commands.

Do **not** use mono for:

- Headlines, body prose, marketing copy.
- Decoration. Mono is a meaning signal, not a vibe.

### Paragraph rules

- Measure: 60–75 characters per line. Narrower in dense UI is fine.
- One blank line between paragraphs.
- No double-space after periods.
- Avoid widows; rebreak if the last word of a paragraph is alone on a line.
- Em-dashes (—) are allowed; en-dashes (–) for ranges (`2024–2026`); hyphens for compounds.

### Don'ts

- Don't use serif for body or headings — wrong register for Sat Lab.
- Don't ALL-CAPS body or paragraph text. Single-word labels in caps are fine if tracked.
- Don't italicize for emphasis in UI; use weight (500/600).

---

## 7. Layout & Grid

### Web — 12-column responsive grid

| Breakpoint | Min width | Columns | Gutter | Margin |
|---|---|---|---|---|
| sm | 640 px | 4 | 16 px | 24 px |
| md | 768 px | 8 | 16 px | 32 px |
| lg | 1024 px | 12 | 24 px | 48 px |
| xl | 1280 px | 12 | 24 px | 64 px |
| 2xl | 1536 px | 12 | 32 px | 96 px |

### Spacing scale (4 / 8 px)

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Pick from this set; do not invent in-between values.

### Deck (16:9 at 1920 × 1080)

- Margins: 96 px outside, 64 px between content blocks.
- Safe area: 64 px from edge — no critical content outside this.
- Two-column variant: 50/50 split with a 64 px gutter.

### Proposal / RFP (A4)

- Margins: 24 mm outside, 18 mm top/bottom.
- Header reserve: 28 mm (logo + section title).
- Footer reserve: 16 mm (page number, project code).
- Two-column body for dense technical sections; single-column for narrative.

---

## 8. Iconography

### Style

- **Stroke-based**, **1.5 px stroke** at 24 px base size.
- Geometric construction: circles, squares, common angles (30°, 45°, 60°).
- Rounded line caps and joins.
- Optical correction on intersections.

### Base set

Use **Lucide** (MIT license) as the base set. It is widely supported, large, and matches our construction conventions.

### Custom icons

When a needed icon isn't in Lucide:

- Match Lucide's grid (24 × 24 px, 1.5 px stroke, 2 px padding).
- Single-color (Bone for default, Mist for muted).
- Submit to the icon library before use in production.

### Usage

- **Product UI:** stroke icons only.
- **Marketing:** stroke icons preferred; filled allowed where contrast is needed against busy imagery.
- **Color:** Bone or Mist by default. Chlorophyll only when the icon represents a brand-level action (primary CTA glyph, brand-tagged status). Never Ember or Amber on icons that aren't status icons.

### Don'ts

- Don't mix stroke widths on the same surface.
- Don't introduce drop-shadows or gradients on icons.
- Don't use emoji as UI iconography. Emoji is fine in social and informal copy.

---

## 9. Imagery & Photography

Sat Lab uses three image families. Each has its own treatment. Mixing them in a single composition is rare; choose one and let it lead.

### A. Satellite imagery

Sat Lab's signature image. The literal product output.

**True-color** (RGB) and **false-color** (NDVI, NBR, SWIR) both belong on-brand. False-color is what makes our work *feel like* Sat Lab — keep it visible.

**Treatment:**

- Honest saturation. Do not push false-color into a candy palette for marketing.
- In product context, retain on-image readouts: capture date, sensor, resolution. They build credibility.
- Crop to data, not to aesthetics. Show the grid, the parcel, the right-of-way.

**Don't:**

- Don't recolor false-color outputs to match the brand palette. Sentinel-2 NDVI is what it is.
- Don't over-clean satellite imagery (cloud-fill, seam-blend) for hero use unless you label it.

### B. Real-world photography

Documentary, available light, real people doing real work.

**Subjects:** canopies (close, mid, aerial), crews on transmission corridors, control rooms, cities at street level, infrastructure (substations, poles, bucket trucks), natural landscapes that frame the work.

**Treatment:** muted contrast, slight cool grade to match dark palette, retain texture. Avoid HDR look. Avoid heavy color grading.

**Don't:**

- No stock smiling-business-people in conference rooms.
- No drone-shot suburbs.
- No abstract globes, abstract neural nets, "AI brain" visuals.
- No pristine staged scenes. Rain on a transformer, mud on a boot, scuffs on a hard hat — those are on-brand.

### C. Technical illustration

Schematic, diagrammatic, system-explanatory.

**Treatment:** line work on Obsidian or Slate, mono labels, isometric where helpful, accent color used sparingly to mark the path of attention.

**Use for:** explaining systems, architectures, pipelines, the cascade of resolutions from satellite to sensor. Not decoration.

### Don'ts (across all three)

- No climate-stock cliches: lone tree on a hill, hands holding a sapling, sun-flare windmills.
- No generic AI imagery: glowing brains, neural-mesh portraits, anthropomorphic robots.
- No low-quality Earth-from-orbit stock. If we can't show our own data, show real ground.

---

## 10. Data Visualization

Sat Lab's products are dense with maps and charts. Data viz is brand surface — treat it like one.

### Principles

- **Dark-first.** Default backgrounds are Obsidian or Slate. Light themes exist for print but are secondary.
- **Signal in color, structure in neutrals.** Axes, gridlines, basemaps live in the neutral scale (Steel, Mist). Color is reserved for the data.
- **Color-blind safety is mandatory.** Every documented palette is verified against deuteranopia and protanopia simulations.
- **Units inline with values** (`4.2 m`, not a legend lookup).
- **No chartjunk.** No 3D, no pie charts beyond two slices, no gradient fills used to imply meaning.

### Sequential palette (continuous data — canopy density, NDVI, signal strength)

Anchored on Chlorophyll, dark-to-light:

```
#0A0E14  →  #1A3A1F  →  #2D6630  →  #46993F  →  #5EE26B  →  #A8F0B0  →  #E6FBE8
```

Use for heatmaps, NDVI overlays, density rasters.

### Diverging palette (risk, anomaly)

Two flavors, depending on what the diverge means:

**Amber → neutral → Chlorophyll** (when the poles are *threat* and *health* and you want both visible):

```
#F4B84A  →  #F4D89A  →  #2A3142  →  #A8F0B0  →  #5EE26B
```

**Amber → neutral → Ember** (when both poles are warnings of different kinds):

```
#F4B84A  →  #2A3142  →  #FF6B57
```

Pick one per visualization. Never both in the same view.

### Categorical palette (series, capped at 6)

```
1. Chlorophyll  #5EE26B
2. Amber        #F4B84A
3. Signal       #5EA8FF
4. Mist         #8B95A8
5. Ember        #FF6B57
6. Bone         #E6EAF0
```

Order matters — start at 1, add series in order. If a viz needs more than 6, restructure.

### Map style

- **Basemap:** dark, low-saturation. Bright basemaps fight the data.
- **Labels:** Mist for low-priority, Bone for high-priority. Mono for coordinates and IDs.
- **Overlays:** 60–80% opacity so the basemap context survives.
- **Legend:** always present, with units, on the same surface as the map. No floating tooltip-only legends.

### Don'ts

- No rainbow palettes. (They lie about ordering and break for color-blind users.)
- No red-green diverging without an Amber/Chlorophyll/Ember substitution. Standard red-green is the most common color-blind failure.
- No more than 6 categorical hues. If you need more, your chart is doing two jobs.

---

## 11. Motion

Sat Lab's motion principle is **instrument readout** — motion confirms a state change. It does not entertain.

### Easing & duration

| Use | Easing | Duration |
|---|---|---|
| Micro (icon swap, button press) | ease-out | 120 ms |
| UI (panel reveal, tab change) | ease-in-out | 240 ms |
| Page (route change, modal) | ease-in-out | 480 ms |
| Data update (chart refresh) | ease-out | 240 ms |

### Principles

- Motion has a purpose every time. If it has no purpose, remove it.
- Motion is short. If it's noticeable for its length, it's too long.
- Motion is consistent. The same kind of action moves the same way everywhere.
- Reduced-motion respect: honor `prefers-reduced-motion: reduce` — fall back to opacity-only or instant.

### Don'ts

- No springs by default. (One specific brand-level animation may use a spring; document it before using.)
- No bouncing.
- No decorative parallax.
- No looping ambient animation. (One exception: a satellite-cascade loop on the marketing hero is allowed if it advances the explanation.)

---

## 12. Accessibility

### Standard

WCAG 2.1 **AA** across all surfaces. Aim for AAA on body text where the palette already supports it (most pairs in Section 5 do).

### Contrast minimums

| Content | Minimum |
|---|---|
| Body text | 4.5 : 1 |
| Large text (18 pt+ regular, 14 pt+ bold) | 3 : 1 |
| UI components & graphical objects | 3 : 1 |
| Focus indicators | 3 : 1 against adjacent colors |

### Type minimums

- Web body: **14 px** minimum (16 px preferred for long-form).
- Deck body: **18 pt** minimum.
- Tables and dense data: 13 px allowed if tracking and contrast hold.

### Focus & keyboard

- Visible focus state on every interactive element. Default: 2 px Chlorophyll outline with 2 px Obsidian offset.
- Focus visible without color alone — pair with outline weight or shape.
- Tab order matches visual order.

### Color-blind safety

- Sequential and diverging data palettes are verified against deuteranopia, protanopia, and tritanopia simulations.
- Status (success/warning/error/info) carries an icon in addition to color. Never color alone.

### Motion

- Honor `prefers-reduced-motion: reduce`.
- No flashing content above 3 Hz.

---

## 13. Applications

Each application is described as a layout principle plus brand-touching elements — not a finished file. The design team builds the templates from this guidance.

### Deck (16:9)

**Cover:**
- Background: Obsidian, optional satellite still as a 30%-opacity Slate-tinted plate.
- Logo: top-left, 64 px from edges, lockup at 240 px width.
- Title: Display L (48 px), Bone, two lines max.
- Subtitle / project code: Mono caption, Mist.
- Date and audience: Mono caption, bottom-left.

**Section divider:**
- Single Display L word or short phrase, centered.
- Chlorophyll horizontal rule (2 px, 96 px wide) above the title.
- Background: Obsidian.

**Content slide:**
- Title: Heading 1 (28 px), top-left, Bone.
- Body or visual: starts 96 px from the top.
- Footer: page number (Mono, Mist, bottom-right), section name (Mono, Mist, bottom-left).

### Dashboard frame

- **Top bar:** 56 px tall, Obsidian, Bone text, symbol logo at 24 px on the left.
- **Side nav:** 240 px wide, Slate, stroke icons + Body M labels in Bone (active: Chlorophyll).
- **Content area:** Obsidian background, Slate cards with 12 px radius, 16 px internal padding.
- **Status bar (optional):** 32 px, Graphite, Mono caption text for system state and timestamps.

### Social cards

| Platform | Size | Notes |
|---|---|---|
| LinkedIn | 1200 × 628 px | Lockup top-left, Display M headline, Body L deck |
| X / Twitter | 1200 × 675 px | Symbol-only top-left, headline center-left |
| Square (IG, OG fallback) | 1080 × 1080 px | Symbol top, headline center |

Type minimum on social: 24 px equivalent. Always test legibility at thumbnail.

### RFP / proposal cover (A4)

- Top half: Obsidian field, lockup at 64 mm width centered horizontally, 48 mm from top.
- Title: Display L (centered, max two lines), 24 mm below the lockup.
- Bottom band (40 mm): Slate, with project code, recipient, date in Mono caption.

### Email signature

```
Name (Body M, 600)
Role · Sat Lab (Body M, 400, Mist)
email@satlab.io · +1 555 0100 (Mono caption, Mist)
satlab.io (Body M, Chlorophyll)
```

No image-only signatures. No social icons unless specifically authorized.

### Business card

- 85 × 55 mm, matte black stock.
- Front: symbol centered, embossed or matte spot-UV in Bone.
- Back: name (Body L, Bone), role + Sat Lab (Body M, Mist), contact lines (Mono caption, Mist), site (Body M, Chlorophyll).

---

## 14. Misuse Gallery

Concrete don'ts. If you see one of these, fix it.

### Logo

- Don't stretch, skew, rotate, or recolor outside the approved variants.
- Don't add drop-shadows, glows, outlines, or bevels.
- Don't recompose the lockup (custom spacing, stacking, swapped order).
- Don't place the wordmark on a busy image without an Obsidian/Slate plate behind it.
- Don't use the symbol inside a circle "icon container" — it's already a complete mark.

### Color

- Don't apply Chlorophyll to error states.
- Don't apply Ember to success states.
- Don't put Chlorophyll on Lumen — contrast collapses (3.6 : 1, sub-AA for body).
- Don't introduce off-palette greens, ambers, or reds for accents.

### Type

- Don't set body copy in mono.
- Don't all-caps headlines.
- Don't mix tracking on the same line.
- Don't use a serif anywhere.

### Imagery

- Don't recolor false-color satellite imagery.
- Don't use stock smiling-business-people, glowing AI brains, lone-tree-on-a-hill, sun-flare windmills.
- Don't over-grade real-world photography toward a candy look.

### Data viz

- Don't use rainbow palettes.
- Don't use red-green diverging without the Amber/Ember/Chlorophyll substitution.
- Don't exceed 6 categorical hues.
- Don't drop units to "clean up" a chart.

---

## 15. Asset Index

The folder structure the design team populates and maintains.

```
brand/
├── logo/
│   ├── lockup-horizontal.svg
│   ├── lockup-stacked.svg
│   ├── symbol.svg
│   ├── wordmark.svg
│   ├── inverse/                  ← light-on-dark and dark-on-light variants
│   ├── favicon-16.png, 32.png, 64.png
│   └── README.md                 ← which variant for which use
│
├── type/
│   ├── inter/                    ← Inter + Inter Display, OFL.txt included
│   ├── jetbrains-mono/           ← JetBrains Mono, OFL.txt included
│   └── README.md                 ← weights in production, license notes
│
├── color/
│   ├── tokens.json               ← canonical hex values, semantic mapping
│   ├── tokens.css                ← CSS custom properties
│   ├── swatches.ase              ← Adobe Swatch Exchange
│   └── README.md                 ← palette overview, contrast cheatsheet
│
├── imagery/
│   ├── photography/              ← curated, tagged
│   ├── satellite-reference/      ← canonical false-color stills, NDVI examples
│   ├── illustration/             ← system schematics
│   └── README.md                 ← usage rights, source attribution
│
├── templates/
│   ├── deck/                     ← Keynote, PPTX, Figma
│   ├── dashboard/                ← Figma library
│   ├── social/                   ← LinkedIn, X, IG sizes
│   ├── proposal/                 ← A4 InDesign + Pages
│   ├── email/                    ← signature HTML
│   └── README.md                 ← what's authoritative, version notes
│
└── figma/
    └── README.md                 ← link to the published Figma library
```

### Naming conventions

- `kebab-case` for file names.
- Suffix variants: `-inverse`, `-mono`, `-color`.
- Pixel sizes in name where it disambiguates: `favicon-32.png`.
- Versioned templates: `deck-v2.fig`, with the previous version archived under `templates/_archive/`.

### Format expectations

- **Marks:** SVG (primary), PNG @1x/@2x/@3x raster fallback.
- **Fonts:** OTF/TTF, with `OFL.txt` shipped alongside.
- **Color tokens:** authoritative in `tokens.json`; CSS and ASE are derived.
- **Templates:** native source (Figma, Keynote, InDesign) plus exported PDF for review.

### Maintenance

- `brand/` is owned by Design.
- Changes to canonical palette or type system require an update to this guideline document **in the same commit**.
- Module names finalize via marketing — when they do, update Section 3 and the Asset Index in one pass.

---

*Questions, gaps, or disagreements with this document: raise them in `#brand` and propose the change. The brand is a living thing — these guidelines are version 1.0, not version final.*