// trlittlecharge score: dreamy, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.2: the card cut into 7:30 AM · hit 13.35: "*Full* battery, full heart." lands · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trlittlecharge', duration: DURATION, music: { style: 'dreamy', key: 'G', seed: 1805, sections: { drop: 7.2, outroAt: DURATION - 4.4 }, hits: [13.35] }, cues: CUES }
