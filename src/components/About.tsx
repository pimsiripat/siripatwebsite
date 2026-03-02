import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-[140px] px-6 lg:px-[60px] bg-ivory text-espresso">
      <ScrollReveal>
        <p className="text-[10px] tracking-[3px] uppercase text-[#8B6914] mb-3">
          03 &mdash; About
        </p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="text-[48px] font-heading font-light italic leading-[1.1] text-espresso mb-16">
          Philosophy
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-start">
        <ScrollReveal delay={200}>
          <div className="text-xl italic font-light leading-[1.8] text-espresso">
            <p>
              I believe the best interface is the one you stop noticing.
              When design disappears into the experience &mdash; when friction
              dissolves and the user simply <em>moves</em> &mdash; that is when
              the work is finished.
            </p>
            <p className="mt-7">
              My practice is built on the conviction that restraint is a form of
              generosity. Every element I remove is one less thing standing
              between a person and what they came to do.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={350}>
          <div className="space-y-10">
            <div>
              <p className="text-[9px] tracking-[3px] uppercase text-espresso/40 mb-4">
                Disciplines
              </p>
              <ul className="space-y-0">
                {["UX Research & Strategy", "Product Design", "Design Systems", "Interaction Design", "Prototyping"].map((item) => (
                  <li key={item} className="text-[13px] text-espresso/70 flex items-center gap-2.5 py-2 border-b border-espresso/8">
                    <span className="text-[#8B6914] shrink-0">&mdash;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[9px] tracking-[3px] uppercase text-espresso/40 mb-4">
                Tools
              </p>
              <ul className="space-y-0">
                {["Figma \u00B7 FigJam", "Framer \u00B7 Webflow", "HTML \u00B7 CSS \u00B7 JS"].map((item) => (
                  <li key={item} className="text-[13px] text-espresso/70 flex items-center gap-2.5 py-2 border-b border-espresso/8">
                    <span className="text-[#8B6914] shrink-0">&mdash;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[9px] tracking-[3px] uppercase text-espresso/40 mb-4">
                Experience
              </p>
              <ul className="space-y-0">
                {["Background in design & psychology", "Based in Bangkok, Thailand", "Open to remote worldwide"].map((item) => (
                  <li key={item} className="text-[13px] text-espresso/70 flex items-center gap-2.5 py-2 border-b border-espresso/8">
                    <span className="text-[#8B6914] shrink-0">&mdash;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
