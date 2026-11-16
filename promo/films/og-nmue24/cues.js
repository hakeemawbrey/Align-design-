// og-nmue24: social cut of nmue24 (sound unchanged apart from the og kit's removed word-pops / frame-0 hits).
// nmue24 score: pop, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.6: UNDER IT (the postcards) · breakdown 12.8: THE TALK · lift 21.6: MADE UP · hit 21.6 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-nmue24', duration: DURATION, music: { style: 'pop', key: 'F', seed: 2424, sections: { drop: 6.6, breakdown: [12.8], lift: [21.6], outroAt: DURATION - 2.4 }, hits: [21.6] }, cues: CUES }
