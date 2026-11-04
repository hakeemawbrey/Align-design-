// nthe10 score: synthwave, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.2 · breakdown 6.9 (the card cut) · lift 10.3 (the advice) · hit 13.2 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe10', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 510, sections: { drop: 3.2, breakdown: [6.9], lift: [10.3], outroAt: DURATION - 4.4 }, hits: [13.2] }, cues: CUES }
