// srhtxlatenight score — chiptune, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops under the taco run (0.6); it thins out as the S sputters and Taurus looks up (3.05); the full band
// lifts as the deck streaks across the sky (5.15), and lands under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxlatenight', duration: DURATION, music: { style: 'chiptune', key: 'Bb', seed: 21102, sections: { drop: 0.6, breakdown: 3.05, lift: 5.15, outroAt: DURATION - 4.4 } }, cues: CUES }
