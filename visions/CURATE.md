# Curating an image pool

Every reel draws ~20 pictures from the pools its line names, so the reels are
only as good as `pool/<mood>.json`. This is the brief for whoever fills a pool,
a person or an agent.

## The target

Reference: a 9-second @zenllov reel (instagram.com/reel/DeHiS52hY0z; run
`tools/reference.sh` for a local contact sheet in `cache/reference/`). A square picture sits between black bars and cuts every
**0.25 seconds** while one white statement stays on top. The pictures are
1980s dark-fantasy paintings and film stills: a blue full moon behind a
hooded rider, a white castle in a pine forest at night, a knight kneeling at a
glowing pool, a wizard in a starry hat, a sword stuck in a moonlit shrine,
armour in wildflowers, bats across a violet sky. Each is on screen for six
frames, so it has to land at once:

- **Night, or something that can become night.** Moonlight, dusk, candlelight,
  storm light, deep shadow with light coming out of it. The grade
  (`render.grade`) pulls everything toward moonlit blue, lifts the blacks and
  blooms the highlights, so a dark painting with one bright moon or lamp
  becomes the look. Bright, flat daylight scenes go grey-violet and die.
- **One bold read.** One figure, one castle, one moon, one sword. No crowds,
  no busy genre scenes, no small subjects lost in a landscape.
- **Painterly and mythic.** Romantic, Pre-Raphaelite, Symbolist and
  nocturne painting is the closest public-domain match to 80s fantasy art:
  Grimshaw, Friedrich, Doré (colour only), Waterhouse, Burne-Jones, Rossetti,
  Leighton, Moreau, Böcklin, Redon, Turner, Martin, Aivazovsky, Bierstadt,
  Church, Cole, Ryder, Blakelock, Whistler nocturnes, Kuindzhi, Gallen-Kallela,
  Bilibin, Dulac, Rackham, Kay Nielsen, Sidney Sime, Maxfield Parrish (pre-1929),
  Fitzgerald, Grasset, Mucha (night pieces), Vrubel, Roerich (night pieces are
  public domain in many places but check the Commons licence tag). Night photos
  of real castles, moons and forests also work if they look cinematic.
- **Square-safe.** The window is square and the text covers the middle third.
  The subject should still read around the text: a moon above, a figure
  below, a castle across the top. Set `focus` so it lands well.
- **Colour, not black-and-white.** Engravings and b/w photos are filtered
  out by the fetcher; don't add them back.
- **Clean.** No text, captions, signatures across the frame, frames/mounts,
  museum walls, watermarks, logos, maps, objects on white, rawpixel images
  (tiled watermark), modern clothes or cars, gore, or sexual content. Classical
  nudity only if it's incidental and not the focus.

## The pools

| Pool | What goes in it |
| --- | --- |
| `moon` | Full and crescent moons, moonlit seas, lakes, roads, ruins; figures under the moon |
| `stars` | Night skies, the Milky Way, comets, constellations, astronomers, celestial allegory, aurora, nebulae (at most 6 space photos) |
| `castle` | Castles, towers, gothic cathedrals, ruins and abbeys at dusk or night, a lit window, a city on a hill |
| `knight` | Knights, armour, swords, riders, Arthurian and grail scenes, quests, horses at night |
| `lovers` | Couples, embraces, longing, Romeo and Juliet, Paolo and Francesca, Cupid and Psyche, Tristan and Isolde, a letter, a kiss, a waiting figure |
| `mystic` | Wizards, oracles, sibyls, saints in light, angels, priestesses, candles, mirrors, crystal balls, temples, the Lady of Shalott |
| `water` | Seas, moonlit coasts, lakes, rivers, waterfalls, rain, reflections, ships at night, mermaids and nymphs |
| `forest` | Enchanted woods, glades, old trees, wolves, owls, deer, swans, roses and lilies at night, fairy scenes |

## The file

`pool/<mood>.json`:

```json
{
  "images": [
    {"file": "cache/moon/cand/wc-12345.jpg", "focus": [0.5, 0.35], "note": "Grimshaw, moonlit lane",
     "id": "wc-12345", "source": "commons", "url": "...", "alt_url": "...", "title": "...",
     "creator": "...", "license": "Public domain", "landing": "..."}
  ]
}
```

- Copy every field of the candidate from `cache/<mood>/candidates.json` except
  `hash`, `n` and `query`, and prefix `file` with `cache/<mood>/cand/` (the urls
  let anyone re-download it; `cache/` is not committed).
- `focus` (x, y in 0-1): the point to keep centred when cropping to a square.
- Optional `zoom` (default 1.0, e.g. 1.4) crops tighter around `focus`.
- Optional `tone` (0-1, default automatic ~0.4) sets how far the blue night grade
  goes. Use ~0.2 to keep a great orange sunset or a warm candlelit face, ~0.6
  to push a too-warm daylight painting into night.
- Optional `exposure` (default 1.0): 0.8 darker, 1.2 brighter.
- Optional `"pin": true` for the 3-5 images that most carry the pool; they play
  in every reel that uses it.
- A short `note`.

Aim for **35-45 images per pool**. A reel draws ~10 from its first mood, so a
deep pool is what keeps an endless run from repeating.

## Tools

```sh
python3 fetch.py <mood> "query one" "query two" ...           # commons, aic, met by default
python3 fetch.py <mood> "query" --sources commons -n 20       # more from one source
python3 tools/sheet.py cand <mood>                            # every candidate, graded, numbered
python3 tools/sheet.py cand <mood> --raw                      # raw | graded side by side
python3 tools/sheet.py pool <mood>                            # the pool as the reel will show it
```

Wikimedia Commons is the richest source: search painter names plus a subject
("Grimshaw moonlight", "Waterhouse", "Friedrich night", "Böcklin"), or
category-like phrases ("nocturne painting", "moonlight painting 19th century").
Openverse is capped at 200 searches a day for the whole machine; leave it out
unless a pool truly needs photographs. Don't reuse an image another pool has
already picked (check `pool/*.json` for the id).

Several curators may work at once: keep scratch files under
`cache/<mood>/work/`, and never write another curator's pool file.
