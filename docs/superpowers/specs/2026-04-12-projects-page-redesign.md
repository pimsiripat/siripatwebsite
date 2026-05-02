# Projects Page Redesign

## Summary

Redesign both the projects listing page (`/projects`) and case study detail pages (`/projects/[slug]`) with a clean minimal aesthetic inspired by [nicolearoberts.com](https://www.nicolearoberts.com/case-studies/empowering-item-discovery-with-gen-ai-summaries). Simplify the MDX component system from ~16 components to 6.

## Projects Listing Page (`/projects`)

### Layout: Alternating Image-Text Rows

Each project is a full-width row with the image and text side-by-side:

- **Odd projects** (1st, 3rd, ...): image left, text right
- **Even projects** (2nd, 4th, ...): text left, image right
- Thin divider (`border-bottom`) between projects
- On mobile (<768px): stack vertically, image on top

### Row Content

- Project image: `flex: 1.3`, `border-radius: 16px`, `aspect-ratio` preserved
- Text side: `flex: 1`
  - Category label: uppercase, accent color, small tracking
  - Title: serif heading, ~24px
  - Description: muted color, 14px, 1.7 line-height
  - CTA: "View Project →" as underlined text link (not a button)

### Page Header

- Label: "Selected Work" — uppercase, accent, letter-spacing
- Title: "Projects" — serif, large
- Subtitle: "Case studies and design explorations." — muted

## Case Study Detail Page (`/projects/[slug]`)

### Hero Section

- Category label: uppercase, accent color
- Title: serif heading, large (~32px)
- Description: muted, 15px
- Metadata: inline row with dot separators (e.g., "**Role** · UI/UX Design · **Timeline** · Aug – Oct 2025")
- Separated by `border-top` and `border-bottom`

### Hero Image

- Full-width (max-w-5xl), rounded corners (16px)
- Below the metadata row

### Content Layout

- Narrow column (`max-w-3xl`) for text content
- Wide (`max-w-5xl`) for images — images break out of the text column
- Thin dividers between major sections (replacing alternating background colors)
- No alternating `bg="card"` sections — single consistent background

### Bottom Navigation

- Simple "← Back to All Projects" text link at bottom
- Separated by a top border

## Simplified MDX Components

### Removed Components

| Component | Replacement |
|-----------|-------------|
| `Section` | Removed — content sections handled by `article` with prose-like auto-spacing |
| `Narrow` | Removed — default content width is narrow |
| `Wide` | Removed — `ProjectImage` already renders at wide width |
| `Column` | Removed — use `TwoCol` children directly |
| `PainPoint` | Merged into `Finding` (same visual treatment) |
| `AccessibilityGrid` + `AccessibilityItem` | Standard markdown list (h3 + bullet points) |
| `NextSteps` + `Step` | Standard markdown ordered list |
| `ImpactList` + `ImpactItem` | Standard markdown bullet list |

### Kept Components (6 total)

1. **`Callout`** — accent-bordered box for key insights. Left border accent, light accent background.

2. **`Finding`** — left accent border with title + description. Used for usability findings and pain points.

3. **`StatsGrid`** — grid of label/value cards (e.g., study type, participants). Surface background, rounded corners.

4. **`TwoCol`** — two-column grid for side-by-side content (e.g., Problem/Goal). Accepts two children, stacks on mobile.

5. **`FigmaLink`** — external link with arrow icon for Figma prototypes.

6. **`ProjectImage`** — full-width image with rounded corners. Breaks out of the narrow text column to `max-w-5xl`.

### MDX Override Styles

Standard markdown elements styled via component overrides:

- `h2`: serif, 24px, bold. Has top margin + thin divider above (acts as section separator)
- `h3`: serif, 18px, bold
- `p`: muted color, 15px, relaxed line-height
- `img`: full-width, rounded corners (same as ProjectImage for inline markdown images)
- `ul`/`ol`: muted color, proper spacing
- `strong`: fg color (stands out from muted paragraphs)
- `hr`: thin accent-tinted divider

## MDX File Changes

Both `ledger.mdx` and `pawtopia.mdx` need updating:

- Remove all `<Section>`, `<Narrow>`, `<Wide>` wrappers
- Replace `<PainPoint>` with `<Finding>`
- Replace `<AccessibilityGrid>`/`<AccessibilityItem>` with standard markdown (h3 + list)
- Replace `<NextSteps>`/`<Step>` with ordered list
- Replace `<ImpactList>`/`<ImpactItem>` with unordered list
- Replace `<TwoColumn><Column>` with `<TwoCol>`
- Keep `<Callout>`, `<Finding>`, `<StatsGrid>`, `<FigmaLink>`, `<ProjectImage>` as-is

## Design Tokens

Using existing CSS variables — no new tokens needed:

- `--bg` (#FAFAF7) — page background
- `--fg` (#1C1C1C) — headings, strong text
- `--muted` (#71706E) — body text
- `--accent` (#D4593C) — labels, borders, callout accents
- `--surface` (#F0EDEA) — stats cards background
- `--border` (#E0DCD7) — dividers

## Files to Modify

- `src/app/projects/page.tsx` — new alternating row layout
- `src/app/projects/[slug]/page.tsx` — new hero/metadata layout, content wrapper
- `src/components/mdx/index.tsx` — simplified components + new markdown overrides
- `src/components/ProjectCard.tsx` — replace with `ProjectRow` component or inline
- `src/content/projects/ledger.mdx` — remove wrapper components
- `src/content/projects/pawtopia.mdx` — remove wrapper components

## Mobile Behavior

- Projects listing: rows stack vertically (image on top, text below)
- Case study metadata: wraps to 2 lines on small screens
- Content stays single-column, images go full-width
- All existing responsive patterns preserved
