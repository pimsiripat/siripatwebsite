"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], .project-card-interactive, .tag-interactive";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const applyVisible = (v: boolean) => {
      if (dotRef.current) dotRef.current.style.opacity = v ? "1" : "0";
      if (ringRef.current) ringRef.current.style.opacity = v ? "0.5" : "0";
    };

    const applyExpanded = (expanded: boolean) => {
      if (!ringRef.current) return;
      const s = expanded ? 48 : 36;
      ringRef.current.style.width = `${s}px`;
      ringRef.current.style.height = `${s}px`;
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      applyExpanded(!!hit?.closest(INTERACTIVE_SELECTOR));
      applyVisible(true);
    };

    const onLeave = () => applyVisible(false);
    const onEnter = () => applyVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf = 0;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 12,
          height: 12,
          background: "var(--green)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "multiply",
          opacity: 0,
          transition: "opacity 0.3s, transform 0.15s",
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          width: 36,
          height: 36,
          border: `2px solid var(--green)`,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, opacity 0.3s",
          opacity: 0,
        }}
      />
    </>
  );
}
