export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-[0.8rem]">
          &copy; {currentYear} Siripat Anukool
        </p>
        <p className="text-muted text-[0.8rem]">
          UX/UI Designer &mdash; Bangkok, Thailand
        </p>
      </div>
    </footer>
  );
}
