import { DOWNLOAD_URL } from "@/lib/links";
import styles from "./chrome.module.css";

// The one primary action on the site. The leaf unfurls on hover; the chip
// names exactly what you get.
export function DownloadButton({
  version,
  size = "lg",
  tone = "moss",
  className = "",
}: {
  version: string;
  size?: "lg" | "md" | "sm";
  tone?: "moss" | "paper" | "ink";
  className?: string;
}) {
  return (
    <a
      href={DOWNLOAD_URL}
      className={[styles.download, styles[`download-${size}`], styles[`tone-${tone}`], className].filter(Boolean).join(" ")}
      data-download
      aria-label={`Download for Mac, twig ${version}, Apple silicon`}
    >
      <svg className={styles.downloadLeaf} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path className={styles.leafClosed} d="M5 20 C 6 15, 9 9.5, 15 6.5 C 13 13, 10 17.5, 5 20 Z" />
        <path className={styles.leafOpen} d="M3 21 C 3.5 14, 8 6.5, 21 3 C 19.5 13.5, 12 19.5, 3 21 Z" />
      </svg>
      <span className={styles.downloadLabel}>Download for Mac</span>
      {size !== "sm" && (
        <span className={`${styles.downloadChip} tnum`}>
          v{version}
          <span aria-hidden="true">{"\u00a0·\u00a0"}</span>
          <span className={styles.srComma}>, </span>Apple Silicon
        </span>
      )}
    </a>
  );
}
