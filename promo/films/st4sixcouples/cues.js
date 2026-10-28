// st4sixcouples score — cinematic, Bb, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the links and readings pop, row by row · breakdown 11.6: "Same mode. Opposite side." · lift 15.8: "Stretch, don't settle." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4sixcouples', duration: DURATION, music: { style: 'cinematic', key: 'Bb', seed: 901, sections: { drop: 2.82, breakdown: 11.6, lift: 15.8, outroAt: DURATION - 4.4 } }, cues: CUES }
