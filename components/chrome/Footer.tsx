import Link from "next/link";
import { TwigMark } from "@/components/almanac/TwigMark";
import { DesignedBlank } from "@/components/almanac/DesignedBlank";
import { siteConfig } from "@/site.config";
import { socialLinks, REPO_URL, RELEASES_URL, DOWNLOAD_URL } from "@/lib/links";
import { formatDate } from "@/lib/format";
import { BrandIcon } from "./BrandIcon";
import styles from "./chrome.module.css";

const COLUMNS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: "Get twig",
    links: [
      { href: "/download", label: "Download" },
      { href: "/releases", label: "Release notes" },
      { href: "/docs/getting-started", label: "Getting started" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/docs/keyboard-shortcuts", label: "Keyboard shortcuts" },
      { href: "/docs/privacy", label: "Privacy and your data" },
      { href: "/docs/troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/about", label: "About" },
      { href: "/community", label: "Community" },
      { href: "/donate", label: "Support twig" },
      { href: "/brand", label: "Brand and press" },
      { href: REPO_URL, label: "Source on GitHub", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/terms", label: "Terms of use" },
      { href: "/legal/license", label: "Licence (MIT)" },
      { href: "/legal/acknowledgements", label: "Acknowledgements" },
    ],
  },
];

export function Footer({ version, date }: { version: string; date: string }) {
  const socials = socialLinks();
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.footerTop}>
          <div className={styles.footerSign}>
            <Link href="/" className={styles.footerMark} aria-label="twig, home">
              <TwigMark size={44} />
              <span aria-hidden="true" translate="no">twig</span>
            </Link>
            <p className={styles.footerLine}>The browser that remembers. Free, open source, and made for the Mac.</p>
            <a className={styles.footerDownload} href={DOWNLOAD_URL}>
              Download twig {version}
            </a>
          </div>
          <nav aria-label="Footer" className={styles.footerCols}>
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <h2 className={styles.footerHead}>{c.title}</h2>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.href}>
                      {l.external ? (
                        <a href={l.href} rel="noopener">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href}>{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <p className="tnum">
            <a href={`${RELEASES_URL}/tag/v${version}`} rel="noopener">
              twig {version}
            </a>
            , released {formatDate(date)}. MIT licence. Made on a Mac.
          </p>
          <ul className={styles.socials} aria-label="twig elsewhere">
            {socials.map((s) => (
              <li key={s.key}>
                <a href={s.href} rel="noopener me" aria-label={s.label} title={s.label}>
                  <BrandIcon name={s.key} />
                </a>
              </li>
            ))}
            <li>
              {siteConfig.discordUrl ? (
                <a href={siteConfig.discordUrl} rel="noopener" aria-label="Discord" title="Discord">
                  <BrandIcon name="discord" />
                </a>
              ) : (
                <DesignedBlank label="Discord opens soon" />
              )}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
