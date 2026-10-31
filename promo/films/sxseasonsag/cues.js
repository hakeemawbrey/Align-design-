// sxseasonsag score — pop, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the wheel lands on ♐ · breakdown 16.71: the date-night picker (dinner, dinner, dinner) · lift 21.71: "Say yes to something new." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxseasonsag', duration: DURATION, music: { style: 'pop', key: 'A', seed: 28082, sections: { drop: 2.82, breakdown: 16.71, lift: 21.71, outroAt: DURATION - 4.4 } }, cues: CUES }
