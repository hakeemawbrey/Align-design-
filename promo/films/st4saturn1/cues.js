// st4saturn1 score — cinematic, D minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: Saturn's glasses glint, class begins · breakdown 7.55: the homework thuds down · hit at the LESSON (9.45) ·
//   outro under the end card.
import { DURATION, CUES, T, KEY } from './scenes/index.js'
export default { id: 'st4saturn1', duration: DURATION, music: { style: 'cinematic', key: KEY, seed: 1212, sections: { drop: T.glint, breakdown: T.sheets[0], outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
