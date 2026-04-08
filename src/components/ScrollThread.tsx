"use client";

import { useEffect, useRef } from "react";

export default function ScrollThread() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      el.style.height = `${Math.max(10, 80 * (1 - pct))}px`;
      el.style.opacity = pct > 0.95 ? "0" : "0.4";
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed right-8 top-1/2 -translate-y-1/2 w-px z-[100] hidden md:block"
      style={{
        height: 80,
        background: "linear-gradient(to bottom, var(--green), transparent)",
        opacity: 0.4,
        transition: "height 0.3s ease",
      }}
    />
  );
}
