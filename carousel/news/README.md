# Align sky news carousels

An Instagram news series for Align: what the sky is doing today, this week
and this month, and what it means for each sign. The editorial grammar
comes from viral news carousels (cover hook, 1/N roundup, ranked twelve,
community-note fact checks); the look is Align's Stardust language
(indigo, warm bone, EB Garamond italic, Space Mono eyebrows, sign colours,
gold only as a ✦ accent).

| Path | What |
| --- | --- |
| `FORMATS.md` | the reference breakdown and the 9 editorial formats (read first) |
| `data/sky.json` | the real sky, Nov 25 2026 – Mar 8 2027, computed with astronomy-engine |
| `data/SKY.md` | the same as a readable list: every ingress, station, aspect, phase, eclipse, Moon sign change |
| `posts/<yyyy-mm>/*.json` | the posts, one file per carousel |
| `posts/CALENDAR.md` | the 3-month posting plan |
| `src/sky.mjs` | recomputes the sky for any range: `node news/src/sky.mjs 2027-03-01 2027-06-01 > news/data/sky.json` |
| `src/render.mjs` | JSON → 1080×1350 JPEG slides, caption.txt, contact.jpg |
| `src/check.mjs` | validates every post and cross-checks sky claims against the ephemeris |

```bash
cd carousel && npm install
node news/src/check.mjs                      # validate everything
node news/src/render.mjs --month 2026-12     # render a month → news/out/
node news/src/render.mjs --only dec-08-new-moon-sagittarius
node news/src/gallery.mjs                    # news/out/index.html, by date
```

## The post file

```json
{
  "id": "dec-08-new-moon-sagittarius",
  "format": "moon-alert",
  "date": "2026-12-08",
  "series": "sky news",
  "signs": ["sagittarius"],
  "facts": ["2026-12-08 new moon sagittarius 17"],
  "caption": "new moon in sagittarius tonight. what to start, by sign.",
  "hashtags": ["newmoon", "sagittarius", "astrology", "zodiac"],
  "slides": [ { "layout": "cover", "headline": "…", "art": { "kind": "moon", "phase": 0 } } ]
}
```

- `format`: one of `sky-roundup`, `ranked-twelve`, `sign-callout`, `sky-note`,
  `month-ahead`, `moon-alert`, `who-this-hits`, `venus-report`, `season-handover`.
- `date`: the day it posts (New York).
- `signs`: the signs it is about; the first one colours highlights.
- `facts`: every sky claim the post makes, in the checker's shorthand (below).
- `caption`: lowercase, plain, 1–3 short sentences. The astronomy detail can live here.
- `hashtags`: 3–8, lowercase, no `#`.

### Slides

Every slide has a `layout`. Text markup: `*word*` lights a word in the
accent colour, `**word**` makes it bold bone, `[[words]]` puts a soft
highlight bar behind them, `\n` breaks a line. No emoji, no `!`.

| layout | fields | use |
| --- | --- | --- |
| `cover` | `kicker`, `headline`, `dek?`, `art`, `swipe?` | slide 1. Art on top, rule eyebrow, big headline |
| `story` | `kicker`, `tag?`, `headline`, `body`, `art` | one event per slide (roundups, alerts) |
| `rank` | `rank`, `sign`, `dates?`, `headline` (the hook), `body`, `art?` | ranked twelve, sign spotlights |
| `callout` | `kicker?`, `headline`, `body?`, `sign`, `art` | one big line over the sign's art |
| `note` | `kicker?`, `headline` (the claim, in quotes), `verdict`, `body` | sky notes. verdict: `true`, `misleading`, `false`, `context` |
| `list` | `kicker?`, `headline?`, `rows: [{ label, text, sign? / color? }]` | calendars, who-this-hits, by-sign lists (max ~7 rows) |
| `end` | `headline`, `body?`, `art?` | the last slide: one thing to do, the save prompt |

Optional on any slide: `sign` (sets the accent and default art), `accent`
(a sign, planet or `gold`/`spark`/`rub`/`violet`/`tide`).

Lengths: headlines ≤ 120 characters (cover ≤ 90 reads best), bodies ≤ 420
characters (rank bodies ≤ 300), list row text ≤ 60.

### Art

| kind | fields | |
| --- | --- | --- |
| `planet` | `body`, `sign?` (rim colour), `rx?` (retrograde arrow) | glossy orb on stars |
| `pair` | `a`, `b` (planets) | two orbs: an aspect |
| `moon` | `phase` 0–1 (0 new, .25 first quarter, .5 full, .75 last quarter), `sign?` (glow) | |
| `eclipse` | `type`: `solar` or `lunar`, `sign?` | |
| `figure` / `aura` | `sign` | the app's sign art |
| `stars` | `tint?` | |
| `wheel` | `signs?` (lit ones), `tint?` | zodiac wheel |

All take `zoom` (1–1.6) and `focus` ("x% y%").

### Facts shorthand

So the checker can verify each post against `data/sky.json`:

- `YYYY-MM-DD <planet> enters <sign>` (retrograde re-entries too)
- `YYYY-MM-DD <planet> stations retrograde|direct <sign>`
- `YYYY-MM-DD new moon|full moon|first quarter|last quarter <sign>`
- `YYYY-MM-DD solar|lunar eclipse <sign>`
- `YYYY-MM-DD <planet> <conjunction|sextile|square|trine|opposition> <planet>`
- `YYYY-MM-DD moon in <sign>`

A fact may be a day off from the ephemeris date (time zones); more than
that fails.
