// stswap score — house, E major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: the square, under Virgo's first line · breakdown 7.82: the wish (dreamy, the shooting star) · lift 13.93:
//   ZAP (the hit) · breakdown 39.49: "Wait. Oh." (they get each other) · lift 50.6: the reading · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stswap', duration: DURATION, music: { style: 'house', key: 'E', seed: 12, sections: { drop: 1.711, breakdown: [7.822, 39.489], lift: [13.933, 50.6], outroAt: DURATION - 4.4 }, hits: [13.933] }, cues: CUES }
