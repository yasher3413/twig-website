import { Chapter } from "./Chapter";
import { LazyKeyboard } from "@/components/demos/lazy";

export function KeyboardChapter() {
  return (
    <Chapter
      id="keyboard"
      field="slate"
      when="Without lifting your hands"
      title="Every shortcut is yours to change."
      layout="wide"
      intro={
        <>
          <p>Everything twig does is on a real menu with a real shortcut. Press one below and its key lights up.</p>
          <p className="muted">These are the defaults. Rebind any of them in Settings → Shortcuts, or from ⌘K → Customize keyboard shortcuts.</p>
        </>
      }
      demo={<LazyKeyboard />}
      source={{ href: "/docs/keyboard-shortcuts", label: "The full shortcut table" }}
    />
  );
}
