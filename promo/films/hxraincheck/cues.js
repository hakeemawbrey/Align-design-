// hxraincheck score: lofi, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the letter's first handwritten line · breakdown 11.85: "the sky isn't texting you." · lift 14.0: indoors
//   · hit 23.35: the seal · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxraincheck', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 644, sections: { drop: 2.82, breakdown: [11.85], lift: [14.0], outroAt: DURATION - 4.4 }, hits: [23.35] }, cues: CUES }
