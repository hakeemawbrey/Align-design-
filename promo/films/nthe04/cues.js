// nthe04 score: chiptune, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.4: the worry · breakdown 4.45: Virgo investigates · hit 8.2: "that IS the compliment" · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe04', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 504, sections: { drop: 2.4, breakdown: [4.45], lift: [8.2], outroAt: DURATION - 2.4 }, hits: [8.2] }, cues: CUES }
