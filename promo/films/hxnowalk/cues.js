// hxnowalk score — funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro in the lab · drop 4.6: the bayou trail · breakdown 10.05: the trailhead · lift 15.04: BUSTED (…partly) · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'hxnowalk', duration: DURATION, music: { style: 'funk', key: 'E', seed: 80301, sections: { drop: BEAT(7.4), breakdown: BEAT(17.5), lift: BEAT(26), outroAt: DURATION - 4.4 } }, cues: CUES }
