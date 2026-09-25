# Wave 6 — onboarding, the second pass · agent brief

Three agents (R, S, T), disjoint screen lists, all in section **Onboarding**
(`1554:855`). **Never edit a node outside your list, never edit the kits or
the aurora component `1473:856`.** No git. Notes to
`design/wave6/agent-<letter>.md` only. Read `design/wave5/BRIEF.md` first
(tool loading, gotchas, the checklist, the tile recipe, scoring). Budget is
not a constraint: screenshot, read, fix, re-screenshot, score, every screen.

## Why

Onboarding was the first thing built, before the founder's boards, the
aurora frame, the spheres, the crisp mystery aura and the card language
existed. Wave 5 fixed its clip-art and blobs. What is left is **rhythm**.
Stardust's onboarding (cached stills `scratchpad/stardust-cache/onboarding_*`)
is metronomic: the chevron, the headline, the sub, the hero band and the
button sit at the same height on every screen, so the flow reads as one
thing. Ours moves the headline between y 118 and y 330, shows the back
chevron on some steps and not others, and the progress ladder on two screens
out of twelve. The founder: "it's almost there."

## The rhythm — measured from Stardust, transposed to our 390×874

Every step screen (`O-03` → `O-13b`, and the twelve `O-05` reveals) lays out
like this. Only the hero changes.

| element | spec |
|---|---|
| status bar | `1379:1915` clone, y 0 |
| back chevron | `‹` at x 26, y 68 (the one on O-03, `1019:2461`) — on **every** step after O-02; optional `Skip` at right, SF Pro Regular 13 cream @0.6, same row |
| eyebrow | SF Pro Semibold 10, letter-spacing 14%, cream @0.5, centred, **top y 104** |
| headline | EB Garamond Italic 30–33, cream `#F5EFE2`, centred, **top y 120**, max 2 lines |
| sub | EB Garamond Regular 17.5, `#B3A6C4`, centred, **top y 178**, max 3 lines, ends by y 240 |
| hero band | **y 250 → 600**: one subject (tile, sphere, wheel, card) or the control (picker, chips, rows), centred |
| progress ladder | `Progress · chakra ladder` from O-03 (`1134:8044`) cloned, x 39, **y 623**, on every step; the lit segment = the step number |
| CTA | pearl holo `1387:1915`, x 38, **y 668**, 314×54, label + `✦` |
| secondary | text link at **y 742**, SF Pro Regular 14 `#7D6F94` @0.78 (or cream @0.6 for a real action), centred |
| legal | y 770, SF Pro 11 @0.5, centred, only where needed |
| aurora | exactly one instance of `1473:856` directly above the starfield; top colour = the hero's hue (override the `aurora · top (headline)` child's fill); no other screen-level glow ellipses |
| home indicator | `1384:1928` clone, y 858 |

Exceptions: `O-01` (breather, mark only), `O-02` (welcome: hero on top,
headline at y ~330 like Stardust's welcome `onboarding_02`), `O-06` and
`O-15` (breathers: no aurora, no hero, headline at y 120, one CTA), `O-03b`
/ `O-03c` / `O-03d` (utility ≤ 3%: frame at low alpha or off, no hero).

## Per screen

1. Screenshot at 874, **Read it**, then screenshot the Stardust counterpart
   from the cache (the map below) and Read that. Write two lines: what
   Stardust's screen does that ours doesn't, and vice versa.
2. Dump the screen's top-level nodes (name, x, y, w, h) and move each element
   to the spec above. Text `resize()` resets auto-resize: re-set
   `textAutoResize='HEIGHT'`. `text.height` is stale after edits — use
   `absoluteRenderBounds` or count lines.
3. Subject test (name the hero in three words from the thumbnail). If the
   hero is weak, strengthen it with the Wave 5 recipes (aura/figure tile
   with feathered mask, sharp sphere, hairline geometry). Never clip-art,
   never a blurred blob.
4. Copy: second person, present tense, specific, faintly savage, ends on a
   turn; headline ≤ 2 lines, sub ≤ 3 lines; account = Hakeem / Taurus /
   Tulsa OK · May 4 1994 · 3:52 PM; no ♈–♓ typed glyphs.
5. Re-screenshot, Read, score (`scratchpad/score.py`). Record before/after
   accent and haze, and the element positions you changed.

Stardust counterparts: O-02 ↔ `onboarding_02`; O-03 ↔ `onboarding_09`;
O-03b/c/d ↔ `onboarding_03`, `onboarding_11`; O-04 ↔ `onboarding_14`; O-05 ↔
`other-tabs_25`/`26`; O-06, O-15 ↔ `onboarding_07`; O-07 ↔ `onboarding_15`,
`other-tabs_22`; O-08 ↔ `onboarding_11`; O-09 ↔ `onboarding_04`,
`onboarding_29`; O-10 ↔ `other-tabs_42`; O-11 ↔ `onboarding_16`; O-12 ↔
`onboarding_19`, `onboarding_23`; O-13 ↔ `onboarding_04`; O-13b ↔
`onboarding_29`, `other-tabs_36`. Up to 40 Appllama credits each for fresh
comparisons if the cache doesn't answer a question.

## Notes file

`design/wave6/agent-<letter>.md`: one block per screen — node id, the two
A/B lines, what moved (element: from → to), hero change if any, accent/haze
before → after. End with anything you left alone on purpose.
