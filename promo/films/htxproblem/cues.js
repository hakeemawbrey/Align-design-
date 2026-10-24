// htxproblem score — synthwave, F♯ minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pad + arp under the Mission Control hook; the build rides the accelerating swipes; the drop lands on the turn
// (mystery card, 5.6 = beat 9); the tonic rings out under the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxproblem', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 11, sections: { drop: 5.6, outroAt: 10.6 } }, cues: CUES }
