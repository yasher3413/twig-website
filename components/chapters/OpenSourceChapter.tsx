import { Chapter } from "./Chapter";
import { RuledTable } from "@/components/almanac/RuledTable";
import { DesignedBlank } from "@/components/almanac/DesignedBlank";
import { siteConfig } from "@/site.config";
import { REPO_URL, NEW_ISSUE_URL, CONTRIBUTING_URL } from "@/lib/links";
import { formatDate } from "@/lib/format";
import type { Release } from "@/lib/github";
import Link from "next/link";
import styles from "./oss.module.css";

export function OpenSourceChapter({ latest, firstDate, releaseCount, stars }: { latest: Release; firstDate: string; releaseCount: number; stars: number | null }) {
  const showStars = stars !== null && stars >= siteConfig.starThreshold;
  return (
    <Chapter
      id="open-source"
      field="paper"
      when="Season after season"
      title="Open source, and made in the open."
      intro={
        <>
          <p>twig is free and MIT licensed. Every line is on GitHub, every release has its notes, and bug reports become public issues anyone can follow.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={REPO_URL} rel="noopener">
              {showStars ? `Star on GitHub · ${stars}` : "Star twig on GitHub"}
            </a>
            <a className={styles.secondary} href={NEW_ISSUE_URL} rel="noopener">
              Report a bug
            </a>
            <Link className={styles.secondary} href="/donate">
              Support twig
            </Link>
          </div>
          <p className={styles.discord}>{siteConfig.discordUrl ? <a href={siteConfig.discordUrl}>Join the Discord</a> : <DesignedBlank label="Discord opens soon" />}</p>
        </>
      }
      demo={
        <RuledTable
          caption="The record so far"
          rows={[
            ["Latest release", <a key="v" href={latest.url} rel="noopener">twig {latest.version}</a>],
            ["Released", formatDate(latest.date)],
            ["First release", formatDate(firstDate)],
            ["Releases", String(releaseCount)],
            ["Licence", "MIT"],
            ["Source", <a key="s" href={REPO_URL} rel="noopener">github.com/yasher3413/twig</a>],
            ["Contributing", <a key="c" href={CONTRIBUTING_URL} rel="noopener">CONTRIBUTING.md</a>],
          ]}
        />
      }
    />
  );
}
