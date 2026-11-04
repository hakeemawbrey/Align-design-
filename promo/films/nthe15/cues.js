// nthe15 score: dreamy, Db (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.6 · breakdown 8.6 (the card cut) · lift 10.6 (the advice) · hit 8.8 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe15', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 515, sections: { drop: 3.6, breakdown: [8.6], lift: [10.6], outroAt: DURATION - 4.4 }, hits: [8.8] }, cues: CUES }
