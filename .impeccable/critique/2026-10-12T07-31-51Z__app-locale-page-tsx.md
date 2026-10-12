---
target: app/[locale]/page.tsx
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/sebastienlegros/Documents/dev/front/portfolio/app/[locale]/page.tsx"
target_fingerprint: "sha256:792fe0a7c33f6168dde520b1325f28774f1548390a7eb532b045359309cbb6dd"
target_path: /Users/sebastienlegros/Documents/dev/front/portfolio/app/[locale]/page.tsx
timestamp: 2026-10-12T07-31-51Z
slug: app-locale-page-tsx
---
**Method: dual-agent (A: ad2f5403bfbf72f37 · B: CLI detector)**

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Header progress bar is the only scroll-depth signal; no section indicator on mobile while scrolling |
| 2 | Match System / Real World | 3 | Copy is natural and domain-appropriate in both FR/EN; "Cursus" id mismatches nav label |
| 3 | User Control and Freedom | 2 | Nav anchors work but no back-to-top; LanguageSwitcher has no click-outside dismiss |
| 4 | Consistency and Standards | 2 | LanguageSwitcher carries light-mode Tailwind classes; card border-radius varies 18-22px; inline style + Tailwind + embedded style mixed across components |
| 5 | Error Prevention | 2 | Contact form uses HTML required + type=email but no inline validation; translated error keys exist but aren't wired |
| 6 | Recognition Rather Than Recall | 3 | Active nav underline, tech pills, timeline badges all help recognition; archive grid of 11 cards has no filtering |
| 7 | Flexibility and Efficiency | n/a | Portfolio / Experience surface |
| 8 | Aesthetic and Minimalist Design | 3 | Post-redesign is significantly cleaner (2 fonts, no animations, no neon); card monotony across ~20 surfaces is the remaining issue |
| 9 | Error Recovery | 1 | Contact form shows only "Send failed" with no guidance; translated field-level errors aren't connected to UI |
| 10 | Help and Documentation | n/a | Portfolio / Experience surface |
| **Total** | | **18/32** | **Acceptable (56%)** |

## Design Specificity Verdict

**LLM assessment**: Personalized content in a generic shell. The copy carries genuine personality. The bilingual FR/EN with locale-aware CV download is a real product choice. But the visual system is interchangeable: ~20+ cards share identical treatment. Swap the portrait and text and this is any dark-mode dev portfolio.

**Deterministic scan**: CLI detector returned 0 findings — clean pass. No gradient-text, no gratuitous glass, no eyebrow/kicker patterns, no section numbering detected.

## Overall Impression

The redesign stripped the right things — entrance animations, neon green, font proliferation, 3D tilt, eyebrows — and the site now reads as restrained rather than hyperactive. The remaining issue is that "restrained" has tipped into "same card repeated 20 times."

## What's Working

1. **Copy quality across both languages**: Both FR and EN read as naturally authored. Project descriptions cite real architectural decisions.
2. **Accessible foundations**: aria-labelledby, aria-expanded, aria-current, aria-modal, aria-hidden, focus-visible, selection styling.
3. **Information architecture for recruiter flow**: Multiple escalation paths placed at contextually appropriate points.

## Priority Issues

### [P1] Text contrast fails on secondary elements
Hero identity line (~2.8:1), Download CV CTA (~2.0:1), location text (~1.6:1) all fail WCAG AA. Body text #6B7A99 is borderline at ~4.8:1.
Fix: Raise secondary text opacity, body text to #7E8EAB or brighter, CV CTA to at least rgba(255,255,255,.4).
Suggested command: /impeccable polish

### [P1] Touch devices get zero interactive feedback
Every card and link uses onMouseEnter/onMouseLeave. On iOS/Android, tapping produces no visual response.
Fix: Add CSS :active states or @media (hover: none) touch-feedback styles.
Suggested command: /impeccable adapt

### [P2] Visual monotony across ~20 card surfaces
Featured projects, archive projects, timeline cards, tech groups, about pillars, and contact form all share the same dark glass card treatment.
Fix: Differentiate card hierarchy with categorically different treatments by importance level.
Suggested command: /impeccable layout

### [P3] LanguageSwitcher uses light-mode classes
text-slate-700 and hover:bg-white render broken on the dark-only site.
Fix: Replace with explicit dark palette values.
Suggested command: /impeccable harden

### [P3] Manifest colors contradict the site
background_color: #ffffff and theme_color: #6366f1 vs actual #04040F and #0A84FF.
Fix: Set background_color: #04040F and theme_color: #0A84FF.
Suggested command: /impeccable polish

## Persona Red Flags

**Jordan (First-Timer)**: Long page with no depth indicator. Archive grid has no wayfinding. Language switcher may be invisible on light-mode OS. No skip-to-content link.

**Casey (Distracted Mobile User)**: Zero touch feedback. Hero portrait below fold on mobile. Narrow form inputs. Timeline dead space.

**French CTO Recruiter**: No project live URLs or GitHub links. Only one visible stat. Location in barely-visible micro-text.

## Minor Observations

- aboutPulse and contactPulse defined separately but nearly identical
- Project stack pills silently truncate to 4 with no "+N more"
- Hero portrait name overlay redundant with left-column heading
- Structured data claims MongoDB/AWS not shown in UI
- Project expand/collapse has no content transition
