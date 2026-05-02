# Next.js to Astro Migration — Design Spec

## Goal

Migrate the portfolio site from Next.js 16 (Turbopack) to Astro with Vite, eliminating dev server instability while preserving the exact same visual design. Fix known overflow bugs during migration.

## Motivation

Next.js dev server (both Turbopack and webpack) crashes repeatedly under Node.js v25.6.0 / Bun due to SST file corruption and cache errors. Production builds work fine but the dev experience is broken. Astro uses Vite, which is stable and fast.

## Approach

In-place migration in the same repo. Replace Next.js with Astro, convert React components to `.astro` files, keep Navbar as a React island (only interactive component). Reuse all existing Tailwind CSS, MDX content, and images.

## Architecture

- **Framework**: Astro (static output)
- **Build tool**: Vite (built into Astro)
- **Runtime**: Bun (install + dev/build)
- **Styling**: Tailwind CSS v4 via `@astrojs/tailwind`
- **MDX**: `@astrojs/mdx` (built-in content collections)
- **React**: `@astrojs/react` (Navbar island only)
- **Output**: Pure static HTML, zero JS except Navbar

## File Structure

```
src/
  layouts/
    Base.astro              # root layout (html, head, fonts, meta)
  pages/
    index.astro             # home page
    projects/
      index.astro           # projects listing
      [slug].astro          # case study detail
    404.astro               # not found page
  components/
    Navbar.tsx              # React island (client:load)
    Logo.tsx                # React (imported by Navbar)
    Hero.astro
    About.astro
    FeaturedProjects.astro
    Process.astro
    Contact.astro
    Footer.astro
    ProjectCard.astro       # alternating row layout
    ScrollReveal.astro      # CSS-only animation
    CustomCursor.astro      # CSS-only cursor
    mdx/
      Callout.astro
      Finding.astro
      StatsGrid.astro
      TwoCol.astro
      FigmaLink.astro
      ProjectImage.astro
  content/
    projects/
      ledger.mdx            # unchanged
      pawtopia.mdx           # unchanged
  content.config.ts         # content collection schema
  styles/
    globals.css             # same CSS variables + Tailwind
```

## Content Collections

Replace manual `gray-matter` + `fs.readFileSync` with Astro's typed content collections.

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    heroImage: z.string(),
    image: z.string(),
    meta: z.record(z.string()),
  }),
});

export const collections = { projects };
```

This replaces both `src/data/projects.ts` and `src/lib/mdx.ts`.

Each MDX file's frontmatter gains an `image` field (listing page thumbnail), currently stored in `src/data/projects.ts`.

## Component Migration

### Static components (React → Astro)

All components except Navbar/Logo convert from `.tsx` to `.astro`:
- Remove React imports, hooks, JSX syntax
- Convert to Astro template syntax (HTML with `{}` expressions)
- Props via `Astro.props` instead of function parameters
- `className` → `class`
- `next/link` `<Link>` → `<a>` tags
- `next/image` `<Image>` → Astro `<Image>` or `<img>`
- Conditional classes stay the same (template expressions)

### Interactive component (React island)

Navbar stays as `.tsx`:
- Remove `next/link` → use `<a>` tags
- Remove `next/image` if used
- Used in layouts with `client:load` directive
- Logo.tsx stays as React (imported by Navbar)

### MDX components

Convert from React (`.tsx`) to Astro (`.astro`):
- `Callout`, `Finding`, `StatsGrid`, `TwoCol`, `FigmaLink`, `ProjectImage`
- All get `max-w-3xl mx-auto` (fixes overflow bug)
- Markdown overrides (h2, h3, p, ul, ol, etc.) defined in Astro MDX config

## Pages

### Home (`/`)
Same structure: Navbar, Hero, FeaturedProjects, About, Process, Contact, Footer. All wrapped in Base layout.

### Projects listing (`/projects`)
Query content collection, render ProjectCard rows with alternating layout. Same design.

### Case study (`/projects/[slug]`)
Dynamic route using `getStaticPaths()`. Render MDX with custom components. Same hero, metadata row, article, back link.

### 404
Static page with correct color tokens.

## SEO / Metadata

`Base.astro` layout handles:
- `<html lang="en">`, `<head>` with charset, viewport
- Google Fonts (DM Sans, Noto Sans) via `<link>` tags
- Open Graph and Twitter card meta tags
- Pages pass title/description as props to override defaults

## Fonts

- Body: DM Sans (loaded via Google Fonts `<link>` tags in Base.astro)
- Headings: Noto Sans (same)
- CSS variables: `--font-dm-sans`, `--font-noto-sans`
- Applied via globals.css (unchanged)

## Styling

- Tailwind CSS v4 with `@astrojs/tailwind`
- Same CSS variables in globals.css: `--bg`, `--fg`, `--muted`, `--accent`, `--accent-light`, `--surface`, `--border`
- Same `@theme inline` block
- `className` → `class` in Astro templates

## Bug Fixes Included

1. All MDX custom components get `max-w-3xl mx-auto` (horizontal overflow fix)
2. Article wrapper gets `overflow-x-hidden`
3. Not-found page uses correct color tokens

## Files to Remove

- `next.config.ts`
- `src/app/` (entire directory)
- `src/lib/mdx.ts`
- `src/data/projects.ts`
- `src/components/mdx/index.tsx` (replaced by `.astro` versions)
- `.next/` (build cache)
- `postcss.config.mjs` (if exists, Astro handles PostCSS)

## Dependencies

### Add
- `astro`
- `@astrojs/react`
- `@astrojs/mdx`
- `@astrojs/tailwind`
- `react` (keep, for Navbar island)
- `react-dom` (keep)

### Remove
- `next`
- `next-mdx-remote`
- `gray-matter`
- `remark-gfm` (Astro MDX handles this)
- `eslint-config-next`
- `@tailwindcss/postcss` (Astro integrates Tailwind directly)

## Scripts

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview"
}
```
