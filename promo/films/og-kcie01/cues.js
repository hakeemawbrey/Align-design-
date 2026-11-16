// kcie01 score: lofi, D (style engine in promo/scripts/teaser-sound.mjs). Silent-ish freeze, the beat drops when the
// story starts (2.05, after the record scratch); hard cut at the end: the outro lands under the punchline.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie01', duration: DURATION, music: { style: 'lofi', key: 'D', seed: 2101, sections: { drop: 2.05, breakdown: [10.9], lift: [11.6], outroAt: DURATION - 1.2 } }, cues: CUES }
