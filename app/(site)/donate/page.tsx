import type { Metadata } from "next";
import { PageIntro, PageSection } from "@/components/page/PageIntro";
import { DesignedBlank } from "@/components/almanac/DesignedBlank";
import { donateHref, REPO_URL } from "@/lib/links";
import { siteConfig } from "@/site.config";
import styles from "./donate.module.css";

export const metadata: Metadata = {
  title: "Support twig",
  description: "What support for twig pays for, and how to give once donations open.",
  alternates: { canonical: "/donate" },
};

const TIERS = [
  { amount: "$3", name: "A seed", note: "A thank-you, and a vote for keeping tabs.", field: "moss" },
  { amount: "$8", name: "A sprout", note: "Roughly a month of the Apple Developer fee.", field: "ocean" },
  { amount: "$20", name: "A branch", note: "Time for a bug fix or a small feature.", field: "clay" },
  { amount: "Any", name: "Your own", note: "Whatever feels right, once or monthly.", field: "plum" },
];

export default function DonatePage() {
  const href = donateHref();
  const provider = siteConfig.donate.provider === "github-sponsors" ? "GitHub Sponsors" : "the donation page";
  return (
    <main>
      <PageIntro when="If twig helps you" title="Support twig">
        <p>twig is free and always will be. Support pays for the things that make it better for everyone, and keeps one person working on it.</p>
      </PageIntro>

      <PageSection id="funds" title="What it pays for">
        <ol className={styles.funds}>
          <li>
            <strong>Notarization.</strong> Apple&apos;s Developer Program costs $99 a year. With it, twig can be notarized, and the Open Anyway step on first
            launch goes away.
          </li>
          <li>
            <strong>Time.</strong> Fixing reported bugs, keeping up with macOS and WebKit, and building what people ask for.
          </li>
        </ol>
      </PageSection>

      <PageSection id="give" title="Give" tone="strip">
        <ul className={styles.packets}>
          {TIERS.map((t) => (
            <li key={t.name} className={styles.packet} style={{ "--packet": `var(--f-${t.field})`, "--on-packet": `var(--on-${t.field})`, "--mark-packet": `var(--mark-${t.field})` } as React.CSSProperties}>
              <span className={`${styles.amount} tnum`}>{t.amount}</span>
              <span className={styles.name}>{t.name}</span>
              <span className={styles.note}>{t.note}</span>
              {href ? (
                <a className={styles.give} href={href} rel="noopener">
                  Give through {provider}
                </a>
              ) : (
                <span className={styles.soon}>Donations open soon</span>
              )}
            </li>
          ))}
        </ul>
        {!href && (
          <div className={styles.meanwhile}>
            <DesignedBlank label={`Donations through ${provider} open soon`} />
            <p>
              In the meantime, the best support is free: <a href={REPO_URL}>star twig on GitHub</a>, tell someone with too many tabs, and report what&apos;s
              broken.
            </p>
          </div>
        )}
      </PageSection>
    </main>
  );
}
