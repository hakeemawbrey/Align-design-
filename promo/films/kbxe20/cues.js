// kbxe20 score: funk, F (style engine in promo/scripts/teaser-sound.mjs). No end card: loops back to frame 0.
//   drop 1.62: the freeze lets go · breakdowns 15.0 (don't grab) and 41.4 (Sag's call) · lifts 25.0 (the questions) and
//   51.6 (Pisces with dessert) · music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbxe20', duration: DURATION, music: { style: 'funk', key: 'F', seed: 2020, sections: { drop: 1.62, breakdown: [15.0, 41.4], lift: [25.0, 51.6], outroAt: DURATION - 0.5 }, hits: [0.35, 43.6, 58.05] }, cues: CUES }
