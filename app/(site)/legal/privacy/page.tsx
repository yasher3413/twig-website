import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/page/LegalPage";
import { contactHref } from "@/lib/links";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = { title: "Privacy policy", description: "What twig and this website collect, which is very little, and where it goes.", alternates: { canonical: "/legal/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" when="Last updated 11 October 2026">
      <p>This policy covers the twig app and this website. The short version: the app collects nothing about you, and the website counts visits without cookies.</p>

      <h2>The twig app</h2>
      <p>
        <strong>No telemetry, no analytics, no account.</strong> twig doesn&apos;t send usage data anywhere. There&apos;s no sign-in and no sync server.
      </p>
      <p>
        <strong>Your browsing data stays on your Mac.</strong> History, bookmarks, Recall&apos;s reading copies, checkpoints, research packages, cookies and
        settings are stored locally, in twig&apos;s app data folder and macOS&apos;s WebKit storage. You can delete them from Settings → Data, or by removing
        twig&apos;s folder. <Link href="/docs/privacy">Privacy and your data</Link> lists what&apos;s stored and where.
      </p>
      <p>
        <strong>Websites and search.</strong> Like any browser, twig connects to the websites you visit, and sends your searches to the search engine you choose
        (Google, DuckDuckGo, Brave or Bing). Their own privacy policies apply.
      </p>

      <h2>Bug reports you choose to send</h2>
      <p>If you use the in-app Report a Bug form, and only then:</p>
      <ul>
        <li>
          What you write, plus the twig and macOS versions if you leave that box ticked, is sent to a small relay hosted on Vercel, which files it as a{" "}
          <strong>public</strong> issue on twig&apos;s GitHub repository. Anyone can read it.
        </li>
        <li>
          A screenshot, if you attach one, is stored <strong>publicly</strong> in Vercel Blob and linked from the issue.
        </li>
        <li>The relay processes your IP address briefly to limit how often reports can be sent. It doesn&apos;t store it as part of your report.</li>
        <li>Vercel may keep logs of requests to the relay, under its own policy. GitHub&apos;s policy applies to the issue.</li>
      </ul>
      <p>The form never sends the page you&apos;re on or your history. Leave out anything you don&apos;t want public.</p>

      <h2>This website</h2>
      <p>
        This site uses <strong>Vercel Web Analytics</strong> to count page views. It doesn&apos;t use cookies and doesn&apos;t identify you across sites. The site
        is hosted on Vercel, which, like any host, processes requests (including IP addresses) to serve pages and may keep logs.
      </p>
      <p>
        The site loads no third-party fonts, ads or trackers. Its demos run entirely in your browser; text you type into them isn&apos;t sent anywhere. The version
        number and release notes are fetched from GitHub by our server, not your browser.
      </p>

      <h2>Children</h2>
      <p>twig isn&apos;t directed at children and collects no personal information from anyone.</p>

      <h2>Changes</h2>
      <p>If this policy changes, the date at the top changes too, and the history is in the website&apos;s public repository.</p>

      <h2>Contact</h2>
      <p>
        {siteConfig.contactEmail ? (
          <>
            Email <a href={contactHref()}>{siteConfig.contactEmail}</a>.
          </>
        ) : (
          <>
            Questions about privacy: open an issue on <a href={contactHref()}>twig&apos;s GitHub</a>. Please don&apos;t include personal details in a public
            issue.
          </>
        )}
      </p>
    </LegalPage>
  );
}
