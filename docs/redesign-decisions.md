# Redesign Decisions — April 2026

## Design Direction: Editorial Refined

Typography-driven, warm neutrals, no gimmicks. Let the work and typography do the heavy lifting.

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FAFAF7` | Warm off-white background |
| `--fg` | `#1C1C1C` | Near-black text |
| `--muted` | `#71706E` | Secondary text |
| `--accent` | `#D4593C` | Burnt sienna — warm, editorial accent |
| `--accent-light` | `#F0DDD5` | Pale accent for subtle highlights |
| `--surface` | `#F0EDEA` | Light warm gray for alternate sections |
| `--border` | `#E0DCD7` | Warm light gray borders |

**Why this palette:** The previous pink/cream/sage green (`#FFCFCF`/`#FFFDEC`/`#86A788`) was the default AI "friendly designer" palette. The new palette is intentionally warm but sophisticated — the burnt sienna accent adds personality without being gimmicky.

---

## Typography

| Role | Font | Source |
|------|------|--------|
| Headings | Instrument Serif (400) | Google Fonts |
| Body | DM Sans | Google Fonts |

**Why these fonts:** Instrument Serif gives an editorial/magazine feel that's distinctive but not trendy. DM Sans is clean and modern without being generic (replacing Inter). The serif/sans pairing creates clear hierarchy.

**Previous:** Inter (body) + Google Sans (headings, local files)

---

## Components Changed

### Hero
- **Removed:** Morphing blobs, floating gradient blobs, typing animation, emoji placeholder, "Available for work" pill badge
- **Added:** Clean typographic hero with one strong headline, subtitle with name, two CTAs (filled + text link)
- **Headline:** "I design products people actually want to use." — specific, confident, not flowery

### Navbar
- **Removed:** SVG circle logo, green pill "Hire Me" button, green hover underlines
- **Added:** Text logo (`Pim.`), clean text links, outline "Get in Touch" button, scroll-triggered border
- **Reordered:** Work first (most important for portfolio visitors)

### Project Cards
- **Removed:** Rounded-[28px] candy shapes, green category badges, `project-card-interactive` class
- **Added:** Numbered cards (`01`, `02`), accent category label, arrow icon, subtle image scale on hover

### Featured Projects
- **Removed:** "Projects I'm Proud Of" heading, "See More Projects" button, decorative copy
- **Added:** Clean "Recent Projects" heading with project count, wider grid gaps

### About
- **Removed:** Emoji (`🌱`), pill tags (Empathy-Driven, etc.), green gradient "My Goal" card, quote box
- **Added:** Two-column layout, capabilities as bordered list rows with hover arrows, bordered goal card

### Process
- **Removed:** Emoji circles (`🔍 💡 ✏️ 🚀`), connecting gradient line, hover scale effects
- **Added:** Numbered steps (`01`-`04`), top border separators, clean grid layout

### Contact
- **Removed:** Emoji (`✉️ 💼`), rounded-[28px] pink cards, green hover backgrounds
- **Added:** SVG icons, bordered cards with hover border change

### Footer
- **Removed:** Dark background, "Designed with ♥ by", emoji heart
- **Added:** Simple bordered top, two-column flex with copyright and location

### Removed Entirely
- `CustomCursor.tsx` — dot-and-ring cursor, `cursor: none` on body
- `ScrollThread.tsx` — decorative shrinking line on right side
- 4 placeholder projects (Finance App Redesign, E-Commerce Platform, Healthcare Dashboard, Travel Booking App)
- All blob/morph CSS animations
- All emoji used as design elements

---

## Research Insights Applied

From UX portfolio trends research (2026):

1. **Less is more** — Generous whitespace, clean typography, subtle animations. Applied across all components.
2. **Only real work** — Removed 4 fake projects. 2 real case studies > 6 with 4 fakes.
3. **Subtle interactions** — Hover states on capability list, project card image scale, nav border on scroll. No gimmicks.
4. **Code proficiency signal** — Custom-built Next.js site itself demonstrates technical ability.
5. **Typography as identity** — Instrument Serif gives the site a distinctive editorial character.

### Inspiration References
- [Bestfolios](https://www.bestfolios.com/) — curated UX portfolio showcase
- [Awwwards UI Design](https://www.awwwards.com/websites/ui-design/) — award-winning designs
- [Case Study Club](https://www.casestudy.club/journal/ux-designer-portfolio) — top 20 UX portfolio breakdowns
- [Designlab - 10 UX/UI Design Portfolio Examples](https://designlab.com/blog/10-ux-ui-design-portfolios)
- [Cieden - Top 5 Creative UX Portfolio Websites](https://cieden.com/ux-designer-portfolio-websites)
- [Colorlib - Portfolio Design Trends 2026](https://colorlib.com/wp/portfolio-design-trends/)
- [EverydayUX - What a UX Portfolio Looks Like in 2026](https://www.everydayux.net/ux-portfolios-2026/)

---

## Still TODO (Requires Pim's Input)
- Add a real professional photo to the hero or about section
- Personalize copy — write in your own voice about what makes you unique
- Consider a more distinctive color accent if burnt sienna doesn't feel right
- Add measurable outcomes/metrics to case studies (e.g., "reduced drop-off by X%")
