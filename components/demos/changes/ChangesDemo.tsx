"use client";

import { useEffect, useRef, useState } from "react";
import { Window, Viewport, TabStrip, Toolbar, TwigIcon, type TabModel } from "@/components/twig-ui";
import styles from "./changes.module.css";

const HOST = "railtrips.example";
const TABS: TabModel[] = [
  { id: "a", title: "Saving seed from your own plants", host: "allotment.example", state: "asleep", mark: { bg: "rgba(75,107,58,.16)", fg: "#4b6b3a" } },
  { id: "b", title: "The north line, overnight", host: HOST, state: "awake", mark: { bg: "rgba(82,86,76,.16)", fg: "#52564c" } },
  { id: "c", title: "Reading a contour map", host: "fellwalks.example", state: "asleep", mark: { bg: "rgba(43,110,122,.16)", fg: "#2b6e7a" } },
];

// What you read on 12 September, and what the page says now. The panel
// mirrors twig's: edited words marked inside the paragraph, removed
// paragraphs struck through, added ones tinted.
export function ChangesDemo() {
  const [open, setOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const chip = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) heading.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    chip.current?.focus();
  };

  return (
    <div className={styles.demo}>
      <Window className={styles.window} label="A twig window showing a page that changed since you read it">
        <TabStrip tabs={TABS} activeId="b" />
        <Toolbar
          host={HOST}
          path="/night/north-line"
          trailing={
            <button ref={chip} type="button" className="change-chip" aria-expanded={open} aria-controls="changes-demo-panel" onClick={() => (open ? close() : setOpen(true))}>
              <span className="change-dot" aria-hidden="true" />
              Changed · Sep 12
            </button>
          }
        />
        <Viewport className={styles.viewport}>
          <article className={`${styles.page} ${open ? styles.pageNarrow : ""}`}>
            <p className={styles.kicker}>Rail Trips</p>
            <h3 className={styles.title}>The north line, overnight</h3>
            <p className={`${styles.stamp} tnum`}>Updated 3 hours ago · 1,204 views</p>
            <p>
              Departs at <strong>21:55</strong> and arrives at 07:15. Couchettes sell out first on Fridays, so book midweek if you can.
            </p>
            <p>Change at the border station, where the connection waits for the sleeper.</p>
            <p>A breakfast trolley now runs from 06:00, before the morning stop.</p>
          </article>
          {open && (
            <aside id="changes-demo-panel" className="changes" aria-labelledby="changes-demo-heading" onKeyDown={(e) => e.key === "Escape" && close()}>
              <header className="changes-header">
                <div>
                  <h3 id="changes-demo-heading" ref={heading} tabIndex={-1}>
                    What changed since you read it
                  </h3>
                  <p className="changes-range">Sep 12 → today</p>
                </div>
                <button type="button" className="panel-icon" aria-label="Close" title="Close (Esc)" onClick={close}>
                  <TwigIcon name="close" size={14} />
                </button>
              </header>
              <p className="changes-counts" aria-label="1 added, 1 removed, 1 edited">
                <span className="added">+1</span>
                <span className="removed">−1</span>
                <span className="edited">~1</span>
              </p>
              <div className="changes-body">
                <p className="change-passage edited">
                  <span className={styles.vh}>Edited: </span>Departs at <del>21:40</del>
                  <ins>21:55</ins> and arrives at 07:15. Couchettes sell out first on Fridays, so book midweek if you can.
                </p>
                <p className="change-gap">⋯ 1 unchanged paragraph</p>
                <p className="change-passage removed">
                  <span className={styles.vh}>Removed: </span>Bring water: the café car closes at midnight.
                </p>
                <p className="change-passage added">
                  <span className={styles.vh}>Added: </span>A breakfast trolley now runs from 06:00, before the morning stop.
                </p>
              </div>
              <footer className="changes-footer">
                <button type="button" className="panel-button">
                  <TwigIcon name="recall" size={13} /> Open in Recall
                </button>
                <button type="button" className="panel-button quiet">
                  Don&apos;t flag changes on {HOST}
                </button>
              </footer>
            </aside>
          )}
        </Viewport>
      </Window>
      <p className={styles.note}>
        {open
          ? "The “updated 3 hours ago” line and the view counter changed too. twig ignores timestamps and counters, so they aren't flagged."
          : "Click “Changed · Sep 12” in the address bar."}
      </p>
    </div>
  );
}
