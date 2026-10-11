"use client";

import { useEffect, useRef, useState } from "react";
import { SHORTCUTS, type Shortcut } from "@/content/shortcuts";
import styles from "./keyboard.module.css";

/* Key caps that press down when you press the same keys (keycap behaviour
   adapted from 21st.dev's Kbd Key, re-cut in twig's materials). It listens
   while the chapter is on screen; inside the practice area it also keeps
   harmless chords from triggering your browser. It never blocks ⌘W, ⌘T,
   ⌘N, ⌘Q, ⌘L or ⌘R. */

const NEVER_BLOCK = new Set(["w", "t", "n", "q", "l", "r"]);

function matches(s: Shortcut, e: KeyboardEvent): boolean {
  const k = s.keys;
  const wantShift = k.includes("⇧");
  const wantAlt = k.includes("⌥");
  const wantCmd = k.includes("⌘");
  if (wantCmd !== (e.metaKey || e.ctrlKey) || wantShift !== e.shiftKey || wantAlt !== e.altKey) return false;
  const last = k[k.length - 1];
  const code = e.code; // layout-independent for letters with ⌥ held
  const letter = code.startsWith("Key") ? code.slice(3).toLowerCase() : code.startsWith("Digit") ? code.slice(5) : e.key.toLowerCase();
  if (last === "1–9") return /^[1-9]$/.test(letter);
  if (last === "[ ]") return code === "BracketLeft" || code === "BracketRight";
  if (last === "+ − 0") return ["Equal", "Minus", "Digit0"].includes(code);
  if (last === ",") return code === "Comma";
  return letter === last.toLowerCase();
}

export function KeyboardDemo() {
  const region = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState<number | null>(null);
  const [held, setHeld] = useState({ meta: false, shift: false, alt: false });
  const [said, setSaid] = useState("");
  const timer = useRef<number>(0);

  useEffect(() => {
    let onScreen = false;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), { threshold: 0.2 });
    if (region.current) io.observe(region.current);
    const down = (e: KeyboardEvent) => {
      setHeld({ meta: e.metaKey || e.ctrlKey, shift: e.shiftKey, alt: e.altKey });
      if (!onScreen) return;
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const i = SHORTCUTS.findIndex((s) => matches(s, e));
      if (i < 0) return;
      const inside = region.current?.contains(document.activeElement);
      const letter = e.code.startsWith("Key") ? e.code.slice(3).toLowerCase() : "";
      if (inside && !NEVER_BLOCK.has(letter) && SHORTCUTS[i].keys[1] !== "K") e.preventDefault();
      setLit(i);
      setSaid(`${SHORTCUTS[i].keys.join(" ")}: ${SHORTCUTS[i].action}`);
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setLit(null), 900);
    };
    const up = (e: KeyboardEvent) => setHeld({ meta: e.metaKey || e.ctrlKey, shift: e.shiftKey, alt: e.altKey });
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", () => setHeld({ meta: false, shift: false, alt: false }));
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const groups = ["Tabs", "Pages", "Remembering", "Window"] as const;
  const pressed = (k: string, i: number) =>
    lit === i || (k === "⌘" && held.meta) || (k === "⇧" && held.shift) || (k === "⌥" && held.alt);

  return (
    <div ref={region} className={styles.board} tabIndex={0} aria-label="Shortcut practice area. Press any twig shortcut.">
      <p className={styles.say} aria-live="polite">
        {said ? (
          <>
            <span className={styles.sayLabel}>You pressed</span> {said}
          </>
        ) : (
          <>Press a shortcut, like ⌘K or ⇧⌘F. Click here first to keep your browser from acting on it.</>
        )}
      </p>
      <div className={styles.groups}>
        {groups.map((g) => (
          <div key={g} className={styles.group}>
            <p className={styles.groupName}>{g}</p>
            <ul>
              {SHORTCUTS.map((s, i) =>
                s.group !== g ? null : (
                  <li key={s.action} className={styles.row} data-lit={lit === i}>
                    <span className={styles.caps} aria-label={s.keys.join(" ")}>
                      {s.keys.map((k) => (
                        <kbd key={k} className={styles.cap} data-down={pressed(k, i)} data-wide={k.length > 2}>
                          {k}
                        </kbd>
                      ))}
                    </span>
                    <span className={styles.action}>{s.action}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
