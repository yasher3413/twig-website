import type { Metadata } from "next";
import { PageIntro } from "@/components/page/PageIntro";
import { DesignedBlank } from "@/components/almanac/DesignedBlank";
import { BrandIcon } from "@/components/chrome/BrandIcon";
import { siteConfig } from "@/site.config";
import { socialLinks, REPO_URL, ISSUES_URL, NEW_ISSUE_URL, CONTRIBUTING_URL } from "@/lib/links";
import styles from "./community.module.css";

export const metadata: Metadata = { title: "Community", description: "Where twig lives: GitHub, bug reports, contributing, Discord and socials.", alternates: { canonical: "/community" } };

export default function CommunityPage() {
  const socials = socialLinks().filter((s) => s.key !== "github");
  const rows: { title: string; body: string; href: string | null; label: string; blank?: string }[] = [
    { title: "GitHub", body: "The source, every release, and the place decisions happen.", href: REPO_URL, label: "github.com/yasher3413/twig" },
    { title: "Report a bug", body: "From inside twig (Help → Report a Bug…) or straight on GitHub. Reports are public issues.", href: NEW_ISSUE_URL, label: "Open an issue" },
    { title: "Follow what's being fixed", body: "Every open report and what's happening to it.", href: ISSUES_URL, label: "Browse issues" },
    { title: "Contribute", body: "Small, focused pull requests are welcome. Read the guide first.", href: CONTRIBUTING_URL, label: "CONTRIBUTING.md" },
    { title: "Discord", body: "A place to talk about twig, ask questions and share setups.", href: siteConfig.discordUrl, label: "Join the Discord", blank: "Discord opens soon" },
  ];
  return (
    <main>
      <PageIntro when="Where twig lives" title="Community">
        <p>twig is made in the open by one person, with help from everyone who reports a bug or suggests a better way.</p>
      </PageIntro>
      <div className={`wrap ${styles.wrap}`}>
        <ul className={styles.rows}>
          {rows.map((r) => (
            <li key={r.title} className={styles.row}>
              <h2 className={styles.title}>{r.title}</h2>
              <p className={styles.body}>{r.body}</p>
              <span className={styles.action}>
                {r.href ? (
                  <a href={r.href} rel="noopener">
                    {r.label}
                  </a>
                ) : (
                  <DesignedBlank label={r.blank ?? "Coming soon"} />
                )}
              </span>
            </li>
          ))}
        </ul>
        {socials.length > 0 && (
          <div className={styles.socials}>
            <h2 className={styles.title}>Elsewhere</h2>
            <ul>
              {socials.map((s) => (
                <li key={s.key}>
                  <a href={s.href} rel="noopener me">
                    <BrandIcon name={s.key} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
