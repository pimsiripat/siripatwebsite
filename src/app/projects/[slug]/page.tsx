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
      <main className="min-h-screen bg-cream pt-20">
        {/* Hero Section */}
        <section className="pt-8 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <p className="text-[0.78rem] font-bold text-green uppercase tracking-[0.1em] mb-4">
                {frontmatter.category}
              </p>
              <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-dark">
                {frontmatter.title}
              </h1>
              <p className="text-xl text-mid max-w-2xl">
                {frontmatter.description}
              </p>
            </div>

            {/* Project Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-pink-light">
              {Object.entries(frontmatter.meta).map(([key, value]) => (
                <div key={key}>
                  <p className="text-[0.75rem] font-bold text-green uppercase tracking-[0.1em] mb-1">
                    {key}
                  </p>
                  <p className="font-medium text-dark">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-[16/9] rounded-[28px] overflow-hidden bg-pink-light">
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

        {/* Back to Projects */}
        <section className="px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-green text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(134,167,136,0.35)]"
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
                  strokeWidth={2}
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
