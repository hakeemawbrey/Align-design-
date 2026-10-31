// sxrecapgolf score — chiptune, E (108 bpm, arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.6: the STAR CAM goes live · breakdown 15.04: the booth gives up after the BONK, under the replay (tape-stop into
//   slo-mo at 20.1) · lift 25.04: PLAY OF THE NIGHT (hit) · breakdown 28.38: LESSON UNLOCKED · lift 32.82: the reading
//   · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxrecapgolf', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 1303, sections: { drop: 0.6, breakdown: [15.044, 28.378], lift: [25.044, 32.822], outroAt: DURATION - 4.4 }, hits: [25.044] }, cues: CUES }
