import { Chapter } from "./Chapter";
import { LazyAppPalette } from "@/components/demos/lazy";

export function PaletteChapter() {
  return (
    <Chapter
      id="palette"
      field="paper"
      when="Any time, ⌘K"
      title="One palette for everything."
      layout="split-reverse"
      intro={
        <>
          <p>⌘K searches your open tabs, bookmarks, history and the words inside pages you&apos;ve read, and runs commands, all from one list.</p>
          <p className="muted">This site has the same palette. Press ⌘K, or Ctrl+K, anywhere here to search the docs or jump to a section.</p>
        </>
      }
      demo={<LazyAppPalette />}
      source={{ href: "/docs/command-palette", label: "Everything the palette can do" }}
    />
  );
}
