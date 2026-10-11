import type { Metadata } from "next";
import { PageIntro, PageSection } from "@/components/page/PageIntro";
import { PlatformAware } from "@/components/download/PlatformAware";
import { FirstLaunch } from "@/components/download/FirstLaunch";
import { RuledTable } from "@/components/almanac/RuledTable";
import { getReleases } from "@/lib/github";
import { formatBytes, formatDate } from "@/lib/format";
import { REPO_URL, RELEASES_URL } from "@/lib/links";
import { pageMeta } from "@/lib/seo";
import styles from "./download.module.css";

export const metadata: Metadata = pageMeta({
  title: "Download",
  description: "Download twig for Macs with Apple silicon, and get through the first launch in two steps.",
  path: "/download",
});

export default async function DownloadPage() {
  const releases = await getReleases();
  const latest = releases[0];
  return (
    <main>
      <PageIntro when={`Version ${latest.version} · ${formatDate(latest.date)}`} title="Download twig">
        <p>Free, open source, and {latest.dmgSize ? `${formatBytes(latest.dmgSize)}` : "small"}. Drag it into Applications and open it.</p>
      </PageIntro>
      <div className={`wrap ${styles.slotWrap}`}>
        <PlatformAware version={latest.version} />
      </div>

      <PageSection id="first-launch" title="The first launch" tone="strip">
        <p className={styles.p}>
          twig isn&apos;t notarized by Apple yet; that needs a paid developer account, which is one of the things <a href="/donate">support</a> would fund.
          Until then, macOS asks you to confirm the first time. It takes two steps, once.
        </p>
        <FirstLaunch />
      </PageSection>

      <PageSection id="requirements" title="What you need">
        <RuledTable
          rows={[
            ["Mac", "Apple silicon: M1 or newer"],
            ["macOS", "Any version your Apple silicon Mac runs (macOS 11 or later)"],
            ["Download", latest.dmgSize ? `${formatBytes(latest.dmgSize)} disk image (twig-macos-arm64.dmg)` : "twig-macos-arm64.dmg"],
            ["Account", "None. Nothing to sign up for"],
            ["Updates", "No auto-updater yet. New versions appear on the release notes page"],
          ]}
        />
      </PageSection>

      <PageSection id="default" title="Make it your default">
        <p className={styles.p}>
          Open twig&apos;s <strong>Settings → Browser</strong> and set it as your default browser. Links from Mail, Slack and other apps then open as new tabs in
          twig, and sign-in pop-ups work as you&apos;d expect.
        </p>
      </PageSection>

      <PageSection id="versions" title="Every version" tone="strip">
        <RuledTable
          head={["Version", "Released", "Size", ""]}
          rows={releases.map((r) => [
            `twig ${r.version}`,
            formatDate(r.date),
            r.dmgSize ? formatBytes(r.dmgSize) : "—",
            <a key={r.tag} href={r.url} rel="noopener">
              Notes and download
            </a>,
          ])}
        />
        <p className={styles.p}>
          All releases live on <a href={RELEASES_URL}>GitHub Releases</a>. The source is at <a href={REPO_URL}>github.com/yasher3413/twig</a>.
        </p>
      </PageSection>
    </main>
  );
}
