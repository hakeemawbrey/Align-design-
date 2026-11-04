// nthe14 score: funk, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.2 · breakdown 7.4 (the card cut) · lift 7.6 (the advice) · hit 13.8 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe14', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 514, sections: { drop: 1.2, breakdown: [7.4], lift: [7.6], outroAt: DURATION - 2.4 }, hits: [13.8] }, cues: CUES }
