"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Work", href: "/#work" },
  { name: "Process", href: "/#process" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-400 ${
        scrolled ? "bg-cream/85 backdrop-blur-2xl shadow-[0_2px_24px_rgba(134,167,136,0.10)]" : ""
      }`}
    >
      <div className="px-6 lg:px-[60px] py-5 lg:py-6 flex items-center justify-between">
        <a
          href="/"
          className="inline-flex items-center transition-transform duration-200 hover:-translate-y-0.5"
          aria-label="Pim — Home"
        >
          <Logo size={44} />
        </a>

        <ul className="hidden md:flex items-center gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative text-[0.9rem] font-medium text-mid hover:text-green transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green rounded-full transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden md:inline-block bg-green text-white px-6 py-2.5 rounded-full text-[0.9rem] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(134,167,136,0.35)]"
        >
          Hire Me
        </a>

        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[0.9rem] font-medium text-mid hover:text-green transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/#contact"
              className="inline-block bg-green text-white px-6 py-2.5 rounded-full text-[0.9rem] font-medium text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
