import Image from "next/image";
import React from "react";

// --- Layout Components ---

function Section({
  bg,
  children,
}: {
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`px-6 py-16 ${bg === "card" ? "bg-card" : ""}`}>
      {children}
    </section>
  );
}

function Narrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl mx-auto ${className || ""}`}>{children}</div>
  );
}

function Wide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-5xl mx-auto ${className || ""}`}>{children}</div>
  );
}

// --- Content Components ---

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
    <div className="max-w-6xl mx-auto mt-8">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-card">
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

function TwoColumn({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-12">{children}</div>;
}

function Column({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg mb-6 font-medium [&>p]:mb-0">
      {children}
    </div>
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

function Finding({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-accent pl-6 mb-6">
      <p className="font-medium mb-2">{title}</p>
      <div className="text-muted text-sm [&>p]:mb-0">{children}</div>
    </div>
  );
}

function PainPoint({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-subtle pl-6 mb-6">
      <p className="font-medium mb-2">{title}</p>
      {children && <div className="text-muted text-sm [&>p]:mb-0">{children}</div>}
    </div>
  );
}

function StatsGrid({
  items,
  cardBg,
}: {
  items: { label: string; value: string }[];
  cardBg?: "background" | "card";
}) {
  const bgClass = cardBg === "background" ? "bg-background" : "bg-card";
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {items.map((item) => (
        <div key={item.label} className={`${bgClass} p-6 rounded-lg`}>
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            {item.label}
          </p>
          <p className="font-medium">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function AccessibilityGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-3 gap-8">{children}</div>;
}

function AccessibilityItem({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: "eye" | "list" | "mobile";
  children: React.ReactNode;
}) {
  const icons = {
    eye: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    ),
    list: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h7"
      />
    ),
    mobile: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    ),
  };

  return (
    <div>
      {icon && (
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {icons[icon]}
          </svg>
        </div>
      )}
      <h3 className="font-bold mb-2">{title}</h3>
      <div className="text-muted text-sm">{children}</div>
    </div>
  );
}

function NextSteps({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3 text-muted">{children}</div>;
}

function Step({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-accent mt-1">{number}.</span>
      <div>{children}</div>
    </div>
  );
}

function ImpactList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3 text-muted mb-6">{children}</div>;
}

function ImpactItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-accent mt-1">&bull;</span>
      <div>{children}</div>
    </div>
  );
}

// --- MDX Component Mapping ---

export const mdxComponents = {
  // Layout
  Section,
  Narrow,
  Wide,
  // Content
  ProjectImage,
  TwoColumn,
  Column,
  Callout,
  FigmaLink,
  Finding,
  PainPoint,
  StatsGrid,
  AccessibilityGrid,
  AccessibilityItem,
  NextSteps,
  Step,
  ImpactList,
  ImpactItem,
  // Markdown element overrides
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-3xl font-bold font-heading mb-6">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl font-bold font-heading mb-4">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-muted leading-relaxed mb-6 last:mb-0">{children}</p>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) =>
    src ? (
      <span className="block relative aspect-[16/9] rounded-xl overflow-hidden bg-card my-8">
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-contain"
        />
      </span>
    ) : null,
};
