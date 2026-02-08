import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.link}
      className="group block border border-subtle rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
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
        <p className="text-xs text-muted uppercase tracking-wider mb-2">
          {project.category}
        </p>
        <h3 className="text-xl font-medium font-heading mb-2 group-hover:opacity-60 transition-opacity">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
    </a>
  );
}
