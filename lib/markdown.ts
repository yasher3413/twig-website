import { marked } from "marked";

// Release notes come from the GitHub API. They're the project's own words,
// but the HTML is still cleaned: no scripts, frames, handlers or
// javascript: links.
export function renderMarkdown(md: string): string {
  const html = marked.parse(md || "", { async: false, gfm: true }) as string;
  return html
    .replace(/<(script|style|iframe|object|embed|form)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed|form|link|meta)[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*(javascript|data|vbscript):[^"']*\2/gi, '$1="#"')
    .replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" rel="noopener"');
}
