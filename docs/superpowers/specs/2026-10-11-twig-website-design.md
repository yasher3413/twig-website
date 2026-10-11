# twig website: design spec

**Date:** 2026-10-11 · **Status:** awaiting owner approval · **Milestone:** 1 (research and spec)
**Inputs:** `/Users/yash/twig-browser/WEBSITE_BRIEF.md` (the brief, which governs wherever this spec is silent), `PRODUCT.md` (product truth and owner decisions), the app source (read-only).

---

## 1. Intent

**Outcome.** A site that gets Apple Silicon Mac users who keep a lot of tabs to download twig, teaches them to use it, and serves as the project's home.

**Primary visitor.** A developer, researcher, student or writer who arrives from GitHub, a forum or a friend's link. They're sceptical of new browsers and get persuaded by seeing the mechanism work.

**Success.**
1. Within one viewport the visitor knows what twig is, why it's different and where Download is.
2. They click *Download for Mac*.
3. They get through the Gatekeeper first launch without confusion.

Returning users find docs, shortcuts and release notes in two clicks or fewer.

**Non-negotiables (from the brief).**
- Every claim is true of v0.1.3.
- No invented numbers, testimonials or logos.
- Demos are live code, not video.
- Branch motif throughout.
- WCAG 2.2 AA.
- Lighthouse ≥ 95.
- Commits carry no AI attribution.

---

## 2. Reference teardown: why they work, and what twig takes

Studied 2026-10-11 with full-page captures at 1440 px.

| | What's there | Why it works | twig takes | twig refuses |
|---|---|---|---|---|
| **arc.net** | Cream ground (`#fffcec`) with a wavy torn edge into one saturated blue field. Marlin Soft at a tight −1.6 px tracking. The product window is the hero of *every* chapter, each in a different colourway. A hand-drawn signature mark, and press quotes in a marquee. | Colour is personality: each chapter's window wears a different theme, so the product's customisation *is* the art direction. Confidence comes from scale and one bold colour, not ornament. | **Colour as chapter identity**, using twig's six real accents the way Arc uses themes. The product as the protagonist of every chapter. | Press-quote marquees (we have none, and won't fake any). A single loud brand blue. |
| **perplexity.ai/comet** | Warm cream (`#fbfaf4`), a light high-contrast editorial serif, textured "planet" spheres floating at the edges, cinematic dark rounded panels with starfield video, and one Download pill repeated. | Restraint: huge negative space, one CTA, and a premium dark interlude that resets attention halfway down. | **One focused CTA** repeated at the start and end. **A dark interlude** to pace the scroll (our forest-night chapters). Generous negative space. | Decorative spheres and video. And the overlap: Comet is already "cream plus light serif", so twig must not look like it. |
| **zen-browser.app** | Cream (`#f2f0e3`), Junicode serif at 128 px with one coloured italic word, Bricolage Grotesque body, product shots over classical paintings, a feature list with an active-row selector, sponsors, values, and a dark footer. | Honesty and community: a clear download path, open source up front, plain feature framing, and a calm tone. | **Honest framing and a community home**: open source, support and report-a-bug given real weight. The selectable feature list pattern for docs-like lists. | Painting backdrops, and the italic-colour-word headline trick. |

**The finding that drives this spec:** all three have converged on *warm cream, a serif display and a product window*. twig's tokens sit in the same neighbourhood, so palette and type alone can't differentiate it. twig differentiates through things none of them do:
1. **Every demo is the real interaction, live**, never a video or a screenshot.
2. **A branch that actually grows and sleeps as you read.**
3. **Committed colour fields** from the app's six accents, rather than cream throughout.
4. **A grammar of time**, because twig's features are about *when*.

---

## 3. Art direction: The Gardener's Almanac

Chosen by the owner on 2026-10-11 from impeccable's direction round (seed `e2ad5003`, the assigned direction). The brief's world, "a living plant on warm paper", is kept in full. The Almanac is how it's rendered.

### 3.1 Thesis
twig is a browser about time. A tab sleeps **after 10 minutes**. A snoozed tab comes back **on Tuesday at 9:00**. A sweep is suggested **after 3 weeks**. Checkpoints sit **on a timeline**. Recall searches **by date**. Changes compare against **your last visit**. So the site is an almanac: a crisp, modern printed record of what sleeps, what wakes and what comes back, and when.

