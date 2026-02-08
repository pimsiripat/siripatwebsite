# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start development server (localhost:3000)
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint checks
```

## Architecture

This is a Next.js 16 portfolio website using the App Router, React 19, TypeScript, and Tailwind CSS v4.

### Routing Structure

- `/` - Home page (Hero, About, Contact sections)
- `/projects` - All projects listing
- `/projects/[slug]` - Individual case study pages (e.g., `/projects/ledger`, `/projects/pawtopia`)

### Key Directories

- `src/app/` - App Router pages and layouts
- `src/components/` - React components (Navbar, Hero, About, Contact, ProjectCard, Footer)
- `src/data/projects.ts` - Static project data with TypeScript `Project` interface
- `public/images/projects/` - Case study images organized by project slug

### Component Patterns

- **Server Components** (default): All page components and most UI components
- **Client Components** ("use client"): Only Navbar.tsx (for mobile menu state)
- Path alias: `@/*` maps to `./src/*`

### Styling

- Tailwind CSS with utility classes (no CSS modules)
- CSS variables defined in `globals.css` for colors: `--background`, `--foreground`, `--primary`, `--muted`, `--subtle`, `--card`, `--accent`
- Fonts: Inter (body via `--font-inter`) and Plus Jakarta Sans (headings via `--font-plus-jakarta`)
- Dark mode CSS variables exist but toggle is not implemented

### Data Flow

Project data is static TypeScript in `src/data/projects.ts`. Each project has: id, title, category, description, image, link, and slug. Case study pages are hardcoded in their respective route files.

### Metadata

SEO metadata is configured in `layout.tsx` (root) and individual page files using Next.js Metadata API with Open Graph and Twitter card support.
