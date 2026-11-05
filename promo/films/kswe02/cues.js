// kswe02 score: funk, F (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end.
//   drop 2.6: the phone · lift 6.2: the snowy street · break 10.2: Pisces.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kswe02', duration: DURATION, music: { style: 'funk', key: 'F', seed: 1102, sections: { drop: 2.6, lift: [6.2], breakdown: [10.2], outroAt: DURATION - 0.5 } }, cues: CUES }
