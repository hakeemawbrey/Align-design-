// stsolodate score — dreamy, Bb major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: airy pads under the hook · drop 5.04: the date begins · lift 12.27: the montage (card cut) · breakdown 19.49:
//   the jealous cloud · lift 23.38: dear diary (card cut) · breakdown 28.93: ★ LESSON UNLOCKED (the level-up on top) ·
//   lift 33.38: tonight's deck · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stsolodate', duration: DURATION, music: { style: 'dreamy', key: 'Bb', seed: 25, sections: { drop: T.drop, breakdown: [19.489, T.lesson], lift: [T.m1, 23.378, 33.378], outroAt: DURATION - 4.4 }, hits: [T.items[4] + 0.42] }, cues: CUES }
