// kpmee01 score: chiptune, E (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 24.
//   drop 2.4: the phone close · breakdown 10.1: the rewind · lift 15.0: "YES" · hit 22.3: the punchline.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmee01', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 3101, sections: { drop: 2.4, breakdown: [10.1], lift: [15.0], outroAt: DURATION - 0.8 }, hits: [22.3] }, cues: CUES }
