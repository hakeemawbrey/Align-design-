// stmoon score — dreamy, F#, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the Moon starts talking · lift 8.05: the big-three card rises · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stmoon', duration: DURATION, music: { style: 'dreamy', key: 'F#', seed: 223, sections: { drop: 2.82, lift: 8.05, outroAt: DURATION - 4.4 } }, cues: CUES }
