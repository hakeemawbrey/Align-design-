// stopposites score — funk, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the box opens (Aries' "let's go. now.") · lift 11.65: "Push. Pull. Align." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stopposites', duration: DURATION, music: { style: 'funk', key: 'C', seed: 251, sections: { drop: 2.82, lift: 11.65, outroAt: DURATION - 4.4 } }, cues: CUES }
