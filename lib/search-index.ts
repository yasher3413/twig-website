export type EntryGroup = "Sections" | "Pages" | "Docs" | "Commands";
export type CommandId = "theme" | "copy-quarantine" | "download" | "github";

export type Entry = {
  id: string;
  group: EntryGroup;
  title: string;
  detail?: string;
  href?: string;
  action?: CommandId;
  shortcut?: string;
  keywords: string[];
};

export const DOCS: { slug: string; title: string; keywords: string[] }[] = [
  { slug: "getting-started", title: "Getting started", keywords: ["install", "first launch", "open anyway", "gatekeeper", "welcome", "default browser", "import bookmarks"] },
  { slug: "tabs", title: "Tabs and sleeping tabs", keywords: ["hibernate", "sleep", "memory", "frugal", "balanced", "roomy", "awake"] },
  { slug: "spaces", title: "Spaces and split view", keywords: ["spaces", "split", "side by side", "session restore"] },
  { slug: "checkpoints", title: "Checkpoints", keywords: ["save", "fork", "timeline", "resume", "snapshot"] },
  { slug: "recall", title: "Recall", keywords: ["full-text", "search pages", "reading copies", "fts5", "find passage"] },
  { slug: "changes", title: "Changes since you last read", keywords: ["changed", "diff", "updated page"] },
  { slug: "snooze", title: "Snooze and sweep", keywords: ["snooze", "later", "sweep", "untouched", "archive"] },
  { slug: "research-packages", title: "Research packages", keywords: ["package", "export", ".twig", "markdown", "html", "share", "file format"] },
  { slug: "command-palette", title: "Command palette", keywords: ["cmd k", "⌘k", "commands", "search"] },
  { slug: "keyboard-shortcuts", title: "Keyboard shortcuts", keywords: ["keys", "rebind", "shortcuts", "hotkeys"] },
  { slug: "reading", title: "Reader view and link hints", keywords: ["reader", "link hints", "zoom", "find in page", "downloads"] },
  { slug: "privacy", title: "Privacy and your data", keywords: ["local", "data", "delete", "private window", "where is my data"] },
  { slug: "reporting-bugs", title: "Reporting bugs", keywords: ["bug", "issue", "report", "feedback"] },
  { slug: "troubleshooting", title: "Troubleshooting", keywords: ["gatekeeper", "open anyway", "unsupported browser", "sign in", "pop-up", "default browser"] },
  { slug: "building", title: "Building from source", keywords: ["build", "rust", "node", "xcode", "contribute", "tauri"] },
];

export function buildIndex(): Entry[] {
  const sections: Entry[] = [
    { id: "s-sleep", group: "Sections", title: "Sleeping tabs", href: "/#sleeping", keywords: ["memory", "hibernate", "wake"] },
    { id: "s-recall", group: "Sections", title: "Recall", href: "/#recall", keywords: ["full-text", "search", "read"] },
    { id: "s-changes", group: "Sections", title: "Changes since you last read", href: "/#changes", keywords: ["diff", "changed"] },
    { id: "s-snooze", group: "Sections", title: "Snooze and sweep", href: "/#snooze", keywords: ["later", "untouched"] },
    { id: "s-check", group: "Sections", title: "Spaces, checkpoints and forks", href: "/#checkpoints", keywords: ["fork", "timeline"] },
    { id: "s-pack", group: "Sections", title: "Research packages", href: "/#packages", keywords: ["export", "share"] },
    { id: "s-palette", group: "Sections", title: "⌘K everything", href: "/#palette", keywords: ["command palette"] },
    { id: "s-keys", group: "Sections", title: "Keyboard-first", href: "/#keyboard", keywords: ["shortcuts"] },
    { id: "s-local", group: "Sections", title: "Local-first and private", href: "/#local", keywords: ["privacy", "no account"] },
    { id: "s-engine", group: "Sections", title: "Built on your Mac's own engine", href: "/#engine", keywords: ["webkit", "tauri", "chromium", "lighter"] },
    { id: "s-oss", group: "Sections", title: "Open source", href: "/#open-source", keywords: ["github", "mit", "community"] },
  ];
  const pages: Entry[] = [
    { id: "p-download", group: "Pages", title: "Download", href: "/download", keywords: ["install", "dmg", "first launch", "open anyway", "requirements"] },
    { id: "p-releases", group: "Pages", title: "Release notes", href: "/releases", keywords: ["changelog", "what's new", "version"] },
    { id: "p-docs", group: "Pages", title: "Docs", href: "/docs", keywords: ["help", "guide"] },
    { id: "p-faq", group: "Pages", title: "FAQ", href: "/faq", keywords: ["questions", "intel", "windows", "sync", "extensions"] },
    { id: "p-about", group: "Pages", title: "About", href: "/about", keywords: ["story", "maker"] },
    { id: "p-donate", group: "Pages", title: "Support twig", href: "/donate", keywords: ["donate", "sponsor", "money"] },
    { id: "p-community", group: "Pages", title: "Community", href: "/community", keywords: ["discord", "contribute"] },
    { id: "p-brand", group: "Pages", title: "Brand and press kit", href: "/brand", keywords: ["logo", "icon", "colours", "screenshots"] },
    { id: "p-privacy", group: "Pages", title: "Privacy policy", href: "/legal/privacy", keywords: ["legal", "data"] },
  ];
  const docs: Entry[] = DOCS.map((d) => ({ id: `d-${d.slug}`, group: "Docs", title: d.title, href: `/docs/${d.slug}`, keywords: d.keywords }));
  const commands: Entry[] = [
    { id: "c-download", group: "Commands", title: "Download twig for Mac", action: "download", keywords: ["dmg", "install"] },
    { id: "c-theme", group: "Commands", title: "Change theme", detail: "System, light, dark", action: "theme", keywords: ["dark mode", "light mode", "appearance"] },
    { id: "c-copy", group: "Commands", title: "Copy the Open Anyway Terminal command", action: "copy-quarantine", keywords: ["xattr", "quarantine", "gatekeeper", "first launch"] },
    { id: "c-github", group: "Commands", title: "Open twig on GitHub", action: "github", keywords: ["source", "code", "repo", "star"] },
  ];
  return [...sections, ...pages, ...docs, ...commands];
}

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}.⌘ ]+/gu, " ").replace(/\s+/g, " ").trim();

/** Title matches outrank keyword matches; every query word must match somewhere. */
export function rank(index: Entry[], query: string): Entry[] {
  const q = norm(query);
  if (!q) return [];
  const words = q.split(" ");
  const scored: { e: Entry; score: number }[] = [];
  for (const e of index) {
    const title = norm(e.title);
    const keys = e.keywords.map(norm).join(" | ");
    let score = 0;
    let ok = true;
    for (const w of words) {
      if (title.startsWith(w)) score += 6;
      else if (title.includes(w)) score += 4;
      else if (keys.includes(w)) score += 2;
      else ok = false;
    }
    if (q.length > 2 && keys.includes(q)) score += 3;
    if (ok) scored.push({ e, score });
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.e);
}
