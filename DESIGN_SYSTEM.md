# SRN — Design System (premium)

## Direction

Confident modern B2B export brand. Obsidian + champagne gold, glass chrome.  
**Custom Motion + CSS effects only — no shadcn primitives.**  
Not purple glow kits. Not cream serif. Not vintage ledger.

## Type (enterprise)

| Role | Family | Use |
|------|--------|-----|
| Display | **Outfit** | Headlines, brand lockups (`.font-display`) |
| UI / body | **IBM Plex Sans** | Nav, copy, forms, admin |
| Specs | **IBM Plex Mono** | HS codes, Incoterms, clocks, references |

Loaded via `next/font/google` with `display: swap`.

## Palette

| Token | Hex | Use |
|-------|-----|-----|
| Obsidian | `#05080C` | hero / footer / nav glass |
| Champagne | `#E8D5A8` / `#F3E6C4` | nav signal / accents |
| Bullion | `#C9A56A` | CTAs |
| Canvas | `#F8F6F1` | page wash |
| Paper | `#FFFFFF` | panels |

## Effects (custom)

- Scroll reveal + stagger (`Reveal`)
- Magnetic CTA (`MagneticLink`)
- Cursor spotlight cards (`SpotlightCard`)
- Client marquee
- Glass fixed nav
- Button shine sweep
- Border beam on brand mark
