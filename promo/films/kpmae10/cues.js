// kpmae10 score: synthwave, F#m (style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.22: Mars crashes through the whiteboard · breakdown 11.6: the week · lift 20.6: the reply · loops at 29.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae10', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 6010, sections: { drop: 0.22, breakdown: [11.6], lift: [20.6], outroAt: DURATION - 1.2 }, hits: [26.3] }, cues: CUES }
