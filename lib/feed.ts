import { releaseBodyHtml } from "./markdown";
import type { Release } from "./github";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildAtom(releases: Release[], baseUrl: string): string {
  const updated = releases[0]?.date ?? new Date(0).toISOString();
  const entries = releases
    .map((r) => {
      const html = releaseBodyHtml(r.body);
      return `  <entry>
    <title>${esc(r.name)}</title>
    <id>${esc(r.url)}</id>
    <link rel="alternate" type="text/html" href="${esc(r.url)}"/>
    <updated>${r.date}</updated>
    <published>${r.date}</published>
    <content type="html">${esc(html)}</content>
  </entry>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>twig release notes</title>
  <subtitle>New versions of twig, the browser that remembers.</subtitle>
  <id>${esc(baseUrl)}/releases</id>
  <link rel="alternate" type="text/html" href="${esc(baseUrl)}/releases"/>
  <link rel="self" type="application/atom+xml" href="${esc(baseUrl)}/releases/feed.xml"/>
  <updated>${updated}</updated>
  <author><name>twig</name></author>
${entries}
</feed>
`;
}
