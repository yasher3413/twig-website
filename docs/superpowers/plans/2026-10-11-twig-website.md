# twig website: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy twig's public website (home with live demos, download, releases, docs, FAQ, about, donate, community, brand, legal, 404) in the Gardener's Almanac direction.

**Architecture:** A Next.js 16 App Router site.
- Marketing pages live in a `(site)` route group, and docs are served by Fumadocs at `/docs`.
- Faithful twig UI recreations sit in `components/twig-ui` (presentational). Chapter demos in `components/demos` own the state and are lazy-loaded.
- Release data comes from the GitHub API with ISR, falling back to a committed snapshot.

**Tech stack:** Next 16.4, React 19.3, Tailwind CSS 4.3 (`@tailwindcss/postcss`), motion 14 (`motion/react`), Fumadocs 16 (`fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx` 15), cmdk 1.1, marked 18 (release markdown), @vercel/analytics 2, Vitest 5, Playwright 1.64.

**Spec:** `docs/superpowers/specs/2026-10-11-twig-website-design.md`. Read it with this plan; the spec decides wherever this plan is silent. Product truth: `PRODUCT.md`. Brief: `/Users/yash/twig-browser/WEBSITE_BRIEF.md`.

## Global constraints

- Never modify `/Users/yash/twig-browser`; read only.
- Commits: conventional prefixes, specific paths only (never `git add -A`), **no AI attribution lines**, push after each task.
- Never commit `.playwright-mcp/`, `.impeccable/live|review|mocks/`, `.codex/`, `.cursor/`, `.grok/`, `.omx/`.
- Screenshots: capture the browser page only, never the desktop.
- Claims must be true of twig v0.1.3. No invented numbers, testimonials, logos or star-count proof.
- Download URL: `https://github.com/yasher3413/twig/releases/latest/download/twig-macos-arm64.dmg`, always.
- Releases API: `https://api.github.com/repos/yasher3413/twig/releases`, `revalidate: 3600`.
- Tokens:
  - light: paper `#f6f4ee`, strip `#e8e5d8`, ink `#23261f`, muted `#62665a`, moss `#4b6b3a`;
  - dark: paper `#17190f`, surface `#1c1f13`, strip `#101208`, ink `#e9e7dd`, muted `#9a9c8d`, moss `#8fbb6e`;
  - forest night `#101208`.
- Fields (light): Moss `#4b6b3a`, Ocean `#2b6e7a`, Clay `#8f4a26`, Honey `#e0b24d` (ink text), Plum `#6b4a82`, Slate `#52564c`.
- Fonts: Young Serif (display, from `/Users/yash/twig-browser/src/assets/fonts/YoungSerif-Regular.woff2`) and Libre Franklin (variable, text). Both self-hosted.
- Easing: `--ease-grow: cubic-bezier(0.22,1,0.36,1)`, `--ease-unfurl: cubic-bezier(0.16,1,0.3,1)`, `--ease-settle: cubic-bezier(0.33,0,0.15,1)`, `--ease-drift: cubic-bezier(0.45,0,0.55,1)`.
- Animate only transform, opacity and stroke-dashoffset. `prefers-reduced-motion` gives a composed static end state.
- Copy: calm, warm, precise. Banned words: revolutionary, blazing-fast, game-changing, supercharge, seamless. Lowercase "twig".
- Budgets: LCP < 2.0 s, CLS < 0.05, INP < 200 ms, home initial JS ≤ 120 KB gzip, Lighthouse ≥ 95 in all four categories.
- WCAG 2.2 AA, both themes.
- Breakpoints to verify: 375, 768, 1280, 1920 × light/dark × reduced-motion on/off.
- Star count only when `stargazers ≥ 50`.
- Owner values in `site.config.ts`:
  - instagram `yash_gandhi34`, linkedin `yashgandhi34`, x `yash_gandhi34`;
  - everything else from spec §7. Discord stays `null`, shown as a designed blank.

## Review focus

