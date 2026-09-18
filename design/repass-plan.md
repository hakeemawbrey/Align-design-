# The re-pass — every screen, one style, few tokens

Written at the pause. The style matured over four waves; the screens built
first (the original bespoke batch and the Guidance section) predate the
founder's boards, the aurora frame, the flat instrument ground and the
component set, so they drift from the later ones. This is the plan to bring
all 109 into line **without** the token cost of the waves.

## Where the tokens went

The waves cost roughly 60–180k tokens per agent. Almost all of it was three
things: **reading rendered screenshots** (one image per screen, several
versions each), **per-agent notes files** written long, and **discovery** —
each agent dumping node trees to find what to change. The building itself
was cheap.

## The lean method: lint, don't look

1. **One lint script, run once.** A single `use_figma` call walks every
   390×874 frame in `937:1924` and checks the rules below programmatically,
   returning **only violations** as one compact line per screen
   (`S-05 · glow visible: glow · gold · aura not IMAGE · stroke off-sign`).
   No screenshots. ~2k tokens for the whole file instead of ~2k per screen.
2. **Fix by rule, not by screen.** One script per rule applied across every
   violating screen (hide all visible ambient glows; retint every card stroke
   to its sign; instance the frame on every onboarding screen missing it).
   Five or six scripts cover the file.
3. **Look once per section.** After fixes, one contact-sheet screenshot per
   sub-section (12 images total, ~3× cheaper than 109 singles), read at
   reduced size. Score with `design/assets/score.py` on the sheet tiles.
4. **No per-agent notes.** One table in `scores.md` at the end. If agents
   are used at all: two, not four, with the lint output as their whole brief
   and screenshots forbidden except the final sheet.

## The rules the lint checks (all derived from the docs)

| rule | zone | check |
|---|---|---|
| no ambient glow | instrument, utility | no visible ELLIPSE named `glow`/`aurora`/`bloom`/`hero glow` at screen level (S-07, S-08 blooms exempt) |
| no geometry | all but A-01, S-17c/S-13/G-19/G-18/O-03d rings | no visible `seed`/`flower`/`vesica`/`geometry` frame |
| frame present | onboarding + paywall beats | an INSTANCE of `1473:856` directly above the starfield |
| frame absent | everything else | no such instance |
| aura is art | any card/avatar | every node named `aura`/`avatar`/`orb` has an IMAGE fill from kit `1426:855` |
| stroke matches sign | cards | card stroke core colour = the sign of the aura tile inside it |
| holo canonical | all | every `Holo button` has the 4-stop pearl gradient and a `✦` in SF Pro |
| bubbles neutral | chat | no bubble fill outside `#2B1E4C` / `#34235F`, no coloured stroke |
| identity | all text | no `Gemini`/`Aries` as the account; `GEMINI MOON` on Juniper's card is correct |
| glyphs drawn | all | no TEXT containing ♈–♓ characters |
| type | all | headline EB Garamond Italic, eyebrows SF Pro Semibold ls ≥ 8%, no stray fonts |
| components | utility | rows/headers/pills are instances of `1529:860` / `1529:858` / `1529:855` |

## Screens most likely to fail

The first bespoke batch and Guidance: S-05 and its states (foil card
predates the boards — keep the card, check strokes), G-09, G-05, S-14 Sky,
S-15 Calendar, S-20 Glossary, S-17b, S-11, O-01, G-18, G-19, S-16, and the
five Guidance chart screens (built before the frame existed — they are
oracle, not onboarding, so no frame, but their glows should be the spotlight
recipe from `aura-system.md` §7, not the old washes).

## Order

1. Confirm the last six screens landed (S-01, S-17c/d, S-18/b/c); build if not.
2. Run the lint. Read its one-page output.
3. Fix by rule (≤ 6 scripts).
4. Twelve contact sheets. Score. One table in `scores.md`.
5. Then, and only then, the remaining plan waves: the other nine figures
   (Wave 5) and stateful hue (Wave 6).

Budget for the whole re-pass at this method: well under one wave's cost.
