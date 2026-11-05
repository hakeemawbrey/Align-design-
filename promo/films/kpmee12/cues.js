// kpmee12 score: dreamy, Eb (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 26.
//   drop 2.6: outside the café · breakdown 10.5: "what if one isn't enough?" · lift 14.5: the thank-you · hit 24.3.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmee12', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 3112, sections: { drop: 2.6, breakdown: [10.5], lift: [14.5], outroAt: DURATION - 0.8 }, hits: [24.3] }, cues: CUES }
