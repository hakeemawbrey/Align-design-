// hxfarmers score — lofi, C (108 bpm, arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.6: the STAR CAM is live · breakdown 15.04: the booth gives up (face-plant), runs under the replay (tape-stop
//   into slo-mo at 20.1) · lift 25.04: PLAY OF THE NIGHT (hit) · breakdown 28.38: LESSON UNLOCKED · lift 32.82 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxfarmers', duration: DURATION, music: { style: 'lofi', key: 'C', seed: 4501, sections: { drop: 0.6, breakdown: [15.044, 28.378], lift: [25.044, 32.822], outroAt: DURATION - 4.4 }, hits: [25.044] }, cues: CUES }
