// ksre01 score: chiptune, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.3: the flash + whip zoom · breakdown 3.2: the wait (unskippable) · lift 10.4: the ding · hit 13.6: run complete.
//   No end card: the outro lands on the punchline and the film hard-cuts at DURATION.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre01', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 3101, sections: { drop: 0.3, breakdown: [3.2], lift: [10.4], outroAt: DURATION - 0.9 }, hits: [13.6] }, cues: CUES }
