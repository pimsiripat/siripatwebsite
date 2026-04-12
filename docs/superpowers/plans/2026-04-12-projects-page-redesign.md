# Projects Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the projects listing page and case study detail pages with alternating image-text rows and clean minimal case study layout, while simplifying the MDX component system from ~16 to 6 components.

**Architecture:** Replace the current 2-column card grid on `/projects` with alternating left-right rows. Simplify case study pages by removing `Section`/`Narrow`/`Wide` wrapper components and using an `article` wrapper with auto-spacing. Update both MDX content files to remove deleted components.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, MDX via next-mdx-remote v6

**Important — Tailwind color tokens:** The current CSS theme (in `globals.css`) defines these Tailwind colors: `bg`, `fg`, `muted`, `accent`, `accent-light`, `surface`, `border`. Some existing code uses undefined colors (`cream`, `green`, `dark`, `mid`, `pink-light`) from a previous design — replace those with the correct tokens throughout.

---

### Task 1: Rewrite ProjectCard as ProjectRow

Replace the current card component with an alternating row layout for the projects listing.

**Files:**
- Modify: `src/components/ProjectCard.tsx` (rewrite as `ProjectRow`)

- [ ] **Step 1: Rewrite ProjectCard.tsx**

Replace the entire file with the new `ProjectRow` component:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectRowProps {
  project: Project;
  index?: number;
  isLast?: boolean;
}

