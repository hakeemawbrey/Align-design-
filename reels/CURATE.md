# Curating a sign

The reels are only as good as the images in `picks/<sign>.json`. This is the
brief for whoever picks them, a person or an agent.

## The target

Reference: an 18s tarot reel. The card sits alone on black and steps bigger on
three beats; a hit lands at 2.2s; then a full-bleed image cuts in every 0.6s
with the card ghosted at 50% in the centre. Each image is on screen for 0.6s,
so it has to land instantly:

- **One bold read.** A single strong subject or a big atmosphere (a lion's
  face, a volcano at night, a figure in a beam of light). No busy group
  scenes, no small subjects lost in the frame.
- **Dark and luminous.** Deep blacks with light coming out of them beat
  flat, evenly lit, beige images. Nebulae, storms, fire, moonlight, chiaroscuro
  paintings (Caravaggio, Rembrandt, Doré, Blake, Turner, Böcklin, Redon).
- **Works at 9:16.** The image is cropped portrait. Landscape images need a
  subject you can centre with `focus`. Remember the card covers the middle
  ~40% x 30%: the subject can sit behind it (like the reference) or around it,
  but the frame must still read.
- **One mood.** The reference holds about 10 images that all share black
  grounds, cold or white light and one central figure. Prefer that over a
  palette that swings between orange, pink and rainbow. Avoid anything that
  reads comic or domestic (farm animals in daylight, pets), urban scenes, and
  hazy mid-tone mush (dust, fog, beige skies).
- **On motif.** Every image should say the sign: its animal, its myth, its
  ruler planet, its element, its season. Mix the literal (ram, horns) with the
  atmospheric (fire, forge, dawn). The animal or figure itself should appear in
  at least 4 of the picks.
- **Variety.** Mix paintings, photographs and space. No two images that look
  alike. No text, logos, watermarks, maps, coins, objects on white, sketches,
  museum vitrines, rawpixel images (their downloads carry a tiled
  watermark), modern sports, or anything gory or sexual. Classical nudity
  is fine only if it's not the focus of the frame.

## The file

```json
{
  "plate": {"file": "cache/aries/plate/0.jpg", "crop": [0.30, 0.08, 0.80, 0.95],
            "id": "...", "url": "...", "alt_url": "...", "title": "...", "creator": "...",
            "license": "...", "landing": "..."},
  "images": [
    {"file": "cache/aries/cand/aic-123.jpg", "focus": [0.5, 0.4], "note": "Goya, boy on a ram",
     "id": "...", "url": "...", "alt_url": "...", "title": "...", "creator": "...",
     "license": "...", "landing": "..."}
  ]
}
```

- Copy every field of a candidate from `cache/<sign>/candidates.json` except
  `hash`, and prefix `file` with `cache/<sign>/cand/` (the
  urls let anyone re-download it later; `cache/` is not committed), then add
  `focus` (x, y in 0-1: the point to keep centred when cropping to 9:16) and a
  short `note`. Optional `zoom` (default 1.0, e.g. 1.3) crops tighter so
  `focus` can also move the subject up or down, e.g. to lift a face clear of
  the card.
- Plate: prefer `cache/<sign>/plate/commons.jpg` (metadata in `commons.json`,
  fetched by `plates.py`) when it exists.
- `plate.crop` is a box in 0-1 of the Urania's Mirror plate. Keep the
  card's portrait aspect, roughly 0.55 wide x 0.9 tall on a landscape plate, so
  the creature's head and body read; skip it to auto-centre on the figure.
  Some plates (Leo) are portrait; crop accordingly.
- Pick **14-18 images**. Each render samples 12 of them, so a pool larger than
  12 is what makes every render different.

## Tools

```sh
python3 fetch.py <sign>                                  # candidates + numbered sheets
python3 fetch.py <sign> --only-extra --sources aic,met,nasa --extra "lion painting" "lioness"
python3 card.py <sign> --plate cache/<sign>/plate/0.jpg --out /tmp/c.png   # try a plate
python3 tools/picks_sheet.py <sign>                      # see the picks as the reel will
python3 render.py <sign> --preview                       # 20s half-res render
tools/sheet.sh out/<sign>-s0-preview.mp4 /tmp/s.png      # contact sheet of a render
```

Openverse (Wikimedia/rawpixel/Flickr) allows 200 searches a day for the whole
machine, so do extra searches on `aic,met,nasa` unless a motif really needs
photographs; then at most 4 openverse queries per sign. Don't reuse an image
another sign already picked (check `picks/*.json`).

`python3 card.py <sign> --plate <file> --crop X0 Y0 X1 Y1 --out /tmp/c.png` tests a crop.
