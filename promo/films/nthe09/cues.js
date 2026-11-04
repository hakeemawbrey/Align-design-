// nthe09 score: lofi, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0 · breakdown 6.9 (the card cut) · lift 7.1 (the advice) · hit 11.5 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe09', duration: DURATION, music: { style: 'lofi', key: 'Cm', seed: 509, sections: { drop: 3.0, breakdown: [6.9], lift: [7.1], outroAt: DURATION - 4.4 }, hits: [11.5] }, cues: CUES }
