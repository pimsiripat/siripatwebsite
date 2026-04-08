import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects | Siripat",
  description: "Browse my selected UX/UI design projects and case studies.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-cream">
        <section className="py-24">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
            <div className="mb-16">
              <p className="text-[0.78rem] font-bold text-green uppercase tracking-[0.15em] mb-3">
                All Work
              </p>
              <h1 className="font-heading text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.2] text-dark mb-4">
                Projects
              </h1>
              <p className="text-mid text-[1rem] leading-[1.7]">
                Selected work and case studies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
