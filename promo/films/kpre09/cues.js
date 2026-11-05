// kpre09 score: funk, G (style engine in promo/scripts/teaser-sound.mjs). Sudden silence at 1.0, drop on the split. Loops.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpre09', duration: DURATION, music: { style: 'funk', key: 'G', seed: 1909, sections: { drop: 2.6, outroAt: DURATION - 0.5 } }, cues: CUES }
