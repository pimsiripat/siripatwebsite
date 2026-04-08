"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    let raf: number;
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

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button'], .project-card-interactive, .tag-interactive").forEach((el) => {
        el.addEventListener("mouseenter", () => setExpanded(true));
        el.addEventListener("mouseleave", () => setExpanded(false));
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [visible]);

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
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, transform 0.15s",
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          width: expanded ? 48 : 36,
          height: expanded ? 48 : 36,
          border: `2px solid var(--green)`,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, opacity 0.3s",
          opacity: visible ? 0.5 : 0,
        }}
      />
    </>
  );
}
