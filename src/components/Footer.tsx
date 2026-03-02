export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 lg:px-[60px] py-8 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-gold/8">
      <p className="text-[9px] tracking-[2px] uppercase text-foreground/20">
        &copy; {currentYear} Siripat
      </p>
      <p className="text-[9px] tracking-[2px] uppercase text-foreground/20">
        Designed with intention
      </p>
    </footer>
  );
}
