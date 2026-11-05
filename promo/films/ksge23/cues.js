// ksge23 score: synthwave, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.6: round 1 · a breakdown under each round's record-scratch freeze · a lift on each round's green flag.
import { DURATION, CUES, SECTIONS } from './scenes/index.js'
export default { id: 'ksge23', duration: DURATION, music: { style: 'synthwave', key: 'A', seed: 3223, sections: { drop: SECTIONS.drop, breakdown: SECTIONS.breakdown, lift: SECTIONS.lift, outroAt: DURATION - 0.6 }, hits: SECTIONS.lift }, cues: CUES }
