import ScrollReveal from "@/components/ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="py-[140px] px-6 lg:px-[60px] pb-[100px] text-center relative">
      {/* Gold gradient divider */}
      <div
        className="absolute top-0 left-[60px] right-[60px] h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)" }}
      />

      <ScrollReveal>
        <p className="text-[40px] font-heading font-light italic text-foreground mb-10">
          &ldquo;Let&apos;s make something considered.&rdquo;
        </p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <a
          href="mailto:hello@example.com"
          className="inline-block text-[22px] font-light text-foreground/50 relative group mb-12 transition-colors hover:text-gold"
        >
          hello@example.com
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-250 ease-out group-hover:w-full" />
        </a>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="flex justify-center items-center gap-5">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[2px] uppercase text-foreground/35 hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-gold/30 text-xs">&middot;</span>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[2px] uppercase text-foreground/35 hover:text-foreground transition-colors"
          >
            Dribbble
          </a>
          <span className="text-gold/30 text-xs">&middot;</span>
          <a
            href="#"
            className="text-[10px] tracking-[2px] uppercase text-foreground/35 hover:text-foreground transition-colors"
          >
            Resume
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
