// kpre01 score: chiptune, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.12: the rewind lands and the moment plays · lift 5.32: Pisces breaks · hit 5.32 · no end card (loop).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-kpre01', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 2401, sections: { drop: 2.52, lift: [6.72], outroAt: DURATION - 0.6 }, hits: [6.72] }, cues: CUES }
