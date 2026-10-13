---
version: 1
slug: "app-locale-page-tsx"
primary_target: "app/[locale]/page.tsx"
related_targets: []
---

# Surface: portfolio home (app/[locale]/page.tsx)

Mode: Experience. Audience: French startup CTOs and recruiters arriving from LinkedIn or an application email, often on a phone; they decide within seconds. Job: understand the profile, scan the projects, contact or download the CV. Constraints: FR/EN, no project screenshots (NDA), PageSpeed 95+ on mobile, near-zero client JS, app-like mobile (thumb navigation, swipe shelf). Theme free: light paper sleeve by default, black sleeve under prefers-color-scheme dark.

## Direction contract

THESIS: The developer is the artist and the projects are the records. A 1956-67 Reid Miles jazz sleeve system: huge cropped condensed grotesque, duotone photography, flat full-bleed colour fields, liner notes on the back. Refuses the dark-navy card grid and the centred headline over cards.

OWN-WORLD: Sleeve-white paper (#F5F5F2) and pressing black (#111). One colour per record: lagoon blue #0E6BA8 (identity + actions), volcano orange, cane green, hibiscus red. Archivo variable, condensed 900 for display, normal width for text. Hairline rules, square corners, no shadows, no cards, no badges; states print as text.

STORY: The visitor sees the name and role as a record cover, flips through four sleeves whose backs list role, personnel (stack) and impact, reads the credits (expertise) and the discography (career) as one continuous dated line, then books the session (contact) or takes the CV.

FIRST VIEWPORT: Desktop: name and nav strip on top; FULL / STACK / SENIOR at about 250px condensed black, the second line in lagoon blue, the word block running over a duotone blue portrait that fills the right 43% full height; tagline and black "Voir les projets" button at bottom left; vertical catalogue reference on the spine edge. Mobile: duotone portrait full-bleed in the top 58%, the three words overlapping its lower edge, tagline, full-width action, bottom tab bar.

FORM: Jazz sleeves (Reid Miles school), position 7 of the ordered list, seed key b9638b75 (re-roll 1). Signature interaction: the record slides half out of its sleeve on hover/focus (desktop) and on the active slide (mobile shelf). Motion grammar: one clock, 420ms cubic-bezier(.2,.8,.2,1); the hero words rise once from a mask on load; everything visible by default; reduced motion removes all movement.

Raises: scroll-snap shelf on mobile (cereal aisle); career as one continuous dated line (provenance ribbon); states printed as text (phosphor terminal); one motion clock (algorave).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
