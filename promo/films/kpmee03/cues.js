// kpmee03 score: pop, A (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 72.
//   drop 3.2: chapter 1 · breakdown 34.0: the drafts, 51.0: the slow text (tape stop) · lift 18.0, 62.4: "me too." · hit 70.9.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmee03', duration: DURATION, music: { style: 'pop', key: 'A', seed: 3103, sections: { drop: 3.2, breakdown: [34.0, 51.0], lift: [18.0, 62.4], outroAt: DURATION - 0.8 }, hits: [70.9] }, cues: CUES }
