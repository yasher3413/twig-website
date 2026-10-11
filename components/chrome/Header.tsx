import Link from "next/link";
import { TwigMark } from "@/components/almanac/TwigMark";
import { DownloadButton } from "./DownloadButton";
import { PaletteTrigger } from "./PaletteTrigger";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import styles from "./chrome.module.css";

const NAV = [
  { href: "/docs", label: "Docs" },
  { href: "/releases", label: "Releases" },
  { href: "/faq", label: "FAQ" },
  { href: "/community", label: "Community" },
];

const MOBILE = [
  { href: "/download", label: "Download" },
  ...NAV,
  { href: "/about", label: "About" },
  { href: "/donate", label: "Support twig" },
];

export function Header({ version }: { version: string }) {
  return (
    <header className={styles.header}>
      <a href="#main" className="sr-only-focusable">
        Skip to content
      </a>
      <div className={`wrap ${styles.headerInner}`}>
        <Link href="/" className={styles.wordmark} aria-label="twig, home">
          <TwigMark size={30} />
          <span aria-hidden="true" translate="no">twig</span>
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.headerTools}>
          <span className={styles.desktopOnly}>
            <PaletteTrigger />
          </span>
          <span className={styles.mobileOnly}>
            <PaletteTrigger compact />
          </span>
          <ThemeToggle className={styles.iconButton} />
          <span className={styles.desktopOnly}>
            <DownloadButton version={version} size="sm" />
          </span>
          <span className={styles.mobileOnly}>
            <MobileMenu links={MOBILE} />
          </span>
        </div>
      </div>
    </header>
  );
}
