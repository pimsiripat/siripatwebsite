export default function About() {
  return (
    <section id="about" className="py-24 border-t border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-sm text-muted uppercase tracking-wider">
              About
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="max-w-xl">
              <p className="text-2xl font-heading leading-relaxed mb-8">
                I&apos;m Siripat, a UX/UI designer passionate about creating
                meaningful digital experiences.
              </p>
              <div className="space-y-6 text-muted leading-relaxed">
                <p>
                  With a background in both design and psychology, I approach
                  every project with a deep understanding of user behavior and
                  business goals.
                </p>
                <p>
                  I believe great design is invisible. It should feel natural,
                  intuitive, and effortless. My process centers on research,
                  iteration, and close collaboration with teams.
                </p>
                <p>
                  Currently based in Bangkok, open to remote opportunities
                  worldwide.
                </p>
              </div>

              <div className="mt-12 pt-12 border-t border-subtle">
                <p className="text-sm text-muted uppercase tracking-wider mb-6">
                  Experience with
                </p>
                <p className="text-muted">
                  Figma, Sketch, Adobe XD, Prototyping, User Research,
                  Design Systems, Interaction Design, Usability Testing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
