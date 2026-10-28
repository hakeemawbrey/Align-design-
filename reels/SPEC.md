# Align zodiac reels: spec

Twelve vertical reels (1080 × 1920, ~45 s), one per sign, each spoken
directly to that sign.

## The format

A slow, dreamy collage reel: vintage-feeling landscapes (mountains, desert
roads, lakes, wheat fields) under impossible skies (ringed planets, huge
moons, a blue giant, a red planet rising over a ridge). The camera drifts and
pushes in slowly. Over each scene sits **one short line** in small warm-yellow
italic, centred, that fades in and out. The lines read as one calm, reflective
monologue, told a sentence at a time. No voiceover; ambient music only.

The art, words and music are all original to Align. Never reuse another
creator's footage, narration, lines or audio.

## Voice

- Spoken **to the sign**, second person. The first line names the sign
  ("dear virgo," / "aries, slow down for one minute.").
- Calm, warm and honest, like a letter written at 2am by someone who knows you.
  Reflective rather than blunt; it can still sting a little.
- Sentence case is fine; lowercase is fine. Pick one and stay consistent within a reel.
- Astrology is the lens: name 1–2 true traits of the sign (its element, its
  ruling planet, its habits in love) and turn them into something tender and
  useful. Never punch down at the sign.
- No emoji, no hashtags in lines, no exclamation marks, no "manifest", no
  therapy jargon, no promises of a soulmate. Astrology "reads", it never decides.
- Align's ideas are slipped in at most twice, never sold, never "download":
  read the sky before the face · it has to be mutual · say the honest thing ·
  dealbreakers up front · release, don't haunt · a new deal at 11:11 · Venus
  runs your heart · you won't arrive alone.
- End on a line that lands, then a final soft line (the last scene).

## Script contract

One JSON file per sign in `reels/scripts/<nn>-<sign>.json`
(nn = 01 aries … 12 pisces, zodiac order).

```json
{
  "id": "05-leo",
  "sign": "leo",
  "title": "Leo, the light doesn't need an audience",
  "caption": "for the leos who shine on empty rooms",
  "hashtags": ["leo", "astrology", "zodiac", "leoseason"],
  "scenes": [
    { "text": "dear leo,", "kind": "void", "body": "sun" },
    { "text": "...", "kind": "ridge", "body": "ringed", "sky": "dusk", "road": true }
  ]
}
```

- **11–14 scenes.** Each `text` is one line, **max 70 characters**, ideally
  25–55. The renderer wraps it to 2–3 short lines. A scene lasts ~3.4 s.
- `caption`: under 70 characters, lowercase, offhand. `hashtags`: 3–6, no `#`.

### Scene kinds (pick per line; vary them, hold a kind for 2 lines sometimes)

| kind | what it is |
| --- | --- |
| `void` | deep starfield, a single body centred, the line under it |
| `ridge` | layered mountain ridges at the bottom, sky above with a body |
| `road` | a road vanishing to the horizon between hills, body above |
| `lake` | ridges reflected in still water |
| `arch` | an arched window floating on dark, a landscape inside it |
| `ripple` | concentric rings pulsing out from a moon over a road |
| `burst` | hypnotic radiating rays behind a planet, mountains below |
| `rise` | a huge planet rising over a ridge (horizon curvature) |
| `figure` | the sign's own glowing constellation art, floating in the stars |
| `field` | a wheat field under a big sky |

Optional params: `body` = `moon` | `crescent` | `ringed` | `blue` | `red` |
`sun` | `earth` | `none`; `sky` = `night` | `dusk` | `teal` | `ember` |
`dawn` | `violet`; `road`: true (adds a road on `ridge`/`field`).
The renderer tints everything toward the sign's colour, so you don't need to.
