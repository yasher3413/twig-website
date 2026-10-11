"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { buildIndex, rank, type Entry, type EntryGroup } from "@/lib/search-index";
import { DOWNLOAD_URL, QUARANTINE_COMMAND, REPO_URL } from "@/lib/links";
import { cycleTheme } from "./ThemeToggle";
import { Icon, type IconName } from "./Icon";
import "@/components/twig-ui/twig-ui.css";
import styles from "./palette.module.css";

const ORDER: EntryGroup[] = ["Sections", "Pages", "Docs", "Commands"];
const GROUP_LABEL: Record<EntryGroup, string> = { Sections: "On the home page", Pages: "Pages", Docs: "Docs", Commands: "Commands" };
const LEAD: Record<EntryGroup, IconName> = { Sections: "leaf", Pages: "page", Docs: "book", Commands: "command" };
const SUGGESTED = ["p-download", "s-sleep", "s-recall", "d-getting-started", "d-keyboard-shortcuts", "p-releases", "c-theme"];

// The same palette as the app: same surface, grouping and rows, built on
// cmdk for a proper accessible combobox.
export function PaletteDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const index = useMemo(buildIndex, []);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return SUGGESTED.map((id) => index.find((e) => e.id === id)!).filter(Boolean);
    return rank(index, query).slice(0, 24);
  }, [index, query]);

  const grouped = ORDER.map((g) => ({ g, items: results.filter((e) => e.group === g) })).filter((x) => x.items.length);

  const close = () => {
    onOpenChange(false);
    setQuery("");
  };

  const run = async (e: Entry) => {
    if (e.href) {
      close();
      router.push(e.href);
      return;
    }
    switch (e.action) {
      case "download":
        close();
        window.location.href = DOWNLOAD_URL;
        break;
      case "github":
        close();
        window.open(REPO_URL, "_blank", "noopener");
        break;
      case "theme": {
        const c = cycleTheme();
        setStatus(c === "system" ? "Theme now follows your Mac" : `Theme set to ${c}`);
        break;
      }
      case "copy-quarantine":
        try {
          await navigator.clipboard.writeText(QUARANTINE_COMMAND);
          setStatus("Copied. Paste it into Terminal after moving twig to Applications.");
        } catch {
          setStatus(`Couldn't copy. The command is: ${QUARANTINE_COMMAND}`);
        }
        break;
    }
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(o) => (o ? onOpenChange(true) : close())}
      label="Search twig's site"
      shouldFilter={false}
      loop
      overlayClassName={styles.overlay}
      contentClassName={`twig ${styles.content}`}
    >
      <div className="palette">
        <div className="palette-field">
          <Icon name="search" size={17} />
          <Command.Input className="palette-input" value={query} onValueChange={setQuery} placeholder="Search the site, the docs, or type a command" />
        </div>
        <Command.List className="palette-list">
          <Command.Empty className="palette-empty">Nothing here matches. Try a feature name, like “snooze” or “recall”.</Command.Empty>
          {grouped.map(({ g, items }) => (
            <Command.Group key={g} heading={query.trim() ? GROUP_LABEL[g] : g === "Commands" ? "Commands" : "Suggested"}>
              {items.map((e) => (
                <Command.Item key={e.id} value={e.id} className="palette-row" onSelect={() => run(e)}>
                  <span className="palette-lead">
                    <Icon name={LEAD[e.group]} size={16} />
                  </span>
                  <span className="palette-text">
                    <span className="palette-label">{e.title}</span>
                  </span>
                  {e.detail && <span className="palette-detail">{e.detail}</span>}
                  {!e.detail && !query.trim() && e.group !== "Commands" && <span className="palette-detail">{GROUP_LABEL[e.group]}</span>}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
        <footer className="palette-foot">
          <span>
            <kbd className="palette-kbd">↑</kbd>
            <kbd className="palette-kbd">↓</kbd> to move
          </span>
          <span>
            <kbd className="palette-kbd">↵</kbd> to open
          </span>
          <span>
            <kbd className="palette-kbd">esc</kbd> to close
          </span>
          <span className={styles.status} role="status" aria-live="polite">
            {status}
          </span>
        </footer>
      </div>
    </Command.Dialog>
  );
}
