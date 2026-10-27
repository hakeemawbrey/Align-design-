// stwater score — lofi, Fm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the box opens (Cancer's "they said 'k.'") · breakdown 11.25: THE STARS · lift 14.55: "Feel it. Then say it." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stwater', duration: DURATION, music: { style: 'lofi', key: 'Fm', seed: 223, sections: { drop: 2.82, breakdown: 11.25, lift: 14.55, outroAt: DURATION - 4.4 } }, cues: CUES }
