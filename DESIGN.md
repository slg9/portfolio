---
name: Sébastien Legros, Portfolio
description: A senior full-stack developer's portfolio set as a 1960s graphic poster; each project is a flat colour cover whose architecture slides out from behind it.
colors:
  paper: "#f5f5f2"
  ink: "#141414"
  ink-grey: "#4a4a46"
  hairline: "rgb(20 20 20 / 0.16)"
  lagoon-blue: "#0e6ba8"
  cane-green: "#2f7a45"
  volcano-orange: "#e0712a"
  hibiscus-red: "#c2364f"
  night-paper: "#121212"
  night-ink: "#f2f1ec"
  night-ink-grey: "#b4b3ad"
  night-hairline: "rgb(242 241 236 / 0.16)"
  lagoon-blue-light: "#6cb2e4"
  field-shade: "rgb(0 0 0 / 0.14)"
  field-shade-focus: "rgb(0 0 0 / 0.24)"
typography:
  display-hero:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(5.5rem, min(17.5vw, 25svh), 16rem)"
    fontWeight: 900
    lineHeight: 0.78
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 66"
  display-hero-mobile:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(4.25rem, 27vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 62"
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(4rem, 13vw, 12rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 62"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.8vw, 4.25rem)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 68"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 2.4vw, 2.25rem)"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 72"
  subtitle:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)"
    fontWeight: 800
    lineHeight: 1.3
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 750
    letterSpacing: "0.02em"
  label-sm:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 750
    lineHeight: 1.2
  label-xs:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 750
    lineHeight: 1.2
  label-micro:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.02em"
rounded:
  none: "0"
  dot: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(72px, 11vw, 160px)"
  bar: "64px"
  container: "1440px"
  layer-gap: "4px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-solid-hover:
    backgroundColor: "{colors.lagoon-blue}"
    textColor: "{colors.paper}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-on-blue:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-on-blue-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  field-on-blue:
    backgroundColor: "{colors.field-shade}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  topbar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "{spacing.bar}"
  tabbar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label-micro}"
    height: "{spacing.bar}"
  tabbar-cta:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  lang-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label-sm}"
    width: "36px"
    height: "32px"
  cover:
    backgroundColor: "{colors.lagoon-blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    width: "72%"
  layer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: "0 12px"
  chip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: "5px 9px"
  chip-hover:
    backgroundColor: "{colors.lagoon-blue}"
    textColor: "{colors.paper}"
  chip-archive:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
---

# Design System: Sébastien Legros, Portfolio

## Overview

**Creative North Star: "The Cut-Away Cover"**

Each project is a flat colour cover with its architecture cut away behind it. The cover states the domain and one huge condensed word. On hover, focus or scroll, three ink strips (interface, API, storage) slide out from its right edge and name the real technologies. The page shows the work first and then how it was built, and that order is the system. The graphic lineage is the Reid Miles school of the late 1950s and 60s, kept only as typographic and colour heritage: huge cropped condensed grotesque, flat full fields of colour, duotone photography and off-white paper. There is no record, sleeve or music framing anywhere.

The page alternates enormous type with quiet reading text. One variable family carries both voices: Archivo at condensed width and 850-900 weight for display, normal width for text. Every corner is square, there are no shadows and no cards. Hairline rules and 2px ink rules give the structure. Ink is also a material: the architecture layers and the technology chips are the same small ink blocks. States are printed: a filled block, an underline, a filled dot, a strip sliding into view. They are never glows or rounded badges.

Dark mode inverts paper and ink. The project colours and the identity blue keep their fills, ink blocks turn light with dark text, and blue text lightens so it stays readable.

**Key Characteristics:**
- Condensed 900-weight uppercase display, cropped and running off the column, the cover or onto the photograph.
- One identity colour (lagoon blue) plus one colour per featured project; everything else is paper and ink.
- Ink as material: architecture layers and technology chips are square ink blocks, never outlined tags or pills.
- Duotone photography only: greyscale, luminosity-blended over lagoon blue, multiplied with a blue wash.
- Square corners everywhere; the only circles are the career timeline dots.
- One motion clock (420ms, cubic-bezier(0.2, 0.8, 0.2, 1)). Every element is visible by default, and reduced motion removes all movement.

## Colors

Two print colours for the paper stock, a small set of flat project inks, and ink itself used as a solid material.

