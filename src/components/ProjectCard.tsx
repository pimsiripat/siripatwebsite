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
