// st4exam score — cinematic, Dm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.27: Saturn's glasses glint as the exam starts · breakdown 8.93: the LESSON UNLOCKED banner · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4exam', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 776, sections: { drop: 2.27, breakdown: 8.93, outroAt: DURATION - 4.4 } }, cues: CUES }
