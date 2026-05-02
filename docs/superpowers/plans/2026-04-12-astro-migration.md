# Next.js to Astro Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Next.js with Astro to eliminate dev server instability while preserving the exact same visual design.

**Architecture:** Astro with static output, Vite dev server, Tailwind CSS v4, MDX via @astrojs/mdx content collections. React integration only for the Navbar island. All other components are zero-JS .astro files.

**Tech Stack:** Astro 5, @astrojs/react, @astrojs/mdx, @astrojs/tailwind, Tailwind CSS v4, Bun

---

### Task 1: Swap dependencies and config files

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Create: `src/content.config.ts`
- Delete: `next.config.ts`
- Delete: `next-env.d.ts`
- Delete: `postcss.config.mjs`
- Delete: `eslint.config.mjs`
- Modify: `tsconfig.json`

- [ ] **Step 1: Replace package.json**

Replace the entire contents of `package.json` with:

```json
{
  "name": "siripatwebsite",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.10.0",
    "@astrojs/mdx": "^4.3.0",
    "@astrojs/react": "^4.3.0",
    "@astrojs/tailwind": "^6.0.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwindcss": "^4"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create astro.config.mjs**

Create `astro.config.mjs` in the project root:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    mdx(),
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'static',
});
```

- [ ] **Step 3: Create content collection config**

Create `src/content.config.ts`:

```ts
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

- [ ] **Step 4: Replace tsconfig.json**

Replace `tsconfig.json` with:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

- [ ] **Step 5: Delete old Next.js config files**

```bash
rm next.config.ts next-env.d.ts postcss.config.mjs eslint.config.mjs
```

- [ ] **Step 6: Move globals.css**

```bash
mkdir -p src/styles
mv src/app/globals.css src/styles/globals.css
```

- [ ] **Step 7: Add image field to MDX frontmatter**

Add `image` field to `src/content/projects/ledger.mdx` frontmatter (after `heroImage`):

```yaml
image: "/images/projects/ledger/mockup_5.png"
```

Add `image` field to `src/content/projects/pawtopia.mdx` frontmatter (after `heroImage`):

```yaml
image: "/images/projects/pawtopia/iPhone_16_Pro.png"
```

- [ ] **Step 8: Install dependencies**

```bash
rm -rf node_modules .next bun.lockb package-lock.json
bun install
```

- [ ] **Step 9: Verify installation**

```bash
bunx astro --version
```

Expected: Astro version printed (e.g., `astro@5.x.x`)

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: swap Next.js for Astro dependencies and config"
```

---

### Task 2: Create Base layout

**Files:**
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Create the layout file**

Create `src/layouts/Base.astro`:

```astro
---
interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}

const {
  title = "Siripat | UX/UI Designer",
  description = "UX/UI Designer crafting intuitive digital experiences. View my portfolio and case studies.",
  ogImage = "/images/projects/ledger/mockup_5.png",
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site ?? "https://localhost:4321");
---

<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />

    <!-- SEO -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="UX designer, UI designer, portfolio, product design, user experience" />
    <meta name="author" content="Siripat" />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content={ogImage} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
  </head>
  <body class="antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Update globals.css for Astro font loading**

Replace the font references in `src/styles/globals.css`. Since Astro loads fonts via `<link>` tags (not Next.js font loader), update the CSS to reference font families directly:

```css
@import "tailwindcss";

:root {
  --bg: #FAFAF7;
  --fg: #1C1C1C;
  --muted: #71706E;
  --accent: #D4593C;
  --accent-light: #F0DDD5;
  --surface: #F0EDEA;
  --border: #E0DCD7;
}

@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-accent-light: var(--accent-light);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --font-sans: "DM Sans", system-ui, sans-serif;
  --font-heading: "Noto Sans", system-ui, sans-serif;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: "DM Sans", system-ui, sans-serif;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Noto Sans", system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

