# Align Matching Algorithm v2 (Stardust)

**For developers. No astrology knowledge needed.**
Diagrams: Figma → page *"Align — Matching Algorithm v2 (team diagram)"*.
Runnable math: [`reference.js`](./reference.js) (`node docs/matching/reference.js`).

Every number marked **TUNE** is a starting value. Change it in one config, not in the logic.

---

## 0. Astrology in 60 seconds (all a dev needs)

| Term | What it means for you as a dev |
|---|---|
| **Sign** | One of 12 buckets. Store as an integer **0–11** (table below). |
| **Placement** | Which sign a planet was in when the person was born. Each user has 6: `sun, moon, mercury, venus, mars, rising`. |
| **Rising** | The sign on the horizon at the exact birth minute. **Needs birth time.** Can be `null`. |
| **Element** | Each sign belongs to Fire, Earth, Air or Water. `element = sign % 4`. |
| **Ruler** | Each sign has a "ruling planet." Two different signs with the same ruler = bonus Spark. |
| **Aspect** | How many signs apart two placements are (0–6). That's the whole comparison. |
| **House** | 12 life areas. We use *whole-sign houses*: house = signs counted from your Rising. No extra math. |
| **Spark / Align / Rub** | The three meters on the card. Spark = chemistry, Align = ease, Rub = friction (**more dots = more friction**). |
| **Pull** | One internal number 0–100 used for ranking. **Never shown to users.** |

### The 12 signs

| Index | Sign | Element | Ruler |
|---|---|---|---|
| 0 | Aries | Fire | Mars |
| 1 | Taurus | Earth | Venus |
| 2 | Gemini | Air | Mercury |
| 3 | Cancer | Water | Moon |
| 4 | Leo | Fire | Sun |
| 5 | Virgo | Earth | Mercury |
| 6 | Libra | Air | Venus |
| 7 | Scorpio | Water | Mars |
| 8 | Sagittarius | Fire | Jupiter |
| 9 | Capricorn | Earth | Saturn |
| 10 | Aquarius | Air | Saturn |
| 11 | Pisces | Water | Jupiter |

---

## 1. Store the chart once (onboarding)

Birthday + birth city (+ birth time if known) → an ephemeris library (Swiss Ephemeris or equivalent) → save six integers on the user:

```json
{ "sun": 1, "moon": 8, "mercury": 1, "venus": 1, "mars": 0, "rising": 6, "hasBirthTime": true }
```

- No birth time → `rising: null`. Sun/Moon/Mercury/Venus/Mars are still correct (the Moon can be off by one sign on the rare day it changes sign; acceptable).
- Also store: `lookingFor` (`serious | exploring | fun`), `photoVerified`, `isAlignPlus`, `lastActiveAt`, `blockedSuns[]`.
- **Nothing astrological is computed at swipe time.** Only these integers are used later.
- QA: verify the library output against 5 known charts before launch.

---

## 2. Step 1: Filter (yes/no, no scoring)

A candidate is **removed** if any of these is true:

1. Gender/seeking doesn't match **both ways**.
2. Outside **either** person's age range.
3. More than 25 miles apart (user can widen to 50 on G-19).
4. **Safety:** either blocked the other, either reported the other, they unmatched, or the account is paused/deleted.
5. Not active in the last **7 days**.
6. Their **Sun** is in the viewer's `blockedSuns` (Align+). Also apply in reverse (silent both ways).
7. Already seen, released or matched.

Dealbreakers are **not** a filter. They are free text shown on the card; the user judges.

---

## 3. Step 2: Read the pair → three meters

### 3a. Signs apart

```js
d = (b - a + 12) % 12
apart = min(d, 12 - d)   // always 0..6
```

### 3b. Points per distance (TUNE)

| Apart | Name | Plain English | Spark | Align | Rub |
|---|---|---|---|---|---|
| 0 | Conjunction | Same sign, intense | 3 | 1 | 0 |
| 1 | Semi-sextile | Neighbours, a bit awkward | 0 | 0 | 1 |
| 2 | Sextile | Easy, friendly | 0 | 2 | 0 |
| 3 | Square | Friction | 0 | 0 | 3 |
| 4 | Trine | Same element, effortless | 0 | 3 | 0 |
| 5 | Quincunx | Mismatched timing | 0 | 0 | 2 |
| 6 | Opposition | Magnetic tension | 2 | 0 | 1 |

