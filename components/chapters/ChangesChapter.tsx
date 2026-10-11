import { Chapter } from "./Chapter";
import { LazyChanges } from "@/components/demos/lazy";

export function ChangesChapter() {
  return (
    <Chapter
      id="changes"
      field="clay"
      when="The next time you visit"
      title="See what changed since you last read it."
      layout="wide"
      intro={
        <>
          <p>Come back to a page and a small Changed chip tells you its text is different from your last visit. Open it, and a panel beside the page shows what was added, removed and edited.</p>
          <p className="muted">It ignores timestamps and counters, doesn&apos;t flag feeds, and you can mute any site that changes too often to be useful.</p>
        </>
      }
      demo={<LazyChanges />}
      source={{ href: "/docs/changes", label: "How changes are detected" }}
    />
  );
}
