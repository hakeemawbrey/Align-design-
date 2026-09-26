# Wave 5 — the visual re-pass · agent brief

Five agents (M, N, O, P, Q) work the same Figma file in parallel on disjoint
screen lists. **Never edit a node outside your list**, never edit the kits or
the aurora component. No git. Notes to `design/wave5/agent-<letter>.md` only.
Read `design/wave1/BRIEF.md` (tool loading, plugin gotchas, scoring loop),
`design/wave3/BRIEF.md` §"The frame", §"Shared furniture", §"Type", and
`design/aura-system.md` §6–7 (the tiles and the placement recipe) before you
touch anything. Budget is not a constraint this wave: screenshot every
screen, read every render, fix properly, re-screenshot, score.

## Why this wave exists

The founder reviewed the file on his phone and called several screens
"weird". Looking at what he flagged, the failures were all the same four
things, and the lint-only re-pass could not see any of them:

1. **Vector clip-art.** A door drawn from rectangles with a key made of
   rects; rings with a lobe; a drop icon. Next to the founder's aura photos
   this reads as stock illustration. Anything drawn from primitives that is
   pretending to be an object is clip-art.
2. **Blurred blobs.** A big radial gradient with a 40–150px blur standing in
   for a planet or a hero. It has no edge, so it reads as a smudge.
3. **The aurora as a wall.** Full-opacity aurora covering half the screen.
   Stardust's is a spotlight that fades before mid-screen.
4. **Oracle screens with no hero.** The horoscope had a wheel of dots and no
   subject at all.

Fixed exemplars — screenshot these first and hold your screens to them:

| screen | node | what to copy |
|---|---|---|
| O-03 Birth Data | `1019:2354` | the aurora component as a spotlight, nothing else at screen level |
| S-15 Cosmic Calendar | `1017:2386` | a planet as an 88px sharp sphere (offset-centre radial, inner shadow, one drop shadow, hairline tilted ring) |
| S-12 Trial Active | `1539:8338` | an object (the door) as an arch-shaped mask over an aura tile, hairline rim, sill light — photographic, not drawn |
| S-13 Wait for Reset | `1540:855` | aura tile (SCREEN, feathered mask) inside hairline rings, dark well under the text |
| S-14 Sky · today | `1046:1928` | oracle hero: aura tile behind the wheel, dark well under the readout |
| P-02 Priority Queue | `1547:855` | avatars as aura tiles on a hairline orbit with slot ticks |

Render strip of all six: `design/assets/fix-pass-strip.png`.

## The checklist — apply to every screen on your list

Screenshot at `maxDimension: 874`, curl it, **Read it**, then answer:

- **Subject test.** Name the subject in three words from the thumbnail, no
  reading text. Oracle/onboarding screens must score 4–5 ("a glowing bull",
  "a gold door"). Instrument screens score on the card/tile. Utility screens
  have no subject and should not try to.
- **Clip-art?** Any illustration built from rects/ellipses/vectors that is
  standing in for an object (key, door, drop, envelope, phone, shield, hands,
  lock, bell). Replace with: an aura/figure tile via the §7 recipe (masked to
  a shape if the object matters — the door is an arch), a sharp lit sphere
  for a planet/moon, hairline geometry (rings, orbits, constellations of 1px
  lines and 3–5px dots), or nothing — let the type carry it. SF Symbols-style
  single-stroke glyphs at ≤ 24px in a row or tab bar are fine.
- **Blob?** Any visible ELLIPSE with a radial fill and blur ≥ 30 standing
  alone as a hero or planet. Replace per above. Ambient blooms *behind* a
  tile (a "well" or a rim-coloured spotlight at ≤ 0.7) are allowed on oracle
  and celebration screens only.
- **Aurora wall?** Onboarding/paywall screens carry exactly one instance of
  `1473:856` directly above the starfield and no other screen-level
  aurora/glow ellipses. If a screen has the instance plus its own old
  ellipses, hide the old ones. Do not edit the component itself.
- **Zone accent.** Onboarding 15–25%, oracle 12–22% (one hero), instrument
  1–4%, utility < 1%, breather < 1%. Score with
  `python3 /tmp/claude-0/-home-user-Align-design-/56f83edd-3da9-5a08-9ea1-18b4c42dbae2/scratchpad/score.py <png>`
  (prints accent, haze, light, contrast). Haze above ~20% on a non-onboarding
  screen means a wash is still on.
- **Identity.** Account = Hakeem, Taurus, born Tulsa OK · May 4 1994 · 3:52
  PM. Match = Juniper, Libra (Gemini Moon — correct on her card). No Gemini or
  Aries as the account anywhere; no sign glyph visible in a tile that is
  standing in for a non-sign object (crop it out, as the doors do).
