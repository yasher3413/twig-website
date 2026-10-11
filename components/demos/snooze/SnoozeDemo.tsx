"use client";

import { useEffect, useRef, useState } from "react";
import { Window, Viewport, TabStrip, Toolbar, TwigIcon, type TabModel } from "@/components/twig-ui";
import { DEMO_TABS } from "@/content/demo-data/tabs";
import { useReducedMotion } from "../useInView";
import styles from "./snooze.module.css";

/* The demo's clock is fixed at Thursday 1 October, 3:20 PM, so the picker's
   labels follow twig's own rules (snooze.ts wakeLabel). */
type Preset = { id: string; label: string; detail: string; day: number; time: string };
const PRESETS: Preset[] = [
  { id: "hour", label: "In 1 hour", detail: "today 4:20 PM", day: 0, time: "4:20 PM" },
  { id: "evening", label: "This evening", detail: "today 6:00 PM", day: 0, time: "6:00 PM" },
  { id: "tomorrow", label: "Tomorrow morning", detail: "tomorrow 9:00 AM", day: 1, time: "9:00 AM" },
  { id: "weekend", label: "This weekend", detail: "Sat 9:00 AM", day: 2, time: "9:00 AM" },
  { id: "week", label: "Next week", detail: "Mon 9:00 AM", day: 4, time: "9:00 AM" },
  { id: "custom", label: "Pick a date and time…", detail: "Tue 9:00 AM", day: 5, time: "9:00 AM" },
];
const DAYS = ["Thu 1", "Fri 2", "Sat 3", "Sun 4", "Mon 5", "Tue 6"];

const INITIAL = ["t8", "t1", "t2", "t3", "t4", "t6", "t9"];
const UNTOUCHED: { id: string; ago: string }[] = [
  { id: "t1", ago: "last used 5 weeks ago" },
  { id: "t2", ago: "last used 4 weeks ago" },
  { id: "t3", ago: "last used 3 weeks ago" },
  { id: "t4", ago: "last used 3 weeks ago" },
];

type Phase = "idle" | "picking" | "away" | "back";

