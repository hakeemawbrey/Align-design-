# Wave 4 — utility · agent brief

Four agents (I, J, K, L), disjoint screen lists, one row each in section
`937:1924`. **Never edit a node outside your list.** No git. Notes to
`design/wave4/agent-<letter>.md` only. Read `design/wave1/BRIEF.md` first
(file key, tool loading, gotchas, scoring), then `design/wave3/BRIEF.md`
§"Shared furniture" and §"Type" — they apply here too.

## Why

Stardust's settings, forms, legal and account screens carry **no theme at
all** — no aurora, no art, no starfield glow — and run under 1% accent. The
theme survives there only in the **words** (their blocked-users section is
headed `YOUR ORBIT`). Loading is a plain grey skeleton. Destructive actions are
one full-width red pill. See `design/stardust-teardown.md` §3 and §6.

## Components — instance these (all in `Kit · Onboarding frame`, `1473:855`)

- `Section header · caps` **`1529:858`** — caps eyebrow, the voice lives here
- `Row · list` **`1529:860`** — 350×44, panel `#2B1E4C` r12, label + `›`
- `Pill · destructive` **`1529:855`** — 314×54 red `#E5322D`
- `Skeleton · block` **`1529:857`** — grey block for loading states
- pearl holo `1387:1915` (primary only; most utility screens have ONE action)
- status bar `1379:1915` · home indicator `1384:1928` · starfield `1378:1919`
  (starfield allowed at reduced opacity 0.5; no auroras, no glows, no geometry)
- aura tiles `1426:855` for any avatar disc (IMAGE fill, `FILL`)

Instance: `(await figma.getNodeByIdAsync('<id>')).createInstance()`; to
change a label on an instance, find the TEXT child, load its font, set
`characters`. To make a row's value column, add a right-aligned SF Pro
Regular 13 text at x≈220 w=100 cream @0.6 before the `›`.

## Screen anatomy

```
status bar → header (‹ back at x24 y62, or × at right) + centred title
(SF Pro Semibold 13 cream @0.85 for utility; EB Garamond Italic 26 when the
screen has a headline) → caps section header → rows (8px gap) → … →
ONE primary action (holo) or ONE destructive pill → home indicator
```
Forms: fields are `Row · list` instances with the value as placeholder text
cream @0.4. Toggles: a 44×26 pill `#31167A` with a cream 22px knob at right
when on, `#2B1E4C` with knob at left when off. Legal text: SF Pro Regular 13
`#EFE6D6` @0.8, 22px line height, left-aligned, 24px margins.

## Copy

Comes from the clone page: read the source frame's TEXT nodes and reuse the
copy, correcting any Gemini/Aries reference (account = Taurus, Juniper =
Libra). Section headers may be rewritten in the voice: `YOUR ORBIT` (blocked
people), `YOUR CHART`, `THE DECK`, `APP`, `GET IN TOUCH`, `YOUR DATA`.
Empty-state and error copy stays kind and specific; never themed.

## Gate

Every screen **< 1% accent** (the only exceptions: a red destructive pill,
an avatar tile, a state dot on a notification row, G-14 Trial Ending which is
a paywall beat and may go to 20% with a warm aurora). Score each, Read each
render, record before/after and node ids in your notes.
