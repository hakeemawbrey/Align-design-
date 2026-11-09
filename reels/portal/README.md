# Align · Portals reels

Vertical reels (1080 × 1920, 30 fps, ~55 s) built around a real upcoming sky
date (11/11, a full moon, Venus turning direct, the solstice) and three steps
for love on that day. Everything is drawn as glowing dot-matrix / LED-pixel
art on a black sky: objects build in dot by dot, sparkle as each dot lands,
and blow away into dust as the next one builds. A three-step tracker sits at
the top, a small gold mono label under each object, karaoke captions in the
lower third, and every reel ends on a "+ FOLLOW" pill.

The format (a dated cosmic event as the hook, one big glowing dot-matrix
object per beat, a three-step tracker, word-by-word captions, a recap of the
steps and a follow ending) was inspired by a @claravaleofficial 11/11 portal
reel, used only as a format reference. Every drawing here is original to
Align and drawn in code; the voice is the open-weights Kokoro model and the
music is synthesised.

| Path | What |
| --- | --- |
| `scripts/*.json` | one script per reel |
| `engine.js` | the dot-matrix scene engine (Chromium canvas): arts, dust, tracker, labels, captions, pill |
| `render.mjs` | script → voice → frames (Playwright Chromium) → MP4 with ffmpeg |
| `bed.py` | an original glassy ambient bed: slow open maj7/add9 pad, low drone, faint air, a glass note per new object, a soft three-note chime when each step lights, a two-note chime for the pill |
| `../affirm/voice.py` | **shared**: speaks each scene with Kokoro and reports every word's timing |
| `../affirm/glyphs.json` | **shared**: zodiac and planet symbols as paths |
| `../out/portal/` | renders, covers, captions, stills (git-ignored) |

## Setup (once)

Same as the affirm series: Node 18+, Python 3, ffmpeg, `npm install` in
`carousel/` (Playwright and the fonts), and the voice:

```bash
reels/affirm/setup.sh        # venv + Kokoro model in reels/affirm/.voice
```

## Render

```bash
node reels/portal/render.mjs --stills          # contact sheets + covers → reels/out/portal/stills/ (~1 min a reel)
node reels/portal/render.mjs                   # every reel → reels/out/portal/<id>.mp4
node reels/portal/render.mjs eleven venus      # by id (substring match)
node reels/portal/render.mjs --jobs 4          # parallel reels (default 2)
node reels/portal/render.mjs --remix           # new music/voice mix onto the existing video (fast)
node reels/portal/render.mjs --skip-existing   # resume a batch
node reels/portal/render.mjs --stills --at 8.3,8.6 eleven   # stills at exact seconds (check a transition)
```

Each reel gives you `<id>.mp4` (full quality), `<id>.web.mp4` (720p),
`<id>.cover.jpg` (grid cover: first object + the `cover` hook) and
`<id>.caption.txt` (caption, follow line, hashtags; the default follow line is
left out when the caption already says "follow", and `cta` replaces it). The voice is cached per
script in `out/portal/voice/`, so art changes don't re-synthesise it. A full
reel takes ~3–4 CPU-minutes.

## Script contract

```json
{
  "id": "01-eleven-eleven",
  "title": "The 11/11 love portal",
  "date": "2026-11-11",
  "cover": "The *11/11* portal opens in two days",
  "caption": "…", "hashtags": ["1111portal", "numerology"],
  "cta": "optional: replaces the follow line in caption.txt",
  "voice": "af_heart", "speed": 0.95,
  "steps": ["RELEASE", "WRITE", "RECEIVE"],
  "scenes": [
    {
      "art": "calendar",
      "opts": { "month": "NOVEMBER", "day": "11/11", "sub": "MONTH 11 · DAY 11" },
      "label": "TWO DAYS AWAY",
      "step": null,
      "lines": ["*Eleven eleven* opens in two days.", "Here's exactly what to do for *love.*"],
      "show": { "0": "*11/11* opens in two days." }
    }
  ]
}
```

- **lines**: what the voice says, one caption at a time (3–9 words). `*word*`
  is set semi-bold and glows while said. Spoken words stay lit, upcoming ones
  are dim, the current word is brightest. "Align" lights gold. Spell numbers as
  words where the voice must say them right.
- **show** (optional): line index → what the caption displays instead (digits:
  "11/11", "11:11"). Word counts may differ; timing is shared out proportionally.
- **step**: 0/1/2 lights the tracker up to that step when the scene starts (a
  chime plays); `null` before the first step keeps the tracker hidden. Once
  shown it stays. `steps` names the three dots.
- **label**: small gold mono caption under the object, typed on as the scene
  starts. `labels: [{"at": 2, "text": "…"}]` swaps it at caption line 2.
- **pause** (optional): seconds of silence after each sentence (default 0.25).
- Last scene: `pill` ("+ FOLLOW" or "FOLLOW FOR THE NEXT PORTAL") appears after
  line `pillAt` ends, with a chime.
