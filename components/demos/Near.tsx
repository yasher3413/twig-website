"use client";

import { useEffect, useRef, useState } from "react";

// Mounts its children only when they come within reach of the viewport, so
// a demo's script loads when you're about to see it. The placeholder holds
// the demo's height, so nothing shifts when it arrives.
export function Near({ children, minHeight, label }: { children: React.ReactNode; minHeight: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ minHeight }} aria-busy={!near} aria-label={!near ? label : undefined}>
      {near ? children : null}
    </div>
  );
}
