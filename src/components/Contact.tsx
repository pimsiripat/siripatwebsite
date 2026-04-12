import ScrollReveal from "@/components/ScrollReveal";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com";
const linkedinUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com";

export default function Contact() {
  return (
    <section id="contact" className="py-[100px] px-6 lg:px-10 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div className="max-w-[600px]">
            <p className="text-[0.75rem] tracking-[0.2em] uppercase text-accent mb-3">
              Contact
            </p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-fg mb-6">
              Let&apos;s work together
            </h2>
            <p className="text-muted text-[1rem] leading-[1.8] mb-12">
              Have a project in mind or looking for a UX/UI designer?
              I&apos;d love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href={`mailto:${contactEmail}`}
              className="group flex items-center gap-4 border border-border rounded-lg px-6 py-5 transition-all duration-200 hover:border-fg"
            >
              <svg className="w-5 h-5 text-muted group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-[0.7rem] tracking-[0.15em] uppercase text-muted mb-0.5">Email</p>
                <p className="text-fg text-[0.9rem]">{contactEmail}</p>
              </div>
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border border-border rounded-lg px-6 py-5 transition-all duration-200 hover:border-fg"
            >
              <svg className="w-5 h-5 text-muted group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <div>
                <p className="text-[0.7rem] tracking-[0.15em] uppercase text-muted mb-0.5">LinkedIn</p>
                <p className="text-fg text-[0.9rem]">Siripat Anukool</p>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
