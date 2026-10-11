// Every value the owner supplies lives here. A null value is never rendered
// as a link: pages show a designed "coming soon" slot instead. The README
// lists each field.

export type SocialKey = "x" | "bluesky" | "youtube" | "instagram" | "tiktok" | "linkedin" | "github";

export type SiteConfig = {
  name: string;
  /** Production domain, e.g. "twig.app". null = use the Vercel URL. */
  domain: string | null;
  /** Public contact address for legal pages. null = point to GitHub issues. */
  contactEmail: string | null;
  discordUrl: string | null;
  socials: Record<SocialKey, string | null>;
  donate: { provider: "github-sponsors" | "stripe" | "open-collective" | null; url: string | null };
  author: { name: string; github: string; bioApproved: boolean; photo: string | null };
  repo: { owner: string; name: string };
  analytics: "vercel" | null;
  /** The GitHub star count only shows once it reaches this many. */
  starThreshold: number;
};

export const siteConfig: SiteConfig = {
  name: "twig",
  domain: null,
  contactEmail: null,
  discordUrl: null,
  socials: {
    x: "https://x.com/yash_gandhi34",
    bluesky: null,
    youtube: null,
    instagram: "https://www.instagram.com/yash_gandhi34/",
    tiktok: null,
    linkedin: "https://www.linkedin.com/in/yashgandhi34/",
    github: "https://github.com/yasher3413/twig",
  },
  donate: { provider: "github-sponsors", url: null },
  author: { name: "Yash Gandhi", github: "yasher3413", bioApproved: false, photo: null },
  repo: { owner: "yasher3413", name: "twig" },
  analytics: "vercel",
  starThreshold: 50,
};