export function SnoozeDemo() {
  const reduced = useReducedMotion();
  const [order, setOrder] = useState<string[]>(INITIAL);
  const [activeId, setActiveId] = useState("t8");
  const [phase, setPhase] = useState<Phase>("idle");
  const [selected, setSelected] = useState(5);
  const [chosen, setChosen] = useState<Preset | null>(null);
  const [sweepOpen, setSweepOpen] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set(UNTOUCHED.map((u) => u.id)));
  const [swept, setSwept] = useState(false);
  const [said, setSaid] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const snoozeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase === "picking") pickerRef.current?.focus();
  }, [phase]);

  const snoozedId = "t8";
  const title = (id: string) => DEMO_TABS.find((t) => t.id === id)!.title;

  const pick = (i: number) => {
    const p = PRESETS[i];
    setChosen(p);
    setPhase("away");
    setOrder((o) => o.filter((x) => x !== snoozedId));
    setActiveId("t9");
    setSaid(`Snoozed “${title(snoozedId)}” until ${p.detail}. It closed right away and waits on the calendar.`);
    snoozeBtn.current?.focus();
  };

  const wake = () => {
    setPhase("back");
    setOrder((o) => [...o, snoozedId]);
    setSaid(`${chosen?.detail ?? "Its time"} came. “${title(snoozedId)}” is back, asleep, at the end of its space, with a small dot until you look at it.`);
  };

  const reset = () => {
    setOrder(INITIAL);
    setActiveId("t8");
    setPhase("idle");
    setChosen(null);
    setSwept(false);
    setSweepOpen(false);
    setChecked(new Set(UNTOUCHED.map((u) => u.id)));
    setSaid("");
  };

  const sweep = (how: "archive" | "snooze" | "dismiss") => {
    setSweepOpen(false);
    if (how === "dismiss") {
      setSwept(true);
      setSaid("Not now: the pill hides for a week. Nothing was closed.");
      return;
    }
    const ids = [...checked];
    setOrder((o) => o.filter((x) => !ids.includes(x)));
    setSwept(true);
    setSaid(how === "archive" ? `Archived ${ids.length} tabs to Library → Closed, where they stay searchable.` : `Snoozed ${ids.length} tabs to next week, Mon 9:00 AM.`);
  };

  const tabs: TabModel[] = order.map((id) => {
    const t = DEMO_TABS.find((x) => x.id === id)!;
    const back = id === snoozedId && phase === "back";
    return { ...t, state: id === activeId ? "awake" : back || ["t1", "t2", "t3", "t4"].includes(id) ? "asleep" : "awake", woke: back };
  });
  const active = DEMO_TABS.find((t) => t.id === activeId)!;
  const showPill = !swept && order.includes("t1");

  return (
    <div className={styles.demo}>
      <div className={styles.stage}>
        <Window className={styles.window} label="A twig window: snooze a tab, or review untouched ones">
          <TabStrip
            tabs={tabs}
            activeId={activeId}
            trailing={
              showPill ? (
                <button type="button" className="sweep-pill" onClick={() => setSweepOpen(true)} aria-expanded={sweepOpen}>
                  4 untouched tabs
                </button>
              ) : null
            }
          />
          <Toolbar host={active.host} path={active.path} />
          <Viewport className={styles.viewport}>
            <div className={styles.page}>
              <p className={styles.kicker}>{active.page.kicker}</p>
              <h3 className={styles.title}>{active.page.title}</h3>
              <p>{active.page.lede}</p>
            </div>
            {phase === "picking" && (
              <div className={styles.scrim} onClick={() => setPhase("idle")}>
                <div
                  ref={pickerRef}
                  className="snooze"
                  role="dialog"
                  aria-label="Snooze until"
                  tabIndex={-1}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setPhase("idle");
                    else if (e.key === "ArrowDown") (e.preventDefault(), setSelected((i) => (i + 1) % 6));
                    else if (e.key === "ArrowUp") (e.preventDefault(), setSelected((i) => (i + 5) % 6));
                    else if (e.key === "Enter") (e.preventDefault(), pick(selected));
                    else if (/^[1-6]$/.test(e.key)) (e.preventDefault(), pick(Number(e.key) - 1));
                  }}
                >
                  <h3>Snooze until…</h3>
                  <p className="snooze-tab">{title(snoozedId)}</p>
                  <ul className="snooze-options" role="listbox" aria-label="When it comes back">
                    {PRESETS.map((p, i) => (
                      <li key={p.id} role="option" aria-selected={i === selected}>
                        <button type="button" className={i === selected ? "snooze-option active" : "snooze-option"} onMouseMove={() => setSelected(i)} onClick={() => pick(i)}>
                          <kbd>{i + 1}</kbd>
                          <span className="snooze-label">{p.label}</span>
                          <span className="snooze-detail">{p.detail}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {sweepOpen && (
              <aside className="sweep" aria-label="Tabs you haven't touched">
                <header className="sweep-header">
                  <div>
                    <h3>Tabs you haven&apos;t touched</h3>
                    <p>Untouched for 21 days or more. Archived tabs stay in Library → Closed.</p>
                  </div>
                  <button type="button" className="panel-icon" aria-label="Close" onClick={() => setSweepOpen(false)}>
                    <TwigIcon name="close" size={14} />
                  </button>
                </header>
                <div className="sweep-list">
                  {UNTOUCHED.map((u) => (
                    <label key={u.id} className="sweep-row">
                      <input
                        type="checkbox"
                        checked={checked.has(u.id)}
                        onChange={(e) =>
                          setChecked((c) => {
                            const n = new Set(c);
                            if (e.target.checked) n.add(u.id);
                            else n.delete(u.id);
                            return n;
                          })
                        }
                      />
                      <span className="sweep-text">
                        <span className="sweep-title">{title(u.id)}</span>
                        <span className="sweep-meta">Home · {u.ago}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <footer className="sweep-footer">
                  <button type="button" className="panel-button primary" disabled={!checked.size} onClick={() => sweep("archive")}>
                    Archive {checked.size}
                  </button>
                  <button type="button" className="panel-button" disabled={!checked.size} onClick={() => sweep("snooze")}>
                    Snooze to next week
                  </button>
                  <button type="button" className="panel-button quiet" onClick={() => sweep("dismiss")}>
                    Not now
                  </button>
                </footer>
              </aside>
            )}
          </Viewport>
        </Window>

        <div className={styles.calendar} aria-label="When snoozed tabs come back">
          <p className={styles.calTitle}>Coming back</p>
          <ol className={styles.days}>
            {DAYS.map((d, i) => (
              <li key={d} className={styles.day} data-today={i === 0}>
                <span className={`${styles.dayName} tnum`}>{i === 0 ? `${d} · today` : d}</span>
                {chosen && phase === "away" && chosen.day === i && (
                  <span className={`${styles.chip} ${reduced ? "" : styles.chipIn}`}>
                    <span className={`${styles.chipTime} tnum`}>{chosen.time}</span>
                    {title(snoozedId)}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={styles.controls}>
        {phase === "idle" && (
          <button ref={snoozeBtn} type="button" className={styles.action} onClick={() => setPhase("picking")} aria-keyshortcuts="Alt+Meta+S">
            <TwigIcon name="moon" size={15} /> Snooze “{title(snoozedId)}” <kbd>⌥⌘S</kbd>
          </button>
        )}
        {phase === "away" && (
          <button ref={snoozeBtn} type="button" className={styles.action} onClick={wake}>
            Skip ahead to {chosen?.detail}
          </button>
        )}
        {(phase === "back" || swept) && (
          <button type="button" className={styles.quiet} onClick={reset}>
            Start again
          </button>
        )}
        <p className={styles.narration} aria-live="polite">
          {said || "Snooze the museum tab, or open the “4 untouched tabs” pill in the tab strip."}
        </p>
      </div>
    </div>
  );
}
