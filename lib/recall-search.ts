// A tiny stand-in for Recall's SQLite FTS5 index, for the home page demo:
// word matching with light English stemming, AND semantics, prefix matching
// on the word still being typed, and space/date filters. Pure and local.

export type RecallDoc = { id: string; title: string; url: string; space: string; date: string; text: string };
export type SnippetPart = { text: string; match: boolean };
export type RecallHit = { id: string; score: number; snippet: SnippetPart[] };
export type RecallFilter = { space?: string; from?: string; to?: string };

const WORD = /[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu;

export function stem(word: string): string {
  let w = word.toLowerCase().replace(/['’]s$/, "");
  if (w.length > 5 && w.endsWith("ing")) w = w.slice(0, -3);
  else if (w.length > 4 && w.endsWith("ed")) w = w.slice(0, -2);
  else if (w.length > 4 && /(ss|x|z|ch|sh)es$/.test(w)) w = w.slice(0, -2);
  else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
  return w;
}

function tokens(text: string): string[] {
  return (text.match(WORD) ?? []).map(stem);
}

export function createIndex(docs: RecallDoc[]) {
  const prepared = docs.map((d) => {
    const all = [...tokens(d.title), ...tokens(d.text)];
    const counts = new Map<string, number>();
    for (const t of all) counts.set(t, (counts.get(t) ?? 0) + 1);
    return { d, counts, keys: [...counts.keys()] };
  });

  function search(query: string, filter: RecallFilter = {}): RecallHit[] {
    const raw = query.match(WORD) ?? [];
    if (!raw.length) return [];
    const words = raw.map(stem);
    const lastIsPrefix = !/\s$/.test(query);
    const hits: RecallHit[] = [];
    for (const { d, counts, keys } of prepared) {
      if (filter.space && d.space !== filter.space) continue;
      if (filter.from && d.date < filter.from) continue;
      if (filter.to && d.date > filter.to) continue;
      let score = 0;
      const matched: string[] = [];
      let ok = true;
      words.forEach((w, i) => {
        if (!ok) return;
        const exact = counts.get(w);
        if (exact) {
          score += exact * 2;
          matched.push(w);
          return;
        }
        if (i === words.length - 1 && lastIsPrefix && w.length >= 3) {
          const pre = keys.filter((k) => k.startsWith(w));
          if (pre.length) {
            score += pre.reduce((n, k) => n + (counts.get(k) ?? 0), 0);
            matched.push(...pre);
            return;
          }
        }
        ok = false;
      });
      if (ok) hits.push({ id: d.id, score, snippet: snippet(d.text, matched) });
    }
    return hits.sort((a, b) => b.score - a.score);
  }

  return { search };
}

function snippet(text: string, stems: string[], radius = 70): SnippetPart[] {
  const set = new Set(stems);
  const marks: { start: number; end: number }[] = [];
  for (const m of text.matchAll(WORD)) {
    if (set.has(stem(m[0]))) marks.push({ start: m.index!, end: m.index! + m[0].length });
  }
  if (!marks.length) {
    const head = text.slice(0, radius * 2);
    return [{ text: head + (text.length > head.length ? "…" : ""), match: false }];
  }
  let from = Math.max(0, marks[0].start - radius);
  let to = Math.min(text.length, marks[0].end + radius);
  // Snap to word edges so the excerpt never cuts a word in half.
  if (from > 0) from = text.indexOf(" ", from) + 1 || from;
  if (to < text.length) to = text.lastIndexOf(" ", to) > marks[0].end ? text.lastIndexOf(" ", to) : to;
  const parts: SnippetPart[] = [];
  let cur = from;
  for (const m of marks) {
    if (m.start < from || m.end > to) continue;
    if (m.start > cur) parts.push({ text: text.slice(cur, m.start), match: false });
    parts.push({ text: text.slice(m.start, m.end), match: true });
    cur = m.end;
  }
  if (cur < to) parts.push({ text: text.slice(cur, to), match: false });
  if (from > 0) parts.unshift({ text: "…", match: false });
  if (to < text.length) parts.push({ text: "…", match: false });
  return parts;
}