- Any scene may add `"with": [{"art": "list", "opts": {"scale": 0.5, "y": 250, "filled": true}}]`
  to keep a previous object, smaller, alongside the new one (the reference's
  list under the clock). Any art takes `scale` and `y` (and in `with`, `x`)
  offsets in px. `filled: true` on a list writes its items in straight away.
- Two scenes in a row with the same `art` **morph**: the old dots fly into the
  new shape instead of dissolving and rebuilding ("1" → "11", moon → moon).
  `"morph": false` in the second scene's opts turns it off.
- The caption band is never blank: each line hands straight to the next, across
  scene changes too. The first word lands within ~0.15 s.
- Extra fields (`postBy`, `sources`, …) are ignored by the renderer.
- Aim for ~125–135 words: about 55 s.

Timing words: "stage n" means the moment caption line n starts. Items that
appear mid-scene (note words, list items, recap words) are timed to the moment
their own words are said in the captions; if a phrase isn't spoken they fall
back to one per line from the given stage, or are spread across the lines.

### Arts

| art | what | opts |
| --- | --- | --- |
| `calendar` | dotted calendar card with two ring binders, LED month, gold divider, a giant dot-matrix date with a warm bloom | `month`, `day` ("11/11", "1/1"), `sub` ("MONTH 11 · DAY 11") |
| `numeral` | giant dot-matrix characters ("1", "11", "1 2") or a zodiac/planet glyph (♀ ☽ ♊ ♋ ♎ ♐ …) | `text`, `halo`: `null` · `"rays"` (rings, orbiting beads, gold rays and a rising half-sun on a horizon) · `"wheel"` (rings with the twelve sign glyphs) · `true` = rays |
| `pillars` | gold sparkle pillars rising like a gate, bright heads climbing, warm floor glow | `count` (even counts stand in pairs: 4 = "11 11", 2 = "1 1") |
| `portal` | dotted arch doorway with gold sparkle jambs; inside a deep violet nebula, a starfield and stars streaming out of a soft core; a star above, floor glow; icons drift slowly around it | `inside`: `"stars"` (core) · `"heart"` · `"moon"` (crescent); `icons`: up to six of `star` `heart` `house` `key` `letter` `ring` `moon` `spark` floating around |
| `note` | dotted card titled in LED; words written in as they're said; a gold slash, then the words blow away into dust | `title`, `words` [..], `wordsAt` (first stage to look for the words, default 1), `dissolveAt` (stage of the tear, `null` = keep; every word is on the card before it), `circle` [indices] + `circleAt` (stage): a gold hand-drawn ring around those words |
| `list` | lined page numbered 1..count, little gold stars, wavy dotted lines; items written in as they're said, their stars lighting | `title` (LED header), `count`, `items` [..], `itemsAt` (stage), `filled` (items already written), `circle` [indices] + `circleAt` (stage): gold rings around those items, each as it's said again if it is |
| `candle` | a dot-matrix candle on a gold plate; the wick catches with a spark and the flame flickers, warming the wax | `litAt` (stage it lights, default 1), `lit` (lit from the start), `count` (3 = a small candle either side, lighting just after) |
| `clock` | dot-matrix clock, gold blinking colon, gold rails | `time` ("11:11", "00:00") |
| `moon` | dot-matrix moon with craters and the right phase shadow, a gold ring, a glyph top right | `phase` 0 new · 0.25 first quarter · 0.5 full · 0.75 last quarter (1 also = full), `glyph` |
| `planet` | dotted planet showing its phase (default a soft crescent, as Venus near the sun), a lilac limb and an orbit arc, its glyph top right; ☉ draws a sun with rays | `glyph`, `phase` (0 new · 0.5 full, default 0.17), `ring` (Saturn's ring, off by default), `retro`: adds the apparent retrograde loop traced across the sky (DIRECT · RX · DIRECT) |
| `words` | stacked big dot-matrix words, each appearing as it's said (the recap) | `items` [..] |
| `card` | Align's veiled card: gold dotted card, violet dot veil with Align's star; the veil blows away to show the face | `face` (word or "11:11"), `sub` (LED gold, wrapped onto up to 3 lines, 35 px tall), `glyph` (optional, above the face), `revealAt` (stage) |
| `figures` | two star-headed Stardust figures on a lit horizon | `pose`: `"apart"` (a gold thread between their hands) · `"meet"` (hands joined, a heart above) |

## Voice and astrology rules

As the brief and `reels/SPEC.md`: second person, calm and warm, no
exclamation marks, astrology reads but never decides, no promising a
soulmate, every date and fact true. Say **"the Align app"**, never just
"Align" (spoken, it sounds like "a line"). Pronunciation fixes live in
`LEXICON` in `reels/affirm/voice.py`, shared by both series.
