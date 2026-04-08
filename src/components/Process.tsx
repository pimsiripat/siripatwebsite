import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    emoji: "🔍",
    title: "Discover",
    desc: "Research users, stakeholders, and the problem space through interviews, surveys, and competitive analysis.",
  },
  {
    emoji: "💡",
    title: "Define",
    desc: "Synthesize insights into user personas, journey maps, and a clear problem statement to guide design decisions.",
  },
  {
    emoji: "✏️",
    title: "Design",
    desc: "Ideate, wireframe, and prototype — iterating rapidly with feedback loops to refine solutions that work.",
  },
  {
    emoji: "🚀",
    title: "Deliver",
    desc: "Handoff pixel-perfect designs with documentation, collaborate with developers, and measure real-world impact.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-[100px] px-6 lg:px-[60px] bg-cream">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-[60px]">
            <p className="text-[0.78rem] font-bold text-green uppercase tracking-[0.15em] mb-3">
              How I Work
            </p>
            <h2 className="font-heading text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.2] text-dark mb-4">
              My Design Process
            </h2>
            <p className="text-mid text-[1rem] leading-[1.7] max-w-[520px] mx-auto">
              Every great experience starts with understanding people — then crafting
              solutions they&apos;ll love.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Connecting line (desktop only) */}
            <div
              className="hidden lg:block absolute top-[48px] left-[10%] right-[10%] h-0.5 rounded-full z-0"
              style={{ background: "linear-gradient(90deg, var(--green), var(--pink-light), var(--green))" }}
            />

            {steps.map((step, i) => (
              <div key={step.title} className="text-center relative z-10 px-4 group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-[1.8rem] mx-auto mb-5 bg-cream border-[3px] border-pink-light shadow-[0_4px_20px_rgba(134,167,136,0.1)] transition-all duration-300 group-hover:bg-green group-hover:border-green group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(134,167,136,0.3)]">
                  {step.emoji}
                </div>
                <h3 className="font-heading text-[1.1rem] font-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-mid text-[0.85rem] leading-[1.6]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
