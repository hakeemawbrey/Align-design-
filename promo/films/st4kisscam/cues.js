// st4kisscam score — pop, D, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the kiss cam lands on the pair · lift 9.95: the high-five · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4kisscam', duration: DURATION, music: { style: 'pop', key: 'D', seed: 412, sections: { drop: 2.82, lift: 9.95, outroAt: DURATION - 4.4 } }, cues: CUES }
