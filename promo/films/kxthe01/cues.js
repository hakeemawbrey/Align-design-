// kxthe01 score: synthwave, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: left on delivered · breakdown 38.0: the 11 PM draft · lift 46.5: Virgo's answer · breakdown 58.0: 1 AM
//   lift 72.4: the 3 a.m. notification · hits 0.35 (scratch), 75.0 FRIDAY · outro 88.25 under the last line, hard cut at 90.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxthe01', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 3801, sections: { drop: 3.0, breakdown: [38.0, 58.0], lift: [46.5, 72.4], outroAt: 88.25 }, hits: [75.0] }, cues: CUES }
