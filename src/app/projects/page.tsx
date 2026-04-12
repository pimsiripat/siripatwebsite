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
