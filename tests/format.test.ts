import { describe, it, expect } from "vitest";
import { formatBytes, formatDate, versionAnchor } from "../lib/format";

describe("format", () => {
  it("bytes to MB with one decimal", () => expect(formatBytes(3_801_234)).toBe("3.8 MB"));
  it("small sizes in KB", () => expect(formatBytes(52_000)).toBe("52 KB"));
  it("dates in long English form, UTC", () => expect(formatDate("2026-09-30T04:42:28Z")).toBe("30 September 2026"));
  it("version anchors", () => expect(versionAnchor("0.1.3")).toBe("v0-1-3"));
});
