# THE SIGNS AS… v3 (the social cut): build guide

Instagram feedback on v2: good, but not hitting hard enough. v3 keeps the calm, padded, slow kit and pushes the CONTENT:
**sharper hooks, funnier and more extreme sign personalities, punchier text, and a subtle Align nod throughout.**

Kit: `promo/films/signs3kit.js` (same `makeFilm` spec as v2). It already does: a centred 0.70× safe box (lots of padding
for the Instagram UI), no card transitions (one panel, the sign inside swaps), no episode numbers, no end card / CTA /
logo, a faint "come align · join the beta" watermark, and a closing **match card** (two sign cards + an ALIGNED chip)
under the last line. Reference film: `promo/films/trs2crush/scenes/index.js` (v2; same spec, just import from
`'../../signs3kit.js'`).

## Files for a film `<id>`
- `promo/films/<id>/scenes/index.js`: the spec, ending `export const DURATION, SCENES, CUES, T` like trs2crush.
  Import from `'../../signs3kit.js'`; no `beats`, no `cues` on cameos (at most 2 cards get one
  `keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0]`).
- Pass `card: { a: '<sign>', b: '<sign>', chip: 'ALIGNED' }` to makeFilm: the two signs on the closing match card (pick a
  pair that pays off a joke in the film). chip may be another 1–2 word app-flavoured word (e.g. 'ALIGNED', 'IT'S A MATCH').
- `promo/films/<id>/cues.js`:
  ```js
  import { DURATION, CUES } from './scenes/index.js'
  export default { id: '<id>', duration: DURATION, music: { style: 'lofi', key: '<C|D|E|F|G>', seed: <int>, lufs: -20, sections: { drop: 3.6, breakdown: [49.2], outroAt: DURATION - 2.4 } }, cues: CUES }
  ```

## The content bar (this is the point of v3)
- **Hook (title):** instantly relatable, a little provocative, readable in under 1 s. 2 short lines, ≤ 8 words, one
  *accent* word. Think what people send to a friend: "Dating every sign | *be like.*"
- **Personalities: EXTREME.** Each sign is the most exaggerated, over-the-top version of its stereotype: the joke
  escalates past realistic into absurd, but stays instantly recognisable. Aries isn't "texts first", Aries "proposed
  before the appetizers". Scorpio isn't "mysterious", Scorpio "already knows your mom's maiden name".
- **Captions:** ONE punchline per sign, 2 short lines, ≤ 9 words total, one *accent* word on the funniest word. Format
  `'Line one | line *two.*'`. Write it like a meme caption, not a description. Read each aloud: is it funny on its own?
- **Props:** ONE big, clear visual gag per card (pixel prop via `drawBits`, a `bubble` with 1–5 words, or a `label`).
  Big enough to read on a phone; nothing crowded. The star is the hero.
- **Subtle Align nod:** the theme lives in the app's world: matches, charts, signs, compatibility, first dates, "what's
  your sign?". 2–4 of the twelve gags can touch it lightly (a match notification bubble, a birth-chart prop, a
  compatibility check, a profile card). Never an ad line, never "download", never a feature the app doesn't have
  (safe: sign profiles, birth charts, matching by sign, compatibility, messaging a match).
- **Ending:** group beat caption (punchy), lesson (`lesson.text` warm and true, 2 lines; `chip` a short status like
  'MATCH: MADE'), last line (warm + funny) over the match card.

## House rules (hard)
Twelve signs in zodiac order · Pisces cries (`tears`) in its card · kind humour: the joke is on the trait / situation,
never mean to a sign · advice warm, never controlling · no real brands, apps, platforms, songs or people · no invented
stats or percentages · no drinking, nothing sexual, no weapons/explosions/disasters, nothing scary or stalker-ish played
as creepy · no hashtags or emoji in captions · astrology is fun, not science.

## Check (stills only; don't render the full video)
```bash
node promo/scripts/render.mjs --film=<id> --vertical --stills=1.5,5.5,9.3,24,45,50.6,54.5,60.5 --dir=<fresh dir in your scratchpad>
node promo/scripts/teaser-sound.mjs --film=<id>
```
Look at every still: props inside the panel and readable, captions on two lines, Pisces tears, nothing overlapping the
name tab. Fix and re-check. Commit only your film folder (git add promo/films/<id>; never other files) and push to the
current branch (pull --rebase first if the push is rejected).
