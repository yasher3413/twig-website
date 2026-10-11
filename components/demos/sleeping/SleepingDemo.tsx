"use client";

import { useMemo, useState } from "react";
import { Window, Viewport, TabStrip, Toolbar, Ledger, Segmented, type TabModel } from "@/components/twig-ui";
import { DEMO_TABS } from "@/content/demo-data/tabs";
import { demoLedger } from "../hero/useLivingTabs";
import styles from "./sleeping.module.css";

type Cap = 3 | 5 | 10;
const CAPS: { value: Cap; label: string }[] = [
  { value: 3, label: "Frugal · 3" },
  { value: 5, label: "Balanced · 5" },
  { value: 10, label: "Roomy · 10" },
];
const BUSY_ID = "t5"; // the night-train page is "playing audio" in this demo
const TABS = DEMO_TABS.slice(0, 8);

type S = { order: string[]; activeId: string; awake: Set<string> };

function enforce(order: string[], awake: Set<string>, cap: number, activeId: string): Set<string> {
  // Least recently used first. Busy tabs are never put to sleep, even if
  // that leaves more than the cap awake, exactly as in twig.
  const next = new Set(awake);
  for (const id of order) {
    const count = [...next].length;
    if (count <= cap) break;
    if (id === activeId || id === BUSY_ID || !next.has(id)) continue;
    next.delete(id);
  }
  return next;
}

export function SleepingDemo() {
  const [cap, setCap] = useState<Cap>(5);
  const [s, setS] = useState<S>(() => {
    const order = TABS.map((t) => t.id);
    const activeId = order[order.length - 1];
    return { order, activeId, awake: enforce(order, new Set(order), 5, activeId) };
  });
  const [said, setSaid] = useState("");

  const select = (id: string) => {
    setS((prev) => {
      const wasAsleep = !prev.awake.has(id);
      const order = [...prev.order.filter((x) => x !== id), id];
      const awake = enforce(order, new Set([...prev.awake, id]), cap, id);
      const slept = [...prev.awake].filter((x) => !awake.has(x));
      const title = (x: string) => TABS.find((t) => t.id === x)!.title;
      setSaid(
        `${wasAsleep ? "Woke" : "Switched to"} ${title(id)}.` +
          (slept.length ? ` ${slept.map(title).join(", ")} fell asleep.` : "") +
          ` ${awake.size} awake, ${TABS.length - awake.size} asleep.`,
      );
      return { order, activeId: id, awake };
    });
  };

  const changeCap = (c: Cap) => {
    setCap(c);
    setS((prev) => {
      // A bigger cap doesn't wake anything; tabs wake when you click them.
      const awake = enforce(prev.order, prev.awake, c, prev.activeId);
      setSaid(`${CAPS.find((x) => x.value === c)!.label.split(" ")[0]}: up to ${c} tabs stay awake. ${awake.size} awake now.`);
      return { ...prev, awake };
    });
  };

  const tabs: TabModel[] = useMemo(
    () => TABS.map((t) => ({ ...t, state: t.id === BUSY_ID ? "busy" : s.awake.has(t.id) ? "awake" : "asleep" })),
    [s.awake],
  );
  const active = TABS.find((t) => t.id === s.activeId)!;
  const awakeCount = tabs.filter((t) => t.state !== "asleep").length;
  const ledger = demoLedger(awakeCount, TABS.length - awakeCount);

  return (
    <div className={styles.demo}>
      <Window className={styles.window} label="A twig window you can try: click a tab to wake it">
        <TabStrip tabs={tabs} activeId={s.activeId} onSelect={select} label="Tabs. Click one to wake it." />
        <Toolbar host={active.host} path={active.path} />
        <Viewport className={styles.viewport}>
          <div className={styles.settings}>
            <p className={styles.settingsTitle}>Memory</p>
            <Ledger inUse={ledger.inUse} awake={awakeCount} asleep={TABS.length - awakeCount} notSpent={ledger.notSpent} />
            <div className={styles.settingsRow}>
              <span className={styles.settingsLabel}>Tabs kept awake</span>
              <Segmented options={CAPS} value={cap} onChange={changeCap} label="Tabs kept awake" />
            </div>
            <p className={styles.settingsHelp}>
              Tabs you haven&apos;t looked at in 10 minutes go to sleep, and only {cap} stay awake at once. A tab that&apos;s playing something, like{" "}
              <em>Night train timetable</em> here, is left alone.
            </p>
          </div>
        </Viewport>
      </Window>
      <p className={styles.narration} aria-live="polite">
        {said || "Click any tab to wake it. Change how many stay awake below the ledger."}
      </p>
    </div>
  );
}
