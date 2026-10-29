// stmission score — synthwave, Am, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: the text lands · drop 5.04: the reply's on the launch pad · hit 18.38: the KLAXON · breakdown 22.82: hour two,
//   the score tape-stops into real silence (crickets, the clock ticking) · lift 25.6: ignition, LIFTOFF, the reply ·
//   breakdown 30.6: ★ LESSON UNLOCKED and the talk cards · lift 38.38: "Liftoff." · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stmission', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 118, sections: { drop: BEAT(8), breakdown: [BEAT(40), BEAT(54)], lift: [BEAT(45), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(32)] }, cues: CUES }
