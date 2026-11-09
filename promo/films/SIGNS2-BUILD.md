# THE SIGNS AS… v2 (calm cut): build guide

Our best-performing video so far is `trsignswedding` ("The signs as wedding guests"). The feedback on the newer videos
was:
- too loud;
- too many sound effects;
- content too close to the edges, where the social-app UI covers it;
- too fast to follow.

So the v2 kit, `promo/films/signs2kit.js`, keeps the wedding format and changes four things:
- **Safe area:** all content is drawn in a 0.78× box at (70, 200). Only the sky and grain fill the frame.
- **Slower:** 3.8 s per sign, plus a longer hook, lesson and last line. The video is about 64 s.
- **Quiet:** one soft landing sound per card and a few accents. There are no word pops, ticks or card cuts.
- **Music:** `lofi` at −20 LUFS.

Write each film exactly like `promo/films/trsignswedding/scenes/index.js`, with three changes:
- Import from `'../../signs2kit.js'` instead of `'./signs.js'`. Do NOT copy signs.js into the folder.
- Leave out `beats`. The kit times every card itself and ignores it.
- Leave out `cues` on cameos. If one card truly needs a sound, add **one** `keyCue: t0 => ['pop', t0 + 1.2, 1318.51, 0.015, 0]`
  (2 cards at most per film).

Prop coordinates stay in the full 1080×1920 space. The panel is centred at (540, 850) and is 900 × 780. The kit scales
everything into the safe box. A card's props use `lt`, which runs from 0 to 2.4 over the card's first 3.1 s and then
holds. Write the beats for 0–2.4 the way the old films did, and they will play slower.

## Make it easier to follow
- **Captions:** each is ONE simple, instantly relatable thought, in two short lines (8 words max in total), with one
  *accent* word. Format: `'Line one | line *two.*'`.
- **Props:** keep them simple, with ONE clear visual joke per card (a pixel prop with `drawBits`, a small `bubble` or a
  `label`). Avoid crowded scenes. The star is the hero.
- **Story:** the hook title stays on for the whole roll call. The group beat, the lesson and the last line wrap it up
  with warmth.

## House rules (hard)
- Use the 12 signs in zodiac order.
- Pisces cries (`tears`) in its card.
- Kind humour: the joke is on the situation, never mean to a sign.
- Advice stays warm and never controlling.
- Leave out:
  - real brands, apps, platforms, songs and people;
  - invented stats;
  - drinking jokes;
  - anything sexual;
  - weapons, explosions and disasters;
  - hashtags and emoji in captions.
- Astrology is framed as fun, not science.

## Files for a film `<id>`
- `promo/films/<id>/scenes/index.js`: the spec, ending with `export const DURATION, SCENES, CUES, T` (see the wedding
  film).
- `promo/films/<id>/cues.js`, from this template:
  ```js
  import { DURATION, CUES } from './scenes/index.js'
  export default { id: '<id>', duration: DURATION, music: { style: 'lofi', key: '<C|D|E|F|G>', seed: <int>, lufs: -20, sections: { drop: 3.6, breakdown: [49.2], outroAt: DURATION - 2.4 } }, cues: CUES }
  ```

## Check (stills only, no full render)
```bash
node promo/scripts/render.mjs --film=<id> --vertical --stills=1.5,5.5,9.3,24,45,50.6,54.5,60 --dir=<fresh dir in your scratchpad>
```
Look at every still. Check four things:
- props sit inside the panel and nothing is clipped;
- captions fit on two lines;
- Pisces has tears;
- nothing overlaps the name tab.

Also run `node promo/scripts/teaser-sound.mjs --film=<id>`. It must succeed.
