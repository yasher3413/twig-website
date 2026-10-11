// Every text/background pair the site uses must reach WCAG AA (4.5:1).
const L = (h) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [L(a), L(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const pairs = [
  ["light ink on paper", "#23261f", "#f6f4ee"],
  ["light muted on paper", "#62665a", "#f6f4ee"],
  ["light muted on strip", "#62665a", "#e8e5d8"],
  ["light moss link on paper", "#4b6b3a", "#f6f4ee"],
  ["paper on moss field", "#f6f4ee", "#4b6b3a"],
  ["paper on ocean field", "#f6f4ee", "#2b6e7a"],
  ["paper on clay field", "#f6f4ee", "#8f4a26"],
  ["ink on honey field", "#23261f", "#e0b24d"],
  ["paper on plum field", "#f6f4ee", "#6b4a82"],
  ["paper on slate field", "#f6f4ee", "#52564c"],
  ["dark ink on paper", "#e9e7dd", "#17190f"],
  ["dark muted on paper", "#9a9c8d", "#17190f"],
  ["dark moss on paper", "#8fbb6e", "#17190f"],
  ["dark ink on moss field", "#e9e7dd", "#243320"],
  ["dark ink on ocean field", "#e9e7dd", "#1a3236"],
  ["dark ink on clay field", "#e9e7dd", "#3a2518"],
  ["dark ink on honey field", "#e9e7dd", "#3a3015"],
  ["dark ink on plum field", "#e9e7dd", "#2f2537"],
  ["dark ink on slate field", "#e9e7dd", "#2a2c25"],
  ["dark mark on moss field", "#8fbb6e", "#243320"],
  ["dark mark on honey field", "#e0b24d", "#3a3015"],
  ["forest ink on forest", "#e9e7dd", "#101208"],
  ["forest muted on forest", "#a3a594", "#101208"],
  ["light mark on moss (when text)", "#dcedce", "#4b6b3a"],
  ["light mark on ocean (when text)", "#d9f1f3", "#2b6e7a"],
  ["light mark on clay (when text)", "#f6d8c5", "#8f4a26"],
  ["light mark on honey (when text)", "#5a4210", "#e0b24d"],
  ["light mark on plum (when text)", "#e2d0ef", "#6b4a82"],
  ["light mark on slate (when text)", "#dfe1d6", "#52564c"],
  ["moss button text", "#f6f4ee", "#4b6b3a"],
  ["dark moss button text", "#101208", "#8fbb6e"],
];
let bad = 0;
for (const [name, fg, bg] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= 4.5;
  if (!ok) bad++;
  console.log(`${ok ? "ok  " : "FAIL"} ${r.toFixed(2).padStart(5)}  ${name}`);
}
process.exit(bad ? 1 : 0);
