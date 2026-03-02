import ScrollReveal from "@/components/ScrollReveal";

const stages = [
  {
    num: "01",
    name: "Discover",
    desc: "Listening before speaking.\nUnderstanding the silence\nbetween what users say\nand what they mean.",
  },
  {
    num: "02",
    name: "Define",
    desc: "Sharpening the question\nuntil the answer becomes\ninevitable. Constraints\nare the beginning of clarity.",
  },
  {
    num: "03",
    name: "Design",
    desc: "From rough to refined.\nEvery decision deliberate.\nEvery pixel in conversation\nwith the one beside it.",
  },
  {
    num: "04",
    name: "Deliver",
    desc: "Handing over work that\nneeds no explanation.\nDocumentation as care.\nCraft all the way through.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-[140px] px-6 lg:px-[60px] overflow-hidden">
      <ScrollReveal>
        <p className="text-[10px] tracking-[3px] uppercase text-gold mb-3">
          04 &mdash; Process
        </p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="text-[48px] font-heading font-light italic leading-[1.1] text-foreground mb-16">
          How I work
        </h2>
      </ScrollReveal>

      <div className="flex gap-[120px] overflow-x-auto pb-5 scrollbar-none" style={{ scrollbarWidth: "none" }}>
        {stages.map((stage, i) => (
          <ScrollReveal key={stage.num} delay={i * 100} className="shrink-0 w-[280px] relative group">
            <p className="text-[10px] tracking-[3px] text-gold mb-5">
              {stage.num} &middot;
            </p>
            <p className="text-[36px] font-heading font-light italic text-foreground/30 group-hover:text-pale-gold transition-colors mb-4 relative inline-block pb-2">
              {stage.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-pale-gold transition-all duration-300 ease-out group-hover:w-full" />
            </p>
            <p className="text-[11px] leading-[1.8] text-foreground/35 tracking-[0.5px] whitespace-pre-line">
              {stage.desc}
            </p>
            {i < stages.length - 1 && (
              <span className="absolute top-[48px] -right-[65px] text-gold/40 text-sm">
                &middot;
              </span>
            )}
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
