// st12splitbill score — funk, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the hot take · drop 5.04: OBJECTION! · lift 8.38: the gavel · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'st12splitbill', duration: DURATION, music: { style: 'funk', key: 'G', seed: 1202, sections: { drop: BEAT(8), lift: BEAT(14), outroAt: DURATION - 4.4 } }, cues: CUES }
