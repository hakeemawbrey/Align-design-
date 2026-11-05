// kpmae01 score: funk, E (style engine in promo/scripts/teaser-sound.mjs). 74.5 s, hard cut.
//   drop 0.1: Mars crashes in · lift 19.0: the training montage · breakdowns 42.6 (the freeze) and 60.8 (the long beat)
//   · lift 63.8: "yes" · hit 70.6: "Bold. And kind."
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae01', duration: DURATION, music: { style: 'funk', key: 'E', seed: 5101, sections: { drop: 0.1, breakdown: [42.6, 60.8], lift: [19.0, 63.8], outroAt: DURATION - 0.8 }, hits: [70.7] }, cues: CUES }
