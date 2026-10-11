import { describe, it, expect } from "vitest";
import { buildAtom } from "../lib/feed";
import type { Release } from "../lib/github";

const releases: Release[] = [
  { tag: "v0.1.3", version: "0.1.3", name: "twig 0.1.3", date: "2026-09-30T04:42:28Z", body: "Fixes <script> & more", url: "https://github.com/yasher3413/twig/releases/tag/v0.1.3", dmgSize: 3_800_000 },
  { tag: "v0.1.2", version: "0.1.2", name: "twig 0.1.2", date: "2026-09-29T22:48:06Z", body: "- one\n- two", url: "https://github.com/yasher3413/twig/releases/tag/v0.1.2", dmgSize: null },
];

describe("atom feed", () => {
  const xml = buildAtom(releases, "https://twig.example");
  it("is an atom feed", () => expect(xml).toContain('<feed xmlns="http://www.w3.org/2005/Atom">'));
  it("has one entry per release", () => expect(xml.match(/<entry>/g)?.length).toBe(2));
  it("uses the release url as the entry id", () => expect(xml).toContain("<id>https://github.com/yasher3413/twig/releases/tag/v0.1.3</id>"));
  it("drops raw HTML from bodies and escapes the rest", () => {
    expect(xml).not.toContain("<script>");
    expect(xml).not.toContain("&lt;script&gt;");
    expect(xml).toContain("Fixes");
    expect(xml).toContain("&amp;");
  });
  it("feed updated is the newest release date", () => expect(xml).toContain("<updated>2026-09-30T04:42:28Z</updated>"));
  it("links back to the release notes page", () => expect(xml).toContain('href="https://twig.example/releases"'));
});
