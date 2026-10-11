import snapshot from "@/content/releases.snapshot.json";
import { siteConfig } from "@/site.config";

export type Release = {
  tag: string;
  version: string;
  name: string;
  /** ISO timestamp the release was published. */
  date: string;
  /** Markdown body of the GitHub release. */
  body: string;
  url: string;
  /** Size of twig-macos-arm64.dmg in bytes, when the asset is attached. */
  dmgSize: number | null;
};

const API = `https://api.github.com/repos/${siteConfig.repo.owner}/${siteConfig.repo.name}`;
const REVALIDATE = 3600;
const DMG = "twig-macos-arm64.dmg";

type RawAsset = { name?: unknown; size?: unknown };
type RawRelease = {
  tag_name?: unknown;
  name?: unknown;
  published_at?: unknown;
  body?: unknown;
  html_url?: unknown;
  draft?: unknown;
  prerelease?: unknown;
  assets?: unknown;
};

export function parseReleases(json: unknown): Release[] {
  if (!Array.isArray(json)) return [];
  const out: Release[] = [];
  for (const r of json as RawRelease[]) {
    if (!r || typeof r !== "object" || r.draft || r.prerelease) continue;
    if (typeof r.tag_name !== "string" || typeof r.published_at !== "string" || typeof r.html_url !== "string") continue;
    const assets = Array.isArray(r.assets) ? (r.assets as RawAsset[]) : [];
    const dmg = assets.find((a) => a && a.name === DMG);
    out.push({
      tag: r.tag_name,
      version: r.tag_name.replace(/^v/, ""),
      name: typeof r.name === "string" && r.name ? r.name : `twig ${r.tag_name.replace(/^v/, "")}`,
      date: r.published_at,
      body: typeof r.body === "string" ? r.body : "",
      url: r.html_url,
      dmgSize: dmg && typeof dmg.size === "number" ? dmg.size : null,
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

const SNAPSHOT = parseReleases(snapshot);

async function fetchJson(url: string): Promise<unknown> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  // A token only raises the rate limit at build time; the API is public.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers, next: { revalidate: REVALIDATE } } as RequestInit);
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  return res.json();
}

/** Newest first. Never throws: any failure falls back to the committed snapshot. */
export async function getReleases(): Promise<Release[]> {
  try {
    const live = parseReleases(await fetchJson(`${API}/releases?per_page=50`));
    return live.length ? live : SNAPSHOT;
  } catch {
    return SNAPSHOT;
  }
}

export async function getLatest(): Promise<Release> {
  return (await getReleases())[0];
}

export async function getRepo(): Promise<{ stars: number | null }> {
  try {
    const json = (await fetchJson(API)) as { stargazers_count?: unknown };
    return { stars: typeof json.stargazers_count === "number" ? json.stargazers_count : null };
  } catch {
    return { stars: null };
  }
}
