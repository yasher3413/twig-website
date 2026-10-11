import { describe, it, expect } from "vitest";
import { renderMarkdown } from "../lib/markdown";

describe("renderMarkdown", () => {
  it("renders headings and lists", () => {
    const h = renderMarkdown("### New\n- **Bold** item");
    expect(h).toContain("<h3");
    expect(h).toContain("<li><strong>Bold</strong> item</li>");
  });
  it("drops script tags", () => expect(renderMarkdown("hi <script>alert(1)</script>")).not.toMatch(/<script/i));
  it("drops event handler attributes", () => expect(renderMarkdown('<img src="x" onerror="alert(1)">')).not.toMatch(/onerror/i));
  it("neutralises javascript: links", () => expect(renderMarkdown("[x](javascript:alert(1))")).not.toMatch(/javascript:/i));
  it("external links open safely", () => expect(renderMarkdown("[gh](https://github.com)")).toContain('rel="noopener"'));
  it("drops iframes", () => expect(renderMarkdown('<iframe src="https://evil.example"></iframe>')).not.toMatch(/<iframe/i));
});
