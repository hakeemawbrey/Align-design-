# Align pixel reels

Endless pixel-art reels with gentle advice for each zodiac sign. They're
1080 × 1920, about 25–30 s long, with an original score. Every `(sign, seed)` pair
gives a new reel: new lines from the bank, a new frame, new colours and new
music. You can keep generating forever.

Two looks:

| Style | What it is |
| --- | --- |
| `frame` (default) | A mystic card: black starry sky, a mirrored botanical frame (crossing bands, a lens, a ring, long leaves, white tulips/bells) that grows in from the corners, gold sparkles and comets, a needlepoint mesh on the ornament, one quote at a time in a pixel serif, and the sign's little creature under the ring. A dreamy music-box score. |
| `scene` | A cozy RPG night scene (hill, window, lake, campfire, meadow, rooftop), with the creature on screen, advice typed into a dialogue box, and a chiptune score with text blips. |

The frame look is inspired by mystic quote reels. Every leaf, line, creature,
word and note here is drawn, written or synthesised in code for Align.

## Make reels

Needs Python 3 with numpy and Pillow, and ffmpeg.

```bash
python3 render.py --all                 # the 12-pack, seed 0 -> out/<sign>-s0.mp4
python3 render.py --all --seed 1        # a whole new 12-pack
python3 render.py leo --seed 7          # one reel
python3 render.py --forever --jobs 4    # endless: every sign at seed N, then N+1, ...
python3 render.py --forever --count 36  # stop after 36 new reels
python3 render.py --style scene --all   # the RPG look
python3 render.py aries --stills        # a contact sheet in out/stills/ (seconds, no video)
```

Each reel writes:

- `<name>.mp4`: the full-quality file to post;
- `<name>.web.mp4`: a light 540p preview;
- `<name>.cover.png`: a cover frame;
- `<name>.txt`: the caption, the hashtags and the lines used.

Existing reels are skipped, so `--forever` picks up where it stopped. A reel
takes about a minute; `--jobs` runs several at once.

## Files

| File | What |
| --- | --- |
| `bank.json` | the words: per sign, 12 hooks, 45 advice lines, 10 closers, 8 captions, 8 hashtags; plus the end lines |
| `frame.py` | the frame style: ornament generator, sky, quote layout, mesh |
| `engine.py` | the scene style: six night scenes, dialogue box, emotes |
| `sprites.py` | the 12 sign creatures + Stardust, with idle bob and blink, and the zodiac glyphs |
| `chip.py` | the score: `dream` (music box, pads, hall reverb) and `chip` (soft chiptune), composed from the seed |
| `render.py` | plan → frames → ffmpeg, batches and `--forever` |
| `assets/fonts/` | Pixelify Sans, Silkscreen, EB Garamond (all OFL) |

## The words

`render.py` picks one hook, three advice lines (walking each sign's list in
a fixed shuffled order, so consecutive seeds don't repeat lines until the list
runs out), one closer, and a "send this to your …" end card. The voice rules
are in `../SPEC.md`. To add lines, edit `bank.json`. Advice lines must stay
at 66 characters or less.

## Posting

Upload the `.mp4` as a reel, with the caption and hashtags from the `.txt`.
The score is original, so it's safe to post as is. To use a trending sound
instead, turn the reel's audio down in Instagram's editor.
