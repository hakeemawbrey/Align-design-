// nste15 score: synthwave, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.0: the moment · breakdown 6.8: THE STARS · lift 13.6: the thrive · hit 16.5: the meter fills · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nste15', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 3315, sections: { drop: 1.0, breakdown: [6.8], lift: [13.6], outroAt: DURATION - 4.4 }, hits: [16.5] }, cues: CUES }