- **Furniture.** Status bar, home indicator, tab bar where the source has
  one, pearl holo with its `✦`, EB Garamond Italic headlines, SF Pro
  everything else. Typed ♈–♓ characters render as emoji: draw or use a tile.
- **Stardust A/B.** For every screen pick the nearest Stardust still in
  `scratchpad/stardust-cache/` (see `INDEX.md` there) and put the two side by
  side in your head: is ours as clean, is the one coloured thing ours as
  well-formed? You may also spend **up to 40 Appllama credits** per agent on
  fresh comparisons (`mcp__Appllama__search_screens`, `get_screen`,
  `list_app_screens` for Stardust app id `1495829322`, or Co–Star / Hinge /
  The Pattern for dating and astrology patterns). Load with `ToolSearch`
  `select:mcp__Appllama__search_screens,mcp__Appllama__get_screen,mcp__Appllama__list_app_screens`.
  Record what you looked at and what it changed.

Fix, re-screenshot, Read again, score again. Do not stop at "better"; stop at
"nothing on this screen would make the founder say weird".

## Building with tiles — the recipe, exactly

```js
// feathered aura tile group, SCREEN, centred at (cx,cy), inserted at index idx of parent
const tileSrc = await figma.getNodeByIdAsync('1426:857'); // Aura photo · Taurus (see kit list)
const grp = figma.createFrame(); grp.name='hero · aura photo'; grp.fills=[]; grp.clipsContent=false;
const tile = tileSrc.clone(); const sc = W/tile.width; tile.resize(tile.width*sc, tile.height*sc); tile.blendMode='SCREEN';
grp.resize(tile.width, tile.height);
const mask = figma.createEllipse(); mask.resize(tile.width*0.9, tile.height*0.9);
mask.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}]; mask.effects=[{type:'LAYER_BLUR',radius:34,visible:true}]; mask.isMask=true;
grp.appendChild(mask); grp.appendChild(tile); mask.x=tile.width*0.05; mask.y=tile.height*0.05; tile.x=0; tile.y=0;
parent.insertChild(idx, grp); grp.x=cx-grp.width/2; grp.y=cy-grp.height/2;
// dark well for text over a tile: ellipse #12052D @0.5, LAYER_BLUR 20, sized to the text block
```
Shape-masked tile (the door): a RECTANGLE/ELLIPSE mask with the shape, tile
scaled ~2× and offset so the glyph falls outside the mask, `SCREEN` on the
tile, a 1px rim stroke in the accent colour at 0.75 on a slightly larger
copy of the shape.

Sphere (planet/moon): ELLIPSE 60–100px, `GRADIENT_RADIAL` with stops
core-light → core → rim → deep and `gradientTransform:[[s,0,0.5-0.34*s],[0,s,0.5-0.30*s]]` (s≈0.78),
effects `INNER_SHADOW` ground @0.55 offset (-6,-6) r14 + `DROP_SHADOW` rim @0.45
offset (0,10) r34; optional hairline ring ellipse stroke cream @0.28 rotated −18°.

Kits: `Kit · Aura photos` `1426:855` → `1426:856` Aries, `857` Taurus, `858`
Gemini, `859` Cancer, `860` Leo, `861` Virgo, `862` Libra, `863` Scorpio,
`864` Sagittarius, `865` Capricorn, `866` Aquarius, `867` Pisces.
`Kit · Figures` `1426:868` → `869` Aries … `880` Pisces, same order.
Colours (core/rim/bloom): Taurus `#D6DC7C/#8FC24B/#3F7A2A`, Libra
`#D695DE/#8B4CB8/#4A2C78`, gold (Align+) `#F0CC8C/#C48F46/#7A542B`; the
full table is in `design/aura-system.md` §1. Ground `#12052D`, panel
`#2B1E4C`, cream `#F5EFE2`, body `#EFE6D6`.

Plugin gotchas beyond wave 1: `figma.createFrame()` defaults to a white fill
(set `fills=[]`); a mask applies to the siblings after it in the same
parent, so wrap mask + content in their own frame; text `resize()` resets
textAutoResize; rotation pivots at the node origin so re-centre from
`absoluteBoundingBox` after rotating; `insertCharacters` third arg is
`'BEFORE'|'AFTER'`; instance children can be recoloured/hidden but not
repositioned. If the Figma MCP drops, re-run the `ToolSearch` and retry.

## Notes file

`design/wave5/agent-<letter>.md`: one line per screen — node id, subject
test before → after, what you replaced, accent/haze before → after, Stardust
still compared. A short list at the end of anything you were unsure about
or left alone on purpose.
