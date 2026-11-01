// yrfirstdate score: lofi, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the 2016 clip (it tape-stops at 6.45) · drop 6.85: the card cut into 2026 · hit 13.75: "Less *fancy*. More *real*." lands
//   · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'yrfirstdate', duration: DURATION, music: { style: 'lofi', key: 'C', seed: 1301, sections: { drop: 6.85, outroAt: DURATION - 4.4 }, hits: [13.75] }, cues: CUES }
