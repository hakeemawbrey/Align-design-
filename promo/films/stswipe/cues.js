// stswipe score — synthwave, Cm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: the 4th "Swipe." lands · hit 9.49: IT'S A MATCH · breakdown 21.16: Capricorn's question (record stop,
//   crickets) — half-time kick/snare cues come in under the turn (26.16) · lift 28.93: LESSON UNLOCKED, on through
//   tonight's deck · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stswipe', duration: DURATION, music: { style: 'synthwave', key: 'Cm', seed: 303, sections: { drop: T.drop, breakdown: [T.brk], lift: [T.lesson], outroAt: DURATION - 4.4 }, hits: [T.match] }, cues: CUES }
