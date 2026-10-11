import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export function baseUrl(): string {
  if (siteConfig.domain) return `https://${siteConfig.domain}`;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export function pageMeta({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: title ?? "twig", description, url: path, siteName: "twig", type: "website", locale: "en_GB" },
    twitter: { card: "summary_large_image", title: title ?? "twig", description },
  };
}
