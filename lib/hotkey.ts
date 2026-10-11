type KeyLike = { key: string; code?: string; metaKey: boolean; ctrlKey: boolean; altKey: boolean; shiftKey: boolean };

// ⌘K on a Mac, Ctrl+K elsewhere; nothing else. Plain letters never open the
// palette, so typing in a field is never interrupted.
export function isPaletteHotkey(e: KeyLike): boolean {
  // The physical K key counts too, so ⌘K works on non-Latin layouts.
  const isK = e.key.toLowerCase() === "k" || e.code === "KeyK";
  return isK && (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey;
}
