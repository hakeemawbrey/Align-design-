// kine08 score: dreamy, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.9: "Had fun. Now: hibernate." · breakdown 9.7: THE STARS answer · lift 14.4: the message goes out
//   · hit 7.6: SO NORMAL · no end card: the film loops back into frame 0 at 17.9.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine08', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 1308, sections: { drop: 1.9, breakdown: [9.7], lift: [14.4], outroAt: DURATION - 1.2 }, hits: [7.6] }, cues: CUES }
