// sxmythgemini score — chiptune, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the lights and the myth · drop 5.04: test 1, the face scan · breakdown 14.49: the lie detector (quiet,
//   the needle ticks) · lift 18.38: BUSTED slams · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'sxmythgemini', duration: DURATION, music: { style: 'chiptune', key: 'Bb', seed: 33, sections: { drop: BEAT(8), breakdown: BEAT(25), lift: BEAT(32), outroAt: DURATION - 4.4 } }, cues: CUES }
