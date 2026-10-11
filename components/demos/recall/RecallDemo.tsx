"use client";

import { useMemo, useState } from "react";
import { createIndex, type SnippetPart } from "@/lib/recall-search";
import { RECALL_DOCS, RECALL_SPACES } from "@/content/demo-data/recall";
import { TwigIcon } from "@/components/twig-ui/TwigIcon";
import "@/components/twig-ui/twig-ui.css";
import styles from "./recall.module.css";

const SUGGESTIONS = ["moon", "starter doubles", "borrow checker", "couchettes"];
const fmt = (d: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(d));

function Highlighted({ parts }: { parts: SnippetPart[] }) {
  return (
    <>
      {parts.map((p, i) => (p.match ? <mark key={i}>{p.text}</mark> : <span key={i}>{p.text}</span>))}
    </>
  );
}

function highlightBody(text: string, terms: Set<string>): SnippetPart[] {
  if (!terms.size) return [{ text, match: false }];
  const out: SnippetPart[] = [];
  let last = 0;
  for (const m of text.matchAll(/[\p{L}\p{N}]+/gu)) {
    const lower = m[0].toLowerCase();
    if ([...terms].some((t) => lower.startsWith(t))) {
      if (m.index! > last) out.push({ text: text.slice(last, m.index), match: false });
      out.push({ text: m[0], match: true });
      last = m.index! + m[0].length;
    }
  }
  if (last < text.length) out.push({ text: text.slice(last), match: false });
  return out;
}

// A working copy of Recall's layout over invented reading copies. Search
// runs in your browser; nothing is sent anywhere.
export function RecallDemo() {
  const index = useMemo(() => createIndex(RECALL_DOCS), []);
  const [query, setQuery] = useState("moon");
  const [space, setSpace] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  const hits = useMemo(() => {
    if (!query.trim()) {
      return RECALL_DOCS.filter((d) => (!space || d.space === space) && (!from || d.date >= from) && (!to || d.date <= to))
        .slice()
        .reverse()
        .map((d) => ({ id: d.id, score: 0, snippet: [{ text: d.text.slice(0, 120) + "…", match: false }] }));
    }
    return index.search(query, { space: space || undefined, from: from || undefined, to: to || undefined });
  }, [index, query, space, from, to]);

  const selectedId = picked && hits.some((h) => h.id === picked) ? picked : hits[0]?.id ?? null;
  const doc = RECALL_DOCS.find((d) => d.id === selectedId);
  const terms = useMemo(
    () => new Set((query.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((w) => w.replace(/(ing|ed|es|s)$/, "")).filter((w) => w.length >= 2)),
    [query],
  );

  return (
    <div className={`twig ${styles.recall}`} role="group" aria-label="Recall, working demo">
      <header className={styles.header}>
        <div>
          <p className={styles.h1}>
            <TwigIcon name="recall" size={20} /> Recall
          </p>
          <p className={styles.tag}>Find the passage. Pick up the thought.</p>
        </div>
        <kbd className="palette-kbd">⇧⌘F</kbd>
      </header>
      <div className={styles.filters}>
        <label className={styles.search}>
          <TwigIcon name="search" size={17} />
          <input name="recall-search" autoComplete="off" spellCheck={false} aria-label="Search saved page text" value={query} placeholder="Words you remember reading…" onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className={styles.filterRow}>
          <label>
            Space
            <select aria-label="Filter by space" value={space} onChange={(e) => setSpace(e.target.value)}>
              <option value="">All spaces</option>
              {RECALL_SPACES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            From
            <input type="date" name="recall-from" aria-label="Captured from" value={from} min="2026-09-01" max="2026-09-30" onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label>
            Through
            <input type="date" name="recall-through" aria-label="Captured through" value={to} min="2026-09-01" max="2026-09-30" onChange={(e) => setTo(e.target.value)} />
          </label>
          <div className={styles.try}>
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => setQuery(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <aside className={styles.results} aria-label="Matching saved pages">
          <p className={styles.count} role="status" aria-live="polite">
            {hits.length} {hits.length === 1 ? "saved copy" : "saved copies"}
          </p>
          <div className={styles.list}>
            {hits.length === 0 && (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>No passages found</p>
                <p>Try fewer words, another space, or a wider date range.</p>
              </div>
            )}
            {hits.map((h) => {
              const d = RECALL_DOCS.find((x) => x.id === h.id)!;
              return (
                <button key={h.id} type="button" className={`${styles.result} ${h.id === selectedId ? styles.selected : ""}`} onClick={() => setPicked(h.id)} aria-pressed={h.id === selectedId}>
                  <strong>{d.title}</strong>
                  <span className={styles.url}>{d.url}</span>
                  <span className={styles.snippet}>
                    <Highlighted parts={h.snippet} />
                  </span>
                  <span className={`${styles.meta} tnum`}>
                    {d.space} · {fmt(d.date)}
                  </span>
                </button>
              );
            })}
          </div>
          <p className={styles.local}>
            <TwigIcon name="lock" size={12} /> Saved on this Mac · up to 2,000 copies
          </p>
        </aside>
        <div className={styles.detail}>
          {doc ? (
            <>
              <p className={styles.copyTitle}>{doc.title}</p>
              <p className={styles.source}>{doc.url}</p>
              <p className={`${styles.muted} tnum`}>
                Saved {fmt(doc.date)} · {doc.space}
              </p>
              <p className={styles.readingLabel}>Saved reading copy</p>
              <p className={styles.note}>Plain text captured on this date. Readable even if the page changes or disappears.</p>
              <div className={styles.reading}>
                <Highlighted parts={highlightBody(doc.text, terms)} />
              </div>
            </>
          ) : (
            <div className={styles.emptyDetail}>
              <p className={styles.emptyTitle}>A phrase is enough to begin.</p>
              <p>Search words from a page, then narrow by when and where you read it.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
