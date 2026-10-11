---
name: twig
description: The Gardener's Almanac. A browser about time, printed as an almanac of what sleeps, wakes and returns.
colors:
  paper: "#f6f4ee"
  strip: "#e8e5d8"
  ink: "#23261f"
  muted: "#62665a"
  moss: "#4b6b3a"
  moss-tint: "rgba(75, 107, 58, 0.12)"
  rule: "rgba(35, 38, 31, 0.22)"
  border: "rgba(35, 38, 31, 0.08)"
  border-strong: "rgba(35, 38, 31, 0.16)"
  twig-stem: "#3f5b30"
  leaf: "#6f9a55"
  leaf-asleep: "#b4b7a8"
  forest: "#101208"
  forest-ink: "#e9e7dd"
  forest-mark: "#a9cd8c"
  leaf-settled: "#9ea08f"
  forest-muted: "#a3a594"
  field-moss: "#4b6b3a"
  mark-moss: "#dcedce"
  field-ocean: "#2b6e7a"
  mark-ocean: "#d9f1f3"
  field-clay: "#8f4a26"
  mark-clay: "#f6d8c5"
  field-honey: "#e0b24d"
  on-honey: "#23261f"
  mark-honey: "#5a4210"
  field-plum: "#6b4a82"
  mark-plum: "#e2d0ef"
  field-slate: "#52564c"
  mark-slate: "#dfe1d6"
  dark-paper: "#17190f"
  dark-surface: "#1c1f13"
  dark-ink: "#e9e7dd"
  dark-muted: "#9a9c8d"
  dark-moss: "#8fbb6e"
