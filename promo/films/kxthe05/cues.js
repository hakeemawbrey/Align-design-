// kxthe05 score: chiptune, B (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: the advice desk · breakdown 18.6: the screenshot · breakdown 44.6: the real reason · lift 50.4: quoted back
//   lift 72.6: question 42 · hits 20.4 WRONG CHAT, 62.0 SENT · outro 88.25, hard cut at 90.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxthe05', duration: DURATION, music: { style: 'chiptune', key: 'B', seed: 3805, sections: { drop: 3.0, breakdown: [18.6, 44.6], lift: [50.4, 72.6], outroAt: 88.25 }, hits: [20.4, 62.0] }, cues: CUES }
