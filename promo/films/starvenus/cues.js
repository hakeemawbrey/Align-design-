// starvenus score — dreamy, Ab, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). The film agent sets sections.
//   drop 2.82: the chorus of stars pops up around the buzzing phone · lift 16.9: tonight's deck deals in · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'starvenus', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 95, sections: { drop: 2.82, breakdown: 10.05, lift: 16.9, outroAt: DURATION - 4.4 } }, cues: CUES }
