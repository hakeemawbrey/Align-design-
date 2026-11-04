// nthe21 score: chiptune, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.9 · breakdown 5.4: the question · lift 7.0: the advice · hit 12.6: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe21', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 2121, sections: { drop: 0.9, breakdown: [5.4], lift: [7.0], outroAt: DURATION - 2.4 }, hits: [12.6] }, cues: CUES }
