// stgroupchat score — pop, D major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.38: the first bubble (a ping per bar) · breakdown 16.16: Pisces has asked; the score tape-stops into real
//   silence at 16.28 (crickets, "Seen by 11", the womp) until the GASP at 20.84 · lift 28.38: ✨ her WEDDING ✨ (bells,
//   confetti) on through the LESSON (crash hit at 30.04) · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stgroupchat', duration: DURATION, music: { style: 'pop', key: 'D', seed: 1414, sections: { drop: T.m1, breakdown: [T.m7 + 0.56], lift: [T.rename], outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
