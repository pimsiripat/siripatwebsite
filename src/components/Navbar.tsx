"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/#about" },
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
      className={`fixed top-0 left-0 right-0 z-[500] transition-colors duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-sm" : ""
      }`}
    >
      <div className="px-6 lg:px-[60px] py-6 lg:py-8 flex items-center justify-between">
        <a
          href="/"
          className="text-[10px] tracking-[3px] uppercase text-foreground/50 hover:text-foreground transition-colors"
        >
          SP &mdash; Portfolio
        </a>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative text-[10px] tracking-[2px] uppercase text-foreground/35 hover:text-foreground transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-250 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

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
                className="text-[10px] tracking-[2px] uppercase text-foreground/50 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
