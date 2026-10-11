import type { Metadata } from "next";
import { BranchProvider } from "@/components/motion/Branch";
import { Hero } from "@/components/chapters/Hero";
import { SleepingChapter } from "@/components/chapters/Sleeping";
import { RecallChapter } from "@/components/chapters/RecallChapter";
import { ChangesChapter } from "@/components/chapters/ChangesChapter";
import { SnoozeChapter } from "@/components/chapters/SnoozeChapter";
import { CheckpointsChapter } from "@/components/chapters/CheckpointsChapter";
import { PackagesChapter } from "@/components/chapters/PackagesChapter";
import { getLatest } from "@/lib/github";
import { pageMeta, baseUrl } from "@/lib/seo";
import { DOWNLOAD_URL, REPO_URL } from "@/lib/links";

export const metadata: Metadata = pageMeta({
  description:
    "twig is a light, tab-heavy browser for Mac. Tabs you aren't looking at fall asleep, and every page you've read stays findable. Free and open source.",
  path: "/",
});

export default async function Home() {
  const latest = await getLatest();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "twig",
    applicationCategory: "BrowserApplication",
    operatingSystem: "macOS (Apple silicon)",
    softwareVersion: latest.version,
    datePublished: latest.date,
    downloadUrl: DOWNLOAD_URL,
    url: baseUrl(),
    codeRepository: REPO_URL,
    license: "https://opensource.org/licenses/MIT",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    ...(latest.dmgSize ? { fileSize: `${(latest.dmgSize / 1_000_000).toFixed(1)}MB` } : {}),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BranchProvider>
        <Hero latest={latest} />
        <SleepingChapter />
        <RecallChapter />
        <ChangesChapter />
        <SnoozeChapter />
        <CheckpointsChapter />
        <PackagesChapter />
      </BranchProvider>
    </main>
  );
}
