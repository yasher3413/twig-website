import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/page/LegalPage";

export const metadata: Metadata = { title: "Terms of use", description: "Plain-language terms for using twig and this website.", alternates: { canonical: "/legal/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" when="Last updated 11 October 2026">
      <h2>The software</h2>
      <p>
        twig is free, open-source software released under the <Link href="/legal/license">MIT licence</Link>. You may use, copy, change and share it under that
        licence&apos;s terms.
      </p>
      <p>
        <strong>It&apos;s provided as is.</strong> twig comes without warranty of any kind. The authors aren&apos;t liable for any damage or loss that comes from
        using it, as the licence sets out. twig is early software: keep backups of anything important, and don&apos;t rely on it as your only copy of your
        bookmarks or reading.
      </p>

      <h2>Websites you visit</h2>
      <p>twig is a browser. The websites you open with it have their own terms, and you&apos;re responsible for how you use them.</p>

      <h2>Bug reports</h2>
      <p>
        Reports sent from the in-app form become public GitHub issues. Don&apos;t send anything you aren&apos;t comfortable making public, or anything that
        isn&apos;t yours to share. Reports may be edited, labelled or closed. Using the report service to send spam or abuse isn&apos;t allowed, and it&apos;s
        rate-limited.
      </p>

      <h2>This website</h2>
      <p>
        The website&apos;s content is provided for information. The twig name, icon and wordmark identify the project; use them to refer to twig, as the{" "}
        <Link href="/brand">brand page</Link> describes, but not in a way that suggests endorsement.
      </p>

      <h2>Changes</h2>
      <p>These terms may be updated. The date at the top shows the latest version.</p>
    </LegalPage>
  );
}
