import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { youngSerif, publicSans } from "./fonts";
import { baseUrl } from "@/lib/seo";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl()),
  applicationName: "twig",
  openGraph: { siteName: "twig", type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  title: { default: "twig — the browser that remembers", template: "%s · twig" },
  description:
    "twig is a lightweight, tab-heavy browser for Mac. Tabs you aren't looking at sleep, and pages you've read stay findable. Free and open source.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#17190f" },
  ],
};

// Runs before paint so an explicit theme choice never flashes the other one.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${publicSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
