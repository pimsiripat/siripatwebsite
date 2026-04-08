export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-10 px-6 opacity-90">
      <p className="text-[0.9rem]">
        Designed with <span className="text-green">&hearts;</span> by{" "}
        <strong>Siripat Anukool (Pim)</strong> &middot; UX/UI Designer &middot;
        Bangkok, Thailand
      </p>
      <p className="mt-2 opacity-50 text-[0.8rem]">
        &copy; {currentYear} All rights reserved
      </p>
    </footer>
  );
}
