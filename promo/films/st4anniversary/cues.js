// st4anniversary score — funk, A, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: ARIES: "let's go NOW." · lift 8.35: they run · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4anniversary', duration: DURATION, music: { style: 'funk', key: 'A', seed: 9523, sections: { drop: 2.82, lift: 8.35, outroAt: DURATION - 4.4 } }, cues: CUES }
