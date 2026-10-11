// Page-only screenshots for review: never the desktop.
// usage: node scripts/shot.mjs <path> [--widths 375,1280] [--themes light,dark]
//        [--reduced] [--full] [--out dir] [--base http://localhost:3000] [--wait ms]
//        [--scroll y] [--name prefix]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const opt = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i === -1 ? d : args[i + 1];
};
const flag = (k) => args.includes(`--${k}`);
const path = args[0] && !args[0].startsWith("--") ? args[0] : "/";
const widths = opt("widths", "375,1280").split(",").map(Number);
const themes = opt("themes", "light,dark").split(",");
const base = opt("base", "http://localhost:3000");
const out = opt("out", ".impeccable/review/shots");
const wait = Number(opt("wait", "800"));
const scroll = opt("scroll", null);
const prefix = opt("name", path === "/" ? "home" : path.replace(/\//g, "_").replace(/^_/, ""));
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const errors = [];
for (const theme of themes) {
  for (const w of widths) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: w < 600 ? 812 : w < 1100 ? 1024 : w < 1600 ? 860 : 1080 },
      colorScheme: theme,
      reducedMotion: flag("reduced") ? "reduce" : "no-preference",
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && errors.push(`${w}/${theme}: ${m.text()}`));
    page.on("pageerror", (e) => errors.push(`${w}/${theme}: ${e.message}`));
    await page.goto(base + path, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    if (scroll) await page.evaluate((y) => window.scrollTo(0, Number(y)), scroll);
    await page.waitForTimeout(wait);
    const file = `${out}/${prefix}-${w}-${theme}${flag("reduced") ? "-rm" : ""}.png`;
    await page.screenshot({ path: file, fullPage: flag("full") });
    console.log(file);
    await ctx.close();
  }
}
await browser.close();
if (errors.length) {
  console.log("CONSOLE ERRORS:\n" + errors.join("\n"));
  process.exitCode = 1;
}
