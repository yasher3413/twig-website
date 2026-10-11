import { siteConfig, type SiteConfig, type SocialKey } from "@/site.config";

export const REPO_URL = `https://github.com/${siteConfig.repo.owner}/${siteConfig.repo.name}`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const ISSUES_URL = `${REPO_URL}/issues`;
export const NEW_ISSUE_URL = `${REPO_URL}/issues/new`;
export const CONTRIBUTING_URL = `${REPO_URL}/blob/main/CONTRIBUTING.md`;
// The asset name never changes, so this always serves the newest build.
export const DOWNLOAD_URL = `${REPO_URL}/releases/latest/download/twig-macos-arm64.dmg`;
export const QUARANTINE_COMMAND = "xattr -dr com.apple.quarantine /Applications/twig.app";

const SOCIAL_LABEL: Record<SocialKey, string> = {
  github: "GitHub",
  x: "X",
  bluesky: "Bluesky",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
};

const SOCIAL_ORDER: SocialKey[] = ["github", "x", "bluesky", "instagram", "linkedin", "youtube", "tiktok"];

export type SocialLink = { key: SocialKey; label: string; href: string };

export function socialLinks(config: SiteConfig = siteConfig): SocialLink[] {
  return SOCIAL_ORDER.flatMap((key) => {
    const href = config.socials[key];
    return href ? [{ key, label: SOCIAL_LABEL[key], href }] : [];
  });
}

export function contactHref(config: SiteConfig = siteConfig): string {
  return config.contactEmail ? `mailto:${config.contactEmail}` : ISSUES_URL;
}

export function donateHref(config: SiteConfig = siteConfig): string | null {
  return config.donate.url || null;
}
