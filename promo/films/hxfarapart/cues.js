// hxfarapart score: cinematic, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the letter's first handwritten line · breakdown 11.6: "no scorekeeping." · lift 14.0: the halfway park
//   · hit 23.35: the seal · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxfarapart', duration: DURATION, music: { style: 'cinematic', key: 'Bb', seed: 655, sections: { drop: 2.82, breakdown: [11.6], lift: [14.0], outroAt: DURATION - 4.4 }, hits: [23.35] }, cues: CUES }
