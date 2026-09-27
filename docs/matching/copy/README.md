# Align card copy library (draft v1)

Every sentence the matching engine can put on a card, the S-21 Cosmic Alignment screen, or the S-06 "Right now" line. Import the CSVs into Google Sheets to edit; keep the `key` column unchanged, since that's what the code looks up.

| File | Rows | Used on | Looked up by |
|---|---|---|---|
| `card-lines.csv` | 63 | Card Spark / Rub / Align lines, S-21 tabs, strengths & challenges chips | `pickCopyKeys()` → e.g. `mercury-moon:2` |
| `house-lines.csv` | 12 | Card line + S-21 "The houses" | `house:venus:7` |
| `ruler-lines.csv` | 5 | Spark line when both Suns share a ruler (S-21 headline "Venus rules you both.") | `ruler:Venus` |
| `relationship-lines.csv` | 10 | S-21 Relationship tab: IN GENERAL / IN DATING | the two Sun elements, alphabetical: `element:Air-Fire` |
| `right-now-lines.csv` | 8 | S-06 "RIGHT NOW" | first row (by `priority`) whose condition is true tonight |

## How the engine picks lines

1. **Card (S-05):** one line per meter. For each of Spark / Align / Rub, the comparison that scored highest in that meter wins (`pickCopyKeys` in `reference.js`). If both Suns share a ruler, the ruler line takes the Spark slot.
2. **S-21 tabs:** the same winning row gives `s21_head`, `s21_body` and `s21_try` for its tab.
3. **3 strengths / 3 challenges:** the `chip` of the top 3 Align+Spark rows (strengths) and top 3 Rub rows (challenges), no duplicates.
4. **Relationship tab:** from the two Sun elements.

## Tokens

Filled by `renderLine(template, vars, name)` in `reference.js`, from `pickCopy(readPair(viewer, candidate))`. Always read the pair **from the viewer's side**, so "Your" is the person looking at the card.

| Token | Example | Used in |
|---|---|---|
| `{name}` | Juniper (J. on the Mystery Card) | everywhere |
| `{yourPlanet}` / `{theirPlanet}` | Sun, Moon, Mercury, Venus, Mars, Rising | available in `vars` for S-06 / S-21 (not used in card lines) |
| `{yourSign}` / `{theirSign}` | Virgo, Gemini | available in `vars` for S-06 / S-21 (not used in card lines) |
| `{guest}` / `{owner}` / `{guestSign}` | "Juniper's" Venus in Libra lands in "your" 7th house | available in `vars` for S-06 / S-21 |
| `{element}` / `{until}` | Water / Thursday | right now lines |

## The formula (v6: one line per row, with real context)

The Mystery Card has **no photo**. Each Spark / Rub / Align row is just the label, **one short line**, and the dots.

**Card line = which part of dating it's about + what it tends to look like in real life.** One sentence, neutral, no verdict.

> RUB · "Under stress, one of you tends to want space while the other wants to talk it out right away."
> ALIGN · "Your values in love tend to line up, from loyalty to what a fun weekend looks like."

Rules: 45 to 100 characters rendered (tested). Give a concrete dating detail (texts, first dates, nights in, pace, friends). Say what it tends to be like ("tends to", "often", "may"). Never judge ("great if", "good pick", "you need"). No sign names or planet details on the card. Keep it about dating: feelings, texting, flirting, pace, first impressions, what you each want.

**The astrology behind each line** (`astroTag()`, e.g. `MOON + MOON · SQUARE`, `THEIR VENUS · YOUR 7TH HOUSE`, `BOTH RULED BY VENUS`) is shown on **S-06 Expand Card** and **S-21**, not on the Mystery Card. S-21 also carries the deeper read: `s21_head`, `s21_body`, `s21_try`.

## Writing rules (from the Align definitions doc)

- No em dashes or hyphens. Use commas or full stops.
- Say "alignment", never "compatibility".
- Never a number, percent or score.
- Card line: 45 to 100 characters rendered (tested). `astroTag()` label: ≤ 32 characters (tested). Chip: max ~30.
- Avoid pronouns for people: use {name}, so the grammar works for everyone.
- Rub lines describe the friction neutrally. Never ominous, never a warning. (Advice on handling it belongs on S-21.)
- Lines must read correctly in either direction (your Sun and their Moon, or theirs and yours).

A check for the first three rules runs in the generator; the test suite confirms every key the algorithm can produce has a line.
