"use client";

import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "../useInView";
import styles from "./sleeping.module.css";

const COLORS = ["#4b6b3a", "#2b6e7a", "#a85c32", "#6b4a82", "#a67c1d", "#52564c"];
const LETTERS = "TSKFNMRLCAGBDPHWEVOYJQUIXZ";
const TOTAL = 60;
const AWAKE = 5;

// Sixty open tabs settle until five are awake: the problem and the answer
// in one picture. Plays once each time it comes into view.
export function SixtyTabs() {
  const { ref, active } = useInView<HTMLDivElement>(0.4);
  const reduced = useReducedMotion();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (reduced) {
      setSettled(true);
      return;
    }
    if (!active) return;
    const t = window.setTimeout(() => setSettled(true), 700);
    return () => clearTimeout(t);
  }, [active, reduced]);

  const asleep = settled ? TOTAL - AWAKE : 0;
  return (
    <figure ref={ref} className={styles.sixty} aria-label={`60 open tabs; ${settled ? "5 awake, 55 asleep" : "all awake"}.`}>
      <div className={styles.wall} aria-hidden="true">
        {Array.from({ length: TOTAL }, (_, i) => {
          const sleeping = settled && i < TOTAL - AWAKE;
          return (
            <span
              key={i}
              className={styles.mini}
              data-asleep={sleeping}
              style={{ "--c": COLORS[(i * 7) % COLORS.length], "--d": `${(i % 20) * 38 + Math.floor(i / 20) * 90}ms` } as React.CSSProperties}
            >
              <span className={styles.miniMark}>{LETTERS[(i * 5) % LETTERS.length]}</span>
              <span className={styles.miniBar} />
            </span>
          );
        })}
      </div>
      <figcaption className={`${styles.sixtyCaption} tnum`}>
        <span>
          <strong>60</strong> open
        </span>
        <span>
          <strong>{TOTAL - asleep}</strong> awake
        </span>
        <span>
          <strong>{asleep}</strong> asleep, costing almost nothing
        </span>
        {!reduced && (
          <button type="button" className={styles.replay} onClick={() => setSettled(false)} disabled={!settled}>
            Open them all again
          </button>
        )}
      </figcaption>
    </figure>
  );
}
