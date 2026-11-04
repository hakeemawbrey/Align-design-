// nml2e07 score: funk, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (dessert, take two)
//   hits 11.0: the hug · 55.6: "we are NOT together" · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nml2e07', duration: DURATION, music: { style: 'funk', key: 'G', seed: 71, sections: { drop: 7.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [11.0, 55.6] }, cues: CUES }
