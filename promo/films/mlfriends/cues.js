// mlfriends score: funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.0: Act 1 (the rules) · hits 44.6 / 52.95 / 55.05: the three RULE BROKEN stamps · hit 65.8: "NO."
//   breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mlfriends', duration: DURATION, music: { style: 'funk', key: 'E', seed: 303, sections: { drop: 10.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [44.6, 52.95, 55.05, 65.8] }, cues: CUES }
