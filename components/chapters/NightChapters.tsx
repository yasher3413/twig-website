import { Chapter } from "./Chapter";
import { formatBytes } from "@/lib/format";
import type { Release } from "@/lib/github";
import styles from "./night.module.css";

const LOCAL = [
  ["History and bookmarks", "SQLite, on your Mac"],
  ["Recall's reading copies", "SQLite full-text index, on your Mac"],
  ["Checkpoints and packages", "On your Mac, until you export one"],
  ["Cookies and sign-ins", "macOS's WebKit storage, on your Mac"],
  ["Settings and shortcuts", "On your Mac"],
];

export function NightChapters({ latest }: { latest: Release }) {
  return (
    <div className={styles.night}>
      <div className={styles.moon} aria-hidden="true" />
      <Chapter
        id="local"
        field="forest"
        when="Every hour of every day"
        title="Everything stays on your Mac."
        intro={
          <>
            <p>
              No account, no sign-up, no sync server. twig has no telemetry and no analytics. What you browse, what you read and what you save live in files
              on your own disk, and you can clear them from Settings.
            </p>
            <p className="muted">
              Private windows keep nothing: no history, no Recall copies, no checkpoints. The one thing that ever leaves is a bug report, and only when you
              choose to send one.
            </p>
          </>
        }
        demo={
          <figure className={styles.macFigure}>
            <svg viewBox="0 0 520 330" className={styles.mac} role="img" aria-labelledby="mac-title">
              <title id="mac-title">Your data inside your Mac; only bug reports you send leave it</title>
              <rect x="40" y="16" width="440" height="270" rx="18" className={styles.macBody} />
              <rect x="58" y="34" width="404" height="234" rx="6" className={styles.macScreen} />
              <path d="M200 286h120l14 28H186Z" className={styles.macBody} />
              <rect x="160" y="312" width="200" height="8" rx="4" className={styles.macBody} />
              {LOCAL.map(([k], i) => (
                <g key={k} transform={`translate(84 ${66 + i * 40})`}>
                  <circle r="5" cx="6" cy="-4" className={styles.dot} />
                  <text x="22" className={styles.item}>
                    {k}
                  </text>
                </g>
              ))}
              <path d="M462 120 C 500 120, 506 70, 512 40" className={styles.out} />
              <text x="512" y="28" className={styles.outLabel} textAnchor="end">
                bug reports, if you send one
              </text>
            </svg>
            <ul className={styles.list}>
              {LOCAL.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <span className={styles.where}>{v}</span>
                </li>
              ))}
            </ul>
          </figure>
        }
        source={{ href: "/docs/privacy", label: "What's stored, and where" }}
      />
      <Chapter
        id="engine"
        field="forest"
        when="From the first launch"
        title="Built on your Mac's own engine."
        layout="split-reverse"
        intro={
          <>
            <p>
              Most new browsers ship their own copy of Chromium. twig is built with Tauri and uses WebKit, the engine Safari uses, which macOS already has. So
              there&apos;s no second browser engine inside it.
            </p>
            <p>
              On top of that, a sleeping tab hands back its webview entirely, and a tab you haven&apos;t opened yet holds none at all. Reopening a few
              hundred tabs costs about what reopening one does.
            </p>
            {latest.dmgSize && (
              <p className={styles.fact}>
                The whole download for twig {latest.version} is <strong className="tnum">{formatBytes(latest.dmgSize)}</strong>, because there&apos;s no engine
                inside it.{" "}
                <a href={latest.url} rel="noopener">
                  See the release
                </a>
              </p>
            )}
          </>
        }
        demo={
          <div className={styles.stack} role="img" aria-label="A bundled-engine browser stacks its own Chromium on macOS; twig sits directly on macOS's WebKit.">
            <div className={styles.column}>
              <p className={styles.colTitle}>A browser that bundles Chromium</p>
              <span className={styles.layer}>The browser&apos;s interface</span>
              <span className={`${styles.layer} ${styles.heavy}`}>Its own Chromium engine</span>
              <span className={`${styles.layer} ${styles.base}`}>macOS</span>
            </div>
            <div className={styles.column}>
              <p className={styles.colTitle}>twig</p>
              <span className={`${styles.layer} ${styles.twig}`}>twig&apos;s interface (Tauri)</span>
              <span className={`${styles.layer} ${styles.base}`}>macOS, with WebKit already inside</span>
            </div>
          </div>
        }
        source={{ href: "/docs/tabs", label: "How twig keeps tabs light" }}
      />
    </div>
  );
}
