export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-sm text-muted uppercase tracking-wider">
              Contact
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="max-w-xl">
              <p className="text-2xl font-heading leading-relaxed mb-12">
                Have a project in mind? Let&apos;s create something great together.
              </p>

              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center text-lg font-medium border-b border-foreground pb-1 hover:opacity-60 transition-opacity mb-16"
              >
                hello@example.com
              </a>

              <div className="flex gap-8">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Dribbble
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
