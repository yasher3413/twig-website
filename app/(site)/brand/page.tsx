import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, PageSection } from "@/components/page/PageIntro";
import { CopyToken } from "@/components/brand/CopyToken";
import { RuledTable } from "@/components/almanac/RuledTable";
import styles from "./brand.module.css";

export const metadata: Metadata = { title: "Brand and press kit", description: "twig's icon, wordmark, colours, screenshots and descriptions, ready to use.", alternates: { canonical: "/brand" } };

const LIGHT = [
  ["Paper", "#f6f4ee"],
  ["Strip", "#e8e5d8"],
  ["Ink", "#23261f"],
  ["Muted", "#62665a"],
  ["Moss", "#4b6b3a"],
  ["Forest night", "#101208"],
];
const ACCENTS = [
  ["Moss", "#4b6b3a", "#8fbb6e"],
  ["Clay", "#a85c32", "#d98f5f"],
  ["Ocean", "#2b6e7a", "#6fb8c4"],
  ["Plum", "#6b4a82", "#b58fd1"],
  ["Honey", "#a67c1d", "#e0b24d"],
  ["Slate", "#52564c", "#9a9e8f"],
];
const SHOTS = [
  ["screenshot-welcome-1-welcome.webp", "The welcome screen: tabs you aren't looking at fall asleep."],
  ["screenshot-changes-2-panel.webp", "Changes since you last read, in the panel beside the page."],
  ["screenshot-snooze-1-picker.webp", "The snooze picker."],
  ["screenshot-snooze-4-sweep-panel.webp", "Sweeping tabs you haven't touched."],
  ["screenshot-welcome-4b-tour-palette.webp", "The ⌘K palette, from the welcome tour."],
  ["screenshot-welcome-3-look-dark.webp", "Picking a look: dark, with the Ocean accent."],
];

export default function BrandPage() {
  return (
    <main>
      <PageIntro when="For press and friends" title="Brand and press kit">
        <p>Everything you need to write about twig or link to it. Please keep the name lowercase: twig.</p>
      </PageIntro>

      <PageSection id="icon" title="Icon">
        <div className={styles.assetRow}>
          <div className={styles.iconTile}>
            <Image src="/brand/twig-icon-512.png" alt="The twig app icon: a moss twig with three leaves and a bud on warm paper" width={200} height={200} priority />
          </div>
          <ul className={styles.downloads}>
            <li>
              <a href="/brand/twig-icon.svg" download>
                SVG, master
              </a>
            </li>
            <li>
              <a href="/brand/twig-icon-1024.png" download>
                PNG, 1024 px
              </a>
            </li>
            <li>
              <a href="/brand/twig-icon-512.png" download>
                PNG, 512 px
              </a>
            </li>
            <li>
              <a href="/brand/twig-icon-256.png" download>
                PNG, 256 px
              </a>
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection id="wordmark" title="Wordmark" tone="strip">
        <div className={styles.marks}>
          <div className={styles.markTile}>
            <Image src="/brand/twig-wordmark.svg" alt="twig wordmark in ink" width={220} height={90} unoptimized />
          </div>
          <div className={`${styles.markTile} ${styles.dark}`}>
            <Image src="/brand/twig-wordmark-light.svg" alt="twig wordmark in paper, for dark backgrounds" width={220} height={90} unoptimized />
          </div>
          <div className={styles.markTile}>
            <Image src="/brand/twig-wordmark-moss.svg" alt="twig wordmark in moss" width={220} height={90} unoptimized />
          </div>
        </div>
        <p className={styles.note}>
          Set in Young Serif and converted to outlines. Downloads: <a href="/brand/twig-wordmark.svg" download>ink</a>,{" "}
          <a href="/brand/twig-wordmark-light.svg" download>paper</a>, <a href="/brand/twig-wordmark-moss.svg" download>moss</a>.
        </p>
      </PageSection>

      <PageSection id="colour" title="Colour">
        <p className={styles.note}>Click any colour to copy it.</p>
        <div className={styles.tokenGroup}>
          {LIGHT.map(([n, v]) => (
            <CopyToken key={n} name={n} value={v} />
          ))}
        </div>
        <h3 className={styles.subhead}>The six accents, light and dark</h3>
        <div className={styles.tokenGroup}>
          {ACCENTS.flatMap(([n, l, d]) => [<CopyToken key={`${n}l`} name={`${n}, light`} value={l} />, <CopyToken key={`${n}d`} name={`${n}, dark`} value={d} />])}
        </div>
      </PageSection>

      <PageSection id="screenshots" title="Screenshots" tone="strip">
        <ul className={styles.shots}>
          {SHOTS.map(([f, cap]) => (
            <li key={f}>
              <a href={`/brand/${f}`} className={styles.shot}>
                <Image src={`/brand/${f}`} alt={cap} width={1200} height={800} sizes="(min-width: 1100px) 420px, 100vw" />
              </a>
              <p>{cap}</p>
            </li>
          ))}
        </ul>
        <p className={styles.note}>Rendered from twig&apos;s real interface with sample data.</p>
      </PageSection>

      <PageSection id="words" title="Descriptions">
        <RuledTable
          rows={[
            ["Name", "twig (always lowercase)"],
            ["One line", "The browser that remembers."],
            ["Short", "twig is a light, tab-heavy browser for Mac. Tabs you aren't looking at fall asleep, and every page you've read stays findable."],
            [
              "Long",
              "twig is a free, open-source browser for Macs with Apple silicon. Built on Tauri and macOS's own WebKit, it lets tabs you aren't using fall asleep and give back their memory, so you can keep as many open as you like. It remembers what you read with full-text Recall, shows what changed on pages you've visited, saves spaces as checkpoints you can fork, snoozes tabs until later, and bundles research into shareable files. Everything stays on your Mac: no account, no sync, no telemetry.",
            ],
            ["Licence", "MIT"],
            ["Made by", "Yash Gandhi (yasher3413)"],
          ]}
        />
      </PageSection>
    </main>
  );
}
