# Align sky news carousels

An Instagram news series for Align: what the sky is doing today, this week
and this month, and what it means for each sign. The editorial grammar
comes from viral news carousels (cover hook, 1/N roundup, ranked twelve,
community-note fact checks). The look is **wire**, built from a measured
teardown of the references (`research/TYPE-LAYOUT.md`, `IMAGERY.md`,
`HEADLINES.md`): a real NASA photo across the top (`assets/photo/`, public
domain, credits in `credits.json`) with a soft glow in the sign's colour,
a fade to near-black, a gold divider with `align ✦`, and a huge Anton
all-caps headline balanced to fill the width. Signs are lit in their sign
colour, planets and numbers in gold. Covers lead with a checkable fact: a
time, a date or a count from the ephemeris.

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
| `hero` | `kicker?`, `headline`, `dek?`, `art` | one huge planet / moon on black, headline under it, gold divider with the align mark. The best cover for single-sign and single-planet posts |
| `breaking` | `word` (e.g. `retrograde`, `eclipse`, `breaking`), `kicker?`, `headline`, `dek?`, `art` | a giant outlined word behind the art. Event covers |
| `split` | `labels: [l, r]`, `kicker?`, `headline`, `art`, `art2` | two arts side by side over a raised panel: venus vs mars, two signs, before/after |
| `table` | `kicker?`, `headline?`, `columns?: [l, r]`, `rows: [{ label, sign?/color?, text?, value? }]` | a numbered ranking with a value column, max 6 rows |

`story` also takes `inset`: a second art shown as a circle over the frame's corner (a sign figure next to a planet).

Optional on any slide: `sign` (sets the accent and default art), `accent`
(a sign, planet or `gold`/`spark`/`rub`/`violet`/`tide`).

Lengths (enforced by `check.mjs`): headlines ≤ 72 characters on
cover/hero/callout, ≤ 64 on breaking/split/end, ≤ 90 elsewhere; bodies ≤ 150
on story, 170 on rank, 200 on note, 90 on callout, 80 on end; `dek` ≤ 48;
lists and tables ≤ 5 rows of ≤ 44 characters; ≤ 7 slides a post (14 for
ranked-twelve). One idea per slide.

### Art

| kind | fields | |
| --- | --- | --- |
| `planet` | `body` (sun, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto), `sign?` (rim colour), `rx?` (retrograde arrow), `style?` (`gloss` for the app's orb, `pastel` for a dreamy iridescent planet), `size?` | textured planet on stars |
| `pair` | `a`, `b` (planets) | two orbs: an aspect |
| `moon` | `size?`, `phase` 0–1 (0 new, .25 first quarter, .5 full, .75 last quarter), `sign?` (glow) | |
| `eclipse` | `type`: `solar` (ring of fire), `lunar` (blood moon) or `penumbral` (a full moon barely dimmed), `sign?` | |
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
