// st4spacecity score — cinematic, Am, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: Houston's pin lands and the stars start talking · lift 7.6: Texas lights up · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4spacecity', duration: DURATION, music: { style: 'cinematic', key: 'Am', seed: 137, sections: { drop: 2.82, lift: 7.6, outroAt: DURATION - 4.4 } }, cues: CUES }
