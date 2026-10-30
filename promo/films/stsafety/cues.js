// stsafety score — jazzy, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). An in-flight lounge
// trio under the safety demo.
//   intro: the trio noodles under the cabin chime · drop 5.04: "Seatbelt: commitment." · breakdown 26.71: BING-BONG, the
//   captain speaks · lift 28.93: Cancer puts on her OWN mask (hit) · breakdown 31.16: ★ LESSON UNLOCKED · lift 38.38:
//   "Enjoy the flight." · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stsafety', duration: DURATION, music: { style: 'jazzy', key: 'D', seed: 20, sections: { drop: BEAT(8), breakdown: [BEAT(47), BEAT(55)], lift: [BEAT(51), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(51)] }, cues: CUES }
