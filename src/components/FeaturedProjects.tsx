import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function FeaturedProjects() {
  return (
    <section id="work" className="py-[100px] px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div className="flex items-baseline justify-between mb-14">
            <div>
              <p className="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
                Selected Work
              </p>
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-fg">
                Recent Projects
              </h2>
            </div>
            <span className="hidden sm:block text-[0.8rem] text-muted tracking-wide">
              {String(projects.length).padStart(2, "0")} projects
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 120}>
              <ProjectCard project={project} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
