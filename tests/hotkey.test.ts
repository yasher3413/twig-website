import { describe, it, expect } from "vitest";
import { isPaletteHotkey } from "../lib/hotkey";

const k = (o: Partial<{ key: string; metaKey: boolean; ctrlKey: boolean; altKey: boolean; shiftKey: boolean }>) => ({
  key: "k",
  metaKey: false,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  ...o,
});

describe("palette hotkey", () => {
  it("⌘K opens", () => expect(isPaletteHotkey(k({ metaKey: true }))).toBe(true));
  it("Ctrl+K opens", () => expect(isPaletteHotkey(k({ ctrlKey: true }))).toBe(true));
  it("uppercase K from caps lock still opens with ⌘", () => expect(isPaletteHotkey(k({ key: "K", metaKey: true }))).toBe(true));
  it("plain k never opens (typing in inputs)", () => expect(isPaletteHotkey(k({}))).toBe(false));
  it("⇧⌘K does not open", () => expect(isPaletteHotkey(k({ key: "K", metaKey: true, shiftKey: true }))).toBe(false));
  it("⌥⌘K does not open", () => expect(isPaletteHotkey(k({ metaKey: true, altKey: true }))).toBe(false));
  it("⌘K on a non-Latin layout (physical K key) opens", () => expect(isPaletteHotkey({ ...k({ key: "л", metaKey: true }), code: "KeyK" })).toBe(true));
  it("other letters with ⌘ do not open", () => expect(isPaletteHotkey(k({ key: "l", metaKey: true }))).toBe(false));
});
