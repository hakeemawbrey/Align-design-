// kbge19 score: house, G (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card.
//   drop at the pattern break · breakdown on the red pen · lift on the glow-up · hit on the last line.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kbge19', duration: DURATION, music: { style: 'house', key: 'G', seed: 3419, sections: { drop: T.fx, breakdown: [T.strike[0]], lift: [T.glow], outroAt: DURATION - 0.6 }, hits: [T.last + 0.3] }, cues: CUES }
