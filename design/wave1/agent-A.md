# Agent A — deck states (section 937:1924)

All edits are `visible = false` on screen-level children only. Nothing deleted, no IMAGE-filled node, card, fan card, starfield, legend, tab bar, home indicator or holo button touched. Renders checked by eye after every screen: each still reads as itself, card/aura is the only coloured subject, ground is flat near-black with starfield.

Score = `score.py` accent% on an 874px screenshot (thumbnailed to 300×600).

| Screen | Node | Hidden (ids) | Before → After |
|---|---|---|---|
| S-05 The Deck | 937:1925 | glow·violet 937:1926, glow·gold 937:1927, glow·ember 937:1928 (was already off), aura bloom·Libra 991:1924, geometry·flower of life 1399:1915 | 5.86 → **5.80** ⚠ |
| S-05b Deck · next card | 1400:1921 | 1400:1922, 1400:1923, 1400:1924 (already off), 1400:1925, geometry 1400:2001 | 2.13 → 2.07 |
| S-05c Deck · Reading | 1399:2335 | 1399:2336, 1399:2337, 1399:2338 (already off), 1399:2339, geometry 1399:2415 | 1.43 → 1.43 |
| S-05d Peak · Photo Open | 1021:1926 | 1021:1927, 1021:1928, 1021:1930 — no geometry node on this screen | 1.20 → 1.20 |
| S-05e Peek · sealing | 1400:2122 | 1400:2123, 1400:2124, 1400:2125 (already off), aura bloom 1400:2126 (was op 0.90), geometry 1400:2202 | 2.17 → 2.08 |
| S-03 Dealing | 1399:1935 | 1399:1936, 1399:1937, 1399:1938 (already off), 1399:1939, geometry 1399:2015 | 2.16 → 2.10 |
| S-04 Your Stack | 1399:2135 | 1399:2136, 1399:2137, 1399:2138 (already off), 1399:2139, geometry 1399:2215 | 2.16 → 2.10 |
| S-10 Deck Spent (utility) | 1027:1971 | glow·violet 1027:1972, glow·gold 1027:1973, geometry·seed 1123:1948 (62px seed-of-life mark, top-left) | 0.09 → 0.03 |

Seven of eight were already ≤ 4% before this pass (the glows are dark, blurred and low-opacity, so they barely register in the saturated+bright metric); hidden anyway for consistency. The visible effect is a flatter, darker ground — the violet haze behind the header and the flower-of-life watermark top-right are gone; starfield now reads cleanly.

S-10 had no lobe / concentric rings to keep; only two glows and the small seed mark. Sparkles (6 STAR nodes), ghost-card outlines and the holo button were left as-is.

## Open item — S-05 stays at 5.8%

The remaining accent on S-05 is entirely the card's Libra aura panel (rows 20–50% of the screen; nothing outside the card contributes more than ~0.5%/band). No nested glow/bloom/geometry nodes exist inside `content`. The aura panel is `998:1964`, an IMAGE fill (founder's art) — not touched.

Why S-05 scores 5.8% while S-05c/S-05d/S-03/S-04 with the *same image hash* score 1.2–2.2%: S-05's image paint uses `scaleMode: FILL`, the others use `CROP` (a dimmer crop of the same asset). Bringing S-05 into the 1–4% band would mean changing the image paint's crop/scale on the card — card structure, out of scope for this wave. Flagging for the lead rather than touching it.

Screenshots: `scratchpad/cut/before/s*.png` (before) and `scratchpad/cut/s*.png` (after).
