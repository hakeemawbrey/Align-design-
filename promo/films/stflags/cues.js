// stflags score — house, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.711: the spotlights snap on after Leo body-slams the giant buzzer · the four rounds ride the groove ·
//   breakdown 30.6: the scoreboard melts down (tape stop) and the final round's drumroll + silence play over a thin bed ·
//   lift 37.267: all six slam GREEN (hit) · breakdown 42.822: LESSON UNLOCKED (the chiptune level-up on top) ·
//   lift 47.267: the tie-in and the last line · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stflags', duration: DURATION, music: { style: 'house', key: 'Eb', seed: 13, sections: { drop: 1.711, breakdown: [T.S5, T.lesson], lift: [T.slamF, 47.267], outroAt: DURATION - 4.4 }, hits: [T.slamF] }, cues: CUES }
