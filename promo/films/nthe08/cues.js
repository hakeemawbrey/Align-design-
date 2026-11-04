// nthe08 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8 · breakdown 4.6 (the card cut) · lift 4.7 (the advice) · hit 9.0 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe08', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 508, sections: { drop: 1.8, breakdown: [4.6], lift: [4.7], outroAt: DURATION - 2.4 }, hits: [9.0] }, cues: CUES }
