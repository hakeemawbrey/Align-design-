// htxlatenight score — lofi, Am, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops under the taco run (0.6); it thins out as they look up and we tilt into the sky (3.2); the full band
// lifts as the deck deals across the stars (3.95), and lands under the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxlatenight', duration: DURATION, music: { style: 'lofi', key: 'Am', seed: 123, sections: { drop: 0.6, breakdown: 3.2, lift: 3.95, outroAt: DURATION - 4.4 } }, cues: CUES }
