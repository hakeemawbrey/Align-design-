// cityseattle score — dreamy, F#m, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pad + bell arps under the rain; the groove blooms with the chart as the clouds part (7.82); it thins for
// "The stars are still up there" (22.7), lifts as the stars pop through (23.38) and rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'cityseattle', duration: DURATION, music: { style: 'dreamy', key: 'F#m', seed: 117, sections: { drop: 7.82, breakdown: 22.7, lift: 23.38, outroAt: DURATION - 4.4 } }, cues: CUES }
