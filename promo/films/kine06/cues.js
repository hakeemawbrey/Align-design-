// kine06 score: house, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: "The whole bed. The whole pizza." · breakdown 9.15: THE STARS answer · lift 11.5: the ticket is crossed out
//   · hit 7.05: SO NORMAL · no end card: the film loops back into frame 0 at 16.8.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine06', duration: DURATION, music: { style: 'house', key: 'A', seed: 1306, sections: { drop: 1.8, breakdown: [9.15], lift: [11.5], outroAt: DURATION - 1.2 }, hits: [7.05] }, cues: CUES }
