export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center -mt-20 bg-foreground overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-foreground to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-medium font-heading leading-tight tracking-tight mb-8 text-white">
          Siripat — UX/UI Designer
        </h1>
        <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-12">
          Creating intuitive, user-centered experiences through research,
          strategy, and thoughtful design.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/projects"
            className="px-6 py-3 bg-white text-foreground text-sm font-medium rounded-md hover:bg-white/90 transition-colors"
          >
            All projects
          </a>
          <a
            href="/#contact"
            className="px-6 py-3 border border-white/30 text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
