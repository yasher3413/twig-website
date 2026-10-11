// The review matrix: every route at 375/768/1280/1920 in light and dark,
// full page, plus reduced-motion captures of the home page.
import { execFileSync } from "node:child_process";

// shot.mjs exits 1 on console errors; locally the analytics script 404s, so
// keep going and let the smoke test judge errors.
const run = (args) => {
  try {
    execFileSync("node", args, { stdio: "inherit" });
  } catch {}
};
const routes = ["/", "/download", "/releases", "/docs", "/docs/getting-started", "/faq", "/about", "/donate", "/community", "/brand", "/legal/privacy", "/legal/acknowledgements"];
for (const r of routes) {
  run(["scripts/shot.mjs", r, "--widths", "375,768,1280,1920", "--themes", "light,dark", "--full", "--wait", "1500", "--out", ".impeccable/review/matrix"]);
}
run(["scripts/shot.mjs", "/", "--widths", "375,1280", "--themes", "light,dark", "--full", "--reduced", "--wait", "800", "--out", ".impeccable/review/matrix"]);