typography:
  display:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(46px, 5.6vw, 80px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(40px, 5.6vw, 104px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline-md:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(30px, 3.4vw, 60px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(24px, 2.1vw, 34px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Public Sans, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(18px, 1.5vw, 21px)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Public Sans, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "lnum"
  label:
    fontFamily: "Public Sans, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 560
    lineHeight: 1.35
    letterSpacing: "0.005em"
    fontFeature: "tnum, lnum"
  table-head:
    fontFamily: "Public Sans, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 560
    fontFeature: "tnum, lnum"
rounded:
  hairline: "4px"
  control: "8px"
  tool: "10px"
  window: "12px"
  panel: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  date-column: "180px"
  column-gap: "32px"
  chapter-y: "clamp(72px, 9vw, 144px)"
  body-gap: "clamp(32px, 5vw, 64px)"
  head-to-body: "clamp(28px, 3.4vw, 48px)"
  measure: "68ch"
  max-width: "1440px"
components:
  button-download-lg:
    backgroundColor: "{colors.moss}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 10px 0 22px"
    height: "58px"
  button-download-md:
    backgroundColor: "{colors.moss}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 8px 0 18px"
    height: "48px"
  button-download-sm:
    backgroundColor: "{colors.moss}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 16px 0 13px"
    height: "38px"
  button-download-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  button-icon:
    textColor: "{colors.ink}"
    rounded: "{rounded.tool}"
    size: "40px"
  nav-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  nav-link-hover:
    textColor: "{colors.ink}"
  palette-trigger:
    textColor: "{colors.muted}"
    rounded: "{rounded.tool}"
    height: "36px"
    padding: "0 8px 0 12px"
  designed-blank:
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "5px 10px 5px 8px"
  twig-window:
    rounded: "{rounded.window}"
  demo-panel:
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
---

# Design System: twig

## Overview

**Creative North Star: "The Gardener's Almanac"**

twig is a browser about time, so its site is printed like an almanac: entries keyed to *when* something happens, set on hairline rules, with tabular figures in the time columns. Flat lithographic colour fields, one per chapter, in the app's six accents (Moss, Ocean, Clay, Honey, Plum, Slate) own whole bands of the page; warm paper sits between them; two forest-night chapters are lit by a single soft moon. The proof is the product itself: twig's own chrome, recreated in code at true scale with the app's shadows, sits inside those fields and works.

A moss branch grows down the left margin through every chapter on desktop. Each chapter is a leaf on it: the leaf unfurls when the chapter arrives, settles curled and grey-green once passed, and wakes on return; the checkpoints chapter forks it. The motif is the product's own metaphor (tabs are leaves, checkpoints are buds, forks are branches), so it carries meaning rather than ornament.

The register is calm and precise. Type does the persuading: Young Serif, the app's wordmark face, in large, tightly tracked display; Public Sans for everything read. Paper carries a fine static grain. Motion grows, unfurls, settles and drifts. It never bounces.

**Key Characteristics:**
- Whole-chapter flat colour fields in six accents, with paper between them; the only gradients are light (dappled sun on the hero field, the forest moon)
- Almanac entries: a 180px "when" column, baseline-aligned with the headline on a shared hairline rule
- Tabular lining figures wherever time, versions or sizes appear
- Real twig UI at true scale as the only imagery; no stock or illustration beyond the drawn twig mark
- A margin branch whose leaves track reading state
- Light and dark themes are first-class; fields deepen to dusk tones in dark

## Colors

Warm paper and olive ink, one moss accent, and six flat field colours that each own a chapter, each paired with a text colour and a strong "mark" tint chosen for AA.

### Primary
- **Twig Moss** (`moss`): the single interactive accent on paper. The Download button, focus rings, link hover underlines, selection tint (`moss-tint`), caret, and the "when" label on paper chapters. In dark it lifts to **Spring Moss** (`dark-moss`).

### Secondary (chapter fields)
Each field is a triplet: background, text on it (`on-*`, paper for all fields except Honey, which takes ink), and a mark colour for the "when" label, links and accents inside the chapter.
- **Moss Field** (`field-moss`, mark `mark-moss`): the hero's right-hand field and the close.
- **Ocean Field** (`field-ocean`, mark `mark-ocean`): Recall.
- **Clay Field** (`field-clay`, mark `mark-clay`): changes since you last read.
- **Honey Field** (`field-honey`, text `on-honey`, mark `mark-honey`): snooze. The one light field; it takes ink text and a dark umber mark.
- **Plum Field** (`field-plum`, mark `mark-plum`): checkpoints and the research packet.
- **Slate Field** (`field-slate`, mark `mark-slate`): the keyboard chapter.

Mark tints on Moss, Ocean and Clay are lightened beyond the app's swatches so the 15px "when" label and inline links clear AA on their fields. In dark, every field drops to a deep dusk version of itself (for example Moss to #243320) and marks become the saturated app accent; those values live in `app/global.css` and must stay paired with their light counterparts.

### Tertiary
- **Forest Night** (`forest`, text `forest-ink`, muted `forest-muted`): the two night chapters (local-first, built on WebKit). A single radial moon glow (`rgba(214, 228, 190, 0.16)`) is the only light; marks on forest use a pale leaf green. On the hero's moss field, dappled leaf light (soft warm radial pools at 22 to 30% and one faint shadow pool) sits behind the window.
- **Leaf / Stem** (`leaf`, `twig-stem`, `leaf-asleep`): the branch and the drawn twig mark only.

### Neutral
- **Warm Paper** (`paper`): page ground and the surface of every recreated window. In dark, **Night Paper** (`dark-paper`) with a slightly lifted **Night Surface** (`dark-surface`).
- **Almanac Strip** (`strip`): the quieter paper band for chapters that need separation without colour.
- **Olive Ink** (`ink`): text, table heads' bottom rules, the printed ruler on the life scale.
- **Lichen Grey** (`muted`): secondary text, ledes, facts lines, nav at rest.
- **Hairline Rule** (`rule`): the almanac rule above every entry and between table rows. On fields it becomes the field's own text colour at 22 to 30%.
- **Border / Border Strong** (`border`, `border-strong`): header base line, window and panel outlines, the palette trigger, dashed designed-blank outlines.

### Named Rules
**The One Field Per Chapter Rule.** A chapter takes exactly one field as its full-bleed background. Colour fields never appear as cards, chips or decorative blocks inside another chapter; the Plum research packet is the one object-scale field, because it depicts the app's own packet.

**The Field Triplet Rule.** Never put text on a field without its `on-*` colour, and never use the raw accent as text on its own field; accents inside a chapter come from its `mark-*`. New fields add all three values, light and dark, and are checked for AA before use.

**The Moss Is The Action Rule.** On paper, moss means "you can act here." Don't spend it on decoration.

## Typography

**Display Font:** Young Serif (with Iowan Old Style, Georgia, serif)
**Body Font:** Public Sans, variable 100 to 900 (with -apple-system, Helvetica Neue, Arial, sans-serif)
**App UI recreations:** the macOS system stack (-apple-system, BlinkMacSystemFont), at the app's own 13px, scoped to the recreated windows only.

**Character:** Young Serif is twig's own wordmark face: a single-master, soft-bracketed serif with a warm, almanac-plate weight. Public Sans carries the Franklin lineage with real tabular figures, plain enough to let the serif speak.

### Hierarchy
- **Display** (400, clamp(46px, 5.6vw, 80px), 0.95, -0.035em): the hero headline only, three to four lines in the 5/12 copy column, capped at 80px.
- **Headline** (400, clamp(40px, 5.6vw, 104px), 0.98, -0.03em): every chapter heading, held to about 16ch so it breaks into two or three lines.
- **Headline MD** (400, clamp(30px, 3.4vw, 60px), 1.04, -0.02em): inside-page titles and secondary entry heads.
- **Title** (400, clamp(24px, 2.1vw, 34px), 1.12, -0.01em): sub-sections, table captions sit near it at 22px.
- **Lede** (400, clamp(18px, 1.5vw, 21px), 1.5): the hero sentence, muted, about 34ch.
- **Body** (400, 17px, 1.6, lining figures): chapter text rises to clamp(17px, 1.25vw, 19px), set at 44ch in chapter columns; long-form pages hold a 68ch measure.
- **Label** (560, 15px, 1.35, +0.005em, tabular): the almanac "when", provenance links, secondary actions. Sentence case, never uppercase.
- **Table head** (560, 13px, muted, tabular): ruled table column heads, over a full ink rule.

### Named Rules
**The Tracking Per Size Rule.** Young Serif has one master, so tracking tightens as size grows (-0.01em at 34px to -0.035em at display). Never set it at default tracking above 30px.

**The Figures Line Up Rule.** Times, versions, sizes and shortcuts are set with tabular lining figures. The almanac is a table of times; its numbers must align.

**The Weight 560 Rule.** Emphasis in the text face is 560, not bold: labels, table heads, provenance links. 600 is reserved for the Download label and strong text in prose.

## Layout

A 1440px maximum frame with a fluid gutter (clamp(16px, 4vw, 56px)), safe-area aware. At 1024px and up, home chapters reserve 52px of extra left padding for the margin branch.

The chapter grid is the almanac row: a 180px date column, then text and demo in a 4fr / 7fr split (or 7fr / 4fr reversed), 32px column gaps. Wide chapters run text at 60ch in column two and let the demo span the full row. The entry head (when + headline) shares the same 180px column on its own hairline. Chapters pad clamp(72px, 9vw, 144px) top and bottom, with clamp(28px, 3.4vw, 48px) from head to body.

The hero breaks the chapter grid deliberately: 5/12 copy on paper, 7/12 moss field that starts just left of the window and bleeds to the viewport edge. On phones the field runs edge to edge beneath the copy.

Below 1024px everything stacks to one column, the branch disappears, and each entry head carries its own small leaf beside the "when", which moves below the headline. The header switches nav to a right-hand sheet below 900px. Inside pages (legal, prose) offset their body by 212px on desktop to sit under the same date column.

**The Date Column Rule.** Anything keyed to time lives in the 180px column or below its headline, never stacked above it. Nothing occupies that column in the hero.

## Elevation & Depth

Flat by default. Pages, fields, tables and almanac entries carry no shadow; depth is conveyed by colour fields, paper grain and hairline rules. Shadows exist only to make twig's recreated UI read as a real object on the page, and they are the app's own values.

### Shadow Vocabulary
- **Raise** (`box-shadow: 0 1px 2px rgba(35, 38, 31, 0.1), 0 4px 12px rgba(35, 38, 31, 0.07)`): small app surfaces (popovers inside windows, the research packet).
- **Pop** (`box-shadow: 0 8px 16px rgba(35, 38, 31, 0.1), 0 24px 48px rgba(35, 38, 31, 0.16)`): twig windows, demo panels, the mobile nav sheet. Windows add a 0.5px outline (`0 0 0 0.5px rgba(0, 0, 0, 0.08)`).
- **Download** (`box-shadow: 0 1px 2px rgba(35, 38, 31, 0.18), 0 6px 18px -6px rgba(35, 38, 31, 0.35)`, hover deepens): the one shadowed control on the site.

In dark the same roles use black at 0.3 to 0.55 opacity.

### Named Rules
**The App Shadows Only Rule.** If it isn't a piece of twig (a window, panel, sheet) or the Download button, it has no shadow.

**The Grain Is Paper Rule.** A 180px static grain tile sits over everything at 5% multiply (3.5% screen in dark). It is texture, not depth; never animate it or raise its opacity.

## Shapes

Two families. Site chrome is soft and small: 8px nav links, 10px tool buttons and palette trigger, 4px focus rings. App objects follow the app: 12px windows, 14px demo panels, 8px internal controls. Pills (999px) are reserved for the Download button, its version chip, and designed blanks. Rules are 1px hairlines; the life-scale ruler is a 2px ink line with 2px ticks. Dashed 1px strokes mean "not here yet": designed blanks and the packet's tear line. The research packet uses an envelope silhouette (8px top, 18px bottom corners).

## Components

### Buttons
Quiet, tactile, one of them.
- **Shape:** full pill (999px).
- **Download for Mac (primary):** moss ground, paper text, 600 weight, a small leaf glyph drawn in SVG, and a version chip (`v0.1.3 · Apple Silicon`) in an 18% tint of the label colour. Three sizes: 58px (18px label), 48px (16px), 38px (14px, chip hidden). In dark the label goes forest-black on spring moss. Paper and ink tones exist for fields where moss would vanish.
- **Hover / Focus:** the closed leaf unfurls into an open leaf (ease-unfurl, 0.42s); the shadow deepens; pressed moves 1px down. In the hero it sits in a magnetic wrapper that drifts at most 6px toward a fine pointer and never overshoots; off under reduced motion and coarse pointers.
- **Secondary:** never a second button. A text link at 560 weight with a rule-coloured underline offset 5px that turns moss on hover.
- **Icon buttons:** 40px square, 10px radius, transparent, row-hover tint on hover.

### Designed Blank
- **Style:** a dashed `border-strong` pill with a hollow 6px dot and muted 14px text. It stands in for anything the owner hasn't supplied yet (socials, sponsors, contact). It is honest about absence; never fill it with placeholder data.

### Cards / Containers
- **Corner Style:** 14px for demo panels, 12px for windows and prose figures.
- **Background:** `surface` (paper in light, night surface in dark), regardless of the field behind.
- **Shadow Strategy:** Pop, per Elevation.
- **Border:** 1px `border-strong`.
- There are no feature cards. A chapter's content is text plus one working demo.

### Ruled Table
- Full-width, collapsed, 15px. Rows divided by hairline rules; the head row sits on a full ink rule with 13px muted 560 labels. An optional Young Serif 22px caption sits above. Links take the chapter's mark colour with a 40% underline that solidifies on hover.

### Navigation
- **Header:** sticky, 64px, paper ground, a single `border` base line. Young Serif wordmark at 27px with the drawn twig mark. Nav links are 15px 500 muted, 8px radius, ink on a row-hover tint at hover. A palette trigger (36px, field-tinted, `border-strong`, with a ⌘K key cap) and theme toggle sit right.
- **Mobile:** below 900px nav moves to a right-hand sheet (max 360px) that slides in 24px with ease-unfurl over a 32% forest scrim; Young Serif sheet title.

### Almanac Entry Head (signature)
A hairline rule, then the "when" (a moment, not a category: "After 10 minutes", "Tuesday, 9:00 AM", "Any time, ⌘K") in the 15px 560 label in the chapter's mark colour, baseline-aligned in the 180px column beside the headline. On phones it moves below the headline with its own leaf.

### Life Scale
A printed ruler: a 2px ink rule with ticks and five marks along it (vertical on phones with a left rule, horizontal from 760px). Used to lay a mechanism out against time.

### Margin Branch (signature)
A 3.4px round-capped moss stem in the left margin from 1024px up. Leaves move through three states: bud (closed, scaled to 0.12), awake (unfurled, full colour, a paper vein), asleep (swapped for a curled grey-green shape, rotated 58deg, drooped). Transitions use ease-unfurl to wake and ease-settle to sleep; forks draw on with ease-grow. Under reduced motion every leaf shows its composed end state.

### twig UI recreations
Ported from the app with its class names and dimensions, scoped under one wrapper that maps app tokens onto site tokens, so windows follow the visitor's theme. They use the system font at 13px and the app's 8px internal radius. Pages shown inside the windows are mock third-party sites, and their small labels belong to those pages, not to the site's type system.

### Motion
Four easings, one authored moment per chapter. **Grow** `cubic-bezier(0.22, 1, 0.36, 1)` for state changes and hover (0.16 to 0.24s). **Unfurl** `cubic-bezier(0.16, 1, 0.3, 1)` for things opening. **Settle** `cubic-bezier(0.33, 0, 0.15, 1)` for things going to sleep. **Drift** `cubic-bezier(0.45, 0, 0.55, 1)` for ambient light. Reduced motion shows composed end frames, never a blank.

## Do's and Don'ts

### Do:
- **Do** give each chapter one full-bleed field and take every colour inside it from that field's triplet (`field-*`, `on-*`, `mark-*`).
- **Do** key each chapter to a moment in the 180px "when" column on a hairline rule, in sentence case.
- **Do** set times, versions, file sizes and shortcuts with tabular lining figures.
- **Do** show the mechanism with twig's real UI at true scale, using the app's shadows (Raise, Pop) and radii (12px windows, 14px panels).
- **Do** tighten Young Serif's tracking as it grows: -0.01em at 34px through -0.035em at display.
- **Do** use the four named easings and give every animated state a composed reduced-motion end frame.
- **Do** mark missing owner content with a designed blank, not invented data.

### Don't:
- **Don't** add a second filled button. Download for Mac is the only one; everything else is an underlined 560 link.
- **Don't** put a label, date or category above a headline. Time goes in the date column beside it, or below it on phones, and the hero has none.
- **Don't** use colour fields as cards, chips or decorative blocks, or grade their fills. Gradients are light only: the dappled sun behind the hero window and the forest moon.
- **Don't** shadow anything that isn't a piece of twig or the Download button.
- **Don't** set Young Serif in anything but weight 400, or use it for body text, labels or UI.
- **Don't** let motion bounce or overshoot; the magnetic button clamps at 6px and settles.
- **Don't** set text in uppercase or wide tracking anywhere on the site.
