import { Chapter } from "./Chapter";
import { LazyCheckpoints } from "@/components/demos/lazy";

export function CheckpointsChapter() {
  return (
    <Chapter
      id="checkpoints"
      field="plum"
      node="fork"
      when="At every turning point"
      title="Save where you are. Fork where you might go."
      intro={
        <>
          <p>Spaces keep separate piles of tabs, and split view puts two pages side by side. Everything survives a quit.</p>
          <p>
            A checkpoint is a named snapshot of a space, with a note, on a timeline. Resume one later, or fork it into a new space and explore another
            direction without losing the first.
          </p>
          <p className="muted">Checkpoints keep addresses and layout, not old copies of websites or your sign-ins.</p>
        </>
      }
      demo={<LazyCheckpoints />}
      source={{ href: "/docs/checkpoints", label: "How checkpoints work" }}
    />
  );
}
