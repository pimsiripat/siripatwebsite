import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.link}
      className="project-card-interactive group block relative bg-card border border-subtle rounded-lg overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
    >
      {/* Gold left-edge sweep */}
      <div className="absolute left-0 top-0 w-0.5 h-0 bg-gold transition-all duration-350 ease-out group-hover:h-full z-10" />

      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <p className="text-xs text-gold uppercase tracking-wider mb-2">
          {project.category}
        </p>
        <h3 className="text-xl font-medium font-heading mb-2 text-foreground group-hover:text-pale-gold transition-colors">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
    </a>
  );
}
