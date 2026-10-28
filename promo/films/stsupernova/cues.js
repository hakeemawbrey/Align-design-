// stsupernova score — house, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: Aries slams down from its leap · hit 11.71: the ring box, the whole sky gasps · tape stop into the
//   supernova flash, breakdown 23.94: the nebula drifts, "…don't stick around", the eye-roll · lift 31.71: the Sun rolls
//   in · LESSON UNLOCKED at 40.6 (chiptune level-up on top) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stsupernova', duration: DURATION, music: { style: 'house', key: 'G', seed: 46, sections: { drop: 1.711, breakdown: 23.935, lift: 31.714, outroAt: DURATION - 4.4 }, hits: [11.712] }, cues: CUES }
