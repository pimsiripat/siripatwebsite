import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Research users, stakeholders, and the problem space through interviews, surveys, and competitive analysis.",
  },
  {
    num: "02",
    title: "Define",
    desc: "Synthesize insights into personas, journey maps, and a clear problem statement to guide decisions.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Ideate, wireframe, and prototype — iterating rapidly with feedback loops to refine solutions.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "Handoff production-ready designs with documentation, collaborate with developers, and measure impact.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-[100px] px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div className="mb-14">
            <p className="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
              Process
            </p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-fg">
              How I Work
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 100}>
              <div className="py-8 lg:px-6 lg:first:pl-0 lg:last:pr-0 border-t border-border">
                <span className="text-[0.75rem] text-accent tracking-wide block mb-4">
                  {step.num}
                </span>
                <h3 className="text-fg text-[1.15rem] font-medium mb-3">
                  {step.title}
                </h3>
                <p className="text-muted text-[0.85rem] leading-[1.7]">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
