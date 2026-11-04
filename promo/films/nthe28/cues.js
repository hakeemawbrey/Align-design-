// nthe28 score: chiptune, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.6 · breakdown 4.8: the question · lift 7.4: the advice · hit 9.2: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe28', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 2828, sections: { drop: 0.6, breakdown: [4.8], lift: [7.4], outroAt: DURATION - 4.4 }, hits: [9.2] }, cues: CUES }
