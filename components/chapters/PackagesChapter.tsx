import { Chapter } from "./Chapter";
import { LazyPackages } from "@/components/demos/lazy";

export function PackagesChapter() {
  return (
    <Chapter
      id="packages"
      field="strip"
      when="When you're ready to share"
      title="Bundle a space into one file."
      layout="wide"
      intro={
        <>
          <p>
            A research package gathers a space&apos;s sources, in your reading order, with notes and the passages you picked. Export it as a{" "}
            <code>.twig</code> file someone else can import, or as Markdown or a standalone HTML page anyone can read.
          </p>
          <p className="muted">There&apos;s no upload service. You choose how to send the file. Cookies, form contents and private windows are never included.</p>
        </>
      }
      demo={<LazyPackages />}
      source={{ href: "/docs/research-packages", label: "The package format" }}
    />
  );
}
