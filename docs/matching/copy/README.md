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

- `{name}`: the other person's display name ("J." on the Mystery Card, first name after the veil lifts). Lines avoid pronouns so the grammar works for everyone.
- `{element}`: Fire / Earth / Air / Water. `{until}`: weekday the Moon leaves the sign ("Thursday").

## The dating formula (v2)

Every line answers two questions: **what will dating this person be like, and what do you do about it?**

| Field | Rule |
|---|---|
| Card line | Something you'll *notice* when dating them + your *move*. "Under stress, one wants space. Agree on a signal." |
| Chip | A plain trait anyone gets in 2–4 words. |
| S-21 head | The pattern in everyday words. |
| S-21 body | 3 sentences: **why** (plain astrology) → **what it looks like** on dates or in texts → **how to use it**. |
| Try | Something to send or plan this week: `Open with: "..."`, `Ask {name}: "..."`, or `Date idea: ...`. |

Rub lines always end in a move, never a warning. Keep it about dating: first messages, first dates, texting, pace, flirting, meeting friends.

## Writing rules (from the Align definitions doc)

- No em dashes or hyphens. Use commas or full stops.
- Say "alignment", never "compatibility".
- Never a number, percent or score.
- Card line: max ~55 characters so it fits two lines on the card. Chip: max ~30. ("Right now" lines sit in a paragraph on S-06, so they can run longer.)
- Avoid pronouns for people: use {name}, so the grammar works for everyone.
- Rub lines name the friction **and** how to use it. Never ominous, never a warning.
- Lines must read correctly in either direction (your Sun and their Moon, or theirs and yours).

A check for the first three rules runs in the generator; the test suite confirms every key the algorithm can produce has a line.
