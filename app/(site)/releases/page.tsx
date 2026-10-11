import type { Metadata } from "next";
import { PageIntro } from "@/components/page/PageIntro";
import { DownloadButton } from "@/components/chrome/DownloadButton";
import { getReleases } from "@/lib/github";
import { renderMarkdown } from "@/lib/markdown";
import { formatBytes, formatDate, versionAnchor } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import styles from "./releases.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  ...pageMeta({ title: "Release notes", description: "What's new in each version of twig, straight from its GitHub releases.", path: "/releases" }),
  alternates: { canonical: "/releases", types: { "application/atom+xml": "/releases/feed.xml" } },
};

// Strip the first line of each GitHub body (the download link and chip
// requirement) and the repeated First launch section: the site covers
// both once, on the download page.
function body(md: string) {
  return md
    .replace(/^\*\*\[Download[^\n]*\n+/, "")
    .replace(/\n#{2,3} First launch\n[\s\S]*?(?=\n#{2,3} |$)/, "")
    .trim();
}

export default async function ReleasesPage() {
  const releases = await getReleases();
  const [latest, ...older] = releases;
  return (
    <main>
      <PageIntro when={`${releases.length} releases so far`} title="Release notes">
        <p>
          Every version of twig and what changed in it, from the project&apos;s GitHub releases. Subscribe with the{" "}
          <a href="/releases/feed.xml">Atom feed</a>, since there&apos;s no auto-updater yet.
        </p>
      </PageIntro>

      <article id={versionAnchor(latest.version)} className={styles.featured} aria-labelledby="latest-h">
        <div className={`wrap ${styles.grid}`}>
          <div className={styles.meta}>
            <h2 className={`${styles.version} tnum`} id="latest-h">
              {latest.version}
            </h2>
            <p className={`${styles.date} tnum`}>
              <time dateTime={latest.date}>{formatDate(latest.date)}</time>
              <span>Latest{latest.dmgSize ? ` · ${formatBytes(latest.dmgSize)}` : ""}</span>
            </p>
            <DownloadButton version={latest.version} size="md" />
          </div>
          <div className={styles.prose} dangerouslySetInnerHTML={{ __html: renderMarkdown(body(latest.body)) }} />
        </div>
      </article>

      <div className="wrap">
        {older.map((r) => (
          <article key={r.tag} id={versionAnchor(r.version)} className={styles.entry} aria-labelledby={`${versionAnchor(r.version)}-h`}>
            <div className={styles.grid}>
              <div className={styles.meta}>
                <h2 className={`${styles.versionSm} tnum`} id={`${versionAnchor(r.version)}-h`}>
                  <a href={`#${versionAnchor(r.version)}`}>{r.version}</a>
                </h2>
                <p className={`${styles.date} tnum`}>
                  <time dateTime={r.date}>{formatDate(r.date)}</time>
                  <a href={r.url} rel="noopener">
                    On GitHub
                  </a>
                </p>
              </div>
              <div className={styles.prose} dangerouslySetInnerHTML={{ __html: renderMarkdown(body(r.body)) }} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
