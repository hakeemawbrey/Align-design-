// srhtxhumidity score — dreamy, B♭ major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Soft pads under the comb and the rising thermometer; the groove drops on the POOF (3.93 = beat 6); it thins for
// Plan B: the bag (8.38); it lifts as the mystery card floats in (11.16) and rings out under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxhumidity', duration: DURATION, music: { style: 'dreamy', key: 'Bb', seed: 17102, sections: { drop: 3.934, breakdown: 8.378, lift: 11.156, outroAt: DURATION - 4.4 } }, cues: CUES }
