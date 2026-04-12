import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const href = project.link ?? "#";
  const isInternalRoute = href.startsWith("/") && href !== "#";
  const num = String(index + 1).padStart(2, "0");

  const inner = (
    <div className="group">
      <div className="aspect-[3/2] overflow-hidden rounded-lg bg-surface">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-[0.75rem] text-muted tracking-wide">{num}</span>
          <span className="text-[0.75rem] tracking-[0.15em] uppercase text-accent">
            {project.category}
          </span>
        </div>
        <h3 className="font-heading text-[1.6rem] text-fg mb-2 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-muted text-[0.9rem] leading-[1.65] mb-4 max-w-[440px]">
          {project.description}
        </p>
        <span className="inline-flex items-center gap-2 text-[0.85rem] text-fg tracking-wide group-hover:gap-3 transition-all duration-200">
          Read Case Study
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </div>
  );

  if (isInternalRoute) {
    return (
      <Link href={href} className="block relative">
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} className="block relative">
      {inner}
    </a>
  );
}
