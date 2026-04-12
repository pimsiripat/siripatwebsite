import Image from "next/image";
import React from "react";

// --- Kept Components (6) ---

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto bg-accent/5 border-l-3 border-accent px-5 py-4 rounded-r-lg mb-8 [&>p]:mb-0 [&>p]:text-fg">
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
    <div className="max-w-3xl mx-auto border-l-2 border-accent pl-5 mb-6">
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
    <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
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
    <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10 mb-8">{children}</div>
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
      className="max-w-3xl mx-auto inline-flex items-center gap-2 text-accent hover:underline mb-6"
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
