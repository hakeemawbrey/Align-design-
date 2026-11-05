// kpmae11 score: chiptune, G (style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.55: Mars bounces down · breakdown 12.0: the label prints · lift 16.0: "SAME" · hit 22.6. Hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae11', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 6111, sections: { drop: 0.55, breakdown: [12.0], lift: [16.0], outroAt: DURATION - 0.6 }, hits: [22.7] }, cues: CUES }
