// hxnightshift score: dreamy, E, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the letter's first handwritten line · breakdown 11.4: "ok. when is she awake?" · lift 14.0: sunrise
//   · hit 23.35: the seal · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxnightshift', duration: DURATION, music: { style: 'dreamy', key: 'E', seed: 611, sections: { drop: 2.82, breakdown: [11.4], lift: [14.0], outroAt: DURATION - 4.4 }, hits: [23.35] }, cues: CUES }
