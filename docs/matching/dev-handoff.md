# Matching v2: Dev Handoff

Everything around the scoring math: how people actually match, what runs when, what to store, what to log.
Read [`matching-algorithm.md`](./matching-algorithm.md) first for the math.

**What's in this folder**

| Path | What | Run |
|---|---|---|
| `matching-algorithm.md` | The math, step by step, plain English | – |
| `dev-handoff.md` | This file | – |
| `config.default.json` | Every tunable number. Ship as remote config | – |
| `reference.js` | Reference implementation: scoring, Pull, moon phase, dealing, copy picking | `node docs/matching/reference.js` |
| `reference.test.js` | Golden tests. **Your implementation must produce the same numbers** | `node --test docs/matching/reference.test.js` |
| `chart/chart.js` | Birth data → six sign numbers (time zones + ephemeris) | `cd docs/matching/chart && npm i && node chart.js` |
| `copy/` | Every card sentence (CSV) + writing rules | – |

---

## 1. How two people match (incoming Aligns)

Problem: each person gets their own deck. If you Align with Juniper but your card never shows up in her deck, you can never match.

**Rule**

1. You swipe **Align** on Juniper.
2. If Juniper already Aligned with you → **it's a match** (S-07).
3. Otherwise store an *incoming Align*: `incomingAligns/{juniperId}/{yourId}`.
4. At Juniper's next deal, you are **guaranteed a card**, as long as you still pass her Step 1 filters (age, distance, safety, blocked suns, active).
5. Incoming cards jump the Pull queue but still obey the variety rules, never sit in slots 1–2 (so she can't tell who already said yes) and are capped at **5 per set** (`deck.incomingMaxPerSet`). Extra incoming carry over to the next set/night.
6. She never sees that you already Aligned. If she Releases you, the incoming Align is deleted.
7. Incoming Aligns are never put in the Comet pool.

Implemented in `dealSet()`; covered by the test *"incoming Aligns are always dealt, never in slots 1–2, max 5"*.

---

## 2. Align+ = unlimited, in sets of 15

- Free: one set of 15 per night. After the last card → S-10 Deck Spent.
- Align+: after the last card, **"Deal another 15"** → call `dealSet()` again with `alreadyDealt` = everything shown tonight.
- Every set follows the same rules: tonight's moon phase mix, variety caps (counted per set), priority, incoming Aligns.
- When the pool is empty → G-19 No Cards.
- Sets never repeat a person within the same night (tested).

---

## 3. Gender and who you're shown

**Onboarding (store both):**
- **I am:** Man · Woman · Nonbinary. Optional free-text "describe it your way" (display only, never used in matching).
- **Show me:** multi-select from Men · Women · Nonbinary people. "Everyone" = all three.

**Filter rule (Step 1):**

```text
show B to A  only if  B.gender ∈ A.showMe  AND  A.gender ∈ B.showMe
```

Both directions, always. A nonbinary person who picks "Show me: Men, Women" sees men and women **who also chose to see nonbinary people**. Nobody is ever shown to someone who didn't opt in to their gender.

---

## 4. Card copy

Draft v1 is in [`copy/`](./copy/README.md): 63 card lines (9 comparison types × 7 distances), 12 house lines, 5 ruler lines, 10 relationship paragraphs, 8 "Right now" lines. Picked by `pickCopyKeys()`. A test fails if the algorithm can produce a key with no copy.

---

## 5. Birth time → correct chart (time zones)

**The #1 bug in astrology apps.** A birth at 2:30pm in Houston means different UTC times in May (daylight time) and January (standard time), and rules changed over the decades. Using the phone's current time zone gives wrong Moons and Risings.

**Pipeline (all server side, once at onboarding):**

1. User picks birth city from autocomplete (Google Places or Mapbox) → `lat`, `lon`.
2. Look up the **IANA time zone for those coordinates**: Google Time Zone API or the offline `geo-tz` package → e.g. `America/Chicago`.
3. Convert local birth date + time to UTC **using that zone's historical rules**: Luxon (`DateTime.fromISO(..., { zone })`), which uses the full tz database built into Node.
4. No birth time → use 12:00 local, `hasBirthTime: false`, `rising: null`.
5. Store `birthLat`, `birthLon`, `birthTz`, `birthUtc` along with the signs, so the chart can be re-cast later.

`chart/chart.js → birthUtc()` does 3–4 and has tests for Houston daylight vs standard time.

**QA before launch:** cast 5 team members' charts and compare against a free chart site (e.g. astro.com). Include one person born in daylight saving time and one born outside the US.

---

## 6. Ephemeris library (where the planets were)

**Use [`astronomy-engine`](https://github.com/cosinekitty/astronomy)** (MIT license, pure JavaScript, no binaries, runs in Firebase Cloud Functions).

- Why not Swiss Ephemeris: it's the astrology standard but licensed **AGPL** (you'd have to open-source your backend) or paid commercial license. astronomy-engine is free for commercial use and accurate to well under a degree, and we only need the **sign** (30° buckets).
- Rising (Ascendant) is computed with the standard formula from sidereal time + latitude (`chart.js → ascendant()`); self-check shows < 0.02° error.
- Built-in self-checks: J2000 Sun position, time-zone conversion, Rising at geometric sunrise/sunset in 4 cities × 4 seasons, Mercury/Venus never too far from the Sun.
- If the app is Flutter/Dart: don't port it. Call a Cloud Function at the end of onboarding and store the result.

Known edge: on a day when the Moon changes sign, a missing birth time can put the Moon in the wrong sign (about 1 in 10 no-time users). Acceptable; the "add your birth time" nudge fixes it.

---

## 7. Cache pair meters (cost at scale)

Charts never change, so a pair's meters never change. Scoring every pair every night is wasted work (5,000 users = 25M pairs).

```text
pairMeters/{smallerUid}_{largerUid} = {
  spark, align, rub, groups, copyKeys,
  chartVersionA, chartVersionB, computedAt
}
```

- Compute lazily the first time two people are in the same pool, or eagerly for a new user against their city.
- Nightly job reads cached meters and only computes the cheap parts: Pull modifiers (looking for, verified Align+, new-user New Moon bump), labels, the deal.
- Symmetric by design (tested), so one row serves both users.

---

## 8. Small cities

Not handled in v1 (by decision). Percentile labels work at any size; revisit if a city has fewer than ~200 people.

---

## 9. Schedule: 11:11 local time

- Each city stores its IANA zone. A scheduler runs **every 15 minutes** and deals for every city whose local time just passed the deal time (`schedule.dealLocalTime`).
- ⚠️ **Assumption:** 11:11 **PM** (copy says "tonight's deck"). Change `dealLocalTime` if it's AM.
- **New signup after tonight's deal:** gets a starter deck immediately (`starterDeckIfSignupAfterDeal`) so nobody waits a day.
- **City change (P-03):** keep tonight's deck; the new city's pool is used from that city's next 11:11.
- **Moon phase** is computed once per deal from the deal time (`moonPhase()`), so everyone in a city gets the same phase that night.

---

## 10. Recompute on chart changes

When a user adds a birth time or edits their chart (G-06):

1. Re-cast with `castChart()`, bump `chartVersion`.
2. Invalidate every `pairMeters` row containing them (or let a version mismatch trigger lazy recompute).
3. Tonight's already-dealt deck stays as is; changes apply from the next deal.

---

## 11. Logging (needed to tune the numbers)

Log one event per card dealt, and one per action:

```json
{ "event": "card_dealt", "viewerId": "...", "candidateId": "...", "dealId": "...", "set": 1, "slot": 4,
  "pull": 49.1, "spark": 0.89, "align": 0.77, "rub": 0.85, "dots": [1,1,1], "label": "STEADY PULL",
  "type": "align", "incoming": false, "alignPlusBoosted": false, "moonPhase": "full", "skyElement": "Water",
  "copyKeys": { "spark": "ruler:Venus", "align": "venus-venus:4", "rub": "rising-sun:3" },
  "configVersion": "2026-09-27.1" }

{ "event": "card_action", "dealId": "...", "candidateId": "...", "action": "align | release | peak | comet",
  "msOnCard": 5200, "becameMatch": false }
```

Later: `match_chat_started`, `match_expired` (7 days quiet), so Pull can be tuned against real conversations, not just swipes.

---

## 12. Remote config

`config.default.json` holds every TUNE value (points, weights, thresholds, deck rules, moon mixes, schedule). Load it into Firebase Remote Config (or equivalent) with this file as the default. Always log `configVersion`.

---

## 13. Tests

- `node --test docs/matching/reference.test.js` runs 15 golden tests: the worked example numbers, symmetry, filters on Pull, labels, moon phase dates, 50 random cities of deck rules, incoming Aligns, Align+ sets, small pools, and copy coverage.
- Port these cases to your stack's test framework. **Same inputs must give the same numbers** (e.g. You × Juniper → Pull 49).
- `node docs/matching/chart/chart.js` runs the chart self-checks.
