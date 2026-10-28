// stpregame score — synthwave, A minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.16: the locker-room doors burst open · breakdown 13.38: real talk (card cut) · lift 19.49: tonight's deck ·
//   breakdown 22.82: the swipe (tape stop) and the wait · lift 27.27: the reveal (card flip) on through the glitter dump
//   (crash hit at the LESSON, 31.71) · breakdown 36.16: "Whatever happens: we're proud of you." · outro under the end card.
import { DURATION, CUES, T, BEAT, KEY } from './scenes/index.js'
export default { id: 'stpregame', duration: DURATION, music: { style: 'synthwave', key: KEY, seed: 419, sections: { drop: T.burst, breakdown: [T.cut1, T.swipe, BEAT(64)], lift: [BEAT(34), T.cut2], outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
