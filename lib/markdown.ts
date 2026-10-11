import { Marked } from "marked";

// Release notes come from the GitHub API. They're Markdown, so raw HTML is
// dropped entirely rather than filtered, and links are allow-listed by
// scheme after decoding entities, so no script can ride in on a link.

const decode = (s: string) =>
  s
    .replace(/&#x([0-9a-f]+);?/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);?/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&colon;/gi, ":")
    .replace(/[\u0000- ]/g, "");

export function safeHref(href: string): string | null {
  const plain = decode(href).toLowerCase();
  if (plain.startsWith("#") || plain.startsWith("/")) return href;
  if (/^(https?:|mailto:)/.test(plain)) return href;
  return null;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const md = new Marked({
  gfm: true,
  async: false,
  renderer: {
    html() {
      return "";
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const safe = safeHref(href);
      if (!safe) return text;
      const ext = /^https?:/i.test(safe) ? ' rel="noopener"' : "";
      return `<a href="${esc(safe)}"${title ? ` title="${esc(title)}"` : ""}${ext}>${text}</a>`;
    },
    image({ text }) {
      return esc(text);
    },
  },
});

export function renderMarkdown(source: string): string {
  return md.parse(source || "") as string;
}

/** A release body as the site shows it: without the download line and the
 *  repeated First launch section, which the site covers once. */
export function releaseBody(source: string): string {
  return (source || "")
    .replace(/^\*\*\[Download[^\n]*\n+/, "")
    .replace(/\n#{2,3} First launch\n[\s\S]*?(?=\n#{2,3} |$)/, "")
    .trim();
}

export function releaseBodyHtml(source: string): string {
  return renderMarkdown(releaseBody(source));
}
