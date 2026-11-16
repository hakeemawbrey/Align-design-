// og-kbge13: social rework of kbge13 (static HOOK box 0–3.0 replaces the slammed hook; no bug, no shakes, no
// white flashes, no loop-back: ends ON the last line; Aries is even louder about it). Kit: ../biokit.js (og social copy).
// Was: kbge13: BIO GLOW-UP, "Adventurous." (that's it) (9 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Aries' bio mid-zoom on one shouty word; hook "Name *one* adventure. | Just one."
//   0.35  whip zoom · 1.35 circle "ADVENTUROUS." → VAGUE · 1.9 THE STARS · 2.75 strike
//   3.2   the glow-up: "Took one candle class. Made one *wonky candle.* Very proud." · the candle pops in · Pisces sobs
//   7.5 last line. Hard cut.
import { makeBio, signStar, popIcon } from '../biokit.js'
const LEO = signStar('leo')
const EP = makeBio({
  id: 'og-kbge13', sign: 'aries', name: 'Aries', age: 24, D: 9,
  hook: 'Name *one* adventure. | Just one.', hookColor: '#ff6a4d',
  bad: 'ADVENTUROUS!!! LOVES LIFE!!! SPONTANEOUS!!!', bioSize: 60,
  circle: { word: 'ADVENTUROUS!!!', label: 'VAGUE' },
  says: [{ t: 1.9, text: 'babe. *which* adventure? name one.' }],
  good: 'Took one candle class. Made one *wonky candle.* Told everyone I know.',
  fx: 'whip', zoom0: 1.14, cps: 30,
  T: { strike: [2.75, 3.05], swap: 3.2 },
  reply: { body: 'I NEED to see the *wonky candle.*', glyph: LEO.glyph, color: LEO.color },
  photo: (x, t, S) => popIcon(x, t, 'CANDLE', S.PHOTO.x + 570, S.PHOTO.y + 250, 12, S.T.glow - 0.15),
  last: 'Tiny and true beats | *big and blurry.*',
})
export const HOOK = 'Bio: adventurous. | *Name one.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
