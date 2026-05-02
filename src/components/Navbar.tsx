"use client";

import { useState, useEffect, useId } from "react";
import Logo from "./Logo";

const navLinks = [
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Process", href: "/#process" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <a
          href="/"
          className="inline-flex items-center transition-opacity duration-200 hover:opacity-60"
          aria-label="Pim — Home"
        >
          <Logo size={40} />
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-[0.875rem] tracking-wide text-muted hover:text-fg transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden md:inline-block text-[0.875rem] tracking-wide text-fg border border-fg px-5 py-2 rounded-full transition-all duration-200 hover:bg-fg hover:text-bg"
        >
          Get in Touch
        </a>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-fg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls={mobileMenuId}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div id={mobileMenuId} className="md:hidden px-6 pb-8 border-b border-border" role="region" aria-label="Primary">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[0.95rem] text-muted hover:text-fg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/#contact"
              className="inline-block text-center text-fg border border-fg px-6 py-2.5 rounded-full text-[0.9rem] mt-2"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