**It refuses:** the category default (a centred serif headline, Download, then a big product window on cream with feature cards beneath). It also refuses faux-vintage: no aged paper, no distressing, no ornamental borders, no "Est. 2026".

### 3.2 Own world (recognisable with every word removed)
- **Flat lithographic colour fields that own whole regions.** Each home chapter gets one of the app's real accents as a full-bleed field, like a seed packet's colour band. Paper (`#f6f4ee`) is the ground between fields, not the dominant surface.
- **Printed rules and tables.** Hairline calendar rules, time rulers with tick marks, almanac-style tables (tabular figures, ruled rows) for shortcuts, specs, versions and requirements.
- **The branch**, drawn in moss ink, running the length of the page like a growth chart in the margin.
- **twig's real UI** rendered at true scale inside the fields, with the app's own shadows (`--shadow-pop`) giving the windows physical depth on the flat colour.
- **Forest night** (`#101208` and a deep green ink) for two cinematic chapters, lit by one light source.

### 3.3 Colour system
**Strategy: Full palette (named roles), committed at page scale.** The six accents are the app's real swatches, so using them is product truth, not decoration.

| Role | Light | Dark | Use |
|---|---|---|---|
| paper | `#f6f4ee` | `#17190f` | page ground |
| strip | `#e8e5d8` | `#101208` | recessed bands, the app's tab strip |
| ink | `#23261f` | `#e9e7dd` | text |
| ink-muted | `#62665a` (5.35:1) | `#9a9c8d` (6.35:1) | secondary text |
| moss | `#4b6b3a` | `#8fbb6e` | brand, primary CTA, branch |
| forest night | `#101208` | `#0b0d05` | cinematic chapters, both themes |

**Chapter fields.** Contrast was measured, and every pairing is ≥ 4.5:1:

| Chapter | Field (light) | Text on field (light) | Ratio |
|---|---|---|---|
| Sleeping tabs | Moss `#4b6b3a` | paper | 5.51 |
| Recall | Ocean `#2b6e7a` | paper | 5.28 |
| Changes | Clay, deepened to `#8f4a26` (the swatch `#a85c32` is only 4.50) | paper | 6.01 |
| Snooze and sweep | Honey light `#e0b24d` (the swatch `#a67c1d` fails with paper at 3.46) | ink | 7.78 |
| Checkpoints and packages | Plum `#6b4a82` | paper | 6.52 |
| Keyboard | Slate `#52564c` | paper | 6.83 |

- **Dark theme:** fields become *dyed night*, meaning the accent mixed about 20% into `#17190f`. The bright dark-mode swatch (e.g. `#8fbb6e`) carries display type, rules and the branch, with ≥ 7:1 on forest. Final mixes get verified by a contrast script during build (milestone 2) and recorded in `DESIGN.md`.
- **Extensions:**
  - **sun-dapple** is a soft warm highlight (`#fff6d6` at low opacity), used only inside light fields as leaf light behind product windows;
  - **ink-deep** `#1b1f14` for forest-night text panels.
- No purple-blue gradients, no glass, no neon.

### 3.4 Typography
- **Display: Young Serif** (one weight, SIL OFL), self-hosted from the app's `woff2`. Used for the wordmark, page and chapter headlines and big numerals.
  - It has no optical sizes, so tracking is set per step: −0.035em at ≥ 96 px, −0.025em at 48–95 px, −0.01em below.
  - Leading 0.95–1.0 at display sizes.
  - Hanging punctuation via `hanging-punctuation: first` where supported, with a negative text-indent fallback for opening quotes.
  - Subset: Latin plus punctuation. Glyph coverage is checked for `’ “ ” — · …`.
- **Text and UI: Public Sans** (variable, SIL OFL), self-hosted, subset, `font-display: swap`.
  - *Why:* it's derived from Libre Franklin, so it carries Franklin Gothic's lineage, the workhorse grotesque of American seed catalogues and almanacs. Unlike Google's Libre Franklin (checked: proportional digits, no `tnum`), it has real tabular, old-style and lining figures for time rulers, shortcut tables and versions.
  - It has no true small caps, and the spec doesn't fake them.
  - It isn't Inter, and it isn't on impeccable's overused list.
  - Keycap glyphs (⌘ ⇧ ⌥) fall back to the system font, as in the app.
