// nvse01 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: round 1 jump cut · breakdown 6.0: round 2 (jump cut) · lift 9.4: the verdict · hit 10.02 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nvse01', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 4601, sections: { drop: 2.6, breakdown: [6.0], lift: [9.4], outroAt: DURATION - 2.4 }, hits: [10.02] }, cues: CUES }
