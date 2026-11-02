// hxcarneeded score — lofi, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro in the lab · drop 4.6: the street · breakdown 10.05: across town · lift 15.04: PARTLY TRUE · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'hxcarneeded', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 80303, sections: { drop: BEAT(7.4), breakdown: BEAT(17.5), lift: BEAT(26), outroAt: DURATION - 4.4 } }, cues: CUES }
