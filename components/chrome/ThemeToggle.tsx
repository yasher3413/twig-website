"use client";

import { useEffect, useState } from "react";

type Choice = "system" | "light" | "dark";
const ORDER: Choice[] = ["system", "light", "dark"];
const LABEL: Record<Choice, string> = { system: "Theme: match system", light: "Theme: light", dark: "Theme: dark" };

export function readTheme(): Choice {
  try {
    const t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") return t;
  } catch {}
  return "system";
}

export function cycleTheme(): Choice {
  const c = ORDER[(ORDER.indexOf(readTheme()) + 1) % ORDER.length];
  apply(c);
  return c;
}

function apply(choice: Choice) {
  const root = document.documentElement;
  if (choice === "system") delete root.dataset.theme;
  else root.dataset.theme = choice;
  try {
    if (choice === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", choice);
  } catch {}
  window.dispatchEvent(new CustomEvent("twig:theme", { detail: choice }));
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [choice, setChoice] = useState<Choice>("system");

  useEffect(() => {
    setChoice(readTheme());
    const on = (e: Event) => setChoice((e as CustomEvent<Choice>).detail);
    window.addEventListener("twig:theme", on);
    return () => window.removeEventListener("twig:theme", on);
  }, []);

  const next = () => setChoice(cycleTheme());

  return (
    <button
      type="button"
      onClick={next}
      className={`theme-toggle ${className}`}
      aria-label={`${LABEL[choice]}. Change theme`}
      title={LABEL[choice]}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        {/* A leaf half in light, half in shade; the filled half follows the choice. */}
        <circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        {choice === "system" && <path d="M9 2 A7 7 0 0 1 9 16 Z" fill="currentColor" />}
        {choice === "dark" && <circle cx="9" cy="9" r="7" fill="currentColor" />}
      </svg>
    </button>
  );
}
