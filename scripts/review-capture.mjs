// Full-page captures for the finish review: scroll through first so every
// lazy demo mounts, wait for motion to settle, then shoot from the top.
import { chromium } from "playwright";
const base = process.argv[2] || "http://localhost:3000";
const b = await chromium.launch();
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto(base + "/", { waitUntil: "load" });
  const height = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += Math.round(h * 0.6)) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(260);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `.impeccable/review/${name}.png`, fullPage: true });
  console.log(name, height);
  await p.close();
}
await b.close();
