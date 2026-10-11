import { describe, it, expect } from "vitest";
import { buildIndex, rank } from "../lib/search-index";

describe("site search index", () => {
  const index = buildIndex();
  it("has sections, pages, docs and commands", () => {
    const groups = new Set(index.map((e) => e.group));
    for (const g of ["Sections", "Pages", "Docs", "Commands"]) expect(groups.has(g as never)).toBe(true);
  });
  it("every entry either navigates or runs something", () => {
    expect(index.every((e) => !!e.href || !!e.action)).toBe(true);
  });
  it("finds recall by a keyword, not only its title", () => {
    expect(rank(index, "full-text")[0]?.title).toMatch(/Recall/);
  });
  it("finds the Gatekeeper help", () => {
    expect(rank(index, "open anyway").some((e) => /first launch|troubleshooting/i.test(e.title))).toBe(true);
  });
  it("empty query returns nothing", () => expect(rank(index, "  ")).toEqual([]));
});
