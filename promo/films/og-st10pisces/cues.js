// st10pisces score — dreamy, Db (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 14.4: the underwater daydream · breakdown 22: alone with Fish · lift 34.8: the imaginary friend parade ·
//   outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st10pisces', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 1012, sections: { drop: T.dream, breakdown: 22.0, lift: T.parade, outroAt: DURATION - 4.4 } }, cues: CUES }
