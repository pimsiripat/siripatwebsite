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
      <Navbar variant="light" />
      <main className="pt-20">
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="mb-16">
              <h1 className="text-4xl font-medium font-heading tracking-tight mb-4">
                Projects
              </h1>
              <p className="text-muted text-lg">
                Selected work and case studies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
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
