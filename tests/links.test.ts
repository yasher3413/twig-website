import { describe, it, expect } from "vitest";
import { socialLinks, contactHref, donateHref, DOWNLOAD_URL } from "../lib/links";
import { siteConfig } from "../site.config";

describe("links", () => {
  it("only returns socials that are set", () => {
    const l = socialLinks();
    expect(l.every((s) => typeof s.href === "string" && s.href.startsWith("https://"))).toBe(true);
    expect(l.map((s) => s.key)).toEqual(expect.arrayContaining(["instagram", "linkedin", "x", "github"]));
    expect(l.find((s) => s.key === "bluesky")).toBeUndefined();
  });
  it("falls back to GitHub issues when no email", () => {
    expect(siteConfig.contactEmail).toBeNull();
    expect(contactHref()).toBe("https://github.com/yasher3413/twig/issues");
  });
  it("uses mailto when an email is set", () => {
    expect(contactHref({ ...siteConfig, contactEmail: "a@b.co" })).toBe("mailto:a@b.co");
  });
  it("has no donate href until a url is set", () => {
    expect(donateHref()).toBeNull();
  });
  it("download url is the stable latest asset", () => {
    expect(DOWNLOAD_URL).toBe("https://github.com/yasher3413/twig/releases/latest/download/twig-macos-arm64.dmg");
  });
  it("never yields an empty or null-string href", () => {
    const hrefs = [...socialLinks().map((s) => s.href), contactHref()];
    expect(hrefs.some((h) => !h || h.includes("null") || h.includes("undefined"))).toBe(false);
  });
});
