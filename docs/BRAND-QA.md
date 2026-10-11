# Align brand QA spec

The rules every screen is checked against. The canvas is a 390 × 844 phone
(`#phone`), dark indigo, built from the tokens in `app/src/index.css`
("Stardust language").

## Colour

- Surfaces are indigo, never black or grey: `--void`, `--canvas`, `--raised`,
  `--raised-alt`, `--glass`, or rgba of those (e.g. `rgba(40,26,78,0.75)`).
- Text is warm bone, never pure white: `--label-1` (primary), `--label-2`
  (secondary), `--label-3` (tertiary / hints), `--label-4` (disabled).
- **Every button and button-like pill is pearl foil**: `var(--chrome)` with
  `var(--chrome-ink)` text. The big CTA uses `.chrome-cta`. Secondary actions
  are quiet: transparent or glass with a hairline border, `--label-1` text.
- **No gold buttons, gold pills or gold badges anywhere.** Gold (`--gold-foil`,
  `#f2c75c`, `#f2d58a`) is only for card finishes (gilded / rare frames, card
  corners and gilt), small accent glyphs (✦) and the `--align` reading colour.
- Reading colours: push `--rub`, pull `--spark`, align `--align`.
- Badges and counters on tabs / icons: pearl (`--chrome`), except the red
  "new" dot (`--rub`).

## Type

- Screen titles: `.h-display` (EB Garamond italic). 30–36px for a screen
  title, 26px in a bottom sheet.
- Eyebrows / labels: `.eyebrow` or `.mono` with uppercase and letter-spacing
  (0.14–0.24em), 8.5–10px.
- Body: sans, 13–15px, `--label-1` or `--label-2`, line-height ~1.35–1.45.
- Card titles and names: serif italic.
- Nothing smaller than 7.5px except printed details on cards.

## Spacing and layout

- Side gutter: **24px** for screen content (cards, lists, titles). Full-bleed
  art is fine.
- Back button: 40 × 40 at `left: 16, top: 56`, chevron 11 × 18.
- Screen title block starts ~100px from the top on sub-screens with a back
  button (eyebrow, then title 8px below, then body 8px below).
- Sections: eyebrow label 18–24px above its content, 8px gap to the content.
- Cards / rows: radius 16 (panels), 18–20 (big cards), 999 (pills); padding
  12–16px; 1px hairline border `rgba(179,166,196,0.16–0.25)`.
- Bottom sheets: radius `26px 26px 0 0`, 40 × 4 handle 12px from the top,
  backdrop `rgba(5,2,15,0.55–0.6)`.
- Anything scrolling above the floating tab bar needs ≥ 112px bottom padding;
  nothing important may sit under the tab bar (bottom 22, height 62).
- Touch targets ≥ 30px tall for pills, ≥ 38px for icon buttons.
- No overlaps, no clipped text, no text running into another element, no
  awkward single-word wraps in titles, no horizontal overflow beyond 390px.

## Motion and feel

- Spring transitions (framer-motion), nothing linear except ambient loops.
- Every tap makes a sound (`sfx.tap()` or a more specific sfx).
- Toasts: pill, glass background, centred, above the tab bar.

## Voice

- Plain and practical. Short sentences. Sentence case for body, uppercase
  only in mono eyebrows. No jargon, no exclamation-heavy hype.
- Buttons say what happens ("Open packs", "Play it to Juniper").
