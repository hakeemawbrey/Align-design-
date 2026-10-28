// stlovelang score — jazzy, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.489: misfire #1 (the pie) · breakdown 31.9: Gemini rips its headphones off (record scratch + tape stop),
//   the talk card plays over a thin bed · lift 38.7: "you're… amazing." · breakdown 45.048: LESSON UNLOCKED (the
//   chiptune level-up on top) · lift 49.45: talk cards + booth closed · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stlovelang', duration: DURATION, music: { style: 'jazzy', key: 'G', seed: 22, sections: { drop: 4.489, breakdown: [T.rip, T.lesson], lift: [T.cut3, T.cut4], outroAt: DURATION - 4.4 }, hits: [T.unveil[0]] }, cues: CUES }
