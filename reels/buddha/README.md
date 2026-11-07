# Neon Buddha quote reels

An endless generator of vertical (1080 × 1920) quote reels: a glowing neon
Buddha, a hook line, a quote from the Buddha or a great philosopher revealed
line by line, and a calm ambient score with a singing-bowl strike. Every
video is a new mix, and nothing is downloaded: the figures, halos, music and
motion are all drawn in code.

## Run it

Needs Python 3 with `pillow` and `numpy` (`pip install pillow numpy`) and
`ffmpeg` (`brew install ffmpeg` on a Mac).

```bash
python3 reels/buddha/generate.py                  # one video
python3 reels/buddha/generate.py --count 30       # thirty
python3 reels/buddha/generate.py --forever        # keeps going until Ctrl-C
python3 reels/buddha/generate.py --theme love     # only love quotes (also: align, spiritual)
python3 reels/buddha/generate.py --stills 12      # a quick contact sheet of 12 looks, no video
```

Videos land in `reels/buddha/out/` (git-ignored) as `buddha-<time>.mp4`, each
with a matching `.txt` caption (quote, author, source and hashtags) ready to
paste. A video is 9–24 s depending on the quote, and takes about 30 s to make.

`out/history.json` remembers what was used: no quote repeats until every quote
in the bank has had a turn, and it avoids reusing the same look.

## What changes between videos

| | Options |
| --- | --- |
| **Figure** | seated in meditation, close-up head with curls, half-body bust |
| **Halo** | rings, sun rays, rotating mandala, flower of life, moon, chakra points |
| **Base** | lotus throne, water ripples, none |
| **Colours** | 8 neon palettes (violet/cyan, magenta/gold, jade, sunset, moonlight…) |
| **Hook** | "Read this slowly", "If this found you, it's for you", "On love"… |
| **Motion** | neon flicker-on, breathing glow, slow-turning halo, rising light motes |
| **Music** | a new key and chord each time |

That's over 500 looks before you count the quotes.

## Your own Buddha pictures

Put `.png`, `.jpg` or `.webp` files in `reels/buddha/images/` and about 4 in
10 videos will use one of them instead of a drawn figure:

- **Dark, already-neon art** (mostly black) is used as it is, with soft edges.
- **Ordinary photos or statues** are traced into glowing neon lines.

Only use pictures you made or have the rights to post.

## Adding quotes

Quotes live in `quotes.json`. Each has a `theme` (`love`, `align` or
`spiritual`), `author`, `source` and `text`. Add as many as you like.

The starter bank (42 quotes) only has quotes with a real source: the
Dhammapada and Metta Sutta for the Buddha, plus Rumi, Lao Tzu, Marcus Aurelius,
Seneca, Epictetus, Thich Nhat Hanh, Kahlil Gibran, Tagore, Rilke, Hafiz, Alan
Watts, Ram Dass, Socrates, Plato, Aristotle, Shunryu Suzuki and Pema Chödrön.
Many "Buddha quotes" online are made up, so check a source before you add one.
Rumi and Hafiz lines are modern English versions (Coleman Barks, Daniel
Ladinsky), and the `source` says so.

## Files

| Path | What |
| --- | --- |
| `generate.py` | the whole generator: figures, halos, text, animation, score, ffmpeg |
| `quotes.json` | the quote bank |
| `images/` | drop your own Buddha images here (optional) |
| `fonts/` | Cormorant Garamond and Cinzel (SIL Open Font License, `fonts/OFL.txt`) |
