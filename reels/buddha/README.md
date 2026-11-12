# Buddha quote reels

An endless generator of Buddha quote posts in the style of
[@dontfearunknown](https://www.instagram.com/p/DfTN0pLxDwF/): a real Buddha
statue, recoloured in saturated neon tones over a painted sky, with a
hand-painted oil texture and bold white captions. The setup line goes on top
and the punchline at the bottom:

> **What stands in the way**
> …
> **becomes the way**

Every run makes a vertical reel (1080 × 1920 MP4 with music), a still of its
last frame, and a caption file. Nothing of theirs is reused: the statues are
public-domain museum photos, and the quotes, colours, texture and music are
made by this code.

## Set up (once)

You need Python 3 and ffmpeg (`brew install ffmpeg` on a Mac).

```bash
pip install pillow numpy rembg onnxruntime
python3 reels/buddha/fetch_images.py          # about 120 Buddha statue photos
```

`fetch_images.py` downloads Buddha and Bodhisattva sculptures from
[The Met's Open Access](https://www.metmuseum.org/hubs/open-access) collection.
It only takes ones marked public domain (CC0, free to post) and skips relief
panels and narrative scenes. It also cuts each statue out of its museum
backdrop so it can sit in a painted sky. Use `--max 300` for more. The first
run downloads the cut-out model (about 180 MB).
Credits go in `library/credits.json`.

`rembg` is optional. Without it, a simpler cut-out is used, which works on
plain backdrops but can leave holes in grey statues on grey backdrops.

## Make videos

```bash
python3 reels/buddha/generate.py                    # one
python3 reels/buddha/generate.py --count 30         # thirty
python3 reels/buddha/generate.py --forever          # keeps going until Ctrl-C
python3 reels/buddha/generate.py --theme love       # only love quotes (also: align, spiritual)
python3 reels/buddha/generate.py --square           # also a 1080 × 1080 picture post, like the original
python3 reels/buddha/generate.py --handle @yourpage # a small watermark with your handle
python3 reels/buddha/generate.py --no-credit        # leave the author's name off the picture
python3 reels/buddha/generate.py --cta "link in bio" # change the small bottom line
python3 reels/buddha/generate.py --no-cta           # leave the small bottom line off
python3 reels/buddha/generate.py --stills 12        # a quick contact sheet, no video
python3 reels/buddha/generate.py --style neon       # the glowing line-art Buddha instead (or: --style mix)
```

Everything goes to `reels/buddha/out/` (git-ignored):

| File | What |
| --- | --- |
| `buddha-<time>.mp4` | the reel: the picture held still for 7–16 s (long enough to read) with music |
| `buddha-<time>.jpg` | the same picture, for a feed post, story or pin |
| `buddha-<time>-square.jpg` | a square picture post (with `--square`) |
| `buddha-<time>.txt` | the caption: the quote, author, source and hashtags |

The reel is a still picture: no zoom and no text effects. All the text is on
screen from the first frame. A small, quiet line near the bottom says **come
align · join the beta**, and the caption file ends with it too. It sits above
where Instagram puts its buttons on a reel.

A reel takes about 10 s to make. `out/history.json` remembers what was used:
no quote repeats until every quote has had a turn, and every statue is used
once before any repeats.

## What changes between posts

| | Options |
| --- | --- |
| **Statue** | every photo in `library/` (and `images/`): heads, seated, standing, busts |
| **Framing** | face close-up, half body, whole statue |
| **Colours** | 8 looks: jade on a blue-and-gold sky, gold, violet, cosmic blue, rose, emerald, ocean, true colour |
| **Sky** | painted clouds, new every time |
| **Music** | an ambient pad and singing bowl, new key every time (original, so safe to post) |

To use a trending sound instead, turn the reel's audio down to 0 in
Instagram's editor and add the sound there.

## Your own pictures

Put `.jpg`, `.png` or `.webp` files in `reels/buddha/images/` and they join the
library. Run `python3 reels/buddha/fetch_images.py` again to make clean
cut-outs of them. Only use pictures you took or have the rights to post.

## Quotes

`quotes.json` holds 55 two-part quotes, each with a `top`, a `bottom`, an
`author`, a `source` and a `theme` (`love`, `align` or `spiritual`). Writing a
word in CAPS makes it the punch, as in "Happiness IS the way". They come from
the Buddha (Dhammapada, Metta Sutta), Marcus Aurelius, Lao Tzu, Seneca,
Epictetus, Rumi, Kahlil Gibran, Thich Nhat Hanh, Rilke, Kierkegaard, Nietzsche,
Frankl, Jung, Alan Watts, Pema Chödrön, Erich Fromm, bell hooks and others.

Every one has a real source. Many quotes credited to the Buddha online are
made up, so check a source before you add one. Rumi and Hafiz lines are modern
English versions (Coleman Barks, Daniel Ladinsky), and the `source` says so.

## Files

| Path | What |
| --- | --- |
| `generate.py` | the command: picks a quote and a look, makes the files (also the neon line-art style) |
| `painted.py` | the painted style: cut-out, recolour, sky, oil paint, captions, zoom |
| `fetch_images.py` | builds `library/` from The Met's public-domain collection |
| `quotes.json` | the quote bank |
| `images/` | your own pictures (optional) |
| `fonts/` | TikTok Sans, Cormorant Garamond, Cinzel (SIL Open Font License, `fonts/OFL.txt`) |
