# Bold reels: script and visual contract

The pre–Star Talk look (Houston series, Series 3, "Astrology for dummies" v2), made data-driven so one engine renders
any number of reels. 1080 × 1920, 30 fps. The nebula sky with the crescent moon top-right and film grain; headlines in
Inter 800 (bone `#efe6d6`) that pop in word by word with ONE accent span in EB Garamond italic in a colour; punchlines
in Inter 700 near the bottom; an optional Space Mono eyebrow; a big glowing line-art visual in the middle of every beat.
No faces anywhere (people are pictograms). **No end card, no logo animation, no CTA.** The last beat gets one quiet mono
footer line about the Houston beta and the city vote, added automatically.

## Script (`scripts/NNN-slug.json`)

```json
{
  "id": "001-wyd-1am",
  "series": "Scenarios",
  "title": "Scenario: 'wyd' at 1 AM",
  "voice": { "voice": "af_heart", "speed": 1.05 },
  "footer": "auto",
  "caption": "One line for the post.",
  "hashtags": ["datingadvice", "houston", "astrology"],
  "beats": [
    { "eyebrow": "SCENARIO", "head": "They text *'wyd'* at 1 AM.", "vis": { "k": "phone", "msgs": [["them", "wyd"]] } },
    { "head": "What do you *do?*", "vis": { "k": "quiz", "options": ["A) 'nm u'", "B) Leave it on read", "C) 'Call me at a normal hour'"], "pick": 2, "mark": "✓" } },
    { "head": "Send this to your *1 AM* texter." }
  ]
}
```

- `series`: one of `Scenarios`, `Relationships`, `Align ideas`, `Zodiac`, `Fun facts`, `Relatable`, `Houston` (it picks
  the music family and the footer pool).
- `voice` (optional): a Kokoro voice. Without it the reel is music + SFX only. Voices: `af_heart`, `af_bella`,
  `af_nicole`, `af_sarah`, `af_aoede`, `af_kore`, `bf_emma`, `bf_isabella`, `am_michael`, `bm_george`. Speed 1.0–1.12.
- `music` (optional): `{ "style": "house" }` to override the series' pick. Styles: synthwave, lofi, funk, cinematic,
  dreamy, pop, chiptune, house, jazzy.
- `footer`: `auto` (default, rotates), `beta`, `vote`, `city`, `both`, `houston`, `none`, or your own short line.
- `endHold`: seconds the last beat holds after its text lands (default 1.8).

