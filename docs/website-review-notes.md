# Website Review Notes — April 2026

## Problem: Site looks like "AI slop"

The current design has multiple markers of AI-generated portfolio templates, reducing credibility and personality.

---

## AI Slop Red Flags Identified

### 1. Emoji overuse as design elements
- Hero: `🌿` as profile photo placeholder
- About: `🌱` as decorative element
- Process: `🔍 💡 ✏️ 🚀` for each step
- Contact: `✉️ 💼` for cards
- Footer: `♥`
- **Fix:** Use custom SVG icons or remove entirely. Real designer portfolios never use emoji as primary visuals.

### 2. Generic, flowery copy
- "experiences that feel like a warm hug"
- "crafting intuitive flows" / "designing with empathy" / "making users smile"
- "Let's create something beautiful together"
- "Designed with ♥ by..."
- **Fix:** Write in your actual voice. Be specific about what you care about and what makes you different.

### 3. Morphing blob + floating gradient blobs
- Morphing blob shape where photo should be + 3 floating gradient blobs in hero background
- Very recognizable AI-generated portfolio pattern
- **Fix:** Use a real photo of yourself. Remove or simplify background decorations.

### 4. Custom cursor (dot + ring)
- `cursor: none` on body replaces system cursor with custom dot-and-ring
- Hurts usability — users expect their system cursor
- Well-known "made with AI" signal
- **Fix:** Remove custom cursor entirely.

### 5. Color palette is "safe cute" default
- `--cream: #FFFDEC` + `--pink-light: #FFE2E2` + `--pink-soft: #FFCFCF` + `--green: #86A788`
- Pink/cream/sage green = default AI palette for "friendly designer"
- Doesn't feel intentional or personal
- **Fix:** Pick a palette that reflects you, not a template.

### 6. Typing animation in hero
- Typewriter effect cycling through generic phrases is an AI portfolio cliche
- **Fix:** One strong, specific headline instead.

### 7. Process section = Discover/Define/Design/Deliver
- Literally the Double Diamond with generic descriptions
- Every AI-generated UX portfolio has this exact section
- **Fix:** Make it unique to your actual workflow, or remove it.

### 8. No real photo, no personality
- Hero has a blob with name + emoji instead of an actual photo
- Makes the whole site feel like a template
- **Fix:** Add a real professional photo.

### 9. Placeholder projects
- 4 of 6 projects are fakes with `#` links (Finance App Redesign, E-Commerce Platform, Healthcare Dashboard, Travel Booking App)
- Destroys credibility instantly
- **Fix:** Remove them. 2 real projects > 6 where 4 are fake.

### 10. ScrollThread component
- Thin line on right side that shrinks on scroll
- Adds no value
- **Fix:** Remove it.

---

## Summary: What Needs to Change

| Area | Current | Recommended |
|------|---------|-------------|
| Emojis | Used as primary design elements | Custom SVG icons or none |
| Copy | Generic AI phrases | Specific, personal voice |
| Hero visual | Morphing blob placeholder | Real photo |
| Cursor | Custom dot+ring, `cursor:none` | System default |
| Color palette | Pink/cream/green template | Intentional, personal palette |
| Hero animation | Typewriter cycling phrases | Single strong headline |
| Process section | Generic Double Diamond | Unique or removed |
| Projects | 4 fake + 2 real | Only real projects |
| ScrollThread | Decorative line | Remove |

## Core Issue

Nothing on this site tells visitors who Pim specifically is. It could be any junior UX designer's AI-generated portfolio. The best portfolios have a clear point of view, real photos, specific language, and let the work speak.

---

## Research Insights (from UX portfolio trends 2026)

- **Less is more:** Generous white space, clean typography, subtle animations
- **Strong case study storytelling:** Show process, not just final screens — problem > research > wireframes > iterations > measurable results
- **Show AI proficiency:** Mention AI tools you use in your design process
- **Tie design to business outcomes:** Include metrics, before/after comparisons
- **Code proficiency as differentiator:** Make it visible that you built a custom Next.js site

### Inspiration references
- [Bestfolios](https://www.bestfolios.com/) — curated UX portfolio showcase
- [Awwwards UI Design](https://www.awwwards.com/websites/ui-design/) — award-winning designs
- [Case Study Club](https://www.casestudy.club/journal/ux-designer-portfolio) — top 20 UX portfolio breakdowns
