// kbge23 score: synthwave, A (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card.
//   drop 3.2: chapter 1 · breakdown 20: the true thing · lift at the glow-up · hit on the reply's last line.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kbge23', duration: DURATION, music: { style: 'synthwave', key: 'A', seed: 3423, sections: { drop: 3.2, breakdown: [20.0, 35.0], lift: [T.glow], outroAt: DURATION - 0.6 }, hits: [T.last + 0.3] }, cues: CUES }
