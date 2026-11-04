// nrde06 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: THE PLAN · breakdown 5.8: the jump cut into BUT… · lift + hit 9.32: the rating stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nrde06', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 4506, sections: { drop: 2.6, breakdown: [5.8], lift: [9.32], outroAt: DURATION - 2.4 }, hits: [9.32] }, cues: CUES }
