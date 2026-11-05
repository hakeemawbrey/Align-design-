// khookdemo score: chiptune, A, 120 bpm feel (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end.
//   drop 1.1: the record scratch · breakdown 13.5: the news desk · lift 16.3: the glitch.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'khookdemo', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 907, sections: { drop: 2.7, breakdown: [13.5], lift: [16.3], outroAt: DURATION - 0.5 } }, cues: CUES }
