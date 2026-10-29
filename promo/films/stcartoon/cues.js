// stcartoon score — chiptune, C (the engine's 8-bit preset: pulse leads, triangle bass, noise drums), 108 bpm.
//   intro 0–9.49: the film's own theme song rides on top (square lead + harmony + a chip kit, cues in scenes/index.js),
//   sung with a bouncing ball, "da-da!" at 7.0 · drop 9.49: the week (Monday) · breakdown 20.04: the tape (the score
//   tape-stops into silence under the VHS rewind chatter, 21.45–23.35) · lift 27.82: Virgo's glow-up, THANK-YOUS ✓ ·
//   breakdown 30.6: ★ LESSON UNLOCKED · lift 38.38: "Same star time, next week!" (the theme's tag sung back) · outro.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stcartoon', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 47, sections: { drop: BEAT(16), breakdown: [BEAT(35), BEAT(54)], lift: [BEAT(49), BEAT(68)], outroAt: DURATION - 4.4 } }, cues: CUES }
