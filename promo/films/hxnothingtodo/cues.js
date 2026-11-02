// hxnothingtodo score — pop, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro in the lab · drop 4.6: the idea board · breakdown 10.05: more ideas · lift 15.04: BUSTED · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'hxnothingtodo', duration: DURATION, music: { style: 'pop', key: 'A', seed: 80302, sections: { drop: BEAT(7.4), breakdown: BEAT(17.5), lift: BEAT(26), outroAt: DURATION - 4.4 } }, cues: CUES }
