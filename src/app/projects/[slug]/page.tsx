import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getProjectBySlug(slug);
    return {
      title: `${frontmatter.title} - Case Study | Siripat`,
      description: frontmatter.description,
    };
  } catch {
    return { title: "Project Not Found" };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  let project;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-20">
        {/* Hero Section */}
        <section className="pt-8 pb-12 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-accent mb-3">
              {frontmatter.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-fg mb-4">
              {frontmatter.title}
            </h1>
            <p className="text-muted text-[0.95rem] leading-relaxed mb-8 max-w-2xl">
              {frontmatter.description}
            </p>

            {/* Metadata Row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 border-y border-border text-sm">
              {Object.entries(frontmatter.meta).map(([key, value]) => (
                <span key={key} className="text-muted">
                  <span className="font-semibold text-fg">{key}</span> · {value}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface">
              <Image
                src={frontmatter.heroImage}
                alt={`${frontmatter.title} Mockup`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* MDX Content */}
        <article className="px-6 pb-16 overflow-x-hidden">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
              blockJS: false,
            }}
          />
        </article>

        {/* Back to Projects */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto pt-8 border-t border-border">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-fg font-medium hover:text-accent transition-colors duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to All Projects
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
