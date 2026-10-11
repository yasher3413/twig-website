"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// A gentle pull toward the cursor (adapted from 21st.dev's Magnetic by
// ibelick), re-tuned to settle without overshoot: twig's motion never
// bounces. Only on fine pointers, never under reduced motion.
export function Magnetic({ children, strength = 0.18, range = 90, className }: { children: React.ReactNode; strength?: number; range?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      const reach = range + Math.max(r.width, r.height) / 2;
      if (d < reach) {
        const k = (1 - d / reach) * strength;
        x.set(Math.max(-6, Math.min(6, dx * k)));
        y.set(Math.max(-5, Math.min(5, dy * k)));
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [range, strength, x, y]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }} className={className}>
      {children}
    </motion.div>
  );
}
