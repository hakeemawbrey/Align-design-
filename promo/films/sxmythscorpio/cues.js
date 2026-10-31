// sxmythscorpio score — funk, Gm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the spooky lab · drop 5.04: the lamp clunks on, the shadow looms · breakdown 10.04: the reveal (near
//   silence while she looks up) · lift 18.38: BUSTED slams, the lights come back on · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'sxmythscorpio', duration: DURATION, music: { style: 'funk', key: 'Gm', seed: 57, sections: { drop: BEAT(8), breakdown: BEAT(17), lift: BEAT(32), outroAt: DURATION - 4.4 } }, cues: CUES }
