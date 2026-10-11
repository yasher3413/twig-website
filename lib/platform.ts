export type Platform = "mac-arm" | "mac-intel" | "mac-unknown" | "windows" | "linux" | "ios" | "android" | "unknown";

export type PlatformInput = {
  ua: string;
  /** navigator.userAgentData.platform, when the browser offers client hints. */
  platform?: string;
  /** High-entropy client hint: "arm" | "x86". */
  arch?: string;
  /** UNMASKED_RENDERER_WEBGL, a hint only. */
  webglRenderer?: string;
  maxTouchPoints?: number;
};

// Safari never reports the chip, so "mac-unknown" is the honest default for
// most Mac visitors; the page then explains how to check.
export function detectPlatform({ ua, platform, arch, webglRenderer, maxTouchPoints }: PlatformInput): Platform {
  if (!ua) return "unknown";
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  const isMac = /Macintosh|Mac OS X/.test(ua) || platform === "macOS";
  if (isMac) {
    // iPadOS asks for desktop sites with a Mac user agent; touch gives it away.
    if ((maxTouchPoints ?? 0) > 1) return "ios";
    if (arch === "arm") return "mac-arm";
    if (arch === "x86") return "mac-intel";
    if (webglRenderer && /Apple M\d/.test(webglRenderer)) return "mac-arm";
    return "mac-unknown";
  }
  if (/Windows/.test(ua)) return "windows";
  if (/Linux|X11|CrOS/.test(ua)) return "linux";
  return "unknown";
}
