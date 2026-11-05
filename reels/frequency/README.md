# Align frequency reels

Vertical reels (1080 × 1920, 30–35 s) for a new page, **Align · Frequencies**.
Each one is a hypnotic 3D animation of something clicking into alignment,
scored with tones that come from the real sky, and it ends on **"comment
WORD"** so the page can DM a long version and the Align link.

The page and its funnel are in [PROFILE.md](PROFILE.md).

## Where the format comes from

The structure is borrowed from @resonara1's chakra-alignment reels (three of
them are in `inspo/data/inspo.json`: `i0214`, `i0240`, `i0263`):

- **Something aligns while you watch.** Seven points click into one line, or
  the camera flies through a run of gates.
- **One tone per stage**, with a headphones prompt up front.
- **A hook line on frame one** ("watch… click into line", "don't blink").
- **A caption that teaches** one real thing (the numbers, where a symbol comes from).
- **"Comment WORD for the full frequency"** at the end, which a DM tool answers.

Nothing of theirs is reused: no footage, audio, captions or chakra visuals.
The subjects (planets, signs, Venus and the Moon, the heart lotus), the art,
the words and the sound are all Align's own and drawn in code.

## Align's twist: the tones are real

Most frequency pages use solfeggio numbers. These reels use the **cosmic
octave**: take a planet's real cycle, double its frequency until you can
hear it, and that's the planet's tone. Doubling is an octave, so it's the same
note, only higher. `engine.js` works these out from the periods:

| Planet | Cycle | Octaves up | Tone |
| --- | --- | --- | --- |
| Sun | 365.242 days (one year, the sun round the zodiac) | 32 | 136.10 Hz |
| Moon | 29.531 days (new moon to new moon) | 29 | 210.42 Hz |
| Mercury | 87.969 days | 30 | 141.27 Hz |
| Venus | 224.701 days | 32 | 221.23 Hz |
| Mars | 686.98 days | 33 | 144.72 Hz |
| Jupiter | 4,332.59 days | 36 | 183.58 Hz |
| Saturn | 10,759.22 days | 37 | 147.85 Hz |

Where tones sound together they're voiced in different octaves so they don't
blur. The labels always give the canonical value. The heart reel uses 639 Hz,
the solfeggio tone traditionally tied to the heart and relationships, because
that's the number people search for.

**What the page never says:** that a tone heals, cures, fixes anxiety or
"reprograms" anything. Say what's true: where the number comes from, what
the symbol traditionally means, that the binaural reel's two tones are 10.81 Hz
apart, which falls in the alpha range.

## The four reels

| Script | Mode | What happens | Ends on |
| --- | --- | --- | --- |
| `01-seven-planets` | `planets` | The seven classical planets orbit loose, then click into one vertical line, Moon at the bottom to Saturn at the top (fastest to slowest, the old order of the sky). Each one sounds its tone as it locks in. A gold thread runs through all seven: *aligned.* | ALIGNED · the full seven minutes |
| `02-twelve-gates` | `gates` | A fly-through of twelve gates, Aries to Pisces. Each is its element's old symbol (fire △, earth ▽ with a bar, air △ with a bar, water ▽) with the sign's glyph in the middle. Passing one sounds the planet that rules it, over the year tone. | YOUR SIGN · its tone + what it needs in love |
| `03-venus-moon` | `channels` | Two strands braid up a column. Venus (rose) plays only in the **left** ear and the Moon (silver) only in the **right**. They're 10.81 Hz apart, so on headphones you hear a slow wobble in the middle of your head (a binaural beat). They cross seven times and close into one gold line. | VENUS · ten minutes + what your Venus and Moon need |
| `04-heart-639` | `heart` | The heart's old symbol: two triangles in a lotus of twelve petals (one per sign). One moves alone: nothing. The other moves alone: nothing. Both move: they lock into a six-pointed star and the lotus lights. *It has to be mutual.* | MUTUAL · the full 639 Hz, ten minutes |

Align shows up lightly in each: the small wordmark at the top, one line that
ties the idea to the app ("align reads both before you see a face", "it has
to be mutual"), and the ending card ("your chart is free · link in bio").

## Render

Needs Node 18+, Python 3 with numpy, and ffmpeg. Run `npm install` in
`carousel/` once (Playwright, three and the fonts come from there).

```bash
node reels/frequency/render.mjs --stills        # contact sheets → reels/out/frequency/stills/
node reels/frequency/render.mjs                 # every reel → reels/out/frequency/<id>.mp4 (+ .web.mp4, .cover.jpg)
node reels/frequency/render.mjs heart           # by id
node reels/frequency/render.mjs --jobs 2        # two at once
node reels/frequency/render.mjs --audio         # redo only the sound of reels already rendered
node reels/frequency/render.mjs --full          # the long versions for the DMs → reels/out/frequency/full/
node reels/frequency/render.mjs --pfp           # profile picture options → reels/frequency/profile/
```

A reel takes about 15 minutes on a 4-core machine with no GPU (the 3D runs in
software). It's much faster on a laptop with a GPU.

`--full` writes a `.m4a` and a `.mp4` (the finished scene held as a still) for
each reel, plus one 3-minute tone per sign for the gates reel. Upload the
`.mp4`s to YouTube (unlisted is fine) or anywhere you can link from a DM.

## Files

| Path | What |
| --- | --- |
| `scripts/*.json` | one script per reel: lines, timings, the ask, caption, hashtags |
| `engine.js` | the four scenes (three.js) plus the words over them; also writes each reel's sound cues |
| `score.py` | turns the cues into audio: held tones, bells, lock-in clicks, whooshes, air, per-ear reverb |
| `render.mjs` | script → frames → MP4; stills, long versions, profile pictures |
| `profile/` | profile picture options (`pfp.json` says what each one is) |
| `PROFILE.md` | the page: handle, bio, the DM for every keyword, how to post |

## Script contract

```json
{
  "id": "04-heart-639",
  "mode": "heart",
  "eyebrow": { "text": "headphones on", "to": 8.0 },
  "lines": [
    { "at": 0, "to": 3.8, "text": "639 hz, the frequency of the heart" },
    { "at": 26.4, "to": 28.8, "text": "it has to be *mutual.*" }
  ],
  "cta": { "at": 29.2, "word": "mutual", "sub": "for the full 639 hz, ten minutes" },
  "full": { "seconds": 600 },
  "cover": 22.0,
  "caption": "…",
  "hashtags": ["639hz", "solfeggio", "heartchakra", "astrology", "headphoneson"]
}
```

- `mode` picks the scene. Each mode has a fixed choreography (when planets
  lock, when gates pass, when the triangles meet), so time the `lines` to it.
  Use the stills to check.
- `lines`: one at a time, lowercase, 25–55 characters (60 at most). The first
  is on screen at frame one. `*word*` is drawn in gold. `size` overrides the
  64 px default (the planets reel uses 96 for *aligned.*).
- `cta.word` is the comment keyword. Keep it to one word if you can; set the
  DM trigger to match it exactly.
- `cover` is the time of the frame saved as `<id>.cover.jpg` for the grid.
- `full.variants` (gates only) renders one long tone per sign.
