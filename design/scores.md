# Scores

Run `scratchpad/score.py` on the changed screens after every batch, A/B against
a named Stardust screen, record here. Axes and bands are defined in
`plan-stardust-parity.md` §5.

Measured on a 300px-wide thumbnail of each screen.
`accent%` = pixels with saturation > 0.50 and value > 0.50.
`light%` = pixels with value > 0.85 — the proxy for drawn form.

---

## 2026-09-17 — baseline, before the parity plan

**Stardust reference set**

| screen | accent% | light% | range | contrast | hues |
|---|---|---|---|---|---|
| Home Dashboard `oth_jka4o` | 1.20 | 1.23 | 0.500 | 0.121 | 5 |
| Sun Sign Result `oth_vaabh` | 19.47 | 6.34 | 0.893 | 0.264 | 2 |
| Scorpio Profile `oth_m9j2z` | 18.93 | 5.13 | 0.862 | 0.217 | 1 |
| Tarot Card Result `oth_zr0f1` | 3.20 | 2.02 | 0.448 | 0.113 | 2 |
| Pink Moon Article `oth_be945` | 1.41 | 10.08 | 0.903 | 0.275 | 2 |
| **mean** | **8.84** | **4.96** | 0.721 | **0.198** | 2.4 |

**Align, bespoke section**

| screen | accent% | light% | range | contrast | hues |
|---|---|---|---|---|---|
| S-05 The Deck | 2.03 | 0.88 | 0.569 | 0.147 | 3 |
| G-23 Your Chart | 15.37 | 6.26 | 0.901 | 0.233 | 3 |
| S-21 Alignment | 7.79 | 7.98 | 0.906 | 0.235 | 2 |
| S-09 Chat | 0.27 | 0.17 | 0.434 | 0.097 | 3 |
| G-05 You | 5.27 | 2.16 | 0.679 | 0.165 | 2 |
| **mean** | **6.15** | **3.49** | 0.698 | **0.176** | 2.6 |

### Read

Quantitatively we are close on every axis. `G-23` vs `Scorpio Profile` is the
telling pair — 15.37 / 6.26 / 0.233 against 18.93 / 5.13 / 0.217, which is a
tie, and the Scorpio screen is still plainly the better screen.

**Subject test (axis 5), scored by hand from thumbnails:**

| screen | name the subject in 3 words, no text | score |
|---|---|---|
| Scorpio Profile | "a glowing scorpion" | 5 |
| Pink Moon Article | "a big moon" | 5 |
| Sun Sign Result | "a glowing scorpion" | 5 |
| Home Dashboard | "a ring of days" | 4 |
| Tarot Card Result | "a glowing planet" | 4 |
| — | | |
| G-23 Your Chart | "a gold blur" | 1 |
| S-21 Alignment | "a purple blur" | 1 |
| S-05 The Deck | "a card, pink smudge" | 2 |
| G-05 You | "a gold blur, a list" | 1 |
| S-09 Chat | "a chat" | 3 |

Stardust 4.6, Align 1.6. **This is the entire gap**, and it is not a colour
problem — it is that nothing in our file is drawn.

## 2026-09-17 — first two screens on the founder's boards

| screen | accent% | light% | contrast | hues | vs | subject test |
|---|---|---|---|---|---|---|
| G-23 Your Chart · Taurus (figure tile) | 8.65 | 5.34 | 0.229 | 3 | Scorpio Profile 18.93 / 5.13 / 0.217 | "a green bull" — **5** (was 1) |
| S-05 The Deck (Libra aura tile on the card) | — | — | — | — | — | "a card, an aura photo" — 4 (was 2) |

Accent is under the oracle band because the founder's boards sit on black,
darker than Stardust's fields; light mass and contrast are at parity. The
subject test is the axis that moved, from 1 to 5, which is the whole point.
