// st4newmoon score — dreamy, G, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the dark moon whispers · lift 7.8: the card rises and the wish gets written · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4newmoon', duration: DURATION, music: { style: 'dreamy', key: 'G', seed: 9101, sections: { drop: 2.82, lift: 7.8, outroAt: DURATION - 4.4 } }, cues: CUES }
