// kine02 score: screwed, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.6: "Reading old texts at 2 a.m." · breakdown 9.7: THE STARS answer · lift 15.8: the notebook
//   · hit 7.6: NORMAL · no end card: the film loops back into frame 0 at 19.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine02', duration: DURATION, music: { style: 'screwed', key: 'Fm', seed: 1302, sections: { drop: 1.6, breakdown: [9.7], lift: [15.8], outroAt: DURATION - 1.2 }, hits: [7.6] }, cues: CUES }
