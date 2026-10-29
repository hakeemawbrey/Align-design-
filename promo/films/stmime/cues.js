// stmime score — jazzy, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs), under a projector
// crackle and Pisces' honky-tonk runs.
//   intro: the iris opens · drop 5.04: "Attempt one: the heart." · breakdown 24.49: Pisces stops playing, the score
//   tape-stops into real silence (crickets) for "... I like you." · lift 26.71: COLOUR, the big chord · breakdown 30.6:
//   ★ LESSON UNLOCKED and the talk cards · lift 38.38: "…Merci." · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stmime', duration: DURATION, music: { style: 'jazzy', key: 'Eb', seed: 73, sections: { drop: BEAT(8), breakdown: [BEAT(43), BEAT(54)], lift: [BEAT(47), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(47)] }, cues: CUES }
