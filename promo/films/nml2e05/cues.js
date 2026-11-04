// nml2e05 score: chiptune, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE · lift 90.0: Act 3 (cross the room)
//   hits 34.8: hands touch · 95.9: "…mine too." · 100.4: nobody's asleep · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nml2e05', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 85, sections: { drop: 7.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [34.8, 95.9, 100.4] }, cues: CUES }
