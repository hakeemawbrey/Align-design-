// trlittlehome score: dreamy, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.2: the card cut into 11:26 PM · hit 13.35: "*Home* safe." lands · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trlittlehome', duration: DURATION, music: { style: 'dreamy', key: 'C', seed: 1801, sections: { drop: 7.2, outroAt: DURATION - 4.4 }, hits: [13.35] }, cues: CUES }
