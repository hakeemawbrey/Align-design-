// dummies score — chiptune, D major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// 8-bit Q&A: the chip groove drops on Q1 (3.38); a short break into part B (20.04) lifting back for the Rising sign
// (24.49); calm arps for “is it real?” (47.27), the big lift for “Congrats.” (53.38); jingle lands at 57.27.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'dummies', duration: DURATION, music: { style: 'chiptune', key: 'D', seed: 61, sections: { drop: 3.38, breakdown: [20.04, 47.27], lift: [24.49, 53.38], outroAt: 57.27 }, hits: [24.71, 44.64] }, cues: CUES }
