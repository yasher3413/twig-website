"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./branch.module.css";

/* The site's through-line (spec §4). One stem grows down the home page's
   margin as you read. Each chapter sprouts a leaf when it arrives; leaves
   you've scrolled well past fall asleep, pale and curled, and wake when you
   come back, which is twig's own mechanism performed without a word. The
   checkpoints chapter can fork it. */

type LeafState = "bud" | "awake" | "asleep";
type NodeKind = "leaf" | "bud" | "fork";

type BranchApi = {
  fork: () => void;
  forked: boolean;
  setHeroLeaves: (states: ("awake" | "asleep")[]) => void;
};

const BranchContext = createContext<BranchApi>({ fork: () => {}, forked: false, setHeroLeaves: () => {} });
export const useBranch = () => useContext(BranchContext);

type Node = { id: string; kind: NodeKind; y: number; x: number; side: 1 | -1; mark: string };
type Geometry = { height: number; nodes: Node[]; d: string; y0: number; yEnd: number; stops: { offset: number; color: string }[] };

const LEAF_UP = "M0 0 C -4.5 -13, 9 -26, 21 -27 C 19 -14, 10 -4, 0 0 Z";
const LEAF_VEIN = "M0 0 C 6 -9, 12 -17, 19 -25";
const LEAF_CURLED = "M0 0 C -1.5 -8, 4 -15.5, 11.5 -17.5 C 13 -14, 9.5 -12, 7 -11.5 C 6.5 -6.5, 3.5 -2.5, 0 0 Z";
const SLEEP_DELAY = 1200;

function readMark(el: Element): string {
  const v = getComputedStyle(el).getPropertyValue("--mark").trim();
  return v || getComputedStyle(document.documentElement).getPropertyValue("--moss").trim() || "#4b6b3a";
}

function measure(host: HTMLElement): Geometry | null {
  const sections = Array.from(host.querySelectorAll<HTMLElement>("[data-chapter]"));
  if (!sections.length) return null;
  const hostTop = host.getBoundingClientRect().top;
  const height = host.scrollHeight;
  const nodes: Node[] = sections.map((s, i) => {
    const anchor = s.querySelector<HTMLElement>("[data-node-anchor]") ?? s;
    const ar = anchor.getBoundingClientRect();
    return {
      id: s.dataset.chapter!,
      kind: (s.dataset.node as NodeKind) || "leaf",
      y: Math.round(ar.top - hostTop + Math.min(ar.height / 2, 40)),
      x: i % 2 === 0 ? 30 : 40,
      side: i % 2 === 0 ? 1 : -1,
      mark: readMark(s),
    };
  });
  const y0 = Math.max(0, nodes[0].y - 40);
  const last = nodes[nodes.length - 1];
  const yEnd = Math.min(height - 8, last.y + 220);
  // A growing stem, not a rule: between nodes it leans out and back like a
  // real shoot, with a knuckle at every node.
  let d = `M ${nodes[0].x} ${y0}`;
  let px = nodes[0].x;
  let py = y0;
  const targets = [...nodes.map((n) => ({ x: n.x, y: n.y })), { x: 34, y: yEnd }];
  targets.forEach((n, i) => {
    const dy = n.y - py;
    const lean = i % 2 === 0 ? 13 : -11;
    const mx = (px + n.x) / 2 + lean;
    const my = py + dy / 2;
    d += ` C ${px} ${py + dy * 0.22}, ${mx} ${my - dy * 0.2}, ${mx} ${my}`;
    d += ` S ${n.x} ${n.y - dy * 0.22}, ${n.x} ${n.y}`;
    px = n.x;
    py = n.y;
  });
  // Hard colour stops at section edges so the stem always reads on its field.
  const stops: { offset: number; color: string }[] = [];
  sections.forEach((s, i) => {
    const top = s.getBoundingClientRect().top - hostTop;
    const bottom = top + s.offsetHeight;
    stops.push({ offset: Math.max(0, top / height), color: nodes[i].mark });
    stops.push({ offset: Math.min(1, bottom / height), color: nodes[i].mark });
  });
  return { height, nodes, d, y0, yEnd, stops };
}

export function BranchProvider({ children }: { children: React.ReactNode }) {
  const [forked, setForked] = useState(false);
  const [heroLeaves, setHeroLeavesState] = useState<("awake" | "asleep")[]>([]);
  const fork = useCallback(() => setForked(true), []);
  const setHeroLeaves = useCallback((s: ("awake" | "asleep")[]) => {
    setHeroLeavesState((prev) => (prev.length === s.length && prev.every((v, i) => v === s[i]) ? prev : s));
  }, []);
  const api = useMemo(() => ({ fork, forked, setHeroLeaves }), [fork, forked, setHeroLeaves]);
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <BranchContext.Provider value={api}>
      <div ref={hostRef} className={styles.host}>
        {children}
        <BranchSvg hostRef={hostRef} forked={forked} heroLeaves={heroLeaves} />
      </div>
    </BranchContext.Provider>
  );
}

