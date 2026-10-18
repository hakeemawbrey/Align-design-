# Align carousels: spec

The house format for Align's Instagram carousels. Every agent, script and
human writing carousels works to this file.

## The reference format

Modelled on @indig0.lin's "what a life" carousel (`reference-cover.jpg`):

- A full-bleed, moody photo: dark, glowing, grainy, neon purple / red / amber.
- **One fragment of one sentence per slide**, set huge in heavy white italic
  lowercase sans, sitting on the bottom of the frame ("soul to soul,").
- The sentence runs on across the slides, so you have to swipe to finish it.
  Commas and line breaks carry it; there's no title slide and no "swipe →".
- The post caption is tiny and offhand ("what a life").

Align's version is the same format about dating, the zodiac and alignment.
The advice is **blunt**, and Align's core message is **sprinkled in subtly**:
never an ad, never "download Align".

## Align's core message (pick 1–2 per carousel, say them in passing)

- **Read the sky before the face.** On Align, photos stay veiled until you
  both align. People read your chart, not your face. ("your face comes last")
- **It has to be mutual.** Cards only flip when you *both* align. If it's one-sided,
  it isn't alignment, it's a hobby.
- **Say the honest thing.** The first thing you say should be true, not cute.
- **Dealbreakers go up front.** Put the truth on your card; people choose you blind.
- **Release, don't haunt.** Letting a card go is clean. Ghosting isn't.
- **A new deal at 11:11.** There's always another deck, so stop clinging to a bad hand.
- **Venus runs your heart.** Your Sun is who you are; your Venus is how you love.
- **Don't arrive alone.** The people who match your sky are out there.

Use the vocabulary lightly: *align*, *release*, *the deck*, *your card*,
*veiled*, *flip*, *your sky*, *11:11*, *venus*. At most two of these per
carousel. The rest is plain human advice.

## Voice

- Lowercase. Blunt, warm and a little funny. A friend who is done watching
  you text them first.
- Short words. No hashtag-speak, no emoji in slides, no exclamation marks,
  no "bestie", no "manifest", no therapy jargon ("attachment style" etc.).
- Astrology is the lens, not a lecture: name the sign and one true trait, then
  give advice that would be right for anyone.
- It can sting, but it never punches down at a sign or a person. The target
  is the behaviour.
- Never promise a soulmate or claim astrology decides anything. Align says "read".

## Slides

- **6–9 slides.** One sentence (or two short ones) across all of them.
- **1–6 words per slide**, ideally 2–4. Max ~32 characters per slide.
- Break on natural pauses. A slide ends on a comma, a dash, or mid-phrase
  to pull the swipe. Only the last slide ends with a full stop (or nothing).
- The first slide is the hook and must make sense alone ("scorpio,",
  "if they wanted to,", "dear leo,").
- The last slide lands the blow. The subtle Align line usually sits in the
  last two slides.

## Visual

**Default style: `type`, just text.** No photos: a near-black indigo slide
with the faintest wash of the sign's colour at the bottom, and the words set
in **the sign's own colour** (the app's sign colours, `SIGN_COLORS` in
`src/schema.mjs`, e.g. Scorpio garnet `#e23d66`, Cancer tide `#3fb6f0`,
Capricorn jade `#2fc79a`). The colour comes from the carousel's first sign.
Slide `bg` is ignored in this style.

**Optional style: `photo`.** Warm-white type over each slide's `bg` (below),
like the reference post. Pick it per run with `--style photo`, or per carousel
with `"style": "photo"` in its JSON.

Both styles share the type and layout:

- Canvas **1080 × 1350** (Instagram 4:5). Exported as JPEG.
- Type: **Poppins 800 italic**, lowercase, sign colour (`type`) or warm white `#fff7ec` (`photo`), tight
  tracking (-0.02em), line-height 0.98, ~118px, left-aligned with a 64px
  gutter, bottom 120px. Long fragments wrap to two lines; the size steps down
  so nothing ever overflows.
- `photo` only: a soft dark gradient on the bottom 45% keeps the type legible.
- Film grain on everything. A tiny `align ✦` mark (Space Mono, 22px,
  0.24em tracking, 55% opacity) sits top-left, and a small `n/total` counter
  sits top-right. That's the only branding.

### Backgrounds (`photo` style)

Each slide still names a background, so any carousel can be rendered either way. Kinds:

| kind | params | what it is |
| --- | --- | --- |
| `figure` | `sign` | the sign's glowing constellation figure (`app/public/img/figure/<sign>.jpg`) |
| `aura` | `sign` | the sign's AuraCam silhouette (`app/public/img/aura/<sign>.jpg`) |
| `veil` | `person` 1–12 | a seeded profile photo, heavily blurred and tinted: a veiled card (`app/public/img/people/p<n>.jpg`) |
| `sky` | `tint`, `moon` (0–1 phase, optional) | a procedural night sky: indigo gradient, stars, optional moon |
| `neon` | `tint` | procedural darkness with one coloured neon glow, like the reference's purple/red room |

`tint` is one of `violet`, `rub` (red-pink), `ember` (orange), `gold`,
`tide` (blue), `spark` (green), or any `#hex`. Optional on every kind:
`zoom` (1–1.6) and `focus` (`"x% y%"`) to reframe the art across slides.

Tip: hold one background for 2–3 slides with a slowly changing `zoom` /
`focus` so the carousel feels like one scene. The reference does this.

## JSON format

One file per carousel in `content/`, named `<id>.json`.

```json
{
  "id": "01-scorpio-tests",
  "title": "Scorpio, stop testing people who already passed",
  "signs": ["scorpio"],
  "core": ["mutual", "honest"],
  "caption": "scorpio, put the magnifying glass down",
  "hashtags": ["scorpio", "zodiacdating", "astrology"],
  "slides": [
    { "text": "scorpio,", "bg": { "kind": "figure", "sign": "scorpio", "zoom": 1.1 } },
    { "text": "they already passed", "bg": { "kind": "figure", "sign": "scorpio", "zoom": 1.25, "focus": "50% 35%" } },
    { "text": "the test you never told them about." , "bg": { "kind": "neon", "tint": "rub" } }
  ]
}
```

- `core` lists which core messages it carries: `face-last`, `mutual`,
  `honest`, `dealbreakers`, `release`, `1111`, `venus`, `not-alone`.
- `caption`: lowercase, under 60 characters, offhand. No hashtags in it.
- `hashtags`: 3–6, no `#`.
- Slide `text` is lowercase. `\n` forces a line break. An optional
  `"size": "s" | "m" | "l"` overrides auto sizing.
