// nthe25 score: funk, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.8 · breakdown 7.3: the question · lift 10.9: the advice · hit 15.2: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe25', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 2525, sections: { drop: 0.8, breakdown: [7.3], lift: [10.9], outroAt: DURATION - 4.4 }, hits: [15.2] }, cues: CUES }
