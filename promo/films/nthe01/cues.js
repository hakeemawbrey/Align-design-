// nthe01 score: pop, C, 112 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.0: everyone arrives · breakdown 9.0: the real reason · lift 12.5: Virgo's answer · hit 18.4: "they said YES" · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe01', duration: DURATION, music: { style: 'pop', key: 'C', seed: 501, sections: { drop: 2.0, breakdown: [9.0], lift: [12.5], outroAt: DURATION - 2.4 }, hits: [18.4] }, cues: CUES }
