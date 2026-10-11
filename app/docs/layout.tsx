import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import { source } from "@/lib/source";
import { TwigMark } from "@/components/almanac/TwigMark";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";
import { DOWNLOAD_URL, REPO_URL } from "@/lib/links";
import "./docs.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider theme={{ enabled: false }} search={{ options: { api: "/api/search" } }}>
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: (
            <span className="docs-wordmark">
              <TwigMark size={24} />
              twig <span className="docs-wordmark-sub">docs</span>
            </span>
          ),
          url: "/",
        }}
        links={[
          { text: "Download", url: DOWNLOAD_URL, external: true },
          { text: "Release notes", url: "/releases" },
          { text: "FAQ", url: "/faq" },
          { text: "GitHub", url: REPO_URL, external: true },
        ]}
        themeSwitch={{ enabled: true, component: <ThemeToggle className="docs-theme" /> }}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
