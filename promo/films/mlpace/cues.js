// mlpace score: pop, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (Aries asks)
//   hits 52.6: the arch is complete · 60.2: a balloon pops (the sag) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mlpace', duration: DURATION, music: { style: 'pop', key: 'D', seed: 23, sections: { drop: 7.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [52.6, 60.2] }, cues: CUES }
