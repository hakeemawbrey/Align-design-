// sxmythsun score — synthwave, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the lights and the myth · drop 5.04: test 1, the tongs come down · breakdown 10.04: the X-ray ·
//   lift 15.04: BUSTED slams · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'sxmythsun', duration: DURATION, music: { style: 'synthwave', key: 'D', seed: 41, sections: { drop: BEAT(8), breakdown: BEAT(17), lift: BEAT(26), outroAt: DURATION - 4.4 } }, cues: CUES }
