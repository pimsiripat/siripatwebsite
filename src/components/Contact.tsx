import ScrollReveal from "@/components/ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="py-[100px] px-6 lg:px-[60px] bg-cream">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-[0.78rem] font-bold text-green uppercase tracking-[0.15em] mb-3">
              Get In Touch
            </p>
            <h2 className="font-heading text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.2] text-dark mb-4">
              Let&apos;s create something
              <br />
              <em className="text-green">beautiful</em> together
            </h2>
            <p className="text-mid text-[1rem] leading-[1.8] max-w-[480px] mx-auto mb-12">
              Have a project in mind or just want to say hello? I&apos;d love to
              connect — feel free to reach out anytime!
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex justify-center gap-7 flex-wrap">
            <a
              href="mailto:hello@example.com"
              className="project-card-interactive flex flex-col items-center gap-2.5 bg-pink-light border-2 border-transparent rounded-[28px] px-[52px] py-9 text-dark transition-all duration-250 hover:bg-green hover:text-white hover:border-green hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(134,167,136,0.3)] min-w-[220px]"
            >
              <span className="text-[2.2rem]">✉️</span>
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.12em] opacity-60">
                Email
              </span>
              <span className="text-[0.95rem] font-semibold">
                hello@example.com
              </span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-interactive flex flex-col items-center gap-2.5 bg-pink-light border-2 border-transparent rounded-[28px] px-[52px] py-9 text-dark transition-all duration-250 hover:bg-green hover:text-white hover:border-green hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(134,167,136,0.3)] min-w-[220px]"
            >
              <span className="text-[2.2rem]">💼</span>
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.12em] opacity-60">
                LinkedIn
              </span>
              <span className="text-[0.95rem] font-semibold">
                Siripat Anukool
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
