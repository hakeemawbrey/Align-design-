// kine11 score: dreamy, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.9: "What if they don't say it back?" · breakdown 9.4: THE STARS answer · lift 12.7: Pisces says it
//   · hit 7.3: SO NORMAL · no end card: the film loops back into frame 0 at 17.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine11', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 1311, sections: { drop: 1.9, breakdown: [9.4], lift: [12.7], outroAt: DURATION - 1.2 }, hits: [7.3] }, cues: CUES }
