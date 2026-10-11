import type { Metadata } from "next";
import { PageIntro, PageSection } from "@/components/page/PageIntro";
import { Draft } from "@/components/page/Draft";
import { TwigMark } from "@/components/almanac/TwigMark";
import { RuledTable } from "@/components/almanac/RuledTable";
import { siteConfig } from "@/site.config";
import { getReleases } from "@/lib/github";
import { formatDate } from "@/lib/format";
import { REPO_URL } from "@/lib/links";
import prose from "@/components/page/prose.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = pageMeta();
function pageMeta(): Metadata {
  return { title: "About", description: "Why twig exists, the principles it's built on, and who makes it.", alternates: { canonical: "/about" } };
}

export default async function AboutPage() {
  const releases = await getReleases();
  const first = releases[releases.length - 1];
  return (
    <main>
      <PageIntro when="Why it exists" title="A browser that lets you keep your tabs">
        <p>Most of us keep tabs open as a way of remembering. Browsers punish that. twig is built on the idea that it shouldn&apos;t.</p>
      </PageIntro>

      <PageSection id="story" title="The story">
        <div className={prose.prose}>
          <p>
            If you keep fifty or a hundred tabs open, you know the bargain. Every tab is a full, live page sitting in memory, so your Mac slows down and you
            start closing things you meant to come back to. Close them, and they&apos;re gone. Keep them, and you pay.
          </p>
          <p>
            twig refuses that bargain. A tab you aren&apos;t looking at falls asleep and costs almost nothing, so you can keep as many as you like. And when you
            do close one, twig still remembers: the pages you&apos;ve read stay searchable by the words inside them, checkpoints save a whole space so you can
            come back to it, and a snoozed tab returns when you asked it to.
          </p>
          <p>Every other browser forgets. twig remembers, quietly, on your own Mac.</p>
        </div>
      </PageSection>

      <PageSection id="principles" title="Principles" tone="strip">
        <ul className={styles.principles}>
          <li>
            <h3>Local first</h3>
            <p>Your history, your reading and your saved spaces live on your Mac. No account, no sync server, no telemetry.</p>
          </li>
          <li>
            <h3>Honest</h3>
            <p>twig says what it can&apos;t do as plainly as what it can: Apple silicon only, no extensions, not notarized yet.</p>
          </li>
          <li>
            <h3>Keyboard-first</h3>
            <p>Everything is on a real menu with a real shortcut, and every shortcut is yours to change.</p>
          </li>
          <li>
            <h3>Light</h3>
            <p>It uses the engine your Mac already has, and tabs you aren&apos;t using give their memory back.</p>
          </li>
        </ul>
      </PageSection>

      <PageSection id="maker" title="Who makes it">
        {!siteConfig.author.bioApproved && <Draft>This section was written from the project&apos;s public history and is waiting for Yash&apos;s review.</Draft>}
        <div className={styles.maker}>
          <div className={styles.monogram} aria-hidden="true">
            <TwigMark size={64} />
          </div>
          <div className={prose.prose}>
            <p>
              twig is made by <strong>{siteConfig.author.name}</strong>, who goes by{" "}
              <a href={`https://github.com/${siteConfig.author.github}`}>{siteConfig.author.github}</a> on GitHub.
            </p>
            <p>
              It started as an answer to a personal problem: too many tabs, and a browser that made keeping them expensive. The first public release, twig{" "}
              {first.version}, came out on {formatDate(first.date)}, already with sleeping tabs, Recall, checkpoints, snooze and research packages. Since then
              it&apos;s been shaped by daily use and by the bugs people report.
            </p>
            <p>
              It&apos;s a one-person project, built in the open. If something&apos;s wrong or missing, <a href={`${REPO_URL}/issues`}>say so on GitHub</a>.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="credits" title="Built with" tone="strip">
        <RuledTable
          rows={[
            ["Tauri 2", "The app shell, in Rust, with a native webview per tab"],
            ["WebKit", "macOS's own web engine, the one Safari uses"],
            ["React and TypeScript", "The browser's chrome, built with Vite"],
            ["SQLite", "History, bookmarks and Recall's full-text index (FTS5)"],
            ["jsdiff", "Finding what changed since you last read a page"],
            ["Young Serif", "The wordmark, by the Young Serif Project Authors at Noir Blanc Rouge (SIL Open Font License)"],
          ]}
        />
        <p className={styles.more}>
          Full list on the <a href="/legal/acknowledgements">acknowledgements</a> page.
        </p>
      </PageSection>
    </main>
  );
}
