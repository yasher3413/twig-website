import { describe, it, expect } from "vitest";
import { safeJsonLd } from "../lib/seo";

describe("json-ld", () => {
  it("escapes < so a tag can't close the script element", () => {
    const out = safeJsonLd({ v: "0.1.3</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(out).toContain("\\u003c");
  });
});
