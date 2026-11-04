// nml2e10 score: pop, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). The finale.
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (the roof)
//   hits 52.4: 6:00, still dark · 98.0: the lights come on · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nml2e10', duration: DURATION, music: { style: 'pop', key: 'C', seed: 101, sections: { drop: 7.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 2.4 }, hits: [52.4, 98.0] }, cues: CUES }
