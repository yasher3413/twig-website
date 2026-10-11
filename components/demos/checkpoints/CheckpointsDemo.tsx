"use client";

import { useState } from "react";
import { TwigIcon } from "@/components/twig-ui/TwigIcon";
import { useBranch } from "@/components/motion/Branch";
import "@/components/twig-ui/twig-ui.css";
import styles from "./checkpoints.module.css";

type Cp = { id: string; name: string; date: string; note: string; tabs: { title: string; host: string }[]; parent?: string };

const SPACE = "Coast trip";
const T = {
  tide: { title: "How to read a tide table", host: "coastalnotes.example" },
  train: { title: "The north line, overnight", host: "railtrips.example" },
  contour: { title: "Reading a contour map", host: "fellwalks.example" },
  moss: { title: "A morning in the moss gardens", host: "slowtravel.example" },
  chain: { title: "Why your chain slips", host: "spokeandgear.example" },
};
const SAVED: Cp[] = [
  { id: "c1", name: "First look", date: "24 Sep", note: "Tide times and the night train.", tabs: [T.tide, T.train] },
  { id: "c2", name: "Shortlisted", date: "27 Sep", note: "Two routes left. Book by Friday.", tabs: [T.tide, T.train, T.contour] },
];
const NEXT: Cp = { id: "c3", name: "Before booking", date: "30 Sep", note: "Everything open the night I decided.", tabs: [T.train, T.contour, T.moss, T.tide] };

const X0 = 40;
const STEP = 190;
const Y = 132;

export function CheckpointsDemo() {
  const { fork } = useBranch();
  const [cps, setCps] = useState<Cp[]>(SAVED);
  const [selectedId, setSelectedId] = useState("c2");
  const [forked, setForked] = useState<Cp | null>(null);
  const [said, setSaid] = useState("");

  const sel = [...cps, ...(forked ? [forked] : [])].find((c) => c.id === selectedId)!;
  const xOf = (id: string) => X0 + cps.findIndex((c) => c.id === id) * STEP;

  const save = () => {
    if (cps.some((c) => c.id === NEXT.id)) return;
    setCps((c) => [...c, NEXT]);
    setSelectedId(NEXT.id);
    setSaid(`Saved “${NEXT.name}” with ${NEXT.tabs.length} tabs. A new bud on the timeline.`);
  };

  const doFork = () => {
    if (forked) return;
    const f: Cp = {
      id: "f1",
      name: `${SPACE}, by bike`,
      date: "1 Oct",
      note: `Forked from “${sel.name}”. The original stays as it was.`,
      tabs: [...sel.tabs.filter((t) => t !== T.train), T.chain],
      parent: sel.id,
    };
    setForked(f);
    setSelectedId(f.id);
    fork();
    setSaid(`Forked “${sel.name}” into a new space, “${f.name}”. A new branch grows from that checkpoint.`);
  };

  const forkX = forked ? xOf(forked.parent!) : 0;
  const endX = X0 + (cps.length - 1) * STEP + 70;

  return (
    <div className={styles.demo}>
      <div className={`twig ${styles.panel}`} role="group" aria-label="Checkpoints, working demo">
        <header className={styles.header}>
          <div>
            <p className={styles.h1}>
              <TwigIcon name="history" size={20} /> Checkpoints
            </p>
            <p className={styles.sub}>
              Saved moments in <strong>{SPACE}</strong>
            </p>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={save} disabled={cps.length > 2} aria-keyshortcuts="Shift+Meta+S">
              Save checkpoint <kbd className="palette-kbd">⇧⌘S</kbd>
            </button>
          </div>
        </header>

        <div className={styles.timelineWrap}>
          <svg className={styles.timeline} viewBox={`0 0 ${Math.max(640, endX + 40, forked ? forkX + 330 : 0)} 200`} role="img" aria-label={`Timeline with ${cps.length} checkpoints${forked ? " and a fork" : ""}`}>
            <path d={`M 12 ${Y} C 20 ${Y - 4}, ${endX - 40} ${Y + 6}, ${endX} ${Y}`} className={styles.stem} />
            {forked && <path d={`M ${forkX} ${Y} C ${forkX + 30} ${Y - 30}, ${forkX + 90} ${Y - 70}, ${forkX + 150} ${Y - 92}`} className={`${styles.stem} ${styles.forkStem}`} pathLength={1} />}
            {cps.map((c, i) => {
              const x = X0 + i * STEP;
              const on = c.id === selectedId;
              return (
                <g key={c.id} transform={`translate(${x} ${Y})`} className={styles.node} data-on={on}>
                  <circle r={on ? 9 : 7} className={styles.bud} />
                  <circle r="2.6" cx="-2.4" cy="-2.4" className={styles.budLight} />
                  <text y="34" className={styles.label}>
                    {c.name}
                  </text>
                  <text y="52" className={styles.date}>
                    {c.date}
                  </text>
                </g>
              );
            })}
            {forked && (
              <g transform={`translate(${forkX + 150} ${Y - 92})`} className={`${styles.node} ${styles.forkNode}`} data-on={selectedId === forked.id}>
                <circle r={selectedId === forked.id ? 9 : 7} className={styles.bud} />
                <text x="-12" y="-18" className={styles.label} textAnchor="start">
                  {forked.name}
                </text>
              </g>
            )}
          </svg>
          <div className={styles.pickers} role="group" aria-label="Choose a checkpoint">
            {[...cps, ...(forked ? [forked] : [])].map((c) => (
              <button key={c.id} type="button" className={styles.pick} aria-pressed={c.id === selectedId} onClick={() => setSelectedId(c.id)}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.detail}>
          <div>
            <p className={styles.name}>{sel.name}</p>
            {sel.parent && (
              <p className={styles.lineage}>
                <TwigIcon name="fork" size={13} /> From “{cps.find((c) => c.id === sel.parent)?.name}”
              </p>
            )}
            <p className={styles.note}>{sel.note}</p>
            <div className={styles.detailActions}>
              <button type="button" className={styles.primary} onClick={() => setSaid(`Resumed “${sel.name}” in a new space. Only the active tab wakes; the rest stay asleep until you open them.`)}>
                Resume in a new space
              </button>
              <button type="button" className={styles.button} onClick={doFork} disabled={!!forked || sel.id === "f1"}>
                <TwigIcon name="fork" size={14} /> Fork it
              </button>
            </div>
          </div>
          <ol className={styles.tabs} aria-label="Tabs in this checkpoint">
            {sel.tabs.map((t, i) => (
              <li key={t.title}>
                <span className={styles.mark} aria-hidden="true">
                  {t.host.charAt(0).toUpperCase()}
                </span>
                <span className={styles.tabText}>
                  <strong>{t.title}</strong>
                  <span>{t.host}</span>
                </span>
                {i === 0 && <span className={styles.state}>Active</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className={styles.narration} aria-live="polite">
        {said || "Save a checkpoint, pick one on the timeline, then fork it."}
      </p>
    </div>
  );
}