export default function ProjectRow({ project, index = 0, isLast = false }: ProjectRowProps) {
  const href = project.link ?? "#";
  const isEven = index % 2 === 1;

  const content = (
    <div className={`group flex flex-col md:flex-row gap-8 md:gap-12 items-center ${isEven ? "md:flex-row-reverse" : ""} ${!isLast ? "pb-12 md:pb-16 border-b border-border mb-12 md:mb-16" : ""}`}>
      {/* Image */}
      <div className="w-full md:flex-[1.3] relative aspect-[3/2] rounded-2xl overflow-hidden bg-surface">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>

      {/* Text */}
      <div className="w-full md:flex-1">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-accent mb-2">
          {project.category}
        </p>
        <h3 className="font-heading text-2xl text-fg mb-3 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-[1.7] mb-5 max-w-md">
          {project.description}
        </p>
        <span className="inline-flex items-center gap-2 text-sm text-fg font-medium border-b border-fg pb-0.5 group-hover:gap-3 transition-all duration-200">
          View Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </div>
  );

  if (href.startsWith("/") && href !== "#") {
    return <Link href={href} className="block">{content}</Link>;
  }
  return <a href={href} className="block">{content}</a>;
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds (the component isn't imported yet with new props, but types should be valid)

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "Replace ProjectCard with ProjectRow alternating layout"
```

---

### Task 2: Update Projects Listing Page

Update the `/projects` page to use the new row layout with updated header.

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Rewrite the projects listing page**

Replace the entire file:

```tsx
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import ProjectRow from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects | Siripat",
  description: "Browse my selected UX/UI design projects and case studies.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-bg">
        <section className="py-24">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
            <div className="mb-16">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-accent mb-2">
                Selected Work
              </p>
              <h1 className="font-heading text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.2] text-fg mb-4">
                Projects
              </h1>
              <p className="text-muted text-base leading-[1.7]">
                Case studies and design explorations.
              </p>
            </div>

            <div>
              {projects.map((project, i) => (
                <ProjectRow
                  key={project.id}
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
    </>
  );
}
```

- [ ] **Step 2: Start dev server and verify in browser**

Run: `npm run dev`

Open http://localhost:3000/projects. Verify:
- Header shows "Selected Work" label, "Projects" title, subtitle
- Ledger row: image left, text right
- Pawtopia row: text left, image right (alternating)
- Divider between rows
- Hover states work (image scale, title color, arrow gap)
- Mobile: rows stack vertically

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "Redesign projects listing with alternating rows"
```

---

### Task 3: Simplify MDX Components

Rewrite `src/components/mdx/index.tsx` — keep 6 components, remove the rest, add markdown element overrides.

**Files:**
- Modify: `src/components/mdx/index.tsx`

- [ ] **Step 1: Rewrite the MDX components file**

Replace the entire file:

```tsx
import Image from "next/image";
import React from "react";

// --- Kept Components (6) ---

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-accent/5 border-l-3 border-accent px-5 py-4 rounded-r-lg mb-8 [&>p]:mb-0 [&>p]:text-fg">
      {children}
    </div>
  );
}

function Finding({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-accent pl-5 mb-6">
      <p className="font-semibold text-fg mb-1">{title}</p>
      {children && (
        <div className="text-muted text-sm leading-relaxed [&>p]:mb-0">
          {children}
        </div>
      )}
    </div>
  );
}

function StatsGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
      {items.map((item) => (
        <div key={item.label} className="bg-surface p-5 rounded-xl">
          <p className="text-[0.7rem] uppercase tracking-[0.15em] text-muted mb-1">
            {item.label}
          </p>
          <p className="font-semibold text-fg">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-2 gap-10 mb-8">{children}</div>
  );
}

function FigmaLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-accent hover:underline mb-6"
    >
      {children}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}

function ProjectImage({
  src,
  alt,
  cover,
  priority,
}: {
  src: string;
  alt: string;
  cover?: boolean;
  priority?: boolean;
}) {
  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface">
        <Image
          src={src}
          alt={alt}
          fill
          className={cover ? "object-cover" : "object-contain"}
          priority={priority}
        />
      </div>
    </div>
  );
}

// --- MDX Component Mapping ---

export const mdxComponents = {
  // Custom components
  Callout,
  Finding,
  StatsGrid,
  TwoCol,
  FigmaLink,
  ProjectImage,
  // Markdown element overrides
  h2: ({ children }: { children?: React.ReactNode }) => (
    <div className="max-w-3xl mx-auto mt-16 mb-8">
      <div className="border-t border-border mb-8" />
      <h2 className="text-2xl font-bold font-heading text-fg">{children}</h2>
    </div>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-lg font-bold font-heading text-fg mb-4">{children}</h3>
    </div>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="max-w-3xl mx-auto text-muted text-[0.95rem] leading-relaxed mb-6 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="max-w-3xl mx-auto text-muted text-[0.95rem] leading-relaxed mb-6 list-disc pl-5 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="max-w-3xl mx-auto text-muted text-[0.95rem] leading-relaxed mb-6 list-decimal pl-5 space-y-2">
      {children}
    </ol>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-fg font-semibold">{children}</strong>
  ),
  hr: () => (
    <div className="max-w-3xl mx-auto my-12">
      <div className="border-t border-border" />
    </div>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) =>
    src ? (
      <span className="block max-w-5xl mx-auto my-10">
        <span className="block relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface">
          <Image
            src={src}
            alt={alt || ""}
            fill
            className="object-contain"
          />
        </span>
      </span>
    ) : null,
};
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx next build 2>&1 | tail -10`
Expected: May show warnings about unused components in MDX files — that's fine, we'll update those next.

- [ ] **Step 3: Commit**

```bash
git add src/components/mdx/index.tsx
git commit -m "Simplify MDX components from 16 to 6"
```

---

### Task 4: Update Case Study Detail Page Layout

Redesign the hero section, metadata display, and content wrapper on the detail page.

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Rewrite the case study page**

Replace the entire file:

```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getProjectBySlug(slug);
    return {
      title: `${frontmatter.title} - Case Study | Siripat`,
      description: frontmatter.description,
    };
  } catch {
    return { title: "Project Not Found" };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  let project;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-20">
        {/* Hero Section */}
        <section className="pt-8 pb-12 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-accent mb-3">
              {frontmatter.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-fg mb-4">
              {frontmatter.title}
            </h1>
            <p className="text-muted text-[0.95rem] leading-relaxed mb-8 max-w-2xl">
              {frontmatter.description}
            </p>

            {/* Metadata Row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 border-y border-border text-sm">
              {Object.entries(frontmatter.meta).map(([key, value]) => (
                <span key={key} className="text-muted">
                  <span className="font-semibold text-fg">{key}</span> · {value}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface">
              <Image
                src={frontmatter.heroImage}
                alt={`${frontmatter.title} Mockup`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* MDX Content */}
        <article className="px-6 pb-16">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
              blockJS: false,
            }}
          />
        </article>

        {/* Back to Projects */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto pt-8 border-t border-border">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-fg font-medium hover:text-accent transition-colors duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to All Projects
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/[slug]/page.tsx
git commit -m "Redesign case study page with clean minimal layout"
```

---

### Task 5: Update Ledger MDX Content

Remove deleted wrapper components and replace deprecated components with simplified alternatives.

**Files:**
- Modify: `src/content/projects/ledger.mdx`

- [ ] **Step 1: Rewrite ledger.mdx**

Replace the entire file:

```mdx
---
title: "LEDGER"
description: "A simple mobile application and website designed for individuals who want a fast, easy way to track their income and expenses."
category: "Case Study"
heroImage: "/images/projects/ledger/Hero.png"
meta:
  Category: "Income & Expenses"
  Timeline: "Aug – Oct 2025"
  Role: "UI/UX Design"
  Type: "Case Study"
---

## Overview

Ledger is designed for salarymen, freelancers, gig workers, junior professionals (ages 20–35), and individuals new to personal finance who want low-friction tracking. Users can view their cash flow at a glance, focusing on minimal data entry, quick insights, and simple categories.

## The Challenge

<TwoCol>
<div>

### The Problem

Many young professionals track money in messy ways (notes, bank apps, multiple receipts). They want a low-effort app to see: "How much did I actually earn and spend this month?" without complex accounting.

</div>
<div>

### The Goal

Create an MVP income & expense recorder that surfaces total income, total expenses, net balance, recent transactions, and simple spending charts — all in a single Overview screen.

</div>
</TwoCol>

## Understanding the User

### User Research Summary

Conducted 5 remote interviews and 10 survey responses.

<Callout>
**Key findings:** users want speed (add transaction in under 15 seconds), clear categories, and visual cues for overspending. Assumptions about accountant-like features were reduced after research — users preferred simplicity.
</Callout>

### Pain Points

<Finding title="1. Entering transactions is slow on mobile">
Solution: quick add with suggested amounts and smart category detection.
</Finding>

<Finding title="2. Hard to see net position at a glance">
Solution: a single Overview card with net balance.
</Finding>

<Finding title="3. Too many categories lead to confusion">
Solution: limited default categories and a custom tag option.
</Finding>

## Persona: Sarah

Sarah wants to save for a condo down payment, but she keeps losing track of where her money goes. She needs something fast and visual to help her stay on track and within budget.

<ProjectImage src="/images/projects/ledger/Persona.png" alt="Persona Sarah" />

## User Journey Map

<ProjectImage src="/images/projects/ledger/User journey map.png" alt="User Journey Map" />

## Starting the Design

### Sitemap

I built user-focused flows to ensure that the persona can complete their key objectives while reducing the existing pain points.

<ProjectImage src="/images/projects/ledger/Site map.png" alt="Sitemap" />

## Paper Wireframes

I explored layouts for the Ledger app's main screens, prioritizing simplicity and ease of navigation. My goal was to enable the quick recording of income and expenses while ensuring a clear overview of the balance.

<ProjectImage src="/images/projects/ledger/paper_wireframe_all.png" alt="Paper Wireframes" />
<ProjectImage src="/images/projects/ledger/paper_variations.png" alt="Paper Wireframe Variations" />

## Digital Wireframes

I created digital wireframes from the completed paper sketches to improve the structure and layout of key screens. These wireframes allowed me to test hierarchy, spacing, and interaction flow before moving on to the high-fidelity prototype.

<ProjectImage src="/images/projects/ledger/digital.png" alt="Digital Wireframes" />
<ProjectImage src="/images/projects/ledger/digital_variations.png" alt="Digital Wireframe Variations" />

## Low-fidelity Prototype

I created a low-fidelity prototype to test the initial user flow of recording income and expenses in the Ledger app.

<FigmaLink href="https://www.figma.com/proto/9G6BaivcHUmenZ8eZpiSA5/Ledger---Income---Expenses-Recorder?node-id=143-297&p=f&t=4OvRxxos4vi34TCn-1&scaling=min-zoom&content-scaling=fixed&page-id=211%3A1974&starting-point-node-id=143%3A297&show-proto-sidebar=1">View Lo-Fi Prototype on Figma</FigmaLink>

<ProjectImage src="/images/projects/ledger/Lo-fi.png" alt="Low-fidelity Prototype" />

## Usability Study

<StatsGrid items={[
  { label: "Study Type", value: "Unmoderated" },
  { label: "Participants", value: "5 participants" },
  { label: "Length", value: "20-30 minutes" }
]} />

### Key Findings

<Finding title="Overview Dashboard">
Users couldn't easily understand their spending trends at a glance. The charts lacked clear labels.
</Finding>

<Finding title="Add Transaction">
Users found it confusing to differentiate between adding income and expenses.
</Finding>

<Finding title="Categorization">
Users wanted an easier way to assign or create custom categories.
</Finding>

<Finding title="Data Editing">
Users had difficulty locating the option to edit or delete transactions.
</Finding>

## Refining the Design

After reviewing the insights from the usability study, I enhanced the overview screen. I redesigned the net balance card to improve its clarity and ensure users can quickly understand their financial status.

<ProjectImage src="/images/projects/ledger/Mockup.png" alt="Mockup Comparison" />
<ProjectImage src="/images/projects/ledger/mobile_mockup.png" alt="Mobile Mockups" />
<ProjectImage src="/images/projects/ledger/variations_mockup.png" alt="Screen Size Variations" />

## High-fidelity Prototype

I refined the design based on usability feedback and created a high-fidelity prototype with polished visuals, consistent colors, and clear typography.

<FigmaLink href="https://www.figma.com/proto/9G6BaivcHUmenZ8eZpiSA5/Ledger---Income---Expenses-Recorder?node-id=173-284&p=f&t=11e0kfFH2lVd6kpR-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=173%3A284">View Hi-Fi Prototype on Figma</FigmaLink>

<ProjectImage src="/images/projects/ledger/Hi-fi.png" alt="High-fidelity Prototype" />

## Accessibility Considerations

- **Color Contrast** — High-contrast color combinations ensure text, charts, and icons are easy to read.
- **Visual Hierarchy** — Consistent text sizes, spacing, and layout help users easily scan content.
- **Keyboard & Screen Reader** — Interactive elements are accessible via keyboard and readable by screen readers.

## Going Forward

### Impact

- The Ledger prototype transformed personal finance management by simplifying income and expense tracking.
- Feedback indicated that the user-friendly layout and clear financial summaries boosted confidence.

### What I Learned

- Balancing simplicity with functionality is essential; users prefer clarity and ease of use over complex features.
- Early wireframing and usability testing was vital in uncovering minor pain points.

### Next Steps

1. Test the high-fidelity prototype with a larger and more diverse group of users.
2. Introduce features for monthly budgets and savings goals.
3. Adjust the design for both mobile and desktop interfaces.
```

- [ ] **Step 2: Verify the page renders**

Run: `npm run dev` (if not running)

Open http://localhost:3000/projects/ledger. Verify:
- Hero section shows correctly with metadata row
- All sections render with dividers between h2 headings
- Images break out to wider width
- Callout, Finding, StatsGrid, TwoCol, FigmaLink render correctly
- Accessibility, Impact, What I Learned sections use standard markdown lists
- No console errors

- [ ] **Step 3: Commit**

```bash
git add src/content/projects/ledger.mdx
git commit -m "Simplify Ledger MDX to use reduced component set"
```

---

### Task 6: Update Pawtopia MDX Content

Same simplification as Ledger — remove wrappers, replace deprecated components.

**Files:**
- Modify: `src/content/projects/pawtopia.mdx`

- [ ] **Step 1: Rewrite pawtopia.mdx**

Replace the entire file:

```mdx
---
title: "Pawtopia Hospital"
description: "A web and mobile app for a modern pet hospital. Enables pet owners to schedule appointments, view medical records, and receive reminders for vaccinations."
category: "Case Study"
heroImage: "/images/projects/pawtopia/iPhone_16_Pro.png"
meta:
  Category: "Pet Healthcare"
  Timeline: "Jun – Aug 2025"
  Role: "UI/UX Design"
  Type: "Case Study"
---

## Overview

Pawtopia Hospital is a digital solution for pet hospitals, targeting pet owners looking for convenience in managing their pet's healthcare. The platform streamlines appointment booking, medical record access, and vaccination reminders into one simple interface.

## The Challenge

<TwoCol>
<div>

### The Problem

Pet owners often forget appointments and lose track of medical history. The current system is paper-based, making it difficult to manage pet healthcare efficiently.

</div>
<div>

### The Goal

Design a simple, user-friendly platform to streamline pet healthcare management — from booking appointments to accessing medical records.

</div>
</TwoCol>

## Understanding the User

### User Research Summary

Conducted interviews with 4 pet owners and 2 veterinarians. Assumed users wanted appointment booking — they also highly valued access to past medical history.

### Pain Points

<Finding title="1. Difficult to remember appointments" />

<Finding title="2. Hard to keep vaccinations and records in one place" />

<Finding title="3. Lack of therapy/rehabilitation online scheduling" />

<Finding title="4. Calling the hospital means long wait times and unclear availability" />

## Persona: Nicha

Nicha is a Marketing Executive who needs a convenient, reliable digital tool that gives her confidence that her pet Momo's health is always under control — even when she's busy.

![Persona Nicha](/images/projects/ledger/digital_variations.png)

## User Journey Map: Nicha

![Nicha's User Journey Map](/images/projects/pawtopia/Nichas_persona.png)

## Persona: Korn

Korn wants to do right by his pet Luna from day one. He's looking for a reliable, easy-to-use digital companion that helps him book appointments and teaches him how to be a responsible pet parent.

![Persona Korn](/images/projects/pawtopia/Persona_Korn.jpg)

## User Journey Map: Korn

![Korn's User Journey Map](/images/projects/pawtopia/Korns_persona.png)

## Starting the Design

### Paper Wireframes

I designed detailed paper wireframes for every screen, ensuring I directly addressed user pain points about the lack of clarity regarding service availability and pricing.

![Paper Wireframes](/images/projects/pawtopia/paper_wire_frame.png)

## Digital Wireframes

Shifting from paper to digital wireframes clarified how my redesign can effectively address user pain points. Central to my strategy was the careful prioritization of CTA buttons and visual elements on the home page.

![Digital Wireframes](/images/projects/pawtopia/digital_wireframe.png)

## Low-fidelity Prototype

I connected all screens forming the primary user flow for booking a pet appointment. Feedback from peers led to improvements in button clarity and user experience.

<FigmaLink href="https://www.figma.com/proto/E5vsCJ2y8BgAubKEbPDX1S/Pawtopia---Pet-Hospital?node-id=24-10&p=f&t=UJnINw2IXhm1oxHC-1&scaling=min-zoom&content-scaling=fixed&page-id=366%3A406&starting-point-node-id=24%3A10&show-proto-sidebar=1">View Lo-Fi Prototype on Figma</FigmaLink>

![Low-fidelity Prototype](/images/projects/pawtopia/Screenshot_2025-10-01_at_15.11.46.png)

## Usability Study

<StatsGrid items={[
  { label: "Study Type", value: "Unmoderated" },
  { label: "Participants", value: "6 participants" },
  { label: "Length", value: "20-30 minutes" }
]} />

### Round 1 Findings

<Finding title="Calendar Readability">
Users had difficulty selecting available appointment times because the calendar wasn't easy to read.
</Finding>

<Finding title="Medical Records">
Pet medical records appeared in a lengthy list, making it difficult to locate past treatments.
</Finding>

<Finding title="Emergency Contact">
Contact information for emergencies was not clearly visible on the main navigation.
</Finding>

### Round 2 Findings

<Finding title="Booking Confirmation">
Users found the confirmation page confusing — unsure if the booking had been completed.
</Finding>

<Finding title="Pre-fill Pet Info">
Some users wanted faster ways to pre-fill pet information when booking.
</Finding>

<Finding title="Payment Clarity">
The payment step lacked clarity on accepted methods, causing hesitation before confirming.
</Finding>

## Refining the Design

Based on usability study insights, I improved the appointment screen with CTA buttons and added a contextual countdown. I also enhanced the medical history section with sortable treatment cards.

![Appointment Screen Mockup](/images/projects/pawtopia/mockup_1.png)
![Medical History Mockup](/images/projects/pawtopia/mockup_2.png)
![Full Mockups](/images/projects/pawtopia/mockup.png)

## High-fidelity Prototype

The high-fidelity prototype incorporates design enhancements based on insights from the usability study and constructive feedback from peers.

<FigmaLink href="https://www.figma.com/proto/E5vsCJ2y8BgAubKEbPDX1S/Pawtopia---Pet-Hospital?node-id=43-418&t=731TZHQtUjeRDUGm-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1">View Hi-Fi Prototype on Figma</FigmaLink>

![High-fidelity Prototype](/images/projects/pawtopia/Screenshot_2025-10-01_at_15.12.20.png)

## Accessibility Considerations

- **Visual Hierarchy & Contrast** — Consistent visual hierarchy and strong color contrast ensure content is legible for users with low vision.
- **Screen Reader Compatible** — Descriptive alt text for images and labels for interactive elements allow screen reader users to navigate with confidence.
- **Touch-Friendly Design** — Intuitive navigation and large touch targets make it easier for users with motor impairments or on mobile devices.

## Going Forward

### Impact

The Pawtopia Hospital platform enabled pet owners to easily book appointments, access medical records, and locate specialized services. Early feedback highlighted that users appreciated the simple navigation and felt more confident managing their pets' health online.

### What I Learned

I learned the importance of balancing emotional design with functionality in healthcare services for pets. I also gained deeper experience in applying accessibility standards, designing for mobile-first usage, and creating solutions that address both user and business needs.

### Next Steps

1. Conduct usability testing with real pet owners to validate booking and record-access features.
2. Expand accessibility support including keyboard navigation and enhanced color contrast.
3. Integrate with real hospital systems for appointments, medical records, and payments.
```

- [ ] **Step 2: Verify the page renders**

Open http://localhost:3000/projects/pawtopia. Verify:
- Hero, metadata, images all render
- Pain points show as `<Finding>` components
- Both persona sections and journey maps render inline images
- Usability study StatsGrid and Findings render
- Standard markdown lists for Accessibility and Going Forward sections

- [ ] **Step 3: Commit**

```bash
git add src/content/projects/pawtopia.mdx
git commit -m "Simplify Pawtopia MDX to use reduced component set"
```

---

### Task 7: Fix Stale Color Tokens in Other Files

Replace undefined Tailwind colors (`cream`, `green`, `dark`, `mid`, `pink-light`) with correct theme tokens across remaining files that use them.

**Files:**
- Modify: `src/app/not-found.tsx`

- [ ] **Step 1: Update not-found.tsx color tokens**

In `src/app/not-found.tsx`, replace:
- `bg-cream` → `bg-bg`
- `text-green` → `text-accent`
- `text-dark` → `text-fg`
- `text-mid` → `text-muted`

- [ ] **Step 2: Verify**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "Fix stale color tokens in not-found page"
```

---

### Task 8: Final Visual QA

End-to-end browser check of all changed pages.

- [ ] **Step 1: Run dev server**

Run: `npm run dev`

- [ ] **Step 2: Check /projects**

Open http://localhost:3000/projects. Verify:
- Page header renders with correct fonts and colors
- Alternating rows: Ledger (image left), Pawtopia (image right)
- Hover: image scales, title changes to accent, arrow gap increases
- Divider between rows, no divider after last row
- Mobile (<768px): stacked layout, image on top

- [ ] **Step 3: Check /projects/ledger**

Open http://localhost:3000/projects/ledger. Verify:
- Hero: category label, title, description, metadata row with dot separators
- Hero image: full-width, rounded corners
- Content: narrow column with dividers above each h2
- Components: Callout, Finding, StatsGrid, TwoCol, FigmaLink, ProjectImage all render
- Standard markdown: lists in Accessibility and Going Forward sections
- Bottom: "← Back to All Projects" link with top border

- [ ] **Step 4: Check /projects/pawtopia**

Open http://localhost:3000/projects/pawtopia. Same checks as Step 3.

- [ ] **Step 5: Check /not-found**

Open http://localhost:3000/nonexistent. Verify correct colors render.

- [ ] **Step 6: Production build**

Run: `npx next build 2>&1 | tail -15`
Expected: Build succeeds with all routes generated.

- [ ] **Step 7: Final commit if any fixes were needed**

Only if fixes were made during QA:
```bash
git add -A
git commit -m "Fix visual QA issues from projects redesign"
```
