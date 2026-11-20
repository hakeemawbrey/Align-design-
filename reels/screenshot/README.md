# Align "screenshot your card" reel

A vertical reel (1080 × 1920, about 27 s) built on the "stop scrolling, close
your eyes, screenshot" format: oracle-deck pages flash cards too fast to
choose, viewers screenshot one, then comment the number they caught.

The Align version uses the app's own **talk cards**. All 51 come straight from
`app/src/data/talkCards.ts`, drawn like the in-chat tarot card: arcana,
topic glyph, rare and legendary edges. Whatever you catch becomes **your
question for tonight**, to ask the person you're talking to.

| Beat | Seconds | On screen |
| --- | --- | --- |
| stop | 2.6 | STOP SCROLLING · this deck has a question for you |
| breath | 3.0 | close your eyes · breathe in… and out (the halo breathes) |
| ready | 2.4 | think of the person you're talking to · screenshot when it feels right |
| flash | 10.2 | 51 cards, 0.2 s (6 frames) each, numbered No. 1–51, "screenshot now" pulsing |
| reveal | 3.0 | the card you caught is your question for tonight |
| comment | 2.8 | comment your card's number · then send this to them |
| end | 2.8 | Align · 51 talk cards. play them with your match. |

Every card holds for 6 whole frames with hard cuts, so any screenshot or pause
lands on one clean card. The score is synthesised: a pad that swells with the
breath, a soft pentatonic tick per card, and chimes on each beat.

## Render

Needs Node 18+, Python 3 with numpy, and ffmpeg. Run `npm install` in
`carousel/` once for Playwright and the fonts.

```bash
node reels/screenshot/render.mjs            # → reels/out/screenshot/screenshot.mp4, .web.mp4, cover.jpg, cards.txt
node reels/screenshot/render.mjs --stills   # a few frames as PNGs
node reels/screenshot/render.mjs --seed 4   # a different card order (a fresh post)
```

If Playwright can't find its browser, point it at one:
`CHROMIUM_PATH=/opt/pw-browsers/chromium node reels/screenshot/render.mjs`.

`cards.txt` lists which question is behind each number, so you can reply to
comments ("17! that one's a good one").

## Caption

> STOP SCROLLING ✋ Close your eyes, take one breath, and think of the person
> you're talking to. Screenshot when it feels right.
>
> The card you caught is your question for tonight. Ask them, then comment
> your card's number below ⬇️ Send this to them so they can pull one too.
>
> 51 talk cards, in Align ✦
>
> #talkcards #datingadvice #couplesquestions #tarot #screenshotgame #relationshipgoals

The score is original, so it's safe to post as is. To use a trending sound
(the format usually runs on a soft, dreamy track), turn the reel's own audio
down to 0 in Instagram's editor and add the sound there.
