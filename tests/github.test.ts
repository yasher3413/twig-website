import { describe, it, expect, vi, afterEach } from "vitest";
import snapshot from "../content/releases.snapshot.json";
import { parseReleases, getReleases, getRepo } from "../lib/github";

afterEach(() => vi.unstubAllGlobals());

describe("releases", () => {
  it("parses newest first with dmg size", () => {
    const r = parseReleases(snapshot);
    expect(r[0].version).toBe("0.1.3");
    expect(r[0].dmgSize).toBeGreaterThan(1_000_000);
    expect(r.map((x) => x.version)).toEqual(["0.1.3", "0.1.2", "0.1.1", "0.1.0"]);
  });
  it("in production at runtime, a failed fetch throws so the last good page is kept", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "phase-production-server");
    await expect(getReleases()).rejects.toThrow();
    vi.unstubAllEnvs();
  });
  it("at build time, a failed fetch uses the snapshot", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "phase-production-build");
    expect((await getReleases())[0].version).toBe("0.1.3");
    vi.unstubAllEnvs();
  });
  it("falls back to the snapshot when the API fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect((await getReleases())[0].version).toBe("0.1.3");
  });
  it("falls back when the API is rate limited", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response('{"message":"rate limit"}', { status: 403 })));
    expect((await getReleases())[0].version).toBe("0.1.3");
  });
  it("falls back when the API returns something unexpected", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response('{"oops":true}', { status: 200 })));
    expect((await getReleases())[0].version).toBe("0.1.3");
  });
  it("ignores drafts and malformed entries", () => {
    expect(parseReleases([{ draft: true, tag_name: "v9" }, { nonsense: 1 }])).toEqual([]);
    expect(parseReleases(null)).toEqual([]);
  });
  it("repo stars are null when the API fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect((await getRepo()).stars).toBeNull();
  });
});
