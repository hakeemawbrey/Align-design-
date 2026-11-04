// nthe12 score: pop, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3 · breakdown 11.5 (the card cut) · lift 14.6 (the advice) · hit 17.5 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe12', duration: DURATION, music: { style: 'pop', key: 'D', seed: 512, sections: { drop: 2.3, breakdown: [11.5], lift: [14.6], outroAt: DURATION - 4.4 }, hits: [17.5] }, cues: CUES }