### Primary
- **Lagoon Blue** (lagoon-blue): the identity colour. It is used for the duotone portrait ground, the second hero word, the contact section's full-bleed field, the solid button's hover, the technology chips' hover state, text selection, accent-color, the current career dot, and the first project cover. On a blue field, text is always paper.
- **Lagoon Blue Light** (lagoon-blue-light): replaces lagoon blue for blue *text* and focus rings in dark mode only. Blue fills stay lagoon blue.

### Secondary
- **Cane Green** (cane-green), **Volcano Orange** (volcano-orange), **Hibiscus Red** (hibiscus-red): project colours, one per featured project. Each covers that project's cover and underlines its "Détails" disclosure, and appears nowhere else. Text on volcano orange is ink. Text on green, red and blue is paper.

### Neutral
- **Paper** (paper): the page, top bar and tab bar background. It is also the fixed on-colour text for every coloured field, and it stays paper in dark mode on those fields.
- **Ink** (ink): body text, display type, solid buttons, the brand mark, the current language, the tab-bar CV cell, 2px structural rules, the career line, and the fill of every architecture layer and technology chip.
- **Ink Grey** (ink-grey): secondary text such as ledes, about columns, summaries, taglines, descriptions, dates and the footer.
- **Hairline** (hairline): 1px dividers under the top bar and hero, between expertise rows and archive rows, the about column rule and the tab bar top edge.
- **Night Paper / Night Ink / Night Ink Grey / Night Hairline**: the dark-mode values for paper, ink, ink grey and hairline. They apply under `prefers-color-scheme: dark` or `data-theme="dark"`.

### Named Rules
**The One Colour Per Project Rule.** Each featured project owns exactly one colour. It fills that project's cover and underlines its details summary, and appears nowhere else on the page.

**The One Colour Field Rule.** Lagoon blue is the only colour that fills a full-width section, and it does so once, at contact. Everywhere else it appears as type, photo ground, a cover or a state.

**The Fixed On-Colour Rule.** Text on a coloured field (blue, green, red, or the duotone) is paper (or ink on orange) in both themes. It never follows the theme's paper/ink swap.

## Typography

**Display Font:** Archivo variable, width axis at 62-72 (with system-ui, sans-serif)
**Body Font:** Archivo variable, normal width (with system-ui, sans-serif)

**Character:** One grotesque used in two voices. Squeezed to 62-72% width at 850-900 weight, it becomes the poster shout. At normal width and 400 weight, it reads as plain reading text. Loaded through next/font with only the `wdth` axis.

### Hierarchy
- **Display Hero** (900, clamp(5.5rem, min(17.5vw, 25svh), 16rem), 0.78, width 66, uppercase): the three hero words, each on its own masked line; the second line is lagoon blue. On mobile it narrows to width 62, clamp(4.25rem, 27vw, 9rem), and pulls up over the bottom of the portrait.
- **Display** (900, width 62, 0.82, uppercase): cropped poster words. The expertise headings use clamp(4rem, 13vw, 12rem), the contact title is sized to its container (min(29cqw, 14rem)), and each cover word is sized per project as a percentage of the cover width (44-62cqw).
- **Headline** (850, clamp(2.25rem, 4.8vw, 4.25rem), 0.95, width 68, max 21ch, balanced): section titles in sentence case. The "Autres réalisations" sub-heading uses the same voice at clamp(1.75rem, 3.2vw, 2.75rem).
- **Title** (850, clamp(1.625rem, 2.4vw, 2.25rem), 1, width 72): project names and the form's success message.
- **Lede** (400, clamp(1.0625rem, 1.4vw, 1.25rem), 1.5, max 46ch, ink grey): the sentence under a headline or display.
- **Body** (400, 1rem, 1.6): reading text. About columns use 1.0625rem at 1.65; archive taglines and descriptions use 0.9375rem.
- **Label** (750, 0.9375rem, 0.02em): buttons, summaries, dates. The nav uses 600. Form labels (700) and the footer (400, ink grey) sit one step down at 0.875rem.
- **Label Small** (750-800, 0.8125rem, 1.2): technology chips, the layer technologies, the language switch, the career entry type (650), and the floor of the cover's domain label (max(0.8125rem, 3.4cqw)).
- **Label XS** (750-800, 0.75rem, 1.2): archive chips, and layer technologies on the mobile shelf.
- **Label Micro** (650-700, 0.6875rem): the layer names (650 at 75% opacity) and the tab bar labels (700, 0.02em).

### Named Rules
**The Two Widths Rule.** Display is always condensed (width 62-72) and heavy (850-900). Text is always normal width. Nothing sits in between.

