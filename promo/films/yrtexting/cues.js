// yrtexting score: lofi, Db, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the 2016 clip (it tape-stops at 6.45) · drop 6.85: the card cut into 2026 · hit 13.75: "Say *the thing*." lands
//   · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'yrtexting', duration: DURATION, music: { style: 'lofi', key: 'Db', seed: 1401, sections: { drop: 6.85, outroAt: DURATION - 4.4 }, hits: [13.75] }, cues: CUES }
