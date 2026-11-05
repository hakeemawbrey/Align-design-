// kpte15 score: house, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.42: the pattern break · breakdown 3.0: the spiral · lift 5.4: the pep talk · hit 15.4: DING + the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpte15', duration: DURATION, music: { style: 'house', key: 'Eb', seed: 14015, sections: { drop: 0.42, breakdown: [3.0], lift: [5.4], outroAt: DURATION - 1.2 }, hits: [15.4] }, cues: CUES }
