// hxgrackles score — cinematic, Dm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: a hushed pad under the narrator · drop 5.04: "The puff." · breakdown 21.6: "Then, something rare." (the
//   honest moment, quiet) · lift 26.15: "A sincere squawk." · breakdown 28.93: ★ LESSON UNLOCKED · lift 38.38: "Squawk
//   sincerely." · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'hxgrackles', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 61, sections: { drop: BEAT(8), breakdown: [BEAT(38), BEAT(51)], lift: [BEAT(46), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(46)] }, cues: CUES }
