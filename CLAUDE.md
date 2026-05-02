# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev      # Start development server (localhost:4321)
bun run build    # Build for production
bun run preview  # Preview production build
```

## Architecture

This is an Astro 5 portfolio website with static output, TypeScript, and Tailwind CSS v4.

### Routing Structure

- `/` - Home page (Hero, About, Contact sections)
- `/projects` - All projects listing
- `/projects/[slug]` - Individual case study pages (e.g., `/projects/ledger`, `/projects/pawtopia`)

### Key Directories

- `src/pages/` - Astro pages (file-based routing)
- `src/layouts/` - Base layout with head, fonts, SEO meta
- `src/components/` - Astro components + Navbar.tsx (React island)
- `src/components/mdx/` - MDX custom components (Callout, Finding, StatsGrid, etc.)
- `src/content/projects/` - MDX case study files with frontmatter
- `src/content.config.ts` - Content collection schema
- `src/styles/globals.css` - Tailwind theme and CSS variables
- `public/images/projects/` - Case study images organized by project slug

### Component Patterns

- **Astro components** (default): All page and UI components are `.astro` files (zero JS)
- **React island**: Only `Navbar.tsx` (for mobile menu state), loaded with `client:load`
- `Logo.tsx` stays as React because Navbar imports it

### Styling

- Tailwind CSS v4 with utility classes
- CSS variables defined in `globals.css` for colors: `--bg`, `--fg`, `--muted`, `--accent`, `--accent-light`, `--surface`, `--border`
- Fonts: DM Sans (body) and Noto Sans (headings) loaded via Google Fonts `<link>` tags

### Data Flow

Project data comes from MDX content collections in `src/content/projects/`. Each MDX file has typed frontmatter: title, description, category, heroImage, image, meta. Queried with `getCollection('projects')`.

### Metadata

SEO metadata is configured in `Base.astro` layout. Pages pass title/description as props to override defaults. Open Graph and Twitter card meta tags included.
