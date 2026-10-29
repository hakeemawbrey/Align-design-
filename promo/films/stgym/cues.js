// stgym score — house, A major, on the 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.711: Coach Aries' whistle opens the workout · sets one and two ride the groove · breakdown 18.378: the heaviest
//   bar slams down (a tape stop grinds the bed while it strains) · lift 24.489: LOCKOUT, "I LIKE YOU." (hit) ·
//   breakdown 30.6: LESSON UNLOCKED · lift 35.044: the talk card and "Same time tomorrow." · outro under the end card.
import { DURATION, CUES, T, BEAT } from './scenes/index.js'
export default { id: 'stgym', duration: DURATION, music: { style: 'house', key: 'A', seed: 22, sections: { drop: BEAT(2), breakdown: [T.drop, T.lesson], lift: [T.lock, BEAT(62)], outroAt: DURATION - 4.4 }, hits: [T.lock] }, cues: CUES }
