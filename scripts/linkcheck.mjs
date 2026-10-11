// Crawls the running site from /, follows internal links, and checks every
// external link once. Fails on 4xx/5xx and on hrefs like "null".
const base = process.argv[2] || "http://localhost:3000";
const seen = new Map();
const external = new Set();
const bad = [];
const queue = ["/"];
const strip = (u) => u.split("#")[0];

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const res = await fetch(base + path, { redirect: "manual" });
  seen.set(path, res.status);
  if (res.status >= 400) {
    bad.push(`${res.status} ${path}`);
    continue;
  }
  const type = res.headers.get("content-type") || "";
  if (!type.includes("text/html")) continue;
  const html = await res.text();
  for (const m of html.matchAll(/href="([^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (["null", "undefined", "#", ""].includes(href) || href.includes("/null") || href.includes("undefined")) {
      bad.push(`bad href "${href}" on ${path}`);
      continue;
    }
    if (href.startsWith("mailto:") || href.startsWith("#")) continue;
    if (href.startsWith("http")) {
      if (!href.startsWith(base)) external.add(strip(href));
      continue;
    }
    if (href.startsWith("/_next") || href.startsWith("/api")) continue;
    const p = strip(href);
    if (p && !seen.has(p) && !queue.includes(p)) queue.push(p);
  }
}

for (const url of external) {
  try {
    let res = await fetch(url, { method: "HEAD", redirect: "follow", headers: { "User-Agent": "twig-linkcheck" } });
    if (res.status === 405 || res.status === 403) res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "twig-linkcheck" } });
    // Social sites block bots; only a hard 404/410 counts as broken there.
    const social = /instagram|linkedin|x\.com/.test(url);
    if (res.status === 404 || res.status === 410 || (!social && res.status >= 400 && res.status !== 429)) bad.push(`${res.status} ${url}`);
  } catch (e) {
    bad.push(`ERR ${url} ${e.message}`);
  }
}

console.log(`internal pages: ${seen.size}, external links: ${external.size}`);
if (bad.length) {
  console.log("BROKEN:\n" + bad.join("\n"));
  process.exit(1);
}
console.log("all links ok");
