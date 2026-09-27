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
| `{yourPlanet}` / `{theirPlanet}` | Sun, Moon, Mercury, Venus, Mars, Rising | card lines |
| `{yourSign}` / `{theirSign}` | Virgo, Gemini | card lines, ruler lines (Sun signs) |
| `{guest}` / `{owner}` / `{guestSign}` | "Juniper's" Venus in Libra lands in "your" 7th house | house lines |
| `{element}` / `{until}` | Water / Thursday | right now lines |

## The formula (v4: blind dating, user decides)

The Mystery Card has **no photo**, so the three card lines are what someone uses to decide Align or Release. The copy gives them the astrology and what it tends to look like in dating, then **leaves the decision to them**. No verdicts: never "great if", "good pick", "you need", "exactly your type".

**Card line = the real placements + what that tends to look like in dating.**

> "Your Moon in Virgo squares Juniper's Moon in Gemini. Under stress, one often wants space, the other wants to talk."

| Field | Rule |
|---|---|
| Card line | Sentence 1 names this pair's actual signs and the aspect in plain words ("squares", "share an element", "sit side by side"). Sentence 2 is a tendency, not a judgement: "tends to", "often", "may". Rendered length ≤ 125 characters (tested). |
| Chip | A plain trait anyone gets in 2 to 4 words. |
| S-21 head | The pattern in everyday words. |
| S-21 body | 3 sentences: **why** (plain astrology) → **what it looks like** on dates or in texts → **how to handle it**. Advice is fine here (it's after they've matched), verdicts are not. |
| Try | Something to send or plan: `Open with: "..."`, `Ask {name}: "..."`, or `Date idea: ...`. |

Rub lines describe the friction honestly and neutrally. Spark and Align lines describe the ease without promising anything.

**Design dependency:** lines this long need the S-05 card to let the Spark / Rub / Align rows grow with their text and a shorter aura band (see the example cards in the Figma copy library).

## Writing rules (from the Align definitions doc)

- No em dashes or hyphens. Use commas or full stops.
- Say "alignment", never "compatibility".
- Never a number, percent or score.
- Card line: rendered length ≤ 125 characters (tested). Chip: max ~30.
- Avoid pronouns for people: use {name}, so the grammar works for everyone.
- Rub lines name the friction **and** how to use it. Never ominous, never a warning.
- Lines must read correctly in either direction (your Sun and their Moon, or theirs and yours).

A check for the first three rules runs in the generator; the test suite confirms every key the algorithm can produce has a line.
