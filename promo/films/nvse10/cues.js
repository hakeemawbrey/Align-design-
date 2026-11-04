// nvse10 score: chiptune, B (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: round 1 jump cut · breakdown 6.0: round 2 (card cut) · lift 9.4: the verdict · hit 10.02 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nvse10', duration: DURATION, music: { style: 'chiptune', key: 'B', seed: 4610, sections: { drop: 2.6, breakdown: [6.0], lift: [9.4], outroAt: DURATION - 4.4 }, hits: [10.02] }, cues: CUES }
