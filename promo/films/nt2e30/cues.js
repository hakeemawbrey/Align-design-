// nt2e30 score: chiptune, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.1: round 1 · breakdown 8.1: the wobble round · lift 10.4: VALID lands · hit 10.45 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nt2e30', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 2130, sections: { drop: 2.1, breakdown: [8.1], lift: [10.4], outroAt: DURATION - 4.4 }, hits: [10.45] }, cues: CUES }
