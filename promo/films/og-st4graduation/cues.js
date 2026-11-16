// st4graduation score — cinematic, D, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.27: Saturn's glasses glint as the diplomas fly · lift 11.1: caps up · breakdown 13.38: LESSON UNLOCKED · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4graduation', duration: DURATION, music: { style: 'cinematic', key: 'D', seed: 9303, sections: { drop: 2.27, lift: 11.1, breakdown: 13.38, outroAt: DURATION - 4.4 } }, cues: CUES }
