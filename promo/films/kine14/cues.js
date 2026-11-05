// kine14 score: pop, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.0: "No reply. Brain: worst case." · breakdown 9.7: THE STARS answer · lift 15.2: the reply lands
//   · hit 7.6: SO NORMAL · no end card: the film hard-cuts at 18.2.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine14', duration: DURATION, music: { style: 'pop', key: 'C', seed: 1314, sections: { drop: 2.0, breakdown: [9.7], lift: [15.2], outroAt: DURATION - 1.4 }, hits: [7.6] }, cues: CUES }
