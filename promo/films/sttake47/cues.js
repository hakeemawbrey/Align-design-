// sttake47 score — jazzy, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). Lounge jazz for a date.
//   intro: the trio noodles while the slate claps · drop 4.49: "ACTION!" (take 47) · every "CUT." is a record scratch + a tape
//   stop into real silence, and the band comes back on the next "ACTION!" (11.71, 18.38) · the chair tips at 21.08 (wind-down),
//   back for the montage at 23.93 · stops dead at 27.3 (the director gives up) · breakdown 31.16: a soft piano under
//   "…but you can bring a better question" · silence while Taurus freezes · lift 38.38: the donut drops, the band kicks in ·
//   breakdown 46.71: ★ LESSON UNLOCKED · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'sttake47', duration: DURATION, music: { style: 'jazzy', key: 'F', seed: 47, sections: { drop: T.action1, breakdown: [T.piano, T.lesson], lift: [T.drop], outroAt: DURATION - 4.4 } }, cues: CUES }
