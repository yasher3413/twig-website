"use client";

import { useEffect, useState } from "react";
import { detectPlatform, type Platform } from "@/lib/platform";
import { DownloadButton } from "@/components/chrome/DownloadButton";
import { DesignedBlank } from "@/components/almanac/DesignedBlank";
import { siteConfig } from "@/site.config";
import { REPO_URL } from "@/lib/links";
import styles from "./platform.module.css";

type UAData = { platform?: string; getHighEntropyValues?: (h: string[]) => Promise<{ architecture?: string; platform?: string }> };

function webglRenderer(): string | undefined {
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    return ext ? (gl!.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string) : undefined;
  } catch {
    return undefined;
  }
}

// Server-renders the honest default (a Mac whose chip we can't see), then
// refines it after hydration in the same fixed-height slot.
export function PlatformAware({ version }: { version: string }) {
  const [p, setP] = useState<Platform>("mac-unknown");

  useEffect(() => {
    const nav = navigator as Navigator & { userAgentData?: UAData };
    const base = { ua: navigator.userAgent, maxTouchPoints: navigator.maxTouchPoints, webglRenderer: webglRenderer() };
    const ua = nav.userAgentData;
    if (ua?.getHighEntropyValues) {
      ua.getHighEntropyValues(["architecture", "platform"])
        .then((h) => setP(detectPlatform({ ...base, platform: h.platform, arch: h.architecture })))
        .catch(() => setP(detectPlatform(base)));
    } else setP(detectPlatform(base));
  }, []);

  const follow = (
    <div className={styles.follow}>
      <a href={REPO_URL} rel="noopener" className={styles.followLink}>
        Watch twig on GitHub
      </a>
      {siteConfig.discordUrl ? (
        <a href={siteConfig.discordUrl} rel="noopener" className={styles.followLink}>
          Join the Discord
        </a>
      ) : (
        <DesignedBlank label="Discord opens soon" />
      )}
    </div>
  );

  return (
    <div className={styles.slot} aria-live="polite">
      {(p === "mac-arm" || p === "mac-unknown") && (
        <>
          <DownloadButton version={version} size="lg" />
          <p className={styles.note}>
            {p === "mac-arm" ? (
              <>Your Mac has Apple silicon, so you&apos;re set.</>
            ) : (
              <>
                Needs a Mac with Apple silicon (M1 or newer). Not sure? Apple menu → About This Mac, and look for <strong>Chip</strong>.
              </>
            )}
          </p>
        </>
      )}
      {p === "mac-intel" && (
        <>
          <p className={styles.notYet}>Not yet on Intel Macs.</p>
          <p className={styles.note}>twig is built for Apple silicon only for now. There&apos;s no Intel build to download, and we won&apos;t pretend otherwise.</p>
          {follow}
        </>
      )}
      {(p === "windows" || p === "linux" || p === "android" || p === "unknown") && (
        <>
          <p className={styles.notYet}>twig is Mac-only for now.</p>
          <p className={styles.note}>It&apos;s built on macOS&apos;s own WebKit, so there&apos;s no Windows or Linux version, and no plans we can promise.</p>
          {follow}
        </>
      )}
      {p === "ios" && (
        <>
          <p className={styles.notYet}>twig is for the Mac.</p>
          <p className={styles.note}>There&apos;s no iPhone or iPad app. Open this page on a Mac with Apple silicon to download it.</p>
          <DownloadButton version={version} size="md" />
        </>
      )}
    </div>
  );
}
