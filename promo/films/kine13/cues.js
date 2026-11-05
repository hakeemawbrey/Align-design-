// kine13 score: synthwave, Gm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.0: "Wanting a label. Dreading asking." · breakdown 9.8: THE STARS answer · lift 13.6: the talk card
//   · hit 7.7: NORMAL · no end card: the film loops back into frame 0 at 18.9.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine13', duration: DURATION, music: { style: 'synthwave', key: 'Gm', seed: 1313, sections: { drop: 2.0, breakdown: [9.8], lift: [13.6], outroAt: DURATION - 1.2 }, hits: [7.7] }, cues: CUES }
