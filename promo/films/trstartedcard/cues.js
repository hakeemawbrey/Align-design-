// trstartedcard score: dreamy, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.6: the card cut into HOW IT'S GOING · hit 13.45: "Card first. *Face* last." lands · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trstartedcard', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 602, sections: { drop: 6.6, outroAt: DURATION - 4.4 }, hits: [13.45] }, cues: CUES }
