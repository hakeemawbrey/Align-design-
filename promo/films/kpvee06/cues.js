// kpvee06 score: lofi, D (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 25.8.
//   drop 0.4: Venus spins in · breakdown 11.6: the short list · lift 18.4: the text · hit 24.2: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee06', duration: DURATION, music: { style: 'lofi', key: 'D', seed: 4106, sections: { drop: 0.4, breakdown: [11.6], lift: [18.4], outroAt: DURATION - 0.6 }, hits: [24.2] }, cues: CUES }