**The Crop Rule.** Display words can be cropped by their container: masked lines in the hero, cover words bleeding off the cover's bottom-left edge, expertise headings set slightly into the left margin (-0.04em). Cropping is the poster effect. Don't shrink a word to make it fit.

**The Small Steps Rule.** Below body, text uses only 0.9375, 0.875, 0.8125, 0.75 and 0.6875rem. Nothing else sits between them.

## Layout

A full-width editorial page inside a 1440px container with a fluid gutter (clamp(16px, 4vw, 56px)). Sections are separated by large vertical rhythm (clamp(72px, 11vw, 160px)). The single 767px breakpoint switches to the mobile app layout. A second breakpoint at 900px collapses the expertise rows and career layout to one column.

- **Hero:** a two-column composition (0.8fr copy / 1fr portrait), full viewport height minus the bar. The display words run over the portrait. Where they cross it, a clipped paper-coloured copy of the words is laid on top, so the type changes colour at the photo's edge. On mobile the portrait sits at the top (42svh, at least 260px) with the words pulled up over its lower edge, and the first line turns to paper.
- **Asymmetric two-part grids:** about 5fr/7fr, career 4fr/8fr with a sticky title, contact 1fr/1fr.
- **Projects:** two per row on desktop. Each cover takes 72% of its item, leaving the right 28% as the runway the layers slide into. On mobile the grid becomes a horizontal snapping shelf (86% per item, bleeding past the gutter, no scrollbar) and the cover shrinks to 62%.
- **Archive:** two columns of disclosure rows, one per group, collapsing to one column on mobile.
- **Bars:** a 64px sticky top bar on desktop. On mobile the top bar scrolls away and a fixed 64px bottom tab bar (four cells, respects the safe area) takes over navigation; its last cell is the solid ink CV action.
- Touch targets are at least 44px (summaries, social links), and buttons are 52px tall.

## Elevation & Depth

Flat. There are no drop shadows anywhere. Depth comes from stacking flat planes: the three ink layers sit behind the cover on the same footprint and slide out sideways, and the duotone portrait sits under the display type with the clipped paper copy of the words on top. Structure comes from tonal fields and rules, never from lift.

### Shadow Vocabulary
- **Hover outline** (`box-shadow: inset 0 0 0 1.5px var(--ink)`): the hover state of the language switch. An inset outline, not a shadow.

### Named Rules
**The Flat Planes Rule.** If it needs a shadow to read as a separate surface, it should be a flat colour field, an ink block or a ruled block instead. Depth is only ever one plane sliding out from behind another.

## Shapes

Square corners everywhere (0), including inputs, which reset the platform radius to 0. The only round shapes are the career line's 14px timeline dots, outlined in 2px ink and filled lagoon blue for the current role. Covers are 16:10 rectangles. Layers are three equal strips with 4px gaps on the cover's footprint. Chips are tight square ink blocks. Borders are either 1px hairlines for division or 2px ink for emphasis: button outlines, the archive group heading underline, the expertise top rule, the career line and the input underline.

## Components

### Buttons
Printed blocks with a 2px ink outline, the same on every surface.
- **Shape:** square (0), 52px tall, 0 24px padding, label type, a 10px gap before an 18px bold icon.
- **Solid:** ink fill with paper text. On hover it fills lagoon blue.
- **Line:** transparent with an ink outline and ink text. On hover it fills with ink.
- **On blue (contact):** paper fill with ink text. On hover it inverts to ink with paper text.
- **Hover / Press:** colours change on the 420ms clock, the trailing icon nudges 4px right, and pressing scales the button to 0.97 (160ms). Focus is a 2px outline in the blue text colour, offset 3px.
- **Mobile:** hero and form buttons go full width. The hero's line button is dropped on mobile because the tab bar carries the CV.

### Chips
Technologies as small ink blocks, the same material as the architecture layers.
- **Style:** ink fill, paper text, square, label-small type (5px 9px padding), 4px apart in a wrapping row. In the archive they drop to label-xs (4px 8px).
- **State:** on hover-capable devices only, hovering the project or archive row shifts each chip 6px right and fills it lagoon blue, staggered 40ms per chip on the 420ms clock. Chips are never links and never outlined.

### Inputs / Fields
These only live on the lagoon-blue contact field.
- **Style:** a translucent dark well (rgb(0 0 0 / 0.14)) with paper text, no border except a 2px paper underline at 70% opacity, square corners, 12px 14px padding. Labels sit above in 0.875rem/700.
- **Focus:** the well darkens to 0.24 and the underline goes to full paper. There is no outline ring inside the blue field.
- **States:** sending, error and done are printed as text. The done state is a title-sized line under a 2px paper rule.

