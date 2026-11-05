// kswe20 score: house, A (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end.
//   drop 5.0: the rule · lifts 14.0, 30.0, 62.0, 76.0 · breakdown 46.0: the near-miss.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kswe20', duration: DURATION, music: { style: 'house', key: 'A', seed: 1120, sections: { drop: 5.0, lift: [14.0, 30.0, 62.0, 76.0], breakdown: [46.0], outroAt: DURATION - 0.5 }, hits: [76.2] }, cues: CUES }