1. **GitHub API down or rate-limited at build or revalidate** → pages still render with the snapshot version (v0.1.3) and the download link still works. Test in Task 3.
2. **Unknown platform (Safari can't report the chip)** → the page shows the universal Mac message and the Download button, never "not supported". Test in Task 3.
3. **⌘K pressed while typing in an input (Recall demo, docs search)** → the site palette must not steal focus from a focused text field unless the key is ⌘K itself. Plain letters never open it. Test in Task 9.
4. **Reduced motion or no JS** → every chapter shows complete, readable content, with no invisible-until-animated text. Playwright check in Task 16.
5. **Null owner values** (discord, contactEmail, donate.url) → no `href="null"` or empty links anywhere. Designed blanks render instead. Test in Task 2, and link check in Task 16.

---

## File map

```
app/layout.tsx                    root html, fonts, theme script, analytics
app/global.css                    tailwind v4 + tokens + base
app/(site)/layout.tsx             Header + Footer + CommandK
app/(site)/page.tsx               home
app/(site)/{download,releases,faq,about,donate,community,brand}/page.tsx
app/(site)/legal/{privacy,terms,license,acknowledgements}/page.tsx
app/docs/layout.tsx, app/docs/[[...slug]]/page.tsx   Fumadocs
app/api/search/route.ts           Fumadocs search
app/releases/feed.xml/route.ts    Atom
app/{sitemap,robots}.ts, app/not-found.tsx, app/opengraph-image.tsx, app/icon.svg, app/apple-icon.png
site.config.ts
lib/{github,platform,recall-search,format,feed,links}.ts   (+ tests/*.test.ts)
content/releases.snapshot.json, content/demo-data/*.ts, content/docs/*.mdx
components/chrome/{Header,Footer,ThemeToggle,CommandK,DownloadButton,VersionChip,SocialLinks}.tsx
components/motion/{Branch,Reveal,SetLine,Magnetic,InPlace,useInView}.tsx
components/almanac/{EntryHead,Field,RuledTable,TimeRuler,DesignedBlank,Provenance,Leaf}.tsx
components/twig-ui/*.tsx + twig-ui.module.css
components/demos/{hero,sleeping,recall,changes,snooze,checkpoints,packages,palette,keyboard}/…
components/chapters/*.tsx         static chapter shells (copy + demo slot)
scripts/{screenshots,linkcheck,contrast,capture-app}.mjs
public/fonts/*.woff2, public/grain.webp, public/brand/*
```

---

### Task 1: Foundation scaffold, tokens, fonts, theme

**Files:** `package.json`, `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `app/global.css`, `app/layout.tsx`, `public/fonts/*`, `components/chrome/ThemeToggle.tsx`, `vitest.config.ts`

**Interfaces:** Produces CSS variables `--paper --strip --surface --ink --muted --moss --moss-tint --border --border-strong --forest --f-moss --f-ocean --f-clay --f-honey --f-plum --f-slate --on-field-*`, the ease tokens, the `font-display` / `font-text` utilities, and `data-theme` on `<html>`.

- [ ] Scaffold by hand (no create-next-app prompts): install `next@16.4 react@19.3 react-dom@19.3`, dev `typescript @types/react @types/node tailwindcss@4.3 @tailwindcss/postcss vitest`.
- [ ] Copy `YoungSerif-Regular.woff2` to `public/fonts/`. Download Libre Franklin variable (OFL, google/fonts repo `ofl/librefranklin/LibreFranklin[wght].ttf`), subset to Latin plus punctuation with `pyftsubset` into `public/fonts/LibreFranklin-var.woff2`. Load both via `next/font/local` with `display: 'swap'`.
- [ ] Write `app/global.css`: `@import "tailwindcss";` and an `@theme` block mapping the tokens. `:root` holds the light tokens, `@media (prefers-color-scheme: dark) :root:not([data-theme=light])` and `:root[data-theme=dark]` hold the dark ones (same pattern as the app's `App.css`).
- [ ] Theme script inline in `<head>` (no flash): reads `localStorage.theme` and sets `data-theme`. `ThemeToggle` cycles system → light → dark and writes localStorage.
- [ ] Vitest config (`environment: 'node'`, `include: ['tests/**/*.test.ts']`).
- [ ] Verify: `npm run build` passes, and the dev page renders paper/ink in both schemes (Playwright screenshot of page only).
- [ ] Commit `chore: scaffold next.js site with twig tokens, fonts and theme`.

### Task 2: site.config.ts and link helpers

**Files:** `site.config.ts`, `lib/links.ts`, `tests/links.test.ts`

**Interfaces:**
- `siteConfig` (typed `SiteConfig`).
- `socialLinks(): {key, label, href}[]` returns only the non-null entries.
- `downloadUrl` constant.
- `contactHref(): string` returns `mailto:` if `contactEmail` is set, else the GitHub issues URL.
- `donateHref(): string | null`.

- [ ] Write the test:
```ts
import { describe, it, expect } from 'vitest'
import { socialLinks, contactHref, donateHref, DOWNLOAD_URL } from '../lib/links'
import { siteConfig } from '../site.config'
describe('links', () => {
  it('only returns socials that are set', () => {
    const l = socialLinks()
    expect(l.every(s => typeof s.href === 'string' && s.href.startsWith('https://'))).toBe(true)
    expect(l.map(s => s.key)).toEqual(expect.arrayContaining(['instagram', 'linkedin', 'x', 'github']))
    expect(l.find(s => s.key === 'bluesky')).toBeUndefined()
  })
  it('falls back to GitHub issues when no email', () => {
    expect(siteConfig.contactEmail).toBeNull()
    expect(contactHref()).toBe('https://github.com/yasher3413/twig/issues')
  })
  it('has no donate href until a url is set', () => { expect(donateHref()).toBeNull() })
  it('download url is the stable latest asset', () => {
    expect(DOWNLOAD_URL).toBe('https://github.com/yasher3413/twig/releases/latest/download/twig-macos-arm64.dmg')
  })
})
```
- [ ] Run `npx vitest run tests/links.test.ts` and confirm it FAILS (module missing).
- [ ] Implement `site.config.ts` from spec §7 with socials `x: 'https://x.com/yash_gandhi34'`, `instagram: 'https://www.instagram.com/yash_gandhi34/'`, `linkedin: 'https://www.linkedin.com/in/yashgandhi34/'`, and `lib/links.ts`.
- [ ] Run tests and confirm PASS. Commit `feat: centralise owner-supplied values in site.config`.

### Task 3: Data layer: GitHub releases, platform detection, formatting

**Files:** `lib/github.ts`, `lib/platform.ts`, `lib/format.ts`, `content/releases.snapshot.json`, `tests/github.test.ts`, `tests/platform.test.ts`

**Interfaces:**
- `type Release = { tag: string; version: string; name: string; date: string; body: string; url: string; dmgSize: number | null }`
- `getReleases(): Promise<Release[]>` (newest first; snapshot on any failure)
- `getLatest(): Promise<Release>`
- `getRepo(): Promise<{ stars: number | null }>`
- `parseReleases(json: unknown): Release[]`
- `type Platform = 'mac-arm' | 'mac-intel' | 'mac-unknown' | 'windows' | 'linux' | 'ios' | 'android' | 'unknown'`
- `detectPlatform(input: { ua: string; platform?: string; arch?: string; webglRenderer?: string }): Platform`
- `formatBytes(n): string` (e.g. "3.8 MB"), `formatDate(iso): string` (e.g. "30 September 2026")

- [ ] Snapshot: run `curl -s https://api.github.com/repos/yasher3413/twig/releases > content/releases.snapshot.json`.
- [ ] Tests:
```ts
// tests/github.test.ts
import { describe, it, expect, vi } from 'vitest'
import snapshot from '../content/releases.snapshot.json'
import { parseReleases, getReleases } from '../lib/github'
describe('releases', () => {
  it('parses newest first with dmg size', () => {
    const r = parseReleases(snapshot)
    expect(r[0].version).toBe('0.1.3')
    expect(r[0].dmgSize).toBeGreaterThan(1_000_000)
    expect(r.map(x => x.version)).toEqual(['0.1.3', '0.1.2', '0.1.1', '0.1.0'])
  })
  it('falls back to the snapshot when the API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const r = await getReleases()
    expect(r[0].version).toBe('0.1.3')
    vi.unstubAllGlobals()
  })
  it('falls back when the API is rate limited', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"message":"rate limit"}', { status: 403 })))
    expect((await getReleases())[0].version).toBe('0.1.3')
    vi.unstubAllGlobals()
  })
  it('ignores drafts and malformed entries', () => {
    expect(parseReleases([{ draft: true, tag_name: 'v9' }, { nonsense: 1 }])).toEqual([])
  })
})
// tests/platform.test.ts
import { describe, it, expect } from 'vitest'
import { detectPlatform } from '../lib/platform'
const MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15'
describe('detectPlatform', () => {
  it('safari on mac with no hints is unknown chip', () => expect(detectPlatform({ ua: MAC })).toBe('mac-unknown'))
  it('client hints arm → mac-arm', () => expect(detectPlatform({ ua: MAC, platform: 'macOS', arch: 'arm' })).toBe('mac-arm'))
  it('client hints x86 → mac-intel', () => expect(detectPlatform({ ua: MAC, platform: 'macOS', arch: 'x86' })).toBe('mac-intel'))
  it('webgl Apple M renderer → mac-arm', () => expect(detectPlatform({ ua: MAC, webglRenderer: 'Apple M2 Pro' })).toBe('mac-arm'))
  it('windows', () => expect(detectPlatform({ ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' })).toBe('windows'))
  it('linux', () => expect(detectPlatform({ ua: 'Mozilla/5.0 (X11; Linux x86_64)' })).toBe('linux'))
  it('iPhone', () => expect(detectPlatform({ ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' })).toBe('ios'))
  it('iPad desktop-mode UA with touch hint stays mac-unknown, not intel', () => expect(detectPlatform({ ua: MAC })).not.toBe('mac-intel'))
})
```
- [ ] Run them and confirm they FAIL. Implement: `getReleases` fetches with `{ next: { revalidate: 3600 }, headers: { Accept: 'application/vnd.github+json' } }`, `!res.ok` → snapshot, try/catch → snapshot, and an empty parse → snapshot. Run them and confirm PASS.
- [ ] Commit `feat: release data with snapshot fallback and platform detection`.

### Task 4: Global chrome: Header, Footer, DownloadButton, VersionChip, designed blanks

**Files:** `app/(site)/layout.tsx`, `components/chrome/{Header,Footer,DownloadButton,VersionChip,SocialLinks}.tsx`, `components/almanac/{DesignedBlank,RuledTable,EntryHead,Leaf}.tsx`

**Interfaces:**
- `<DownloadButton size="lg"|"md" magnetic? />` renders the link to `DOWNLOAD_URL` with the leaf glyph, plus `<VersionChip version>` reading "v0.1.3 · Apple Silicon".
- `<DesignedBlank label="Discord opens soon" />`
- `<EntryHead when="After 10 minutes" />`
- `<RuledTable rows={[[a,b]]} caption />`
- `<Leaf state="awake"|"asleep" />` uses the app icon leaf path `M455 352 C 395 330, 360 270, 372 205 C 438 222, 478 283, 455 352 Z`, normalised to a 24 px box.

- [ ] Build the components to spec §5 (global chrome) and §3.4/§3.5.
  - Header: sticky, strip-coloured hairline at the bottom. The wordmark uses Young Serif "twig" plus the leaf.
  - Footer: almanac ruled table with columns Get twig / Learn / Project / Legal, the version, socials via `socialLinks()`, Discord as a designed blank, and "Made on a Mac".
- [ ] Verify the screenshot matrix (375 and 1280, light and dark) for the header and footer. Check keyboard Tab order and visible focus rings (2 px moss outline, 2 px offset).
- [ ] Commit `feat: header, footer and download button in almanac style`.

### Task 5: SEO base and first Vercel preview

**Files:** `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/icon.svg`, `app/apple-icon.png`, `lib/seo.ts`

- [ ] `lib/seo.ts`: `pageMeta({title, description, path})` returns Next `Metadata` with canonical and OG. Base URL = `siteConfig.domain ?? process.env.VERCEL_PROJECT_PRODUCTION_URL` (prefixed with https) ?? `http://localhost:3000`.
- [ ] Icons: `app/icon.svg` is the app icon SVG copied as-is. `apple-icon.png` is rendered at 180 px with `sips` or `magick`.
- [ ] OG image (`next/og`, Node runtime): moss field, Young Serif title (font loaded from `public/fonts`), branch line.
- [ ] Link Vercel: `npx vercel link --yes --scope yash-gandhis-projects-ca03e900 --project twig-website`, then `npx vercel deploy` (preview). Record the URL.
- [ ] Commit `feat: seo base, icons, og image`. Push.

### Task 6: Motion system and the branch

**Files:** `components/motion/{tokens.ts,useInView.ts,Reveal.tsx,SetLine.tsx,Magnetic.tsx,InPlace.tsx,Branch.tsx,useReducedMotion.ts}`

**Interfaces:**
- `<Reveal as? delay?>` is visible without JS: the `data-reveal` attribute is only added after hydration, then it animates.
- `<SetLine text lines />`
- `<Magnetic strength={5}>`
- `<InPlace value />` fixed-width cell, crossfades on change.
- `<Branch chapters={{id, kind:'leaf'|'bud'|'fork'}[]} />`
  - reads chapter elements by id;
  - draws a stem with `useScroll` → `pathLength`;
  - leaves unfurl when a chapter's top crosses 70% of the viewport, and fall asleep 1.2 s after the chapter's bottom passes the top;
  - scrolling back wakes them;
  - reduced motion: fully drawn, all awake.
- Exports `useChapterState()` context so the hero can add leaves.

- [ ] Start from 21st `motiondotdev/motion-path-drawing` (#24528) and `danielpetho/vertical-cut-reveal` (#884) via `mcp__21st__get_component`. Rewrite them in twig tokens: no shadcn classes, no default styling left.
- [ ] The branch path is generated from chapter offsets measured on resize (a `ResizeObserver` on the document), a smooth cubic through x = 28 px ± 10 px wobble. Leaves are 18 × 18, alternating sides, as in the Welcome `Branch` (leaf up `M0 0 C -3 -9, 6 -17, 13 -17 C 12 -9, 6 -3, 0 0 Z`, leaf down mirrored).
- [ ] Verify on a temporary test page: scroll capture at 3 positions and a reduced-motion capture. Then delete the test page.
- [ ] Commit `feat: motion primitives and the scroll-grown branch`.

### Task 7: twig-ui recreations

**Files:** `components/twig-ui/{Window,TabStrip,Tab,Toolbar,Omnibox,SiteMark,Ledger,ChangedChip,ChangesPanel,RecallPanel,SnoozePicker,SweepPill,SweepPanel,Palette,Keycap,Icon}.tsx`, `components/twig-ui/twig-ui.module.css`

**Interfaces:** Pure props components, for example:
- `<Window theme? children>`
- `<TabStrip tabs={TabModel[]} activeId onSelect? />` with `TabModel = { id; title; site; state: 'awake'|'asleep'|'busy'; dot?: boolean }`
- `<Ledger inUse awake asleep notSpent />`
- `<ChangesPanel changes={{kind:'added'|'removed'|'edited'; text; before?}[]} onClose />`

- [ ] Read `/Users/yash/twig-browser/src/components/{TabStrip,AddressBar,Changes,Recall,SnoozePicker,SweepPanel,CommandPalette,SettingsPanel,SiteMark,Icon}.{tsx,css}` and port dimensions, radii and colours exactly:
  - tab 30 px high, radius 9 px 9 px 0 0;
  - concave wings via radial-gradient 8.5/9 px;
  - strip 38 px;
  - asleep: site-mark opacity .5 + grayscale, title opacity .55;
  - 5 px dot.
- [ ] Scope all styles under `.twig` with the app's own font stack and 13 px base, so the site's type never leaks in.
- [ ] Capture real app screenshots with `scripts/capture-app.mjs` (Task 15 dependency; run the app harness now): `cd /Users/yash/twig-browser && npm run dev` in the background, then `TWIG_PLAYWRIGHT_MODULE=… CAPTURE=1 node tests/changes-browser.mjs`. Compare side by side against the recreations and fix differences.
- [ ] Commit `feat: faithful twig ui recreations for demos`.

### Task 8: Hero and the living twig window

**Files:** `components/demos/hero/{LivingWindow.tsx,useLivingTabs.ts}`, `components/chapters/Hero.tsx`, `app/(site)/page.tsx`, `content/demo-data/tabs.ts`

**Interfaces:** `useLivingTabs({ cap: 5 })` returns `{ tabs, ledger }`. Script: open a tab every 1.6 s up to 9. A tab idle for more than 4 s (demo time; the page says "10 minutes, sped up") settles asleep, beyond the awake cap of 5, oldest first. The ledger updates in place.

- [ ] Compose per spec §5.1 hero (exact composition at 1440 and 375). The SSR first frame shows 4 awake tabs, and the animation starts in view.
- [ ] Use the time ruler (0 / 5 / 10 min, tabular figures). Add a "Demo values" caption near the ledger.
- [ ] Run impeccable critique and polish. Run the screenshot matrix for the hero.
- [ ] Commit `feat: hero with the living twig window`.

### Task 9: Site ⌘K palette (chapter 7, and global)

**Files:** `components/chrome/CommandK.tsx`, `lib/search-index.ts`, `tests/search-index.test.ts`, `tests/hotkey.test.ts`, `lib/hotkey.ts`

**Interfaces:**
- `buildIndex(): Entry[]` with `Entry = { group: 'Sections'|'Docs'|'Pages'|'Commands'; title; href?; action?; keywords: string[] }`
- `isPaletteHotkey(e: {key, metaKey, ctrlKey, altKey, shiftKey}): boolean`

- [ ] Tests:
```ts
import { describe, it, expect } from 'vitest'
import { isPaletteHotkey } from '../lib/hotkey'
describe('palette hotkey', () => {
  it('⌘K opens', () => expect(isPaletteHotkey({ key: 'k', metaKey: true, ctrlKey: false, altKey: false, shiftKey: false })).toBe(true))
  it('Ctrl+K opens', () => expect(isPaletteHotkey({ key: 'k', metaKey: false, ctrlKey: true, altKey: false, shiftKey: false })).toBe(true))
  it('plain k never opens (typing in inputs)', () => expect(isPaletteHotkey({ key: 'k', metaKey: false, ctrlKey: false, altKey: false, shiftKey: false })).toBe(false))
  it('⇧⌘K does not open', () => expect(isPaletteHotkey({ key: 'K', metaKey: true, ctrlKey: false, altKey: false, shiftKey: true })).toBe(false))
})
```
- [ ] Implement with `cmdk` (accessible combobox), styled from the app's `CommandPalette.css`. Groups are ordered as in the app. It indexes home sections, pages, docs titles and commands (Toggle theme, Download twig, Copy Terminal command). Esc closes and focus returns to the trigger.
- [ ] The chapter 7 shell renders an inline open-palette prompt.
- [ ] Commit `feat: site-wide command palette`.

### Task 10: Chapters 1–3 (Sleeping tabs, Recall, Changes)

**Files:** `components/demos/{sleeping,recall,changes}/*`, `components/chapters/{Sleeping,Recall,Changes}.tsx`, `lib/recall-search.ts`, `tests/recall-search.test.ts`, `content/demo-data/{recall,changes}.ts`

**Interfaces:**
- `createIndex(docs: {id; title; url; space; date; text}[])` returns `{ search(q: string, opts?: {space?: string; from?: string; to?: string}): {id; snippet: {before; match; after}[]; score}[] }`. Word matching with simple English stemming (strip `ing|ed|es|s`), AND semantics, ranked by term frequency.
- Sleeping: `useSleepingStrip(cap)` holds 12 tabs, awake set ≤ cap, a click wakes (evicting the least recent), and a busy tab is exempt.

- [ ] Recall tests:
```ts
import { describe, it, expect } from 'vitest'
import { createIndex } from '../lib/recall-search'
const docs = [
  { id: 'a', title: 'Sourdough starter guide', url: 'https://example.org/bread', space: 'Kitchen', date: '2026-09-02', text: 'Feed the starter twice daily. A ripe starter doubles in size.' },
  { id: 'b', title: 'Tide tables explained', url: 'https://example.org/tides', space: 'Sailing', date: '2026-08-14', text: 'Spring tides happen near the new and full moon.' },
]
describe('recall search', () => {
  const idx = createIndex(docs)
  it('finds by a word inside the page', () => expect(idx.search('doubles')[0].id).toBe('a'))
  it('stems: feeding matches feed', () => expect(idx.search('feeding')[0].id).toBe('a'))
  it('AND semantics', () => expect(idx.search('moon starter')).toEqual([]))
  it('filters by space', () => expect(idx.search('tides', { space: 'Kitchen' })).toEqual([]))
  it('filters by date range inclusive', () => expect(idx.search('tides', { from: '2026-08-14', to: '2026-08-14' }).length).toBe(1))
  it('empty or punctuation query returns nothing, no throw', () => { expect(idx.search('')).toEqual([]); expect(idx.search('  ?! ')).toEqual([]) })
  it('snippet marks the match', () => expect(idx.search('ripe')[0].snippet[0].match.toLowerCase()).toBe('ripe'))
})
```
- [ ] Run and confirm FAIL, implement, run and confirm PASS.
- [ ] Build the three chapters per spec §5.1 with an `aria-live="polite"` narration line per demo, e.g. "Tab woke: Tide tables. 5 awake, 7 asleep."
- [ ] Demo data: about 12 invented, neutral reading copies (bread, tides, typography, a bike repair, a train timetable, a museum page, and so on), example.org-style URLs, dated September 2026.
- [ ] Run impeccable critique and polish per chapter, and the matrix. Commit each chapter separately: `feat: sleeping tabs chapter`, `feat: recall chapter with live search`, `feat: changes chapter`.

### Task 11: Chapters 4–6 (Snooze and sweep, Checkpoints, Packages)

**Files:** `components/demos/{snooze,checkpoints,packages}/*`, `components/chapters/{Snooze,Checkpoints,Packages}.tsx`

- [ ] **Snooze:** the picker's 6 presets (In 1 hour · This evening · Tomorrow morning · This weekend · Next week · Pick a date and time…) on keys 1–6. Picking "Pick a date and time" resolves to **Tuesday 9:00 AM** on a small calendar. The tab drifts to the calendar cell, then returns asleep at the end of the strip with the moss dot. The sweep pill reads "4 untouched tabs", and the panel shows Archive · Snooze to next week · Not now, wired to the strip.
- [ ] **Checkpoints:** an SVG timeline. Save adds a bud with name and note; Fork sprouts a branch and creates a new space chip; Resume reorders the strip. It calls `useChapterState().fork()` so the margin branch forks too.
- [ ] **Packages:** sources, notes and an excerpt assemble into a `.twig` file card. Format tabs (`.twig` / Markdown / HTML) show accurate previews from `docs/research-packages.md` format v1 (read that file for the field names before writing previews).
- [ ] Run critique and polish, and the matrix. Commit each separately.

### Task 12: Chapters 8–11 and the close

**Files:** `components/demos/keyboard/*`, `components/chapters/{Keyboard,LocalFirst,BuiltDifferently,OpenSource,Close}.tsx`

- [ ] **Keyboard:** a keycap grid of the README shortcut table (the 24 rows from `/Users/yash/twig-browser/README.md` Shortcuts). `keydown` lights the matching cap and names the action. `preventDefault` only on chords that would otherwise do nothing harmful, never on ⌘W/⌘Q/⌘T/⌘L/⌘R. Starting point: 21st `kbd-key` #28886, re-skinned.
- [ ] **LocalFirst / BuiltDifferently:** forest-night sections with one light pool. Precise lists and a drawn Mac-outline diagram. The 3.8 MB fact comes from `getLatest().dmgSize`, with a provenance link to the release.
- [ ] **OpenSource:** version and date from the API, star button (count only ≥ 50), report a bug, Discord as a designed blank, support link.
- [ ] **Close:** Download, requirements table, a kind two-step Open Anyway with the Terminal command and a copy button.
- [ ] Run critique and polish, and the matrix. Commit per chapter.

### Task 13: Download and Releases pages, Atom feed

**Files:** `app/(site)/download/page.tsx`, `components/download/{PlatformAware.tsx,FirstLaunchSteps.tsx}`, `app/(site)/releases/page.tsx`, `app/releases/feed.xml/route.ts`, `lib/feed.ts`, `tests/feed.test.ts`

- [ ] Feed test: `buildAtom(releases, baseUrl)` contains `<feed xmlns="http://www.w3.org/2005/Atom">`, one `<entry>` per release, `<id>` = release URL, and escapes `&` and `<` in bodies.
- [ ] Download per spec §5.2: `PlatformAware` sits in a fixed-height slot, SSR renders the `mac-unknown` copy, and it refines after hydration. FirstLaunchSteps are SVG illustrations labelled "Illustration".
- [ ] Releases per spec §5.3: `marked` renders the bodies into a `.prose-almanac` class. Anchors use the `v0-1-3` format. The newest release is featured.
- [ ] Commit `feat: download page with platform-aware guidance` and `feat: release notes from github with atom feed`.

### Task 14: Docs (Fumadocs)

**Files:** `source.config.ts`, `lib/source.ts`, `app/docs/layout.tsx`, `app/docs/[[...slug]]/page.tsx`, `app/api/search/route.ts`, `content/docs/*.mdx`, `content/docs/meta.json`, `mdx-components.tsx`

- [ ] Install `fumadocs-core fumadocs-ui fumadocs-mdx @types/mdx`. Follow the current Fumadocs Next setup (check `node_modules/fumadocs-mdx` README for the v15 config API), and re-skin its CSS variables to twig tokens.
- [ ] Write the 15 pages listed in spec §5.4. Adapt `recall.md`, `snooze.md` and `research-packages.md` faithfully, and write the others from README facts. Shortcuts page: the full table plus rebinding (Settings → Shortcuts, or ⌘K → Customize keyboard shortcuts). Troubleshooting covers Gatekeeper, the default browser, "unsupported browser" (twig reports the Mac's Safari version) and sign-in pop-ups.
- [ ] Verify search returns results for "snooze", and that prev/next links and the TOC render in light and dark.
- [ ] Commit `docs: add full product documentation with search`.

### Task 15: FAQ, About, Donate, Community, Brand, Legal, 404

**Files:** the `app/(site)/{faq,about,donate,community,brand}/page.tsx` pages, `app/(site)/legal/*/page.tsx`, `app/not-found.tsx`, `scripts/capture-app.mjs`, `public/brand/*`

- [ ] FAQ: 10 questions, `<details>` accordion, answers from spec §5.5 and brief §3.5.
- [ ] About: a story, the principles, a bio drafted from facts with a visible draft marker while `bioApproved: false`, a leaf monogram, and credits.
- [ ] Donate: tiers ($3 / $8 / $20 / custom) as seed-packet cards, "Donations open soon", and Star the repo.
- [ ] Community: links and designed blanks.
- [ ] Brand: icon SVG and PNG (1024/512/256 via `sips`), wordmark SVG, tokens with copy buttons, real screenshots from `scripts/capture-app.mjs`, and short and long descriptions.
- [ ] Legal: four pages with draft banners. Privacy per spec §5.9. License is the full MIT text from `/Users/yash/twig-browser/LICENSE`. Acknowledgements are generated from the app's `package.json` and `Cargo.toml` key dependencies, plus fonts.
- [ ] 404: a lost leaf, a home link and the ⌘K hint.
- [ ] Commit each page group separately.

### Task 16: Quality pass and production deploy

**Files:** `scripts/{screenshots,linkcheck,contrast}.mjs`, `tests/e2e/*.spec.ts`, `README.md`

- [ ] `scripts/contrast.mjs`: asserts every token pair in spec §3.3 is ≥ 4.5:1 (exit 1 otherwise).
- [ ] `scripts/linkcheck.mjs`: crawls `http://localhost:3000` from `/`, follows internal links, HEAD-checks external ones (GitHub excepted on 429), and fails on 4xx/5xx or `href` values of `null`, `undefined` or `#` without a target.
- [ ] `tests/e2e/smoke.spec.ts`: every route loads with zero console errors; reduced-motion run with every `h1`/`h2` visible and opacity 1; keyboard-only flow where Tab reaches Download on home within 6 stops and ⌘K opens and closes the palette.
- [ ] `scripts/screenshots.mjs`: the matrix for all routes into `.impeccable/review/matrix/`. Inspect every image.
- [ ] Run the impeccable audit, the `web-design-guidelines` review, and Lighthouse (mobile) on home, download, releases, docs and faq (preview URL). Fix all findings.
- [ ] Run the impeccable detector, finish reviewer and documenter (`DESIGN.md`).
- [ ] README: setup, scripts, how release notes refresh (ISR one hour, snapshot fallback, and refreshing the snapshot), and every `site.config.ts` placeholder.
- [ ] `npx vercel deploy --prod`. Verify the production URL and download link with `curl -sI`.
- [ ] Commit `docs: readme with setup and placeholders`, and `chore: quality pass fixes` as needed.
