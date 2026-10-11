import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page/PageIntro";
import { pageMeta } from "@/lib/seo";
import { NEW_ISSUE_URL, REPO_URL } from "@/lib/links";
import styles from "./faq.module.css";

export const metadata: Metadata = pageMeta({ title: "FAQ", description: "Straight answers about twig: cost, platforms, Gatekeeper, sync, extensions, data and support.", path: "/faq" });

const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is twig free? Is it open source?",
    a: (
      <p>
        Yes to both. twig is free, and its source is on <a href={REPO_URL}>GitHub</a> under the MIT licence, so you can read it, build it and change it.
      </p>
    ),
  },
  {
    q: "Why only Apple silicon?",
    a: (
      <p>
        twig is built and tested on Apple silicon Macs, and that&apos;s the only build published so far. An Intel build is technically possible but isn&apos;t
        made or tested yet, so we&apos;d rather not offer one that might not work.
      </p>
    ),
  },
  {
    q: "Why do I have to click “Open Anyway” the first time?",
    a: (
      <>
        <p>
          twig isn&apos;t notarized by Apple yet. Notarization needs a paid Apple Developer account, and until twig has one, macOS asks you to confirm the
          first launch. You do it once: System Settings → Privacy &amp; Security → <strong>Open Anyway</strong>.
        </p>
        <p>
          The <Link href="/download#first-launch">download page</Link> walks through it, with a Terminal alternative. <Link href="/donate">Support</Link> would
          pay for notarization and remove the step.
        </p>
      </>
    ),
  },
  {
    q: "Does twig sync between devices?",
    a: <p>No. There&apos;s no account and no sync server, by design. Everything stays on the Mac you use it on.</p>,
  },
  {
    q: "Does it support extensions?",
    a: (
      <p>
        No, and it can&apos;t: twig uses macOS&apos;s WebKit webview, which has no extension API. If content blocking comes, it would use WebKit&apos;s narrower
        content rules rather than an extension store.
      </p>
    ),
  },
  {
    q: "How is it lighter than Chrome?",
    a: (
      <>
        <p>Two ways. twig uses the WebKit engine macOS already has, instead of bundling its own copy of Chromium, so the whole app is a small download.</p>
        <p>
          And tabs you aren&apos;t using fall asleep and give back their memory, while new and restored tabs hold none until you open them. We haven&apos;t
          published a memory benchmark; if we do, it&apos;ll come with how it was measured.
        </p>
      </>
    ),
  },
  {
    q: "Where's my data, and how do I delete it?",
    a: (
      <p>
        On your Mac, in twig&apos;s app data folder and macOS&apos;s WebKit storage. Clear history and Recall copies, or site data, from Settings → Data, or
        delete twig&apos;s folder to remove everything. <Link href="/docs/privacy">Privacy and your data</Link> lists exactly what&apos;s stored.
      </p>
    ),
  },
  {
    q: "Will there be Windows or Linux versions?",
    a: <p>There are no plans we can promise. twig is built around macOS&apos;s own WebKit, so other platforms would mean a different browser underneath.</p>,
  },
  {
    q: "How do I report a bug?",
    a: (
      <p>
        From inside twig: Help → Report a Bug…, or ⌘K → <em>Report a bug</em>. It becomes a public GitHub issue you can follow. You can also{" "}
        <a href={NEW_ISSUE_URL}>open an issue on GitHub</a> directly.
      </p>
    ),
  },
  {
    q: "How can I support the project?",
    a: (
      <p>
        Star it on <a href={REPO_URL}>GitHub</a>, tell a friend who hoards tabs, report bugs, or <Link href="/donate">donate</Link> once donations open.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <main>
      <PageIntro when="Asked and answered" title="Questions, answered plainly" />
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.list}>
          {QA.map(({ q, a }, i) => (
            <details key={q} className={styles.item} open={i === 0}>
              <summary className={styles.q}>
                <span>{q}</span>
                <svg className={styles.chev} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className={styles.a}>{a}</div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
