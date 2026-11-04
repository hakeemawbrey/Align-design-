// nml2e06 score: jazzy, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (the bench)
//   hits 15.6: the slip (SAG) · 58.0: "it's a joke!" · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nml2e06', duration: DURATION, music: { style: 'jazzy', key: 'F', seed: 61, sections: { drop: 7.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [15.6, 58.0] }, cues: CUES }