### Beats
| field | what |
|---|---|
| `head` | the headline. `*words*` = the accent span (Garamond italic, coloured). `\|` = a forced line break. ≤ 12 words. |
| `sub` | optional punchline at the bottom, ≤ 14 words, may carry its own `*accent*`. |
| `eyebrow` | optional Space Mono label above the headline (`SCENARIO`, `HOUSTON, TX`, `FUN FACT #3`, `ZODIAC 101`). |
| `vis` | the visual (below). Omit it for a big centred text-only beat (good for the hook or the final line). |
| `accent`, `subAccent` | accent colour: `gold` `pink` `blue` `violet` `green` `red`, an element, a sign id, or hex. |
| `dur` | minimum seconds for the beat (unvoiced timing is automatic from word count + the visual's minimum). |
| `hold` | extra seconds after the text lands. |
| `say` | voiced reels only: what the voice says instead of reading head + sub (then the words pop evenly). |
| `size` | override the headline px size (rarely needed; the engine fits 4 lines). |

Timing: an unvoiced beat lasts about `0.9 + 0.26·headWords + 0.24·subWords` s (≥ 2 s, ≥ the visual's minimum). A voiced
beat lasts as long as its speech + 0.3 s. Beat 0's headline is already on screen at frame 0 (it is the thumbnail).
Total lengths come out 15–60 s; aim for 5–9 beats for 20–35 s, 10–16 beats for 45–60 s.

**Chaining:** if consecutive beats have the same `vis.k` and the later one has `"keep": true`, the visual stays on screen
without an exit/entry and its params update (a phone thread keeps growing: list the full `msgs` each beat; only the
new ones pop in).

### Voice and copy rules
- Second person, warm, clear. Relatable first: name a feeling people actually have.
- Advice is healthy: honesty, boundaries, kindness, effort. Never controlling, testing, tracking or jealousy games.
- Astrology is a lens, never a verdict or science. Real astronomy only where true. **No invented statistics.**
- Never say "compatible"/"compatibility": the word is **alignment**. Spoken, say "the Align app", never "on Align"
  (it sounds like "on a line"). Mention Align at most once in a reel, and only where it ties to a real feature.
- Real Align features only: blind **mystery cards** (chart first, face last; the veil lifts when you both align),
  **tonight's deck** (a new deck every night), **talk cards** (both answer, neither sees until both do),
  **dealbreakers** up front, the **Push / Pull / Align** reading, the big three on **You**.
- No real brands, apps, platforms, songs, shows, teams, businesses or people. No logos. No alcohol, no weapons, no
  disaster/flood/hurricane jokes, nothing sexual.
- Voiced reels: spell numbers as words ("twenty-nine", "one AM") so captions and voice match; avoid symbols in
  spoken text. On-screen-only text (eyebrows, vis labels) can use digits.
- The last beat is a shareable line ("Send this to…", "Tag the…", "Which one are you?") or a punchline. Not an ad.

## Visuals (`vis.k`)
Every visual is drawn inside its box (≈ 940 px wide, between the headline and the punchline) and gets a spring entry
and exit from the engine. Colours accept the same words as `accent`. Items inside a visual appear staggered across the
beat unless noted.

### Core (`vis/core.js`)
| k | params |
|---|---|
| `person` | `sign`, `pose` (stand wave shrug phone sad cheer walk sit think point), `col`, `prop` (umbrella coffee taco flower suitcase phone heart hat), `bubble`, `think` (thought bubble), `label`, `heart` |
| `duo` | `a`, `b`: `{ sign, pose, col, prop, bubble, think, label, at }`; `link`: none gold heart spark question broken wall; `linkAt` (0–1); `table`: true or ["cup","taco","phone"] |
| `crowd` | `n` (3–15), `same` (one colour for all), `signs` (true or list), `pair`: [i, j] glow and link at `pairAt`, `pose` |
| `phone` | `name`, `sign`, `time`, `msgs`: [["them","text"], ["me","text","Read 2:14"], ["status","Seen 3 days ago"], ["typing"], ["time","Tuesday"]], `stamp` + `stampAt`, `size` (font, 44), `spread` |
| `bubbles` | `items` (texts), `stack` (alternating left/right like a chat), `float` (drift up), `size`, `cols` |
| `mystery` | the mystery card: `sign`, `name`, `lines` (up to 4 mono lines), `flip` (starts as a card back), `reveal` (0–1: the veil lifts, still no face), `labels` (chips around the card) |
| `deck` | tonight's deck: `n` (3–9), `glow` (index), `glowAt`, `label` |
| `talkcard` | `q`, `tag` (default TALK CARD), `kind` (small italic line), `answers` [a, b] + `answersAt`, `flip` |
| `stamps` | `title` (DEALBREAKERS), `items` ("✕ …" red, "✓ …" green), `col` |
| `quiz` | `options` (2–4 strings), `pick` (index), `pickAt`, `mark` ✓ or ✕, `stamp` (e.g. GREEN FLAG), `stampCol` |
| `stamp` | one big rubber stamp: `text`, `over` (small text above), `col`, `at` |
| `ppa` | Push / Pull / Align between two charts: `a`, `b` (signs), `show` (subset of push pull align) |

### Astro (`vis/astro.js`)
| k | params |
|---|---|
| `wheel` | the zodiac wheel: `highlight` (sign or list), `spin`, `sun` (a sun marker that travels to this sign), `planets` ([[planetId, signId], …] dots on the wheel) |
| `glyph` | one sign, huge: `sign`, `wash` (full-colour wash), `dates` (show dates), `name` (show name), `prop` (a small prop icon name) |
| `glyphs` | all 12: `mode` grid / explode / rain / ring, `highlight` (list), `labels` (names) |
| `planet` | one planet orb: `p` (sun moon mercury venus mars jupiter saturn uranus neptune pluto earth), `label`, `gag` (an icon name orbiting it), `rings` |
| `orbit` | top-down orbits: `planets` (list), `mode`: plain / retro (Earth overtakes the outer planet; the apparent backward loop is traced) / return (`p` completes one lap, a DING), `focus`, `years` (label) |
| `moon` | `phase` (0–1 or new, crescent, quarter, gibbous, full), `strip` (eight phases in a row), `wax` (animate new → full) |
| `elements` | `show` (list or one of fire earth air water), `signs` (list each element's three glyphs), `labels` |
| `bigthree` | `sun`, `moon`, `rising` (signs), `labels` (true: "who you are / what you need / how you come across") |
| `constellation` | stars that connect: `shape` (random heart two dipper), `n`, `link` (two stars far apart join in gold) |
| `horizon` | a sign rising over the eastern horizon at dawn: `sign`, `person` (a pictogram watching) |
| `aspect` | two planets on a wheel and the angle between them: `deg` (0 60 90 120 180), `a`, `b` (planet ids), `label` |
| `houses` | the 12 houses as a numbered wheel: `highlight` (numbers), `labels` (short room names) |
| `signcard` | a collectible sign card: `sign`, `title`, `line` |

### Houston (`vis/houston.js`) — generic shapes only; no logos, team marks, brands or stats
| k | params |
|---|---|
| `skyline` | a generic Houston-ish skyline: `time` night sunset day, `haze` (0–1 orange glow over the stars), `rocket`, `rain`, `heat` (shimmer), `windows` (two lit windows link in gold), `stars` |
| `map` | ring roads: `rings` (labels, default 610 / Beltway 8 / Grand Parkway), `hoods` (neighbourhood labels popping), `pins` (two pins link in gold), `spin` (rings morph into a zodiac wheel) |
| `freeway` | a wide multi-lane freeway with crawling brake lights: `shield` ("610", "I-10", "I-45", "59"), `clock` (spins), `label` |
| `food` | line-art food: `items` from taco kolache crawfish pho boba coffee donut bbq tamale burger fries |
| `weather` | `mode` swap (sun/rain every beat) / sun / rain / heat (melting thermometer) / cold-front / humid (frizz + steam); `person` |
| `lovebugs` | pairs of lovebugs flying joined, `n` |
| `bayou` | a winding bayou path at sunset with a skyline; `walkers` 1 or 2 |
| `truck` | a glowing generic food truck window at night; `people` 1 or 2 |

### Explain (`vis/explain.js`)
| k | params |
|---|---|
| `fact` | a big number/word card: `big` ("243"), `unit` ("days"), `note`, `tag` (FUN FACT) |
| `word` | etymology: `word`, `parts` [["dis", "bad"], ["astro", "star"]], `lang` (small line) |
| `versus` | split screen: `a`, `b`: `{ label, icon, col, lines? }`, `verdict`: vs ≠ a b = |
| `checklist` | `title`, `items`, `marks` (✓ / ✕ per item, default ✓) |
| `meter` | a gauge: `label`, `to` (0–1), `ticks` (labels along it), `col` |
| `flags` | waving flags: `red` (list), `green` (list) |
| `icons` | a row/grid of line icons: `items` ["coffee", {"i": "ghost", "label": "Ghosting"}], `layout` row / grid / orbit |
| `timeline` | a strip with `marks` (labels), `icons` (one per mark), the dot travels; `ding` (index that lights up) |
| `clock` | `from`, `to` ("7:00" → "7:45"), spins between; `label` |
| `heart` | `mode` beat / crack / heal / fill / lock / open; `label` |
| `scale` | balance scale: `a`, `b` (labels), `tilt` (-1 … 1) |
| `bars` | a jokey ranking: `items` [["Coffee", 0.6], …], `title` (never real-looking data) |
| `calendar` | pages flipping: `pages` (labels), `mark` (circled last page) |
| `ghost` | a ghost floating out of a phone; `label` |
| `butterflies` | butterflies bursting out of a heart / a jar; `n` |
| `grid` | a 3×3 bingo/tic-tac-toe card stamping cells: `title`, `cells` (9 labels), `order` (stamp order) |
| `note` | a notes-app / letter card with lines that type in: `title`, `lines` |
| `notif` | a lock screen with notifications dropping: `items` [["Calendar", "Date night · 7 PM"], …], `time` |

Icon names (for `icons`, `prop`, `gag`, `versus.icon`, `timeline.icons`): heart broken-heart ghost phone chat coffee taco
kolache crawfish cake gift ring rose flower plant sun moon star cloud rain umbrella snow fire wave mountain wind bolt
lightbulb book music headphones plane car house key lock clock calendar pin magnifier camera mirror bed dog cat
briefcase money dumbbell game popcorn ticket compass telescope rocket crown flag-red flag-green check cross question
hourglass battery wifi megaphone brain door suitcase icecream hat boots taco-truck bus bike sneaker paint mask
balloon candle letter hand puzzle anchor shell

## Writing a visual module
`export default { kind: { draw(x, p, s), cues?(p, t0, dur, ctx), min?(p), own? } }`, registered in `vis/index.js`.
- `x`: the 2D context (1080 × 1920). `p`: the script's vis params. `s`: `{ t, lt, dur, clt, cdur, k, out, cx, cy, w, h,
  top, bottom, seed, prev, step, voiced, beat, final }`: `lt` = seconds since the beat started, `clt` since its chain
  started, `dur` the beat length, `cx, cy, w, h` the box. Draw centred on `cx, cy` and inside `w × h`.
- The engine already scales and fades the whole visual in (`k`) and out (`out`); set `own: true` to handle that yourself.
- Pure function of its arguments: no state between frames, no `Math.random` (use `rng(seed)`), no `document` at module
  top level (render.mjs imports the module in Node for `min` and the cues).
- `cues` returns SFX: `['pop', t, freq, gain≤0.06, pan]`, `['pluck', t, f, gain, decay, pan]`, `['bell', t, f, gain,
  decay, pan]`, `['tick', t, gain]`, `['whoosh', t, len, gain]`, `['boom', t, gain≤0.18]`, `['glitter', t0, t1]`,
  `['riser', t0, t1, gain]`. Times are absolute (t0 = the beat start).
- Use the kit (`../kit.js`): `ink` (fill + thick glowing stroke: the house look, strokes 5–9 px, fills 20–40%),
  `line`, `rr`, `panel`, `label`, `para`, `pill`, `bubble`, `glyph`, `person`, `heart`, `sparkle`, `twinkles`,
  `cardBack`, `aura`, `pop01`, `popOut`, `wob`, `stagger`, `easeOutBack`, colours and `SIGNS` / `PLANETS`.
- Big and bold: a visual should read on a phone at a glance. Labels ≥ 36 px.
