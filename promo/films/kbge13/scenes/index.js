// kbge13: BIO GLOW-UP, "Adventurous." (that's it) (9 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Aries' bio mid-zoom on one shouty word; hook "Name *one* adventure. | Just one."
//   0.35  whip zoom · 1.35 circle "ADVENTUROUS." → VAGUE · 1.9 THE STARS · 2.75 strike
//   3.2   the glow-up: "Took one candle class. Made one *wonky candle.* Very proud." · the candle pops in · Pisces sobs
//   7.5 last line. Hard cut.
import { makeBio, signStar, popIcon } from '../../kbge01/biokit.js'
const LEO = signStar('leo')
const EP = makeBio({
  id: 'kbge13', sign: 'aries', name: 'Aries', age: 24, D: 9,
  hook: 'Name *one* adventure. | Just one.', hookColor: '#ff6a4d',
  bad: 'ADVENTUROUS!!! LOVES LIFE!!!', bioSize: 60,
  circle: { word: 'ADVENTUROUS!!!', label: 'VAGUE' },
  says: [{ t: 1.9, text: 'love that. *which* adventure?' }],
  good: 'Took one candle class. Made one *wonky candle.* Very proud.',
  fx: 'whip', zoom0: 1.14, cps: 30,
  T: { strike: [2.75, 3.05], swap: 3.2 },
  reply: { body: 'wait, can I see the *wonky candle?*', glyph: LEO.glyph, color: LEO.color },
  photo: (x, t, S) => popIcon(x, t, 'CANDLE', S.PHOTO.x + 570, S.PHOTO.y + 250, 12, S.T.glow - 0.15),
  last: 'Tiny and true beats | *big and blurry.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
