# Agent K — wave 4 notes

Section `937:1924`, file `tj4UC3bpikhe8u1TL0kA35`. Row **y=8900**, x = 80 + 450·i. All 13 screens new; no other nodes touched. Renders in scratchpad `cut/K-*.png`; build scripts in scratchpad `w4k/` (prelude + b01–b04).

## Scores (score.py, 300px thumb) — gate < 1% (red pill / avatar tile exempt)

| i | screen | node | accent% | haze | hues | gate |
|---|---|---|---|---|---|---|
| 0 | G-17 — Loading | `1534:1959` | **0.00** | 0 | 0 | ✓ (target 0%) |
| 1 | G-20 — Error / Update | `1534:1969` | **0.00** | 0 | 0 | ✓ |
| 2 | L-01 — Terms | `1535:8192` | **0.00** | 0 | 0 | ✓ |
| 3 | L-02 — Privacy | `1535:8219` | **0.00** | 0 | 0 | ✓ |
| 4 | L-03 — Guidelines | `1535:8246` | **0.00** | 0 | 0 | ✓ |
| 5 | L-04 — Delete Confirm | `1542:2041` | **4.59** | 0.15 | 1 | ✓ — all of it is the red destructive pill (exempt); nothing else coloured |
| 6 | L-05 — Data Export | `1542:2124` | **0.00** | 0 | 1 | ✓ |
| 7 | SF-01 — Verify Photo | `1542:2225` | **0.00** | 0 | 0 | ✓ |
| 8 | SF-02 — Verified | `1542:2316` | **0.00** | 0 | 0 | ✓ (< 2%) |
| 9 | SF-02b — Photo Rejected | `1546:2056` | **0.00** | 0 | 1 | ✓ |
| 10 | SF-03 — Blocked List | `1546:2150` | **0.31** | 0.13 | 3 | ✓ — the three aura avatars are the only colour |
| 11 | SF-04 — Report Sent | `1546:2251` | **0.00** | 0 | 0 | ✓ |
| 12 | SF-05 — Meet Safely | `1546:2333` | **0.00** | 0 | 1 | ✓ |

"Before" is n/a — every screen is new. Every render Read; no overlaps or clipped text remain (see fixes below).

## Common build

- Frame 390×874, fills copied from S-05 `937:1925` (variable-bound `#140A2E` survives the copy). Status bar clone `1379:1915`, home indicator clone `1384:1928` at (128,858). Starfield clone `1378:1919` at **0.5 opacity** on G-20, L-04, L-05, SF-01…05; **none** on G-17 and the three legal screens. No auroras, glows or geometry anywhere.
- Header: `‹` SF Pro Regular 28 cream @0.85 at (24,56) or `×` at (346,58); title SF Pro Semibold 13 cream @0.85 centred at y66. Headlines EB Garamond Italic 26 lh32 cream; subs SF Pro Regular 13 `#EFE6D6` @0.75 lh20; legal body SF Pro Regular 13 @0.8 lh22, 24px margins.
- Instances: `Section header · caps` `1529:858` (text child re-labelled), `Row · list` `1529:860` at x20 (350 wide, 52px pitch = 44 + 8 gap; `›` hidden where the row is not a link), `Pill · destructive` `1529:855`, `Skeleton · block` `1529:857`. Holo cloned from `1387:1915` at (38,722), label set as one run + the `✦` kept as its own SF Pro Regular 15 range.
- Text links (Keep my card, Next: …) are EB Garamond Italic 17 cream @0.8 centred at y796.

## Per screen

