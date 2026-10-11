"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Window, Viewport, TabStrip, Toolbar, Ledger } from "@/components/twig-ui";
import { useBranch } from "@/components/motion/Branch";
import { DEMO_TABS } from "@/content/demo-data/tabs";
import { useLivingTabs, demoLedger, SLEEP_AFTER, type LivingTab } from "./useLivingTabs";
import { Leaf } from "@/components/almanac/Leaf";
import styles from "./hero.module.css";

// A settled frame for reduced motion: the story's end state, still telling it.
const SETTLED: LivingTab[] = DEMO_TABS.map((t, i) => ({ ...t, state: i < 4 ? "asleep" : "awake", idle: i < 4 ? SLEEP_AFTER : (8 - i) * 1.1 }));

export function LivingWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const live = useLivingTabs(inView && visible && !paused && !reduced);
  const tabs = reduced ? SETTLED : live.tabs;
  const activeId = reduced ? SETTLED[SETTLED.length - 1].id : live.activeId;
  const awake = tabs.filter((t) => t.state !== "asleep").length;
  const asleep = tabs.length - awake;
  const ledger = demoLedger(awake, asleep);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const page = DEMO_TABS.find((t) => t.id === active.id)!;

  const { setHeroLeaves } = useBranch();
  const leafStates = useMemo(() => tabs.map((t) => (t.state === "asleep" ? "asleep" : "awake") as "awake" | "asleep"), [tabs]);
  useEffect(() => setHeroLeaves(leafStates), [leafStates, setHeroLeaves]);

  return (
    <div ref={ref} className={styles.stage}>
      <Window className={styles.window} label="A twig window, playing a demo of sleeping tabs">
        <TabStrip tabs={tabs} activeId={activeId} />
        <Toolbar host={page.host} path={page.path} />
        <Viewport className={styles.viewport}>
          <article key={page.id} className={styles.page}>
            <p className={styles.pageKicker}>{page.page.kicker}</p>
            <h3 className={styles.pageTitle}>{page.page.title}</h3>
            <p className={styles.pageLede}>{page.page.lede}</p>
            {page.page.body.map((b, i) => (
              <p key={i} className={styles.pageBody}>
                {b}
              </p>
            ))}
          </article>
          <div className={styles.ledgerCard}>
            <p className={styles.ledgerTitle}>Memory</p>
            <Ledger inUse={ledger.inUse} awake={awake} asleep={asleep} notSpent={ledger.notSpent} />
          </div>
        </Viewport>
      </Window>

      <div className={styles.ruler} aria-hidden="true">
        <div className={styles.rulerTrack}>
          {tabs.map((t, i) => {
            const p = Math.min(1, t.idle / SLEEP_AFTER);
            return (
              <span
                key={t.id}
                className={styles.marker}
                data-asleep={t.state === "asleep"}
                style={{ "--p": p, "--lane": i % 3 } as React.CSSProperties}
              >
                <Leaf state={t.state === "asleep" ? "asleep" : "awake"} size={20} />
              </span>
            );
          })}
        </div>
        <div className={`${styles.rulerScale} tnum`}>
          {Array.from({ length: 11 }, (_, m) => (
            <span key={m} className={m % 5 === 0 ? styles.tickMajor : styles.tick}>
              {m === 0 ? "0" : m === 5 ? "5" : m === 10 ? "10 min" : ""}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.caption}>
        <p>
          Minutes since you last looked at each tab, sped up. At ten, a tab falls asleep and gives its memory back.{" "}
          <span className={styles.demoNote}>Demo values.</span>
        </p>
        {!reduced && (
          <button type="button" className={styles.pause} onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
            {paused ? "Play demo" : "Pause demo"}
          </button>
        )}
      </div>
    </div>
  );
}
