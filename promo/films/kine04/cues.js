// kine04 score: chiptune, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.9: the drafts flip · breakdown 9.6: THE STARS answer · lift 14.6: the pick · hit 7.5: SO NORMAL
//   · no end card: the film loops back into frame 0 at 18.2.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine04', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 1304, sections: { drop: 1.9, breakdown: [9.6], lift: [14.6], outroAt: DURATION - 1.2 }, hits: [7.5] }, cues: CUES }
