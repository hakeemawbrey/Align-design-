// kpvee11 score: chiptune, F (style engine in promo/scripts/teaser-sound.mjs). Loops (25.6 s).
//   drop 0.2: Venus glitches in · breakdown 12.6: translating · lift 15.4: "I like you" · hit 22.8: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee11', duration: DURATION, music: { style: 'chiptune', key: 'F', seed: 4111, sections: { drop: 0.2, breakdown: [12.6], lift: [15.4], outroAt: DURATION - 0.3 }, hits: [22.8] }, cues: CUES }
