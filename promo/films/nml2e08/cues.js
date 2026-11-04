// nml2e08 score: dreamy, Ab, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (one more block)
//   hits 43.0: THUD · 50.0: "snow. cold." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nml2e08', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 81, sections: { drop: 7.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 2.4 }, hits: [43.0, 50.0] }, cues: CUES }
