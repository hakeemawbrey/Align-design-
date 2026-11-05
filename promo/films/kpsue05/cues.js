// kpsue05 score: funk, A (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 74.4 (no end card).
//   drop 0.1: the Sun lands · breakdown 33.6: the record scratch · lift 50.0: the date · 56.2: the spotlight swings
//   · outro 71.2: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpsue05', duration: DURATION, music: { style: 'funk', key: 'A', seed: 5105, sections: { drop: 0.1, breakdown: [33.6], lift: [50.0, 62.0], outroAt: 71.2 }, hits: [56.2, 63.0] }, cues: CUES }
