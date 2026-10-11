"use client";

import { useEffect, useRef } from "react";
import styles from "./motion.module.css";

// Content is visible by default. Only elements still below the fold when
// the page hydrates opt in to a reveal, so nothing is ever hidden without JS
// and nothing already on screen blinks.
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  as?: "div" | "section" | "li" | "p" | "figure";
  delay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;
    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`${styles.reveal} ${className}`} style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined} {...rest}>
      {children}
    </Tag>
  );
}
