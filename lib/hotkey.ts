type KeyLike = { key: string; metaKey: boolean; ctrlKey: boolean; altKey: boolean; shiftKey: boolean };

// ⌘K on a Mac, Ctrl+K elsewhere; nothing else. Plain letters never open the
// palette, so typing in a field is never interrupted.
export function isPaletteHotkey(e: KeyLike): boolean {
  return e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey;
}
