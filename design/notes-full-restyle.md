# The full-app restyle

## What the file actually contains

The Stardust page is not 22 screens. It holds:

| | Count |
|---|---|
| Cloned screens, by flow section | **93** |
| Bespoke redesigns in `✦ STARDUST` | 22 |
| Archived (cut in the v1 simplification) | 20 |

The 22 and the 93 overlap — the Deck, Sky, Matches and so on exist in both, once
as a bespoke rebuild and once as an old clone.

## Two different kinds of screen, and they are not interchangeable

The 22 are **hand-built Figma layers**: named frames, real auto-layout, an aura
per entity, the deck motif, the seed of life.

The 93 are **HTML-derived div soup** — nested frames literally named `div`, pure
black `#000000` grounds, vertical auto-layout everywhere, and `clipsContent`
false on every screen frame. They were imported, not designed.

That difference is why a blanket pass is not the same thing as a redesign, and it
is worth being plain about: **the 93 now carry the visual language, not the UX
rework.** Ground, light, stars and geometry are applied and consistent. The
per-screen thinking that went into the 22 — what the screen is for, what one
question it asks, what it withholds — has not been done for them.

## The pass, and the three ways it failed first

Applied to all 93: black ground lifted to `#12052D`, two chakra auras rotated per
screen so no two neighbours repeat, ~70 stars in two populations placed only
where no text is, and one sacred-geometry figure (vesica, seed, or concentric)
in the largest clear region.

**Failure 1 — glows escaping the frame.** Screen frames have `clipsContent`
false, so blurred auras rendered as coloured blobs floating over the canvas
between screens. Fixed by putting everything in an `atmosphere` frame that clips.

**Failure 2 — atmosphere landing in empty space.** 11 of 93 screens have their
content at an offset (8 in Guidance sit at `y=874`, outside the frame's own
bounds; 3 in Notifications elsewhere). The atmosphere went to `y=0` and sat in
the void above the artwork. Fixed by parenting it to the content block rather
than the screen.

**Failure 3 — content shoved out of view.** The content blocks are `VERTICAL`
auto-layout. Inserting the atmosphere as a normal child pushed every sibling down
by 874px and blanked eight screens. They were restored, then the atmosphere was
re-added with `layoutPositioning = 'ABSOLUTE'` so it sits outside the flow.

**The rule that matters for anything touching these clones:** never insert into
an imported `div` without checking `layoutMode` first, and set
`layoutPositioning = 'ABSOLUTE'` when it is not `NONE`.

## Honest status

- 93 screens: visual language applied, verified by section.
- 22 screens: bespoke, with UX rework.
- The remaining work on the 93 is per-screen UX, which is the part the founder
  has said is weakest, and it is the part a mechanical pass cannot do.