### Navigation
- **Top bar:** paper with a hairline bottom edge. The brand is a 40px ink square holding "SL" in condensed display, followed by the uppercase name. Links are 600 weight; on hover a 2px underline grows left to right on the clock.
- **Language switch:** 36x32 cells. The current language is a filled ink block, and hovering the other draws an inset 1.5px ink outline.
- **Tab bar (mobile):** a fixed four-cell grid (Projects with the Phosphor Stack icon, Experience with Path, Contact with EnvelopeSimple, CV with DownloadSimple), each a 22px bold icon above a label-micro label. Pressing a cell scales it to 0.92, and the CV cell is solid ink.

### Project Cover with Architecture Cross-Section (signature)
The featured project unit: the work first, then how it is built.
- **Cover:** a 16:10 flat field in the project's single colour, 72% of the item width (62% on mobile). The domain label (CRM B2B, Santé, Gamification, Audio mobile) sits top-left at 750 weight, max(0.8125rem, 3.4cqw). One huge display cover word bleeds off the bottom-left edge.
- **Cross-section:** behind the cover, on the same footprint, three ink strips stacked top to bottom as Interface, API, then Données (or Paiements). Each strip names its layer in label-micro and its real technologies in label-small, right-aligned. At rest the strips peek 3%, 4.5% and 6% past the cover's right edge, and their text is transparent so only the edge shows. On hover or focus-within (desktop) they slide to translateX(37%) over 588ms (1.4x the clock), staggered 60ms per layer, and their text fades to paper. On the mobile shelf a scroll-linked view(inline) animation brings them to 56% as the item crosses the viewport, then back.
- **Body:** the project name in title type, a summary in ink grey, the technology chips, and a "Détails" disclosure. The summary is underlined 2px in the project colour, its bold plus icon rotates 45deg when open, and the label switches to "Refermer". Role and impact are listed inside, and the content fades in on the clock.

### Archive Disclosure
Secondary work ("Autres réalisations") as two groups of rows under 2px ink-underlined group headings, rows separated by one hairline.
- **Row:** a summary with the project name (800) over a one-line tagline (0.9375rem, ink grey), and an 18px bold caret on the right that rotates 180deg when open. Hovering the summary underlines the name 2px.
- **Open:** the full description (0.9375rem, ink grey, max 62ch) fades in on the clock. The row's chips sit below the summary and stay visible whether the row is open or closed.

### Expertise Rows
A 2px ink top rule, then rows divided by hairlines. Each row has a cropped display heading spanning both columns, the stack list at clamp(1.125rem, 1.6vw, 1.5rem)/650, and an ink-grey description.

### Career Line
Career and education as one continuous 2px ink line. Dates are right-aligned in a column 11rem wide. Each entry has a 14px outlined dot, and the current role's dot is filled lagoon blue. On mobile the line moves to the left edge.

## Do's and Don'ts

### Do:
- **Do** set display type in Archivo at width 62-72, weight 850-900, uppercase, with line-height under 1. Let it crop.
- **Do** give each featured project exactly one colour and use it only on that project (cover fill, details underline).
- **Do** show a project's architecture as ink layers behind its cover, named with its real technologies, hidden at rest and revealed by hover, focus or scroll.
- **Do** render technologies as square ink chips, the same material as the layers.
- **Do** treat photography as duotone: greyscale with contrast(1.12), luminosity-blended over lagoon blue, plus a 35% multiply wash.
- **Do** print states: filled ink blocks, 2px underlines, filled dots, sliding planes, text messages.
- **Do** run every transition on the one clock (420ms, cubic-bezier(0.2, 0.8, 0.2, 1)), keep everything visible without animation, and remove all motion under prefers-reduced-motion.
- **Do** keep text on coloured fields at paper (or ink on volcano orange) in both themes.

### Don't:
- **Don't** reintroduce music framing: no records, sleeves, discs, track numbers, artist credits or liner-note naming.
- **Don't** round corners on any rectangle; only the career timeline dots are circles.
- **Don't** add drop shadows, elevated cards, rounded pills or outlined tags; separate content with hairlines, ink rules, ink blocks and flat colour fields.
- **Don't** fill a second full-width section with colour; contact is the one colour field.
- **Don't** use a medium-width or light-weight display; the two voices are condensed-heavy and normal-width text.
- **Don't** set small text outside the small steps (0.9375, 0.875, 0.8125, 0.75, 0.6875rem).
- **Don't** put full-colour photography on the page; images are always the lagoon-blue duotone.
