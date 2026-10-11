"use client";

import { useMemo, useState } from "react";
import { TwigIcon } from "@/components/twig-ui/TwigIcon";
import { openPalette } from "@/components/chrome/PaletteTrigger";
import "@/components/twig-ui/twig-ui.css";
import styles from "./palette.module.css";

type Row = { group: string; label: string; snippet?: string; detail?: string; kbd?: string; icon: "globe" | "star" | "history" | "recall" | "settings" | "moon" | "split" };
const ROWS: Row[] = [
  { group: "Open tabs", label: "How to read a tide table", detail: "Current", icon: "globe" },
  { group: "Open tabs", label: "The north line, overnight", detail: "Coast trip", icon: "globe" },
  { group: "Bookmarks", label: "Breadcraft: starter guide", detail: "breadcraft.example", icon: "star" },
  { group: "History", label: "Reading a contour map", detail: "Yesterday", icon: "history" },
  { group: "In pages you've read", label: "Kerning, a field guide", snippet: "Round letters need to sit closer than straight ones", icon: "recall" },
  { group: "In pages you've read", label: "Ownership, borrowing and lifetimes", snippet: "many shared references or one mutable reference", icon: "recall" },
  { group: "Commands", label: "Snooze tab", kbd: "⌥⌘S", icon: "moon" },
  { group: "Commands", label: "Split view", icon: "split" },
  { group: "Commands", label: "Customize keyboard shortcuts", icon: "settings" },
];

function mark(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

// The app's palette, inline, with sample data: tabs, bookmarks, history,
// words inside pages you've read, and commands, all in one list.
export function AppPaletteDemo() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? ROWS.filter((r) => (r.label + " " + (r.snippet ?? "")).toLowerCase().includes(t)) : ROWS;
  }, [q]);
  const groups = [...new Set(rows.map((r) => r.group))];

  return (
    <div className={styles.wrap}>
      <div className={`twig ${styles.app}`}>
        <div className="palette">
          <div className="palette-field">
            <TwigIcon name="search" size={17} />
            <input
              className="palette-input"
              aria-label="Try twig's palette: search tabs, pages you've read, or commands"
              placeholder="Search tabs, pages you've read, or type a command"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") (e.preventDefault(), setActive((a) => Math.min(rows.length - 1, a + 1)));
                if (e.key === "ArrowUp") (e.preventDefault(), setActive((a) => Math.max(0, a - 1)));
              }}
            />
          </div>
          <div className="palette-list" aria-live="polite">
            {!rows.length && <p className="palette-empty">Nothing matches in this sample. Try “letters”, “snooze” or “tide”.</p>}
            {groups.map((g) => (
              <div key={g} role="group" aria-label={g}>
                <div className="palette-group">{g}</div>
                {rows
                  .filter((r) => r.group === g)
                  .map((r) => {
                    const i = rows.indexOf(r);
                    return (
                      <div key={r.label} className={i === active ? "palette-row active" : "palette-row"} onMouseMove={() => setActive(i)}>
                        <span className="palette-lead">
                          <TwigIcon name={r.icon} size={15} />
                        </span>
                        <span className="palette-text">
                          <span className="palette-label">{mark(r.label, q.trim())}</span>
                          {r.snippet && <span className="palette-snippet">{mark(r.snippet, q.trim())}</span>}
                        </span>
                        {r.kbd && <kbd className="palette-kbd">{r.kbd}</kbd>}
                        {r.detail && <span className={r.detail === "Current" ? "palette-detail current" : "palette-detail"}>{r.detail}</span>}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button type="button" className={styles.open} onClick={openPalette}>
        Open this site&apos;s palette <kbd>⌘K</kbd>
      </button>
    </div>
  );
}
