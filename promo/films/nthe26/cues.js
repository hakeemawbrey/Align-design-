// nthe26 score: cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.8 · breakdown 4.6: the question · lift 10.9: the advice · hit 14.9: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe26', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 2626, sections: { drop: 0.8, breakdown: [4.6], lift: [10.9], outroAt: DURATION - 4.4 }, hits: [14.9] }, cues: CUES }