- **App recreations use the app's own stack** (`-apple-system, Inter, …`, 13 px), so demos stay indistinguishable from twig.
- **Scale:** fluid with `clamp()`, ratio ≈ 1.333 on mobile and ≈ 1.5 on desktop. Hero display tops out at about 168 px at 1920 px and is 52 px at 375 px.
- **Almanac entry heads** (the "when" line on each chapter) are set in Public Sans medium, sentence case, with tabular figures, above a printed hairline rule and beside a small leaf mark. This deliberately avoids both the overused tracked-mono kicker and faked small caps.

### 3.5 The symbol set (one vocabulary, used identically everywhere)
*Raised from the declined Toyism challenger.*

| Symbol | Means | Drawn as |
|---|---|---|
| Leaf, vivid | an awake tab | moss leaf, as in the icon's geometry |
| Leaf, pale and curled | a sleeping tab | 45% opacity, desaturated, tip curled via path morph |
| Bud | a checkpoint | a circle with a highlight, as in the icon's bud |
| New branch | a fork | a stem splitting off the main path |
| Moss dot | a returned or snoozed tab | the app's 5 px dot |

The symbols come from `design/app-icon.svg` and the Welcome `Branch` component. They appear in the margin branch, the demos, docs callouts, the 404 and the OG images, and nowhere else with any other meaning.

### 3.6 Texture and light
- **Grain:** a single static, tiled, about 4 KB noise PNG (or WebP) at 3–5% opacity, multiplied onto paper and fields. No WebGL shader: 21st's Paper Texture (#17693) was considered and rejected because it costs JS and GPU on every page for an effect a static tile gives.
- **Leaf light:** a soft, blurred, leaf-shaped light-and-shadow layer behind hero and chapter windows (a static SVG mask with gentle transform drift, off under reduced motion).
- **Forest night has one light** *(raised from the declined Indoor Weather Sun)*: a single moon-coloured pool behind the content, with no scattered glows.

### 3.7 Raised disciplines (carried from the challengers that lost)
1. **In-place state** *(Split-flap)*. State changes happen on a fixed grid. A tab sleeping, a snooze date resolving, the version badge updating: each changes its own cell and never shifts layout. CLS stays under 0.05 by construction.
2. **One symbol set** *(Toyism)*. See §3.5.
3. **Provenance on every claim** *(Treasure Map)*. Each feature chapter ends with a small "Read how it works →" source mark linking to the docs page, which in turn links to the app's README or docs. Any benchmark links to its method.
4. **Designed blanks** *(Azulejo)*. A missing owner value (Discord, socials, Sponsors URL, email) renders as a deliberately unprinted packet slot ("Discord opens soon"), never as a broken link or hidden hole.
5. **One light** *(Indoor Weather Sun)*. See §3.6.

---

## 4. Motion system

