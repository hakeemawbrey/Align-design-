// stfightfair score — house, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.45: the first whistle, "Rule one" · breakdown 28.8: the corners, the break · lift 36.45: the bell, back in ·
//   breakdown 43.75: ★ LESSON UNLOCKED (the chiptune level-up on top) · hit 25.0: the chest bump · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stfightfair', duration: DURATION, music: { style: 'house', key: 'G', seed: 211, sections: { drop: 4.45, breakdown: [28.8, 43.75], lift: [36.45, 48.75], outroAt: DURATION - 4.4 }, hits: [25.0] }, cues: CUES }
