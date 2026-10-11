// Every route: no console errors, no horizontal scroll at 375 and 1280,
// headings visible under reduced motion; plus a keyboard check on home.
import { chromium } from "playwright";
const base = process.argv[2] || "http://localhost:3000";
const routes = ["/", "/download", "/releases", "/docs", "/docs/recall", "/docs/research-packages", "/faq", "/about", "/donate", "/community", "/brand", "/legal/privacy", "/legal/terms", "/legal/license", "/legal/acknowledgements", "/missing-page"];
const fails = [];
const b = await chromium.launch();
for (const reduced of [false, true]) {
  for (const w of [375, 1280]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 860 }, reducedMotion: reduced ? "reduce" : "no-preference" });
    for (const r of routes) {
      const p = await ctx.newPage();
      const errs = [];
      p.on("pageerror", (e) => errs.push(e.message));
      p.on("console", (m) => {
        if (m.type() !== "error") return;
        const t = m.text();
        // Local runs have no /_vercel/insights script; the 404 page's own status is expected.
        if (t.includes("404") && (r === "/missing-page" || t.includes("Failed to load resource"))) return;
        errs.push(t);
      });
      await p.goto(base + r, { waitUntil: "load" });
      await p.waitForTimeout(400);
      if (r === "/") {
        // scroll through so lazy demos mount and run
        for (let y = 0; y < 14000; y += 900) {
          await p.evaluate((yy) => window.scrollTo(0, yy), y);
          await p.waitForTimeout(120);
        }
        await p.waitForTimeout(600);
      }
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) fails.push(`${r} @${w}: horizontal overflow ${overflow}px`);
      if (reduced) {
        const hidden = await p.evaluate(() =>
          [...document.querySelectorAll("h1, h2")].filter((h) => {
            const s = getComputedStyle(h);
            return h.getBoundingClientRect().width > 0 && (s.opacity !== "1" || s.visibility === "hidden");
          }).length,
        );
        if (hidden) fails.push(`${r} @${w} reduced motion: ${hidden} headings not fully visible`);
      }
      if (errs.length) fails.push(`${r} @${w}${reduced ? " rm" : ""}: ${errs.join(" | ").slice(0, 300)}`);
      await p.close();
    }
    await ctx.close();
  }
}
// Keyboard: Tab from the top reaches a Download link within 9 stops (after the header).
{
  const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
  await p.goto(base + "/", { waitUntil: "load" });
  let stops = 0;
  let reached = false;
  for (; stops < 9; stops++) {
    await p.keyboard.press("Tab");
    const isDl = await p.evaluate(() => document.activeElement?.hasAttribute("data-download"));
    if (isDl) {
      reached = true;
      break;
    }
  }
  if (!reached) fails.push("keyboard: no Download link within 9 Tab stops");
  else console.log(`keyboard: Download reached in ${stops + 1} Tab stops`);
  await p.keyboard.press("Meta+k");
  const open = await p.$("[cmdk-input]").then(Boolean).catch(() => false);
  await p.waitForTimeout(300);
  if (!(await p.$("[cmdk-input]"))) fails.push("keyboard: ⌘K did not open the palette");
  await p.keyboard.press("Escape");
  await p.close();
}
// The sitemap lists every docs page, not just /docs.
{
  const xml = await (await fetch(base + "/sitemap.xml")).text();
  for (const slug of ["getting-started", "recall", "research-packages", "troubleshooting"]) {
    if (!xml.includes(`/docs/${slug}</loc>`)) fails.push(`sitemap: missing /docs/${slug}`);
  }
}
// The mobile menu closes when you tap a link to the page you're already on.
{
  const p = await b.newPage({ viewport: { width: 375, height: 812 } });
  await p.goto(base + "/download", { waitUntil: "load" });
  await p.getByRole("button", { name: "Open menu" }).click();
  await p.waitForTimeout(300);
  await p.locator("dialog[open] a", { hasText: "Download" }).click();
  await p.waitForTimeout(400);
  if (await p.locator("dialog[open]").count()) fails.push("mobile menu: stays open after tapping a link to the current page");
  await p.close();
}
await b.close();
if (fails.length) {
  console.log("FAILURES:\n" + fails.join("\n"));
  process.exit(1);
}
console.log(`smoke: ${routes.length} routes × 2 widths × motion on/off, all clean`);
