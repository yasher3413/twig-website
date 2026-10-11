"use client";

import { useMemo, useState } from "react";
import { TwigIcon } from "@/components/twig-ui/TwigIcon";
import { useReducedMotion } from "../useInView";
import "@/components/twig-ui/twig-ui.css";
import styles from "./packages.module.css";

type Source = { url: string; title: string; note: string; excerpt: string };
const SOURCES: Source[] = [
  { url: "https://coastalnotes.example/tides/how-to-read", title: "How to read a tide table", note: "Read first: when to cross the causeway.", excerpt: "Spring tides arrive near the new and full moon." },
  { url: "https://railtrips.example/night/north-line", title: "The north line, overnight", note: "Book midweek.", excerpt: "Couchettes sell out first on Fridays." },
  { url: "https://fellwalks.example/skills/contours", title: "Reading a contour map", note: "", excerpt: "Every fifth contour is drawn thicker and carries its height." },
  { url: "https://slowtravel.example/kyoto/moss", title: "A morning in the moss gardens", note: "For the last day, if there's time.", excerpt: "" },
];
const CREATED = 1790812800000; // 1 October 2026, 00:00 UTC
const TITLE = "Coast trip";
type Format = "twig" | "md" | "html";

// Package a space: choose sources, then see exactly what the .twig file,
// the Markdown and the HTML export contain (format version 1).
export function PackagesDemo() {
  const reduced = useReducedMotion();
  const [picked, setPicked] = useState<Set<number>>(new Set([0, 1, 2]));
  const [built, setBuilt] = useState(false);
  const [format, setFormat] = useState<Format>("twig");
  const chosen = SOURCES.filter((_, i) => picked.has(i));

  const json = useMemo(
    () =>
      JSON.stringify(
        {
          format: "twig-research",
          version: 1,
          title: TITLE,
          description: "Tides first, then the train, then the walk.",
          createdAt: CREATED,
          pages: chosen.map((s) => ({ url: s.url, title: s.title, note: s.note, excerpts: s.excerpt ? [s.excerpt] : [], capturedAt: CREATED })),
          sourceCheckpoint: { name: "Before booking", createdAt: CREATED - 86_400_000 },
        },
        null,
        2,
      ),
    [chosen],
  );

  const md = useMemo(
    () =>
      [`# ${TITLE}`, "", "Tides first, then the train, then the walk.", ""]
        .concat(chosen.flatMap((s, i) => [`## ${i + 1}. ${s.title}`, "", `<${s.url}>`, "", ...(s.note ? [s.note, ""] : []), ...(s.excerpt ? [`> ${s.excerpt}`, ""] : [])]))
        .join("\n"),
    [chosen],
  );

  return (
    <div className={styles.demo}>
      <div className={styles.grid}>
        <div className={`twig ${styles.panel}`} role="group" aria-label="Package this research">
          <p className={styles.h}>
            <TwigIcon name="package" size={18} /> Package this research
          </p>
          <p className={styles.sub}>From the space “{TITLE}”. Choose the sources and their order.</p>
          <ol className={styles.sources}>
            {SOURCES.map((s, i) => (
              <li key={s.url} className={`${styles.source} ${built && picked.has(i) && !reduced ? styles.fly : ""}`} style={{ "--i": i } as React.CSSProperties}>
                <label>
                  <input
                    type="checkbox"
                    checked={picked.has(i)}
                    onChange={(e) => {
                      setBuilt(false);
                      setPicked((p) => {
                        const n = new Set(p);
                        if (e.target.checked) n.add(i);
                        else if (n.size > 1) n.delete(i);
                        return n;
                      });
                    }}
                  />
                  <span className={styles.sourceText}>
                    <strong>{s.title}</strong>
                    <span className={styles.url}>{s.url}</span>
                    {s.note && <span className={styles.noteLine}>{s.note}</span>}
                    {s.excerpt && <span className={styles.excerpt}>“{s.excerpt}”</span>}
                  </span>
                </label>
              </li>
            ))}
          </ol>
          <div className={styles.row}>
            <button type="button" className={styles.primary} onClick={() => setBuilt(true)} aria-keyshortcuts="Alt+Meta+P">
              Package {chosen.length} {chosen.length === 1 ? "source" : "sources"} <kbd className="palette-kbd">⌥⌘P</kbd>
            </button>
            <span className={styles.hint}>Full addresses are included, so review them before sharing.</span>
          </div>
        </div>

        <div className={styles.output} aria-live="polite">
          <div className={`${styles.file} ${built ? styles.fileReady : ""}`}>
            <svg width="44" height="54" viewBox="0 0 44 54" aria-hidden="true">
              <path d="M4 2h24l12 12v36a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" className={styles.filePaper} />
              <path d="M28 2v12h12" className={styles.fileFold} />
              <path d="M12 40c3-8 8-14 18-16-2 9-8 14-18 16Zm0 0 9-8" className={styles.fileLeaf} />
            </svg>
            <div>
              <p className={styles.fileName}>{TITLE}.twig</p>
              <p className={`${styles.fileMeta} tnum`}>
                {built ? `${chosen.length} pages · ${(new Blob([json]).size / 1024).toFixed(1)} KB · saved to Downloads` : "Not packaged yet"}
              </p>
            </div>
          </div>
          <div className={styles.tabs} role="tablist" aria-label="Export format">
            {(
              [
                ["twig", ".twig"],
                ["md", "Markdown"],
                ["html", "HTML"],
              ] as [Format, string][]
            ).map(([f, label]) => (
              <button key={f} type="button" role="tab" aria-selected={format === f} className={styles.tab} onClick={() => setFormat(f)}>
                {label}
              </button>
            ))}
          </div>
          <div className={styles.preview} role="tabpanel">
            {format === "twig" && <pre className={styles.code}>{json}</pre>}
            {format === "md" && <pre className={styles.code}>{md}</pre>}
            {format === "html" && (
              <div className={styles.htmlDoc}>
                <h4>{TITLE}</h4>
                <p className={styles.htmlDesc}>Tides first, then the train, then the walk.</p>
                <ol>
                  {chosen.map((s) => (
                    <li key={s.url}>
                      <span className={styles.htmlLink}>{s.title}</span>
                      {s.note && <p>{s.note}</p>}
                      {s.excerpt && <blockquote>{s.excerpt}</blockquote>}
                    </li>
                  ))}
                </ol>
                <p className={styles.htmlFoot}>A standalone page. It opens in any browser, no twig needed.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
