# Wave 1 — quiet the product · agent brief

You are one of four agents working the same Figma file in parallel. Each agent
owns a disjoint set of screens. **Never edit a node outside your list.** Do not
commit to git; write your notes to your own file under `design/wave1/`.

## The file

- Figma file key: `tj4UC3bpikhe8u1TL0kA35`
- Bespoke section `✦ STARDUST — redesigned screens`: node `937:1924`
- Load tools first: `ToolSearch` with `select:mcp__Figma__use_figma,mcp__Figma__get_screenshot`.
  If the Figma MCP disconnects mid-task, run that ToolSearch again and retry.
- `use_figma` runs JS with the Plugin API. A thrown error rolls the whole script
  back, so keep scripts small. `console.log` is not returned — `return` a string.
- Text edits: `await figma.loadFontAsync(node.fontName)` first; if `fontName ===
  figma.mixed`, load every font from `node.getRangeAllFontNames(0, len)`.
- Setting `strokes`/`fills` on a gradient paint: never spread a gradient paint
  into a SOLID object (validation error). Rebuild the paint explicitly.
- Auto-layout frames ignore manual `y`. Check `layoutMode` before positioning.

## Why this wave exists

Read `design/stardust-teardown.md` §1 and `design/plan-whole-app.md` §1–2.
Stardust's product screens run at a **2% median accent**; ours run at 5%+ with
ambient glows and sacred-geometry figures on every screen. The instrument zone
(deck, matches, chat, club) should be **flat near-black ground, with colour
coming only from the aura tiles on the cards and from state**.

## What to remove on an instrument screen

- Ambient glow ellipses at screen level: names like `glow · violet`, `glow ·
  gold`, `glow · ember`, `aurora · *`, `bloom · *`, `hero glow · *`, `glow ·
  floor`, `aura bloom · *`. Set `visible = false` (do not delete) unless the
  screen's brief says otherwise.
- Sacred geometry at screen level: `seed of life`, `geometry · *`, `flower of
  life`, `vesica`. Hide them. Geometry stays only where the figure is the
  subject (A-01 About, the mark).
- Keep: `starfield`, the status bar, tab bar, home indicator, the Holo button,
  every aura **image tile** (fills of type IMAGE — these are the founder's art),
  card foil and keylines, all copy.

## What must not change

- The pearl holo button (canonical spec in `design/notes-bespoke-coreflow.md`).
- Card structure and the card's aura image tiles.
- Any node whose fill is `type: 'IMAGE'`.
- Screens not in your list.

## Scoring — do this after every screen

```
# screenshot via mcp__Figma__get_screenshot (maxDimension 874), then:
cd /tmp/claude-0/-home-user-Align-design-/56f83edd-3da9-5a08-9ea1-18b4c42dbae2/scratchpad
curl -sL -o cut/<screen>.png "<url>"
python3 score.py cut/<screen>.png
```
Target for instrument screens: **accent 1–4%**. The two celebrations (S-07
Match, S-08 Veil Lifts) may sit at up to 15%. Record before/after numbers in
your notes file. Also **look at the render** (Read the PNG) — a number is not a
pass; the screen must still read as itself with the card/aura as the subject.

Stardust references (already on disk, free): `scratchpad/stardust-cache/` —
`other-tabs_02_oth_jka4o.png` (home, 1.2%), `other-tabs_27_oth_xomsp.png`
(calendar), `other-tabs_31_oth_eg5bz.png` (journal 0.28%), `other-tabs_37_oth_w9fny.png`
(Tarot Card Detail), `onboarding_03_onb_3ayky.png` (login 0.09%).

## Notes file

Write `design/wave1/agent-<letter>.md`: screens touched (node ids), what was
hidden/changed, before → after accent, and anything you were unsure about.
Keep it terse. Do not edit any other file in `design/`.
