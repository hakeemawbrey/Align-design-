# Brief for writers of the sky news calendar

You are writing one month of Align's daily sky news carousels.

Read first, in this order:
1. `news/README.md`: the post JSON, layouts, art kinds, facts shorthand.
2. `news/FORMATS.md`: the 9 formats and the voice rules. Where FORMATS.md's
   JSON sketch differs from README.md, README.md wins (it is what renders).
3. `news/data/SKY.md`: the real sky. Every planet, date, sign and degree you
   write must come from here (or `data/sky.json`, which also has each day's
   positions under `days[]`). Never write a sky fact from memory.
4. `news/samples/sample.json`: a rendered example using every layout.
5. `carousel/SPEC.md` "Align's core message" and "Voice" sections.

## Cadence: one post a day

Weekly rhythm, which events override:

| day | default format |
| --- | --- |
| Mon | `sky-roundup`: the week ahead (6–9 slides) |
| Tue | `who-this-hits` for the week's biggest transit |
| Wed | `sky-note`: a myth check (see below) |
| Thu | `sign-callout`: the sign with the most going on this week |
| Fri | `venus-report`: love weather for the weekend |
| Sat | short `sky-roundup` "today's sky": the Moon's sign + one thing (3–5 slides) |
| Sun | `sky-roundup`: what happened in the sky this week (1/N) |

Events take the day's slot:
- New moon, full moon: `moon-alert` on the day.
- Eclipses: `moon-alert` a week before, the day before, and on the day.
- A planet stationing retrograde or direct: `sign-callout` or `who-this-hits` on the day, a heads-up a few days before for Mars and Mercury.
- Sun changing sign: `season-handover` on the day.
- First day of the month (or the last day of the month before): `month-ahead`.
- Once a month: `ranked-twelve` (the signs whose month changes most, ranked, all 12 signs, #12 to #1, 14 slides: cover + 12 rank slides + end).

Slide counts: 3–10 except ranked-twelve. Slide 1 is always `cover`. The last
slide is usually `end`, with one thing to do or a save prompt.

## How to write

- Lowercase everywhere (the renderer keeps kickers uppercase).
- Hook first: the cover headline must make sense alone and make someone
  swipe. Reference grammar: "what just happened in the sky this week?",
  "leo, you're entering…", "the signs whose december changes the most, ranked",
  "*mars* turns backwards tomorrow. here's who feels it".
- Highlight 1–3 words per headline with `*…*`: sign names, the planet, the
  one word that stings.
- Astrology is a reading, never a forecast of fact: "astrologers read this as",
  "a good week to", "you might". Never promise outcomes, never fear-bait
  ("your relationship is doomed"). Blunt and warm, a bit funny.
- The astronomy is exact and plain: what the planet actually does (e.g.
  retrograde is an apparent backward motion as Earth overtakes Mars).
- Dating is the angle. Align's core ideas (read the sky before the face; it
  has to be mutual; say the honest thing; dealbreakers up front; release,
  don't ghost; a new deal at 11:11; venus runs your heart) go in at most
  once per post, usually on the end slide, never as an ad, never "download".
- Sky notes: check a common astrology myth or viral misread honestly (e.g.
  "mercury retrograde breaks your phone", "your sign changed because of
  ophiuchus", "a full moon makes people crazier", "eclipses are bad luck",
  "retrograde planets move backwards"). Verdict + the real astronomy + what
  astrologers read + an honest take. Never name or mock a real account.
- No real-world news, celebrities, brands or politics. This is the sky desk.
- Vary covers and art across the month: planets, moons, eclipses, pairs,
  sign figures and auras, wheels. Don't run the same art two days in a row.

## Output

- One JSON file per post at `news/posts/<yyyy-mm>/<mm>-<dd>-<slug>.json`,
  `id` = the filename without `.json`, prefixed with the month (e.g.
  `dec-08-new-moon-sagittarius`).
- Fill `facts` with every sky claim in the post (shorthand in README.md).
- `news/posts/<yyyy-mm>/PLAN.md`: a table, one row per day: date, format,
  hook (cover headline), why that day.
- Run `node news/src/check.mjs news/posts/<yyyy-mm>` from `carousel/` and fix
  every error. Then render a few with
  `node news/src/render.mjs news/posts/<yyyy-mm> --out news/out` and look at
  2–3 contact sheets (`news/out/<id>/contact.jpg`) with the Read tool; fix
  anything that wraps badly or prints `!` warnings (tight text).
- Do not edit anything outside `news/posts/<yyyy-mm>/`.
