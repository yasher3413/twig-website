import { QUARANTINE_COMMAND } from "@/lib/links";
import { CopyCommand } from "./CopyCommand";
import styles from "./download.module.css";

// The one-time Gatekeeper step, shown kindly. The pictures are drawn
// illustrations of the macOS dialogs, labelled as such.
export function FirstLaunch({ compact = false }: { compact?: boolean }) {
  return (
    <div className={styles.first}>
      <ol className={styles.steps}>
        <li className={styles.step}>
          <figure className={styles.illo}>
            <svg viewBox="0 0 280 170" aria-hidden="true">
              <rect x="40" y="14" width="200" height="142" rx="14" className={styles.dialog} />
              <rect x="122" y="30" width="36" height="36" rx="9" className={styles.iconTile} />
              <path d="M131 58c4-7 9-13 18-17-1 9-7 14-18 17Zm0 0 8-7" className={styles.iconLeaf} />
              <rect x="70" y="78" width="140" height="7" rx="3.5" className={styles.line} />
              <rect x="86" y="92" width="108" height="6" rx="3" className={styles.lineSoft} />
              <rect x="58" y="116" width="78" height="26" rx="7" className={styles.btn} />
              <rect x="144" y="116" width="78" height="26" rx="7" className={`${styles.btn} ${styles.btnHi}`} />
              <text x="183" y="133.5" className={styles.btnText} textAnchor="middle">
                Done
              </text>
            </svg>
            <figcaption>Illustration</figcaption>
          </figure>
          <div>
            <p className={styles.stepTitle}>Open twig, then click Done.</p>
            <p className={styles.stepBody}>macOS says it can&apos;t verify the app yet, because twig isn&apos;t notarized by Apple. That&apos;s expected.</p>
          </div>
        </li>
        <li className={styles.step}>
          <figure className={styles.illo}>
            <svg viewBox="0 0 280 170" aria-hidden="true">
              <rect x="14" y="14" width="252" height="142" rx="12" className={styles.dialog} />
              <rect x="14" y="14" width="74" height="142" rx="12" className={styles.sidebar} />
              <rect x="26" y="34" width="50" height="6" rx="3" className={styles.lineSoft} />
              <rect x="26" y="50" width="44" height="6" rx="3" className={styles.lineSoft} />
              <rect x="22" y="62" width="58" height="14" rx="4" className={styles.sideHi} />
              <rect x="26" y="88" width="40" height="6" rx="3" className={styles.lineSoft} />
              <rect x="104" y="34" width="120" height="8" rx="4" className={styles.line} />
              <rect x="104" y="58" width="146" height="6" rx="3" className={styles.lineSoft} />
              <rect x="104" y="72" width="128" height="6" rx="3" className={styles.lineSoft} />
              <rect x="104" y="98" width="98" height="6" rx="3" className={styles.line} />
              <rect x="180" y="116" width="74" height="24" rx="7" className={`${styles.btn} ${styles.btnHi}`} />
              <text x="217" y="132" className={styles.btnText} textAnchor="middle">
                Open Anyway
              </text>
            </svg>
            <figcaption>Illustration</figcaption>
          </figure>
          <div>
            <p className={styles.stepTitle}>
              System Settings → Privacy &amp; Security → <strong>Open Anyway</strong>.
            </p>
            <p className={styles.stepBody}>Scroll down to the message about twig, click Open Anyway, and confirm with your password. From then on it opens like any app.</p>
          </div>
        </li>
      </ol>
      <div className={styles.terminal}>
        <p className={styles.stepBody}>{compact ? "Or, in Terminal:" : "Prefer Terminal? This does the same thing, once twig is in Applications:"}</p>
        <CopyCommand command={QUARANTINE_COMMAND} />
      </div>
    </div>
  );
}
