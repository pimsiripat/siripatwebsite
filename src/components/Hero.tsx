import ScrollReveal from "@/components/ScrollReveal";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 lg:px-[60px] pb-[100px] overflow-hidden">
      {/* Subtle warm radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 800px 600px at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 600px 400px at 80% 20%, rgba(139,105,20,0.06) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* Content — bottom-left aligned like reference */}
      <div className="relative z-10">
        <ScrollReveal>
          <p className="text-[10px] tracking-[4px] uppercase text-foreground/35 mb-4">
            UX / UI Designer &nbsp;&middot;&nbsp; Bangkok, Thailand
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <h1 className="font-heading leading-[0.9] mb-0">
            <span className="block text-[clamp(48px,9vw,108px)] font-light italic text-foreground">
              Siripat
            </span>
            <span className="block text-[clamp(48px,9vw,108px)] font-light italic text-pale-gold">
              Portfolio
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <div className="flex items-center gap-6 mt-8">
            <div
              className="flex-1 h-px max-w-[600px]"
              style={{ background: "linear-gradient(to right, var(--gold), transparent)" }}
            />
            <span className="text-[10px] tracking-[3px] uppercase text-foreground/35 whitespace-nowrap">
              Designing with intention &middot; 2025
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
