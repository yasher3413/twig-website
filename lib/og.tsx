import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

const FIELDS = {
  moss: { bg: "#4b6b3a", mark: "#c9e0b4" },
  ocean: { bg: "#2b6e7a", mark: "#bfe3e8" },
  clay: { bg: "#8f4a26", mark: "#f3cdb3" },
  plum: { bg: "#6b4a82", mark: "#e2d0ef" },
  slate: { bg: "#52564c", mark: "#dfe1d6" },
} as const;

export type OgField = keyof typeof FIELDS;

async function fonts() {
  const dir = join(process.cwd(), "assets/og");
  const [serif, sans] = await Promise.all([readFile(join(dir, "YoungSerif-Regular.ttf")), readFile(join(dir, "PublicSans-Medium.ttf"))]);
  return [
    { name: "Young Serif", data: serif, weight: 400 as const, style: "normal" as const },
    { name: "Public Sans", data: sans, weight: 500 as const, style: "normal" as const },
  ];
}

// The brand's OG card: paper with a Young Serif title, a colour field on the
// right carrying the twig, and the branch running between them.
export async function renderOg({ title, field = "moss", note }: { title: string; field?: OgField; note?: string }) {
  const f = FIELDS[field];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f6f4ee", color: "#23261f" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760, padding: "64px 0 56px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Young Serif", fontSize: 40, letterSpacing: -1 }}>twig</div>
          <div style={{ display: "flex", fontFamily: "Young Serif", fontSize: title.length > 40 ? 64 : 80, lineHeight: 1.0, letterSpacing: -2.4, maxWidth: 640 }}>{title}</div>
          <div style={{ display: "flex", fontFamily: "Public Sans", fontSize: 22, color: "#62665a", maxWidth: 600 }}>{note ?? "The browser that remembers. Free and open source, for Mac."}</div>
        </div>
        <div style={{ display: "flex", flex: 1, background: f.bg, alignItems: "center", justifyContent: "center", position: "relative" }}>
          <svg width="300" height="300" viewBox="200 180 640 620">
            <path d="M262 760 C 380 700, 470 600, 560 470 S 700 290, 770 250" stroke={f.mark} strokeWidth="34" fill="none" strokeLinecap="round" />
            <path d="M520 525 C 470 470, 450 410, 455 350" stroke={f.mark} strokeWidth="24" fill="none" strokeLinecap="round" />
            <path d="M455 352 C 395 330, 360 270, 372 205 C 438 222, 478 283, 455 352 Z" fill={f.mark} />
            <path d="M410 660 C 350 690, 275 680, 232 628 C 290 590, 370 605, 410 660 Z" fill={f.mark} opacity="0.75" />
            <path d="M606 418 C 660 470, 740 480, 800 445 C 755 385, 665 375, 606 418 Z" fill={f.mark} opacity="0.75" />
            <circle cx="776" cy="246" r="32" fill={f.mark} />
          </svg>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
