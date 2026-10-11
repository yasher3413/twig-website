import dynamic from "next/dynamic";
import Link from "next/link";
import { SetLine } from "@/components/motion/SetLine";
import { Magnetic } from "@/components/motion/Magnetic";
import { DownloadButton } from "@/components/chrome/DownloadButton";
import { formatBytes } from "@/lib/format";
import { HeroFallback } from "@/components/demos/hero/HeroFallback";
import type { Release } from "@/lib/github";
import styles from "@/components/demos/hero/hero.module.css";

const LivingWindow = dynamic(() => import("@/components/demos/hero/LivingWindow").then((m) => m.LivingWindow), {
  loading: () => <HeroFallback />,
});

export function Hero({ latest }: { latest: Release }) {
  return (
    <section className={styles.hero} data-chapter="hero" data-node="leaf" aria-labelledby="hero-title">
      <div className={`wrap branch-room ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={`${styles.title} display-xl`} data-node-anchor>
            <SetLine text="Every other browser forgets. twig remembers." delay={80} />
          </h1>
          <p className={styles.lede}>
            A light, tab-heavy browser for the Mac. Tabs you aren&apos;t looking at fall asleep and cost almost nothing, and every page you&apos;ve
            read stays findable.
          </p>
          <div className={styles.actions}>
            <Magnetic>
              <DownloadButton version={latest.version} size="lg" />
            </Magnetic>
            <Link href="/releases" className={styles.secondary}>
              See what&apos;s new in {latest.version}
            </Link>
          </div>
          <p className={`${styles.facts} tnum`}>
            Version {latest.version} · free and open source{latest.dmgSize ? ` · ${formatBytes(latest.dmgSize)}` : ""} · for Macs with Apple silicon
          </p>
        </div>
        <div className={styles.demo}>
          <LivingWindow />
        </div>
      </div>
    </section>
  );
}
