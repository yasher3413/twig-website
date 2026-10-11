import { getReleases } from "@/lib/github";
import { buildAtom } from "@/lib/feed";
import { baseUrl } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const xml = buildAtom(await getReleases(), baseUrl());
  return new Response(xml, { headers: { "Content-Type": "application/atom+xml; charset=utf-8" } });
}
