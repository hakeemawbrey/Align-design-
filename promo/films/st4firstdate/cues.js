// st4firstdate score — funk, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: Leo starts talking about Leo · lift 8.2: Aquarius notices the question · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4firstdate', duration: DURATION, music: { style: 'funk', key: 'D', seed: 61, sections: { drop: 2.82, lift: 8.2, outroAt: DURATION - 4.4 } }, cues: CUES }
