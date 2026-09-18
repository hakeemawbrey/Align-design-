# Agent H — Wave 3 notes

Row y=5900 in section `937:1924`. All screens 390×874, fills copied from S-05
(variable binding `935:857` preserved), starfield `1378:1919` clone at the
bottom, status bar `1379:1915` + home indicator `1384:1928` clones, holo button
`1387:1915` clone with the label rewritten and the trailing `✦` kept as its own
SF Pro Regular 15 range. Renders in `scratchpad/cut/w3H_*.png`.

| screen | node | frame | accent % | haze % | gate |
|---|---|---|---|---|---|
| O-03b — Age Blocked | `1478:855` | none | **0.00** | 0.00 | < 1 ✓ |
| O-03c — No Birth Time | `1481:944` | instance `1481:1016`, top @0.35 | **0.14** | 11.63 | ≤ 3 ✓ |
| O-03d — Waitlist | `1515:855` | none | **0.00** | 0.20 | ≤ 3 ✓ |
| O-15 — Resume Onboarding | `1516:855` | none | **0.12** | 0.36 | < 1 ✓ |
| S-11 — Align+ Paywall | `954:1924` (existing) | instance `1516:947`, top teal @0.8 | 7.73 → **18.87** | 18.46 → 24.57 | ~20 ✓ |

## O-03b — Age Blocked (x=4130) · `1478:855`
Source clone `134:102`. Flat ground, starfield, no frame, no aurora. Eyebrow
`AGE CHECK · ALIGN IS 18+` (y=288), headline *The stars will / still be here.*
(EB Garamond Italic 30, y=312), one sentence folding the source's two body
blocks into one: "Align matches adults, so you need to be 18 — and if the year
you typed is wrong, that is the usual culprit." Single secondary pill
`Pill · Check my birth date` `1478:934` in the CTA slot (38,668 314×54 r999,
`#FFF9F2` @0.07 fill, @0.26 stroke w1, EB Garamond Medium Italic 18 cream
@0.92). No holo, no chevron — the pill is the only way out.

## O-03c — No Birth Time (x=4580) · `1481:944`
Source clone `134:149`. Frame instance `1481:1016` inserted directly above the
starfield; top aurora `I1481:1016;1473:857` opacity **0.35** (violet `#8B4CB8`
unchanged); bottom warm aurora left as the component ships. Measured 0.14% with
both on, so the bottom stayed. Back chevron cloned from O-03 `1019:2461`.
Structure (Stardust `other-tabs_23` form): eyebrow `STEP 3 · IF YOU DO NOT
KNOW` → headline *We can read you / without the minute.* → sub (rewritten for
the picker: "Pick the part of the day you were born and we place your Rising
within a sign or two. Your Sun and Moon are exact either way, and they carry
most of the match.") → caps label `ROUGHLY WHEN` → `Segmented · time of day`
`1481:1028` (350×44 at 20,344, `#31167A` r999; cream thumb `#E6EED6` 81.5×38
inset 3 on MORNING; labels SF Pro Semibold 11 ls 8%, selected `#31167A`,
others `#EFE6D6` @0.7) → readout "Morning puts your Rising in Aquarius or
Pisces." (SF Pro 12 @0.55) → underlined link `I don't know` `1481:1035` → holo
`Estimate my Rising ✦` `1481:1036` at 668 → reassurance "Add the exact time
later in Settings and we recast you." @0.5. The source CTA "Use noon, estimate
it" no longer fits once the user picks a quarter of the day, so the label
changed; the noon assumption is what `I don't know` now stands for.

## O-03d — Waitlist (x=5030) · `1515:855`
Source clone `209:429`. No frame. Hero: `aura lobe · Taurus (dim)` `1515:931`
(ellipse 120×120 at 135,240, radial `#8FC24B` 0.6→0, LAYER_BLUR 30) inside
`rings · waiting` `1515:935` (three stroked ellipses r60/95/130 centred at
195,300, `#FFF9F2` @0.2 w1, group opacity 0.5). Copy below the rings: eyebrow
`YOUR CITY · NOT LIT YET` (y=450), headline *Tulsa has / no sky yet.* (472),
sub (560), caps `YOU ARE NUMBER 344 · ELEVEN MORE AND WE LOOK AGAIN` (632),
holo `Tell me when it opens ✦` `1515:940` (668), reassurance "Houston is live.
Your card works there the moment you arrive." (742). First pass had a
four-line sub ending at 636 with the counter at 642 riding the CTA; sub cut to
three lines ("…so we light cities one at a time. Yours is cast and saved; when
Tulsa lights, you deal first.") and the counter re-seated at 632. Accent 0.00%
— the lobe is dim enough that the scorer's s>0.5/v>0.5 gate never trips;
visually it still reads as one green Taurus ember in a target.

## O-15 — Resume Onboarding (x=5480) · `1516:855`
Source clone `749:869`. Flat breather. Eyebrow `YOU LEFT MID-CAST` (288),
headline *The sky saved / your place.* (312), one line "Three steps cast, three
to go. Pick up exactly where you put the sky down." (400). `Progress · chakra
ladder` `1516:934` cloned from O-03 `1134:8044` at 39,470; steps 1–3 lit in
chakra order red `#ff1616` / orange `#ff8a1f` / yellow `#ffd23f` @0.95 with the
same r8 drop shadow recoloured per step, steps 4–6 left at `#efe6d6` @0.22.
Caps `STEP 4 OF 6 · PROGRESS SAVES AFTER EVERY STEP` (486). Holo `Resume my
chart ✦` `1516:942` (668), text link `Start my chart over` @0.6 (742). The
source said "step 8 of 14"; the ladder in the file has six rungs, so the
count follows the ladder. Accent 0.12% — the three lit rungs are the only
colour and they stay under the breather gate.

## S-11 — Align+ Paywall (existing `954:1924`)
Frame instance `1516:947` inserted at index starfield+1 (below `content`,
above the six existing atmosphere ellipses and the starfield). Top aurora
`I1516:947;1473:857` fill rebuilt as the same 4-stop radial in teal `#44BEA2`
(0.95/0.84/0.42/0), ellipse opacity 0.8; bottom warm `#C48F46` left as
shipped. Nothing else touched. 7.73% → 18.87% accent, haze 18.5 → 24.6 (teal
on the violet ground is a >28° hue departure, so the scorer counts the whole
field as haze — expected for this screen). Field now reads blue-green at the
top falling to warm at the CTA, matching Stardust's paywall gradient.

**Holo CTA against the teal:** it does not read too loud. The pearl button
sits over the warm bottom aurora, not the teal, so it reads the same as
before; what does jump is the gold medallion, which now sits directly on the
teal and becomes the loudest thing on the screen (gold on teal is a
complementary pair). If anyone wants the commercial register desaturated,
the medallion is the lever, not the button. Also worth a look: the lavender
sub `#b3a6c4` loses some contrast on the teal band — left alone per brief.

## Unsure / for review
- O-03c keeps the bottom warm aurora on; the gate text says "top aurora only"
  but the measured 0.14% is well under 3%. Hide `aurora · bottom` on
  `1481:1016` if the rule is meant literally.
- O-15 lights three rungs; if O-15 should read as a pure breather with zero
  colour, set steps 2–3 back to the unlit fill (accent would go ~0.05%).
