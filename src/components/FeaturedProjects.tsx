import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 2);

  return (
    <section id="work" className="py-[100px] px-6 lg:px-[60px] bg-pink-soft">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="mb-[60px]">
            <p className="text-[0.78rem] font-bold text-green uppercase tracking-[0.15em] mb-3">
              Selected Work
            </p>
            <h2 className="font-heading text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.2] text-dark mb-4">
              Projects I&apos;m Proud Of
            </h2>
            <p className="text-mid text-[1rem] leading-[1.7] max-w-[520px]">
              A curated selection of case studies where design met real human needs.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 100}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="flex justify-center mt-11">
            <Link
              href="/projects"
              className="project-card-interactive inline-flex items-center gap-2.5 bg-transparent text-dark border-2 border-pink-light px-9 py-3.5 rounded-full text-[0.95rem] font-semibold transition-all duration-300 hover:border-green hover:text-green hover:-translate-y-0.5"
            >
              See More Projects <span>&darr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
