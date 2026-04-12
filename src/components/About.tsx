import ScrollReveal from "@/components/ScrollReveal";

const capabilities = [
  "User Research",
  "Wireframing",
  "Prototyping",
  "Visual Design",
  "Design Systems",
  "Usability Testing",
];

export default function About() {
  return (
    <section id="about" className="py-[100px] px-6 lg:px-10 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
          <ScrollReveal>
            <div>
              <p className="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
                About
              </p>
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-fg mb-8">
                A bit about me
              </h2>
              <div className="space-y-5 text-muted text-[0.95rem] leading-[1.8]">
                <p>
                  I&apos;m <strong className="text-fg">Siripat Anukool</strong>, a UX/UI
                  Designer with a foundation in user-centered design, research, and visual
                  communication.
                </p>
                <p>
                  My background in education, sales, and marketing gave me a deep
                  understanding of user needs and behavior — which now drives my approach
                  to creating intuitive digital experiences.
                </p>
                <p>
                  I enjoy transforming complex ideas into simple, usable interfaces.
                  My work is guided by empathy, clarity, and a desire to solve real
                  problems through thoughtful design.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div>
              <p className="text-[0.75rem] tracking-[0.2em] uppercase text-muted mb-6">
                What I Do
              </p>
              <div className="space-y-0">
                {capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="flex items-center justify-between py-4 border-b border-border group"
                  >
                    <span className="text-fg text-[1rem]">{cap}</span>
                    <svg
                      className="w-4 h-4 text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 border border-border rounded-lg">
                <p className="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
                  Goal
                </p>
                <p className="text-muted text-[0.9rem] leading-[1.7]">
                  To grow within a product-driven team, contribute to impactful
                  user experiences, and develop into a designer who creates
                  solutions that genuinely improve people&apos;s daily lives.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
