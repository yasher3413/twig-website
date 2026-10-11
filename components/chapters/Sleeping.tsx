import { Chapter } from "./Chapter";
import { LazySixty, LazySleeping } from "@/components/demos/lazy";
import { LifeScale } from "@/components/almanac/LifeScale";

export function SleepingChapter() {
  return (
    <Chapter
      id="sleeping"
      field="paper"
      when="After 10 minutes"
      title="The browser you can close tabs in. Or keep them all."
      lead={<LifeScale />}
      intro={
        <>
          <p>A tab you haven&apos;t looked at for ten minutes falls asleep. It keeps its title, its address and where you&apos;d scrolled to, and gives back the memory it was holding.</p>
          <p className="muted">
            Only a few stay awake: three, five or ten, your choice. A tab that&apos;s playing something, holding text you haven&apos;t sent, or using your camera or
            microphone is never put to sleep. New and restored tabs cost nothing until you open them.
          </p>
        </>
      }
      demo={<LazySleeping />}
      source={{ href: "/docs/tabs", label: "How sleeping tabs work" }}
    >
      <LazySixty />
    </Chapter>
  );
}
