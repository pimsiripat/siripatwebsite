"use client";

import { useState } from "react";

const navLinks = [
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

interface NavbarProps {
  variant?: "light" | "dark";
}

export default function Navbar({ variant = "dark" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isLight = variant === "light";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isLight ? "bg-background/90 backdrop-blur-sm border-b border-subtle" : ""}`}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="/"
            className={`text-base font-medium tracking-tight ${isLight ? "text-foreground" : "text-white"}`}
          >
            Siripat
          </a>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors ${isLight ? "text-muted hover:text-foreground" : "text-white/70 hover:text-white"}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            className={`md:hidden p-2 -mr-2 ${isLight ? "text-foreground" : "text-white"}`}
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
          <div className="md:hidden pb-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-colors ${isLight ? "text-muted hover:text-foreground" : "text-white/70 hover:text-white"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
