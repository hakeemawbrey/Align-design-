# Agent B — chat screens (section 937:1924)

File `tj4UC3bpikhe8u1TL0kA35`. Seven screens, each edited with one small
`use_figma` script that lists by id, checks parent, then sets `visible=false`.
Nothing deleted, nothing moved, no fills touched. Avatar disc (IMAGE fill),
starfield, bubbles, expiry eyebrow + rail, state strips, input bar, tab bar,
home indicator, and the collapsed COSMIC ALIGNMENT header on S-09 untouched.

## Decision: hide, not dim
Hero glow hidden outright (`visible=false`), not set to 0.12 opacity. The
header does not go dead: the avatar disc carries its own halo (part of the
IMAGE art), and the name + chevrons sit fine on flat near-black. Dimming
would have kept a violet wash behind the whole top third for no gain.

Also hidden: the screen-level `glow · violet` and `glow · gold` ellipses
(0.06 opacity solids). Not in the task's per-screen list, but the brief names
them explicitly as instrument-screen ambient glows to remove, and they sat
directly under the hero glow on every chat screen.

## Screens

| screen | node | hidden (ids) |
|---|---|---|
| S-09 Chat | 1019:2140 | hero glow · Libra 1066:1928, glow · violet 1019:2141, glow · gold 1019:2142, geometry · vesica 1405:1925 |
| S-09b Chat · Alignment | 1028:8119 | hero glow · Libra 1066:1929, glow · violet 1028:8120, glow · gold 1028:8121 — **no `geometry · vesica` exists on this screen** (checked by name; the vesica rings inside `sheet · Alignment` are the sheet's subject, left alone) |
| S-09c sent, unread | 1405:1928 | 1405:1929, 1405:1930, 1405:1931, vesica 1405:2009 |
| S-09d typing | 1405:2087 | 1405:2088, 1405:2089, 1405:2090, vesica 1405:2168 |
| S-09e not sent | 1405:2246 | 1405:2247, 1405:2248, 1405:2249, vesica 1405:2327 |
| S-09f expiring | 1405:2405 | 1405:2406, 1405:2407, 1405:2408, vesica 1405:2486 |
| S-09g closed | 1405:2564 | 1405:2565, 1405:2566, 1405:2567, vesica 1405:2645 |

## Accent (score.py, 874px render) — before → after

| screen | before | after |
|---|---|---|
| S-09 | 0.48 | 0.48 |
| S-09b | 0.35 | 0.35 |
| S-09c | 0.35 | 0.35 |
| S-09d | 0.36 | 0.36 |
| S-09e | 0.43 | 0.43 |
| S-09f | 0.57 | 0.57 |
| S-09g | 0.22 | 0.22 |

All seven were already under the 1% target and stay there (mean 0.39%). The
metric did not move because the hero glow and vesica were dark/desaturated
(s>0.5 & v>0.5 never triggered). The **render** changed a lot: the violet
wash behind the header and the 0.14-opacity vesica rings behind the thread
are gone; the ground is now flat near-black with only the starfield.
Renders in scratchpad `cut/S09*_before.png` / `cut/S09*_after.png`.

## Status strips (S-09c–g) — still the coloured thing?
Checked by band-counting saturated pixels on the after renders.
- S-09d (green "JUNIPER IS TYPING"), S-09e (orange "NOT SENT"), S-09f
  (orange "FALLS OFF ALIGNMENT" + orange eyebrow/rail), S-09g (blue "THIS
  CONNECTION CLOSED"): the strip is the only saturated *state* colour on the
  screen and reads as the subject of the state. Yes.
- S-09c: the strip is intentionally neutral grey-lavender ("SENT · NOT READ
  YET"), so it carries no accent by design. Nothing else new competes with it.
- Caveat, all five: the largest saturated pixel mass on every chat screen is
  the red keyline stroke on Juniper's bubbles (~1.6k px at 390×874, hue
  0–30°), then the avatar disc (IMAGE), then the gold send button + Matches
  tab glyph. Bubbles were on the keep list so I left them. If the chat is
  meant to carry colour only from state, the bubble stroke is the next
  candidate for a later wave — flagging, not acting.

## Unsure / flags
- S-09b has no screen-level vesica; the vesica-like figure is inside the
  Alignment sheet and is that sheet's subject, so untouched.
- S-09g's `rail · expiry` and `eyebrow · expiry` were already hidden before
  I started (closed state) — not mine, left as found.

## Follow-up — Juniper's bubbles (coordinator request)

Wave 1 rule: the status strip is the only state colour on a chat screen.
The ember fill (#47130E) + red keyline (#FF5A3D @0.34, 1.75) on `bubble ·
them` was the whole haze mass. On all seven screens, every `bubble · them`
(left edge x=0, FRAME with a TEXT child, inside `thread`) is now a flat
`#2B1E4C` @100% with its red stroke paint set `visible:false` (paint kept,
not deleted — reversible). No edge stroke added: the panel reads against the
near-black ground without one, same as `bubble · you` always has.
`bubble · you` (#34235F, no stroke) left as found. No text, avatar, strip,
eyebrow or rail touched.

Ids changed (them bubbles): S-09 1027:1950/1954/1958/1962 · S-09b
1028:8252/8256/8260/8264 · S-09c 1405:2062/2066/2070/2074 · S-09d
1405:2221/2225/2229/2233 · S-09e 1405:2380/2384/2388/2392 · S-09f
1405:2539/2543/2547/2551 · S-09g 1405:2698/2702/2706/2710.

S-09b note: its them-bubbles were already neutral (#1E1240, no stroke) under
the sheet scrim; set to #2B1E4C anyway so the base screen matches the others.

### Mistake, caught and reverted
First pass used `x < 200` to pick "hers". That also caught the two wide
`bubble · you` frames per screen (x=84, right-aligned to the edge), so their
fill was briefly set to #2B1E4C on S-09/b/c/d/f/g. Reverted to their original
`#34235F` @100% by id and re-verified on all seven threads (they had never
carried a stroke). Corrected filter: `name === 'bubble · them' && x < 40`.
S-09e's first script was denied by the permission gate, so it got only the
corrected pass — one edit, no revert needed.

### Haze (score.py new column) — before → after2; accent alongside

| screen | haze before | haze after2 | accent before → after2 |
|---|---|---|---|
| S-09  | 17.34 | 0.18 | 0.48 → 0.12 |
| S-09b |  0.35 | 0.35 | 0.35 → 0.35 |
| S-09c | 12.34 | 0.18 | 0.35 → 0.12 |
| S-09d | 12.40 | 0.25 | 0.36 → 0.13 |
| S-09e | 12.47 | 0.31 | 0.43 → 0.20 |
| S-09f | 12.74 | 0.58 | 0.57 → 0.34 |
| S-09g | 12.49 | 0.19 | 0.22 → 0.22 |

All under the ~2% haze target (mean 0.29%, vs Stardust journal 0.05%).
Remaining haze is the status strip + eyebrow/rail (S-09f orange is the
highest, as it should be), the avatar disc and the gold send/Matches glyphs.
Hue count dropped 2 → 1 on S-09/c/d/e/f: the red family is gone.

Renders read (S-09, S-09e): the thread still reads as two people — avatar
in the header, her panels left, yours right and a step lighter. On S-09e the
orange NOT SENT strip is now the only colour in the frame. Files:
`cut/S09*_after2.png`.
