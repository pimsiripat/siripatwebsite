export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            {currentYear} Siripat
          </p>
          <p className="text-sm text-muted">
            Designed & built with care
          </p>
        </div>
      </div>
    </footer>
  );
}
