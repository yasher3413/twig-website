"use client";

import { useEffect, useRef, useState } from "react";
import { DEMO_TABS } from "@/content/demo-data/tabs";
import type { TabModel } from "@/components/twig-ui/types";

/* The hero's script, in demo time: a tab idle for SLEEP_AFTER seconds stands
   in for twig's 10 minutes. Tabs open one by one; older ones drift along the
   ruler and fall asleep; now and then a sleeping tab is clicked awake. At
   most CAP stay awake, like Balanced (the default). */

export const CAP = 5;
export const SLEEP_AFTER = 6; // demo seconds ≈ 10 minutes
const OPEN_EVERY = 1.7;
const START = 4;
const MAX = DEMO_TABS.length;

export type LivingTab = TabModel & { idle: number };

type State = { tabs: LivingTab[]; activeId: string; clock: number; opened: number };

function initial(): State {
  const tabs = DEMO_TABS.slice(0, START).map((t, i) => ({ ...t, state: "awake" as const, idle: (START - 1 - i) * 1.4 }));
  return { tabs, activeId: tabs[tabs.length - 1].id, clock: 0, opened: START };
}

function settle(tabs: LivingTab[], activeId: string): LivingTab[] {
  // Anything idle past the threshold sleeps; then enforce the awake cap,
  // oldest first. The active tab is never put to sleep.
  let next = tabs.map((t) => (t.id !== activeId && t.idle >= SLEEP_AFTER ? { ...t, state: "asleep" as const } : t));
  const awake = next.filter((t) => t.state !== "asleep").sort((a, b) => b.idle - a.idle);
  let over = awake.length - CAP;
  for (const t of awake) {
    if (over <= 0) break;
    if (t.id === activeId) continue;
    next = next.map((x) => (x.id === t.id ? { ...x, state: "asleep" as const } : x));
    over--;
  }
  return next;
}

export function useLivingTabs(running: boolean) {
  const [s, setS] = useState<State>(initial);
  const last = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      last.current = null;
      return;
    }
    let raf = 0;
    let acc = 0;
    const tick = (now: number) => {
      const dt = last.current === null ? 0 : Math.min(0.1, (now - last.current) / 1000);
      last.current = now;
      acc += dt;
      if (acc >= 0.25) {
        const step = acc;
        acc = 0;
        setS((prev) => {
          const clock = prev.clock + step;
          let tabs = prev.tabs.map((t) => (t.id === prev.activeId ? { ...t, idle: 0 } : { ...t, idle: t.idle + step }));
          let activeId = prev.activeId;
          let opened = prev.opened;
          const due = Math.floor(clock / OPEN_EVERY) > Math.floor(prev.clock / OPEN_EVERY);
          if (due) {
            if (opened < MAX) {
              const t = DEMO_TABS[opened];
              tabs = [...tabs, { ...t, state: "awake", idle: 0 }];
              activeId = t.id;
              opened++;
            } else if (Math.floor(clock / OPEN_EVERY) % 3 === 0) {
              // Wake the longest-sleeping tab, the way a click would.
              const sleeper = [...tabs].filter((t) => t.state === "asleep").sort((a, b) => b.idle - a.idle)[0];
              if (sleeper) {
                tabs = tabs.map((t) => (t.id === sleeper.id ? { ...t, state: "awake", idle: 0 } : t));
                activeId = sleeper.id;
              }
            }
          }
          return { tabs: settle(tabs, activeId), activeId, clock, opened };
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const awake = s.tabs.filter((t) => t.state !== "asleep").length;
  const asleep = s.tabs.length - awake;
  return { tabs: s.tabs, activeId: s.activeId, awake, asleep };
}

// Demo values, labelled as such on the page: a per-tab footprint in the
// range a WebKit tab commonly uses. Not a measurement of twig.
export function demoLedger(awake: number, asleep: number) {
  const perTab = 140;
  const base = 180;
  const fmt = (mb: number) => (mb >= 1000 ? `${(mb / 1000).toFixed(1)} GB` : `${mb} MB`);
  return { inUse: fmt(base + awake * perTab), notSpent: fmt(asleep * perTab) };
}
