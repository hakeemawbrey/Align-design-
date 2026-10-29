// stabducted score — chiptune, Am, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.378: inside the saucer · breakdown 21.156: "Signal: lost." after the overload (tape stop, power down)
//   · lift 27.267: SIGNAL: CLEAR ✓ · hit 32.267: LESSON · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stabducted', duration: DURATION, music: { style: 'chiptune', key: 'Am', seed: 21, sections: { drop: T.lab, breakdown: T.lost, lift: T.hit, outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
