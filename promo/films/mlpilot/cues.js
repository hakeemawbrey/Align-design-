// mlpilot score: lofi, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (the 9 PM is cancelled)
//   hits 4.75: BOOKED · 55.2: HARD STOP · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mlpilot', duration: DURATION, music: { style: 'lofi', key: 'C', seed: 17, sections: { drop: 7.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [4.75, 55.2] }, cues: CUES }