- **G-17** — no starfield, no copy: `Skeleton · block` instances at fill `#B8B2C4` @0.22 (the component's own fill; node opacity left at 1 so it does not double-dim): title 350×40 r12 (20,104), card 322×420 r20 (34,168), three 300×14 r7 lines at y620/644/668. Matches Stardust's untreated skeleton.
- **G-20** — headline `Mercury's fault, / not yours.`, sub merges the error and update-required copy from the clone (`This version of Align can't read the current sky. Update to keep going — nothing you did was lost.`), caps footer `ERR 0X444 · MERCURY RETROGRADE` @0.35 at y672, holo `Update Align ✦`. No dismiss (update-required variant).
- **L-01 / L-02 / L-03** — header title + EB Garamond headline at (24,108), then an auto-layout stack `sections` at (24,196), gap 26: each section = caps header instance + body (gap 8). L-03 headers numbered `01 …04`. Footer `UPDATED SEPTEMBER 2026` @0.35 at y766 and a `Next: …` link. Copy verbatim from the clone (no sign references to correct).
- **L-04** — `Dissolve / entirely?` centred at y300, one sentence of consequence (`Your chart, your card, your photos, every match and every thread — gone, unless you sign back in within 7 days.`), red pill `Delete everything`, link `Keep my card`.
- **L-05** — `Take a copy / of everything.`; caps `WHAT IS INCLUDED` + five rows (chart and birth data / every card you saw / every message / aura history / manifestations, `›` hidden); caps `HOW IT ARRIVES` + body; holo `Email my data ✦`.
- **SF-01** — `Same face, / same pose.`; placeholder rect 200×260 r16 at (95,190), stroke cream @0.3 w1.5 dash [6,6]; camera glyph frame (173,302): 44×30 r8 body + 14×8 r3 bump + 16px lens, all cream @0.5 strokes; caps `POSE · HANDS UNDER CHIN` under it; `HOW IT WORKS` stack at y500; holo `Take the photo ✦`.
- **SF-02** — `×` close; 72px ring (159,236) cream @0.9 w2; check = two r2 cream rects, 4×16 rotated +45 centred (186,279) and 4×30 rotated −45 centred (201,271); headline `The stars agree / it is you.`, sub, holo `Back to my card ✦`.
- **SF-02b** — headline `The stars could / not see you.`, kind sub, caps `WHAT WENT WRONG` + three reason rows (`›` hidden), note `The photo is gone — we kept a result, not an image.`, holo `Try again ✦`.
- **SF-03** — caps `YOUR ORBIT`; three rows with 28px avatar discs (IMAGE fill, `FILL`, hashes from kit `1426:855`: Jules = Scorpio `1426:863`, Sasha = Aries `1426:856`, Rio = Pisces `1426:867`) at x34, label as sibling text at x76 (instance children cannot be repositioned), `Unblock` SF Pro Semibold 13 cream @0.7 right-aligned at x274; caps `HOW BLOCKING WORKS` + body. No CTA (back handles it).
- **SF-04** — `×` close; `A human reads / this one.` centred, sub, caps `IN DANGER? CALL YOUR LOCAL EMERGENCY NUMBER` @0.35 at y672, holo `Done ✦`.
- **SF-05** — `The stars picked / the time.`; caps `BEFORE YOU GO`; five numbered rows (`01`–`05` SF Pro Semibold 13 @0.5 at x36, label at x76): Somewhere public / Tell one person / Your own transport / Keep your drink with you / Trust the rub (fifth tip added — the clone had four); body `If something reads wrong in person, that is data. Leave. …`; holo `Got it ✦`.

## Fixes after first render

- Legal screens overlapped on the first pass: `resize()` on a text node resets `textAutoResize` to `NONE`, so every fixed-width text sat at 10px and the auto-layout stacks measured them as such. Fixed by setting `textAutoResize='HEIGHT'` **after** `resize` (prelude) and repairing the existing nodes in place.
- Orphan last words: G-20 sub widened to 330 (x30), SF-02 sub to 334 (x28), SF-02b note shortened to one line.

## Gotchas hit

- `getRangeFontName(0)` needs an end index — `(0,1)`.
- Instance children cannot be moved (`relative-transform` cannot be overridden) — hide the instance label and add a sibling text instead. Their `visible` and `characters` can be overridden.
- Copying `s05.fills` onto a new frame keeps the variable binding.
