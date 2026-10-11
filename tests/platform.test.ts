import { describe, it, expect } from "vitest";
import { detectPlatform } from "../lib/platform";

const MAC = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15";

describe("detectPlatform", () => {
  it("safari on mac with no hints is unknown chip", () => expect(detectPlatform({ ua: MAC })).toBe("mac-unknown"));
  it("client hints arm → mac-arm", () => expect(detectPlatform({ ua: MAC, platform: "macOS", arch: "arm" })).toBe("mac-arm"));
  it("client hints x86 → mac-intel", () => expect(detectPlatform({ ua: MAC, platform: "macOS", arch: "x86" })).toBe("mac-intel"));
  it("webgl Apple M renderer → mac-arm", () => expect(detectPlatform({ ua: MAC, webglRenderer: "ANGLE (Apple, ANGLE Metal Renderer: Apple M2 Pro, Unspecified Version)" })).toBe("mac-arm"));
  it("webgl Intel renderer alone stays unknown (could be a VM or override)", () =>
    expect(detectPlatform({ ua: MAC, webglRenderer: "Intel Iris OpenGL Engine" })).toBe("mac-unknown"));
  it("x86 hint but an Apple M renderer (Chrome under Rosetta) is still mac-arm", () =>
    expect(detectPlatform({ ua: MAC, platform: "macOS", arch: "x86", webglRenderer: "ANGLE (Apple, ANGLE Metal Renderer: Apple M1, Unspecified Version)" })).toBe("mac-arm"));
  it("windows", () => expect(detectPlatform({ ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" })).toBe("windows"));
  it("linux", () => expect(detectPlatform({ ua: "Mozilla/5.0 (X11; Linux x86_64)" })).toBe("linux"));
  it("android is not linux", () => expect(detectPlatform({ ua: "Mozilla/5.0 (Linux; Android 15; Pixel 9)" })).toBe("android"));
  it("iPhone", () => expect(detectPlatform({ ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)" })).toBe("ios"));
  it("iPad in desktop mode (touch points) is ios, not mac", () => expect(detectPlatform({ ua: MAC, maxTouchPoints: 5 })).toBe("ios"));
  it("empty ua is unknown", () => expect(detectPlatform({ ua: "" })).toBe("unknown"));
});
