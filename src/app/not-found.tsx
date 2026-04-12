import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-bg flex flex-col items-center justify-center px-6 pt-28 pb-20">
        <p className="text-[0.78rem] font-bold text-accent uppercase tracking-[0.15em] mb-3">
          404
        </p>
        <h1 className="font-heading text-[clamp(2rem,4vw,2.75rem)] font-bold text-fg text-center mb-4">
          Page not found
        </h1>
        <p className="text-muted text-center max-w-md mb-10 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-full font-semibold text-[0.95rem] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,89,60,0.35)]"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
