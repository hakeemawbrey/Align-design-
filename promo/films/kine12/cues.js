// kine12 score: funk, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.9: the news desk · breakdown 9.6: THE STARS answer · lift 11.4: the role swap
//   · hit 7.5: SO NORMAL · no end card: the film hard-cuts at 18.5.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine12', duration: DURATION, music: { style: 'funk', key: 'D', seed: 1312, sections: { drop: 1.9, breakdown: [9.6], lift: [11.4], outroAt: DURATION - 1.4 }, hits: [7.5] }, cues: CUES }
