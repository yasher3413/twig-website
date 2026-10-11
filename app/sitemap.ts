import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";
import { source } from "@/lib/source";

export const ROUTES = [
  "/",
  "/download",
  "/releases",
  "/docs",
  "/faq",
  "/about",
  "/donate",
  "/community",
  "/brand",
  "/legal/privacy",
  "/legal/terms",
  "/legal/license",
  "/legal/acknowledgements",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl();
  const docs = source
    .getPages()
    .map((p) => p.url)
    .filter((u) => !ROUTES.includes(u));
  return [...ROUTES, ...docs].map((r) => ({ url: `${base}${r}`, changeFrequency: r === "/releases" ? "weekly" : "monthly", priority: r === "/" ? 1 : 0.7 }));
}
