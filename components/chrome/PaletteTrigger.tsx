"use client";

import { Icon } from "./Icon";
import styles from "./chrome.module.css";

export function openPalette() {
  window.dispatchEvent(new CustomEvent("twig:open-palette"));
}

export function PaletteTrigger({ compact = false }: { compact?: boolean }) {
  return (
    <button type="button" className={compact ? styles.iconButton : styles.paletteTrigger} onClick={openPalette} aria-label="Search the site" aria-keyshortcuts="Meta+K Control+K">
      <Icon name="search" size={compact ? 20 : 16} />
      {!compact && (
        <>
          <span>Search</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </>
      )}
    </button>
  );
}
