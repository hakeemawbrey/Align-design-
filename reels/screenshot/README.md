# Align "screenshot" reels

Vertical reels (1080 × 1920, 12 s) that ask you to **stop scrolling, close
your eyes, take a breath and screenshot**. A face-down Align card breathes
for a second, then the deck flicks through its cards about seven times a
second. Whatever card your screenshot lands on is yours, and the caption asks
you to comment the number you got.

The format was inspired by oracle-deck pages whose "screenshot your angel
number" reels pull hundreds of comments, because each comment is just a
number. The Align version keeps the mechanic and makes the rest its own:

- **The cards are real Align cards.** Each love number (000 to 999, 1111
  and 1212) is drawn the way the app draws a deck card
  (`app/src/components/deck/ProfileCard.tsx`, the beta look): the thick foil
  border in a sign's colour, the element orb, the sign's own aura art from
  `app/public/img/aura` with the number glowing in it, the sign and aura
  chip, spark / clash / align rows with strength dots, the message under a
  rule, and the `ALIGN · № 444/∞` footer. The intro is the app's face-down
  card (`CardBack.tsx`): violet glass, seed of life, the chakra column.
- **Hard cuts only.** No card is ever half-faded or moving when the frame
  is captured, so every screenshot lands on a whole, readable card.
- **Fair deck.** The order is shuffled in bags of the whole deck and never
  repeats a card twice in a row, so every number comes up about as often.
- **It loops.** No end card. The reel restarts on the face-down card, so
  people watch it again to try for a different number.
- **Original score.** A soft pad, a shimmer as the cards start, and one chime
  (`score.py`, numpy). To use a trending sound instead, turn the reel's own
  audio to 0 in Instagram's editor and add the sound there.

| Path | What |
| --- | --- |
| `scripts/*.json` | one script per reel: the hook, the deck, the caption |
| `engine.js` | the frame engine (run in Chromium) |
| `render.mjs` | script → frames → MP4 with ffmpeg |
| `score.py` | the ambient bed |
| `../out/screenshot/` | renders, covers, captions (git-ignored) |

## Render

Needs Node 18+, Python 3 with numpy, and ffmpeg. Playwright and the fonts come
from the carousel package, so run `npm install` in `carousel/` once.

```bash
node reels/screenshot/render.mjs --stills        # cover + every card as a screenshot would land, ~5 s
node reels/screenshot/render.mjs                 # every reel → reels/out/screenshot/<id>.mp4, ~30 s each
node reels/screenshot/render.mjs love-numbers    # by id
```

Each reel gives you `<id>.mp4` (to post), `<id>.web.mp4` (a light 720p
copy), `<id>.cover.jpg` (the face-down card under the hook) and
`<id>.caption.txt`.

## Writing a new deck

Copy a script and change the `cards`. Each card has a `big` (the number or
word that gets commented, shown in the aura), a `title` (top left, where a
person's name goes), a `sign` (its colour, element orb and aura), `spark`,
`clash` and `align` as `[text, strength 1–3]` (keep each under about 40
characters so it stays on one line), and a `line` (the message, up to about
20 words). Keep
the deck to about 8–14 cards, so a 12 s reel shows each one several times.
`hold` is frames per card at 30 fps (4 ≈ 7.5 cards a second; lower is
harder to stop on), and `intro` is the seconds on the face-down card.

Ideas that fit the same mechanic: your next date's sign, a message from your
future person, your love era for the month, the Venus word you get.