function BranchSvg({ hostRef, forked, heroLeaves }: { hostRef: React.RefObject<HTMLDivElement | null>; forked: boolean; heroLeaves: ("awake" | "asleep")[] }) {
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [states, setStates] = useState<LeafState[]>([]);
  const [reduced, setReduced] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const lengthRef = useRef(0);
  const timers = useRef<Map<number, number>>(new Map());
  const statesRef = useRef<LeafState[]>([]);

  // Measure on mount, on resize, on theme change (field colours differ).
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setGeo(measure(host)));
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(host);
    const mo = new MutationObserver(run);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", run);
    document.fonts?.ready.then(run);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", run);
    };
  }, [hostRef]);

  useLayoutEffect(() => {
    if (pathRef.current) lengthRef.current = pathRef.current.getTotalLength();
  }, [geo]);

  // Scroll drives growth and sleep. No React render per frame: the stem is
  // written straight to the DOM; leaf states only re-render when one changes.
  useEffect(() => {
    if (!geo) return;
    const host = hostRef.current!;
    const path = pathRef.current!;
    const n = geo.nodes.length;

    const commit = (i: number, s: LeafState) => {
      if (statesRef.current[i] === s) return;
      statesRef.current = statesRef.current.slice();
      statesRef.current[i] = s;
      setStates(statesRef.current);
    };

    if (reduced) {
      path.style.strokeDasharray = "none";
      statesRef.current = Array(n).fill("awake");
      setStates(statesRef.current);
      return;
    }

    statesRef.current = statesRef.current.length === n ? statesRef.current : Array(n).fill("bud");
    let raf = 0;
    const update = () => {
      raf = 0;
      const top = host.getBoundingClientRect().top + window.scrollY;
      const vh = window.innerHeight;
      const drawY = window.scrollY + vh * 0.72 - top;
      const frac = Math.max(0, Math.min(1, (drawY - geo.y0) / (geo.yEnd - geo.y0)));
      const L = lengthRef.current || 1;
      path.style.strokeDasharray = `${L}`;
      path.style.strokeDashoffset = `${L * (1 - frac)}`;
      const viewTop = window.scrollY - top;
      geo.nodes.forEach((node, i) => {
        const pending = timers.current.get(i);
        let target: LeafState;
        if (drawY < node.y) target = "bud";
        // Settle once its heading reaches the top of the screen, so you can
        // watch the leaf you've just read past turn pale.
        else if (node.y < viewTop + vh * 0.15) target = "asleep";
        else target = "awake";
        if (target === "asleep") {
          if (statesRef.current[i] !== "asleep" && pending === undefined) {
            timers.current.set(
              i,
              window.setTimeout(() => {
                timers.current.delete(i);
                commit(i, "asleep");
              }, SLEEP_DELAY),
            );
          }
        } else {
          if (pending !== undefined) {
            clearTimeout(pending);
            timers.current.delete(i);
          }
          commit(i, target);
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = timers.current;
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      t.forEach((id) => clearTimeout(id));
      t.clear();
    };
  }, [geo, hostRef, reduced]);

  if (!geo) return null;
  const heroNode = geo.nodes[0];

  return (
    <svg className={styles.svg} width="72" height={geo.height} viewBox={`0 0 72 ${geo.height}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="branch-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={geo.height}>
          {geo.stops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>
      <path ref={pathRef} d={geo.d} className={styles.stem} stroke="url(#branch-ink)" />

      {/* Tabs from the hero's living window, settling as leaves on the first stretch. */}
      {heroLeaves.map((s, i) => (
        <g key={`h${i}`} transform={`translate(${heroNode.x + (i % 2 ? -1 : 1)} ${heroNode.y + 46 + i * 30}) scale(${i % 2 ? -0.62 : 0.62} 0.62)`}>
          <g className={styles.leaf} data-state={s} style={{ color: heroNode.mark }}>
            <path d={LEAF_UP} className={styles.leafBody} />
            <path d={LEAF_CURLED} className={styles.leafCurl} />
          </g>
        </g>
      ))}

      {geo.nodes.map((node, i) => {
        const s = states[i] ?? "bud";
        return (
          <g key={node.id} transform={`translate(${node.x} ${node.y})`} style={{ color: node.mark }}>
            {node.kind === "fork" && (
              <g className={styles.fork} data-forked={s !== "bud" || reduced}>
                <path d="M0 0 C 10 14, 22 22, 30 44 S 36 70, 34 86" className={styles.forkStem} stroke={node.mark} />
                <g transform="translate(30 44) scale(-0.8 0.8)">
                  <g className={styles.leaf} data-state={s === "bud" && !reduced ? "bud" : "awake"}>
                    <path d={LEAF_UP} className={styles.leafBody} />
                  </g>
                </g>
                <circle cx="34" cy="86" r={forked ? 5.5 : 0} className={styles.forkBud} />
                {forked && <circle cx="32.6" cy="84.6" r="1.8" className={styles.budLight} />}
              </g>
            )}
            <g transform={`scale(${node.side * 1.25} 1.25)`}>
              <g className={styles.leaf} data-state={s}>
                <path d={LEAF_UP} className={styles.leafBody} />
                <path d={LEAF_VEIN} className={styles.leafVein} />
                <path d={LEAF_CURLED} className={styles.leafCurl} />
              </g>
            </g>
            <circle r={node.kind === "bud" || node.kind === "fork" ? 5.5 : 4} className={styles.bud} data-state={s} />
            {(node.kind === "bud" || node.kind === "fork") && <circle r="1.8" cx="-1.4" cy="-1.4" className={styles.budLight} />}
          </g>
        );
      })}
    </svg>
  );
}
