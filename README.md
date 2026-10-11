# twig website

The public website for [twig](https://github.com/yasher3413/twig), the browser that remembers. It gets people to download twig, teaches them to use it, and is the project's home: docs, release notes, community, support and legal pages.

- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Fumadocs for the docs, cmdk for the ⌘K palette, deployed on Vercel.
- **Design:** "The Gardener's Almanac". The spec is in [`docs/superpowers/specs/2026-10-11-twig-website-design.md`](docs/superpowers/specs/2026-10-11-twig-website-design.md), and the system is recorded in [`DESIGN.md`](DESIGN.md).
- **Content rules:** every claim is true of the shipping app. No invented numbers, testimonials or logos.

## Run it

```sh
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Node 20+ works; the repo was built with Node 25.

## Checks

| Command | What it does |
| --- | --- |
| `npm test` | Unit tests (Vitest): links, release parsing and fallback, platform detection, Recall demo search, ⌘K hotkey and index, Atom feed, markdown sanitising |
| `npm run typecheck` | TypeScript |
| `npm run check:contrast` | Every text/background token pair must reach WCAG AA (4.5:1) |
| `npm run check:links -- http://localhost:3000` | Crawls the running site and checks every internal and external link |
| `npm run check:smoke -- http://localhost:3000` | Loads every route at 375 and 1280, with motion on and off: no console errors, no horizontal overflow, headings visible under reduced motion, keyboard reach to Download, ⌘K opens |
| `npm run shots` | The screenshot matrix: routes × 375/768/1280/1920 × light/dark, into `.impeccable/review/matrix/` |

The link, smoke and screenshot scripts need a running server (`npm run build && npm start`) and Playwright's Chromium (`npx playwright install chromium`).

## Release notes and the version number

The version, release dates, DMG size and release notes come from the GitHub Releases API (`api.github.com/repos/yasher3413/twig/releases`):

- Pages that use them revalidate **every hour** (ISR), so a new release appears within an hour without a redeploy. Redeploying shows it immediately.
- If the API fails **during a build** (or in local development), the site uses [`content/releases.snapshot.json`](content/releases.snapshot.json), so builds never break. If it fails **at runtime** in production, the hourly revalidation is skipped and the last good page keeps being served, so the version never rolls back. Refresh the snapshot after a release:

  ```sh
  curl -s https://api.github.com/repos/yasher3413/twig/releases > content/releases.snapshot.json
  ```
- Optional but recommended: set `GITHUB_TOKEN` (a token with no scopes is enough) as a Vercel environment variable for Production. Vercel's IP addresses are shared, so unauthenticated requests can hit GitHub's rate limit; a token raises it.
- The download link never needs updating: `releases/latest/download/twig-macos-arm64.dmg` always serves the newest build, as long as each release attaches an asset with exactly that name.
- The Atom feed is at `/releases/feed.xml`.

## Owner-supplied values: `site.config.ts`

Everything not yet decided lives in [`site.config.ts`](site.config.ts). A `null` value never renders as a link; the site shows a designed "coming soon" slot instead.

| Field | Now | What happens when you set it |
| --- | --- | --- |
| `domain` | `null` | Canonical URLs, the sitemap, robots and OG images use it. Until then, the Vercel production URL is used. Add the domain in Vercel too. |
| `contactEmail` | `null` | Shown on the privacy policy. Until then, contact points to GitHub issues. |
| `discordUrl` | `null` | Discord links appear in the footer, home, community, download and 404 pages. Until then: "Discord opens soon". |
| `socials.x` | `x.com/yash_gandhi34` | Footer and community page |
| `socials.instagram` | `instagram.com/yash_gandhi34` | Footer and community page |
| `socials.linkedin` | `linkedin.com/in/yashgandhi34` | Footer and community page |
| `socials.bluesky`, `youtube`, `tiktok` | `null` | Hidden until set |
| `donate.provider` | `"github-sponsors"` | Named on the donate page |
| `donate.url` | `null` | Every donate button becomes a real link. Until then: "Donations open soon" plus "Star the repo". |
| `author.bioApproved` | `false` | The About page shows a draft note on the maker section until you set this to `true`. |
| `author.photo` | `null` | No photo is used; the About page shows the twig mark. |
| `analytics` | `"vercel"` | Vercel Web Analytics (cookieless). It only loads on Vercel deployments. |
| `starThreshold` | `50` | The GitHub star count only shows once it reaches this. |

## Things to review

- **About page**: the maker section is written from the project's public history. Edit it, then set `author.bioApproved: true`.
- **Legal pages**: `/legal/privacy` and `/legal/terms` describe how twig works today and are marked as drafts. Have them reviewed, then remove the `<Draft>` note (pass `draft={false}` to `LegalPage`).

## Measured performance

Lighthouse 12, mobile preset, **devtools throttling** (slow 4G, 4× CPU), against `next start` on a MacBook with Apple silicon, 11 October 2026:

| Page | Performance | Accessibility | Best practices | SEO | LCP |
| --- | --- | --- | --- | --- | --- |
| Home | 98 | 100 | 100 | 100 | 1.4 s |
| Download | 99 | 100 | 100 | 100 | 1.1 s |
| Release notes | 99 | 100 | 100 | 100 | 1.1 s |
| Docs (Recall) | 97 | 100 | 100 | 100 | 1.2 s |
| FAQ | 99 | 100 | 100 | 100 | 0.9 s |
| About | 100 | 100 | 100 | 100 | 1.0 s |
| Brand | 100 | 100 | 100 | 100 | 1.4 s |

Lighthouse's default *simulated* throttling estimates a slower home LCP (about 2.6 s) from the same run; the devtools numbers above are measured, not modelled.

## Structure

```
app/(site)/        marketing pages, release notes and the feed
app/docs/          Fumadocs (docs-only styles in app/docs/docs.css)
components/chapters/   home page chapters
components/demos/      live demos (each mounts only when near the viewport)
components/twig-ui/    twig's real UI, ported from the app's CSS
components/motion/     the branch, reveals, magnetic button
content/docs/      the docs, in MDX
content/demo-data/ invented, neutral sample data for the demos
lib/               GitHub data, platform detection, search, feed, markdown
scripts/           screenshot, contrast, link and smoke checks
```

## Deploying

```sh
npx vercel deploy          # preview
npx vercel deploy --prod   # production
```

## Licence

The website's code is MIT licensed, like twig. Young Serif and Public Sans are under the SIL Open Font License.
