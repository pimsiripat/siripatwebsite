import ScrollReveal from "@/components/ScrollReveal";

const tags = [
  { label: "Empathy-Driven", accent: true },
  { label: "Visual Communication", accent: false },
  { label: "Problem Solver", accent: false },
  { label: "User-Centered", accent: false },
  { label: "Research-Backed", accent: false },
  { label: "Lifelong Learner", accent: false },
];

export default function About() {
  return (
    <section id="about" className="py-[100px] px-6 lg:px-[60px] bg-pink-light">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
          <ScrollReveal>
            <div className="bg-cream rounded-[40px] p-[50px] text-center">
              <span className="text-[4rem] block mb-4">🌱</span>
              <p className="font-heading text-[1.2rem] italic text-dark leading-[1.6]">
                &ldquo;Design is not just what it looks like — it&apos;s{" "}
                <span className="text-green">how it feels.</span>&rdquo;
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <p className="text-[0.78rem] font-bold text-green uppercase tracking-[0.15em] mb-3">
                About Me
              </p>
              <h2 className="font-heading text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.2] text-dark mb-4">
                Nice to meet you,
                <br />
                I&apos;m <em className="text-green">Pim!</em>
              </h2>
              <p className="text-mid leading-[1.8] mb-6 text-[1rem]">
                I&apos;m <strong>Siripat Anukool</strong>, a UX/UI Designer with a strong
                foundation in user-centered design, research, and visual communication.
                My background in education, sales, and marketing has given me a deep
                understanding of user needs, behavior, and communication — all of which
                now drive my approach to creating intuitive and meaningful digital
                experiences.
              </p>
              <p className="text-mid leading-[1.8] mb-7 text-[1rem]">
                My work is guided by empathy, clarity, and a genuine desire to solve
                real problems through thoughtful design. I enjoy transforming complex
                ideas into simple, usable interfaces.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`tag-interactive px-[18px] py-2 rounded-full text-[0.85rem] font-medium border-[1.5px] transition-all duration-200 hover:-translate-y-0.5 ${
                      tag.accent
                        ? "bg-green text-white border-green"
                        : "bg-white text-dark border-pink-soft hover:bg-green hover:text-white hover:border-green"
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <div className="bg-gradient-to-br from-green to-[#a8c9aa] rounded-3xl p-7 relative overflow-hidden">
                <p className="text-[0.75rem] font-bold text-white/70 uppercase tracking-[0.12em] mb-2">
                  My Goal
                </p>
                <p className="text-white text-[0.92rem] leading-[1.7]">
                  To grow as a UX/UI Designer within a product-driven team, contribute
                  to impactful user experiences, and continue developing into a
                  well-rounded designer who creates solutions that genuinely improve
                  people&apos;s daily lives.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