This table *is* the old MVP element tree: same element = 4 apart (Trine), Fire+Air / Earth+Water = 2 apart (Sextile), clashing elements = 3 apart (Square).

### 3c. What gets compared (about 22 lookups per pair)

Listed both directions so both users get the same result.

| Group | Weight | Comparisons (you ↔ them) |
|---|---|---|
| Moon | 25 | Moon↔Moon, your Sun↔their Moon, your Moon↔their Sun |
| Love (Venus + Mars) | 20 | your Venus↔their Mars, your Mars↔their Venus, Venus↔Venus |
| Sun | 15 | Sun↔Sun |
| Mercury | 10 | Mercury↔Mercury, your Mercury↔their Moon, your Moon↔their Mercury |
| Rising | 15 | Rising↔Rising, your Sun↔their Rising, your Rising↔their Sun |
| Houses | 15 | 6 house overlay checks (below) |

**Group score** = average of its rows' `[spark, align, rub]`.

### 3d. House overlays (whole-sign)

```js
house = ((planetSign - ownerRising + 12) % 12) + 1   // 1..12
```

Check **their** Sun, Moon, Venus in **your** houses, and yours in theirs (6 checks). Points (TUNE):

| House | Meaning | Spark | Align | Rub |
|---|---|---|---|---|
| 1 | First impression | 3 | 0 | 0 |
| 5 | Romance, fun | 2 | 1 | 0 |
| 7 | Partnership | 0 | 3 | 0 |
| 8 | Intimacy | 2 | 0 | 1 |
| any other | | 0 | 0 | 0 |

If a person has no birth time, skip the checks into *their* houses.

### 3e. Combine

```js
meter = Σ(groupScore × groupWeight) / Σ(weights of groups actually used)
if (sunA != sunB && ruler[sunA] == ruler[sunB]) spark += 0.5   // shared ruler (TUNE)
```

- **No birth time (either person):** Rising group is skipped; Houses keeps only the valid checks. Weights re-normalise automatically.
- Meters are 0–3 in theory, usually 0–2 in practice.

### 3f. Dots on screen (TUNE)

| Meter value | Card dots (0–3) |
|---|---|
| < 0.4 | 0 |
| 0.4 – 0.9 | 1 |
| 0.9 – 1.4 | 2 |
| ≥ 1.4 | 3 |

S-21 detail view (0–5): `round(meter / 2 × 5)`, clamped.

**Card copy** comes from the same pass: the strongest-scoring row in each meter picks the template (e.g. Mercury↔Moon row → "Mercury on your Moon…").

---

## 4. Step 3: Pull (ranking number, never shown)

```js
base = align + 0.8 × spark − 0.4 × rub          // TUNE
pull = base / 3 × 100
pull += lookingFor bonus                        // same: +8 · serious vs fun: −10 · else 0 (TUNE)
pull += candidate.photoVerified ? 3 : 0         // TUNE
pull = clamp(pull, 0, 100)
```

### Label = rank inside the viewer's own eligible pool

| Percentile (from top) | Label on card |
|---|---|
| top 5% | ✦ FATED PULL |
| 5–25% | ✦ STRONG PULL |
| 25–60% | ✦ STEADY PULL |
| 60–97% | ✦ SLOW BURN |
| bottom 3% | ☄ COMET (never dealt; Comet pool only) |

Percentiles instead of fixed cut-offs so labels stay meaningful whether a city has 50 or 5,000 users.

---

## 5. Step 4: Deal the 15 (variety)

Runs nightly at **11:11 local time**. Output: 15 ordered cards + a small buffer.

**Card types** (for the mix):
- **Align-heavy:** `align` is the highest meter.
- **Spark-heavy:** `spark` is the highest meter.
- **Wildcard:** `rub` card dots ≥ 2 **and** the Moon or Love group has align or spark ≥ 1.5 (TUNE).

