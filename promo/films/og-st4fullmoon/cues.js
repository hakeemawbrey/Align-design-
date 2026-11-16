// st4fullmoon score — dreamy, Db, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the Moon starts talking · lift 9.46: "Say it gently." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4fullmoon', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 641, sections: { drop: 2.82, lift: 9.46, outroAt: DURATION - 4.4 } }, cues: CUES }