::selection {
  background-color: var(--accent);
  color: white;
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Fade-up animation */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Subtle line reveal */
@keyframes lineGrow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Restore cursor on mobile / touch devices */
@media (pointer: coarse) {
  body { cursor: auto; }
}

/* MDX article prose styles */
article.mdx-content > h2 {
  max-width: 48rem;
  margin: 4rem auto 2rem;
  padding-top: 4rem;
  border-top: 1px solid var(--border);
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Noto Sans", system-ui, sans-serif;
  color: var(--fg);
}

article.mdx-content > h2:first-child {
  border-top: none;
  padding-top: 0;
}

article.mdx-content > h3 {
  max-width: 48rem;
  margin: 0 auto;
  font-size: 1.125rem;
  font-weight: 700;
  font-family: "Noto Sans", system-ui, sans-serif;
  color: var(--fg);
  margin-bottom: 1rem;
}

article.mdx-content > p {
  max-width: 48rem;
  margin: 0 auto 1.5rem;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.625;
}

article.mdx-content > p:last-child {
  margin-bottom: 0;
}

article.mdx-content > ul {
  max-width: 48rem;
  margin: 0 auto 1.5rem;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.625;
  list-style-type: disc;
  padding-left: 1.25rem;
}

article.mdx-content > ul > li + li {
  margin-top: 0.5rem;
}

article.mdx-content > ol {
  max-width: 48rem;
  margin: 0 auto 1.5rem;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.625;
  list-style-type: decimal;
  padding-left: 1.25rem;
}

article.mdx-content > ol > li + li {
  margin-top: 0.5rem;
}

article.mdx-content strong {
  color: var(--fg);
  font-weight: 600;
}

article.mdx-content > hr {
  max-width: 48rem;
  margin: 3rem auto;
  border: none;
  border-top: 1px solid var(--border);
}

article.mdx-content > p > img,
article.mdx-content > img {
  max-width: 64rem;
  margin: 2.5rem auto;
  display: block;
  border-radius: 1rem;
  background: var(--surface);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro src/styles/globals.css
git commit -m "feat: add Astro Base layout with fonts and SEO"
```

---

### Task 3: Convert Navbar and Logo to work with Astro

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Logo.tsx`

- [ ] **Step 1: Update Logo.tsx**

Replace `src/components/Logo.tsx` with (remove any Next.js imports, keep as React):

```tsx
type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 32, className }: LogoProps) {
  return (
    <span
      className={`font-heading text-fg select-none ${className ?? ""}`}
      style={{ fontSize: size * 0.65, lineHeight: 1 }}
      aria-label="Pim logo"
      role="img"
    >
      Pim<span className="text-accent">.</span>
    </span>
  );
}
```

- [ ] **Step 2: Update Navbar.tsx**

Replace `src/components/Navbar.tsx` — remove `next/link`, use `<a>` tags:

```tsx
"use client";

import { useState, useEffect, useId } from "react";
import Logo from "./Logo";

const navLinks = [
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Process", href: "/#process" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <a
          href="/"
          className="inline-flex items-center transition-opacity duration-200 hover:opacity-60"
          aria-label="Pim — Home"
        >
          <Logo size={40} />
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-[0.875rem] tracking-wide text-muted hover:text-fg transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden md:inline-block text-[0.875rem] tracking-wide text-fg border border-fg px-5 py-2 rounded-full transition-all duration-200 hover:bg-fg hover:text-bg"
        >
          Get in Touch
        </a>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-fg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls={mobileMenuId}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div id={mobileMenuId} className="md:hidden px-6 pb-8 border-b border-border" role="region" aria-label="Primary">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[0.95rem] text-muted hover:text-fg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/#contact"
              className="inline-block text-center text-fg border border-fg px-6 py-2.5 rounded-full text-[0.9rem] mt-2"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx src/components/Logo.tsx
git commit -m "refactor: remove next/link from Navbar and Logo for Astro"
```

---

### Task 4: Convert static components to Astro

**Files:**
- Create: `src/components/Hero.astro` (replace `.tsx`)
- Create: `src/components/About.astro` (replace `.tsx`)
- Create: `src/components/FeaturedProjects.astro` (replace `.tsx`)
- Create: `src/components/Process.astro` (replace `.tsx`)
- Create: `src/components/Contact.astro` (replace `.tsx`)
- Create: `src/components/Footer.astro` (replace `.tsx`)
- Create: `src/components/ProjectCard.astro` (replace `.tsx`)
- Delete: `src/components/ScrollReveal.tsx`
- Delete: `src/components/CustomCursor.tsx`
- Delete: `src/components/ScrollThread.tsx`
- Delete: `src/components/Projects.tsx`

- [ ] **Step 1: Create Hero.astro**

Delete `src/components/Hero.tsx` and create `src/components/Hero.astro`:

```astro
<section class="min-h-screen flex items-center px-6 lg:px-10 pt-[120px] pb-[80px]">
  <div class="max-w-[1200px] mx-auto w-full">
    <div class="max-w-[820px]">
      <p
        class="text-[0.8rem] tracking-[0.2em] uppercase text-muted mb-8 opacity-0"
        style="animation: fadeUp 0.7s 0.1s forwards"
      >
        UX/UI Designer &mdash; Bangkok, Thailand
      </p>

      <h1
        class="font-heading text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-fg mb-8 opacity-0"
        style="animation: fadeUp 0.8s 0.25s forwards"
      >
        I design products<br />
        people <em class="text-accent">actually</em><br />
        want to use.
      </h1>

      <p
        class="text-muted text-[1.1rem] leading-[1.75] max-w-[520px] mb-12 opacity-0"
        style="animation: fadeUp 0.8s 0.4s forwards"
      >
        Siripat Anukool — turning complex problems into
        clear, intuitive experiences through research-driven
        design and thoughtful iteration.
      </p>

      <div
        class="flex items-center gap-6 opacity-0"
        style="animation: fadeUp 0.8s 0.55s forwards"
      >
        <a
          href="/#work"
          class="inline-block bg-fg text-bg px-8 py-3.5 rounded-full text-[0.9rem] tracking-wide transition-all duration-200 hover:opacity-80"
        >
          View Projects
        </a>
        <a
          href="/#contact"
          class="text-[0.9rem] tracking-wide text-muted hover:text-fg transition-colors duration-200 border-b border-border hover:border-fg pb-0.5"
        >
          Get in Touch
        </a>
      </div>
    </div>

    <div
      class="mt-20 h-px bg-border origin-left opacity-0"
      style="animation: fadeUp 0.6s 0.7s forwards"
    />
  </div>
</section>
```

- [ ] **Step 2: Create About.astro**

Delete `src/components/About.tsx` and create `src/components/About.astro`:

```astro
---
const capabilities = [
  "User Research",
  "Wireframing",
  "Prototyping",
  "Visual Design",
  "Design Systems",
  "Usability Testing",
];
---

<section id="about" class="py-[100px] px-6 lg:px-10 bg-surface">
  <div class="max-w-[1200px] mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
      <div>
        <p class="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
          About
        </p>
        <h2 class="font-heading text-[clamp(2rem,4vw,3rem)] text-fg mb-8">
          A bit about me
        </h2>
        <div class="space-y-5 text-muted text-[0.95rem] leading-[1.8]">
          <p>
            I'm <strong class="text-fg">Siripat Anukool</strong>, a UX/UI
            Designer with a foundation in user-centered design, research, and visual
            communication.
          </p>
          <p>
            My background in education, sales, and marketing gave me a deep
            understanding of user needs and behavior — which now drives my approach
            to creating intuitive digital experiences.
          </p>
          <p>
            I enjoy transforming complex ideas into simple, usable interfaces.
            My work is guided by empathy, clarity, and a desire to solve real
            problems through thoughtful design.
          </p>
        </div>
      </div>

      <div>
        <p class="text-[0.75rem] tracking-[0.2em] uppercase text-muted mb-6">
          What I Do
        </p>
        <div class="space-y-0">
          {capabilities.map((cap) => (
            <div class="flex items-center justify-between py-4 border-b border-border group">
              <span class="text-fg text-[1rem]">{cap}</span>
              <svg
                class="w-4 h-4 text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          ))}
        </div>

        <div class="mt-10 p-6 border border-border rounded-lg">
          <p class="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
            Goal
          </p>
          <p class="text-muted text-[0.9rem] leading-[1.7]">
            To grow within a product-driven team, contribute to impactful
            user experiences, and develop into a designer who creates
            solutions that genuinely improve people's daily lives.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create FeaturedProjects.astro**

Delete `src/components/FeaturedProjects.tsx` and create `src/components/FeaturedProjects.astro`:

```astro
---
import { getCollection } from 'astro:content';
import ProjectCard from './ProjectCard.astro';

const projects = await getCollection('projects');
---

<section id="work" class="py-[100px] px-6 lg:px-10">
  <div class="max-w-[1200px] mx-auto">
    <div class="flex items-baseline justify-between mb-14">
      <div>
        <p class="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
          Selected Work
        </p>
        <h2 class="font-heading text-[clamp(2rem,4vw,3rem)] text-fg">
          Recent Projects
        </h2>
      </div>
      <span class="hidden sm:block text-[0.8rem] text-muted tracking-wide">
        {String(projects.length).padStart(2, "0")} projects
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
      {projects.map((project, i) => (
        <ProjectCard project={project} index={i} />
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create ProjectCard.astro**

Delete `src/components/ProjectCard.tsx` and create `src/components/ProjectCard.astro`:

```astro
---
interface Props {
  project: {
    id: string;
    data: {
      title: string;
      category: string;
      description: string;
      image: string;
    };
  };
  index?: number;
  isLast?: boolean;
}

const { project, index = 0, isLast = false } = Astro.props;
const href = `/projects/${project.id}`;
const isEven = index % 2 === 1;
---

<a href={href} class="block">
  <div class:list={[
    "group flex flex-col md:flex-row gap-8 md:gap-12 items-center",
    { "md:flex-row-reverse": isEven },
    { "pb-12 md:pb-16 border-b border-border mb-12 md:mb-16": !isLast },
  ]}>
    <!-- Image -->
    <div class="w-full md:flex-[1.3] relative aspect-[3/2] rounded-2xl overflow-hidden bg-surface">
      <img
        src={project.data.image}
        alt={project.data.title}
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>

    <!-- Text -->
    <div class="w-full md:flex-1">
      <p class="text-[0.7rem] uppercase tracking-[0.2em] text-accent mb-2">
        {project.data.category}
      </p>
      <h3 class="font-heading text-2xl text-fg mb-3 group-hover:text-accent transition-colors duration-200">
        {project.data.title}
      </h3>
      <p class="text-muted text-sm leading-[1.7] mb-5 max-w-md">
        {project.data.description}
      </p>
      <span class="inline-flex items-center gap-2 text-sm text-fg font-medium border-b border-fg pb-0.5 group-hover:gap-3 transition-all duration-200">
        View Project
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </div>
  </div>
</a>
```

- [ ] **Step 5: Create Process.astro**

Delete `src/components/Process.tsx` and create `src/components/Process.astro`:

```astro
---
const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Research users, stakeholders, and the problem space through interviews, surveys, and competitive analysis.",
  },
  {
    num: "02",
    title: "Define",
    desc: "Synthesize insights into personas, journey maps, and a clear problem statement to guide decisions.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Ideate, wireframe, and prototype — iterating rapidly with feedback loops to refine solutions.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "Handoff production-ready designs with documentation, collaborate with developers, and measure impact.",
  },
];
---

<section id="process" class="py-[100px] px-6 lg:px-10">
  <div class="max-w-[1200px] mx-auto">
    <div class="mb-14">
      <p class="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
        Process
      </p>
      <h2 class="font-heading text-[clamp(2rem,4vw,3rem)] text-fg">
        How I Work
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
      {steps.map((step) => (
        <div class="py-8 lg:px-6 first:lg:pl-0 last:lg:pr-0 border-t border-border">
          <span class="text-[0.75rem] text-accent tracking-wide block mb-4">
            {step.num}
          </span>
          <h3 class="text-fg text-[1.15rem] font-medium mb-3">
            {step.title}
          </h3>
          <p class="text-muted text-[0.85rem] leading-[1.7]">
            {step.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 6: Create Contact.astro**

Delete `src/components/Contact.tsx` and create `src/components/Contact.astro`:

```astro
---
const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL ?? "hello@example.com";
const linkedinUrl = import.meta.env.PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com";
---

<section id="contact" class="py-[100px] px-6 lg:px-10 bg-surface">
  <div class="max-w-[1200px] mx-auto">
    <div class="max-w-[600px]">
      <p class="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
        Contact
      </p>
      <h2 class="font-heading text-[clamp(2rem,4vw,3rem)] text-fg mb-6">
        Let's work together
      </h2>
      <p class="text-muted text-[1rem] leading-[1.8] mb-12">
        Have a project in mind or looking for a UX/UI designer?
        I'd love to hear from you.
      </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-6">
      <a
        href={`mailto:${contactEmail}`}
        class="group flex items-center gap-4 border border-border rounded-lg px-6 py-5 transition-all duration-200 hover:border-fg"
      >
        <svg class="w-5 h-5 text-muted group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <div>
          <p class="text-[0.7rem] tracking-[0.15em] uppercase text-muted mb-0.5">Email</p>
          <p class="text-fg text-[0.9rem]">{contactEmail}</p>
        </div>
      </a>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-4 border border-border rounded-lg px-6 py-5 transition-all duration-200 hover:border-fg"
      >
        <svg class="w-5 h-5 text-muted group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        <div>
          <p class="text-[0.7rem] tracking-[0.15em] uppercase text-muted mb-0.5">LinkedIn</p>
          <p class="text-fg text-[0.9rem]">Siripat Anukool</p>
        </div>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 7: Create Footer.astro**

Delete `src/components/Footer.tsx` and create `src/components/Footer.astro`:

```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="border-t border-border py-8 px-6 lg:px-10">
  <div class="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <p class="text-muted text-[0.8rem]">
      &copy; {currentYear} Siripat Anukool
    </p>
    <p class="text-muted text-[0.8rem]">
      UX/UI Designer &mdash; Bangkok, Thailand
    </p>
  </div>
</footer>
```

- [ ] **Step 8: Delete unused components**

```bash
rm src/components/Hero.tsx src/components/About.tsx src/components/FeaturedProjects.tsx src/components/Process.tsx src/components/Contact.tsx src/components/Footer.tsx src/components/ProjectCard.tsx src/components/ScrollReveal.tsx src/components/CustomCursor.tsx src/components/ScrollThread.tsx src/components/Projects.tsx
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: convert static components from React to Astro"
```

---

### Task 5: Create MDX components as Astro files

**Files:**
- Create: `src/components/mdx/Callout.astro`
- Create: `src/components/mdx/Finding.astro`
- Create: `src/components/mdx/StatsGrid.astro`
- Create: `src/components/mdx/TwoCol.astro`
- Create: `src/components/mdx/FigmaLink.astro`
- Create: `src/components/mdx/ProjectImage.astro`
- Delete: `src/components/mdx/index.tsx`

- [ ] **Step 1: Create Callout.astro**

Create `src/components/mdx/Callout.astro`:

```astro
<div class="max-w-3xl mx-auto bg-accent/5 border-l-3 border-accent px-5 py-4 rounded-r-lg mb-8 [&>p]:mb-0 [&>p]:text-fg">
  <slot />
</div>
```

- [ ] **Step 2: Create Finding.astro**

Create `src/components/mdx/Finding.astro`:

```astro
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<div class="max-w-3xl mx-auto border-l-2 border-accent pl-5 mb-6">
  <p class="font-semibold text-fg mb-1">{title}</p>
  <div class="text-muted text-sm leading-relaxed [&>p]:mb-0">
    <slot />
  </div>
</div>
```

- [ ] **Step 3: Create StatsGrid.astro**

Create `src/components/mdx/StatsGrid.astro`:

```astro
---
interface Props {
  items: { label: string; value: string }[];
}
const { items } = Astro.props;
---

<div class="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
  {items.map((item) => (
    <div class="bg-surface p-5 rounded-xl">
      <p class="text-[0.7rem] uppercase tracking-[0.15em] text-muted mb-1">
        {item.label}
      </p>
      <p class="font-semibold text-fg">{item.value}</p>
    </div>
  ))}
</div>
```

- [ ] **Step 4: Create TwoCol.astro**

Create `src/components/mdx/TwoCol.astro`:

```astro
<div class="max-w-3xl mx-auto grid md:grid-cols-2 gap-10 mb-8">
  <slot />
</div>
```

- [ ] **Step 5: Create FigmaLink.astro**

Create `src/components/mdx/FigmaLink.astro`:

```astro
---
interface Props {
  href: string;
}
const { href } = Astro.props;
---

<a
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  class="max-w-3xl mx-auto block w-fit items-center gap-2 text-accent hover:underline mb-6"
>
  <span class="inline-flex items-center gap-2">
    <slot />
    <svg
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  </span>
</a>
```

- [ ] **Step 6: Create ProjectImage.astro**

Create `src/components/mdx/ProjectImage.astro`:

```astro
---
interface Props {
  src: string;
  alt: string;
  cover?: boolean;
}
const { src, alt, cover = false } = Astro.props;
---

<div class="max-w-5xl mx-auto my-10">
  <div class="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface">
    <img
      src={src}
      alt={alt}
      class:list={["absolute inset-0 w-full h-full", cover ? "object-cover" : "object-contain"]}
      loading="lazy"
    />
  </div>
</div>
```

- [ ] **Step 7: Delete old MDX index**

```bash
rm src/components/mdx/index.tsx
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: convert MDX components from React to Astro"
```

---

### Task 6: Create pages

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[slug].astro`
- Create: `src/pages/404.astro`
- Delete: `src/app/` (entire directory)
- Delete: `src/data/projects.ts`
- Delete: `src/lib/mdx.ts`

- [ ] **Step 1: Create home page**

Create `src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Navbar from '../components/Navbar.tsx';
import Hero from '../components/Hero.astro';
import FeaturedProjects from '../components/FeaturedProjects.astro';
import About from '../components/About.astro';
import Process from '../components/Process.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
import '../styles/globals.css';
---

<Base>
  <Navbar client:load />
  <main>
    <Hero />
    <FeaturedProjects />
    <About />
    <Process />
    <Contact />
  </main>
  <Footer />
</Base>
```

- [ ] **Step 2: Create projects listing page**

Create `src/pages/projects/index.astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import Navbar from '../../components/Navbar.tsx';
import Footer from '../../components/Footer.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import { getCollection } from 'astro:content';
import '../../styles/globals.css';

const projects = await getCollection('projects');
---

<Base title="Projects | Siripat" description="Browse my selected UX/UI design projects and case studies.">
  <Navbar client:load />
  <main class="pt-20 bg-bg">
    <section class="py-24">
      <div class="max-w-[1100px] mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <p class="text-[0.7rem] uppercase tracking-[0.2em] text-accent mb-2">
            Selected Work
          </p>
          <h1 class="font-heading text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.2] text-fg mb-4">
            Projects
          </h1>
          <p class="text-muted text-base leading-[1.7]">
            Case studies and design explorations.
          </p>
        </div>

        <div>
          {projects.map((project, i) => (
            <ProjectCard
              project={project}
              index={i}
              isLast={i === projects.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Base>
```

- [ ] **Step 3: Create case study detail page**

Create `src/pages/projects/[slug].astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import Navbar from '../../components/Navbar.tsx';
import Footer from '../../components/Footer.astro';
import Callout from '../../components/mdx/Callout.astro';
import Finding from '../../components/mdx/Finding.astro';
import StatsGrid from '../../components/mdx/StatsGrid.astro';
import TwoCol from '../../components/mdx/TwoCol.astro';
import FigmaLink from '../../components/mdx/FigmaLink.astro';
import ProjectImage from '../../components/mdx/ProjectImage.astro';
import { getCollection, render } from 'astro:content';
import '../../styles/globals.css';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
const { title, description, category, heroImage, meta } = project.data;
---

<Base title={`${title} - Case Study | Siripat`} description={description}>
  <Navbar client:load />
  <main class="min-h-screen bg-bg pt-20">
    <!-- Hero Section -->
    <section class="pt-8 pb-12 px-6">
      <div class="max-w-3xl mx-auto">
        <p class="text-[0.7rem] uppercase tracking-[0.2em] text-accent mb-3">
          {category}
        </p>
        <h1 class="text-3xl md:text-4xl font-bold font-heading text-fg mb-4">
          {title}
        </h1>
        <p class="text-muted text-[0.95rem] leading-relaxed mb-8 max-w-2xl">
          {description}
        </p>

        <!-- Metadata Row -->
        <div class="flex flex-wrap gap-x-6 gap-y-2 py-4 border-y border-border text-sm">
          {Object.entries(meta).map(([key, value]) => (
            <span class="text-muted">
              <span class="font-semibold text-fg">{key}</span> &middot; {value}
            </span>
          ))}
        </div>
      </div>
    </section>

    <!-- Hero Image -->
    <section class="px-6 pb-12">
      <div class="max-w-5xl mx-auto">
        <div class="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface">
          <img
            src={heroImage}
            alt={`${title} Mockup`}
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- MDX Content -->
    <article class="mdx-content px-6 pb-16 overflow-x-hidden">
      <Content components={{ Callout, Finding, StatsGrid, TwoCol, FigmaLink, ProjectImage }} />
    </article>

    <!-- Back to Projects -->
    <section class="px-6 pb-20">
      <div class="max-w-3xl mx-auto pt-8 border-t border-border">
        <a
          href="/projects"
          class="inline-flex items-center gap-2 text-sm text-fg font-medium hover:text-accent transition-colors duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Projects
        </a>
      </div>
    </section>
  </main>
  <Footer />
</Base>
```

- [ ] **Step 4: Create 404 page**

Create `src/pages/404.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.astro';
import '../styles/globals.css';
---

<Base title="Page Not Found | Siripat">
  <Navbar client:load />
  <main class="min-h-[70vh] bg-bg flex flex-col items-center justify-center px-6 pt-28 pb-20">
    <p class="text-[0.78rem] font-bold text-accent uppercase tracking-[0.15em] mb-3">
      404
    </p>
    <h1 class="font-heading text-[clamp(2rem,4vw,2.75rem)] font-bold text-fg text-center mb-4">
      Page not found
    </h1>
    <p class="text-muted text-center max-w-md mb-10 leading-relaxed">
      The page you are looking for does not exist or has been moved.
    </p>
    <a
      href="/"
      class="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-full font-semibold text-[0.95rem] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,89,60,0.35)]"
    >
      Back to home
    </a>
  </main>
  <Footer />
</Base>
```

- [ ] **Step 5: Delete old Next.js app directory and data files**

```bash
rm -rf src/app src/data src/lib
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: create Astro pages, delete Next.js app directory"
```

---

### Task 7: Build and verify

**Files:** None (verification only)

- [ ] **Step 1: Run the build**

```bash
bun run build
```

Expected: Build completes successfully with all pages generated.

- [ ] **Step 2: Preview the site**

```bash
bun run preview
```

Expected: Site runs on `http://localhost:4321` (Astro default port).

- [ ] **Step 3: Verify all pages**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/projects/
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/projects/ledger/
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/projects/pawtopia/
```

Expected: All return 200.

- [ ] **Step 4: Start dev server and verify hot reload**

```bash
bun run dev
```

Expected: Dev server starts without errors on `http://localhost:4321`.

- [ ] **Step 5: Clean up .next directory**

```bash
rm -rf .next
```

- [ ] **Step 6: Commit any fixes**

If any fixes were needed during verification:

```bash
git add -A
git commit -m "fix: resolve build issues from Astro migration"
```

---

### Task 8: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md**

Replace the contents of `CLAUDE.md` with updated commands and architecture:

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

\`\`\`bash
bun run dev      # Start development server (localhost:4321)
bun run build    # Build for production
bun run preview  # Preview production build
\`\`\`

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
\`\`\`
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for Astro migration"
```