```text
pool   = eligible candidates, minus Comet pool, sorted by Pull (high → low)
quota  = { align: 9, spark: 4, wild: 2 }            // 60 / 25 / 15 %  (TUNE)
sky    = element of tonight's Moon sign              // "Moon in Leo · Fire sky"

for slot in 1..15:
  pick the highest-Pull candidate where ALL are true:
    - its type quota is not full
    - fewer than 3 cards already share its Sun sign
    - fewer than 4 cards already share its Moon sign
    - its Sun sign ≠ previous card's Sun sign
  sky tilt: in slots 1–5, a candidate whose Sun element == sky gets +5 Pull
            for this pick only, until 2 sky cards are in the top 5

after 15: if fewer than 3 elements are present, swap the lowest-Pull card of the
          most common element for the best unused card of a missing element
          (only if the swap keeps every rule above)
```

**Small pool? Relax in this order** (never relax Step 1 filters): type quota → Moon cap → element rule → Sun cap. Fewer than 15 eligible → deal what exists and show G-19.

---

## 6. Step 5: Priority (Align+)

Pull and eligibility never change. Only **position** changes.

```text
plus = Align+ cards in the dealt deck, sorted by Pull
move up to 2 of them into slots 1–5 (keep their relative order)
re-check "no same Sun back to back"; if broken, swap with the next card
priority resets at 11:11 and never carries over
```

---

## 7. Comet (swipe up)

- Pool = bottom 3% of Pull (minimum 3 people), after Step 1 filters and blocked suns.
- Show 3 Align Blank Cards with **3 different Sun signs**, chosen at random from the pool.

---

## 8. Worked example (verified by `reference.js`)

**You:** Sun Taurus (1), Moon Sagittarius (8), Mercury Taurus (1), Venus Taurus (1), Mars Aries (0), Rising Libra (6).
**Juniper:** Sun Libra (6), Moon Gemini (2), Mercury Libra (6), Venus Virgo (5), Mars Cancer (3), Rising Aquarius (10).

| Comparison | Apart | Aspect | Spark / Align / Rub |
|---|---|---|---|
| Moon↔Moon (8 vs 2) | 6 | Opposition | 2 / 0 / 1 |
| your Sun↔her Moon (1 vs 2) | 1 | Semi-sextile | 0 / 0 / 1 |
| your Moon↔her Sun (8 vs 6) | 2 | Sextile | 0 / 2 / 0 |
| **Moon group avg** | | | **0.67 / 0.67 / 0.67** |
| your Venus↔her Mars (1 vs 3) | 2 | Sextile | 0 / 2 / 0 |
| your Mars↔her Venus (0 vs 5) | 5 | Quincunx | 0 / 0 / 2 |
| Venus↔Venus (1 vs 5) | 4 | Trine | 0 / 3 / 0 |
| **Love group avg** | | | **0 / 1.67 / 0.67** |
| Sun↔Sun (1 vs 6) | 5 | Quincunx | **0 / 0 / 2** |
| **Mercury group avg** | | | **0 / 0.67 / 1** |
| **Rising group avg** | | | **1 / 1.33 / 1** |
| Houses: her Sun (Libra) in your 1st | | | 3 / 0 / 0 (other 5 checks = 0) |
| **Houses avg** | | | **0.5 / 0 / 0** |

Weighted meters: Spark 0.39 + **0.5 shared-ruler bonus** (Taurus and Libra are both ruled by Venus) = **0.89**, Align **0.77**, Rub **0.85** → card shows **1 · 1 · 1** dots.

Pull = (0.77 + 0.8×0.89 − 0.4×0.85) / 3 × 100 = 38, +8 (both "serious"), +3 (verified) = **49**. The label depends on where 49 ranks in your pool (e.g. 40th percentile → STEADY PULL).

Same pair with **no birth time**: Rising group dropped, Houses partial → Spark 0.70, Align 0.67, Rub 0.82, Pull 40.8.

---

## 9. Decisions log

| Factor | Decision |
|---|---|
| Mercury | ✅ In scoring (10%) |
| Dealbreakers | Display only, user judges |
| "Looking for" | ✅ Pull modifier |
| Safety | ✅ Step 1 filter |
| Active in last 7 days | ✅ Step 1 filter |
| Photo verified | ✅ Small Pull bump |
| Religion, height, work, interests | ❌ Not used in matching |
| Exposure cap | Not now |
| Moon phase deck mix | Proposed, not approved |
