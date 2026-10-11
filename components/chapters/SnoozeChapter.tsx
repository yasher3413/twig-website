import { Chapter } from "./Chapter";
import { LazySnooze } from "@/components/demos/lazy";

export function SnoozeChapter() {
  return (
    <Chapter
      id="snooze"
      field="honey"
      when="Tuesday, 9:00 AM"
      title="Put a tab away until it matters."
      layout="wide"
      intro={
        <>
          <p>Snooze a tab for an hour, until this evening, the weekend, next week, or a time you pick. It closes straight away and comes back asleep in its own space, with a small dot until you look at it.</p>
          <p className="muted">
            When tabs sit untouched for weeks, twig suggests a sweep. Nothing happens until you open it, and archived tabs stay searchable in the Library.
          </p>
        </>
      }
      demo={<LazySnooze />}
      source={{ href: "/docs/snooze", label: "Snooze and sweep, in detail" }}
    />
  );
}
