import { describe, it, expect } from "vitest";
import { createIndex } from "../lib/recall-search";

const docs = [
  { id: "a", title: "Sourdough starter guide", url: "https://example.org/bread", space: "Kitchen", date: "2026-09-02", text: "Feed the starter twice daily. A ripe starter doubles in size." },
  { id: "b", title: "Tide tables explained", url: "https://example.org/tides", space: "Sailing", date: "2026-08-14", text: "Spring tides happen near the new and full moon." },
];

describe("recall search", () => {
  const idx = createIndex(docs);
  it("finds by a word inside the page", () => expect(idx.search("doubles")[0].id).toBe("a"));
  it("stems: feeding matches feed", () => expect(idx.search("feeding")[0].id).toBe("a"));
  it("matches title words too", () => expect(idx.search("explained")[0].id).toBe("b"));
  it("AND semantics", () => expect(idx.search("moon starter")).toEqual([]));
  it("filters by space", () => expect(idx.search("tides", { space: "Kitchen" })).toEqual([]));
  it("filters by date range inclusive", () => expect(idx.search("tides", { from: "2026-08-14", to: "2026-08-14" }).length).toBe(1));
  it("excludes outside the range", () => expect(idx.search("tides", { from: "2026-08-15" })).toEqual([]));
  it("empty or punctuation query returns nothing, no throw", () => {
    expect(idx.search("")).toEqual([]);
    expect(idx.search("  ?! ")).toEqual([]);
  });
  it("is case insensitive", () => expect(idx.search("SPRING")[0].id).toBe("b"));
  it("snippet marks the match", () => {
    const snip = idx.search("ripe")[0].snippet;
    expect(snip.some((p) => p.match && p.text.toLowerCase() === "ripe")).toBe(true);
  });
  it("snippet text joins back into the original passage", () => {
    const snip = idx.search("ripe")[0].snippet.map((p) => p.text).join("");
    expect(docs[0].text.includes(snip.replace(/^…|…$/g, "").trim())).toBe(true);
  });
  it("prefix matching for the word being typed", () => expect(idx.search("doub")[0]?.id).toBe("a"));
});
