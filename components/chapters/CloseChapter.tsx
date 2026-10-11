import { EntryHead } from "@/components/almanac/EntryHead";
import { RuledTable } from "@/components/almanac/RuledTable";
import { DownloadButton } from "@/components/chrome/DownloadButton";
import { Magnetic } from "@/components/motion/Magnetic";
import { FirstLaunch } from "@/components/download/FirstLaunch";
import { formatBytes, formatDate } from "@/lib/format";
import type { Release } from "@/lib/github";
import styles from "./close.module.css";

export function CloseChapter({ latest }: { latest: Release }) {
  return (
    <section id="download-now" className={styles.close} data-chapter="download-now" data-node="bud" aria-labelledby="close-title">
      <div className="wrap branch-room">
        <EntryHead when="Now" id="close-title" size="xl">
          Plant it.
        </EntryHead>
        <div className={styles.grid}>
          <div>
            <p className={styles.lede}>Download twig, drag it into Applications, and open it. It takes a minute, and asks for nothing.</p>
            <Magnetic>
              <DownloadButton version={latest.version} size="lg" tone="paper" />
            </Magnetic>
            <RuledTable
              className={styles.table}
              rows={[
                ["Version", `${latest.version}, released ${formatDate(latest.date)}`],
                ["Needs", "A Mac with Apple silicon (M1 or newer)"],
                ["Download", latest.dmgSize ? `${formatBytes(latest.dmgSize)} disk image` : "Disk image"],
                ["Costs", "Nothing. Free and open source (MIT)"],
                ["Updates", "Download new versions yourself; there's no auto-updater yet"],
              ]}
            />
          </div>
          <div>
            <p className={styles.firstTitle}>The first time you open it</p>
            <FirstLaunch compact />
          </div>
        </div>
      </div>
    </section>
  );
}
