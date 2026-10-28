// stick score — pop, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: light keys under the landing (three claps on the SFX bus) · drop 5.04: the gavel, ICK COURT is in session ·
//   breakdown 14.49: the tables turn · 19.1–23.98 the score tape-stops into real silence under "...that's different."
//   (crickets) · lift 25.04: the verdict, ICK: DISMISSED (after the drumroll build) · breakdown 27.82: ★ LESSON UNLOCKED
//   and the soft card beat · lift 37.27: "Give the ick a minute." · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stick', duration: DURATION, music: { style: 'pop', key: 'A', seed: 77, sections: { drop: BEAT(8), breakdown: [BEAT(25), BEAT(49)], lift: [BEAT(44), BEAT(66)], outroAt: DURATION - 4.4 } }, cues: CUES }
