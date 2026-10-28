// st4leomirror score — funk, E, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.0: the rehearsal starts · lift 11.3: "lead with a question" · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4leomirror', duration: DURATION, music: { style: 'funk', key: 'E', seed: 1818, sections: { drop: 1.0, lift: 11.3, outroAt: DURATION - 4.4 } }, cues: CUES }
