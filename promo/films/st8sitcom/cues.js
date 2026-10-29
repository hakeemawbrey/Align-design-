// st8sitcom score — funk, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the theme card · lift at the next morning · outro under the end card.
import { DURATION, CUES, SECT } from './scenes/index.js'
export default { id: 'st8sitcom', duration: DURATION, music: { style: 'funk', key: 'F', seed: 813, sections: { drop: SECT.drop, lift: SECT.lift, outroAt: DURATION - 4.4 } }, cues: CUES }
