// npce06 score: lofi, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.8: Taurus slides the plate · breakdown 2.75: Taurus shared food · lift 4.3: fountains · hit 5.6: the card cut · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npce06', duration: DURATION, music: { style: 'lofi', key: 'C', seed: 4806, sections: { drop: 0.8, breakdown: [2.75], lift: [4.3], outroAt: DURATION - 4.4 }, hits: [5.6] }, cues: CUES }
