# Align "draw your sign" reels

Twelve vertical reels (1080 × 1920, 30 fps, 31–44 s), one for each sign. The
sign is drawn on graph paper one marker line at a time, while a playhead loops
across the sheet. **Every line the playhead crosses plays a note.** How high the
line sits sets the pitch, and its colour sets the instrument. Nothing is
pre-composed: the tune is the drawing, so it grows denser as the picture fills in.

The format comes from the "draw a picture, hear it play" reels. The drawings, the
UI, the words and the sound are all original and made in code here.

| Path | What |
| --- | --- |
| `drawings.py` | the twelve drawings as strokes on a 100 × 130 sheet, plus each sign's glyph |
| `sound.py` | the sign's key and tempo, the instruments (one per marker colour) and the mix |
| `render.py` | the timeline, the notes taken from the drawing, the frames, then ffmpeg |

## Render

Needs Python 3 with numpy and Pillow, plus ffmpeg. It uses the fonts in `../signs/assets/fonts`.

```bash
python3 render.py                 # all twelve → ../out/draw/<nn>-<sign>.mp4
python3 render.py leo pisces      # just these
python3 render.py --stills        # 4-frame contact sheets in ../out/draw/stills/ (seconds)
python3 render.py --jobs 3        # reels rendered at once
```

Each sign writes `<nn>-<sign>.mp4` (the file to post), `.web.mp4` (720p, for
previewing), `.cover.jpg` (the finished drawing) and `.txt` (caption and hashtags).
All twelve take about 5 minutes on 4 cores.

## How it plays

- **Tempo:** each sign has its own bpm (80–108). One sweep of the sheet is 16 sixteenth notes.
- **Key:** set by element. Fire is major pentatonic, earth is a warm six-note major
  scale, air is lydian and water is minor pentatonic. The top of the sheet is high, the bottom is low.
- **Colours → instruments:** ink = bass, green = marimba, orange = pluck,
  sand = low pluck, blue = bell, sky = flute, red = piano, pink = glass, violet = chime.
- The ground or water is drawn first so the low line comes in first. The subject
  and its details come next, and the glyph comes last.
- When a note sounds, a ring pulses where the playhead hit the line. Dots mark every crossing.
- After the last stroke, the finished drawing plays three full loops. The
  subtitle then changes to the sign's line, e.g. *"low, slow, and it stays with you."*

## Writing a new one

Add a function to `drawings.py` that returns `(colour, points)` strokes in drawing
order. The helpers are `P` (a smooth curve through points), `poly`, `arc`, `circle`,
`spiral`, `wave`, `mirror`, `sun`, `stars` and `crescent`. Then add it to `SIGNS`,
give it a key in `sound.py` and a line in `COPY` in `render.py`. Run `--stills` to
check the picture before rendering the video.
