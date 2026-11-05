// kine20 score: jazzy, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: chapter 1 (the feed) · breakdown 15.5: chapter 2 (the feeling) · lift 29.0: the facts · lift 49.5: the twist
//   · hits 51.75: SO NORMAL, 55.6: friendsmas · no end card: the film hard-cuts at 63.4.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine20', duration: DURATION, music: { style: 'jazzy', key: 'Eb', seed: 1320, sections: { drop: 2.6, breakdown: [15.5], lift: [29.0, 49.5], outroAt: DURATION - 1.6 }, hits: [51.75, 55.6] }, cues: CUES }