**Easing tokens** (extending the app's `--ease`):

| Token | Curve | Use |
|---|---|---|
| `--ease-grow` | `cubic-bezier(0.22, 1, 0.36, 1)` | default, the app's |
| `--ease-unfurl` | `cubic-bezier(0.16, 1, 0.3, 1)` | leaves opening, panels sliding in |
| `--ease-settle` | `cubic-bezier(0.33, 0, 0.15, 1)` | things falling asleep, slower to rest |
| `--ease-drift` | `cubic-bezier(0.45, 0, 0.55, 1)` | ambient drift (leaf light) |

**Durations:** 120 ms for micro, 240 ms for UI, 480 ms for reveals, 900–1400 ms for growth. No bounce or elastic curves, and no width or border transitions. Only transform, opacity and SVG `stroke-dashoffset` animate.

### Signature interaction: the branch that sleeps as you read
- One SVG stem runs down the left margin of the home page (desktop ≥ 1024 px), drawn by scroll progress (Motion `useScroll` mapped to `pathLength`). It's not a CSS hack.
- At each chapter it sprouts a leaf as the chapter enters: the leaf unfurls via a path morph from a closed bud shape.
- **Leaves you've scrolled past fall asleep:** they settle to the pale, curled state after you've been past them a while. Scroll back and they wake. The motif performs twig's core mechanism without a word of copy.
- At *Checkpoints* the stem grows a bud. Forking in that demo sprouts a real side branch off the margin stem.
- **Tablet and phone:** the branch becomes a slim stem along the left edge, with leaves at chapter heads only.
- **Reduced motion:** the branch is fully drawn, all leaves awake, nothing moves.
- **Built from:** the Motion path-drawing pattern (21st `motiondotdev/motion-path-drawing` #24528) as the starting point, rewritten for scroll and morph.

### Primitives
- `<Reveal>`: opacity plus a 12–16 px rise on entering view. It plays once, and content is visible by default with no JS.
- `<SetLine>`: line-by-line vertical cut reveal for display headlines (adapted from 21st `danielpetho/vertical-cut-reveal` #884), split by line, never by character, and screen-reader text kept whole.
- `<Magnetic>`: a gentle pull of 4–6 px max on the primary Download button only (adapted from 21st `ibelick/magnetic` #649).
- Download hover: the button's leaf glyph unfurls.
- `<InPlace>`: the fixed-cell swap from §3.7.1, used for numbers, versions and dates.

### Rules
- Every animation explains a mechanism or delights with meaning.
- Demos animate only while in view (`IntersectionObserver`) and pause when the tab is hidden.
- Nothing traps scroll: demos never hijack the wheel, and there are no scroll-jacked pinned sections longer than one viewport.
- `prefers-reduced-motion` swaps every animation for a composed static state: the end frame, chosen to still tell the story.

---

## 5. Sitemap and page designs

Global chrome:
- **Header:** wordmark at left; Download (version chip), Docs, Releases, FAQ, ⌘K and the theme toggle. On mobile it collapses to the wordmark, a ⌘K/search icon and a menu.
- **Footer:** an almanac-style ruled table holding every link the brief requires, the current version, conditional socials and Discord, and "Made on a Mac".

### 5.1 Home (`/`): chapters
The brief's 14 chapters are refined to **11 plus the hero and the close**:
- *The problem* becomes the opening beat of *Sleeping tabs*, so the problem and its answer share one demo.
- *Research packages* sits beside *Checkpoints*, since packages are made from spaces and checkpoints.

Each chapter has an **almanac entry head** (the "when"), a short Young Serif line, one or two sentences of body, the live demo and a provenance mark.

| # | Field | Entry head (when) | Line (draft, polished later) | Live demo |
|---|---|---|---|---|
| Hero | paper + moss | *Today* | **Every other browser forgets. twig remembers.** | **The living twig window.** A faithful twig window (light or dark per visitor) opens tabs on its own. After a few seconds idle, older tabs settle: favicons grey, titles dim, the 5 px dot appears, and a pale leaf settles on the margin branch. The app's own ledger readout (*in use · awake · asleep · not spent*) changes in place. A printed 0 / 5 / 10-minute time ruler sits under the strip. Values are labelled *demo values*. The branch starts growing from the window. **Download for Mac** (v0.1.3 · Apple Silicon) plus *See what's new*. |
| 1 | Moss | *After 10 minutes* | The browser you can close tabs in. Or keep them all. | **Sixty tabs settle.** Prologue: a crammed 60-tab strip settles into calm as most of it sleeps. Then the interactive strip: click a tab to wake it, use the working Frugal 3 / Balanced 5 / Roomy 10 picker (the cap is enforced live), and a "busy" tab (playing audio) never sleeps. The ledger updates in place. |
| 2 | Ocean | *Whenever you remember a phrase* | Find a page by the words inside it. | **Real mini Recall** over about 12 invented, plausible reading copies. Type and results filter live with highlighted passages, a space filter and a date range. It reuses the app's Recall layout. Client-side search, a real (small) inverted index, no network. |
| 3 | Clay | *The next time you visit* | See what changed since you last read it. | A page shows the **Changed** chip. Clicking it slides in the 380 px panel with added, removed and edited paragraphs in the app's Changes styling. A note says timestamps and counters are ignored. |
| 4 | Honey | *Tuesday, 9:00 AM* | Put a tab away until it matters. | **Snooze.** Open the snooze picker (6 presets on keys 1–6, plus *Pick a date and time*, which resolves to Tuesday 9:00 AM). The tab drifts onto a small almanac calendar and comes back asleep at the end of its space with the moss dot. **Sweep:** the "4 untouched tabs" pill opens the review panel (Archive · Snooze to next week · Not now). |
| 5 | Plum | *At every turning point* | Save where you are. Fork where you might go. | **The branching timeline.** Save a checkpoint (⇧⌘S or click) and a bud grows. Fork it and a new branch sprouts, with a new space appearing. Resume restores the tab order. The margin branch forks with it. |
| 6 | Plum, deeper | *When you're ready to share* | Bundle a space into one file. | **Research package assembly.** Sources, notes and excerpts fly into a `.twig` file. Toggle export as `.twig`, Markdown or HTML, and see the real file shape (format v1 from `docs/research-packages.md`). |
| 7 | paper | *Any time, ⌘K* | One palette for everything. | **The site's real ⌘K palette**, the same look and grouping as the app (Tabs · Bookmarks · History · In pages you've read · Commands). It searches this site and jumps to sections and docs. Opens with ⌘K or Ctrl+K anywhere on the site. |
| 8 | Slate | *Without lifting your hands* | Every shortcut, rebindable. | **Keycap grid** of the real default shortcuts (README table). Keys press down as the visitor presses them (adapted from 21st `kbd-key` #28886), and the matching action is named. Shows "Every one can be rebound in Settings → Shortcuts." On touch devices it becomes a tappable grid. |
| 9 | **Forest night** | *At night, on your Mac only* | Everything stays on your Mac. | Specific, honest list: history, the Recall index, checkpoints, packages and cookies live in local SQLite and WebKit storage. No account, no sync server, no telemetry. Private windows record nothing. Bug reports go out only if you send one (and to where). A quiet diagram: everything inside a drawn Mac outline, nothing crossing it. |
| 10 | **Forest night** | *Under the bark* | Built on your Mac's own engine. | Plain explanation: Tauri 2 plus the system WebKit (Safari's engine), not a bundled Chromium. Each sleeping tab gives its webview back. A simple layered diagram compares a bundled engine with the system engine. One true, sourced number: **the whole download is 3.8 MB** (read live from the release asset, with a provenance link to the release), because there's no engine inside it. **No comparative benchmark numbers at launch** (decision D7). |
| 11 | paper | *Season after season* | Open source, MIT, made in the open. | Live from GitHub: latest version and release date, a link to the source, *Star on GitHub* (the count shows only when it's ≥ 50; D8), Report a bug, and Discord as a designed blank until it's set. A *Support twig* link to /donate. |
| Close | Moss | *Now* | Plant it. | Download again, system requirements in an almanac table (macOS on Apple Silicon M1 or newer, and the download size **read live from the release asset**: 3.8 MB for v0.1.3), and the **first-launch note shown kindly**: a two-step illustrated Open Anyway plus the Terminal line with a copy button. |

**Hero, exact composition at 1440 px:**
- **Left column (5/12):** almanac entry head; headline in Young Serif at about 128 px over 3 lines; one-sentence subhead; Download button (moss, magnetic, leaf glyph) with the "v0.1.3 · Apple Silicon" chip; secondary link.
- **Right (7/12):** the living window, about 760 × 480, at a −2° to 0° settle angle, with leaf light behind and `--shadow-pop`. The moss field runs full-bleed behind the right two-thirds, with paper at left.
- **Margin:** the branch starts at the window's top-left and grows downward.
- **At 375 px:** head, headline (52 px), CTA, then the window scaled to fit (tabs reduced to 4 and still animating).

**Mobile demos** are simplified but alive. Sleeping tabs shows 4 tabs. Recall keeps live search. The Changes panel becomes a bottom sheet. The keycap grid becomes tappable. No demo needs hover.

### 5.2 Download (`/download`)
- **Platform detection.** `navigator.userAgentData.getHighEntropyValues(['architecture','platform'])` where available, with a WebGL-renderer heuristic ("Apple M") as a hint only. Safari can't reliably tell Apple Silicon from Intel, so when it's unknown the page says so: big Download plus "Requires a Mac with Apple silicon (M1 or newer). Check: Apple menu → About This Mac → Chip."
  - **Intel detected:** an honest "Not yet on Intel Macs", with Watch on GitHub and Discord (if set).
  - **Windows or Linux:** "twig is Mac-only for now", plus the same follow options. No waitlist form.
- **First launch:** three illustrated steps drawn as SVG recreations of the macOS dialogs, labelled as illustrations: open and click *Done*, then System Settings → Privacy & Security → *Open Anyway*, then confirm. Plus the Terminal alternative with a copy button.
- **Requirements table:** latest version, release date and DMG size (all from the API), plus links to all releases and the source.
- **Tip:** set twig as default browser in Settings → Browser.

### 5.3 Release notes (`/releases`)
- Data from the GitHub Releases API at build time, revalidated every hour (ISR). If a fetch fails at build, the build uses a committed snapshot of v0.1.0–v0.1.3 so it never breaks.
- The newest release is featured as a large almanac entry (Young Serif version numeral and date). Older ones get one ruled entry each, with an anchor (`#v0-1-3`), date, markdown-rendered body (remark-gfm, styled) and a GitHub link.
- **Feed:** Atom at `/releases/feed.xml`.

### 5.4 Docs (`/docs`), Read mode
- **Fumadocs**, fully re-skinned: paper ground, Public Sans body at 17 px with 1.65 line height and a 68ch measure, Young Serif page titles, moss links, almanac-ruled tables, and copy buttons.
- **Search:** Fumadocs' built-in local search (Orama, static index). The site's ⌘K also searches docs.
- **The 15 pages from brief §3.4:**
  1. Getting started
  2. Tabs and sleeping tabs
  3. Spaces and split view
  4. Checkpoints
  5. Recall (adapted from `docs/recall.md`)
  6. Changes since you last read
  7. Snooze and sweep (from `docs/snooze.md`)
  8. Research packages, including the file format (from `docs/research-packages.md`)
  9. Command palette
  10. Keyboard shortcuts (full table) and rebinding
  11. Reader view and link hints
  12. Privacy and your data
  13. Reporting bugs
  14. Troubleshooting
  15. Building from source
- Callouts use the symbol set.

### 5.5 FAQ (`/faq`)
An accessible accordion (`<details>`-based, progressively enhanced) holding the brief's 10 questions, answered honestly. The Windows/Linux answer: "There are no plans we can promise. twig depends on macOS's WebKit."

### 5.6 About (`/about`)
- The story: tab hoarding, and why "remembers".
- Principles: local-first, honest, keyboard-first, light.
- **The maker:** a bio written in a natural voice from verifiable facts only: Yash Gandhi (`yasher3413`) built twig, it shipped v0.1.0 on 2026-09-24, and the dated sequence of features can be read from the repo. A drawn leaf monogram stands in for a photo. A visible "Draft, pending Yash's review" marker is shown until the owner signs off (`author.bioApproved: false`).
- Built-with credits.

### 5.7 Donate (`/donate`)
- What support funds, stated plainly and truthfully: the $99/year Apple Developer Program for notarization, which removes the Open Anyway step, plus time.
- Tier cards for one-off amounts (e.g. $3, $8, $20, custom) styled as seed packets, so they look complete.
- `donate.provider: "github-sponsors"`, `url: null`. Until a URL is set, every button reads **"Donations open soon"**, with *Star the repo* as the alternative. No checkout UI.

### 5.8 Community (`/community`)
GitHub, Report a Bug (in-app form or GitHub issues), contributing (`CONTRIBUTING.md`), and Discord and socials as designed blanks until set.

### 5.9 Legal (`/legal/privacy`, `/legal/terms`, `/legal/license`, `/legal/acknowledgements`)
- Written to brief §3.9, with a visible "Draft pending the owner's review. Not legal advice." banner.
- The privacy page discloses Vercel Web Analytics (cookieless) on the website, no app telemetry, and the bug-report relay's behaviour (public issues, public Vercel Blob screenshots, transient IP use for rate limiting).
- Contact: GitHub issues until `contactEmail` is set.

### 5.10 Brand (`/brand`), 404 and SEO
- **Brand:**
  - icon as SVG plus PNG at 1024/512/256;
  - wordmark SVG;
  - colour tokens with copy buttons;
  - **real screenshots** from the app's WebKit capture harness (run from scripts in *this* repo);
  - short and long descriptions.
- **404:** a single lost leaf drifting across paper. "This page fell off the branch." Links home, plus "Press ⌘K to find it."
- **SEO:**
  - per-page metadata, `sitemap.xml`, `robots.txt`, canonical URLs (from `domain` or the Vercel URL);
  - `SoftwareApplication` JSON-LD (name, OS macOS, `applicationCategory` BrowserApplication, price 0, version from the API, `downloadUrl`; no ratings);
  - `next/og` images per page in the Almanac style (colour field, Young Serif title, branch);
  - a favicon set rendered from `design/app-icon.svg`.

---

## 6. Architecture

### 6.1 Approaches considered (for the demos, the hardest part)

| | Approach | Trade-off | Verdict |
|---|---|---|---|
| **A** | **Re-implement twig's UI in the site** as small presentational React components, porting the dimensions, radii and colours from `src/components/*.css` and `src/App.css` into scoped CSS modules, with demo state machines driving them. | Some duplication, but full control, small bundles, SSR-able, no Tauri coupling. Fidelity is checked against the real screenshots. | **Recommended** |
| B | Import the app's real components from `/Users/yash/twig-browser/src`. | Perfect fidelity on day one, but they depend on Zustand stores, Tauri IPC and native-webview assumptions. That's a heavy bundle and couples two repos. | Rejected |
| C | Video or screen recordings. | Forbidden by the brief, and not interactive. | Rejected |

### 6.2 Stack (pinned by the brief)
- Next.js (App Router) and TypeScript.
- Tailwind CSS v4 (`@theme` tokens mirroring the app's CSS variables).
- `motion/react`.
- Fumadocs (MDX).
- `cmdk` for the palette's accessible combobox behaviour.
- Vercel (Node runtime) with `@vercel/analytics`.

### 6.3 Structure (units with one job each)
```
app/
  (site)/page.tsx            home: composes chapters
  (site)/download, releases, faq, about, donate, community, brand, legal/*
  docs/[[...slug]]           Fumadocs
  releases/feed.xml/route.ts Atom feed
  opengraph-image.tsx, sitemap.ts, robots.ts, not-found.tsx
components/
  chrome/      Header, Footer, ThemeToggle, CommandK (site palette)
  motion/      Branch, Reveal, SetLine, Magnetic, InPlace, tokens.ts
  twig-ui/     faithful app recreations: Window, TabStrip, Tab, Omnibox,
               ChangedChip, ChangesPanel, RecallPanel, SnoozePicker,
               SweepPanel, SettingsLedger, Palette, Keycap (presentational only)
  demos/       one folder per chapter: state machine + composition of twig-ui,
               lazy-loaded with next/dynamic and mounted when near view
  almanac/     EntryHead, Field, RuledTable, TimeRuler, DesignedBlank
content/
  docs/*.mdx   adapted docs
  demo-data/   invented sample pages, tabs, recall copies (typed JSON)
lib/
  github.ts    releases/repo fetch, ISR revalidate 3600, snapshot fallback
  platform.ts  OS and chip detection (pure, unit-tested)
  recall-search.ts  tiny inverted index for the Recall demo (pure, unit-tested)
site.config.ts every owner-supplied value (§7)
scripts/
  capture-app.mjs  runs the app's WebKit harness and copies PNGs into public/brand
  screenshots.mjs  Playwright matrix: 375/768/1280/1920 × light/dark × motion on/off
  linkcheck.mjs, contrast.mjs
```
`twig-ui` components are pure (props in, markup out). `demos` own the state. That way the same `Tab` renders in the hero, chapter 1, the OG image and the docs.

### 6.4 Data flow and failure handling
- `lib/github.ts` fetches releases and repo info with `next: { revalidate: 3600 }`.
- On failure it uses `content/releases.snapshot.json` (committed), so pages always render.
- The star count is hidden when unavailable or under the threshold.
- The download URL is always the stable `releases/latest/download/twig-macos-arm64.dmg`; nothing about the link depends on the API.
- Platform detection is client-only and progressive: SSR shows the universal Mac message, then refines it after hydration without layout shift (fixed-height slot).

### 6.5 Performance plan (budgets from brief §6)
- Hero LCP is the headline text, so it isn't blocked by fonts (`swap`) or JS.
- The living window is SSR-rendered in its first frame, and the animation hydrates later.
- Every chapter demo is code-split and mounts within 1 viewport of view.
- Initial home-page JS target: ≤ 120 KB gzip.
- Fonts subset to Latin. Young Serif is 19 KB and Public Sans variable 26 KB subset (measured).
- Grain is a single tile.
- Lighthouse runs on preview deploys at milestone 9 and on every page type.

### 6.6 Testing
- **Vitest** for `platform.ts`, `recall-search.ts`, release parsing, the feed and `site.config` rendering rules (blanks).
- **Playwright:**
  - the screenshot matrix;
  - a keyboard-only pass (Tab order, ⌘K combobox ARIA, demos operable);
  - reduced-motion snapshots;
  - console-error assertion on every route.
- **Lighthouse CI** script.
- **Link checker** over the built site.
- **Contrast script** over the token pairs.
- impeccable *critique* and *polish* after each page, a final *audit*, plus a `web-design-guidelines` review.

---

## 7. `site.config.ts` (every owner-supplied value; listed in the README)
```ts
domain: null,                       // Vercel URL until set
contactEmail: null,                 // legal pages fall back to GitHub issues
discordUrl: null,
socials: { x: null, bluesky: null, youtube: null, instagram: null, tiktok: null, linkedin: null,
           github: "https://github.com/yasher3413/twig" },
donate: { provider: "github-sponsors", url: null },
author: { name: "Yash Gandhi", github: "yasher3413", bio: <drafted>, bioApproved: false, photo: null },
analytics: "vercel",
starThreshold: 50,
```
A null value renders a designed blank (§3.7.4), never a broken link.

---

## 8. Copy voice
- Calm, warm, precise, a little poetic.
- Short sentences, "you", and features named by what they do. No superlatives or hype words (the brief's banned list).
- Limits are stated as plainly as features.
- The almanac grammar shows up only in the *when* entry heads. It's never cute ("planted in 2026", "harvest your tabs") and never extends to puns.
- The chapter lines in §5.1 are drafts. Each page's copy goes through impeccable *clarify* and *polish*.

---

## 9. Decisions log

| # | Decision | Why |
|---|---|---|
| D1 | Art direction: The Gardener's Almanac | Chosen by the owner, 2026-10-11 |
| D2 | Domain: Vercel URL; donations: GitHub Sponsors (soon state); analytics: Vercel Web Analytics; email: none yet; photo: none; bio: drafted by Claude from facts, marked draft; socials and Discord: pending | Owner answers to §9 |
| D3 | Body face: Public Sans (replaced Libre Franklin on 2026-10-11 during build) | Franklin lineage through Libre Franklin. Real `tnum`. Inspecting the Google Libre Franklin file showed no tabular figures or small caps. |
| D4 | No WebGL. Static grain and SVG only. | Performance budget. The effect doesn't need a GPU. |
| D5 | Home: 11 chapters plus hero and close (problem merged into sleeping tabs; packages beside checkpoints) | Problem and answer share one demo, and features sit in their real relationship. |
| D6 | Demos are re-implemented, not imported from the app (approach A) | Bundle size, SSR, no Tauri coupling |
| D7 | No memory benchmark at launch | An honest benchmark needs a controlled, documented method. It can be added later as its own docs page. Until then the mechanism is explained without numbers. |
| D8 | GitHub star count shown only at ≥ 50 | Today it's 0. A tiny count reads as negative social proof, and the brief bans fake proof. The button always shows; the number appears once it's meaningful. |
| D9 | Clay field uses `#8f4a26`; Honey field uses `#e0b24d` with ink text | AA contrast (measured) |
| D10 | Snooze demo reaches "Tuesday 9:00 AM" via *Pick a date and time* | Not one of the 6 presets. Stays true to the app. |
| D11 | Commits carry no AI attribution | Owner's §0 rule overrides tool defaults |
| D12 | DMG size and release date always read from the API asset, never hard-coded. The size (3.8 MB for v0.1.3) is shown as a fact, without comparing it to other browsers' downloads. | Honesty, and it stays current. A comparison would need measured, sourced figures. |
| D13 | The bookmark import list includes Chromium (Chrome, Arc, Brave, Edge, Vivaldi, Chromium) | Verified in `src-tauri/src/import.rs`. The app README omits Chromium; the code is the source of truth. |

## 10. Out of scope
- Any change to the twig app repo.
- A backend: forms, waitlists, accounts.
- Translations: English only. The structure allows i18n later.
- A memory benchmark (D7).

## 11. What happens after approval
1. `superpowers:writing-plans` turns this spec into an implementation plan for milestones 2–10.
2. Before each page: impeccable *shape*, and the direction contract written to the surface brief.
3. After each page: impeccable *critique* and *polish*, plus the screenshot matrix.
4. Commit and push at every milestone, and give you a preview URL from milestone 2 onward.
