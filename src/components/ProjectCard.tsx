import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.link}
      className="project-card-interactive group block bg-cream rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_24px_60px_rgba(134,167,136,0.2)]"
    >
      <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-green/20 to-pink-light/40">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-7">
        <p className="text-[0.75rem] font-semibold text-green uppercase tracking-[0.1em] mb-2">
          {project.category}
        </p>
        <h3 className="text-[1.3rem] font-heading font-bold leading-[1.3] text-dark mb-2.5 group-hover:text-green transition-colors">
          {project.title}
        </h3>
        <p className="text-mid text-[0.88rem] leading-[1.6] mb-5">
          {project.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-green text-[0.88rem] font-semibold group-hover:gap-2.5 transition-all duration-200">
          View Case Study <span>&rarr;</span>
        </span>
      </div>
    </a>
  );
}
