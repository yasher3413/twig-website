# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Pinned by the owner's brief: Next.js (App Router) + TypeScript, Tailwind CSS v4 with CSS-variable tokens mirroring the app, Motion (`motion/react`), Fumadocs for MDX docs, deployed on Vercel (Node runtime). GitHub Releases API at build time with ISR.

## Users

- **Primary:** Mac users on Apple Silicon who keep dozens to hundreds of tabs open: developers, researchers, students, writers. They usually arrive from the GitHub repo, a forum post or a friend's link. They're sceptical of new browsers, and they're won over by seeing the mechanism work, not by adjectives.
- **Secondary:** existing twig users looking for docs, release notes, shortcuts or troubleshooting (Gatekeeper, default browser); contributors looking for the source and how to build it; press or curious people looking for the brand kit.

## Product Purpose

twig is a free, open-source (MIT) macOS browser built on Tauri 2 and the system WebKit. It treats tabs you aren't looking at as costing almost nothing (sleeping tabs), and remembers what you've read (Recall, changes since you last read, checkpoints, research packages). The website must (1) make people want to download it, (2) teach them to use it, (3) be the project's home: docs, release notes, community, donations, legal.

Success: a visitor understands within one viewport what twig is and why it is different, clicks *Download for Mac*, and gets through the first launch (the Gatekeeper "Open Anyway" step) without confusion.

## Positioning

"Every other browser forgets. twig remembers." It's the browser you can close tabs in, because nothing is lost: full-text recall of pages you've read, checkpoints you can fork, and snoozed tabs that come back. It's lightweight because it uses the Mac's own WebKit, not a bundled Chromium, and because sleeping tabs give up their webview. It's local-first: no account, no sync server, everything on your Mac.

## Operating Context

Visitors come on a Mac (often the same machine they'll install on), and some on phones from a shared link. Download is a direct DMG from GitHub Releases (`releases/latest/download/twig-macos-arm64.dmg`). The first launch needs System Settings → Privacy & Security → Open Anyway, or `xattr -dr com.apple.quarantine /Applications/twig.app`. There's no auto-updater, so returning users check release notes and download again.

## Capabilities and Constraints

- Only claim features listed in the brief §2 and present in `/Users/yash/twig-browser` (read-only).
- Limits that must be stated honestly: Apple Silicon only; not notarized; no auto-updater; no extensions, sync or accounts; the Google sign-in profile prompt is blocked by WebKit's tracking prevention.
- Latest release v0.1.3 (2026-09-30). Version and notes come live from the GitHub API.
- No backend: no waitlist forms, no fake checkout.

## Brand Commitments

- Name is always lowercase **twig**.
- Wordmark and display headlines in **Young Serif** (`src/assets/fonts/YoungSerif-Regular.woff2`).
- App tokens from `src/App.css` (warm paper, moss accent `#4b6b3a` / `#8fbb6e`), the six accents (Moss, Clay, Ocean, Plum, Honey, Slate), and easing `cubic-bezier(0.22,1,0.36,1)`.
- App icon `design/app-icon.svg`: a moss twig with three leaves and a bud on a warm-paper tile.
- Motif: the branch. Tabs are leaves, checkpoints are buds, forks are branches.
- Voice: calm, warm, precise, a little poetic, never cheesy. No superlatives or hype words. Honest about limits.

## Evidence on Hand

- Real app UI to recreate in code: `src/components/*.tsx/.css`.
- Real screenshots via the app's WebKit capture harness (`tests/*-browser.mjs`).
- Real release notes from the GitHub API.
- **Absent, never fabricate:** testimonials, user counts, press logos, awards, star counts presented as social proof (the repo has 0 stars today), and benchmarks unless measured with a published method.

## Owner Decisions (2026-10-11)

- Domain: Vercel URL for now (`domain: null`).
- Donations: GitHub Sponsors (not set up yet; page ships in its "soon" state).
- Analytics: cookieless Vercel Web Analytics, disclosed on the privacy page.
- Contact email: slot left empty (`contactEmail: null`); legal pages point to GitHub issues.
- About bio: Claude writes it from verifiable facts only, in a natural voice, marked as a draft for the owner's review.
- Photo: none. Use a drawn mark instead.
- Socials and Discord: owner to supply; all `null` and hidden until then.

## Product Principles

1. Prove, don't claim: every feature is shown working, in code, on the page.
2. Honesty is part of the brand: limits are stated as plainly as features.
3. Local-first in the site too: no tracking beyond cookieless analytics, no third-party embeds that phone home.
4. Keyboard-first: the site is fully usable from the keyboard, and ⌘K works here as in the app.
5. Light: the site respects the same budget twig does.

## Accessibility & Inclusion

WCAG 2.2 AA in both themes, full keyboard navigation, `prefers-reduced-motion` gives elegant static states, no motion-only information, and the ⌘K palette is an accessible combobox.
