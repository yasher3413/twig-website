"use client";

import { useEffect, useRef } from "react";

// A gentle pull toward the cursor (the idea adapted from 21st.dev's Magnetic
// by ibelick), written without an animation library and settling without
// overshoot: twig's motion never bounces. Fine pointers only, never under
// reduced motion.
export function Magnetic({ children, strength = 0.18, range = 90, className }: { children: React.ReactNode; strength?: number; range?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left - x + r.width / 2);
      const dy = e.clientY - (r.top - y + r.height / 2);
      const reach = range + Math.max(r.width, r.height) / 2;
      const d = Math.hypot(dx, dy);
      const k = d < reach ? (1 - d / reach) * strength : 0;
      x = Math.max(-6, Math.min(6, dx * k));
      y = Math.max(-5, Math.min(5, dy * k));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = x || y ? `translate3d(${x}px, ${y}px, 0)` : "";
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [range, strength]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-block", transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)", willChange: "transform" }}>
      {children}
    </div>
  );
}
